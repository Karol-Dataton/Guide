/**
 * WATCHOUT Infrastructure Planner
 * Annotations — freeform text labels on the canvas
 */

import { state, saveState, recordUndo } from './state.js';
import { showContextMenu } from './contextMenu.js';

const groupsLayer = document.getElementById('groups-layer');

export function createAnnotation(text, x, y) {
    recordUndo();
    const ann = {
        id: `ann-${state.nextId++}`,
        text: text || 'Note',
        x, y,
        fontSize: 14
    };
    state.annotations.push(ann);
    renderAnnotation(ann);
    saveState();
    return ann;
}

export function renderAnnotation(ann) {
    const el = document.createElement('div');
    el.className = 'annotation';
    el.id = `ann-${ann.id}`;
    el.style.left = `${ann.x}px`;
    el.style.top = `${ann.y}px`;
    el.style.fontSize = `${ann.fontSize}px`;
    el.textContent = ann.text;

    // Drag
    el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const origX = ann.x;
        const origY = ann.y;

        function onMove(ev) {
            ann.x = origX + (ev.clientX - startX) / state.scale;
            ann.y = origY + (ev.clientY - startY) / state.scale;
            el.style.left = `${ann.x}px`;
            el.style.top = `${ann.y}px`;
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            saveState();
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    // Context menu
    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e.clientX, e.clientY, [
            { label: 'Edit Text', icon: 'fa-pen', action: () => {
                const text = prompt('Annotation text:', ann.text);
                if (text !== null) {
                    recordUndo();
                    ann.text = text;
                    el.textContent = text;
                    saveState();
                }
            }},
            { label: 'Small', action: () => setFontSize(ann, el, 12) },
            { label: 'Medium', action: () => setFontSize(ann, el, 16) },
            { label: 'Large', action: () => setFontSize(ann, el, 22) },
            { separator: true },
            { label: 'Delete', icon: 'fa-trash', danger: true, action: () => deleteAnnotation(ann.id) }
        ]);
    });

    groupsLayer.appendChild(el);
}

function setFontSize(ann, el, size) {
    recordUndo();
    ann.fontSize = size;
    el.style.fontSize = `${size}px`;
    saveState();
}

export function reRenderAnnotations() {
    document.querySelectorAll('.annotation').forEach(el => el.remove());
    state.annotations.forEach(a => renderAnnotation(a));
}

function deleteAnnotation(annId) {
    recordUndo();
    state.annotations = state.annotations.filter(a => a.id !== annId);
    const el = document.getElementById(`ann-${annId}`);
    if (el) el.remove();
    saveState();
}
