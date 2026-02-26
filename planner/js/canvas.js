/**
 * WATCHOUT Infrastructure Planner
 * Canvas interactions — pan, zoom, drag coordination
 */

import { state, saveState } from './state.js';
import { updateNodePosition, createNode } from './nodes.js';
import { renderTempLine, createConnection } from './connections.js';
import { selectNode, selectNodes } from './properties.js';
import { showContextMenu } from './contextMenu.js';
import { createGroup } from './groups.js';

const container = document.getElementById('editor-container');
const nodesLayer = document.getElementById('nodes-layer');
const svgLayer = document.getElementById('connections-layer');

export function startDragNode(e, node) {
    e.preventDefault();
    state.isDraggingNode = node.id;
    state.mouseStart = { x: e.clientX, y: e.clientY };

    // Store starting positions for all selected nodes (for multi-drag)
    if (state.selectedNodes.includes(node.id) && state.selectedNodes.length > 1) {
        state.dragStarts = {};
        state.selectedNodes.forEach(id => {
            const n = state.nodes.find(nn => nn.id === id);
            if (n) state.dragStarts[id] = { x: n.x, y: n.y };
        });
    } else {
        state.dragStarts = null;
    }
    state.nodeStart = { x: node.x, y: node.y };

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    if (!state.selectedNodes.includes(node.id)) {
        selectNode(node.id);
    }
}

export function onDragMove(e) {
    if (state.isDraggingNode) {
        const dx = (e.clientX - state.mouseStart.x) / state.scale;
        const dy = (e.clientY - state.mouseStart.y) / state.scale;

        const node = state.nodes.find(n => n.id === state.isDraggingNode);
        if (node) {
            let nx = state.nodeStart.x + dx;
            let ny = state.nodeStart.y + dy;
            if (state.snapToGrid) {
                const grid = 20;
                nx = Math.round(nx / grid) * grid;
                ny = Math.round(ny / grid) * grid;
            }
            node.x = nx;
            node.y = ny;
            updateNodePosition(node.id);

            // Move other selected nodes by the same delta
            if (state.dragStarts) {
                state.selectedNodes.forEach(id => {
                    if (id !== state.isDraggingNode && state.dragStarts[id]) {
                        const n = state.nodes.find(nn => nn.id === id);
                        if (n) {
                            n.x = state.dragStarts[id].x + dx;
                            n.y = state.dragStarts[id].y + dy;
                            if (state.snapToGrid) {
                                n.x = Math.round(n.x / 20) * 20;
                                n.y = Math.round(n.y / 20) * 20;
                            }
                            updateNodePosition(id);
                        }
                    }
                });
            }
        }
    } else if (state.isConnecting) {
        renderTempLine(e.clientX, e.clientY);
    } else if (state.isPanning) {
        const dx = e.clientX - state.mouseStart.x;
        const dy = e.clientY - state.mouseStart.y;
        state.pan.x += dx;
        state.pan.y += dy;
        state.mouseStart = { x: e.clientX, y: e.clientY };
        applyPanZoom();
    }
}

export function onDragEnd(e) {
    if (state.isDraggingNode) {
        state.isDraggingNode = null;
        saveState();
    }
    if (state.isConnecting) {
        const targetEl = document.elementFromPoint(e.clientX, e.clientY);
        const socket = targetEl ? targetEl.closest('.port-socket') : null;

        if (socket) {
            const targetNode = parseInt(socket.dataset.node);
            const targetPort = socket.dataset.port;

            if (targetNode !== state.isConnecting.sourceNodeId) {
                createConnection(
                    state.isConnecting.sourceNodeId,
                    state.isConnecting.sourcePortId,
                    targetNode,
                    targetPort
                );
            }
        }

        state.isConnecting = null;
        const tempLine = document.getElementById('temp-line');
        if (tempLine) tempLine.remove();

        // Clear target highlights
        document.querySelectorAll('.port-socket').forEach(s => {
            s.classList.remove('valid-target', 'invalid-target');
        });
    }
    if (state.isPanning) {
        state.isPanning = false;
        document.getElementById('editor-container').style.cursor = state.spaceHeld ? 'grab' : '';
        saveState();
    }

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
}

export function applyPanZoom() {
    const t = `translate(${state.pan.x}px, ${state.pan.y}px) scale(${state.scale})`;
    nodesLayer.style.transform = t;
    svgLayer.style.transform = t;
    const groupsLayer = document.getElementById('groups-layer');
    if (groupsLayer) groupsLayer.style.transform = t;
    updateZoomIndicator();
}

function updateZoomIndicator() {
    const indicator = document.getElementById('zoom-level');
    if (indicator) indicator.textContent = `${Math.round(state.scale * 100)}%`;
}

export function zoomIn() {
    setZoom(state.scale * 1.2);
}

export function zoomOut() {
    setZoom(state.scale / 1.2);
}

export function zoomReset() {
    setZoom(1);
    state.pan = { x: 0, y: 0 };
    applyPanZoom();
    saveState();
}

