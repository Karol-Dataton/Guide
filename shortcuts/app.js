// WATCHOUT Keyboard Shortcuts Data
const shortcuts = [
    // GENERAL
    { keys: ['Ctrl', 'O'], action: 'Open a show file', category: 'general' },
    { keys: ['Ctrl', 'S'], action: 'Save show to disk', category: 'general' },
    { keys: ['Ctrl', 'Shift', 'S'], action: 'Save show to disk with new name', category: 'general' },
    { keys: ['Alt', 'Enter'], action: 'Show Properties', category: 'general' },
    { keys: ['Shift', 'Enter'], action: 'Draw focus to/away from Properties window', category: 'general' },
    { keys: ['Ctrl', 'Tab'], action: 'Cycle over all open windows left to right', category: 'general' },
    { keys: ['Ctrl', 'Shift', 'Tab'], action: 'Cycle over all open windows right to left', category: 'general' },
    { keys: ['Ctrl', 'F4'], action: 'Close selected window', category: 'general' },
    { keys: ['Ctrl', 'F6'], action: 'Cycle over all open windows left to right', category: 'general' },
    { keys: ['Ctrl', 'Shift', 'F6'], action: 'Cycle over all open windows right to left', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'A'], action: 'Open/focus Assets window', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'S'], action: 'Open/focus Stage window', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'T'], action: 'Open/focus Timelines window', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'D'], action: 'Open/focus Devices window', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'C'], action: 'Open/focus Cue List window', category: 'general' },
    { keys: ['Ctrl', 'Alt', 'V'], action: 'Open/focus Variables window', category: 'general' },
    // EDIT
    { keys: ['Ctrl', 'Z'], action: 'Undo', category: 'edit' },
    { keys: ['Ctrl', 'Y'], action: 'Redo', category: 'edit' },
    { keys: ['Ctrl', 'X'], action: 'Cut', category: 'edit' },
    { keys: ['Ctrl', 'C'], action: 'Copy', category: 'edit' },
    { keys: ['Ctrl', 'V'], action: 'Paste', category: 'edit' },
    { keys: ['Delete'], action: 'Delete', category: 'edit' },
    { keys: ['Ctrl', 'A'], action: 'Select all', category: 'edit' },
    { keys: ['Ctrl', 'E'], action: 'Select to end', category: 'edit' },
    { keys: ['Ctrl', 'M'], action: 'Move stage position of selected cues/displays', category: 'edit' },
    { keys: ['Ctrl', 'F'], action: 'Find', category: 'edit' },
    { keys: ['Ctrl', 'N'], action: 'Snap (toggle)', category: 'edit' },
    // PROPERTY
    { keys: ['Tab'], action: 'Move keyboard focus to next field', category: 'property' },
    { keys: ['Shift', 'Tab'], action: 'Move keyboard focus to previous field', category: 'property' },
    { keys: ['Ctrl', 'Wheel'], action: 'Increase/decrease value in field', category: 'property' },
    { keys: ['Ctrl', 'Shift', 'Wheel'], action: 'Increase/decrease value in field more', category: 'property' },
    { keys: ['Arrow Up'], action: 'Increment value (in number property)', category: 'property' },
    { keys: ['Shift', 'Arrow Up'], action: 'Increment value more (in number/slider/time property)', category: 'property' },
    { keys: ['Arrow Down'], action: 'Decrement value (in number/slider/time property)', category: 'property' },
    { keys: ['Shift', 'Arrow Down'], action: 'Decrement value more (in number/slider/time property)', category: 'property' },
    // STAGE & PREVIEW
    { keys: ['Ctrl', 'Shift', 'D'], action: 'Frame displays', category: 'stage' },
    { keys: ['Ctrl', 'Shift', 'O'], action: 'Scroll to origin', category: 'stage' },
    { keys: ['Alt', 'Drag'], action: 'Zoom scale to rectangle', category: 'stage' },
    { keys: ['Ctrl', 'Alt', 'Drag'], action: 'To pan', category: 'stage' },
    { keys: ['Ctrl', 'Arrow'], action: 'Nudge image of selected cue 1 pixel', category: 'stage' },
    { keys: ['Ctrl', 'Shift', 'Arrow'], action: 'Nudge image of selected cue 10 pixels', category: 'stage' },
    { keys: ['Ctrl', '1'], action: 'Preview scale 1:16', category: 'stage' },
    { keys: ['Ctrl', '2'], action: 'Preview scale 1:8', category: 'stage' },
    { keys: ['Ctrl', '3'], action: 'Preview scale 1:4', category: 'stage' },
    { keys: ['Ctrl', '4'], action: 'Preview scale 1:2', category: 'stage' },
    { keys: ['Ctrl', '5'], action: 'Preview scale 1:1', category: 'stage' },
    // CAMERA MODE: NORMAL
    { keys: ['A'], action: 'Pan left (Camera Normal Mode)', category: 'camera' },
    { keys: ['D'], action: 'Pan right (Camera Normal Mode)', category: 'camera' },
    { keys: ['W'], action: 'Pan up (Camera Normal Mode)', category: 'camera' },
    { keys: ['S'], action: 'Pan down (Camera Normal Mode)', category: 'camera' },
    { keys: ['Wheel'], action: 'Zoom in/out (Camera Mode)', category: 'camera' },
    // CAMERA MODE: FIRST PERSON AND PROJECTOR
    { keys: ['E'], action: 'Pan up (First Person/Projector Mode)', category: 'camera' },
    { keys: ['Q'], action: 'Pan down (First Person/Projector Mode)', category: 'camera' },
    { keys: ['J'], action: 'Orbit left (First Person Mode)', category: 'camera' },
    { keys: ['L'], action: 'Orbit right (First Person Mode)', category: 'camera' },
    { keys: ['I'], action: 'Orbit up (First Person Mode)', category: 'camera' },
    { keys: ['K'], action: 'Orbit down (First Person Mode)', category: 'camera' },
    // TIMELINE
    { keys: ['Ctrl', 'T'], action: 'Click jumps to time (toggle)', category: 'timeline' },
    { keys: ['Ctrl', 'P'], action: 'Add play control cue', category: 'timeline' },
    { keys: ['Ctrl', 'Shift', 'P'], action: 'Add pause control cue', category: 'timeline' },
    { keys: ['Ctrl', 'I'], action: 'Insert layer', category: 'timeline' },
    { keys: ['Ctrl', 'Delete'], action: 'Delete layer', category: 'timeline' },
    { keys: ['Ctrl', 'G'], action: 'Group cues into composition', category: 'timeline' },
    { keys: ['Ctrl', 'Shift', 'G'], action: 'Ungroup cues', category: 'timeline' },
    { keys: ['Space'], action: 'Start timeline (toggle)', category: 'timeline' },
    { keys: ['Esc'], action: 'Pause timeline (no toggle)', category: 'timeline' },
    { keys: ['Num 0'], action: 'Start timeline (no toggle)', category: 'timeline' },
    { keys: ['Num *'], action: 'Returns playhead to last paused position', category: 'timeline' },
    { keys: ['Num +'], action: 'Magnify timeline scale', category: 'timeline' },
    { keys: ['Num -'], action: 'Reduce timeline scale', category: 'timeline' },
    { keys: ['Ctrl', '0'], action: 'Zoom to fit (or zoom to selection)', category: 'timeline' },
    { keys: ['Shift', 'Wheel'], action: 'Move timeline marker 0.1 second', category: 'timeline' },
    { keys: ['Ctrl', 'Shift', 'Wheel'], action: 'Move timeline marker 1 second', category: 'timeline' },
    { keys: ['Ctrl', 'Wheel'], action: 'Scroll timeline horizontally', category: 'timeline' },
    // TABLE VIEWS
    { keys: ['Arrow Up'], action: 'Select row above (Table Views)', category: 'table' },
    { keys: ['Arrow Down'], action: 'Select row below (Table Views)', category: 'table' },
    { keys: ['Home'], action: 'Jump to first row (Table Views)', category: 'table' },
    { keys: ['End'], action: 'Jump to last row (Table Views)', category: 'table' },
    { keys: ['Page Up'], action: 'Scroll up one page (Table Views)', category: 'table' },
    { keys: ['Page Down'], action: 'Scroll down one page (Table Views)', category: 'table' },
    // EFFECT
    { keys: ['Alt', 'Shift', 'I'], action: 'Fade-in', category: 'effect' },
    { keys: ['Alt', 'Shift', 'O'], action: 'Fade-out', category: 'effect' },
    { keys: ['Alt', 'Shift', 'X'], action: 'Cross-fade', category: 'effect' },
    { keys: ['Alt', 'P'], action: 'Position', category: 'effect' },
    { keys: ['Alt', 'S'], action: 'Scale', category: 'effect' },
    { keys: ['Alt', 'O'], action: 'Opacity', category: 'effect' },
    { keys: ['Alt', 'B'], action: 'Gaussian Blur', category: 'effect' },
    { keys: ['Alt', 'C'], action: 'Crop All Sides', category: 'effect' },
    { keys: ['Alt', 'X'], action: 'Rotation X-Axis', category: 'effect' },
    { keys: ['Alt', 'Z'], action: 'Rotation Z-Axis', category: 'effect' },
    { keys: ['Alt', 'Y'], action: 'Rotation Y-Axis', category: 'effect' },
    { keys: ['Alt', 'V'], action: 'Volume', category: 'effect' },
    // WARP
    { keys: ['Arrow Up'], action: 'Select next warp point above (Warp Display)', category: 'warp' },
    { keys: ['Arrow Down'], action: 'Select next warp point below (Warp Display)', category: 'warp' },
    { keys: ['Arrow Left'], action: 'Select next warp point to the left (Warp Display)', category: 'warp' },
    { keys: ['Arrow Right'], action: 'Select next warp point to the right (Warp Display)', category: 'warp' },
    { keys: ['Ctrl', 'Left Click'], action: 'Add a warp point (when pointing at a line)', category: 'warp' },
];

