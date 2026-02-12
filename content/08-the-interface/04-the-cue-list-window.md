---
title: "The Cue List Window"
---


## The Cue List Window

The **Cue List** window provides a flat, tabular view of all cues across every timeline in your show. While the Timeline window displays cues graphically along a time axis within a single timeline, the Cue List presents them as sortable, filterable rows in a table — making it ideal for auditing, searching, and managing cues across the entire production.

The Cue List is especially valuable in large shows where cues are spread across many timelines. It lets you quickly locate specific cues by name, type, or media source without switching between timelines.

### Opening the Cue List

Open the Cue List window from **Window → Cues**. The window operates alongside the Timeline and Stage windows — selecting a cue in the Cue List also selects it in the Timeline and updates the Properties panel, and vice versa.

### Column Layout

The Cue List displays cues in a table with the following columns. Not all columns are visible by default — you can choose which to show or hide.

- **Timeline** — the name of the timeline containing the cue. A lock icon appears next to the name indicating the cue's lock state. If the cue belongs to a Blind Edit timeline, an eye-off icon appears to identify it.
- **Image** — a thumbnail preview of the cue's media asset, when applicable.
- **Name** — the cue's name. Cues with errors (such as missing assets) display their name in a warning color.
- **Type** — the cue kind, such as Media, Control, Output, Variable, or Marker. For media cues, the source type is shown in parentheses (e.g., "Media (Asset)", "Media (Capture)", "Media (Composition)").
- **Tier** — the stage tier(s) the cue is assigned to. Hidden by default.
- **Start** — the cue's start time in the timeline, displayed in timecode format.
- **Duration** — the cue's duration. Hidden by default.
- **Countdown** — for marker cues, shows a live countdown to the cue's position relative to the current playback time.
- **Cue Set** — shows the cue set (group) name and current variant, if the cue belongs to a cue set. Hidden by default.

### Choosing Visible Columns

Click the **column chooser** button in the top-right corner of the window to open a menu listing all available columns. Toggle columns on or off by clicking their names. The column chooser also includes a **Reset Columns** option to restore the default column visibility and ordering.

Columns can be reordered by dragging their headers in the table. Column widths are adjustable by dragging the borders between column headers.

### Sorting

Click any sortable column header to cycle through three states:

1. **Ascending** — rows sorted A→Z or earliest→latest. The table switches to a flat view (no tree grouping).
2. **Descending** — rows sorted Z→A or latest→earliest.
3. **No sort** — returns to the default ordering (by timeline, then start time).

You can sort by multiple columns simultaneously. The first column you click is the primary sort key; additional columns serve as tiebreakers. The sort indicator on each column header shows the current direction.

### Filtering

The Cue List includes a powerful filter panel for narrowing down the displayed cues. Click the **filter icon** in the toolbar to expand the filter panel, or press `Ctrl+F`.

The filter panel offers several filter dimensions that work together — only cues matching all active filters are shown:

#### Text Search

The **Cue Name** field filters by name. Type a search term and the list updates in real time (with a short debounce for performance). Clear the field to remove the text filter.

#### Include by Cue Kind

Toggle which cue kinds are included in the list:

- **Control** — playback control cues (go, pause, stop, etc.)
- **Output** — output-level cues
- **Variable** — variable/input cues
- **Marker** — comment/marker cues used for notes and countdown triggers

Media cues are controlled separately through the media source filter below.

#### Media Source Filter

The **Media** multi-select dropdown controls which types of media cues are shown:

- **Assets** — cues referencing media assets (images, video, audio)
- **Virtual Displays** — cues sourcing from virtual displays
- **Compositions** — cues referencing compositions
- **Captures** — cues sourcing from NDI/capture inputs

#### Cue Sets and Tiers

Additional multi-select dropdowns let you filter by:

- **Cue Sets** — show only cues belonging to specific cue set groups
- **Tier** — show only cues assigned to specific stage tiers (this filter appears only when stage tiers are defined)

