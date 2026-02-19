---
title: "The Cue List Window"
---


## The Cue List Window

The **Cue List** window provides a flat, tabular view of all cues across every timeline in your show. While the Timeline window displays cues graphically along a time axis within a single timeline, the Cue List presents them as sortable, filterable rows in a table — making it ideal for auditing, searching, and managing cues across the entire production.

The Cue List is especially valuable in large shows where cues are spread across many timelines. It lets you quickly locate specific cues by name, type, or media source without switching between timelines.

[[WIDGET:cue-list-window]]

### Opening the Cue List

Open the Cue List window from **Window > Cues** or press **Ctrl+Alt+C**. The window operates alongside the Timeline and Stage windows — selecting a cue in the Cue List also selects it in the Timeline and updates the Properties panel, and vice versa.

### Column Layout

The Cue List displays cues in a table with the following columns. Not all columns are visible by default — you can choose which to show or hide.

| Column | Default Visible | Sortable | Description |
|---|---|---|---|
| **Timeline** | Yes | Yes | The name of the timeline containing the cue. A lock icon indicates the cue's lock state. An eye-off icon appears for cues in a blind edit timeline. |
| **Thumbnail** | Yes | No | A small preview image of the cue's media asset, when applicable. |
| **Name** | Yes | Yes | The cue's name. Cues with errors (such as missing assets) display their name in a warning color. |
| **Type** | Yes | Yes | The cue kind: Media, Control, Output, Variable, or Marker. For media cues, the source type is shown in parentheses (e.g., "Media (Asset)", "Media (Capture)", "Media (Composition)"). |
| **Tier** | No | Yes | The stage tier(s) the cue is assigned to. |
| **Start** | Yes | Yes | The cue's start time in the timeline, displayed in timecode format. |
| **Duration** | No | Yes | The cue's duration in timecode format. |
| **Countdown** | Yes | No | For marker cues with countdown enabled, shows a live countdown to the cue's position relative to the current playback time. |
| **Cue Set** | No | Yes | The cue set (group) name and current variant, if the cue belongs to a cue set. |

### Choosing Visible Columns

Click the **column chooser** button in the top-right corner of the window to open a menu listing all available columns. Toggle columns on or off by clicking their names. The column chooser also includes a **Reset Columns** option to restore the default column visibility and ordering.

Columns can be reordered by dragging their headers in the table. Column widths are adjustable by dragging the borders between column headers.

### Sorting

Click any sortable column header to cycle through three states:

1. **Ascending** — rows sorted A-Z or earliest-latest
2. **Descending** — rows sorted Z-A or latest-earliest
3. **No sort** — returns to the default ordering (by timeline name, then start time, then internal ID)

You can sort by multiple columns simultaneously. The first column you click becomes the primary sort key; additional columns serve as tiebreakers. A sort indicator on each column header shows the current direction.

### Filtering

The Cue List includes a powerful filter panel for narrowing down the displayed cues. Click the **filter icon** in the toolbar to expand the filter panel from the bottom of the window.

The filter panel offers several filter dimensions that work together — only cues matching all active filters are shown:

#### Text Search

The **Cue Name** field filters by name. Type a search term and the list updates in real time. Clear the field to remove the text filter.

#### Include by Cue Kind

Toggle which cue kinds are included in the list:

- **Control** — playback control cues (play, pause, stop)
- **Output** — output cues (TCP, UDP, HTTP)
- **Variable** — variable/input cues
- **Marker** — comment/marker cues used for notes and countdown triggers

Media cues are controlled separately through the media source filter below.

#### Media Source Filter

The **Media** multi-select dropdown controls which types of media cues are shown:

- **Asset** — cues referencing media assets (images, video, audio)
- **Virtual Display** — cues sourcing from virtual displays
- **Composition** — cues referencing compositions
- **Capture** — cues sourcing from capture inputs

#### Cue Sets and Tiers

Additional multi-select dropdowns let you filter by:

- **Cue Groups** — show only cues belonging to specific cue set groups
- **Tiers** — show only cues assigned to specific stage tiers

#### Follow Selection

