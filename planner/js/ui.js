/**
 * WATCHOUT Infrastructure Planner
 * Toolbar, keyboard shortcuts
 */

import { state, saveState, recordUndo, undo, redo } from './state.js';
import { createNode, deleteNode, duplicateNode, renderNode, reRenderAll } from './nodes.js';
import { updateConnections } from './connections.js';
import { saveToFile, loadFromFile, exportImage, exportSVG } from './export.js';
import { zoomIn, zoomOut, zoomFit, zoomReset } from './canvas.js';
import { selectNode, selectNodes } from './properties.js';

const container = document.getElementById('editor-container');
const nodesLayer = document.getElementById('nodes-layer');

export function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        state.nodes.forEach(node => {
            const el = document.getElementById(`node-${node.id}`);
            if (!el) return;
            if (!q) {
                el.classList.remove('search-match', 'search-dim');
                return;
            }
            const haystack = `${node.data.name} ${node.type} ${node.data.ip || ''} ${node.data.resolution || ''}`.toLowerCase();
            if (haystack.includes(q)) {
                el.classList.add('search-match');
                el.classList.remove('search-dim');
            } else {
                el.classList.add('search-dim');
                el.classList.remove('search-match');
            }
        });
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
}

export function initToolbar() {
    const toolButtons = {
        production: document.getElementById('add-production'),
        display: document.getElementById('add-display'),
        watchpax: document.getElementById('add-watchpax'),
        projector: document.getElementById('add-projector'),
        led: document.getElementById('add-led'),
        matrix: document.getElementById('add-matrix'),
        ndi: document.getElementById('add-ndi'),
        capture: document.getElementById('add-capture'),
        mediaserver: document.getElementById('add-mediaserver'),
        dmx: document.getElementById('add-dmx'),
        audio: document.getElementById('add-audio'),
        switch: document.getElementById('add-switch'),
        control: document.getElementById('add-control'),
        autoLayout: document.getElementById('auto-layout'),
        clear: document.getElementById('clear-canvas'),
        save: document.getElementById('save-plan'),
        load: document.getElementById('load-plan'),
        export: document.getElementById('export-image'),
        exportSvg: document.getElementById('export-svg')
    };

    // Zoom controls
    document.getElementById('zoom-in')?.addEventListener('click', zoomIn);
    document.getElementById('zoom-out')?.addEventListener('click', zoomOut);
    document.getElementById('zoom-fit')?.addEventListener('click', zoomFit);
    document.getElementById('zoom-reset')?.addEventListener('click', zoomReset);

    // Snap toggle
    const snapBtn = document.getElementById('snap-toggle');
    if (snapBtn) {
        snapBtn.addEventListener('click', () => {
            state.snapToGrid = !state.snapToGrid;
            snapBtn.classList.toggle('active', state.snapToGrid);
            snapBtn.setAttribute('aria-pressed', state.snapToGrid);
            document.getElementById('editor-container').classList.toggle('snap-active', state.snapToGrid);
        });
    }

    Object.keys(toolButtons).forEach(key => {
        const btn = toolButtons[key];
        if (!btn) return;

        btn.addEventListener('click', () => {
            const cx = (-state.pan.x + container.clientWidth / 2) / state.scale;
            const cy = (-state.pan.y + container.clientHeight / 2) / state.scale;

            if (key === 'autoLayout') {
                autoLayoutNodes();
            } else if (key === 'clear') {
                if (confirm('Clear all nodes?')) {
                    recordUndo();
                    state.nodes = [];
                    state.connections = [];
                    nodesLayer.innerHTML = '';
                    updateConnections();
                    saveState();
                }
            } else if (key === 'save') {
                saveToFile();
            } else if (key === 'load') {
                loadFromFile();
            } else if (key === 'export') {
                exportImage();
            } else if (key === 'exportSvg') {
                exportSVG();
            } else {
                createNode(key, cx - 100, cy - 50);
            }
        });
    });
}

