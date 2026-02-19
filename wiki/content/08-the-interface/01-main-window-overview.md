---
title: "Main Window Overview"
---


## Main Window Overview

The WATCHOUT 7 Producer interface is a multi-window workspace where every major function — stage layout, timeline editing, asset management, device configuration, and network monitoring — operates in its own independent, resizable window. Rather than a fixed panel arrangement, the interface lets you position, resize, dock, and layer windows freely, then save the arrangement as a layout preset that you can recall instantly. This design accommodates a wide range of production phases: a compact single-monitor setup during pre-production, a spread-out multi-monitor arrangement during programming, or a monitoring-focused layout during live performance.

This article covers the top-level structure of the application: the menu bar and its indicators, the window system, and how windows behave. For details on saving and restoring layouts, see [Customizing Your Workspace](09-customizing-your-workspace.md).

[[WIDGET:main-window-overview]]

### The Menu Bar

The menu bar runs along the top of the application and provides access to all commands. It also contains several status indicators on its right side that give you at-a-glance information about the system state.

#### Menu Structure

The menu bar contains seven menus:

| Menu | Key Commands |
|---|---|
| **File** | New, Open, Open Recent, Open Show from Director, Save (Ctrl+S), Save As (Ctrl+Shift+S), Save Copy, Create Archive, Show Properties, Quit |
| **Edit** | Undo (Ctrl+Z), Redo (Ctrl+Y), Cut/Copy/Paste/Delete, Select All (Ctrl+A), Select to End (Ctrl+E), Move (Ctrl+M), Find (Ctrl+F), Tween Colors toggle, Snap toggle (Ctrl+N), Legacy Keyboard Mode toggle |
| **Stage** | Add Display, Add Virtual Display, Add 3D Projector, Create Display Grid, Frame All Displays (Ctrl+Shift+D), Frame Selected Displays, Scroll to Origin (Ctrl+Shift+O), Camera Mode submenu |
| **Timeline** | Click Jumps to Time toggle (Ctrl+T), Add Play/Pause Control Cue (Ctrl+P / Ctrl+Shift+P), Add Output Cue, Add/Insert/Delete Layer (Ctrl+I / Ctrl+Delete), Select All Layer Cues, Insert/Delete Time (Ctrl+Shift+T), Group into Composition (Ctrl+G), Ungroup (Ctrl+Shift+G) |
| **Effect** | Fade In/Out/Cross-Fade toggles, Position/Scale/Rotation X/Y/Z toggles, Opacity, Gaussian Blur, Linear Wipe, Crop submenu, Color submenu (Brightness, Contrast, Exposure, Temperature, Gamma, Hue, Saturation, Invert, RGB Gain, RGB Offset), Volume |
| **Window** | Stage (Ctrl+Alt+S), Assets (Ctrl+Alt+A), Timelines (Ctrl+Alt+T), Devices (Ctrl+Alt+D), Variables (Ctrl+Alt+V), Cues (Ctrl+Alt+C), Cue Sets, Properties, Nodes, Layout submenu (Import, Export, Reset, Save/Load Presets 1-9) |
| **Help** | Documentation, Open Auto-Saves Directory, Open Log Directory, Create Feedback Report, WATCHOUT Licenses, About |

:::tip
The **Effect** menu items are toggles. When checked, the corresponding tween property is active for newly created cues or for adding tweens to existing cues.
:::

#### Menu Bar Indicators

To the right of the menu buttons, the menu bar displays several status indicators:

| Indicator | Description |
|---|---|
| **Gamepad** | A controller icon appears when one or more gamepads are connected to the system. |
| **FPS** | Displays the current frame rate of the show (for example, "60 fps"). This reflects the frame rate configured in Show Properties. |
| **Director** | An earth icon followed by the hostname of the current Director, or "none" if no Director is assigned. Click to see Director connection details. |
| **Asset Manager** | A database icon followed by the hostname of the current Asset Manager, or "none" if no Asset Manager is assigned. Click to see connection details. |
| **Node Activity** | A progress icon that shows a badge when nodes are performing background work (such as asset transfers). A warning badge appears if errors have occurred. |
| **Messages** | A bell icon that opens a dropdown list of recent system messages and notifications when clicked. |

### Windows in WATCHOUT 7

The application uses the following window types, each dedicated to a specific function:

| Window | Purpose | Shortcut |
|---|---|---|
| **Stage** | Visual canvas for display layout and content positioning | Ctrl+Alt+S |
| **Assets** | Media library and asset management | Ctrl+Alt+A |
| **Timelines** | Multi-timeline management (list of all timelines) | Ctrl+Alt+T |
| **Timeline** | Individual timeline editing (one window per open timeline) | — |
| **Devices** | Output device management (displays, audio, capture) | Ctrl+Alt+D |
| **Variables** | Show variables and external input management | Ctrl+Alt+V |
| **Cues** | Flat cue list across all timelines | Ctrl+Alt+C |
| **Cue Sets** | Cue set (variant group) management | — |
| **Properties** | Context-sensitive property inspector | — |
| **Nodes** | Network node discovery, monitoring, and system management | — |
| **Warp** | Warp geometry editor (opens when editing warp) | — |
| **Mask** | Display mask editor (opens when editing masks) | — |

