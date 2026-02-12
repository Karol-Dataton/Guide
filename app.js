// WATCHOUT Wiki/User Guide - Application Logic (Static Version)

// Theme initialization - apply saved theme before page renders
(function initTheme() {
    const savedTheme = localStorage.getItem('watchout-wiki-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupThemeToggle();
    setupMobileMenu();
    setupHeroVideo();

    setupSidebarAccordion();
    setupVideoModals();
    setupSearch();
    setupBadges();

    renderTocPreview();
    setupDiagramTheme();
});

// ... existing code ...

function setupBadges() {
    // Generate a unique key for the current page
    const getStorageKey = () => {
        const pageId = document.body.getAttribute('data-page-id') || window.location.pathname;
        return `watchout-wiki-badges-${pageId}`;
    };

    // Get active badges array for THIS page
    const getActiveBadges = () => {
        try {
            return JSON.parse(localStorage.getItem(getStorageKey())) || [];
        } catch (e) {
            return [];
        }
    };

    const contentBody = document.getElementById('content-body');

    // Initial Application
    applyBadgeFilters(getActiveBadges());

    // Toggle logic
    contentBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('article-badge')) {
            const badge = e.target.getAttribute('data-badge');
            let activeBadges = getActiveBadges();

            if (activeBadges.includes(badge)) {
                // Deactivate: Remove from array
                activeBadges = activeBadges.filter(b => b !== badge);
            } else {
                // Activate: Add to array
                activeBadges.push(badge);
            }

            localStorage.setItem(getStorageKey(), JSON.stringify(activeBadges));
            applyBadgeFilters(activeBadges);
        }
    });

    function applyBadgeFilters(activeBadges) {
        // Highlight active badges
        document.querySelectorAll('.article-badge').forEach(el => {
            const badge = el.getAttribute('data-badge');
            if (activeBadges.includes(badge)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Filter Sidebar (Future Check: Filter based on all active badges)
        if (activeBadges.length > 0) {
            console.log(`Filtering by badges: ${activeBadges.join(', ')}`);
        } else {
            console.log('Badge filters cleared');
        }
    }
}


// Update diagram based on theme
function setupDiagramTheme() {
    const updateDiagram = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const diagrams = document.querySelectorAll('img[src$="system_architecture_diagram.svg"], img[src$="system_architecture_diagram_dark.svg"], img[src$="watchout-pipeline.svg"], img[src$="watchout-pipeline_dark.svg"]');

        diagrams.forEach(diagram => {
            const isDark = ['dark', 'midnight', 'rust'].includes(currentTheme);
            const src = diagram.getAttribute('src');
            // Determine base path (e.g., "../media/")
            const basePath = src.substring(0, src.lastIndexOf('/') + 1);
            const filename = src.substring(src.lastIndexOf('/') + 1);

            // Get the base filename (without _dark suffix)
            let baseFilename = filename;
            if (filename.endsWith('_dark.svg')) {
                baseFilename = filename.replace('_dark.svg', '.svg');
            }

            if (isDark) {
                if (!src.endsWith('_dark.svg')) {
                    diagram.setAttribute('src', basePath + baseFilename.replace('.svg', '_dark.svg'));
                }
            } else {
                if (src.endsWith('_dark.svg')) {
                    diagram.setAttribute('src', basePath + baseFilename);
                }
            }
        });
    };

    // Run initially
    updateDiagram();

    // Hook into theme toggle
    // Since setupThemeToggle attaches an event listener that just changes the attribute,
    // we can observe the attribute change or just piggyback on the toggle button if accessible.
    // Better: use MutationObserver on html element to detect theme changes anywhere.

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateDiagram();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Video Modal Functionality
function setupVideoModals() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('video-modal')) {
        const modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <button class="video-modal-close" aria-label="Close">&times;</button>
            <video id="video-modal-player" class="video-modal-content" controls></video>
        `;
        document.body.appendChild(modal);

        // Close modal on background click or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('video-modal-close')) {
                closeVideoModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        });
    }

    // Attach click handlers to all video thumbnails
    const videos = document.querySelectorAll('.content-video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            // Use getAttribute to get the actual src attribute, not the resolved URL
            openVideoModal(video.getAttribute('src'));
        });
    });
}

function openVideoModal(videoSrc) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');
    if (modal && player) {
        player.src = videoSrc;
        modal.classList.add('active');
        player.play();
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');
    if (modal && player) {
        modal.classList.remove('active');
        player.pause();
        player.src = '';
    }
}

function setupSidebarAccordion() {
    // This logic needs to run on both index.html (dynamic) and sub-pages (static html)
    // For index.html, it runs after innerHTML is set.
    // For sub-pages, the HTML is already there.

    // If we're on index.html, we attach listeners AFTER setupSidebar populates it.
    // But setupSidebar is only for index.html.
    // So let's make sure we attach event listeners to all .toc-chapter-header elements.

    const headers = document.querySelectorAll('.toc-chapter-header');
    headers.forEach(header => {
        header.addEventListener('click', (e) => {
            const chapterDiv = header.parentElement;
            const isExpanded = chapterDiv.classList.contains('expanded');

            // Logic:
            // 1. If user clicks a chapter header that is already expanded:
            //    - It should COLLAPSE.
            //    - It should PREVENT navigation (reloading the page).
            // 2. If user clicks a chapter header that is NOT expanded:
            //    - It should NAVIGATE to the chapter page.

            // Check if the clicked header's link is the current page
            const headerLink = header.getAttribute('href');
            const currentPath = window.location.pathname;
            // Normalize paths for comparison (e.g., remove trailing slashes, handle index.html)
            const normalizedHeaderLink = headerLink.endsWith('/index.html') ? headerLink.replace('/index.html', '/') : headerLink;
            const normalizedCurrentPath = currentPath.endsWith('/index.html') ? currentPath.replace('/index.html', '/') : currentPath;

            if (normalizedHeaderLink === normalizedCurrentPath ||
                (normalizedHeaderLink === '/' && normalizedCurrentPath === '/index.html') ||
                (normalizedHeaderLink === '/index.html' && normalizedCurrentPath === '/')) {
                // We are on this page.
                // So "clicking again" means we are clicking the active chapter.
                e.preventDefault();
                chapterDiv.classList.toggle('expanded');
                header.classList.toggle('expanded');
                return;
            }

            // Logic for closing when already expanded (but not current page context)
            if (isExpanded) {
                e.preventDefault();
                chapterDiv.classList.remove('expanded');
                header.classList.remove('expanded');
            }
            // Else: let default link behavior happen (navigation)
        });
    });
}

function renderTocPreview() {
    const tocPreviewGrid = document.getElementById('toc-preview-grid');
    if (!tocPreviewGrid || typeof chaptersData === 'undefined') return;

    if (!tocPreviewGrid || typeof chaptersData === 'undefined') return;

    tocPreviewGrid.innerHTML = chaptersData.map(chapter => `
        <a href="${slugify(chapter.title)}/index.html" class="toc-card ${chapter.disabled ? 'disabled' : ''}" style="text-decoration: none; display: block;">
            <h4>
                <span class="toc-card-icon">${getIcon(chapter.icon)}</span>
                ${chapter.title}
            </h4>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-card-subsections">
                    ${chapter.subsections.slice(0, 4).map(sub => `
                        <span class="toc-card-subsection">${sub.title}</span>
                    `).join('')}
                    ${chapter.subsections.length > 4 ? `<span class="toc-card-subsection">+${chapter.subsections.length - 4} more</span>` : ''}
                </div>
            ` : ''}
        </a>
    `).join('');
}

