---
title: "Chroma Key"
---


## Chroma Key

Chroma Key is a per-cue compositing technique that removes a specific color from a cue's rendered output, making those areas transparent. This is commonly used to remove green screen or blue screen backgrounds from video footage, allowing the foreground subject to be composited over other content in the show.

WATCHOUT performs chroma keying in the renderer's color pipeline, operating in a wide-gamut color space (Rec. 2020 YCbCr) for accurate color matching regardless of the source media's color standard.

### Enabling Chroma Key

To enable chroma keying on a cue:

1. Select the media cue in the Timeline.
2. Open the **Properties** panel.
3. Locate the **Chroma Key** section.
4. Toggle the **Enabled** switch on.

Once enabled, the cue immediately begins keying out the target color (green by default). You can then fine-tune the parameters to achieve a clean key.

### Presets

WATCHOUT provides three preset options for quick setup:

- **Green** — targets a standard chroma green (RGB 0, 177, 64). This is the default preset and the most common choice for green screen footage.
- **Blue** — targets a standard chroma blue for blue screen footage.
- **Custom** — allows you to specify an arbitrary target color using the color controls.

Selecting a preset immediately updates the target color. You can further refine the color after selecting a preset.

### Target Color

The target color defines which color will be keyed out of the cue's output. You can specify the color using two sets of controls:

- **RGB** (Red, Green, Blue) — set exact color component values.
- **HSV** (Hue, Saturation, Value) — set the color using the hue/saturation/brightness model, which can be more intuitive for selecting colors visually.

A **Change** button opens a color picker for visual target selection. Both RGB and HSV controls update together — changing one set automatically reflects in the other.

### Tolerance

The tolerance parameters control how closely a pixel's color must match the target color to be keyed out:

- **Min** (default: 0.4) — defines the inner boundary. Pixels whose color distance from the target is less than or equal to Min are made **fully transparent**.
- **Max** (default: 0.5) — defines the outer boundary. Pixels whose color distance falls between Min and Max receive **partial transparency**, creating a smooth falloff at the edges of the keyed region.

Pixels with a color distance greater than Max are left fully opaque.

:::tip
Start with the default tolerance values and adjust gradually. Increasing Min expands the fully transparent region; increasing Max softens the transition between transparent and opaque areas. The goal is to fully remove the background while preserving fine edge details like hair or translucent materials.
:::

[[WIDGET:chroma-key-tolerance]]

### Spill Removal

The **Spill Removal** control (default: 0.5) reduces color contamination — the colored fringe that often appears on foreground edges when the key color reflects onto the subject. Higher values apply more aggressive spill suppression, neutralizing the color cast on edge pixels.

### Visualize Mask

The **Visualize Mask** toggle switches the cue's output to a diagnostic view that displays the generated alpha mask directly. In this mode:

- **White areas** represent fully opaque pixels (foreground).
- **Black areas** represent fully transparent pixels (keyed out).
- **Gray areas** represent partially transparent pixels (the tolerance falloff zone).

This is invaluable for fine-tuning tolerance and spill removal settings. Turn off Visualize Mask when you are satisfied with the key to return to normal composited output.

### Reset

The **Reset** button restores all chroma key parameters to their default values (green target, Min tolerance 0.4, Max tolerance 0.5, spill removal 0.5, Visualize Mask off). Use this to quickly return to a clean starting point if your adjustments have become difficult to manage.

### Use Cases

- **Live camera feeds** — composite real-time camera input over show content by keying out the green or blue screen backdrop.
- **Pre-recorded keyed footage** — remove backgrounds from video content shot against a chroma backdrop.
- **Removing uniform backgrounds** — key out any solid-color background, not just green or blue, using the Custom preset with an appropriate target color.

### Tips for Clean Keys

- **Even lighting** — ensure the chroma backdrop is lit uniformly without hotspots or shadows. Uneven lighting creates color variations that make consistent keying difficult.
- **Avoid shadows on the backdrop** — shadows darken the key color, pushing it outside the tolerance range and leaving residual background visible.
- **Subject separation** — keep the subject far enough from the backdrop to minimize spill and shadow contamination.
- **Combine with opacity tweens** — use an Opacity tween alongside chroma key to fade keyed content in or out smoothly during transitions.
