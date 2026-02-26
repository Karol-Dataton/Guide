/**
 * WATCHOUT Infrastructure Planner
 * Minimap — small overview showing full diagram + viewport
 */

import { state, saveState } from './state.js';
import { applyPanZoom } from './canvas.js';

const container = document.getElementById('editor-container');
const canvas = document.getElementById('minimap-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

let bounds = { minX: 0, minY: 0, maxX: 1, maxY: 1 };

export function updateMinimap() {
    if (!canvas) return;

    ctx.clearRect(0, 0, W, H);

    if (state.nodes.length === 0) return;

    // Compute world bounds
    const pad = 100;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.nodes.forEach(n => {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + n.width);
        maxY = Math.max(maxY, n.y + 150);
    });
    state.groups.forEach(g => {
        minX = Math.min(minX, g.x);
        minY = Math.min(minY, g.y);
        maxX = Math.max(maxX, g.x + g.width);
        maxY = Math.max(maxY, g.y + g.height);
    });
    minX -= pad; minY -= pad; maxX += pad; maxY += pad;

    const worldW = maxX - minX;
    const worldH = maxY - minY;
    const scaleX = W / worldW;
    const scaleY = H / worldH;
    const s = Math.min(scaleX, scaleY);

    const ox = (W - worldW * s) / 2;
    const oy = (H - worldH * s) / 2;

    bounds = { minX, minY, maxX, maxY, s, ox, oy };

    function toMini(wx, wy) {
        return { x: ox + (wx - minX) * s, y: oy + (wy - minY) * s };
    }

    // Draw groups
    ctx.strokeStyle = 'rgba(107, 37, 221, 0.4)';
    ctx.lineWidth = 1;
    state.groups.forEach(g => {
        const p = toMini(g.x, g.y);
        ctx.strokeRect(p.x, p.y, g.width * s, g.height * s);
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 0.5;
    state.connections.forEach(c => {
        const srcNode = state.nodes.find(n => n.id === c.source);
        const tgtNode = state.nodes.find(n => n.id === c.target);
        if (srcNode && tgtNode) {
            const a = toMini(srcNode.x + srcNode.width / 2, srcNode.y + 75);
            const b = toMini(tgtNode.x + tgtNode.width / 2, tgtNode.y + 75);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    });

    // Draw nodes
    state.nodes.forEach(n => {
        const p = toMini(n.x, n.y);
        const nw = n.width * s;
        const nh = 20 * s; // compact
        ctx.fillStyle = n.data.color || '#2f2f40';
        ctx.fillRect(p.x, p.y, Math.max(nw, 3), Math.max(nh, 2));
    });

    // Draw viewport rectangle
    const cRect = container.getBoundingClientRect();
    const vpX = -state.pan.x / state.scale;
    const vpY = -state.pan.y / state.scale;
    const vpW = cRect.width / state.scale;
    const vpH = cRect.height / state.scale;

    const vp = toMini(vpX, vpY);
    ctx.strokeStyle = 'rgba(107, 37, 221, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(vp.x, vp.y, vpW * s, vpH * s);
}

export function initMinimap() {
    if (!canvas) return;

    canvas.addEventListener('click', (e) => {
        if (state.nodes.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const { minX, minY, s, ox, oy } = bounds;
        const worldX = (mx - ox) / s + minX;
        const worldY = (my - oy) / s + minY;

        const cRect = container.getBoundingClientRect();
        state.pan.x = -(worldX * state.scale - cRect.width / 2);
        state.pan.y = -(worldY * state.scale - cRect.height / 2);

        applyPanZoom();
        saveState();
        updateMinimap();
    });

    // Auto-update periodically and on state changes
    setInterval(updateMinimap, 500);
}
