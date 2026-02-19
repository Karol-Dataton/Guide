---
title: "The Timeline Window"
---


## The Timeline Window

The Timeline is where you orchestrate your show — arranging media in time, adding control cues, shaping animations with tween curves, and controlling precisely when things happen. WATCHOUT 7 actually provides two distinct windows for working with timelines: the **Timeline window** (one instance per open timeline) for editing cues on a time axis, and the **Timelines window** (a single list view) for managing all timelines in the show. This article covers both.

[[WIDGET:timeline-window]]

### Timeline Window Structure

Each Timeline window is divided into several areas, from top to bottom:

#### Header Area

The top of the window contains:

- **Cue Info** — when hovering over a cue, shows the asset name, start time, duration, and tier assignment
- **Timeline Countdown** — a live countdown or countup to the next marker cue that has countdown or countup enabled. The countdown is color-coded: green when more than 10 seconds remain, orange between 5 and 10 seconds, and red under 5 seconds
- **Sync Indicator** — a small green dot that pulses briefly whenever the timeline receives a synchronization event, then fades out after about two seconds

#### Timecode Display

Displays the current play position in timecode format (hours:minutes:seconds:frames). Press **T** to type a specific time value and jump directly to it. The timecode display reflects the show's configured frame rate.

#### Layer Headers

The left column lists the layers in the timeline. Each layer header shows:

- **Layer name** — a custom name, or the default "Layer N" numbering
- **Key/Fill icon** — when a layer is configured for key and fill mode (luma, alpha, luma inverted, or alpha inverted), an icon indicates the active mode

Click a layer header to select it. Double-click to open its properties in the Properties panel. The active (selected) layer is highlighted with an elevated background. Layers have a fixed height of 32 pixels each.

A vertical splitter separates the layer headers from the cue area. Drag this splitter to adjust the width of the layer header column (default 200 pixels).

#### Time Ruler

The horizontal ruler above the cue area shows time markings that adjust dynamically based on your zoom level. A triangular indicator at the bottom of the ruler marks the current play position.

- When **Click Jumps to Time** is enabled (toggle via **Timeline > Click Jumps to Time** or **Ctrl+T**), clicking in the ruler moves the play cursor to that position
- Click and drag in the ruler to scrub through time

#### Cue Area

The main workspace where cues appear as colored rectangles on horizontal tracks corresponding to layers. The cue area supports scrolling both horizontally (through time) and vertically (through layers).

**Overlap detection** — when two cues overlap on the same layer, they display warning styling to alert you to the conflict. Exceptions: a media cue and a non-media cue on the same layer do not trigger overlap warnings, and crossfade regions (where fades overlap intentionally) are also excluded.

#### Play Cursor

The vertical line indicating the current playback position. Its appearance changes based on the Click Jumps to Time setting:

- **Enabled** — solid line in the primary accent color
- **Disabled** — dotted line in a secondary accent color

When the play cursor scrolls out of view, a jump button (chevron icon) appears at the edge of the cue area. Click it to scroll the view back to the play cursor position.

#### Tween Curves Panel

Below the cue area, separated by a horizontal splitter, the tween curves panel shows animation curves for the selected cue. When a single cue is selected, this panel displays its tween tracks with enable and visibility toggles for each property. When no cue or multiple cues are selected, the panel is empty.

Drag the horizontal splitter to adjust the height of the tween curves panel (default 82 pixels).

#### Minimap

A narrow bar (24 pixels tall) at the very bottom of the window shows a compressed overview of the entire timeline. Cues appear as small colored bars. A draggable thumb indicates and controls which portion of the timeline is currently visible in the cue area. The play cursor position is also shown on the minimap.

#### Playback Controls

In the bottom-left corner, the **Play**, **Pause**, and **Stop** buttons control playback for this timeline. The active state (playing, paused, stopped) is highlighted. When the timeline is in Hands Off mode, these buttons are dimmed and non-interactive.

