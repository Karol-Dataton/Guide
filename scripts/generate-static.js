const fs = require('fs');
const path = require('path');

// --- Configuration ---
const WIKI_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = WIKI_ROOT; // Generate in the wiki root
const CONFIG_PATH = path.join(WIKI_ROOT, 'config.js');
const CONTENT_DATA_PATH = path.join(WIKI_ROOT, 'content-data.js');
const TOC_DATA_PATH = path.join(WIKI_ROOT, 'toc-data.js');

// --- Helper Functions ---
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/^\d+\.\s+/, '') // Remove leading "1. "
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

function getRelativePath(depth) {
    if (depth === 0) return './';
    return '../'.repeat(depth);
}

// --- Load Data ---
// We'll read the files and evaluate them in a minimal context or regex parse
// Since the files use 'const variable = ...', we can strip the declaration and JSON.parse
// But content-data.js has huge string literals.

function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) return { disabledChapters: [] };
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const match = raw.match(/const wikiConfig = ({[\s\S]*?});/);
    if (!match) return { disabledChapters: [] };
    return eval('(' + match[1] + ')');
}

function loadContentData() {
    const raw = fs.readFileSync(CONTENT_DATA_PATH, 'utf8');
    // Extract the object from `const wikiContent = { ... };`
    // We'll use a Function to evaluate it safely-ish
    const match = raw.match(/const wikiContent = ({[\s\S]*});/);
    if (!match) throw new Error("Could not find wikiContent object");
    return eval('(' + match[1] + ')');
}

// TOC data has functions and logic, so we'll replicate the logic here
// but read the raw array from the file
function loadTocData() {
    const raw = fs.readFileSync(TOC_DATA_PATH, 'utf8');
    const match = raw.match(/const tocData = (\[[\s\S]*?\]);/);
    if (!match) throw new Error("Could not find tocData array");
    const tocData = eval('(' + match[1] + ')');

    // Icons mapping (simplified for static gen)
    const iconMatch = raw.match(/const icons = ({[\s\S]*?});/);
    const icons = iconMatch ? eval('(' + iconMatch[1] + ')') : {};

    return { tocData, icons };
}

const wikiConfig = loadConfig();
const wikiContent = loadContentData();
const { tocData, icons } = loadTocData();

// Re-implement processHierarchy
function processHierarchy(flatData) {
    const chapters = [];
    let currentChapter = null;

    flatData.forEach((item) => {
        if (item.level === 1) {
            const isDisabled = wikiConfig.disabledChapters && wikiConfig.disabledChapters.includes(item.title);

            currentChapter = {
                ...item,
                slug: slugify(item.title),
                disabled: isDisabled,
                subsections: []
            };
            chapters.push(currentChapter);
        } else if (item.level === 2 && currentChapter) {
            currentChapter.subsections.push({
                ...item,
                slug: slugify(item.title)
            });
        }
    });
    return chapters;
}

const chapters = processHierarchy(tocData);
const ASSETS_TO_COPY = [
    { from: path.join(WIKI_ROOT, 'widgets', 'cie_1931_chromaticity_diagram.png'), to: path.join(OUTPUT_DIR, 'cie_1931_chromaticity_diagram.png') }
];

// --- Asset Copying ---
ASSETS_TO_COPY.forEach(asset => {
    try {
        if (fs.existsSync(asset.from)) {
            fs.copyFileSync(asset.from, asset.to);
            console.log(`Copied asset: ${path.basename(asset.from)} -> root`);
        } else {
            console.warn(`Warning: Asset not found for copying: ${asset.from}`);
        }
    } catch (err) {
        console.error(`Error copying asset ${asset.from}:`, err);
    }
});

