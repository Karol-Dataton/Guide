---
badge: Karol
---


## Understanding the Timeline

**The timeline is the central workspace in WATCHOUT 7 where every piece of show content is placed, sequenced, and controlled.** A timeline is a horizontal time-based canvas divided into layers, each holding cues that define what plays, when it plays, and how it behaves. Media cues carry images, video, and audio; control cues orchestrate playback across timelines; output cues send messages to external systems; variable cues automate parameters; marker cues annotate moments for navigation and show-calling; and ArtNet fixture cues drive DMX lighting. Everything that happens during a show — from the first fade-in to the final blackout — originates from cues on timelines.

A WATCHOUT show typically contains multiple timelines, each responsible for a different aspect of the production: one timeline for the main video sequence, another for ambient backgrounds, another for overlay graphics, another for lighting control. The Timelines panel lists all timelines in the show, and their order in that panel determines the visual stacking priority when multiple timelines contribute content to the same display area. This multi-timeline architecture lets you build complex, layered shows while keeping each timeline focused and manageable.

### The Timeline Window

Opening a timeline (by double-clicking it in the Timelines panel) reveals the **Timeline window** — the primary editing interface for that timeline's content. The window is divided into several functional areas:

**Time Ruler.** The horizontal ruler across the top of the cue area shows the time scale in `HH:MM:SS.mmm` format. Click anywhere on the ruler to jump the playhead to that position. The ruler's notch density adjusts automatically based on the current zoom level, always providing readable time references regardless of how far you are zoomed in or out.

**Playhead.** The triangular cursor on the time ruler marks the current playback position. During playback the playhead advances in real time; when stopped, it indicates the last position. You can drag the playhead along the ruler to scrub through the timeline manually. The playhead position is also displayed numerically in the top bar.

**Layer Headers.** The left panel shows one row for each layer in the timeline. Layer headers display the layer name (or an auto-generated name like "Layer 1" if unnamed), key-and-fill indicators when enabled, and highlight the currently active layer. Click a layer header to make it the active layer. See [Working with Layers](03-working-with-layers.md) for the full layer editing guide.

**Cue Area.** The main body of the window is a scrollable grid where cues are displayed as horizontal bars on their respective layers. Each cue's horizontal position and width represent its start time and duration. You can drag cues to reposition them in time or across layers, and drag their edges to resize them. The cue area supports rubber-band selection, Ctrl+click to toggle individual cues, and Shift+click to extend the selection.

**Transport Controls.** The bottom-left corner of the Timeline window contains the transport controls: **Play**, **Pause**, and **Stop** buttons that control the timeline's playback state. These correspond to the three playback states described in the Playback section below.

**Zoom Controls.** The bottom bar provides zoom in, zoom out, and zoom-to-fit buttons. You can also use **Numpad +** and **Numpad −** to zoom in and out, or **Numpad *** to zoom to fit the entire timeline duration in the visible area. The zoom level is remembered independently for each timeline.

**Minimap.** A compact overview strip at the bottom of the window showing the entire timeline duration at a glance. The visible portion of the timeline is highlighted, giving you spatial context when zoomed in to a small section. Click the minimap to jump the viewport to a different part of the timeline.

**Top Bar.** Displays the current cue information fields and a countdown display. When a cue is selected, its name and timing details appear here.

### Navigation and Scrolling

The Timeline window supports several navigation methods:

| Input | Action |
|---|---|
| **Mouse wheel** | Scroll horizontally through the timeline |
| **Ctrl + mouse wheel** | Jump the playhead forward or backward by 100 ms increments |
| **Ctrl + Shift + mouse wheel** | Jump the playhead by 1000 ms increments |
| **Arrow keys** | Navigate between cues on the active layer |
| **Home** | Scroll to the start of the timeline |
| **End** | Scroll to the end of the timeline |
| **T** | Open the time edit popup for precise numeric time entry |
| **Click on ruler** | Jump the playhead to the clicked position |

