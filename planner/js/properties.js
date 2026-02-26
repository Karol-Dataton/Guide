/**
 * WATCHOUT Infrastructure Planner
 * Properties panel rendering and editing
 */

import { state, saveState, recordUndo } from './state.js';
import { refreshNodeVisuals, renderNode, deleteNode } from './nodes.js';
import { updateConnections, getConnectionsHtml } from './connections.js';

const propsContent = document.getElementById('properties-content');

export function selectNode(nodeId, options = {}) {
    const { toggle = false, additive = false } = options;

    if (toggle && nodeId) {
        const idx = state.selectedNodes.indexOf(nodeId);
        if (idx !== -1) {
            // Deselect this node
            state.selectedNodes.splice(idx, 1);
            const el = document.getElementById(`node-${nodeId}`);
            if (el) el.classList.remove('selected');
            // Update primary selection
            state.selection = state.selectedNodes.length > 0 ? state.selectedNodes[state.selectedNodes.length - 1] : null;
            if (state.selection) renderProperties(state.selection);
            else propsContent.innerHTML = '<p class="placeholder-text">Select a node to view properties.</p>';
            return;
        } else {
            // Add to selection
            state.selectedNodes.push(nodeId);
            const el = document.getElementById(`node-${nodeId}`);
            if (el) el.classList.add('selected');
            state.selection = nodeId;
            renderProperties(nodeId);
            return;
        }
    }

    if (!additive) {
        // Clear previous selection
        state.selectedNodes.forEach(id => {
            const prevEl = document.getElementById(`node-${id}`);
            if (prevEl) prevEl.classList.remove('selected');
        });
        state.selectedNodes = [];
    }

    state.selection = nodeId;
    if (nodeId) {
        if (!state.selectedNodes.includes(nodeId)) {
            state.selectedNodes.push(nodeId);
        }
        const el = document.getElementById(`node-${nodeId}`);
        if (el) el.classList.add('selected');
        renderProperties(nodeId);
    } else {
        propsContent.innerHTML = '<p class="placeholder-text">Select a node to view properties.</p>';
    }
}

export function selectNodes(nodeIds) {
    // Clear previous
    state.selectedNodes.forEach(id => {
        const prevEl = document.getElementById(`node-${id}`);
        if (prevEl) prevEl.classList.remove('selected');
    });
    state.selectedNodes = [...nodeIds];
    state.selectedNodes.forEach(id => {
        const el = document.getElementById(`node-${id}`);
        if (el) el.classList.add('selected');
    });
    state.selection = nodeIds.length > 0 ? nodeIds[nodeIds.length - 1] : null;
    if (state.selection) renderProperties(state.selection);
    else propsContent.innerHTML = '<p class="placeholder-text">Select a node to view properties.</p>';
}