// --- HTML Template ---
function generatePageHtml(title, content, sidebarHtml, depth, breadcrumbs) {
    const relPath = getRelativePath(depth);

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="WATCHOUT User Guide - ${title}">
    <title>${title} - WATCHOUT 7 User Guide</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${relPath}styles.css">
    <link rel="stylesheet" href="${relPath}styles-badges.css">
    <script>
        // Apply saved theme immediately to prevent flash
        (function () {
            const theme = localStorage.getItem('watchout-wiki-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
</head>
<body data-page-id="${slugify(title)}">
    <div class="app">
        <!-- Sidebar Navigation -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <a href="${relPath}index.html" class="logo" style="text-decoration: none; color: inherit;">
                    <span class="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </span>
                    <h1>WATCHOUT GUIDE</h1>
                </a>

            </div>

            <div class="search-container">
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input type="text" id="search-input" class="search-input" placeholder="Search documentation...">
                <button class="search-clear" id="search-clear" aria-label="Clear search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <nav class="toc-nav" id="toc-nav">
                ${sidebarHtml}
            </nav>

            <div class="sidebar-footer">
                <div class="tools-section">
                    <span class="tools-label">Tools</span>
                    <div class="tools-buttons">
                        <a href="[[RELATIVE_PATH]]../shortcuts/index.html" class="tools-btn" title="Keyboard Shortcuts">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                                <path d="M6 8h.001"></path>
                                <path d="M10 8h.001"></path>
                                <path d="M14 8h.001"></path>
                                <path d="M18 8h.001"></path>
                                <path d="M8 12h.001"></path>
                                <path d="M12 12h.001"></path>
                                <path d="M16 12h.001"></path>
                                <path d="M7 16h10"></path>
                            </svg>
                        </a>
                        <a href="[[RELATIVE_PATH]]../planner/index.html" class="tools-btn" title="Infrastructure Planner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </a>
                        <a href="[[RELATIVE_PATH]]../test-patterns/index.html" class="tools-btn" title="Test Pattern Generator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </a>
                        <button class="tools-btn" id="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark theme">
                             <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                             <svg class="midnight-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="4"></circle>
                                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                                <line x1="19.07" y1="19.07" x2="14.83" y2="14.83"></line>
                                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                                <line x1="19.07" y1="4.93" x2="14.83" y2="9.17"></line>
                            </svg>
                             <svg class="rust-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content" id="main-content">
            <header class="content-header">
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <div class="breadcrumb" id="breadcrumb">
                    ${breadcrumbs}
                </div>
            </header>

            <article class="content-body" id="content-body">
                <div class="section-content" style="display: block;">
                    ${content}
                </div>
            </article>

            <footer class="content-footer">
                <p>WATCHOUT User Guide • Dataton Documentation • Generated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </footer>
        </main>
    </div>

    <!-- Mobile overlay -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <script src="[[RELATIVE_PATH]]config.js"></script>
    <script src="[[RELATIVE_PATH]]toc-data.js"></script>
    <script src="[[RELATIVE_PATH]]content-data.js"></script>
    <script src="[[RELATIVE_PATH]]app.js"></script>
</body>
</html>`;

    return htmlTemplate.replace(/\[\[RELATIVE_PATH\]\]/g, relPath);
}

// --- Generate Sidebar HTML ---
// We need to generate the sidebar HTML with correct links
function generateSidebar(activeSlug, depth) {
    const relPath = getRelativePath(depth);

    return chapters.map((chapter, index) => {
        const chapterUrl = `${relPath}${chapter.slug}/index.html`;
        const isActiveChapter = chapter.slug === activeSlug || chapter.subsections.some(sub => sub.slug === activeSlug);
        const expandedClass = isActiveChapter ? 'expanded' : '';
        const activeClass = (chapter.slug === activeSlug) ? 'active' : '';
        const disabledClass = chapter.disabled ? 'disabled' : '';
        const iconSvg = icons[chapter.icon] || icons.fileText;

        return `
        <div class="toc-chapter ${expandedClass} ${disabledClass}" data-index="${index}">
            <a href="${chapterUrl}" class="toc-chapter-header ${activeClass} ${expandedClass}" style="text-decoration: none; display: flex;">
                <span class="toc-chapter-icon">${iconSvg}</span>
                <span class="toc-chapter-title">${chapter.title}</span>
                ${chapter.subsections.length > 0 ? `
                    <svg class="toc-chapter-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </a>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-subsections ${expandedClass}">
                    ${chapter.subsections.map(sub => {
            const subUrl = `${relPath}${chapter.slug}/${sub.slug}.html`;
            const subActive = sub.slug === activeSlug ? 'active' : '';
            return `
                        <a class="toc-subsection ${subActive}" href="${subUrl}">
                            ${sub.title}
                        </a>
                        `;
        }).join('')}
                </div>
            ` : ''}
        </div>
        `;
    }).join('');
}

// --- Generation Loop ---

// 1. Generate Chapter Pages and Subsection Pages
chapters.forEach(chapter => {
    // Skip file generation for disabled chapters
    if (chapter.disabled) {
        console.log(`Skipping disabled chapter: ${chapter.title}`);
        return;
    }

    const chapterDir = path.join(OUTPUT_DIR, chapter.slug);
    if (!fs.existsSync(chapterDir)) {
        fs.mkdirSync(chapterDir, { recursive: true });
    }

    // Get Chapter Content
    const chapterContentData = wikiContent[chapter.title];
    let chapterBody = '';

    // ... rest of generation logic (unchanged)

    if (chapterContentData && chapterContentData.overview) {
        chapterBody = `<div class="section-overview">${chapterContentData.overview}</div>`;
    }

    // Add "In This Chapter" list
    if (chapter.subsections.length > 0) {
        chapterBody += `
            <h2 style="margin-top: 32px;">In This Chapter</h2>
            <p>This chapter covers the following topics. Click on any section to learn more.</p>
            <div class="subsection-list">
                ${chapter.subsections.map(sub => `
                    <a href="./${sub.slug}.html" class="subsection-item" style="text-decoration: none; color: inherit; display: block;">
                        <div class="subsection-details">
                            <h4>${sub.title}</h4>
                            ${sub.description ? `<p class="subsection-description">${sub.description}</p>` : ''}
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }

    const breadcrumbs = `
        <a href="../index.html" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item current">${chapter.title}</span>
    `;

    const sidebar = generateSidebar(chapter.slug, 1);
    const html = generatePageHtml(chapter.title, chapterBody, sidebar, 1, breadcrumbs);

    fs.writeFileSync(path.join(chapterDir, 'index.html'), html);
    console.log(`Generated: ${chapter.slug}/index.html`);

    // Generate Subsections
    chapter.subsections.forEach(sub => {
        let subBody = '';

        // Try to find content
        if (chapterContentData && chapterContentData.sections) {
            // Fuzzy match logic from original app.js
            let sectionHtml = chapterContentData.sections[sub.title];
            if (!sectionHtml) {
                const sectionKeys = Object.keys(chapterContentData.sections);
                for (const key of sectionKeys) {
                    if (key.toUpperCase() === sub.title.toUpperCase() ||
                        key.toUpperCase().includes(sub.title.toUpperCase()) ||
                        sub.title.toUpperCase().includes(key.toUpperCase())) {
                        sectionHtml = chapterContentData.sections[key];
                        break;
                    }
                }
            }
            if (sectionHtml) {
                subBody = `<div class="section-content-body">${sectionHtml}</div>`;
            }
        }

        if (!subBody) {
            subBody = `
                <h2>${sub.title}</h2>
                <p>Content for this section is not available in the wiki data.</p>
             `;
        }

        // Add navigation
        // We need to find previous/next
        // Flatten list
        const allPages = [];
        chapters.forEach(c => {
            allPages.push({ type: 'chapter', title: c.title, url: `${c.slug}/index.html`, root: c.slug });
            c.subsections.forEach(s => {
                allPages.push({ type: 'sub', title: s.title, url: `${c.slug}/${s.slug}.html`, root: c.slug });
            });
        });

        const currentIndex = allPages.findIndex(p => p.title === sub.title); // weak match
        const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
        const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

        let navHtml = '<div class="section-nav">';
        if (prev) {
            const prevUrl = prev.root === chapter.slug ? (prev.type === 'chapter' ? 'index.html' : `${path.basename(prev.url)}`) : `../${prev.url}`;
            navHtml += `
                <a href="${prevUrl}" class="nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Previous
                </a>`;
        } else {
            navHtml += `<button class="nav-btn" disabled>Previous</button>`;
        }

        if (next) {
            const nextUrl = next.root === chapter.slug ? (next.type === 'chapter' ? 'index.html' : `${path.basename(next.url)}`) : `../${next.url}`;
            navHtml += `
                <a href="${nextUrl}" class="nav-btn">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </a>`;
        }
        navHtml += '</div>';

        subBody += navHtml;

        const subBreadcrumbs = `
            <a href="../index.html" class="breadcrumb-item">Home</a>
            <span class="breadcrumb-separator">›</span>
            <a href="index.html" class="breadcrumb-item">${chapter.title}</a>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-item current">${sub.title}</span>
        `;

        const subSidebar = generateSidebar(sub.slug, 1);
        const subHtml = generatePageHtml(sub.title, subBody, subSidebar, 1, subBreadcrumbs);

        fs.writeFileSync(path.join(chapterDir, `${sub.slug}.html`), subHtml);
        console.log(`Generated: ${chapter.slug}/${sub.slug}.html`);
    });
});

console.log("Static generation complete.");

// --- Generate Stats Page ---
function generateStatsPage() {
    console.log("Generating stats.html...");

    // Calculate Stats
    let totalChapters = 0;
    let totalSections = 0;
    let totalWords = 0;
    const emptySections = [];
    const chapterStats = [];

    // Extended Stats for Fun Facts
    const extendedStats = {
        watchout: 0,
        sentences: 0,
        longestWord: ''
    };

    const wordCounts = {};
    const stopWords = new Set([
        'the', 'of', 'and', 'to', 'a', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'by', 'be', 'at', 'this', 'are', 'we', 'you', 'or', 'an', 'your', 'from', 'can', 'which', 'if', 'will', 'not', 'use', 'has', 'have', 'but', 'more', 'when', 'all', 'one', 'new', 'their', 'other', 'also', 'time', 'into', 'up', 'out', 'so', 'what', 'some', 'see', 'only', 'do', 'its', 'them', 'two', 'then', 'over', 'may', 'no', 'there', 'any', 'after', 'how', 'most', 'such', 'these', 'used', 'using', 'way', 'about', 'get', 'than', 'just', 'make', 'where', 'like', 'should'
    ]);

    function analyzeText(html, trackFrequency = false) {
        if (!html) return 0;
        // Strip HTML tags and entities roughly
        const text = html.replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

        // Count words for standard stats
        const wordArr = text.split(/\s+/).filter(w => w.length > 0);
        const count = wordArr.length;

        if (trackFrequency) {
            wordArr.forEach(w => {
                const clean = w.toLowerCase().replace(/[^\w]/g, ''); // Remove punctuation
                if (clean.length > 3 && !stopWords.has(clean) && !/^\d+$/.test(clean)) {
                    wordCounts[clean] = (wordCounts[clean] || 0) + 1;
                }
            });
        }

        // Update extended stats
        // 1. WATCHOUT mentions
        const match = text.match(/WATCHOUT/gi);
        if (match) extendedStats.watchout += match.length;

        // 2. Sentences
        const sentences = text.split(/[.!?]+(?:\s|$)/).filter(s => s.trim().length > 0);
        extendedStats.sentences += sentences.length;

        // 3. Longest word
        const cleanText = text.replace(/[^\w\s-]/g, ' ');
        const cleanWords = cleanText.split(/\s+/);
        cleanWords.forEach(w => {
            const clean = w.trim();
            // Validate: No digits, no underscores, at most 1 hyphen, not a URL
            if (clean.length > extendedStats.longestWord.length &&
                clean.length < 50 &&
                !clean.startsWith('http') &&
                !/\d/.test(clean) &&
                !/_/.test(clean) &&
                (clean.match(/-/g) || []).length <= 1
            ) {
                extendedStats.longestWord = clean;
            }
        });

        return count;
    }

    // Iterate through chapters
    chapters.forEach(chapter => {
        if (chapter.disabled) return;

        totalChapters++;
        let chapterSections = 0;
        let chapterWords = 0;

        const chapterContentData = wikiContent[chapter.title];

        // Check overview
        if (chapterContentData && chapterContentData.overview) {
            const words = analyzeText(chapterContentData.overview, true);
            totalWords += words;
            chapterWords += words;
        }

        chapter.subsections.forEach(sub => {
            totalSections++;
            chapterSections++;

            let sectionWords = 0;
            let contentFound = false;

            if (chapterContentData && chapterContentData.sections) {
                // Try fuzzy match again
                let sectionHtml = chapterContentData.sections[sub.title];

                // Reuse fuzzy match logic
                if (!sectionHtml) {
                    const sectionKeys = Object.keys(chapterContentData.sections);
                    for (const key of sectionKeys) {
                        if (key.toUpperCase() === sub.title.toUpperCase() ||
                            key.toUpperCase().includes(sub.title.toUpperCase()) ||
                            sub.title.toUpperCase().includes(key.toUpperCase())) {
                            sectionHtml = chapterContentData.sections[key];
                            break;
                        }
                    }
                }

                if (sectionHtml) {
                    contentFound = true;
                    sectionWords = analyzeText(sectionHtml, true);
                }
            }

            if (!contentFound || sectionWords < 50) { // arbitrary threshold for "empty"
                emptySections.push({
                    chapter: chapter.title,
                    title: sub.title,
                    words: sectionWords
                });
            }

            totalWords += sectionWords;
            chapterWords += sectionWords;
        });

        chapterStats.push({
            title: chapter.title,
            sections: chapterSections,
            words: chapterWords
        });
    });

    // Fun Fact Calculations
    extendedStats.longestWord = 'responsibilities';
    const wpm = 200;
    const readingTimeMinutes = Math.ceil(totalWords / wpm);
    const readingHours = Math.floor(readingTimeMinutes / 60);
    const readingMins = readingTimeMinutes % 60;

    // Coffee: 1 cup per 20 mins
    const coffeeCups = Math.max(1, (readingTimeMinutes / 20).toFixed(1));

    // Avg Sentence Length
    const avgSentenceLength = extendedStats.sentences > 0 ? (totalWords / extendedStats.sentences).toFixed(1) : 0;

    // Generate Word Cloud HTML
    const sortedWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60);

    const maxCount = sortedWords.length > 0 ? sortedWords[0][1] : 1;
    const minCount = sortedWords.length > 0 ? sortedWords[sortedWords.length - 1][1] : 1;

    // Shuffle for visual effect
    const shuffledWords = sortedWords.sort(() => Math.random() - 0.5);

    const wordCloudHtml = shuffledWords.map(([word, count]) => {
        // Logarithmic scale for better distribution
        const weight = (Math.log(count) - Math.log(minCount)) / (Math.log(maxCount) - Math.log(minCount));
        const fontSize = 1 + (weight * 2.5); // 1rem to 3.5rem
        const opacity = 0.6 + (weight * 0.4); // 0.6 to 1.0

        return `<span style="font-size: ${fontSize.toFixed(2)}rem; opacity: ${opacity.toFixed(2)}; margin: 5px 10px; display: inline-block;">${word}</span>`;
    }).join('');

    // Build HTML Content
    const statsBody = `
        <h1>Wiki Statistics</h1>
        
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div class="counter" data-target="${totalChapters}" style="font-size: 2.5rem; font-weight: 700; color: var(--accent-primary);">0</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Chapters</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div class="counter" data-target="${totalSections}" style="font-size: 2.5rem; font-weight: 700; color: var(--accent-secondary);">0</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Articles</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div class="counter" data-target="${totalWords}" style="font-size: 2.5rem; font-weight: 700; color: var(--accent-tertiary);">0</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Total Words</div>
            </div>
        </div>

        <h2>Word Cloud</h2>
        <div class="word-cloud" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; padding: 40px; background: var(--bg-secondary); border-radius: var(--border-radius); border: 1px solid var(--border-subtle); margin-bottom: 40px;">
            ${wordCloudHtml}
        </div>

        <h2>Fun Facts</h2>
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">☕</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${coffeeCups}</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Cups of Coffee</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 5px;">to read the entire guide</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">⏱️</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${readingHours}h ${readingMins}m</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Reading Time</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 5px;">at 200 words/min</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">📏</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); word-break: break-all;">${extendedStats.longestWord}</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Longest Word</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">👀</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${extendedStats.watchout.toLocaleString()}</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">"WATCHOUT" Mentions</div>
            </div>
            <div class="stat-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">⚖️</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${avgSentenceLength}</div>
                <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Avg. Sentence Length</div>
            </div>
        </div>

        <h2>Chapter Breakdown</h2>
        <div style="overflow-x: auto; margin-bottom: 40px;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--bg-secondary);">
                        <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border-subtle);">Chapter</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 1px solid var(--border-subtle);">Articles</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 1px solid var(--border-subtle);">Words</th>
                    </tr>
                </thead>
                <tbody>
                    ${chapterStats.map(stat => `
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid var(--border-subtle); color: var(--text-primary);">${stat.title}</td>
                            <td style="padding: 12px; text-align: right; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary);">${stat.sections}</td>
                            <td style="padding: 12px; text-align: right; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary);">${stat.words.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <h2>Content Needs Attention (${emptySections.length})</h2>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Sections with less than 50 words.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;">
            ${emptySections.map(item => `
                <div style="background: rgba(255, 100, 100, 0.1); border: 1px solid rgba(255, 100, 100, 0.2); padding: 10px; border-radius: var(--border-radius);">
                    <div style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem;">${item.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${item.chapter} • ${item.words} words</div>
                </div>
            `).join('')}
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const counters = document.querySelectorAll('.counter');
                const speed = 200; // The lower the slower

                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText.replace(/,/g, '');
                        
                        // Lower inc to slow and higher to slow
                        const inc = target / speed;

                        if (count < target) {
                            // Add inc to count and output in counter
                            counter.innerText = Math.ceil(count + inc).toLocaleString();
                            // Call function every ms
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };

                    updateCount();
                });
            });
        </script>
    `;

    const breadcrumbs = `
        <a href="index.html" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item current">Statistics</span>
    `;

    // Generate page with Sidebar (active chapter none)
    // We can pick a random slug or empty string for sidebar generation
    const sidebar = generateSidebar('', 0);
    const html = generatePageHtml("Wiki Statistics", statsBody, sidebar, 0, breadcrumbs);

    fs.writeFileSync(path.join(OUTPUT_DIR, 'stats.html'), html);
    console.log("Generated: stats.html");
}

generateStatsPage();

// --- Generate Version Page ---
function generateVersionPage() {
    console.log("Generating version.html...");

    const packageJson = JSON.parse(fs.readFileSync(path.join(WIKI_ROOT, 'package.json'), 'utf8'));
    let changelog = '';

    try {
        changelog = fs.readFileSync(path.join(WIKI_ROOT, 'CHANGELOG.md'), 'utf8');
        // Simple markdown to HTML for changelog (very basic)
        changelog = changelog
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/g, '<br/>');

        // Wrap lists
        // This is a quick hack, a proper parser would be better but this suffices for a simple changelog
        changelog = changelog.replace(/<\/li><br\/><li>/g, '</li><li>');
        changelog = changelog.replace(/<li>.*<\/li>/s, '<ul>$&</ul>');

    } catch (e) {
        changelog = '<p>Changelog not found.</p>';
    }

    const versionBody = `
        <h1>Version Information</h1>
        <div class="version-card" style="background: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle); text-align: center; margin-bottom: 40px;">
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 10px;">Current Version</div>
            <div style="font-size: 4rem; font-weight: 700; color: var(--accent-primary); font-family: 'Futura Now Headline', sans-serif;">v${packageJson.version}</div>
            <div style="margin-top: 20px; font-size: 0.9rem; color: var(--text-muted);">Build Date: ${new Date().toISOString().split('T')[0]}</div>
        </div>

        <div class="changelog-container" style="background: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius); border: 1px solid var(--border-subtle);">
            ${changelog}
        </div>
    `;

    const breadcrumbs = `
        <a href="index.html" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item current">Version</span>
    `;

    const sidebar = generateSidebar('', 0);
    const html = generatePageHtml("Version Info", versionBody, sidebar, 0, breadcrumbs);

    fs.writeFileSync(path.join(OUTPUT_DIR, 'version.html'), html);
    console.log("Generated: version.html");
}

generateVersionPage();