// Key mapping for data-key attributes to shortcut keys
const keyMapping = {
    'Esc': ['Esc'],
    'F1': ['F1'], 'F2': ['F2'], 'F3': ['F3'], 'F4': ['F4'],
    'F5': ['F5'], 'F6': ['F6'], 'F7': ['F7'], 'F8': ['F8'],
    'F9': ['F9'], 'F10': ['F10'], 'F11': ['F11'], 'F12': ['F12'],
    '0': ['0'], '1': ['1'], '2': ['2'], '3': ['3'], '4': ['4'],
    '5': ['5'], '6': ['6'], '7': ['7'], '8': ['8'], '9': ['9'],
    'Q': ['Q'], 'W': ['W'], 'E': ['E'], 'R': ['R'], 'T': ['T'],
    'Y': ['Y'], 'U': ['U'], 'I': ['I'], 'O': ['O'], 'P': ['P'],
    'A': ['A'], 'S': ['S'], 'D': ['D'], 'F': ['F'], 'G': ['G'],
    'H': ['H'], 'J': ['J'], 'K': ['K'], 'L': ['L'],
    'Z': ['Z'], 'X': ['X'], 'C': ['C'], 'V': ['V'], 'B': ['B'],
    'N': ['N'], 'M': ['M'],
    'Tab': ['Tab'], 'Enter': ['Enter'], 'Space': ['Space'],
    'Backspace': ['Backspace'], 'Delete': ['Delete'],
    'Ctrl': ['Ctrl'], 'Ctrl-Right': ['Ctrl'],
    'Shift': ['Shift'], 'Shift-Right': ['Shift'],
    'Alt': ['Alt'], 'Alt-Right': ['Alt'],
    'ArrowUp': ['Arrow Up', 'Arrow'], 'ArrowDown': ['Arrow Down', 'Arrow'],
    'ArrowLeft': ['Arrow Left', 'Arrow'], 'ArrowRight': ['Arrow Right', 'Arrow'],
    'Home': ['Home'], 'End': ['End'], 'PageUp': ['Page Up'], 'PageDown': ['Page Down'],
    'Num0': ['Num 0'], 'Num1': ['Num 1'], 'Num2': ['Num 2'], 'Num3': ['Num 3'],
    'Num4': ['Num 4'], 'Num5': ['Num 5'], 'Num6': ['Num 6'], 'Num7': ['Num 7'],
    'Num8': ['Num 8'], 'Num9': ['Num 9'], 'Num+': ['Num +'], 'Num-': ['Num -'], 'Num*': ['Num *'],
};

