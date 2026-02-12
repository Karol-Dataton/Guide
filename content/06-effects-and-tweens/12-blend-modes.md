---
title: "Blend Modes"
---


## Blend Modes

Every media cue in WATCHOUT has a **Blend Mode** property that determines how its rendered pixels are composited with the content beneath it. By default, cues use standard alpha compositing (Normal mode), but you can switch to alternative modes to create a variety of visual effects — from additive light simulations to darkening overlays.

Blend modes operate on a per-pixel basis during compositing. The GPU evaluates each pixel of the cue against the corresponding pixel of the content already rendered below it, producing a final combined result according to the selected blending formula.

### Available Blend Modes

WATCHOUT provides seven blend modes:

- **Normal** — standard alpha compositing. The cue's pixels replace or blend over underlying content based on their alpha (transparency) values. This is the default mode for all cues.
- **Add** (Additive) — the RGB values of the cue are added to the underlying content. This always brightens the result (black pixels have no effect). Useful for light effects, particles, fire, glow, and lens flares.
- **Multiply** — the RGB values of both layers are multiplied together, always producing a darker result (white pixels have no effect). Useful for shadows, texture overlays, and blending images with dark backgrounds.
- **Screen** — the mathematical inverse of Multiply. The values are inverted, multiplied, then inverted again, always producing a lighter result (black pixels have no effect). Useful for glow effects, light leaks, and brightening composites.
- **Lighten** — for each color channel, the brighter of the two pixel values is kept. Only areas brighter than the underlying content show through. Useful for combining multiple light sources.
- **Darken** — for each color channel, the darker of the two pixel values is kept. Only areas darker than the underlying content show through. Useful for combining shadow elements.
- **Linear Burn** — adds the pixel values of both layers and subtracts white (1.0), producing a result darker than Multiply. Creates high-contrast darkening effects and deep shadow blends.

[[WIDGET:blend-modes]]

### Setting the Blend Mode

To change a cue's blend mode:

1. Select the cue in the Timeline or on the Stage.
2. Open the **Properties** panel.
3. In the **Presentation** page, locate the **Blend Mode** dropdown.
4. Select the desired mode from the list.

The change takes effect immediately in the Stage preview.

:::tip
You can set the blend mode on multiple cues simultaneously by selecting them all before changing the property.
:::

### Interaction with Stacking and Layer Order

Blend modes are applied during compositing, so they are directly affected by the **rendering order** of cues:

- Within a timeline, cues are composited according to their **layer order** (bottom layer renders first, top layer renders last). A cue's blend mode determines how it composites onto everything already rendered below it.
- Across timelines, the **timeline stacking order** (Timeline Order or Always on Top) determines which timeline's content is rendered on top. Blend modes apply within this stacking hierarchy.
- A cue's **per-cue stacking** setting (By Z or By Layer) further influences the order in which overlapping cues are composited, which in turn affects how blend modes interact.

### Common Creative Techniques

- **Projection mapping luminance overlays** — use Add mode to layer light effects, moving patterns, or particle systems on top of base content. Black areas in the additive layer are completely transparent.
- **Texture and shadow overlays** — use Multiply mode to darken base content with shadow maps, grunge textures, or vignettes without affecting bright areas.
- **Atmospheric effects** — use Screen mode to composite fog, haze, or light ray overlays that naturally brighten the scene without obscuring dark areas.
- **Selective compositing** — use Lighten or Darken modes to selectively combine the brightest or darkest elements from multiple content sources.