The **Follow** toggles synchronize the Cue List with selections made in other windows:

- **Asset** — when enabled, the list shows only cues that use the currently selected asset(s) in the Assets window
- **Timeline** — limits the list to cues in the currently selected timeline(s)
- **Capture** — limits to cues using the selected capture source(s)
- **Virtual Display** — limits to cues using the selected virtual display(s)
- **Active Timeline** — limits to cues in the currently active (focused) timeline

These follow filters are additive — enabling multiple follow options shows cues matching any of them.

#### Selected Cues Only

The **Selected Cues Only** toggle restricts the list to display only cues that are currently selected. This is useful when you have a multi-selection and want to inspect or operate on just those cues.

### Filter Presets

You can save filter configurations as named presets for quick recall:

- **Save** — click the save/plus button to create a new preset with the current filter settings. You will be prompted to enter a name.
- **Load** — select a preset from the **Preset** dropdown to apply its saved filter configuration.
- **Update** — if you have modified a loaded preset, click the save button to update it with the current settings.
- **Delete** — click the delete button to remove the currently selected preset.
- **Restore** — if you have changed the filter after loading a preset, click the restore button to revert to the preset's saved settings.

The toolbar displays the active preset name when one is loaded. If the filter has been modified from the preset, the indicator reflects the unsaved state.

### Selecting Cues

Cue selection in the Cue List is synchronized with the rest of the application through a shared global selection:

- **Click** a row to select a single cue
- **Shift+Click** to extend the selection to a range
- **Ctrl+Click** to toggle individual cues in and out of the selection
- **Ctrl+A** selects all visible cues in the list

Selecting a cue in the Cue List highlights it in the Timeline window and loads its properties in the Properties panel. Conversely, selecting a cue in the Timeline updates the Cue List selection.

**Double-clicking** a cue row activates the corresponding Timeline window and scrolls to that cue's position, making it easy to jump from the list view to the graphical timeline context. Hold **Alt** while double-clicking to also jump the play cursor to the cue's start time.

### Locking and Unlocking Cues

Each row in the Cue List displays a lock icon to the left of the timeline name:

- **Unlocked** (open lock icon) — click to lock the cue, preventing accidental edits
- **Locked** (closed lock icon) — click to unlock the cue and allow editing
- **Locked upstream** (dimmed lock icon) — the cue is locked because its parent timeline is locked. This cannot be toggled from the cue level; unlock the timeline instead.

When multiple cues are selected, clicking the lock/unlock icon on any selected cue applies the action to all selected cues simultaneously.

### Blind Edit Indicator

Cues belonging to a blind edit timeline are visually distinguished with a special highlight color and an eye-off icon in the Timeline column. Blind edit mode allows you to make changes to a timeline that is currently playing without those changes taking effect until you apply them. The Cue List makes it easy to identify which cues are in this state.

### Context Menu

Right-click a cue to access context menu actions:

- **Copy ID** — copy the cue's identifier to the clipboard
- **Open Composition** — for composition cues, opens the composition's internal timeline for editing in a new window

### Drag and Drop

The Cue List supports drag-and-drop interactions:

- **Drag assets** from the Assets window onto the Cue List to create new cues or update existing ones
- **Drag asset versions** to assign a specific version to a cue
- **Drag devices** (virtual displays, captures) onto cues to assign them as media sources
- **Drag variables** from the Variables window to create variable cues

Cues in the Cue List can also be dragged out to other targets that accept cue drops.

:::tip
Use the Cue List's filter presets to set up common views for different stages of production — for example, a "Media Only" preset for content review, a "Markers" preset for show calling, and an "All Cues" preset for full auditing.
:::

### Relationship to Other Windows

- **Timeline** — selecting a cue in the Cue List selects it in the corresponding Timeline window, and vice versa. Double-clicking navigates to the cue in the Timeline. See [The Timeline Window](03-the-timeline-window.md).
- **Properties** — selecting a cue loads its properties in the Properties panel. See [The Properties Panel](06-the-properties-panel.md).
- **Assets** — use the Follow Asset toggle to show only cues using the selected asset. See [The Assets Window](05-the-assets-window.md).