// Category colors
const categoryColors = {
    general: '#22c55e', edit: '#3b82f6', timeline: '#f59e0b', stage: '#ec4899',
    property: '#06b6d4', camera: '#84cc16', effect: '#f43f5e', table: '#a855f7', warp: '#14b8a6'
};

// DOM Elements
const infoPanel = document.getElementById('info-panel');
const infoDefault = infoPanel ? infoPanel.querySelector('.info-default') : null;
const infoShortcuts = document.getElementById('info-shortcuts');
const infoKeyDisplay = document.getElementById('info-key-display');
const shortcutsList = document.getElementById('shortcuts-list');
const navButtons = document.querySelectorAll('.nav-btn');
const keys = document.querySelectorAll('.key');
const searchInput = document.getElementById('search-input');

let currentCategory = 'all';
let selectedKey = null;
let searchQuery = '';

// Find shortcuts for a key
function findShortcutsForKey(keyName) {
    const mappedKeys = keyMapping[keyName] || [keyName];
    return shortcuts.filter(shortcut => {
        return shortcut.keys.some(k => mappedKeys.includes(k));
    }).filter(shortcut => {
        if (currentCategory === 'all') return true;
        return shortcut.category === currentCategory;
    });
}

// Render shortcuts in the info panel
function renderShortcuts(keyName, keyShortcuts) {
    if (!infoPanel) return;

    if (keyShortcuts.length === 0) {
        if (selectedKey) {
            infoDefault.style.display = 'none';
            infoShortcuts.style.display = 'block';
            infoKeyDisplay.textContent = keyName;
            shortcutsList.innerHTML = '<div class="shortcut-item"><div class="shortcut-description"><span class="shortcut-action" style="color: var(--text-muted); font-style: italic;">No shortcuts found for this key in current category.</span></div></div>';
        } else {
            infoDefault.style.display = 'flex';
            infoShortcuts.style.display = 'none';
        }
        return;
    }
    infoDefault.style.display = 'none';
    infoShortcuts.style.display = 'block';
    infoKeyDisplay.textContent = keyName;
    shortcutsList.innerHTML = keyShortcuts.map(shortcut => `
        <div class="shortcut-item">
            <div class="shortcut-keys">
                ${shortcut.keys.map((k, i) => `<span class="shortcut-key${i < shortcut.keys.length - 1 ? ' modifier' : ''}">${k}</span>`).join('<span style="color:#64748b">+</span>')}
            </div>
            <div class="shortcut-description">
                <span class="shortcut-action">${shortcut.action}</span>
                <span class="shortcut-category ${shortcut.category}">${shortcut.category}</span>
            </div>
        </div>
    `).join('');
}

