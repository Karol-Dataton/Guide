#!/usr/bin/env node
/**
 * WATCHOUT Wiki Content Builder
 * 
 * Converts markdown files from the /content directory into:
 * - content-data.js (for the wiki application)
 * - toc-data.js (table of contents)
 * 
 * Directory structure expected:
 * /content
 *   /01-getting-started
 *     _index.md (chapter overview)
 *     01-welcome.md
 *     02-system-requirements.md
 *     ...
 *   /02-the-interface
 *     _index.md
 *     01-main-window.md
 *     ...
 * 
 * Usage: node scripts/build-content.js
 */

const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter (no external dependencies)
function markdownToHtml(markdown) {
    let html = markdown;

    // Escape HTML entities in code blocks first (protect them)
    const codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const index = codeBlocks.length;
        codeBlocks.push(`<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`);
        return `___CODEBLOCK_${index}___`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Tables
    html = convertTables(html);

    // Lists (Process before inline styles to avoid interfering with * styling)
    html = convertLists(html);
    html = convertOrderedLists(html);

    // Callout boxes (custom syntax)
    // Allow for optional spaces and handle newlines more robustly
    html = html.replace(/^:::\s*info\s*\n([\s\S]*?)^:::/gm, "<div class='info-box'><p>$1</p></div>");
    html = html.replace(/^:::\s*warning\s*\n([\s\S]*?)^:::/gm, "<div class='warning-box'><p>$1</p></div>");
    html = html.replace(/^:::\s*tip\s*\n([\s\S]*?)^:::/gm, "<div class='info-box'><p>$1</p></div>");
    html = html.replace(/^:::\s*note\s*\n([\s\S]*?)^:::/gm, "<div class='note-box'><p>$1</p></div>");

    // Bold and italic
    // Use slightly stricter regex to avoid matching across lines or mismatched tags
    // Bold *** -> <strong><em>
    html = html.replace(/\*\*\*([\s\S]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold ** -> <strong>
    html = html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
    // For italics, ensure we don't match across lines (newlines) to prevent list items 
    // from being interpreted as italics if list processing fails
    html = html.replace(/(?<!\*)\*([^\*\n]+?)\*(?!\*)/g, '<em>$1</em>');

    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="content-image">');

    // Videos (custom syntax: @[alt](src)) - thumbnail with autoplay, muted, loop, no controls
    // Add timestamp to prevent browser caching issues
    let timestamp = Date.now();
    html = html.replace(/@\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        return `<video src="${src}?t=${timestamp++}" class="content-video" autoplay muted loop playsinline title="${alt}"></video>`;
    });

    // Widgets (custom syntax: [[WIDGET:filename]])
    // Process widgets early and protect them from paragraph wrapping
    const widgets = [];
    html = html.replace(/\[\[WIDGET:(.*?)\]\]/g, (match, widgetName) => {
        const index = widgets.length;
        widgets.push(getWidgetContent(widgetName));
        return `___WIDGET_${index}___`;
    });

    // Paragraphs - wrap lines that aren't already wrapped in block-level elements
    html = html.split(/\r?\n\r?\n/).map(block => {
        block = block.trim();
        if (!block) return '';
        // Skip blocks that are already block-level HTML elements (including closing tags)
        if (/^<\/?(h[1-6]|table|ul|ol|div|pre|blockquote|img|video)/i.test(block)) return block;
        if (block.startsWith('___CODEBLOCK_')) return block;
        if (block.startsWith('___WIDGET_')) return block;
        if (/^[-*\d]/.test(block)) return block; // List items handled separately
        return `<p>${block.replace(/\n/g, ' ')}</p>`;
    }).join('\n\n');

    // Restore code blocks
    codeBlocks.forEach((block, index) => {
        html = html.replace(`___CODEBLOCK_${index}___`, block);
    });

    // Restore widgets
    widgets.forEach((widget, index) => {
        html = html.replace(`___WIDGET_${index}___`, widget);
    });

    // Clean up extra whitespace
    html = html.replace(/\n{3,}/g, '\n\n');

    return html.trim();
}

// Helper to load widget content
function getWidgetContent(widgetName) {
    // Sanitize widget name to prevent path traversal
    const safeName = widgetName.replace(/[^a-zA-Z0-9-]/g, '');
    const widgetPath = path.join(__dirname, '..', 'widgets', `${safeName}.html`);

    if (fs.existsSync(widgetPath)) {
        return fs.readFileSync(widgetPath, 'utf-8');
    } else {
        console.warn(`Warning: Widget "${safeName}" not found at ${widgetPath}`);
        return `<div class="widget-error">Widget not found: ${widgetName}</div>`;
    }
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function convertTables(html) {
    const lines = html.split(/\r?\n/);
    const result = [];
    let inTable = false;
    let tableRows = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableRows = [];
            }
            // Skip separator rows (|---|---|)
            if (!/^\|[\s-:|]+\|$/.test(line)) {
                tableRows.push(line);
            }
        } else {
            if (inTable) {
                // End of table, convert it
                result.push(buildTable(tableRows));
                inTable = false;
                tableRows = [];
            }
            result.push(lines[i]);
        }
    }

    if (inTable) {
        result.push(buildTable(tableRows));
    }

    return result.join('\n');
}

