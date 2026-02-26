#!/usr/bin/env node
/**
 * Extract content from content-data.js to Markdown files
 * 
 * This is a one-time migration script to convert the existing
 * JavaScript content into a markdown file structure.
 * 
 * Usage: node scripts/extract-to-markdown.js
 */

const fs = require('fs');
const path = require('path');

// Load the existing content
const contentPath = path.join(__dirname, '..', 'content-data.js');
const contentFile = fs.readFileSync(contentPath, 'utf-8');

// Extract the wikiContent object by evaluating it
// (Simple approach - works for this specific file format)
const match = contentFile.match(/const wikiContent = ({[\s\S]*});/);
if (!match) {
    console.error('Could not find wikiContent in content-data.js');
    process.exit(1);
}

let wikiContent;
try {
    // Use eval to parse the object (safe here since we control the input)
    eval('wikiContent = ' + match[1]);
} catch (e) {
    console.error('Error parsing wikiContent:', e.message);
    process.exit(1);
}

// HTML to Markdown converter
function htmlToMarkdown(html) {
    let md = html;

    // Headers
    md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
    md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
    md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
    md = md.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n');

    // Bold and italic
    md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    md = md.replace(/<em>(.*?)<\/em>/g, '*$1*');

    // Code
    md = md.replace(/<code>(.*?)<\/code>/g, '`$1`');

    // Info and warning boxes
    md = md.replace(/<div class='info-box'><p>([\s\S]*?)<\/p><\/div>/g, ':::info\n$1\n:::');
    md = md.replace(/<div class='warning-box'><p>([\s\S]*?)<\/p><\/div>/g, ':::warning\n$1\n:::');

    // Convert tables
    md = convertTablesToMarkdown(md);

    // Unordered lists
    md = md.replace(/<ul>\s*/g, '\n');
    md = md.replace(/<\/ul>\s*/g, '\n');
    md = md.replace(/<li>([\s\S]*?)<\/li>/g, '- $1\n');

    // Ordered lists
    md = md.replace(/<ol>\s*/g, '\n');
    md = md.replace(/<\/ol>\s*/g, '\n');
    // For ordered lists, we'll use "1." since markdown auto-numbers
    let olCounter = 0;
    md = md.replace(/<li>([\s\S]*?)<\/li>/g, (match, content) => {
        olCounter++;
        return `${olCounter}. ${content}\n`;
    });

    // Paragraphs
    md = md.replace(/<p>([\s\S]*?)<\/p>/g, '$1\n\n');

    // Line breaks (from \n in original)
    md = md.replace(/\\n/g, '\n');

    // Clean up excessive whitespace
    md = md.replace(/\n{3,}/g, '\n\n');
    md = md.trim();

    return md;
}

function convertTablesToMarkdown(html) {
    // Find all tables
    return html.replace(/<table>([\s\S]*?)<\/table>/g, (match, tableContent) => {
        const rows = [];
        const rowMatches = tableContent.match(/<tr>([\s\S]*?)<\/tr>/g) || [];

        rowMatches.forEach((row, index) => {
            const cells = [];
            const headerCells = row.match(/<th>([\s\S]*?)<\/th>/g) || [];
            const dataCells = row.match(/<td>([\s\S]*?)<\/td>/g) || [];

            headerCells.forEach(cell => {
                const content = cell.replace(/<th>([\s\S]*?)<\/th>/, '$1').trim();
                cells.push(content);
            });

            dataCells.forEach(cell => {
                const content = cell.replace(/<td>([\s\S]*?)<\/td>/, '$1').trim();
                cells.push(content);
            });

            if (cells.length > 0) {
                rows.push('| ' + cells.join(' | ') + ' |');

                // Add separator after header row
                if (index === 0 && headerCells.length > 0) {
                    rows.push('| ' + cells.map(() => '---').join(' | ') + ' |');
                }
            }
        });

        return '\n' + rows.join('\n') + '\n';
    });
}

// Get chapter icon based on title
function getChapterIcon(title) {
    const iconMap = {
        'getting started': '🚀',
        'interface': '🖥️',
        'shows': '📁',
        'displays': '🖵',
        'assets': '📦',
        'timeline': '⏱️',
        'effects': '✨',
        'playback': '▶️',
        'network': '🌐',
        'keyboard': '⌨️',
        'troubleshooting': '🔧'
    };

    const lowerTitle = title.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerTitle.includes(key)) return icon;
    }
    return '📖';
}

// Create slug from title
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Extract chapter number and title
function parseChapterKey(key) {
    const match = key.match(/^(\d+)\.\s*(.+)$/);
    if (match) {
        return {
            number: parseInt(match[1], 10),
            title: match[2]
        };
    }
    return { number: 99, title: key };
}

// Main extraction function
function extractToMarkdown() {
    const contentDir = path.join(__dirname, '..', 'content');

    // Create content directory
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }

    console.log('Extracting content to markdown files...\n');

    Object.entries(wikiContent).forEach(([chapterKey, chapter]) => {
        const { number, title } = parseChapterKey(chapterKey);
        const chapterSlug = slugify(title);
        const chapterDirName = `${String(number).padStart(2, '0')}-${chapterSlug}`;
        const chapterPath = path.join(contentDir, chapterDirName);

        // Create chapter directory
        if (!fs.existsSync(chapterPath)) {
            fs.mkdirSync(chapterPath, { recursive: true });
        }

        console.log(`Chapter ${number}: ${title}`);
        console.log(`  -> ${chapterDirName}/`);

        // Write chapter index file
        const icon = getChapterIcon(title);
        const overviewMd = htmlToMarkdown(chapter.overview || '');
        const indexContent = `---
title: "${title}"
icon: "${icon}"
---

${overviewMd}
`;
        fs.writeFileSync(path.join(chapterPath, '_index.md'), indexContent);
        console.log(`     _index.md`);

        // Write section files
        let sectionNum = 1;
        Object.entries(chapter.sections || {}).forEach(([sectionTitle, sectionHtml]) => {
            const sectionSlug = slugify(sectionTitle);
            const sectionFilename = `${String(sectionNum).padStart(2, '0')}-${sectionSlug}.md`;
            const sectionPath = path.join(chapterPath, sectionFilename);

            const sectionMd = htmlToMarkdown(sectionHtml);
            const sectionContent = `---
title: "${sectionTitle}"
---

${sectionMd}
`;
            fs.writeFileSync(sectionPath, sectionContent);
            console.log(`     ${sectionFilename}`);
            sectionNum++;
        });

        console.log('');
    });

    console.log('Extraction complete!');
    console.log('\nNext steps:');
    console.log('1. Review and edit the markdown files in /content');
    console.log('2. Run: node scripts/build-content.js');
    console.log('3. The wiki will use the newly generated content-data.js');
}

// Run extraction
extractToMarkdown();
