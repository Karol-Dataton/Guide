/**
 * WATCHOUT Infrastructure Planner
 * State management and persistence
 */

const MAX_UNDO = 50;
const undoStack = [];
const redoStack = [];

export const state = {
    nodes: [],
    connections: [],
    groups: [],
    annotations: [],
    nextId: 1,
    nextConnectionId: 1,
    pan: { x: 0, y: 0 },
    scale: 1,
    isDraggingNode: null,
    isPanning: false,
    isConnecting: null,
    selection: null,
    selectedNodes: [],
    clipboard: null,
    spaceHeld: false,
    snapToGrid: false,
    mouseStart: { x: 0, y: 0 },
    nodeStart: { x: 0, y: 0 }
};

function getSnapshot() {
    return JSON.stringify({
        nodes: state.nodes,
        connections: state.connections,
        groups: state.groups,
        annotations: state.annotations,
        nextId: state.nextId,
        nextConnectionId: state.nextConnectionId
    });
}

function restoreSnapshot(json) {
    const data = JSON.parse(json);
    state.nodes = data.nodes;
    state.connections = data.connections;
    state.groups = data.groups || [];
    state.annotations = data.annotations || [];
    state.nextId = data.nextId;
    state.nextConnectionId = data.nextConnectionId;
}

export function recordUndo() {
    undoStack.push(getSnapshot());
    if (undoStack.length > MAX_UNDO) undoStack.shift();
    redoStack.length = 0;
}

export function undo() {
    if (undoStack.length === 0) return false;
    redoStack.push(getSnapshot());
    restoreSnapshot(undoStack.pop());
    saveState();
    return true;
}

export function redo() {
    if (redoStack.length === 0) return false;
    undoStack.push(getSnapshot());
    restoreSnapshot(redoStack.pop());
    saveState();
    return true;
}

export function saveState() {
    const data = {
        nodes: state.nodes,
        connections: state.connections,
        groups: state.groups,
        annotations: state.annotations,
        nextId: state.nextId,
        nextConnectionId: state.nextConnectionId,
        pan: state.pan,
        scale: state.scale
    };
    localStorage.setItem('watchout-planner-v1', JSON.stringify(data));
}

export function loadState() {
    const raw = localStorage.getItem('watchout-planner-v1');
    if (raw) {
        try {
            const data = JSON.parse(raw);
            state.nodes = data.nodes || [];
            state.connections = data.connections || [];
            state.groups = data.groups || [];
            state.annotations = data.annotations || [];
            state.nextId = data.nextId || 1;
            state.nextConnectionId = data.nextConnectionId || (data.connections && data.connections.length > 0 ? Math.max(...data.connections.map(c => c.id)) + 1 : 1);
            state.pan = data.pan || { x: 0, y: 0 };
            state.scale = data.scale || 1;
            return true;
        } catch (e) {
            console.error("Failed to load state", e);
        }
    }
    return false;
}