function buildTable(rows) {
    if (rows.length === 0) return '';

    let html = '<table>\n';

    rows.forEach((row, index) => {
        const cells = row.split('|').filter(c => c.trim() !== '');
        const tag = index === 0 ? 'th' : 'td';

        html += '<tr>';
        cells.forEach(cell => {
            html += `<${tag}>${cell.trim()}</${tag}>`;
        });
        html += '</tr>\n';
    });

    html += '</table>';
    return html;
}

function convertLists(html) {
    const lines = html.split(/\r?\n/);
    const result = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/^(\s*)[-*]\s+(.+)$/);

        if (match) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            result.push(`<li>${match[2]}</li>`);
        } else {
            if (inList && line.trim() !== '') {
                result.push('</ul>');
                inList = false;
            }
            result.push(line);
        }
    }

    if (inList) {
        result.push('</ul>');
    }

    return result.join('\n');
}

function convertOrderedLists(html) {
    const lines = html.split(/\r?\n/);
    const result = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/^(\s*)\d+\.\s+(.+)$/);

        if (match) {
            if (!inList) {
                result.push('<ol>');
                inList = true;
            }
            result.push(`<li>${match[2]}</li>`);
        } else {
            if (inList && line.trim() !== '') {
                result.push('</ol>');
                inList = false;
            }
            result.push(line);
        }
    }

    if (inList) {
        result.push('</ol>');
    }

    return result.join('\n');
}

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

    if (!frontmatterMatch) {
        return { metadata: {}, content: content };
    }

    const metadata = {};
    const frontmatterLines = frontmatterMatch[1].split('\n');

    frontmatterLines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (Object.prototype.hasOwnProperty.call(metadata, key)) {
                if (Array.isArray(metadata[key])) {
                    metadata[key].push(value);
                } else {
                    metadata[key] = [metadata[key], value];
                }
            } else {
                metadata[key] = value;
            }
        }
    });

    return {
        metadata,
        content: frontmatterMatch[2]
    };
}

// Get sort order from filename (e.g., "01-welcome.md" -> 1)
function getSortOrder(filename) {
    const match = filename.match(/^(\d+)-/);
    return match ? parseInt(match[1], 10) : 999;
}