export function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Space held for pan mode
        if (e.code === 'Space' && !e.repeat && !state.spaceHeld) {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
            e.preventDefault();
            state.spaceHeld = true;
            document.getElementById('editor-container').style.cursor = 'grab';
            return;
        }

        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            if (undo()) { reRenderAll(); }
        } else if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
            e.preventDefault();
            if (redo()) { reRenderAll(); }
        } else if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveToFile();
        } else if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            if (state.selection) {
                const newId = duplicateNode(state.selection);
                if (newId) selectNode(newId);
            }
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            if (state.selection) {
                const orig = state.nodes.find(n => n.id === state.selection);
                if (orig) state.clipboard = JSON.parse(JSON.stringify(orig));
            }
        } else if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            if (state.clipboard) {
                recordUndo();
                const node = {
                    ...JSON.parse(JSON.stringify(state.clipboard)),
                    id: state.nextId++,
                    x: state.clipboard.x + 40,
                    y: state.clipboard.y + 40
                };
                node.data.name = `${node.data.name.split('-')[0]}-${node.id}`;
                state.clipboard.x = node.x;
                state.clipboard.y = node.y;
                state.nodes.push(node);
                renderNode(node);
                saveState();
                selectNode(node.id);
            }
        } else if (e.key === 'Escape') {
            if (state.isConnecting) {
                state.isConnecting = null;
                const tempLine = document.getElementById('temp-line');
                if (tempLine) tempLine.remove();
                document.querySelectorAll('.port-socket').forEach(s => {
                    s.classList.remove('valid-target', 'invalid-target');
                });
            } else {
                selectNode(null);
            }
        } else if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            selectNodes(state.nodes.map(n => n.id));
        } else if (e.key === '?') {
            toggleShortcutOverlay();
        } else if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedNodes.length > 0) {
            recordUndo();
            const toDelete = [...state.selectedNodes];
            toDelete.forEach(id => {
                state.connections = state.connections.filter(c => c.source !== id && c.target !== id);
                state.nodes = state.nodes.filter(n => n.id !== id);
                const el = document.getElementById(`node-${id}`);
                if (el) el.remove();
            });
            selectNode(null);
            updateConnections();
            saveState();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            state.spaceHeld = false;
            document.getElementById('editor-container').style.cursor = '';
        }
    });
}

function autoLayoutNodes() {
    if (state.nodes.length === 0) return;
    recordUndo();

    // Build adjacency: treat connections as directed graph
    const adj = {};
    const inDeg = {};
    state.nodes.forEach(n => { adj[n.id] = []; inDeg[n.id] = 0; });
    state.connections.forEach(c => {
        adj[c.source].push(c.target);
        inDeg[c.target] = (inDeg[c.target] || 0) + 1;
    });

    // Topological sort for layer assignment (Kahn's algorithm)
    const layers = [];
    const queue = state.nodes.filter(n => (inDeg[n.id] || 0) === 0).map(n => n.id);
    const assigned = new Set();

    while (queue.length > 0) {
        const layer = [...queue];
        layers.push(layer);
        queue.length = 0;
        layer.forEach(id => {
            assigned.add(id);
            (adj[id] || []).forEach(tid => {
                inDeg[tid]--;
                if (inDeg[tid] === 0 && !assigned.has(tid)) {
                    queue.push(tid);
                }
            });
        });
    }

    // Catch unassigned nodes (cycles)
    state.nodes.forEach(n => {
        if (!assigned.has(n.id)) {
            if (layers.length === 0) layers.push([]);
            layers[layers.length - 1].push(n.id);
        }
    });

    // Position nodes: layers left to right, nodes top to bottom within layer
    const gapX = 280;
    const gapY = 180;
    const startX = 60;
    const startY = 60;

    layers.forEach((layer, li) => {
        layer.forEach((nodeId, ni) => {
            const node = state.nodes.find(n => n.id === nodeId);
            if (node) {
                node.x = startX + li * gapX;
                node.y = startY + ni * gapY;
            }
        });
    });

    reRenderAll();
    saveState();
}

function toggleShortcutOverlay() {
    let overlay = document.getElementById('shortcut-overlay');
    if (overlay) {
        overlay.remove();
        return;
    }
    overlay = document.createElement('div');
    overlay.id = 'shortcut-overlay';
    overlay.innerHTML = `
        <div class="shortcut-panel">
            <h3>Keyboard Shortcuts</h3>
            <div class="shortcut-row"><kbd>Ctrl+S</kbd> Save to file</div>
            <div class="shortcut-row"><kbd>Ctrl+Z</kbd> Undo</div>
            <div class="shortcut-row"><kbd>Ctrl+Y</kbd> Redo</div>
            <div class="shortcut-row"><kbd>Ctrl+D</kbd> Duplicate node</div>
            <div class="shortcut-row"><kbd>Ctrl+C</kbd> Copy node</div>
            <div class="shortcut-row"><kbd>Ctrl+V</kbd> Paste node</div>
            <div class="shortcut-row"><kbd>Delete</kbd> Delete selected</div>
            <div class="shortcut-row"><kbd>Escape</kbd> Deselect / Cancel</div>
            <div class="shortcut-row"><kbd>Space+Drag</kbd> Pan canvas</div>
            <div class="shortcut-row"><kbd>Scroll Wheel</kbd> Zoom</div>
            <div class="shortcut-row"><kbd>Right-click wire</kbd> Delete connection</div>
            <div class="shortcut-row"><kbd>?</kbd> Toggle this overlay</div>
            <button class="shortcut-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
}
