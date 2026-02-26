/**
 * WATCHOUT Infrastructure Planner
 * Entry point — init and event wiring
 */

import { state, loadState } from './state.js';
import { createNode, renderNode } from './nodes.js';
import { updateConnections } from './connections.js';
import { initCanvas, applyPanZoom } from './canvas.js';
import { initToolbar, initKeyboard, initSearch } from './ui.js';
import { initFileIO } from './export.js';
import { reRenderGroups } from './groups.js';
import { reRenderAnnotations } from './annotations.js';
import { initMinimap } from './minimap.js';
import { templateList, loadTemplate } from './templates.js';

// --- Initialization ---

initCanvas();
initToolbar();
initKeyboard();
initFileIO();
initMinimap();
initSearch();

// Collapsible properties panel
const collapseBtn = document.getElementById('collapse-panel');
if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
        const panel = document.getElementById('properties-panel');
        panel.classList.toggle('collapsed');
        const icon = collapseBtn.querySelector('i');
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-left');
    });
}

// Onboarding overlay on first visit
if (!localStorage.getItem('watchout-planner-onboarded')) {
    const overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.innerHTML = `
        <div class="onboarding-panel">
            <h2>Welcome to WATCHOUT Planner</h2>
            <div class="onboarding-tips">
                <div class="onboarding-tip"><kbd>Toolbar</kbd> Add nodes from the dropdown menus above</div>
                <div class="onboarding-tip"><kbd>Drag</kbd> Move nodes by dragging their header</div>
                <div class="onboarding-tip"><kbd>Port &rarr; Port</kbd> Connect ports by dragging between them</div>
                <div class="onboarding-tip"><kbd>Right-click</kbd> Context menus on nodes, wires, and canvas</div>
                <div class="onboarding-tip"><kbd>Space+Drag</kbd> Pan the canvas</div>
                <div class="onboarding-tip"><kbd>Scroll</kbd> Zoom in/out</div>
                <div class="onboarding-tip"><kbd>Ctrl+Z/Y</kbd> Undo / Redo</div>
                <div class="onboarding-tip"><kbd>?</kbd> Show all keyboard shortcuts</div>
            </div>
            <button class="onboarding-close">Get Started</button>
        </div>
    `;
    overlay.querySelector('.onboarding-close').addEventListener('click', () => {
        overlay.remove();
        localStorage.setItem('watchout-planner-onboarded', '1');
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
            localStorage.setItem('watchout-planner-onboarded', '1');
        }
    });
    document.body.appendChild(overlay);
}

// Populate templates menu
const tmenu = document.getElementById('templates-menu');
if (tmenu) {
    templateList.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'dropdown-item';
        btn.textContent = t.label;
        btn.addEventListener('click', () => {
            if (confirm(`Load "${t.label}" template? Current diagram will be replaced.`)) {
                loadTemplate(t.id);
            }
        });
        tmenu.appendChild(btn);
    });
}

if (loadState()) {
    state.nodes.forEach(node => renderNode(node));
    reRenderGroups();
    reRenderAnnotations();
    updateConnections();
    applyPanZoom();
} else {
    createNode('production', 100, 100);
}
