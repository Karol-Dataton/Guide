/**
 * WATCHOUT Infrastructure Planner
 * Node CRUD and rendering
 */

import { state, saveState, recordUndo } from './state.js';
import { NodeTypes } from './nodeTypes.js';
import { updateConnections, startConnection } from './connections.js';
import { selectNode } from './properties.js';
import { startDragNode } from './canvas.js';
import { showContextMenu } from './contextMenu.js';
import { reRenderGroups } from './groups.js';

const nodesLayer = document.getElementById('nodes-layer');

export function reRenderAll() {
    nodesLayer.innerHTML = '';
    state.nodes.forEach(node => renderNode(node));
    reRenderGroups();
    updateConnections();
}

export function createNode(type, x, y) {
    recordUndo();
    const def = NodeTypes[type];
    if (!def) return;

    const node = {
        id: state.nextId++,
        type: type,
        x: x,
        y: y,
        width: def.width,
        ports: JSON.parse(JSON.stringify(def.ports)),
        data: { ...def.data }
    };

    node.data.name = `${def.data.name.split('-')[0]}-${node.id}`;

    if (type === 'display' && node.data.inputs > 0) {
        if (!node.data.inputTypes) node.data.inputTypes = [];
        for (let i = 1; i <= node.data.inputs; i++) {
            const typeLabel = node.data.inputTypes[i - 1] || 'Generic';
            node.ports.push({ id: `in-${i}`, label: `${typeLabel} ${i}`, type: 'input' });
            if (!node.data.inputTypes[i - 1]) node.data.inputTypes[i - 1] = 'Generic';
        }
    }

    state.nodes.push(node);
    renderNode(node);
    saveState();
}

export function renderNode(node) {
    const def = NodeTypes[node.type];

    const el = document.createElement('div');
    el.className = 'node';
    el.id = `node-${node.id}`;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.style.width = `${node.width}px`;

    el.addEventListener('mousedown', (e) => {
        if (e.target.closest('.port-socket')) return;
        if (e.shiftKey) {
            selectNode(node.id, { toggle: true });
        } else if (!state.selectedNodes.includes(node.id)) {
            selectNode(node.id);
        }
    });

    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectNode(node.id);
        showContextMenu(e.clientX, e.clientY, [
            { label: 'Duplicate', icon: 'fa-clone', action: () => {
                const newId = duplicateNode(node.id);
                if (newId) selectNode(newId);
            }},
            { label: 'Disconnect All', icon: 'fa-link-slash', action: () => {
                recordUndo();
                state.connections = state.connections.filter(c => c.source !== node.id && c.target !== node.id);
                updateConnections();
                refreshNodeVisuals(node);
                saveState();
            }},
            { separator: true },
            { label: 'Delete', icon: 'fa-trash', danger: true, action: () => deleteNode(node.id) }
        ]);
    });

    const header = document.createElement('div');
    header.className = 'node-header';
    header.innerHTML = `
        <i class="fa-solid ${def.icon} node-icon"></i> 
        <span class="node-title">${node.data.name}</span>
    `;

    if (node.data.color) {
        header.style.backgroundColor = node.data.color;
    }

    header.addEventListener('mousedown', (e) => {
        startDragNode(e, node);
    });

    const body = document.createElement('div');
    body.className = 'node-body';

    node.ports.forEach(port => {
        const portEl = document.createElement('div');
        let alignClass = port.type === 'input' ? 'input' : (port.type === 'output' ? 'output' : 'network');
        portEl.className = `port ${alignClass}`;
        portEl.innerHTML = `
            ${port.type !== 'input' ? `<span>${port.label}</span>` : ''}
            <div class="port-socket" data-node="${node.id}" data-port="${port.id}" data-type="${port.type}"></div>
            ${port.type === 'input' ? `<span>${port.label}</span>` : ''}
            ${port.type === 'network' ? `<span class="port-connected-label" data-port-id="${port.id}"></span>` : ''}
        `;

        const socket = portEl.querySelector('.port-socket');
        socket.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startConnection(e, node.id, port.id, port.type);
        });

        body.appendChild(portEl);
    });

    const propsDiv = document.createElement('div');
    propsDiv.className = 'node-properties';

    Object.keys(node.data).forEach(key => {
        if (key !== 'name' && key !== 'color') {
            const row = document.createElement('div');
            row.className = 'node-property';
            row.innerHTML = `<span class="key">${key}:</span> <span class="value">${node.data[key]}</span>`;
            propsDiv.appendChild(row);
        }
    });
    body.appendChild(propsDiv);

    el.appendChild(header);
    el.appendChild(body);
    nodesLayer.appendChild(el);
}

export function updateNodePosition(nodeId) {
    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return;
    const el = document.getElementById(`node-${nodeId}`);
    if (el) {
        el.style.left = `${node.x}px`;
        el.style.top = `${node.y}px`;
    }
    updateConnections();
}

export function refreshNodeVisuals(node) {
    const el = document.getElementById(`node-${node.id}`);
    if (!el) return;

    el.querySelector('.node-title').textContent = node.data.name;

    node.ports.forEach(port => {
        if (port.type === 'network') {
            const labelEl = el.querySelector(`.port-connected-label[data-port-id="${port.id}"]`);
            if (labelEl) {
                const conn = state.connections.find(c =>
                    (c.source === node.id && c.sourcePort === port.id) ||
                    (c.target === node.id && c.targetPort === port.id)
                );

                if (conn) {
                    const otherNodeId = conn.source === node.id ? conn.target : conn.source;
                    const otherNode = state.nodes.find(n => n.id === otherNodeId);
                    if (otherNode) {
                        labelEl.textContent = `-> ${otherNode.data.name}`;
                        labelEl.style.display = 'inline';
                        return;
                    }
                }
                labelEl.textContent = '';
                labelEl.style.display = 'none';
            }
        }
    });

    // Update Color
    const header = el.querySelector('.node-header');
    if (node.data.color) {
        header.style.backgroundColor = node.data.color;
        el.style.borderColor = '';
    } else {
        header.style.backgroundColor = '';
        el.style.borderColor = '';
    }

    // Update Properties List
    const propsDiv = el.querySelector('.node-properties');
    if (propsDiv) {
        propsDiv.innerHTML = '';
        Object.keys(node.data).forEach(key => {
            if (key !== 'name' && key !== 'color') {
                const row = document.createElement('div');
                row.className = 'node-property';
                row.innerHTML = `<span class="key">${key}:</span> <span class="value">${node.data[key]}</span>`;
                propsDiv.appendChild(row);
            }
        });
    }
}

export function duplicateNode(nodeId) {
    const orig = state.nodes.find(n => n.id === nodeId);
    if (!orig) return null;

    recordUndo();
    const node = {
        id: state.nextId++,
        type: orig.type,
        x: orig.x + 30,
        y: orig.y + 30,
        width: orig.width,
        ports: JSON.parse(JSON.stringify(orig.ports)),
        data: { ...orig.data }
    };
    node.data.name = `${node.data.name.split('-')[0]}-${node.id}`;

    state.nodes.push(node);
    renderNode(node);
    saveState();
    return node.id;
}

export function deleteNode(nodeId) {
    recordUndo();
    state.connections = state.connections.filter(c => c.source !== nodeId && c.target !== nodeId);
    state.nodes = state.nodes.filter(n => n.id !== nodeId);

    const el = document.getElementById(`node-${nodeId}`);
    if (el) el.remove();

    selectNode(null);
    updateConnections();
    saveState();
}
