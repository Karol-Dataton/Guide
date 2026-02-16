---
title: "Virtual Displays"
---


## Virtual Displays

A **virtual display** renders cues to an internal texture buffer instead of a physical output connector. Think of it as a **virtual camera** capturing a specific area of the stage — its rendered output can then be used as a media source in other cues, routed through a wall processor to LED tiles, or mapped onto 3D geometry.

Virtual displays are a core production tool for pixel mapping, content re-routing, and layered compositing workflows. They are not temporary placeholders — they remain in production shows alongside physical outputs.

[[WIDGET:virtual-display]]

### What Makes a Display Virtual

A display is virtual when its **Output Type** is set to `Virtual`. This is one of four output types available in WATCHOUT:

| Output Type | Description |
| --- | --- |
| **GPU** | Renders to a physical GPU output connector |
| **SDI** | Renders to an SDI output interface |
| **NDI** | Renders to an NDI network stream |
| **Virtual** | Renders to an internal texture (no physical output) |

In practical terms, a virtual display:

- Is **not tied** to a physical GPU, SDI, or NDI connector
- Does **not require** a node or alias assignment
- Is **always enabled** (the enable/disable toggle is hidden)
- Can be placed, sized, and edited like any other display
- Can be used as a **media source** in cue workflows

### When to Use Virtual Displays

#### LED Wall Pixel Mapping

Virtual displays are widely used for mapping content onto **LED walls** through a wall processor. Place a virtual display over the stage area you want to capture, set its resolution to match the LED processor input, and use its output as the feed. This gives precise control over which part of the stage content reaches each section of the wall.

This is especially useful for:

- LED walls with **non-standard aspect ratios** or unusual tile layouts
- Configurations where content is designed on a wide horizontal stage but must be **split or remapped** to individual processor inputs
- Setups using a wall processor that expects specific input resolutions from the media server

#### Content Compositing

Virtual displays enable **layered compositing workflows**. Because a virtual display's rendered output can be used as a media source, you can:

- Build a complex animation or multi-layer composition on one timeline
- Capture its result via a virtual display
- Use that result as a single media source on another timeline or display

This keeps timelines clean and allows reusable pre-composed elements.

#### 3D Projection Mapping

When mapping content onto **3D geometry**, virtual displays can act as viewpoints that capture specific faces or sections of a model. The captured output is then routed to the corresponding physical projector or display that covers that geometry.

#### Multi-Format Output

Virtual displays allow you to **adapt content layout** to match different output formats. For example, if your stage contains a single wide panoramic composition, you can overlay multiple virtual displays — each capturing a different section at the resolution required by its destination processor or screen.

### Adding a Virtual Display

You can create virtual displays from multiple places in the interface:

- **Stage → Add Virtual Display** — adds at a default location
- **Right-click in Stage → Add Virtual Display** — adds at the clicked position
- **Devices window → Add Virtual Display** — useful when managing device lists directly

New virtual displays are automatically named in sequence (for example `Virtual Display 1`, `Virtual Display 2`). The default resolution is **1920 × 1080** with **Use as Input Resolution** enabled.

:::tip
Rename virtual displays early with a descriptive name that reflects their purpose, for example `LED_TopRow_Feed` or `Comp_BackgroundLayer`.
:::

### Initial Configuration

After creating a virtual display, configure these properties in the **Device Properties** panel:

- **Name** — a clear label that describes its purpose
- **Resolution** — match the expected input resolution of the downstream device (LED processor, capture, etc.)
- **Stage placement** — position and size the display to capture the intended stage area
- **Stage tiers** — assign tier visibility if your show uses tier-based filtering

### Using a Virtual Display as a Media Source

A key capability of virtual displays is that their rendered output can be used as a **media source** for cues on other timelines or displays. This enables multi-stage compositing where one display's full render becomes a single input element elsewhere.

To use a virtual display as a media source:

1. Create a media cue on the target timeline.
2. Assign the virtual display as the cue's media source (drag the virtual display from the Devices window to the timeline).
3. The cue's dimensions automatically match the virtual display's width and height.

Cues that use a virtual display as their media source are always **live** — they do not have playback controls such as in-time, looping, or free-running. The content updates in real time as the virtual display renders.

:::warning
Deleting a virtual display that is currently used as a media source in any cue will trigger a warning. Remove or reassign those cue references first.
:::

### Rendering Details

Internally, a virtual display renders to an **RGBA16F** (16-bit floating-point per channel) texture. A compute shader clamps pixel values to the `[0.0, 1.0]` range during post-processing, preserving wide color range during intermediate rendering stages.

Virtual displays support **output delay** (0–10 frames) for frame buffering. Warp, blend, and white point correction are applied as post-processing passes, just as they are on physical outputs.