function setupSidebar() {
    const tocNav = document.getElementById('toc-nav');

    // Only populate if empty (index.html) AND data is available
    if (!tocNav || tocNav.children.length > 0 || typeof chaptersData === 'undefined') return;

    // Only populate if empty (index.html) AND data is available
    if (!tocNav || tocNav.children.length > 0 || typeof chaptersData === 'undefined') return;

    tocNav.innerHTML = chaptersData.map(chapter => {
        const chapterSlug = slugify(chapter.title);

        return `
        <div class="toc-chapter ${chapter.disabled ? 'disabled' : ''}">
            <a href="${chapterSlug}/index.html" class="toc-chapter-header" style="text-decoration: none; display: flex;">
                <span class="toc-chapter-icon">${getIcon(chapter.icon)}</span>
                <span class="toc-chapter-title">${chapter.title}</span>
                 ${chapter.subsections.length > 0 ? `
                    <svg class="toc-chapter-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </a>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-subsections">
                    ${chapter.subsections.map(sub => `
                        <a class="toc-subsection" href="${chapterSlug}/${slugify(sub.title)}.html">
                            ${sub.title}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
        `;
    }).join('');

    // Re-attach listeners now that we've added to DOM
    setupSidebarAccordion();
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const themes = ['dark', 'light', 'midnight', 'rust'];
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[nextIndex];

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('watchout-wiki-theme', newTheme);
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (btn && sidebar && overlay) {
        btn.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}



function setupHeroVideo() {
    const heroMedia = document.getElementById('hero-media');
    if (!heroMedia) return;

    const videos = [
        'media/Live_Show_Programmer_Creates_Scene.mp4',
        'media/Looping_Video_Generation_Complete.mp4',
        'media/Video_Generation_With_Asian_Male_Operator.mp4'
    ];
    // Simple check if media files exist? No, just try to play.
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    heroMedia.innerHTML = `
        <div class="video-wrapper" style="position: relative;">
            <video autoplay muted loop playsinline>
                <source src="${randomVideo}" type="video/mp4">
            </video>
            <div class="hero-overlay">
                <img src="media/product_mark_org.png" alt="WATCHOUT Logo" class="hero-logo">
            </div>
        </div>
    `;
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const tocNav = document.getElementById('toc-nav');

    if (!searchInput || !searchClear || !tocNav) return;

    let debounceTimer;

    setupMagicWord(); // Initialize the magic word listener

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();

        if (query.length > 0) {
            searchClear.style.display = 'flex';
        } else {
            searchClear.style.display = 'none';
            setupSidebar(); // Restore TOC
            // Force re-setup sidebar accordion listeners if setupSidebar didn't run (it guards against existing children)
            // Actually setupSidebar guards if children exist. If we clear tocNav to show results, it's empty.
            return;
        }

        debounceTimer = setTimeout(() => {
            if (query.length >= 2) {
                const results = performSearch(query);
                renderSearchResults(results, tocNav);
            } else if (query.length === 0) {
                // If we clear quickly, restore TOC
                tocNav.innerHTML = ''; // Clear results to allow setupSidebar to populate
                setupSidebar();
            }
        }, 300);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        tocNav.innerHTML = ''; // Clear results
        setupSidebar(); // Restore TOC
        searchInput.focus();
    });
}

function performSearch(query) {
    if (typeof wikiContent === 'undefined') return [];

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Helper to strip HTML
    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    // Determine relative path to root based on current script location
    let rootPrefix = '';
    const appScript = document.querySelector('script[src*="app.js"]');
    if (appScript) {
        const src = appScript.getAttribute('src');
        if (src.includes('../')) {
            rootPrefix = '../';
        } else if (src.indexOf('/') === -1 || src.startsWith('./') || src === 'app.js') {
            rootPrefix = '';
        }
    }

    Object.keys(wikiContent).forEach(chapterTitle => {
        const chapterData = wikiContent[chapterTitle];
        const chapterSlug = slugify(chapterTitle);

        // Search in Overview (Chapter Index)
        if (chapterData.overview) {
            const text = stripHtml(chapterData.overview);
            if (text.toLowerCase().includes(lowerQuery) || chapterTitle.toLowerCase().includes(lowerQuery)) {
                results.push({
                    title: chapterTitle,
                    subtitle: "Overview",
                    url: `${rootPrefix}${chapterSlug}/index.html`,
                    snippet: getSnippet(text, lowerQuery),
                    score: chapterTitle.toLowerCase().includes(lowerQuery) ? 10 : 5 // Simple scoring
                });
            }
        }

        // Search in Sections
        if (chapterData.sections) {
            Object.keys(chapterData.sections).forEach(sectionTitle => {
                const content = chapterData.sections[sectionTitle];
                const text = stripHtml(content);
                const sectionSlug = slugify(sectionTitle);

                if (sectionTitle.toLowerCase().includes(lowerQuery) || text.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        title: sectionTitle,
                        subtitle: chapterTitle,
                        url: `${rootPrefix}${chapterSlug}/${sectionSlug}.html`,
                        snippet: getSnippet(text, lowerQuery),
                        score: sectionTitle.toLowerCase().includes(lowerQuery) ? 10 : 5
                    });
                }
            });
        }
    });

    return results.sort((a, b) => b.score - a.score);
}

