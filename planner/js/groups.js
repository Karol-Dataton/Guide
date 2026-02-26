/**
 * WATCHOUT Infrastructure Planner
 * Node groups / container regions
 */

import { state, saveState, recordUndo } from './state.js';
import { updateNodePosition } from './nodes.js';
import { showContextMenu } from './contextMenu.js';

const groupsLayer = document.getElementById('groups-layer');

export function createGroup(name, x, y, w, h, color) {
    recordUndo();
    const group = {
        id: `grp-${state.nextId++}`,
        name: name || 'Group',
        x, y,
        width: w || 300,
        height: h || 200,
        color: color || 'rgba(107, 37, 221, 0.15)'
    };
    state.groups.push(group);
    renderGroup(group);
    saveState();
    return group;
}

export function renderGroup(group) {
    const el = document.createElement('div');
    el.className = 'group-box';
    el.id = `group-${group.id}`;
    el.style.left = `${group.x}px`;
    el.style.top = `${group.y}px`;
    el.style.width = `${group.width}px`;
    el.style.height = `${group.height}px`;
    el.style.backgroundColor = group.color;

    const header = document.createElement('div');
    header.className = 'group-header';
    header.textContent = group.name;
    header.addEventListener('mousedown', (e) => startDragGroup(e, group));

    el.appendChild(header);

    // Resize handle
    const handle = document.createElement('div');
    handle.className = 'group-resize-handle';
    handle.addEventListener('mousedown', (e) => startResizeGroup(e, group));
    el.appendChild(handle);

    // Context menu
    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e.clientX, e.clientY, [
            { label: 'Rename', icon: 'fa-pen', action: () => {
                const name = prompt('Group name:', group.name);
                if (name !== null) {
                    recordUndo();
                    group.name = name;
                    header.textContent = name;
                    saveState();
                }
            }},
            { separator: true },
            { label: 'Delete Group', icon: 'fa-trash', danger: true, action: () => deleteGroup(group.id) }
        ]);
    });

    groupsLayer.appendChild(el);
}

export function reRenderGroups() {
    groupsLayer.innerHTML = '';
    state.groups.forEach(g => renderGroup(g));
}

function getNodesInGroup(group) {
    return state.nodes.filter(n =>
        n.x >= group.x && n.y >= group.y &&
        n.x + n.width <= group.x + group.width &&
        n.y + 150 <= group.y + group.height
    );
}

function startDragGroup(e, group) {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = group.x;
    const origY = group.y;
    const contained = getNodesInGroup(group);
    const nodeStarts = contained.map(n => ({ id: n.id, x: n.x, y: n.y }));

    function onMove(ev) {
        const dx = (ev.clientX - startX) / state.scale;
        const dy = (ev.clientY - startY) / state.scale;
        group.x = origX + dx;
        group.y = origY + dy;
        updateGroupPosition(group);

        nodeStarts.forEach(ns => {
            const node = state.nodes.find(n => n.id === ns.id);
            if (node) {
                node.x = ns.x + dx;
                node.y = ns.y + dy;
                updateNodePosition(node.id);
            }
        });
    }

    function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        saveState();
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

function startResizeGroup(e, group) {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origW = group.width;
    const origH = group.height;

    function onMove(ev) {
        group.width = Math.max(150, origW + (ev.clientX - startX) / state.scale);
        group.height = Math.max(100, origH + (ev.clientY - startY) / state.scale);
        updateGroupPosition(group);
    }

    function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        saveState();
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

function updateGroupPosition(group) {
    const el = document.getElementById(`group-${group.id}`);
    if (!el) return;
    el.style.left = `${group.x}px`;
    el.style.top = `${group.y}px`;
    el.style.width = `${group.width}px`;
    el.style.height = `${group.height}px`;
}

export function deleteGroup(groupId) {
    recordUndo();
    state.groups = state.groups.filter(g => g.id !== groupId);
    const el = document.getElementById(`group-${groupId}`);
    if (el) el.remove();
    saveState();
}
