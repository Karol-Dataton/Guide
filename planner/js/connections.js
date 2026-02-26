/**
 * WATCHOUT Infrastructure Planner
 * Connection management and rendering
 */

import { state, saveState, recordUndo } from './state.js';
import { refreshNodeVisuals } from './nodes.js';
import { onDragMove, onDragEnd } from './canvas.js';

const svgLayer = document.getElementById('connections-layer');
const container = document.getElementById('editor-container');

function getPortType(nodeId, portId) {
    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return null;
    const port = node.ports.find(p => p.id === portId);
    return port ? port.type : null;
}

function isCompatible(typeA, typeB) {
    if (typeA === 'network' && typeB === 'network') return true;
    if ((typeA === 'output' && typeB === 'input') || (typeA === 'input' && typeB === 'output')) return true;
    return false;
}

export function startConnection(e, nodeId, portId, type) {
    state.isConnecting = {
        sourceNodeId: nodeId,
        sourcePortId: portId,
        sourceType: type,
        startPos: getPortPosition(nodeId, portId)
    };

    // Highlight valid drop targets
    document.querySelectorAll('.port-socket').forEach(s => {
        const sNode = parseInt(s.dataset.node);
        const sType = s.dataset.type;
        if (sNode !== nodeId && isCompatible(type, sType)) {
            s.classList.add('valid-target');
        } else if (sNode !== nodeId) {
            s.classList.add('invalid-target');
        }
    });

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'connection-line');
    path.setAttribute('id', 'temp-line');
    path.style.strokeDasharray = "5,5";
    svgLayer.appendChild(path);

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
}

export function renderTempLine(mouseX, mouseY) {
    if (!state.isConnecting) return;

    const rect = container.getBoundingClientRect();
    const endX = (mouseX - rect.left - state.pan.x) / state.scale;
    const endY = (mouseY - rect.top - state.pan.y) / state.scale;

    const start = state.isConnecting.startPos;

    const d = getBezierPath(start.x, start.y, endX, endY);
    const el = document.getElementById('temp-line');
    if (el) el.setAttribute('d', d);
}

export function createConnection(sourceNode, sourcePort, targetNode, targetPort) {
    const srcType = getPortType(sourceNode, sourcePort);
    const tgtType = getPortType(targetNode, targetPort);

    if (!isCompatible(srcType, tgtType)) return;

    recordUndo();
    const exists = state.connections.find(c =>
        (c.source === sourceNode && c.sourcePort === sourcePort && c.target === targetNode && c.targetPort === targetPort) ||
        (c.source === targetNode && c.sourcePort === targetPort && c.target === sourceNode && c.targetPort === sourcePort)
    );
    if (exists) return;

    // Normalize direction: output→input, either direction for network
    let src = sourceNode, srcP = sourcePort, tgt = targetNode, tgtP = targetPort, wireType = srcType;
    if (srcType === 'input' && tgtType === 'output') {
        src = targetNode; srcP = targetPort; tgt = sourceNode; tgtP = sourcePort; wireType = 'output';
    }

    state.connections.push({
        id: state.nextConnectionId++,
        source: src,
        sourcePort: srcP,
        target: tgt,
        targetPort: tgtP,
        wireType: wireType
    });
    updateConnections();

    refreshNodeVisuals(state.nodes.find(n => n.id === sourceNode));
    refreshNodeVisuals(state.nodes.find(n => n.id === targetNode));

    saveState();
}

function ensureArrowDefs() {
    if (svgLayer.querySelector('#arrow-output')) return;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    const colors = { output: '#3b82f6', input: '#22c55e', network: '#f59e0b' };
    for (const [type, color] of Object.entries(colors)) {
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', `arrow-${type}`);
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerWidth', '6');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('orient', 'auto-start-reverse');
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        poly.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        poly.setAttribute('fill', color);
        marker.appendChild(poly);
        defs.appendChild(marker);
    }
    svgLayer.appendChild(defs);
}

export function updateConnections() {
    const temp = document.getElementById('temp-line');
    svgLayer.innerHTML = '';
    if (temp) svgLayer.appendChild(temp);
    ensureArrowDefs();

    document.querySelectorAll('.port-socket').forEach(el => {
        el.classList.remove('connected');
    });

    state.connections.forEach(conn => {
        const sourceSocket = document.querySelector(`.port-socket[data-node="${conn.source}"][data-port="${conn.sourcePort}"]`);
        const targetSocket = document.querySelector(`.port-socket[data-node="${conn.target}"][data-port="${conn.targetPort}"]`);

        if (sourceSocket) sourceSocket.classList.add('connected');
        if (targetSocket) targetSocket.classList.add('connected');
        const start = getPortPosition(conn.source, conn.sourcePort);
        const end = getPortPosition(conn.target, conn.targetPort);

        if (!start || !end) return;

        const wt = conn.wireType || 'network';
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', `connection-line wire-${wt}`);
        path.setAttribute('d', getBezierPath(start.x, start.y, end.x, end.y));
        path.setAttribute('marker-end', `url(#arrow-${wt})`);

        // Right-click to delete
        path.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            recordUndo();
            const src = conn.source;
            const tgt = conn.target;
            state.connections = state.connections.filter(c => c.id !== conn.id);
            updateConnections();

            refreshNodeVisuals(state.nodes.find(n => n.id === src));
            refreshNodeVisuals(state.nodes.find(n => n.id === tgt));

            saveState();
        });

        svgLayer.appendChild(path);
    });
}

export function getPortPosition(nodeId, portId) {
    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return null;

    const socket = document.querySelector(`.port-socket[data-node="${nodeId}"][data-port="${portId}"]`);
    if (!socket) return null;

    const nodeEl = document.getElementById(`node-${nodeId}`);
    const socketRect = socket.getBoundingClientRect();
    const nodeRect = nodeEl.getBoundingClientRect();

    const offsetX = (socketRect.left - nodeRect.left + socketRect.width / 2) / state.scale;
    const offsetY = (socketRect.top - nodeRect.top + socketRect.height / 2) / state.scale;

    return {
        x: node.x + offsetX,
        y: node.y + offsetY
    };
}

export function getBezierPath(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const cpOffset = Math.max(dx * 0.5, 50);
    return `M ${x1} ${y1} C ${x1 + cpOffset} ${y1}, ${x2 - cpOffset} ${y2}, ${x2} ${y2}`;
}

export function getConnectionsHtml(node) {
    const relevantConns = state.connections.filter(c => c.source === node.id || c.target === node.id);
    if (relevantConns.length === 0) return 'None';

    return relevantConns.map(c => {
        const isSource = c.source === node.id;
        const otherNodeId = isSource ? c.target : c.source;
        const otherNode = state.nodes.find(n => n.id === otherNodeId);
        const myPortId = isSource ? c.sourcePort : c.targetPort;
        const otherPortId = isSource ? c.targetPort : c.sourcePort;

        const myPort = node.ports.find(p => p.id === myPortId);
        const otherPort = otherNode ? otherNode.ports.find(p => p.id === otherPortId) : null;

        if (!otherNode || !myPort || !otherPort) return '';

        return `
            <div class="connection-item">
                <span class="connection-port">${myPort.label}</span>
                <i class="fa-solid fa-arrow-right connection-arrow"></i>
                <span class="connection-target">${otherNode.data.name} (${otherPort.label})</span>
            </div>
        `;
    }).join('');
}