function getSnippet(text, query) {
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text.substring(0, 100) + '...';

    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + query.length + 40);

    return (start > 0 ? '...' : '') +
        text.substring(start, end) +
        (end < text.length ? '...' : '');
}

function renderSearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = `<div class="search-no-results">No results found</div>`;
        return;
    }

    container.innerHTML = `
        <div class="search-results-header">Search Results (${results.length})</div>
        <div class="search-results-list">
            ${results.map(result => `
                <a href="${result.url}" class="search-result-item">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-subtitle">${result.subtitle}</div>
                    <div class="search-result-snippet">${escapeHtml(result.snippet)}</div>
                </a>
            `).join('')}
        </div>
    `;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function slugify(text) {
    return text.toLowerCase()
        .replace(/^\d+\.\s+/, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}
function setupMagicWord() {
    let keys = '';
    const magicWord = 'stats';
    const timer = null;

    document.addEventListener('keydown', (e) => {
        // Reset if key is not a letter or number or space
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        keys += e.key.toLowerCase();

        // Keep buffer size manageable
        if (keys.length > 20) {
            keys = keys.slice(-20);
        }

        if (keys.endsWith(magicWord)) {
            let rootPrefix = '';
            const appScript = document.querySelector('script[src*="app.js"]');
            if (appScript) {
                const src = appScript.getAttribute('src');
                // Heuristic for root path based on app.js location
                if (src.includes('../')) {
                    rootPrefix = '../';
                } else if (src.indexOf('/') === -1 || src.startsWith('./') || src === 'app.js') {
                    rootPrefix = '';
                }
            }
            window.location.href = rootPrefix + 'stats.html';
        }

        if (keys.endsWith('version')) {
            let rootPrefix = '';
            const appScript = document.querySelector('script[src*="app.js"]');
            if (appScript) {
                const src = appScript.getAttribute('src');
                // Heuristic for root path based on app.js location
                if (src.includes('../')) {
                    rootPrefix = '../';
                } else if (src.indexOf('/') === -1 || src.startsWith('./') || src === 'app.js') {
                    rootPrefix = '';
                }
            }
            window.location.href = rootPrefix + 'version.html';
        }
    });
}