During playback, the viewport automatically scrolls to keep the playhead visible. When you stop playback and navigate manually, auto-scrolling pauses until the next play command.

### Zoom

Zoom controls how much of the timeline is visible in the window at once. At minimum zoom you can see the entire timeline duration; at maximum zoom you can work at millisecond precision on individual cue edges.

- **Numpad +** — zoom in (doubles the magnification)
- **Numpad −** — zoom out (halves the magnification)
- **Numpad *** — zoom to fit the entire timeline in the visible area

The zoom level persists per-timeline, so switching between timelines restores each one's last zoom setting.

### Selection and Editing Contexts

The Timeline window uses **context-sensitive editing** — the available operations change depending on what is currently selected. There are four editing contexts:

| Context | What Is Selected | Available Operations |
|---|---|---|
| **Timeline** | Nothing selected, or the timeline background | Global timeline operations: insert/delete time, add layers, timeline properties |
| **Cues** | One or more cues | Move, resize, copy, delete, group into composition, set cue properties |
| **Tweens** | Tween segments within a cue | Edit tween timing, interpolation, and target values |
| **Tween Points** | Individual tween control points | Fine-tune individual keyframe positions and values |

Keyboard shortcuts and right-click menu options change based on the active context. For example, the Delete key removes cues when in Cue context but removes tween points when in Tween Points context.

### Cue Types

WATCHOUT provides six types of cues, each serving a different purpose on the timeline:

| Cue Type | Purpose | Has Duration | Article |
|---|---|---|---|
| **Media Cue** | Displays images, video, audio, or compositions on the stage | Yes | [Adding Media Cues](02-adding-media-cues.md) |
| **Control Cue** | Sends play, pause, or stop commands to timelines with optional jump targets | Yes (but acts at start) | [Control Cues](05-control-cues.md) |
| **Marker Cue** | Annotates a moment on the timeline for navigation, show-calling, or as a named jump target | No (point in time) | [Marker Cues](06-marker-cues.md) |
| **Output Cue** | Sends TCP, UDP, or HTTP messages to external systems synchronized with playback | Yes (but acts at start) | [Output Cues](07-output-cues.md) |
| **Variable Cue** | Drives show variable values from the timeline for automation and interactivity | Yes | [Variables and Variable Cues](08-variables-and-variable-cues.md) |
| **ArtNet Fixture Cue** | Controls DMX/ArtNet fixtures with channel values and tween-based automation | Yes | [ArtNet Fixture Cues](09-artnet-fixture-cues.md) |

Cues are placed on the timeline by dragging assets from the Assets panel (for media cues) or by using the **Timeline** menu and context menu (for all cue types). Every cue lives on exactly one layer at any given time.

### Layers

Layers are the vertical structure of the timeline. Each layer is a horizontal track that holds cues, and the arrangement of layers determines the visual compositing order — which content appears in front of other content on the displays.

- **Layer 1** (topmost in the Timeline window) renders **in front of** all other layers
- Higher-numbered layers render progressively further behind
- Each layer can be named, locked, enabled/disabled, and configured with key-and-fill settings

New timelines start with 10 layers by default, giving you immediate working space. Compositions start with a minimum of 3 layers. You can add or remove layers at any time.

For the complete guide to layer properties, naming conventions, key-and-fill modes, and layer operations, see [Working with Layers](03-working-with-layers.md).

### Playback

A timeline is always in one of three **playback states**:

| State | Behavior |
|---|---|
| **Run** (Play) | The playhead advances in real time and cues are executed as the playhead reaches them. Content renders on the displays. |
| **Pause** | The playhead is frozen at its current position. Content at the current time remains visible but does not advance. |
| **Stop** | The playhead returns to the beginning of the timeline. No content from this timeline is rendered. |

Use the transport controls in the Timeline window or the Timelines panel to change playback state. Playback can also be automated via [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md) or commanded by [Control Cues](05-control-cues.md) on other timelines.