// Reset info panel
function resetInfoPanel() {
    if (!infoPanel) return;
    infoDefault.style.display = 'flex';
    infoShortcuts.style.display = 'none';
}

// Highlight keys with shortcuts
function highlightKeysWithShortcuts() {
    if (keys.length === 0) return;

    keys.forEach(key => {
        const keyName = key.dataset.key;

        if (searchQuery) {
            // Search mode highlighting
            const mappedKeys = keyMapping[keyName] || [keyName];
            // Filter global shortcuts for query
            const matchedShortcuts = shortcuts.filter(s =>
                s.action.toLowerCase().includes(searchQuery) ||
                s.keys.join(' ').toLowerCase().includes(searchQuery)
            );

            // Check if this key is involved in any matched shortcut
            const isRelated = matchedShortcuts.some(s =>
                s.keys.some(k => mappedKeys.includes(k))
            );

            key.classList.toggle('has-shortcut', isRelated);
            if (isRelated) {
                key.classList.add('highlighted');
                key.style.setProperty('--category-color', 'var(--accent-primary)');
            } else {
                key.classList.remove('highlighted');
                key.style.removeProperty('--category-color');
            }
        } else {
            // Normal category mode highlighting
            const keyShortcuts = findShortcutsForKey(keyName);
            key.classList.toggle('has-shortcut', keyShortcuts.length > 0);
            if (currentCategory !== 'all' && keyShortcuts.length > 0) {
                key.classList.add('highlighted');
                key.style.setProperty('--category-color', categoryColors[currentCategory]);
            } else {
                key.classList.remove('highlighted');
                key.style.removeProperty('--category-color');
            }
        }
    });
}