export function zoomFit() {
    if (state.nodes.length === 0) { zoomReset(); return; }

    const padding = 60;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.nodes.forEach(n => {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + n.width);
        maxY = Math.max(maxY, n.y + 150); // approximate height
    });

    const contentW = maxX - minX + padding * 2;
    const contentH = maxY - minY + padding * 2;
    const scaleX = container.clientWidth / contentW;
    const scaleY = container.clientHeight / contentH;
    const newScale = Math.min(scaleX, scaleY, 2);

    state.scale = Math.max(newScale, 0.1);
    state.pan.x = (container.clientWidth - (minX + maxX) * state.scale) / 2;
    state.pan.y = (container.clientHeight - (minY + maxY) * state.scale) / 2;
    applyPanZoom();
    saveState();
}

function setZoom(newScale) {
    state.scale = Math.max(0.1, Math.min(newScale, 4));
    applyPanZoom();
    saveState();
}

export function initCanvas() {
    container.addEventListener('mousedown', (e) => {
        if (state.spaceHeld) {
            e.preventDefault();
            state.isPanning = true;
            state.mouseStart = { x: e.clientX, y: e.clientY };
            document.getElementById('editor-container').style.cursor = 'grabbing';
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
            return;
        }
        if (e.target === container || e.target === svgLayer) {
            if (e.shiftKey) {
                // Marquee selection
                startMarquee(e);
            } else {
                selectNode(null);
                state.isPanning = true;
                state.mouseStart = { x: e.clientX, y: e.clientY };
                document.addEventListener('mousemove', onDragMove);
                document.addEventListener('mouseup', onDragEnd);
            }
        }
    });

    // Canvas right-click context menu
    container.addEventListener('contextmenu', (e) => {
        if (e.target === container || e.target === svgLayer) {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const worldX = (e.clientX - rect.left - state.pan.x) / state.scale;
            const worldY = (e.clientY - rect.top - state.pan.y) / state.scale;

            const nodeItems = [
                'production', 'display', 'watchpax', 'projector', 'led',
                'matrix', 'ndi', 'capture', 'mediaserver', 'dmx', 'audio',
                'switch', 'control'
            ].map(type => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                action: () => createNode(type, worldX - 100, worldY - 50)
            }));

            const items = [
                ...nodeItems,
                { separator: true },
                { label: 'Add Group', icon: 'fa-object-group', action: () => createGroup('Group', worldX, worldY, 300, 200) }
            ];

            if (state.clipboard) {
                items.unshift({ separator: true });
                items.unshift({ label: 'Paste', icon: 'fa-paste', action: () => {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'v', ctrlKey: true }));
                }});
            }

            showContextMenu(e.clientX, e.clientY, items);
        }
    });

    // Mouse wheel zoom centered on cursor
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;

        // World position under cursor before zoom
        const worldX = (cursorX - state.pan.x) / state.scale;
        const worldY = (cursorY - state.pan.y) / state.scale;

        const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        state.scale = Math.max(0.1, Math.min(state.scale * factor, 4));

        // Adjust pan so world position stays under cursor
        state.pan.x = cursorX - worldX * state.scale;
        state.pan.y = cursorY - worldY * state.scale;

        applyPanZoom();
        saveState();
    }, { passive: false });

    // Set initial zoom indicator
    updateZoomIndicator();
}

// --- Marquee Selection ---
function startMarquee(e) {
    const rect = container.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;

    const marquee = document.createElement('div');
    marquee.className = 'marquee-selection';
    document.body.appendChild(marquee);

    function onMove(ev) {
        const x = Math.min(startX, ev.clientX);
        const y = Math.min(startY, ev.clientY);
        const w = Math.abs(ev.clientX - startX);
        const h = Math.abs(ev.clientY - startY);
        marquee.style.left = `${x}px`;
        marquee.style.top = `${y}px`;
        marquee.style.width = `${w}px`;
        marquee.style.height = `${h}px`;
    }

    function onUp(ev) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        marquee.remove();

        // Calculate world-space rect
        const x1 = Math.min(startX, ev.clientX);
        const y1 = Math.min(startY, ev.clientY);
        const x2 = Math.max(startX, ev.clientX);
        const y2 = Math.max(startY, ev.clientY);

        const cRect = container.getBoundingClientRect();
        const wx1 = (x1 - cRect.left - state.pan.x) / state.scale;
        const wy1 = (y1 - cRect.top - state.pan.y) / state.scale;
        const wx2 = (x2 - cRect.left - state.pan.x) / state.scale;
        const wy2 = (y2 - cRect.top - state.pan.y) / state.scale;

        const hits = state.nodes.filter(n =>
            n.x + n.width > wx1 && n.x < wx2 && n.y + 150 > wy1 && n.y < wy2
        ).map(n => n.id);

        if (hits.length > 0) {
            selectNodes(hits);
        } else {
            selectNode(null);
        }
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}