### Window Behavior

Every window in WATCHOUT 7 shares common behavior for movement, resizing, focus, and docking.

#### Moving and Resizing

Drag a window's title bar to reposition it. Drag any edge or corner to resize. All eight resize directions are available (top, bottom, left, right, and the four corners). Windows enforce a minimum size to keep their controls usable.

**Double-click** the title bar to fit the window to the best available space on screen.

#### Snapping

When you move or resize a window near another window or the edge of the application canvas, the window snaps into alignment with a small gap between them. This makes it easy to tile windows neatly without overlapping. Hold **Ctrl** while dragging to temporarily disable snapping. Hold **Alt** while dragging to resize the window to fit the available space between adjacent windows.

#### Docking

To dock a window to an edge of the application, hold **Ctrl** and **double-click** the window's title bar. The window stretches to fill the nearest edge (left, right, top, or bottom). Docked windows remain anchored when the application resizes. To undock, **Ctrl+double-click** the title bar again.

#### Focus

The currently active window is indicated by a brighter border and a stronger drop shadow. Only the focused window receives keyboard input. Click any window to bring it to the front and transfer focus to it.

#### Closing and Reopening

Close a window by clicking the close button in its title bar, or press **Ctrl+F4**. Reopen any window from the **Window** menu or its keyboard shortcut.

### Offline Indicators

When a required service is not connected, the affected windows display an overlay message:

| Window | Condition | Message |
|---|---|---|
| **Timeline** | Director set in show but not connected | Cloud-off icon and "Offline" |
| **Assets** | Asset Manager set in show but not connected | Cloud-off icon and "Offline" |
| **Nodes** | No nodes responding | "No Nodes. Is Manager running?" |

These overlays disappear automatically when the service reconnects. Until then, the window's content may be read-only or empty.

### Default Layout

When you first launch WATCHOUT 7 or reset the layout, the application arranges windows in a default configuration:

- **Stage** — top-left area
- **Properties** — top-center area
- **Assets** — top-right area
- **Timelines** — below the Assets window
- **Timeline** — bottom area, spanning beneath the Stage and Properties windows
- **Devices** — bottom-right area

You can return to this arrangement at any time using **Window > Layout > Reset** or by pressing **Alt+0**.

### Keyboard Shortcuts Reference

#### Window Navigation

| Shortcut | Action |
|---|---|
| **Ctrl+Tab** or **Ctrl+F6** | Cycle to the next window |
| **Ctrl+Shift+Tab** or **Ctrl+Shift+F6** | Cycle to the previous window |
| **Alt+Left** | Previous window of the same type |
| **Alt+Right** | Next window of the same type |
| **Ctrl+F4** | Close the active window |

#### Window Activation

| Shortcut | Window |
|---|---|
| **Ctrl+Alt+S** | Stage |
| **Ctrl+Alt+A** | Assets |
| **Ctrl+Alt+T** | Timelines |
| **Ctrl+Alt+D** | Devices |
| **Ctrl+Alt+V** | Variables |
| **Ctrl+Alt+C** | Cue List |

#### Layout Presets

| Shortcut | Action |
|---|---|
| **Alt+1** through **Alt+9** | Load layout preset 1-9 |
| **Ctrl+Alt+1** through **Ctrl+Alt+9** | Save current layout to preset 1-9 |
| **Alt+0** | Reset to default layout |

For a full guide to workspace customization, layout presets, and multi-monitor workflows, see [Customizing Your Workspace](09-customizing-your-workspace.md).

### Show Preferences

When nothing is selected in the application, the Properties panel displays **Show Preferences** — the global settings that apply to the entire show. These are organized into the following sections:

| Section | Settings |
|---|---|
| **General** | Frame rate (presets from 23.98 to 120 fps, or custom), eye point position (X/Y/Z), SDI genlock toggle |
| **Hardware Sync Groups** | Named groups of nodes for synchronized rendering |
| **Audio Bus** | Number of audio buses and their names |
| **Defaults** | Image duration, auto-fade toggle, fade-in/out duration and curve, default anchor point (9-position grid) |
| **Warp** | Fixed handle length toggle and value, smooth warp points toggle |
| **NDI** | Additional IP addresses for NDI discovery beyond the local subnet |
| **Show Information** | Statistics (cue counts, timeline details, display counts), asset counts by type, technical details (show name, creation date, file path, file size, last modified) |

:::note
Show Preferences are per-show settings stored in the show file. They are separate from application-level preferences such as window layouts, which persist across all shows.
:::