### Window Appearance by State

The Timeline window changes its visual appearance to indicate the timeline's current state:

| State | Appearance |
|---|---|
| **Active** | Green accent color on the window border |
| **Inactive** | Dimmed to 60% brightness |
| **Blind Edit** | Special highlight color on border and title |
| **Locked** | Special color indicating the timeline is locked |
| **Hands Off** | Special color; playback controls are dimmed and inactive |

The window title shows the timeline name. When in blind edit, "(Edit)" is appended to the title.

### Working with Cues

#### Adding Cues

- **Drag and drop** — drag assets from the Assets window, devices from the Devices window, or variables from the Variables window onto the cue area. Normal drop places cues in sequence; hold **Ctrl** while dropping to place them on separate layers.
- **Timeline menu** — use Add Play Control Cue (**Ctrl+P**), Add Pause Control Cue (**Ctrl+Shift+P**), Add Output Cue, or Add Comment Cue (**Ctrl+Enter**) to insert non-media cues at the play cursor position.

#### Selecting Cues

| Action | Method |
|---|---|
| Select one cue | Click the cue |
| Add to selection | Shift+Click |
| Toggle selection | Ctrl+Click |
| Marquee select | Drag on empty track space (hold Ctrl to toggle, Shift to add) |
| Select all cues | Ctrl+A |
| Select to end | Ctrl+E (selects all cues from the current position to the end of the timeline) |

#### Editing Cues

| Action | Method |
|---|---|
| Move in time | Drag the cue body left or right |
| Move between layers | Drag the cue body up or down (hold Shift to constrain to layer movement only) |
| Resize start | Drag the left edge of the cue |
| Resize end | Drag the right edge of the cue |
| Trim start to play cursor | Right-click > Trim Start |
| Trim end to play cursor | Right-click > Trim End |
| Reset duration | Right-click > Reset Duration |
| Reset in-time | Right-click > Reset In-Time |
| Move by dialog | Ctrl+M opens a Move dialog for precise repositioning |
| Nudge | Ctrl+Arrow moves by 1 pixel; Ctrl+Shift+Arrow moves by 10 pixels |

#### Cue Context Menu

Right-click a cue to access:

- Add Play/Pause Control Cue, Add Output Cue, Add Comment Cue
- Find Asset — locate the cue's source asset in the Assets window
- Move (Ctrl+M) — open the Move dialog
- Effect submenu — add or toggle tween properties
- Trim Start / Trim End — trim to the play cursor
- Reset Duration / Reset In-Time
- Layer operations — Insert Layer, Delete Layer, Select All Layer Cues
- Insert/Delete Time
- Group Cues into Composition (Ctrl+G) / Ungroup (Ctrl+Shift+G)
- Copy ID

### Snapping

When Snap is enabled (**Edit > Snap** or **Ctrl+N**), cues snap to nearby cue edges (within approximately one layer above or below) and to the play cursor (when Click Jumps to Time is disabled). The snap threshold is 6 pixels at the current zoom level. A visual feedback line appears when a snap occurs.

Hold **Shift** while dragging to temporarily disable snapping for that operation.

### Working with Layers

| Action | Method |
|---|---|
| Add a layer at the top | **Timeline > Add Layer** |
| Insert a layer at the current position | **Timeline > Insert Layer** (Ctrl+I) |
| Delete a layer | **Timeline > Delete Layer** (Ctrl+Delete) — confirmation required if the layer contains cues |
| Select all cues on a layer | **Timeline > Select All Layer Cues** |

#### Key and Fill Modes

Layers can be configured for key and fill compositing. The available modes are:

- **Luma** — uses the key layer's luminance to cut the fill layer
- **Alpha** — uses the key layer's alpha channel
- **Luma Inverted** — inverted luminance keying
- **Alpha Inverted** — inverted alpha keying

The mode is shown as an icon on the layer header when active.

### Blind Edit

