---
title: "The Timeline Window"
---


## The Timeline Window

The **Timeline** is where you orchestrate your show—arranging media and controlling precisely when things happen. It provides a horizontal time-based view of your content, organized in layers.

### Timeline Structure

The Timeline window is divided into several key areas:

#### Header Area

*   **Timecode Display** – Shows the current playback position in hours:minutes:seconds:frames format. Click to jump to a specific time.
*   **Sync Indicator** – Displays synchronization status with the Director
*   **Cue Status Line** – Shows information about selected cues
*   **Countdown Display** – Indicates time remaining until the next pause cue

#### Layer Headers

The left column displays layer names. Each layer is a horizontal track for organizing content:

*   **Layer Name** – Custom name or default "Layer N" numbering
*   **Key and Fill Mode** – Icon indicates if a layer uses luma or alpha keying
*   **Selection Highlight** – Active layer appears with elevated background

Layers are ordered with higher numbers appearing on top in the Stage view.

#### Time Ruler

The horizontal ruler at the top of the cue area shows time in your configured format. Features include:

*   **Time Markings** – Major and minor divisions based on zoom level
*   **Play Cursor Indicator** – Triangle marker showing current time
*   **Click to Jump** – Click in the ruler to move the play cursor (when "Click Jumps to Time" is enabled)

#### Cue Area

The main workspace where cues are displayed:

*   **Tracks** – Horizontal lanes corresponding to layers
*   **Cues** – Colored rectangles representing media and control cues
*   **Play Cursor** – Vertical red line showing current playback position
*   **Overlap Indicators** – Cues that overlap in time on the same layer show warning styling

#### Tween Curves Panel

When a media cue is selected, the lower panel displays animation curves showing how properties change over time.

#### Minimap

The bottom bar shows a compressed overview of your entire timeline, with:

*   **Visible Range Indicator** – Shows which portion of the timeline is currently displayed
*   **Pan Control** – Drag to scroll horizontally
*   **Play Position** – Small indicator of current playback time
*   **Cue Overview** – Tiny representations of all cues

### Playback Controls

| Shortcut | Action |
| --- | --- |
| `Spacebar` | Toggle play/pause |
| `Numpad 0` | Start playback |
| `Escape` | Pause |
| `Home` | Jump to beginning |
| `End` | Jump to end |
| `Numpad +` | Zoom in |
| `Numpad -` | Zoom out |

### Working with Layers

| Action | Method |
| --- | --- |
| Add Layer | **Timeline → Append Layer** or `Ctrl+I` |
| Insert Layer | **Timeline → Insert Layer** |
| Delete Layer | **Timeline → Delete Layer** |
| Select Layer | Click the layer header |
| Rename Layer | Double-click layer header to open Properties |

### Working with Cues

#### Adding Cues

*   **Drag and Drop** – Drag media from Assets onto the Timeline
*   **Menu** – Use **Timeline → Add** submenu for control cues

#### Selecting Cues

*   **Click** – Select a single cue
*   **Shift+Click** – Add to selection
*   **Ctrl+Click** – Toggle selection
*   **Marquee** – Drag on empty track space to select multiple cues

#### Editing Cues

*   **Move** – Drag cues left/right to change timing; drag up/down to change layers
*   **Resize Start** – Drag the left edge to adjust in-point
*   **Resize End** – Drag the right edge to adjust duration
*   **Trim to Time** – Use **Timeline → Trim Start** or **Trim End** to cut at play cursor
*   **Double-click** – Open Properties panel for detailed editing

#### Cue Context Menu

Right-click a cue for common actions:

*   Cut, Copy, Paste, Delete
*   Group / Ungroup cues
*   Add tweens
*   Fade In, Fade Out, Cross Fade

### Snapping

When **Edit → Snap** is enabled, cues snap to:

*   Other cue edges
*   The play cursor
*   Time ruler divisions

A highlight appears when snapping occurs.

### Timeline Identification

When multiple timelines exist, the window title displays the timeline name and ID number (e.g., "Main #1").