// Extract a short description from content
function extractDescription(content) {
    // Remove headers
    let text = content.replace(/^#+\s+.+$/gm, '');
    // Remove images
    text = text.replace(/!\[.*?\]\(.*?\)/g, '');
    // Remove special blocks
    text = text.replace(/:::.*?:::/gs, '');
    // Remove scripts
    text = text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
    // Remove tags
    text = text.replace(/<\/?[^>]+(>|$)/g, "");

    // Get first paragraph
    const paragraphs = text.split(/\r?\n\r?\n/);
    for (const p of paragraphs) {
        const cleanP = p.trim();
        if (cleanP && cleanP.length > 20) {
            // Strip markdown formatting like bold/italic
            let plain = cleanP.replace(/\*\*|__|[*_`]/g, '');
            // Truncate
            return plain.length > 120 ? plain.substring(0, 117) + '...' : plain;
        }
    }
    return '';
}

// Convert filename to title (e.g., "01-welcome.md" -> "Welcome")
function filenameToTitle(filename) {
    return filename
        .replace(/^\d+-/, '')          // Remove leading numbers
        .replace(/\.md$/, '')          // Remove extension
        .replace(/-/g, ' ')            // Replace hyphens with spaces
        .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words
}

// Main build function
function buildContent() {
    const contentDir = path.join(__dirname, '..', 'content');
    const outputDir = path.join(__dirname, '..');

    if (!fs.existsSync(contentDir)) {
        console.error('Content directory not found:', contentDir);
        console.log('Creating content directory structure...');
        fs.mkdirSync(contentDir, { recursive: true });
        console.log('Please add markdown files to the content directory and run again.');
        return;
    }

    const wikiContent = {};
    const chaptersData = [];

    // Read chapter directories
    const chapters = fs.readdirSync(contentDir)
        .filter(item => {
            const itemPath = path.join(contentDir, item);
            return fs.statSync(itemPath).isDirectory();
        })
        .sort((a, b) => getSortOrder(a) - getSortOrder(b));

    console.log(`Found ${chapters.length} chapters`);

    chapters.forEach((chapterDir, chapterIndex) => {
        const chapterPath = path.join(contentDir, chapterDir);
        const chapterNum = chapterIndex + 1;

        // Read chapter index file for metadata
        const indexPath = path.join(chapterPath, '_index.md');
        let chapterTitle = filenameToTitle(chapterDir);
        let chapterOverview = '';
        let chapterIcon = 'book';

        if (fs.existsSync(indexPath)) {
            const indexContent = fs.readFileSync(indexPath, 'utf-8');
            const { metadata, content } = parseFrontmatter(indexContent);

            if (metadata.title) chapterTitle = metadata.title;
            if (metadata.icon) chapterIcon = metadata.icon;
            chapterOverview = markdownToHtml(content);
        }

        const chapterKey = `${chapterNum}. ${chapterTitle}`;
        console.log(`  Processing: ${chapterKey}`);

        // Initialize chapter
        const sections = {};
        const tocSections = [];
        let pageCounter = 1;

        // Read section files
        const sectionFiles = fs.readdirSync(chapterPath)
            .filter(file => file.endsWith('.md') && file !== '_index.md')
            .sort((a, b) => getSortOrder(a) - getSortOrder(b));

        sectionFiles.forEach(sectionFile => {
            const sectionPath = path.join(chapterPath, sectionFile);
            const fileContent = fs.readFileSync(sectionPath, 'utf-8');
            const { metadata, content } = parseFrontmatter(fileContent);

            const sectionTitle = metadata.title || filenameToTitle(sectionFile);
            const sectionDescription = metadata.description || extractDescription(content);

            const sectionStatus = metadata.status || 'draft';
            let statusClass = sectionStatus.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

            // Normalize status class to predefined styles
            if (statusClass.includes('content-verified')) statusClass = 'content-verified';
            else if (statusClass.includes('content-finished')) statusClass = 'content-finished';
            else if (statusClass.includes('edit-finished')) statusClass = 'edit-finished';
            else if (statusClass.includes('final')) statusClass = 'final';
            else if (statusClass.includes('draft')) statusClass = 'draft';
            let metadataHtml = '';
            if (metadata.badge) {
                const badges = Array.isArray(metadata.badge) ? metadata.badge : [metadata.badge];
                metadataHtml += `<div class="article-metadata">`;
                badges.forEach(badge => {
                    metadataHtml += `<span class="article-badge" data-badge="${badge.trim()}">${badge.trim()}</span>`;
                });
                metadataHtml += `</div>`;
            }

            const sectionHtml = metadataHtml + markdownToHtml(content);

            sections[sectionTitle] = sectionHtml;
            tocSections.push({
                title: sectionTitle,
                page: pageCounter++,
                description: sectionDescription
            });

            console.log(`    - ${sectionTitle}`);
        });

        // Build wiki content entry
        wikiContent[chapterKey] = {
            overview: chapterOverview || `<h1>${chapterTitle.toUpperCase()}</h1>`,
            sections: sections
        };

        // Build TOC entry
        chaptersData.push({
            title: chapterKey,
            icon: chapterIcon,
            subsections: tocSections
        });
    });

    // Write content-data.js
    const contentOutput = `// WATCHOUT 7 User Guide - Content Data
// Auto-generated by build-content.js - DO NOT EDIT DIRECTLY
// Edit the markdown files in /content instead

const wikiContent = ${JSON.stringify(wikiContent, null, 2)};
`;

    fs.writeFileSync(path.join(outputDir, 'content-data.js'), contentOutput);
    console.log('\nGenerated: content-data.js');

    // Write toc-data.js with icons and processing functions
    const iconsJs = `// SVG Icons (Lucide-style)
const icons = {
    book: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>\`,
    settings: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>\`,
    layout: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>\`,
    monitor: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>\`,
    film: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>\`,
    clock: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>\`,
    play: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>\`,
    sliders: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>\`,
    globe: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>\`,
    keyboard: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M6 8h.001"></path><path d="M10 8h.001"></path><path d="M14 8h.001"></path><path d="M18 8h.001"></path><path d="M8 12h.001"></path><path d="M12 12h.001"></path><path d="M16 12h.001"></path><path d="M7 16h10"></path></svg>\`,
    alertCircle: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>\`,
    fileText: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>\`,
    link: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>\`
};

// Get icon SVG by name
function getIcon(iconName) {
    return icons[iconName] || icons.fileText;
}
`;

    // Build tocData array (flat structure with levels)
    const tocData = [];
    chaptersData.forEach(chapter => {
        tocData.push({
            level: 1,
            title: chapter.title,
            page: 1,
            icon: chapter.icon
        });
        chapter.subsections.forEach(sub => {
            tocData.push({
                level: 2,
                title: sub.title,
                page: sub.page,
                description: sub.description
            });
        });
    });

    const tocOutput = `// WATCHOUT 7 User Guide - Table of Contents Data
// Auto-generated by build-content.js - DO NOT EDIT DIRECTLY
// Edit the markdown files in /content instead

${iconsJs}
const tocData = ${JSON.stringify(tocData, null, 4)};

// Process TOC data into hierarchical structure
function processHierarchy() {
    const chapters = [];
    let currentChapter = null;

    tocData.forEach((item) => {
        if (item.level === 1) {
            const isDisabled = typeof wikiConfig !== 'undefined' && 
                wikiConfig.disabledChapters && 
                wikiConfig.disabledChapters.includes(item.title);

            currentChapter = {
                ...item,
                disabled: isDisabled,
                subsections: []
            };
            chapters.push(currentChapter);
        } else if (item.level === 2 && currentChapter) {
            currentChapter.subsections.push(item);
        }
    });

    return chapters;
}

const chaptersData = processHierarchy();
`;

    fs.writeFileSync(path.join(outputDir, 'toc-data.js'), tocOutput);
    console.log('Generated: toc-data.js');

    console.log('\nBuild complete!');
}

// Run the build
buildContent();
