---
title: "The Stage Window"
---


## The Stage Window

The Stage is the visual canvas of WATCHOUT 7 — a spatial representation of all your displays and the content positioned on them. It shows how your output surfaces are arranged relative to each other and lets you see, position, and manipulate cues directly in the space where they will be rendered. Whether you are working with a single screen, a multi-projector blend, or a full 3D projection-mapped environment, the Stage provides the visual context for your show layout.

The Stage window operates in multiple camera modes and edit modes, adapting its controls and behavior to match the task at hand — from simple 2D positioning to 3D projector calibration.

[[WIDGET:stage-window]]

### Camera Modes

The Stage supports three camera modes, selectable from the **Stage** menu or the Camera Mode submenu in the Stage context menu.

#### Default (Front View)

The standard 2D editing view. The Stage is viewed from directly in front, with pixel-accurate positioning. The title bar displays the current scale ratio (for example, "1:2"), and the toolbar shows a **Scale** button (magnifying glass icon) for zooming. This is the mode used for most show programming work — placing cues on displays, adjusting positions, and verifying layout.

Scale presets are available via keyboard shortcuts:

| Shortcut | Scale |
|---|---|
| **Ctrl+1** | 1:16 |
| **Ctrl+2** | 1:8 |
| **Ctrl+3** | 1:4 |
| **Ctrl+4** | 1:2 |
| **Ctrl+5** | 1:1 (actual pixels) |

#### First Person

A 3D perspective view with free camera navigation. The toolbar shows **Zoom** and **Orbit** buttons along with a **Velocity** slider (range 0.1 to 2.0) that controls camera movement speed. Use this mode to preview how content looks from different angles in 3D show environments.

#### Projector

Views the Stage from the perspective of a selected 3D projector, showing exactly what that projector will output. This mode is used for projector calibration. It requires at least one 3D projector to be defined in the show. When Projector mode is active, a dropdown at the top of the Stage lets you switch between projectors. Use **PageUp** and **PageDown** to cycle through projectors.

:::note
Projector mode is not available while editing a composition. The Stage automatically exits Projector mode when you enter composition editing.
:::

### Edit Modes

The Stage has two edit modes, toggled by clicking the topbar area:

- **Cue Edit Mode** — the default mode for working with content cues. The topbar shows a clock-edit icon with the standard background color. Select, move, resize, and arrange cues on displays.
- **Display Edit Mode** — for working with display positions and arrangements. The topbar shows a monitor-edit icon with a purple background. Select, move, and resize displays on the Stage canvas.

Click the topbar icon to switch between modes.

### Toolbar Controls

The Stage toolbar (top-right area) adjusts based on the active camera mode:

| Control | Availability | Description |
|---|---|---|
| **Pan** | All modes | Activates pan mode — drag to move the view |
| **Scale** | Front View only | Drag vertically to zoom in and out |
| **Zoom** | First Person and Projector | Drag vertically to adjust the camera zoom |
| **Orbit** | First Person and Projector | Drag to rotate the camera around the Stage |
| **Velocity** | First Person and Projector | Slider controlling camera movement speed (0.1 to 2.0, step 0.1) |

### Navigating the Stage

#### Panning

Move your view across the Stage canvas:
- Activate the **Pan** button and drag
- Hold **Ctrl+Alt** and drag anywhere on the Stage

#### Zooming and Scaling

In Front View, use the **Scale** control or mouse wheel (**Ctrl+Mouse Wheel**) to change magnification. In 3D views, use the **Zoom** control.

#### View Commands

| Shortcut | Command | Description |
|---|---|---|
| **Ctrl+Shift+D** | Frame All Displays | Zoom and pan to fit all displays in the viewport |
| — | Frame Selected Displays | Zoom and pan to fit the selected displays |
| **Ctrl+Shift+O** | Scroll to Origin | Center the view on coordinates (0, 0) |

### Selection

Click a cue or display to select it. Standard selection modifiers apply:

- **Shift+Click** — add to selection
- **Ctrl+Click** — toggle selection
- **Marquee** — click and drag on empty space to create a selection rectangle. Hold **Ctrl** during marquee to toggle items, or hold **Shift** to add items.

What is selectable depends on the edit mode: in Cue Edit Mode you select cues, in Display Edit Mode you select displays.

### Moving and Nudging

