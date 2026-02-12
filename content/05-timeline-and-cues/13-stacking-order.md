---
title: "Stacking Order"
---


## Stacking Order

When multiple cues overlap on the same display area, WATCHOUT needs to determine which content appears in front of (on top of) which other content. This is controlled by **stacking order** — a system that operates at both the cue level and the timeline level to give you precise control over visual layering.

### Per-Cue Stacking Mode

Every media cue has a **Stacking** property in the Cue Properties panel (under the Presentation page) that determines how it composites relative to other cues on the same timeline. There are two modes:

#### By Layer

The default stacking mode. Cues are composited based on their **layer order** within the timeline. Cues on higher-numbered layers (further down in the Timeline window) render behind cues on lower-numbered layers (higher in the Timeline window). The Z position of the cue has no effect on stacking — only the layer arrangement matters.

This is the most predictable mode and is recommended for most 2D content workflows, where you want explicit control over what appears in front of what.

#### By Z

Cues are composited based on their **Z position** value (depth in 3D space). Cues with smaller Z values (closer to the viewer) render in front of cues with larger Z values (further from the viewer). The layer order is ignored for stacking purposes.

This mode is primarily useful for 3D scenes where you want the natural depth ordering of objects to determine visibility, such as projection mapping onto 3D models or scenes with multiple depth planes.

:::tip
You can mix stacking modes within the same timeline. Some cues can use By Layer while others use By Z. Cues using By Z participate in depth testing against each other, while By Layer cues are composited strictly by their layer position.
:::

### Per-Timeline Stacking Order

Timelines also have a **Stacking** property (found in the Timeline Properties panel under General) that controls how the timeline's content composites relative to other timelines. There are two options:

#### Timeline Order

The default setting. Timelines render in the order they appear in the **Timelines panel** — timelines listed lower in the panel render on top of timelines listed higher. You can reorder timelines by dragging them in the panel to change their stacking priority.

This means the visual front-to-back order of timelines matches their top-to-bottom order in the panel, with the **bottom-most timeline rendering on top**.

#### Always on Top

A timeline set to **Always on Top** renders above all other timelines that use the default Timeline Order, regardless of its position in the Timelines panel. If multiple timelines are set to Always on Top, they composite among themselves in their panel order.

This is useful for overlay timelines (e.g. a logo or emergency messaging layer) that must always appear in front of all other content.

### Layer Order Within Timelines

Within a single timeline, the vertical arrangement of layers determines the default rendering priority for cues using the By Layer stacking mode. Layers are numbered starting from the top of the Timeline window:

- **Layer 1** (topmost) renders **in front of** all other layers
- **Layer 2** renders behind Layer 1 but in front of Layer 3
- And so on, with higher-numbered layers rendering further behind

This ordering is consistent with common compositing conventions — the topmost layer in the timeline view is the frontmost visual layer.

### Cross-Timeline Compositing

When multiple timelines contribute content to the same display area, the compositing order is:

1. **Always on Top timelines** render last (in front), in their panel order
2. **Regular timelines** render in their panel order (bottom of panel = front)

Within each timeline, cues composite according to their per-cue stacking mode (By Layer or By Z). The result of each timeline's internal compositing is then layered according to the timeline stacking order.

### Practical Implications

**Blend modes and transparency.** Stacking order directly affects how blend modes (Add, Multiply, Screen, etc.) interact between overlapping cues. A cue using the Add blend mode on a higher layer adds its pixel values to whatever is rendered on lower layers. Changing the stacking order changes which content is "below" the blended cue.

**Opacity and fade effects.** When a cue fades to transparent, the content behind it (as determined by stacking order) becomes visible. Incorrect stacking can result in unexpected content showing through during fades.

**Performance considerations.** Stacking order affects the rendering pipeline. Cues using By Z stacking require depth buffer operations, which can be slightly more expensive than By Layer compositing. For purely 2D shows, By Layer is the more efficient choice.

**Multi-timeline shows.** In complex productions with many overlapping timelines, use the Always on Top setting sparingly for true overlay layers (emergency messages, persistent logos) and rely on panel ordering for the main content timelines.
