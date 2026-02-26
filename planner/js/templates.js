/**
 * WATCHOUT Infrastructure Planner
 * Starter templates
 */

import { state, saveState, recordUndo } from './state.js';
import { NodeTypes } from './nodeTypes.js';
import { renderNode, reRenderAll } from './nodes.js';
import { createConnection, updateConnections } from './connections.js';
import { reRenderGroups } from './groups.js';
import { reRenderAnnotations } from './annotations.js';

function addNode(type, x, y, nameOverride) {
    const def = NodeTypes[type];
    const node = {
        id: state.nextId++,
        type, x, y,
        width: def.width,
        ports: JSON.parse(JSON.stringify(def.ports)),
        data: { ...def.data }
    };
    if (nameOverride) node.data.name = nameOverride;
    else node.data.name = `${def.data.name.split('-')[0]}-${node.id}`;

    if (type === 'display' && node.data.inputs > 0) {
        if (!node.data.inputTypes) node.data.inputTypes = [];
        for (let i = 1; i <= node.data.inputs; i++) {
            const lbl = node.data.inputTypes[i - 1] || 'Generic';
            node.ports.push({ id: `in-${i}`, label: `${lbl} ${i}`, type: 'input' });
            if (!node.data.inputTypes[i - 1]) node.data.inputTypes[i - 1] = 'Generic';
        }
    }
    state.nodes.push(node);
    return node;
}

function clearAll() {
    recordUndo();
    state.nodes = [];
    state.connections = [];
    state.groups = [];
    state.annotations = [];
}

export function loadTemplate(name) {
    clearAll();
    const builder = templates[name];
    if (builder) builder();
    reRenderAll();
    saveState();
}

export const templateList = [
    { id: 'simple', label: 'Simple Single Display' },
    { id: 'multiproj', label: 'Multi-Projector Production' },
    { id: 'ledwall', label: 'LED Wall + Matrix' }
];

const templates = {
    simple() {
        const prod = addNode('production', 100, 150, 'Production');
        const sw = addNode('switch', 400, 150, 'Main Switch');
        const disp = addNode('display', 650, 100, 'Display-1');
        const proj = addNode('projector', 950, 100, 'Projector-1');
        const ctrl = addNode('control', 400, 400, 'Stream Deck');

        createConnection(prod.id, 'net', sw.id, 'p1');
        createConnection(disp.id, 'net', sw.id, 'p2');
        createConnection(ctrl.id, 'net', sw.id, 'p3');
        createConnection(disp.id, 'out-1', proj.id, 'in');
    },

    multiproj() {
        const prod = addNode('production', 100, 200, 'Production');
        const sw = addNode('switch', 400, 200, 'Core Switch');
        const d1 = addNode('display', 700, 60, 'Display-A');
        const d2 = addNode('display', 700, 340, 'Display-B');
        const p1 = addNode('projector', 1000, 0, 'Proj-Left');
        const p2 = addNode('projector', 1000, 160, 'Proj-Center');
        const p3 = addNode('projector', 1000, 320, 'Proj-Right');
        const p4 = addNode('projector', 1000, 480, 'Proj-Fill');

        createConnection(prod.id, 'net', sw.id, 'p1');
        createConnection(d1.id, 'net', sw.id, 'p2');
        createConnection(d2.id, 'net', sw.id, 'p3');
        createConnection(d1.id, 'out-1', p1.id, 'in');
        createConnection(d1.id, 'out-2', p2.id, 'in');
        createConnection(d2.id, 'out-1', p3.id, 'in');
        createConnection(d2.id, 'out-2', p4.id, 'in');

        state.groups.push({ id: `grp-${state.nextId++}`, name: 'Projectors', x: 980, y: -20, width: 220, height: 540, color: 'rgba(59, 130, 246, 0.1)' });
    },

    ledwall() {
        const prod = addNode('production', 100, 200, 'Production');
        const sw = addNode('switch', 400, 200, 'Core Switch');
        const disp = addNode('display', 700, 100, 'Display-1');
        const matrix = addNode('matrix', 1000, 100, 'HDMI Matrix');
        const led1 = addNode('led', 1300, 50, 'LED Proc A');
        const led2 = addNode('led', 1300, 250, 'LED Proc B');
        const dmx = addNode('dmx', 700, 400, 'Art-Net Node');

        createConnection(prod.id, 'net', sw.id, 'p1');
        createConnection(disp.id, 'net', sw.id, 'p2');
        createConnection(dmx.id, 'net', sw.id, 'p3');
        createConnection(disp.id, 'out-1', matrix.id, 'in-1');
        createConnection(disp.id, 'out-2', matrix.id, 'in-2');
        createConnection(matrix.id, 'out-1', led1.id, 'in');
        createConnection(matrix.id, 'out-2', led2.id, 'in');

        state.groups.push({ id: `grp-${state.nextId++}`, name: 'LED Wall', x: 1280, y: 30, width: 240, height: 280, color: 'rgba(245, 158, 11, 0.1)' });
    }
};