Drag selected items to reposition them. In Default camera mode, pixel-precise nudging is available:

| Shortcut | Action |
|---|---|
| **Ctrl+Arrow** | Nudge 1 pixel in the arrow direction |
| **Ctrl+Shift+Arrow** | Nudge 10 pixels in the arrow direction |

### Drag and Drop

Drag assets from the Assets window onto the Stage to create cues at the drop location. The placement behavior depends on modifier keys:

- **Normal drop** — creates cues in sequence (one after another in time) on the active timeline
- **Ctrl+drop** — creates cues on separate layers (stacked at the same start time)

Dropping an MPCDI file onto the Stage creates display definitions from the projection mapping data.

### Background Settings

The Stage background can be customized via the Stage Properties in the Properties panel (click empty space on the Stage when in Display Edit Mode, or select Stage from the Properties panel):

- **Pattern** — choose between no pattern, or a checkerboard pattern in three sizes (small, medium, or large) to help visualize transparent areas
- **Solid Color** — when no pattern is selected, you can set a solid background color. Default is black.

### Tier Filters

When your show uses stage tiers to organize content into visibility groups, the Stage Properties panel provides per-tier visibility toggles (eye icons). Toggle a tier off to hide all cues assigned to that tier in the Stage view, making it easier to work with specific content layers. You can also add, rename, and delete tiers from this panel.

### Display Labels

In Display Edit Mode, display names appear as labels overlaid on each display rectangle. These labels scale with zoom level and help identify outputs in complex multi-display configurations. Labels are hidden in Projector mode.

### Composition View

When editing a composition, the Stage switches to show the composition's internal canvas instead of the main stage layout. A border appears around the viewport and the title bar shows a composition icon. The Stage forces Cue Edit Mode and exits Projector mode while in composition view. If you are in a blind edit, the border color changes to indicate the blind edit state.

### Context Menu

Right-click on the Stage to access a context menu with options that vary based on what is under the cursor and what is selected:

- **Add Display / Add Virtual Display / Add 3D Projector** — create a new display at the clicked position
- **Create Display Grid** — generate a grid of displays
- **Arrange as Grid (displays)** — rearrange selected displays into a grid layout
- **Arrange as Grid (cues)** — rearrange selected cues into a grid layout
- **Pack Inside Display** — fit selected cues within the bounds of a display
- **Frame All Displays / Frame Selected Displays / Scroll to Origin** — view navigation commands
- **Camera Mode** — submenu to switch between Default, First Person, and Projector
- **Effect** — submenu for adding effects to selected cues

### Projector Calibration

When in Projector mode, additional controls appear for aligning projected output with physical surfaces.

#### 3D Calibration

3D calibration uses paired virtual and real-world points to compute the projector's position and orientation:

- **Virtual / Reality toggle** — switch between placing points in virtual 3D space and marking their corresponding positions in the projector's output
- **Add / Move / Remove** — point manipulation actions
- **Snap** — toggle snapping to geometry features (magnet icon)
- **Link** — link calibration points across multiple projectors for consistent alignment
- **Clear All Points** — remove all calibration points and start over

#### 2D Calibration

2D calibration refines the projector alignment after 3D calibration. It requires at least 6 virtual calibration points to be defined:

- **Manual / Auto** — in Manual mode you position points one at a time; in Auto mode the system continuously adjusts
- **Velocity** — controls the speed of automatic calibration adjustments
- **Reposition** — reset point positions
- **Calibrate** — run the calibration computation
- **Accuracy** — displays the current calibration accuracy as a percentage

#### Show Warp Points on Display

The **Show on Display** toggle renders the warp mesh grid on the actual display output, making it visible on the projected surface. This is useful for verifying warp corrections against the physical screen during calibration.

### Relationship to Other Windows

- **Timeline** — cues visible on the Stage correspond to cues at the current play position in the active timeline. Selecting a cue on the Stage selects it in the Timeline, and vice versa.
- **Properties** — selecting a cue or display on the Stage loads its properties in the Properties panel for detailed editing. See [The Properties Panel](06-the-properties-panel.md).
- **Devices** — displays shown on the Stage correspond to devices listed in the Devices window. See [The Devices Window](08-the-nodes-window.md).
- **Assets** — drag assets from the Assets window to the Stage to create cues. See [The Assets Window](05-the-assets-window.md).
