# Plan: WATCHOUT Infrastructure Planner Improvements

## Overview

Comprehensive improvement plan for `planner/` — the node-based infrastructure diagramming tool for WATCHOUT systems. Covers bug fixes, code architecture, UX improvements, and new features.

**Current state:** ~1,800 lines of vanilla JS/HTML/CSS in a single-closure `app.js` (1066 lines), `styles.css` (506 lines), `index.html` (139 lines), and an orphaned `nodeTypes.js` (157 lines). No tests, no build tools, no framework.

---

## Phase 1: Bug Fixes & Code Cleanup

### 1.1 Fix duplicate `ports` property on `display` node type
- **File:** `planner/app.js` lines 94–107
- The `display` definition has `ports` defined twice; second overwrites the first (identical content). Remove the duplicate.

### 1.2 Fix font path inconsistency
- **File:** `planner/styles.css` line 5
- Currently references `../shortcuts/FuturaNowHeadline-Rg.otf` but a local copy exists at `planner/FuturaNowHeadline-Rg.otf`. Change to `./FuturaNowHeadline-Rg.otf`.

### 1.3 Fix connection ID collision risk
- **File:** `planner/app.js` line 830
- `Date.now()` is used for connection IDs. Two connections created in the same millisecond will collide. Replace with an incrementing counter (e.g., `state.nextConnectionId++`).

### 1.4 Wire up or delete orphaned `nodeTypes.js`
- **File:** `planner/nodeTypes.js` (157 lines, not referenced by `index.html`)
- Identical definitions are duplicated inline in `app.js` lines 80–237.
- **Action:** Add `<script src="nodeTypes.js"></script>` to `index.html` before `app.js`, remove the inline copy from `app.js`, and reference the global `NodeTypes`.

### 1.5 Remove dead code
- Remove commented-out "color stripe" blocks in `app.js` (lines 305–310, 646–649).
- Remove empty CSS comment at `styles.css` lines 505–506.

### 1.6 Move inline styles to CSS classes
- `renderProperties()` and `getConnectionsHtml()` use extensive inline styles (`app.js` lines 440, 460–477, 682–688). Extract to named CSS classes in `styles.css`.

---

## Phase 2: Architecture — Split into ES Modules

Refactor the monolithic `app.js` into focused ES modules using native `import`/`export` (no bundler required — just `<script type="module">`).

### Proposed structure

```
planner/
  index.html
  styles.css
  FuturaNowHeadline-Rg.otf
  js/
    main.js           — Entry point, init, event wiring
    state.js           — State object, undo stack, localStorage persistence
    nodeTypes.js       — Node type definitions (moved from root)
    nodes.js           — createNode, renderNode, refreshNodeVisuals, deleteNode
    connections.js     — createConnection, updateConnections, getPortPosition, getBezierPath
    canvas.js          — Pan, zoom, grid snap, coordinate transforms
    properties.js      — renderProperties, property editing, color palette
    ui.js              — Toolbar, dropdowns, context menus, keyboard shortcuts
    export.js          — Save/Load JSON, PNG/SVG export
    templates.js       — Starter templates (Phase 5)
```

### Key changes
- Replace the single `DOMContentLoaded` closure with module-level imports
- Pass shared state via a singleton module (`state.js`)
- Each module exports pure functions that operate on state
- `main.js` wires everything together

---

## Phase 3: Core UX Improvements

### 3.1 Zoom support
- Mouse wheel zoom centered on cursor position
- Toolbar zoom controls: zoom in (+), zoom out (−), fit-to-canvas, reset 100%
- Zoom level indicator (e.g., "75%") in toolbar or status bar

### 3.2 Fix coordinate math
- `renderTempLine()` (`app.js:807`) — approximate coordinate conversion. Fix to properly account for pan and scale.
- `getPortPosition()` — make robust under zoom levels ≠ 1.0
- Node placement from toolbar — correct for current pan/zoom

### 3.3 Undo / Redo
- Command history stack (serialized state snapshots, cap at ~50)
- `Ctrl+Z` / `Ctrl+Y` (or `Ctrl+Shift+Z`) keyboard shortcuts
- Optional toolbar buttons

### 3.4 Connection improvements
- **Port type validation:** Only allow valid connections (output→input, network→network). Show green highlight on valid drop targets, red on invalid.
- **Wire colors by type:** Green for input connections, blue for output, amber for network (matching port colors).
- **Right-click to delete** connections instead of the undiscoverable Shift+click.
- **Snap-to-port:** When dragging near a valid port, snap the temp line to it.
- **Optional connection labels:** Editable text on wires (e.g., "HDMI 1", "10GbE").