#### Follow Selected

The **Follow Selected** toggles synchronize the Cue List with selections made in other windows:

- **Assets** — when enabled, the list shows only cues that use the currently selected asset(s) in the Assets window
- **Timelines** — limits the list to cues in the currently selected timeline(s)
- **Captures** — limits to cues using the selected capture source(s)
- **Virtual Displays** — limits to cues using the selected virtual display(s)
- **Active Timeline** — limits to cues in the currently active (focused) timeline

These follow filters are additive — enabling multiple follow options shows cues matching any of them.

#### Selected Cues Only

The **Selected Cues Only** toggle restricts the list to display only cues that are currently selected. This is useful when you have a multi-selection and want to inspect or operate on just those cues.

### Filter Presets

You can save filter configurations as named presets for quick recall:

- **Save** — click the save/plus button to create a new preset with the current filter settings. You'll be prompted to enter a name.
- **Load** — select a preset from the **Preset** dropdown to apply its saved filter configuration.
- **Update** — if you've modified a loaded preset, click the save button to update it with the current settings.
- **Delete** — click the delete button to remove the currently selected preset.
- **Restore** — if you've changed the filter after loading a preset, click the restore button to revert to the preset's saved settings.

The toolbar displays the active preset name when one is loaded. If the filter has been modified from the preset, the indicator shows "No Preset" to reflect the unsaved state.

### Selecting Cues

Cue selection in the Cue List is synchronized with the rest of the application through a shared global cue selection:

- **Click** a row to select a single cue
- **Shift+Click** to extend the selection to a range
- **Ctrl+Click** to toggle individual cues in and out of the selection
- **Ctrl+A** selects all visible cues in the list

Selecting a cue in the Cue List highlights it in the Timeline window and loads its properties in the Properties panel. Conversely, selecting a cue in the Timeline updates the Cue List selection.

**Double-clicking** a cue row activates the corresponding Timeline window and scrolls to that cue's position, making it easy to jump from the list view to the graphical timeline context. Hold `Alt` while double-clicking to also jump the play cursor to the cue's start time.

### Locking and Unlocking Cues

Each row in the Cue List displays a lock icon to the left of the timeline name:

- **Unlocked** (open lock icon) — click to lock the cue, preventing accidental edits
- **Locked** (closed lock icon) — click to unlock the cue and allow editing
- **Locked upstream** (dimmed lock icon) — the cue is locked because its parent timeline is locked. This cannot be toggled from the cue level; unlock the timeline instead.

When multiple cues are selected, clicking the lock/unlock icon on any selected cue applies the action to all selected cues simultaneously.

### Blind Edit Indicator

Cues belonging to a Blind Edit timeline are visually distinguished with a special highlight style and an eye-off icon in the Timeline column. Blind Edit mode allows you to make changes to a timeline that is currently playing without those changes taking effect until you apply them. The Cue List makes it easy to identify which cues are in this state.

### Context Menu

Right-click a cue (or the table background) to access context menu actions:

- **Cut / Copy / Paste / Delete** — standard clipboard operations for cues
- **Open Composition** — for composition cues, opens the composition's internal timeline for editing in a new window
- **Lock / Unlock** — toggle the lock state of selected cues

### Drag and Drop

The Cue List supports drag-and-drop interactions:

- **Drag assets** from the Assets window onto a cue row to replace that cue's media source
- **Drag assets** onto the table background to apply the media to all selected cues
- **Drag devices** (virtual displays, captures) onto cues to assign them as media sources

When dropping media onto a selection that includes cues both inside and outside the visible list, a dialog asks whether you want to update only the cues in the list, only the target cue, or all selected cues.

:::tip
Use the Cue List's filter presets to set up common views for different stages of production — for example, a "Media Only" preset for content review, a "Markers" preset for show calling, and an "All Cues" preset for full auditing.
:::
