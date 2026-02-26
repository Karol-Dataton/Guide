/**
 * WATCHOUT Infrastructure Planner
 * Save/Load JSON, PNG/SVG export
 */

import { state, saveState } from './state.js';
import { renderNode } from './nodes.js';
import { updateConnections } from './connections.js';
import { applyPanZoom } from './canvas.js';
import { reRenderGroups } from './groups.js';
import { reRenderAnnotations } from './annotations.js';

const nodesLayer = document.getElementById('nodes-layer');

export function saveToFile() {
    const json = JSON.stringify({
        nodes: state.nodes,
        connections: state.connections,
        groups: state.groups,
        annotations: state.annotations,
        nextId: state.nextId,
        nextConnectionId: state.nextConnectionId,
        pan: state.pan,
        scale: state.scale
    }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'infrastructure-plan.json';
    a.click();
}

export function loadFromFile() {
    document.getElementById('load-file').click();
}

function getDiagramBounds() {
    const pad = 40;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.nodes.forEach(n => {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + n.width);
        maxY = Math.max(maxY, n.y + 200);
    });
    state.groups.forEach(g => {
        minX = Math.min(minX, g.x);
        minY = Math.min(minY, g.y);
        maxX = Math.max(maxX, g.x + g.width);
        maxY = Math.max(maxY, g.y + g.height);
    });
    if (!isFinite(minX)) return { x: 0, y: 0, w: 800, h: 600 };
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
}

export function exportImage() {
    if (typeof html2canvas === 'undefined') {
        alert('Image export library not loaded.');
        return;
    }

    // Temporarily set pan/zoom to capture full diagram
    const origPan = { ...state.pan };
    const origScale = state.scale;
    const b = getDiagramBounds();

    state.pan = { x: -b.x, y: -b.y };
    state.scale = 1;
    applyPanZoom();

    const element = document.getElementById('editor-container');
    html2canvas(element, { width: b.w, height: b.h, windowWidth: b.w, windowHeight: b.h }).then(canvas => {
        // Restore
        state.pan = origPan;
        state.scale = origScale;
        applyPanZoom();

        const link = document.createElement('a');
        link.download = 'infrastructure-plan.png';
        link.href = canvas.toDataURL();
        link.click();
    }).catch(err => {
        state.pan = origPan;
        state.scale = origScale;
        applyPanZoom();
        console.error('Export failed:', err);
        alert('Failed to export image.');
    });
}

export function exportSVG() {
    const b = getDiagramBounds();
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('viewBox', `${b.x} ${b.y} ${b.w} ${b.h}`);
    svg.setAttribute('width', b.w);
    svg.setAttribute('height', b.h);
    svg.setAttribute('style', `background: #12121a; font-family: Inter, sans-serif;`);

    // Groups
    state.groups.forEach(g => {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', g.x);
        rect.setAttribute('y', g.y);
        rect.setAttribute('width', g.width);
        rect.setAttribute('height', g.height);
        rect.setAttribute('fill', g.color);
        rect.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        rect.setAttribute('stroke-dasharray', '6 4');
        rect.setAttribute('rx', '12');
        svg.appendChild(rect);

        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', g.x + 12);
        text.setAttribute('y', g.y + 20);
        text.setAttribute('fill', '#94a3b8');
        text.setAttribute('font-size', '12');
        text.textContent = g.name;
        svg.appendChild(text);
    });

    // Connections
    const connSvg = document.getElementById('connections-layer');
    if (connSvg) {
        connSvg.querySelectorAll('path').forEach(p => {
            const clone = p.cloneNode(true);
            svg.appendChild(clone);
        });
    }

    // Nodes
    state.nodes.forEach(n => {
        const g = document.createElementNS(ns, 'g');

        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', n.x);
        rect.setAttribute('y', n.y);
        rect.setAttribute('width', n.width);
        rect.setAttribute('height', 40);
        rect.setAttribute('fill', n.data.color || '#2f2f40');
        rect.setAttribute('rx', '8');
        g.appendChild(rect);

        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', n.x + 12);
        text.setAttribute('y', n.y + 24);
        text.setAttribute('fill', '#f8fafc');
        text.setAttribute('font-size', '13');
        text.setAttribute('font-weight', '600');
        text.textContent = n.data.name;
        g.appendChild(text);

        svg.appendChild(g);
    });

    const serializer = new XMLSerializer();
    const blob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'infrastructure-plan.svg';
    a.click();
}

export function initFileIO() {
    const loadFile = document.getElementById('load-file');
    loadFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!Array.isArray(data.nodes) || !Array.isArray(data.connections)) {
                    alert('Invalid file format');
                    return;
                }

                state.nodes = data.nodes || [];
                state.connections = data.connections || [];
                state.groups = data.groups || [];
                state.annotations = data.annotations || [];
                state.nextId = data.nextId
                state.nextConnectionId = data.nextConnectionId || (state.connections.length > 0 ? Math.max(...state.connections.map(c => c.id)) + 1 : 1);
                state.pan = data.pan || { x: 0, y: 0 };
                state.scale = data.scale || 1;

                nodesLayer.innerHTML = '';
                state.nodes.forEach(node => renderNode(node));
                reRenderGroups();
                reRenderAnnotations();
                updateConnections();
                applyPanZoom();
                saveState();

                loadFile.value = '';
            } catch (err) {
                console.error("Error parsing file", err);
                alert('Failed to load file');
            }
        };
        reader.readAsText(file);
    });
}
