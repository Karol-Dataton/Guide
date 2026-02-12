---
title: "Compositions"
---


## Compositions

Compositions are nested timeline units that allow you to group multiple cues into a single, self-contained entity. A composition appears on its parent timeline as a single media cue, but internally it contains its own layers, cues, and timing — effectively a timeline within a timeline. This makes compositions ideal for creating reusable visual building blocks that can be placed across multiple timelines or repeated at different points in a show.

### What Compositions Are

A composition is a special cue sequence with its own internal layers and cue arrangement. When you group cues into a composition, WATCHOUT:

1. Creates a new composition object with its own cue sequence (layers, cues, and duration)
2. Removes the original cues from the parent timeline
3. Inserts a single **composition cue** in their place — a media cue whose source is the composition rather than an asset file

The composition cue inherits position and anchor properties from the grouped cues, so it appears in the same location on the Stage. Internally, the composition preserves the relative timing and layer arrangement of its constituent cues.

Compositions also have a **reference frame** that defines their internal coordinate space, and they can optionally be linked to a source asset (for example, when created from a 3D model import).

### Creating a Composition

To create a composition:

1. Select one or more cues on the same timeline
2. Go to **Timeline → Group Cues into Composition**, or press **Ctrl+G**

The selected cues must all belong to the same timeline. WATCHOUT collects them, determines the required number of layers, creates a new composition named sequentially (e.g. "Composition 1", "Composition 2"), and replaces the selected cues with a single composition cue at the position of the first selected cue.

The composition cue's duration matches the span of the grouped cues. Its blend mode, tier mask, and other media options are set to defaults (Normal blend, first tier only, no depth check).

:::tip
When importing 3D models, WATCHOUT automatically creates compositions for multi-mesh models — each mesh surface becomes a separate cue inside the composition, allowing independent texturing while keeping the model as a single unit on the timeline.
:::

### Ungrouping a Composition

To dissolve a composition back into individual cues:

1. Select one or more composition cues on the timeline
2. Go to **Timeline → Ungroup Cues**, or press **Ctrl+Shift+G**

When you ungroup, WATCHOUT:

- Extracts all cues from the composition's internal cue sequence
- Adjusts their start times relative to the composition cue's position on the parent timeline
- Adjusts their positions based on the composition cue's position and anchor offset
- Creates any additional layers needed on the parent timeline to accommodate the composition's layer structure
- Removes the composition cue from the parent timeline

The ungrouped cues appear on the parent timeline at the correct times and positions, as if the composition never existed.

### Editing a Composition

To edit a composition's internal contents without ungrouping it:

- **From the Cue List**: Right-click a composition cue and select **Open Composition**
- **From the Timeline**: Double-click the composition cue, or select it and open it via the context menu

When you open a composition for editing, a new Timeline window appears showing the composition's internal cue sequence. The Stage window switches to **composition mode**, indicated by a gantt chart icon in the top bar. While in composition mode:

- The Stage shows only the cues belonging to the active composition
- **Projector mode is not available** — the Stage automatically exits projector mode when a composition is opened
- The Stage switches to cue edit mode (display editing is disabled)
- Cue selections on the Stage are scoped to the composition's cue sequence

To exit composition mode, activate a regular timeline window. The Stage will return to its normal display.

### Composition Properties

Compositions have the following properties, visible in the Properties panel:

- **Name** — a descriptive name for the composition
- **Duration** — the internal duration of the composition's cue sequence
- **Reference Frame** — the internal coordinate space (x, y, width, height) used for composition layout

The composition cue on the parent timeline has its own start time and duration, which determines how much of the composition's internal timeline is played.

### Compositions as Reusable Assets

Compositions appear in the show's asset statistics alongside other asset types (images, video, audio, etc.) under the **Compositions** category. A composition can be used as the media source for cues on any timeline in the show, making it possible to reuse a single composition in multiple places.

When a composition is referenced by cues on different timelines, editing its internal contents affects all instances simultaneously — the composition is a shared resource, not a copy.

### Nesting Compositions

Compositions can contain other compositions. There is no explicit depth limit on nesting, so you can build layered hierarchies of grouped content. However, deeply nested compositions increase the complexity of the show and can make debugging visual issues more difficult.

:::note
Composition cues do not support cue set (variant) assignments. If you need variant-based media switching, the individual cues inside the composition should be assigned to cue sets before grouping, or the composition should be ungrouped first.
:::

### Blind Editing Compositions

Compositions participate in the blind edit system. When a blind edit is started on a timeline, a temporary composition is created that mirrors the timeline's content. Edits are made to this temporary composition and can be applied (committed) or discarded without affecting the live show. See the [Blind Edit Mode](../06-timeline-and-cues/15-blind-edit-mode) article for details.

### Best Practices

**Group stable, reusable clusters.** Compositions work best for content that is logically self-contained — a lower-third graphic with multiple layers, a multi-mesh 3D model, or a complex animated sequence that appears in several places.

**Name compositions descriptively.** Default names like "Composition 1" become hard to distinguish in large shows. Rename compositions to reflect their content (e.g. "Speaker Intro Lower Third", "Stage Left Model").

**Avoid excessive regrouping late in production.** Grouping and ungrouping involves restructuring cue positions and layers. Making major composition changes close to showtime increases the risk of unintended visual shifts.

**Use compositions for 3D model management.** When working with multi-surface 3D models, compositions keep all mesh cues organized as a single timeline entity while still allowing independent texture assignment per surface.