export function renderProperties(nodeId) {
    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return;

    let html = '';

    // Name Field
    html += `
        <div class="prop-row">
            <label>Name</label>
            <input type="text" id="prop-name" value="${node.data.name}">
        </div>
    `;

    // Color Palette
    const colors = [
        '#252533', '#6B25DD', '#3b82f6', '#22c55e',
        '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#64748b'
    ];

    const currentColor = node.data.color || '#252533';

    html += `
         <div class="prop-row">
            <label>Node Color</label>
            <div class="color-palette" id="prop-color-palette">
                ${colors.map(c => `
                    <div class="color-swatch ${c === currentColor ? 'active' : ''}" 
                         style="background-color: ${c};" 
                         data-color="${c}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Connections List
    html += `
        <div class="prop-row">
            <label>Connections</label>
            <div class="connections-list">
                ${getConnectionsHtml(node)}
            </div>
        </div>
    `;

    // Other Data Fields
    Object.keys(node.data).forEach(key => {
        if (key !== 'name' && key !== 'color' && key !== 'inputTypes') {
            html += `
                <div class="prop-row">
                    <label>${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input type="text" class="prop-dynamic" data-key="${key}" value="${node.data[key]}">
                </div>
            `;
        }
    });

    // Input Types Configuration (For Display Nodes)
    if (node.type === 'display' && node.data.inputs > 0) {
        html += `<div class="input-types-section">
            <label>Input Types</label>`;

        for (let i = 1; i <= node.data.inputs; i++) {
            const currentType = (node.data.inputTypes && node.data.inputTypes[i - 1]) ? node.data.inputTypes[i - 1] : 'Generic';
            html += `
                <div class="prop-row">
                     <div class="input-type-row">
                        <span class="input-type-index">${i}:</span>
                        <select class="prop-input-type" data-index="${i - 1}">
                            <option value="Generic" ${currentType === 'Generic' ? 'selected' : ''}>Generic</option>
                            <option value="SDI" ${currentType === 'SDI' ? 'selected' : ''}>SDI</option>
                            <option value="HDMI" ${currentType === 'HDMI' ? 'selected' : ''}>HDMI</option>
                            <option value="DP" ${currentType === 'DP' ? 'selected' : ''}>DisplayPort</option>
                            <option value="DVI" ${currentType === 'DVI' ? 'selected' : ''}>DVI</option>
                        </select>
                     </div>
                </div>
            `;
        }
        html += `</div>`;
    }

    // Delete Button
    html += `
        <div style="margin-top: 20px;">
            <button id="delete-node-btn" class="tool-btn danger" style="width: 100%; justify-content: center;">Delete Node</button>
        </div>
    `;

    propsContent.innerHTML = html;

    // --- Listeners ---

    const nameInput = document.getElementById('prop-name');
    nameInput.addEventListener('input', (e) => {
        if (!nameInput._undoRecorded) { recordUndo(); nameInput._undoRecorded = true; }
        node.data.name = e.target.value;
        refreshNodeVisuals(node);
        saveState();
    });

    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            recordUndo();
            node.data.color = swatch.dataset.color;
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            refreshNodeVisuals(node);
            saveState();
        });
    });

    const dynamicInputs = document.querySelectorAll('.prop-dynamic');
    dynamicInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            recordUndo();
            const key = input.dataset.key;
            const value = e.target.value;

            if (key === 'inputs' && node.type === 'display') {
                const count = parseInt(value) || 0;
                node.data.inputs = count;

                node.ports = node.ports.filter(p => !p.id.startsWith('in-'));

                if (!node.data.inputTypes) node.data.inputTypes = [];
                if (node.data.inputTypes.length > count) {
                    node.data.inputTypes = node.data.inputTypes.slice(0, count);
                } else {
                    while (node.data.inputTypes.length < count) {
                        node.data.inputTypes.push('Generic');
                    }
                }

                for (let i = 1; i <= count; i++) {
                    const typeLabel = node.data.inputTypes[i - 1];
                    node.ports.push({ id: `in-${i}`, label: `${typeLabel} ${i}`, type: 'input' });
                }

                state.connections = state.connections.filter(c => {
                    if (c.target === node.id && c.targetPort.startsWith('in-')) {
                        const portNum = parseInt(c.targetPort.split('-')[1]);
                        return portNum <= count;
                    }
                    return true;
                });

                const el = document.getElementById(`node-${node.id}`);
                if (el) el.remove();
                renderNode(node);
                selectNode(node.id);
                updateConnections();
            } else {
                node.data[key] = value;
                refreshNodeVisuals(node);
            }
            saveState();
        });
    });

    const inputTypeSelects = document.querySelectorAll('.prop-input-type');
    inputTypeSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const index = parseInt(select.dataset.index);
            const newType = e.target.value;

            if (!node.data.inputTypes) node.data.inputTypes = [];
            node.data.inputTypes[index] = newType;

            const portIndex = node.ports.findIndex(p => p.id === `in-${index + 1}`);
            if (portIndex !== -1) {
                node.ports[portIndex].label = `${newType} ${index + 1}`;
            }

            const el = document.getElementById(`node-${node.id}`);
            if (el) el.remove();
            renderNode(node);
            selectNode(node.id);
            updateConnections();
            saveState();
        });
    });

    const deleteBtn = document.getElementById('delete-node-btn');
    deleteBtn.addEventListener('click', () => {
        deleteNode(nodeId);
    });
}
