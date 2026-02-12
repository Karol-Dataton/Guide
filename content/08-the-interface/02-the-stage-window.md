---
title: "The Stage Window"
---


## The Stage Window

The **Stage** is your visual canvas—a representation of all your displays and how content appears on them. It provides a unified view of your entire display arrangement, allowing you to position and manipulate content directly.

### Stage Modes

The Stage window operates in three distinct modes, accessible via the topbar button or the **Stage** menu:

| Mode | Description |
| --- | --- |
| **Default (Front View)** | Standard 2D editing view for positioning and arranging content |
| **FPS Camera** | First-person navigation for 3D environments with WASD-style controls |
| **Projector View** | View the Stage from a selected projector's perspective for calibration |

### Navigation Controls

#### Pan

Move your view around the Stage:

*   **Mouse** – Hold `Ctrl+Alt` and drag
*   **Button** – Click the pan button (hand icon) in the top-right toolbar and drag

#### Zoom / Scale

Adjust your view magnification:

*   **Mouse Wheel** – `Ctrl+Mouse Wheel` to zoom in/out
*   **Button** – Click the magnify button and drag vertically
*   **Menu** – **Stage → Scale** with preset levels (1:16, 1:8, 1:4, 1:2, 1:1)

The current scale ratio displays in the title bar when in Front View mode.

#### Orbit (3D Views)

When not in Front View:

*   **Button** – Click the orbit button (rotate icon) and drag to rotate the camera around the Stage

#### Camera Velocity

In 3D modes, adjust movement speed using the velocity slider (running figure icon).

### View Commands

| Shortcut | Command | Description |
| --- | --- | --- |
| `Ctrl+Shift+D` | Frame All Displays | Zoom to fit all displays in the viewport |
| `Ctrl+Shift+O` | Scroll to Origin | Center the view on coordinates (0, 0) |
| `Ctrl+Shift+S` | Frame Selected | Zoom to fit selected displays |

### Working with Content

#### Selection

*   **Single Click** – Select a cue or display
*   **Shift+Click** – Add to selection
*   **Ctrl+Click** – Toggle selection
*   **Marquee** – Click and drag on empty space to create a selection rectangle

#### Transformation

Selected cues can be manipulated directly on the Stage:

*   **Move** – Drag selected items to reposition
*   **Resize** – Drag corner or edge handles
*   **Rotate** – Use rotation handles when available
*   **Nudge** – Arrow keys move selection by 1 pixel; `Shift+Arrow` moves by 10 pixels

#### Drag and Drop

Drag media from the **Assets** window directly onto the Stage to create cues at the drop location.

### Display Labels

When enabled, display names appear centered on each display rectangle, making it easy to identify outputs in complex multi-display configurations.

### Projector Mode

When viewing from a projector's perspective, additional controls appear for calibration:

*   **View Mode** – Preview content as the projector sees it
*   **Calibration Mode** – Adjust 2D or 3D calibration points
*   **Calibration Actions** – Add, move, or remove calibration points
*   **Snap Toggle** – Enable snapping to geometry
*   **Link Toggle** – Link calibration points across projectors
*   **Accuracy Display** – Shows current calibration accuracy percentage

### Composition View

When editing a **Composition** cue, the Stage displays the composition's internal canvas rather than the main Stage, indicated by a border around the viewport and a gantt chart icon in the title bar.