// Event Listeners
if (keys.length > 0) {
    keys.forEach(key => {
        key.addEventListener('click', (e) => {
            e.stopPropagation();
            const keyName = key.dataset.key;

            if (selectedKey === key) {
                // Deselect if already selected
                selectedKey.classList.remove('selected');
                selectedKey = null;
                resetInfoPanel();
            } else {
                // Deselect previous
                if (selectedKey) {
                    selectedKey.classList.remove('selected');
                }

                // Select new
                selectedKey = key;
                selectedKey.classList.add('selected');

                const keyShortcuts = findShortcutsForKey(keyName);
                renderShortcuts(keyName, keyShortcuts);
            }
        });

        key.addEventListener('mouseenter', () => {
            if (!selectedKey && !searchQuery) {
                const keyName = key.dataset.key;
                const keyShortcuts = findShortcutsForKey(keyName);
                renderShortcuts(keyName, keyShortcuts);
            }
        });

        key.addEventListener('mouseleave', () => {
            if (!selectedKey && !searchQuery) {
                resetInfoPanel();
            }
        });
    });
}

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();

        // Clear key selection when searching
        if (selectedKey) {
            selectedKey.classList.remove('selected');
            selectedKey = null;
        }

        if (searchQuery === '') {
            // Reset to category view
            highlightKeysWithShortcuts();
            resetInfoPanel();
            return;
        }

        // Filter shortcuts
        const matchedShortcuts = shortcuts.filter(s =>
            s.action.toLowerCase().includes(searchQuery) ||
            s.keys.join(' ').toLowerCase().includes(searchQuery)
        );

        highlightKeysWithShortcuts();

        // Display results
        if (infoPanel) {
            infoDefault.style.display = 'none';
            infoShortcuts.style.display = 'block';
            infoKeyDisplay.textContent = 'Search';

            if (matchedShortcuts.length === 0) {
                shortcutsList.innerHTML = '<div class="shortcut-item"><div class="shortcut-description"><span class="shortcut-action" style="color: var(--text-muted); font-style: italic;">No shortcuts found.</span></div></div>';
            } else {
                shortcutsList.innerHTML = matchedShortcuts.map(shortcut => `
                <div class="shortcut-item">
                    <div class="shortcut-keys">
                        ${shortcut.keys.map((k, i) => `<span class="shortcut-key${i < shortcut.keys.length - 1 ? ' modifier' : ''}">${k}</span>`).join('<span style="color:#64748b">+</span>')}
                    </div>
                    <div class="shortcut-description">
                        <span class="shortcut-action">${shortcut.action}</span>
                        <span class="shortcut-category ${shortcut.category}">${shortcut.category}</span>
                    </div>
                </div>
            `).join('');
            }
        }
    });
}


