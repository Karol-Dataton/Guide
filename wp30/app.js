// WATCHPAX 30 Wiki/User Guide - Application Logic (Static Version)

// Theme initialization - apply saved theme before page renders
(function initTheme() {
    const savedTheme = localStorage.getItem('watchout-wiki-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

const UI_STRINGS = {
    en: {
        overview: 'Overview',
        noResults: 'No results found',
        searchResults: 'Search Results'
    },
    pl: {
        overview: 'Przeglad',
        noResults: 'Brak wynikow',
        searchResults: 'Wyniki wyszukiwania'
    }
};

const currentLang = ((document.documentElement.getAttribute('lang') || 'en').toLowerCase().startsWith('pl')) ? 'pl' : 'en';
const ui = UI_STRINGS[currentLang] || UI_STRINGS.en;


document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupThemeToggle();
    setupMobileMenu();
    setupHeroVideo();

    setupSidebarAccordion();
    setupVideoModals();
    setupImageModals();
    setupCarousels();
    setupSearch();
    setupChapterLanding();
    setupGlossarySearch();

    renderTocPreview();
    setupDiagramTheme();
    setupTabs();
});

// Tab functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = btn.getAttribute('data-tab');
            const container = btn.closest('.tab-container');

            if (!container) return;

            // Deactivate all in this container
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activate clicked
            btn.classList.add('active');
            const content = container.querySelector(`.tab-content[id="${tabId}"]`);
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const counterCurrent = carousel.querySelector('.carousel-counter-current');
        const total = slides.length;

        if (total === 0) return;

        let currentIndex = 0;

        function goToSlide(index) {
            if (index < 0 || index >= total) return;

            // Hide current slide
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            // Show target slide
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            // Update controls
            prevBtn.disabled = (currentIndex === 0);
            nextBtn.disabled = (currentIndex === total - 1);

            // Update counter text
            if (counterCurrent) {
                counterCurrent.textContent = currentIndex + 1;
            }


        }

        // Arrow buttons
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
                goToSlide(slideIndex);
            });
        });

        // Keyboard navigation when carousel is focused or hovered
        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goToSlide(currentIndex + 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                goToSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                goToSlide(total - 1);
            }
        });

        // Initialize state
        goToSlide(0);

        // Re-setup image modals for images inside carousel slides
        setupImageModals();
    });
}

// Make chapter-landing list items fully clickable + assign section indices for rail
function setupChapterLanding() {
    const landing = document.querySelector('.chapter-landing');
    if (!landing) return;

    // Assign data-section index to each h3 and its associated siblings (p, ul)
    let sectionIdx = 0;
    let current = landing.firstElementChild;
    while (current) {
        if (current.tagName === 'H3') {
            current.setAttribute('data-section', sectionIdx);
            // Tag following p and ul siblings until the next h3
            let sibling = current.nextElementSibling;
            while (sibling && sibling.tagName !== 'H3') {
                sibling.setAttribute('data-section', sectionIdx);
                sibling = sibling.nextElementSibling;
            }
            sectionIdx++;
        }
        current = current.nextElementSibling;
    }
    landing.setAttribute('data-section-count', sectionIdx);

    // Make li cards fully clickable
    landing.querySelectorAll('ul li').forEach(li => {
        const link = li.querySelector('a');
        if (!link) return;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            link.click();
        });
    });
}

function setupGlossarySearch() {
    if (document.body.getAttribute('data-page-id') !== 'glossary') return;

    const landing = document.querySelector('.chapter-landing');
    if (!landing) return;

    const blocks = [];
    let currentBlock = null;

    Array.from(landing.children).forEach((el) => {
        if (el.classList && el.classList.contains('glossary-search')) return;

        if (el.tagName === 'H3') {
            currentBlock = {
                title: (el.textContent || '').trim(),
                bodyText: '',
                elements: [el]
            };
            blocks.push(currentBlock);
            return;
        }

        if (!currentBlock) return;

        currentBlock.elements.push(el);
        currentBlock.bodyText += ` ${(el.textContent || '').trim()}`;
    });

    if (blocks.length === 0) return;

    const helperBlock = blocks.find((block) => block.title.toLowerCase() === 'browse terms');
    if (helperBlock) {
        helperBlock.elements.forEach((el) => {
            el.style.display = 'none';
        });
    }

    const searchableBlocks = blocks.filter((block) => block !== helperBlock);
    if (searchableBlocks.length === 0) return;

    const searchUi = document.createElement('div');
    searchUi.className = 'glossary-search';
    searchUi.innerHTML = `
        <div class="glossary-search-row">
            <div class="glossary-search-input-wrap">
                <input type="search" class="glossary-search-input" placeholder="Search glossary terms..." aria-label="Search glossary terms">
                <button type="button" class="glossary-search-clear-x" aria-label="Clear glossary search">&times;</button>
            </div>
        </div>
        <div class="glossary-search-meta">
            <span class="glossary-search-count"></span>
            <span class="glossary-search-empty">No matching terms.</span>
        </div>
    `;

    landing.prepend(searchUi);

    const input = searchUi.querySelector('.glossary-search-input');
    const clearBtn = searchUi.querySelector('.glossary-search-clear-x');
    const count = searchUi.querySelector('.glossary-search-count');
    const empty = searchUi.querySelector('.glossary-search-empty');

    if (!input || !clearBtn || !count || !empty) return;

    const render = () => {
        const query = input.value.trim().toLowerCase();
        let visibleCount = 0;

        searchableBlocks.forEach((block) => {
            const searchableText = `${block.title} ${block.bodyText}`.toLowerCase();
            const visible = query.length === 0 || searchableText.includes(query);

            block.elements.forEach((el) => {
                el.style.display = visible ? '' : 'none';
            });

            if (visible) visibleCount += 1;
        });

        count.textContent = `${visibleCount} term${visibleCount === 1 ? '' : 's'}`;
        empty.style.display = visibleCount === 0 ? 'inline' : 'none';
        clearBtn.classList.toggle('visible', query.length > 0);
    };

    input.addEventListener('input', render);
    clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        render();
    });

    render();
}