### 3.5 Keyboard shortcuts
Currently only Delete/Backspace works. Add:
- `Ctrl+C` / `Ctrl+V` — Copy/Paste nodes (with position offset)
- `Ctrl+D` — Duplicate selected node(s)
- `Ctrl+A` — Select all
- `Ctrl+S` — Save to file
- `Escape` — Deselect / cancel in-progress connection
- `Space+drag` — Pan canvas (alternative to empty-area drag)
- `?` — Show keyboard shortcut overlay

### 3.6 Grid snapping
- Toggle snap-to-grid in toolbar
- Use existing `--grid-size: 20px` as snap increment
- Visual feedback (e.g., thicker grid lines when snap is active)

### 3.7 Context menus
- **Right-click canvas:** Add node submenu, Paste
- **Right-click node:** Delete, Duplicate, Change color, Disconnect all
- **Right-click connection:** Delete, Edit label

### 3.8 Multi-select
- `Shift+click` to add/remove nodes from selection
- Marquee/lasso selection (click-drag on empty canvas)
- Move, delete, and recolor multiple selected nodes at once

---

## Phase 4: New Features

### 4.1 Node duplication
- Duplicate selected node(s) with offset position, preserving all properties
- Via `Ctrl+D` and context menu

### 4.2 Node groups / containers
- Named region boxes that visually contain a set of nodes
- Represent physical locations (e.g., "Control Room", "Stage Left", "AV Rack")
- Dragging the group moves all contained nodes

### 4.3 Annotations / text labels
- Freeform text labels placeable on the canvas
- For notes, section headings, cable routing info

### 4.4 Minimap
- Small overview in corner showing full diagram with viewport indicator
- Click minimap to navigate

### 4.5 Search / filter
- Search bar to find nodes by name, type, or IP address
- Highlight matches, dim non-matches

### 4.6 Export improvements
- SVG export (scalable, editable in Illustrator/Inkscape)
- PDF export for documentation handoff
- Full-diagram PNG export (not just visible viewport)

### 4.7 Auto-layout
- "Auto-arrange" button using a layered graph layout algorithm
- Useful when diagrams get messy

### 4.8 Starter templates
- Pre-built diagrams for common configurations:
  - Simple single-display setup
  - Multi-projector production
  - LED wall with matrix switching
- Available from a "New from Template" menu option

### 4.9 Connection routing
- Smart routing of connections around nodes to reduce overlap
- Arrow/direction indicators on wires

---

## Phase 5: Quality & Polish

### 5.1 Accessibility
- ARIA labels on toolbar buttons and nodes
- Keyboard navigation for node selection (Tab/Arrow keys)
- Visible focus indicators

### 5.2 Responsive layout
- Collapsible properties panel for smaller screens
- Toolbar overflow handling (hamburger or scroll)

### 5.3 Onboarding
- First-visit tooltip overlay explaining core interactions
- Keyboard shortcut help overlay (`?` key)

---

## Implementation Order

| # | Item | Phase | Effort | Dependencies |
|---|------|-------|--------|-------------|
| 1 | Bug fixes & cleanup | 1 | S | None |
| 2 | Wire up nodeTypes.js | 1.4 | S | None |
| 3 | Split into ES modules | 2 | M | Phase 1 |
| 4 | Zoom support | 3.1 | S | None |
| 5 | Fix coordinate math | 3.2 | S | 3.1 |
| 6 | Undo/Redo | 3.3 | M | Phase 2 |
| 7 | Connection improvements | 3.4 | M | Phase 2 |
| 8 | Keyboard shortcuts | 3.5 | S | Phase 2 |
| 9 | Context menus | 3.7 | M | Phase 2 |
| 10 | Grid snapping | 3.6 | S | 3.2 |
| 11 | Node duplication | 4.1 | S | 3.5 |
| 12 | Multi-select | 3.8 | M | Phase 2 |
| 13 | Inline style cleanup | 1.6 | S | None |
| 14 | Node groups | 4.2 | L | 3.8 |
| 15 | Annotations | 4.3 | M | Phase 2 |
| 16 | Export improvements | 4.6 | M | Phase 2 |
| 17 | Templates | 4.8 | M | Phase 2 |
| 18 | Minimap | 4.4 | M | 3.1 |
| 19 | Search/filter | 4.5 | S | Phase 2 |
| 20 | Auto-layout | 4.7 | L | Phase 2 |
| 21 | Connection routing | 4.9 | L | 3.4 |
| 22 | Accessibility | 5.1 | M | Phase 2 |
| 23 | Responsive layout | 5.2 | S | None |
| 24 | Onboarding | 5.3 | M | 3.5 |

**Effort key:** S = Small (< 1 hour), M = Medium (1–3 hours), L = Large (3+ hours)