// Click outside to deselect
document.addEventListener('click', (e) => {
    if (selectedKey && !e.target.closest('.key')) {
        selectedKey.classList.remove('selected');
        selectedKey = null;
        resetInfoPanel();
    }
});

if (navButtons.length > 0) {
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Clear search
            searchQuery = '';
            if (searchInput) searchInput.value = '';

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;

            // Clear selection
            if (selectedKey) {
                selectedKey.classList.remove('selected');
                selectedKey = null;
            }

            highlightKeysWithShortcuts();
            highlightKeysWithShortcuts();
            resetInfoPanel();
        });
    });
}

// Initialize
highlightKeysWithShortcuts();

// View Switcher logic
const switcherSlider = document.querySelector('.switcher-slider');
const viewBtns = document.querySelectorAll('.view-btn');

function updateSlider() {
    const activeBtn = document.querySelector('.view-btn.active');
    if (activeBtn && switcherSlider) {
        switcherSlider.style.width = `${activeBtn.offsetWidth}px`;
        switcherSlider.style.left = `${activeBtn.offsetLeft}px`;
    }
}

// Initialize slider position
if (switcherSlider) {
    // Small delay to ensure layout is ready
    setTimeout(updateSlider, 50);
    window.addEventListener('resize', updateSlider);
}

// Page Transition Logic
// View Switching Logic
const interactiveView = document.getElementById('interactive-view');
const printableView = document.getElementById('printable-view');
const controlsRow = document.querySelector('.controls-row');

function switchView(viewName) {
    if (!interactiveView || !printableView) return;

    // Update buttons
    viewBtns.forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update slider
    updateSlider();

    // Toggle views
    if (viewName === 'interactive') {
        printableView.style.display = 'none';
        interactiveView.style.display = 'flex';
        if (controlsRow) controlsRow.style.display = 'flex';
        // Re-run highlighting to ensure correct state
        highlightKeysWithShortcuts();
    } else {
        interactiveView.style.display = 'none';
        printableView.style.display = 'flex';
        if (controlsRow) controlsRow.style.display = 'none';
    }
}

viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = btn.dataset.view;
        if (viewName) {
            switchView(viewName);
        }
    });
});

// Printable View rendering
function renderPrintableView() {
    const printableGrid = document.getElementById('printable-grid');
    if (!printableGrid) return;

    // Group shortcuts by category
    const categories = {};
    const categoryOrder = [
        'general', 'edit', 'property', 'stage', 'camera',
        'timeline', 'table', 'effect', 'warp'
    ];

    shortcuts.forEach(shortcut => {
        if (!categories[shortcut.category]) {
            categories[shortcut.category] = [];
        }
        categories[shortcut.category].push(shortcut);
    });

    // Clear existing content
    printableGrid.innerHTML = '';

    // Render each category
    categoryOrder.forEach(category => {
        if (!categories[category]) return;

        const categoryShortcuts = categories[category];
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

        const section = document.createElement('div');
        section.className = 'category-section';

        const header = document.createElement('h2');
        header.className = `category-header category-${category}`;
        header.textContent = categoryTitle;
        section.appendChild(header);

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${categoryShortcuts.map(s => `
                    <tr>
                        <td>
                            <div class="shortcut-keys">
                                ${s.keys.map(k => `<span class="key-badge">${k}</span>`).join('<span class="key-separator">+</span>')}
                            </div>
                        </td>
                        <td class="action-text">${s.action}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        section.appendChild(table);
        printableGrid.appendChild(section);
    });
}

// Initial slider update (already existing, but good to keep in mind)
// Initialize printable view
renderPrintableView();