Time is displayed in `HH:MM:SS.mmm` format throughout the interface.

### The Timelines Panel

The **Timelines panel** lists all timelines in the current show and provides an overview of their status. The panel is organized as a tree table that supports folders for grouping related timelines.

#### Panel Columns

| Column | Shows |
|---|---|
| **Name** | Timeline name, with lock icon and auto-run indicator |
| **Status** | Current playback state (Run, Pause, Stop) |
| **Time** | Current playhead position |
| **Countdown** | Time remaining to the end of the timeline |
| **Play / Pause / Stop Expression** | Trigger expressions assigned to automate playback |
| **ID** | The timeline's unique identifier |

#### Working with the Panel

- **Double-click** a timeline to open its Timeline window
- **Drag** timelines up and down to reorder them — this changes their stacking priority (see [Stacking Order](13-stacking-order.md))
- **Right-click** for options: Add Timeline, Add Folder, Collapse All Folders, Copy ID
- Timeline rows show status icons: a lock icon for locked or hands-off timelines, a start-arrow icon for auto-run timelines, and a stacking indicator for timelines set to Always on Top

#### Timeline Folders

Folders organize timelines into logical groups. A folder has a name, color, and position in the panel. Folders can be nested within other folders. Timelines inherit their parent folder's color if they have no color of their own. Use folders to group timelines by scene, department, or function — for example, "Act 1", "Overlays", "Lighting Control".

### Timeline Properties

Every timeline has a set of properties that control its behavior and identity:

| Property | Purpose | Default |
|---|---|---|
| **Name** | Identifies the timeline in the panel and throughout the interface | Auto-generated |
| **Duration** | The total length of the timeline's cue sequence | Determined by cue content |
| **Color** | A color tag for visual identification in the Timelines panel | None (inherits folder color) |
| **Auto Run** | When enabled, the timeline begins playing automatically when the show is loaded | Off |
| **Stacking** | Controls inter-timeline compositing: **Timeline Order** (default) or **Always on Top** | Timeline Order |
| **Lock State** | Controls editing and playback restrictions (see Lock States below) | Unlocked |
| **Play / Pause / Stop Expressions** | Expression rules that automate playback state changes based on variable values | None |

#### Lock States

Timelines support three lock states that provide progressively stronger protection:

| State | Icon | Editing | Playback Control |
|---|---|---|---|
| **Unlocked** | Open lock | Allowed | Allowed |
| **Locked** | Closed lock | Blocked | Allowed |
| **Hands Off** | Hand icon | Blocked | Blocked |

- **Unlocked** is the normal working state — the timeline can be edited and controlled freely.
- **Locked** prevents all editing (moving cues, changing properties, adding or removing content) but still allows playback control — you can play, pause, and stop the timeline.
- **Hands Off** is the strongest protection level. The timeline cannot be edited, and it cannot be played, paused, stopped, or scrubbed from the Producer interface. This is intended for timelines that must not be disturbed under any circumstances during a live show.

Clicking the lock icon on a timeline in the Timelines panel cycles through the three states: Unlocked → Locked → Hands Off → Unlocked.

:::tip
Use **Hands Off** for critical timelines during a live performance — safety messaging, emergency overlays, or synchronized background sequences that must run undisturbed. Hands Off prevents accidental operator interaction with the timeline entirely.
:::

#### Auto Run

When **Auto Run** is enabled, the timeline automatically enters the Run (play) state when the show file is opened. This fires once at show load and does not re-trigger if the timeline is subsequently stopped. Auto Run is independent of trigger expressions — a timeline can have both Auto Run and expression-based triggers.

Auto Run is indicated by a start-arrow icon on the timeline's row in the Timelines panel.

### Stacking Order

When multiple timelines contribute content to the same display area, WATCHOUT needs to determine which timeline's content appears in front. This is controlled by the **stacking order** system:

- **Timeline Order** (default) — timelines render in the order they appear in the Timelines panel. Timelines listed lower in the panel render on top of timelines listed higher.
- **Always on Top** — a timeline set to Always on Top renders above all timelines using the default order, regardless of its panel position.

Within each timeline, the layer arrangement determines the compositing order for individual cues. The full compositing hierarchy is: per-cue stacking mode (By Layer or By Z) → layer order within timelines → timeline stacking order in the panel.

For the complete guide to per-cue and per-timeline stacking, see [Stacking Order](13-stacking-order.md).

### Marker Cues

Marker cues (also called comment cues) are zero-duration annotations that mark specific moments on the timeline. They produce no visual or audio output — they exist purely as organizational signposts and as named jump targets for control cues.

Markers are commonly used for:

- **Scene annotations** — labeling scene changes, technical cue points, and show-calling references
- **Countdown timers** — attaching countdown or count-up timers that give operators advance warning of upcoming events
- **Jump targets** — when a marker has a name, control cues can jump the playhead to that marker's position, enabling non-linear show flows

For the full guide to creating marker cues, configuring countdown timers, naming jump targets, and best practices, see [Marker Cues](06-marker-cues.md).

### Compositions

Compositions are nested timelines that group multiple cues into a single, self-contained unit. A composition appears on its parent timeline as a single media cue, but internally it contains its own layers, cues, and timing — a timeline within a timeline.

Key differences from regular timelines:

- Compositions have no stacking order, trigger expressions, auto-run, color, or lock state
- Compositions are stored as reusable assets — a single composition can be placed on multiple timelines
- Editing a composition's contents affects all instances simultaneously
- Variable cues are not supported inside compositions

Compositions are ideal for reusable visual building blocks: lower-third graphics, multi-layer animated sequences, or multi-mesh 3D models that need to be placed in multiple locations.

For the full guide to creating, editing, ungrouping, and nesting compositions, see [Compositions](10-compositions.md).

### Triggers and Expressions

Timelines can be automated using **trigger expressions** — rules that automatically play, pause, or stop a timeline based on the current value of show variables. Each timeline has three expression slots:

- **Play Expression** — when the expression evaluates to true, the timeline starts playing
- **Pause Expression** — when the expression evaluates to true, the timeline pauses
- **Stop Expression** — when the expression evaluates to true, the timeline stops

Trigger expressions enable reactive show designs where timeline playback responds to external inputs (sensor data, audience interaction, scheduling systems) without manual operator intervention.

For the full guide to expression syntax, variable references, and automation workflows, see [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md).

### Common Issues

| Problem | Cause | Fix |
|---|---|---|
| Timeline won't play or pause | Timeline is in **Hands Off** lock state | Click the lock icon to cycle back to Unlocked |
| Cues cannot be edited or moved | Timeline is **Locked** or **Hands Off** | Unlock the timeline via the lock icon in the Timelines panel |
| Content not visible on displays | Timeline is in **Stop** state, or the layer is disabled | Check the playback state in the Timelines panel; check layer visibility in the Timeline window |
| Wrong content appears in front | Timeline stacking order is incorrect | Reorder timelines in the Timelines panel, or set the overlay timeline to **Always on Top**. See [Stacking Order](13-stacking-order.md) |
| Playhead jumps to unexpected position | A control cue with a jump target is firing | Check for control cues that reference named markers or cues. See [Control Cues](05-control-cues.md) |
| Timeline starts playing on show load unexpectedly | **Auto Run** is enabled | Disable Auto Run in the timeline properties |
| Trigger expression not working | Expression syntax error or variable not updating | Verify the expression in the Timelines panel column; check that the referenced variable exists and is receiving values. See [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md) |
| Zoom level resets when switching timelines | Zoom is per-timeline, not global | This is expected behavior — each timeline remembers its own zoom level |
| Cannot drag cues to a different layer | Target layer is locked | Unlock the target layer before moving cues |