// Update diagram based on theme
function setupDiagramTheme() {
    const updateDiagram = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const diagrams = document.querySelectorAll('img[src$="system_architecture_diagram.svg"], img[src$="system_architecture_diagram_dark.svg"], img[src$="watchout-pipeline.svg"], img[src$="watchout-pipeline_dark.svg"], img[src$="edge-blending-diagram.svg"], img[src$="edge-blending-diagram_dark.svg"], img[src$="output-protocol-comparison.svg"], img[src$="output-protocol-comparison_dark.svg"]');

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

// Image Modal Functionality
function setupImageModals() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('image-modal')) {
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <button class="image-modal-close" aria-label="Close">&times;</button>
            <img id="image-modal-viewer" class="image-modal-content" alt="">
            <p id="image-modal-caption" class="image-modal-caption"></p>
        `;
        document.body.appendChild(modal);

        // Close modal on background click or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('image-modal-close')) {
                closeImageModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeImageModal();
            }
        });
    }

    // Attach click handlers to all content images
    const images = document.querySelectorAll('.content-image');
    images.forEach(image => {
        if (image.__imageModalInitialized) return;
        image.__imageModalInitialized = true;

        image.addEventListener('click', () => {
            openImageModal(image.getAttribute('src'), image.getAttribute('alt') || '');
        });
    });
}

function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('image-modal');
    const viewer = document.getElementById('image-modal-viewer');
    const caption = document.getElementById('image-modal-caption');

    if (modal && viewer && caption) {
        viewer.src = imageSrc;
        viewer.alt = imageAlt || 'Expanded image';
        caption.textContent = imageAlt;
        caption.style.display = imageAlt ? 'block' : 'none';
        modal.classList.add('active');
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    const viewer = document.getElementById('image-modal-viewer');
    const caption = document.getElementById('image-modal-caption');

    if (modal && viewer && caption) {
        modal.classList.remove('active');
        viewer.src = '';
        viewer.alt = '';
        caption.textContent = '';
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
        if (header.__accordionInitialized) return;
        header.__accordionInitialized = true;
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
            } else {
                // Navigate immediately
                window.location.href = headerLink;
            }
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

function getSidebarSubsections(subsections) {
    return [...subsections].sort((a, b) => {
        const aGrouped = Number.isInteger(a.groupOrder);
        const bGrouped = Number.isInteger(b.groupOrder);

        if (aGrouped && bGrouped) {
            if (a.groupOrder !== b.groupOrder) return a.groupOrder - b.groupOrder;
            if (a.groupItemOrder !== b.groupItemOrder) return a.groupItemOrder - b.groupItemOrder;
            return a.page - b.page;
        }

        if (aGrouped !== bGrouped) return aGrouped ? -1 : 1;

        return a.page - b.page;
    });
}

function setupSidebar() {
    const tocNav = document.getElementById('toc-nav');

    // Only populate if empty (index.html) AND data is available
    if (!tocNav || tocNav.children.length > 0 || typeof chaptersData === 'undefined') return;

    // Only populate if empty (index.html) AND data is available
    if (!tocNav || tocNav.children.length > 0 || typeof chaptersData === 'undefined') return;

    tocNav.innerHTML = chaptersData.map(chapter => {
        const chapterSlug = slugify(chapter.title);
        const sidebarSubsections = getSidebarSubsections(chapter.subsections);

        return `
        <div class="toc-chapter ${chapter.disabled ? 'disabled' : ''}">
            <a href="${chapterSlug}/index.html" class="toc-chapter-header" style="text-decoration: none; display: flex;">
                <span class="toc-chapter-icon">${getIcon(chapter.icon)}</span>
                <span class="toc-chapter-title">${chapter.title}</span>
                 ${sidebarSubsections.length > 0 ? `
                    <svg class="toc-chapter-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </a>
            ${sidebarSubsections.length > 0 ? `
                <div class="toc-subsections">
                    <div class="toc-subsections-inner">
                    ${(() => {
                    let currentGroup = null;
                    return sidebarSubsections.map(sub => {
                        let groupLabel = '';
                        if (sub.group && sub.group !== currentGroup) {
                            currentGroup = sub.group;
                            groupLabel = `<div class="toc-group-label">${sub.group}</div>`;
                        }

                        return `${groupLabel}
                        <a class="toc-subsection" href="${chapterSlug}/${slugify(sub.title)}.html">
                            ${sub.title}
                        </a>
                    `;
                    }).join('');
                })()}
                    </div>
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
        'media/wp30/WPX_30_SOLO_NO_TXT_720p30_web.mp4'
    ];
    const randomVideo = videos[0];

    heroMedia.innerHTML = `
        <div class="video-wrapper" style="position: relative;">
            <video autoplay muted loop playsinline>
                <source src="${randomVideo}" type="video/mp4">
            </video>
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
                    subtitle: ui.overview,
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
        container.innerHTML = `<div class="search-no-results">${ui.noResults}</div>`;
        return;
    }

    container.innerHTML = `
        <div class="search-results-header">${ui.searchResults} (${results.length})</div>
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