Blind edit lets you make changes to a timeline that is currently playing without those changes taking effect until you explicitly apply them. The Timeline window provides three blind edit controls:

- **Follow** — when enabled, the blind edit view follows the live timeline, keeping the display synchronized while you work
- **Take** — applies your blind edit changes to the live timeline
- **Enter Blind Edit** — activates blind edit mode for this timeline

When blind edit is active, the window border and title change color to clearly distinguish it from the live state.

### Timeline Lock

Click the lock button in the Timeline window to cycle through lock states:

- **Unlocked** — full editing allowed
- **Locked** — cues cannot be moved, resized, or deleted; properties cannot be changed
- **Hands Off** — the timeline runs independently; playback controls are disabled and the play cursor shows a "Hands Off" indicator on hover

### Zoom Controls

Three zoom buttons appear in the Timeline window:

- **Zoom Out** — reduces magnification by 2x
- **Zoom to Fit** — adjusts zoom to show all cues (or all selected cues, depending on the current selection)
- **Zoom In** — increases magnification by 2x

Keyboard shortcuts: **Numpad +** (zoom in), **Numpad -** (zoom out), **Ctrl+0** (zoom to fit). Zooming centers on the play cursor when it is visible in the viewport.

### Insert and Delete Time

The **Insert/Delete Time** command (**Ctrl+Shift+T**) opens a dialog that lets you insert blank time (pushing all subsequent cues later) or delete a time range (pulling subsequent cues earlier) at the play cursor position. This affects all cues on all layers in the timeline.

### Grouping Cues into Compositions

Select multiple cues and use **Timeline > Group Cues into Composition** (**Ctrl+G**) to combine them into a single composition cue. The selected cues are moved into the composition's internal timeline. To break a composition apart, select it and use **Ungroup Cues** (**Ctrl+Shift+G**).

---

## The Timelines Window

The Timelines window (**Window > Timelines** or **Ctrl+Alt+T**) provides a list view of all timelines in the show, organized in a tree table with folder support.

### Columns

| Column | Description |
|---|---|
| **Name** | Timeline name, with icons for lock state, auto-run, and stacking order |
| **Status** | Current playback state (playing, paused, stopped) |
| **Time** | Current play position |
| **Countdown** | Live countdown to the next marker |
| **Play Expression** | Expression that triggers playback |
| **Pause Expression** | Expression that triggers pause |
| **Stop Expression** | Expression that triggers stop |
| **ID** | Internal timeline identifier |

Column visibility is configurable. Click a column header to sort by that column.

### Folders

Timelines can be organized into folders. Drag timelines into folders to group them. Folders can be nested, and timelines inherit color from their parent folder. Open and close states are remembered between sessions.

### Context Menu

Right-click in the Timelines window to access:

- **Add Timeline** — create a new timeline
- **Add Folder** — create a new folder for organizing timelines
- **Collapse All Folders** — close all folders in the tree
- **Copy ID** — copy the timeline's identifier to the clipboard

### Opening a Timeline

Double-click a timeline in the Timelines window to open it in its own Timeline editing window. You can have multiple Timeline windows open simultaneously, each showing a different timeline.

### Timeline Properties

Select a timeline and open the Properties panel to configure:

- **General** — name, color (optional, clearable), duration, stacking order (Timeline Order or Always on Top), and auto-run toggle
- **Triggers** (collapsed by default) — Play Expression, Pause Expression, and Stop Expression for expression-driven playback control

### Relationship to Other Windows

- **Stage** — the Stage shows cues from the currently active timeline at the current play position. Selecting a cue in the Timeline selects it on the Stage, and vice versa.
- **Cue List** — the Cue List displays cues from all timelines in a flat table. Double-clicking a cue in the Cue List opens and scrolls to it in the corresponding Timeline window. See [The Cue List Window](04-the-cue-list-window.md).
- **Properties** — selecting a cue, layer, or tween point loads its properties in the Properties panel. See [The Properties Panel](06-the-properties-panel.md).
