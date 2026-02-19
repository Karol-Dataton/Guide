---
title: "Customizing Your Workspace"
---


## Customizing Your Workspace

WATCHOUT 7's interface is built around independent, freely positioned windows that you arrange to suit your workflow. Whether you are programming on a single laptop screen, spread across multiple monitors during a production build, or monitoring a live show from a simplified view, the workspace adapts to your needs. This article covers everything related to arranging, saving, and recalling window layouts.

[[WIDGET:customizing-workspace]]

### Moving Windows

Drag any window by its **title bar** to reposition it within the application. Windows can be placed anywhere and can overlap freely.

**Double-click** the title bar to automatically fit the window into the best available space on screen.

### Resizing Windows

Drag any **edge or corner** of a window to resize it. All eight resize directions are supported (top, bottom, left, right, and all four corners). Each window enforces a minimum size to ensure its controls remain usable.

### Closing and Reopening Windows

Close a window by clicking the **close button** (X) in its title bar, or press **Ctrl+F4** to close the active window.

Reopen any closed window from the **Window** menu:

| Menu Command | Shortcut | Window |
|---|---|---|
| Window > Stage | Ctrl+Alt+S | Stage |
| Window > Assets | Ctrl+Alt+A | Assets |
| Window > Timelines | Ctrl+Alt+T | Timelines |
| Window > Devices | Ctrl+Alt+D | Devices |
| Window > Variables | Ctrl+Alt+V | Variables |
| Window > Cues | Ctrl+Alt+C | Cue List |
| Window > Cue Sets | — | Cue Sets |
| Window > Properties | — | Properties |
| Window > Nodes | — | Nodes |

### Window Snapping

When you move or resize a window near another window or the edge of the application canvas, the window automatically **snaps into alignment** with a small gap between them. This makes it easy to tile windows into a clean, non-overlapping arrangement without pixel-perfect dragging.

- **Hold Ctrl** while dragging to temporarily disable snapping
- **Hold Alt** while dragging to resize the window to fit the available space between adjacent windows

### Window Docking

Docking locks a window to an edge of the application, where it stretches to fill that edge and stays anchored when the application is resized.

To dock a window:
1. Hold **Ctrl** and **double-click** the window's title bar
2. The window docks to the nearest edge (left, right, top, or bottom)

To undock, **Ctrl+double-click** the title bar again. The window returns to its previous floating state.

Docked windows do not overlap other docked content. They divide the available space along their edge.

### Window Focus

The currently active window is indicated by a **brighter border** and a **stronger drop shadow**. Only the focused window receives keyboard input. Click any window to bring it to the front and transfer focus to it.

### Layout Presets

WATCHOUT 7 provides nine numbered layout preset slots. Presets remember the complete window arrangement: which windows are open, their positions, sizes, and docking states.

#### Saving a Preset

Press **Ctrl+Alt+1** through **Ctrl+Alt+9** to save the current window arrangement to preset 1 through 9. You can also save presets from **Window > Layout > Save Preset 1-9**.

#### Loading a Preset

Press **Alt+1** through **Alt+9** to instantly recall a saved layout. You can also load from **Window > Layout > Load Preset 1-9**.

#### Reset Layout

Press **Alt+0** or use **Window > Layout > Reset** to return all windows to their default positions and sizes.

:::tip
Set up different presets for different phases of production. For example: preset 1 for programming (Stage + Timeline + Properties), preset 2 for content review (Stage + Assets + large Timeline), and preset 3 for live monitoring (Nodes dashboard + Timelines list + minimal Stage).
:::

### Layout Files

For sharing layouts between projects or team members, you can export and import layouts as files:

- **Window > Layout > Export** — saves the current window arrangement to a `.layout.json` file
- **Window > Layout > Import** — loads a window arrangement from a `.layout.json` file

Layout files are portable and can be shared across different installations of WATCHOUT 7.

### Window Navigation Shortcuts

Navigate between windows without using the mouse:

| Shortcut | Action |
|---|---|
| **Ctrl+Tab** or **Ctrl+F6** | Cycle to the next window |
| **Ctrl+Shift+Tab** or **Ctrl+Shift+F6** | Cycle to the previous window |
| **Alt+Left** | Previous window of the same type (e.g., cycle between open Timeline windows) |
| **Alt+Right** | Next window of the same type |
| **Ctrl+F4** | Close the active window |

#### Direct Window Activation

Jump directly to a specific window type:

| Shortcut | Window |
|---|---|
| **Ctrl+Alt+S** | Stage |
| **Ctrl+Alt+A** | Assets |
| **Ctrl+Alt+T** | Timelines |
| **Ctrl+Alt+D** | Devices |
| **Ctrl+Alt+V** | Variables |
| **Ctrl+Alt+C** | Cue List |

### Multiple Timeline Windows

WATCHOUT supports having multiple Timeline windows open simultaneously, each displaying a different timeline. This is useful when you need to work across several timelines — for example, editing a content timeline while monitoring a control timeline. Each Timeline window operates independently with its own zoom, scroll position, and selection.

Open additional Timeline windows by double-clicking timelines in the Timelines window. Each opens in its own window instance.

### Default Layout

When you first launch WATCHOUT 7 or reset the layout with **Alt+0**, the application arranges windows in a default configuration:

- **Stage** — top-left
- **Properties** — top-center
- **Assets** — top-right
- **Timelines** — below Assets
- **Timeline** — bottom, spanning beneath Stage and Properties
- **Devices** — bottom-right

This default provides a balanced starting point for most workflows, with the visual canvas, editing tools, and media library all visible simultaneously.

### Theme

WATCHOUT 7 uses a **dark theme** by default, designed to reduce eye strain in the low-light environments typical of production work. The interface uses dark backgrounds with light text and accent colors for interactive elements.

:::note
A light theme option exists in the application but is currently inactive. The dark theme is the standard working appearance.
:::

### Complete Keyboard Reference

| Shortcut | Action |
|---|---|
| **Alt+1** through **Alt+9** | Load layout preset 1-9 |
| **Ctrl+Alt+1** through **Ctrl+Alt+9** | Save layout preset 1-9 |
| **Alt+0** | Reset to default layout |
| **Ctrl+Tab** / **Ctrl+F6** | Next window |
| **Ctrl+Shift+Tab** / **Ctrl+Shift+F6** | Previous window |
| **Alt+Left** | Previous window of same type |
| **Alt+Right** | Next window of same type |
| **Ctrl+F4** | Close active window |
| **Ctrl+Alt+S** | Activate Stage |
| **Ctrl+Alt+A** | Activate Assets |
| **Ctrl+Alt+T** | Activate Timelines |
| **Ctrl+Alt+D** | Activate Devices |
| **Ctrl+Alt+V** | Activate Variables |
| **Ctrl+Alt+C** | Activate Cue List |
