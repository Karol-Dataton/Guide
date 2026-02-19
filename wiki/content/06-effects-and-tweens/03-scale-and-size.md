---
title: "Scale and Size"
---


## Scale and Size

Scale tweens animate the size of a cue over time by controlling horizontal and vertical scaling independently. Whether you need a slow zoom into a photograph, a pop-in title effect, or a pulsing graphic that breathes with the music, the Scale tween provides precise control over how content grows and shrinks on Stage.

### Scale Tween Channels

The Scale tween controls two axes:

- **X Value** — horizontal scale, expressed as a percentage of the cue's original width.
- **Y Value** — vertical scale, expressed as a percentage of the cue's original height.

The default value for both axes is **100%**, meaning the cue is displayed at its original size. A value of 50% reduces the dimension to half; a value of 200% doubles it. Values above 100% are permitted, and there is no hard upper limit — you can scale content as large as needed.

The Properties panel also shows computed **X Pixel Value** and **Y Pixel Value** fields, which display the resulting pixel dimensions based on the current scale percentage and the cue's source media size. These are useful for verifying that scaled content aligns to specific pixel dimensions on your output.

### Adding a Scale Tween

To add scale animation to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click **Scale**, or press **Alt+S**.
3. The Scale tween appears in the tween area beneath the cue, within the **Transform** group.

The tween starts with a single point at 100% for both X and Y (original size). Add additional tween points to animate the scale over time.

### Maintain Proportions

The **Maintain Proportions** toggle (displayed as a link icon between the X and Y value fields in the Properties panel) locks the X and Y scale values together. When enabled:

- Changing the X Value automatically sets the Y Value to the same percentage, and vice versa.
- Changing the X Pixel Value recalculates the corresponding percentage and applies it to both axes.

This ensures the cue scales uniformly without distortion. Disable Maintain Proportions when you intentionally want to stretch or compress content along one axis — for example, creating a horizontal squeeze effect or matching content to a non-square display region.

[[WIDGET:scale-anchor-proportions]]

:::tip
Maintain Proportions is a per-tween-point setting. You can have some points locked and others unlocked within the same tween, though in practice most workflows keep it consistent.
:::

### Tween Point Properties

When you select a scale tween point, the Properties panel shows:

| Property | Description |
|---|---|
| **Time from Start of Cue** | When this point occurs in the cue's timeline |
| **X Value** | Horizontal scale as a percentage |
| **X Pixel Value** | Resulting width in pixels |
| **Maintain Proportions** | Link icon toggle — locks X and Y values together |
| **Y Value** | Vertical scale as a percentage |
| **Y Pixel Value** | Resulting height in pixels |
| **Transition Type** | Easing curve from the previous point to this one |

### Common Use Cases

- **Pop-in titles** — start at 0% scale and jump to 100% (or slightly beyond with a Bounce or Back easing curve for overshoot). This produces an attention-grabbing entrance.
- **Slow zoom emphasis** — gradually increase scale from 100% to 110% or 120% over a long duration for a subtle Ken Burns-style zoom into a still image.
- **Scale-matched transitions** — scale one cue down while scaling another up to create a seamless handoff between scenes.
- **Breathing or pulsing effects** — alternate between two scale values (for example, 95% and 105%) with Sinusoidal InOut easing for a rhythmic breathing motion.
- **Anamorphic stretch** — disable Maintain Proportions and scale only the X or Y axis to create cinematic widescreen letterbox effects or vertical stretch looks.

### Scale and Pixel Sharpness

Scaling content beyond 100% enlarges the source pixels, which can make the image appear soft or pixelated on high-resolution outputs. For the sharpest results:

- Use source media that is at least as large as the largest display size it will appear at.
- Check the final appearance on your target output hardware, not just in the Stage view — the Stage preview may use different scaling than the actual output.
- If content must scale up significantly during a show, consider providing higher-resolution source media or pre-rendering the zoomed version.

Scaling below 100% is generally safe for quality — the GPU downsamples smoothly and the result looks sharp.

### Combining with Other Tweens

Scale animation pairs naturally with other transform tweens:

- **Position** — move content while scaling for zoom-and-pan effects. A classic documentary technique is to slowly zoom into a photograph while simultaneously panning across it.
- **Rotation** — rotate while scaling for spinning entrance or exit effects.
- **Opacity** — fade in while growing for a soft, expanding reveal, or fade out while shrinking for a disappearing effect.
- **Crop** — combine scale with crop tweens to frame specific regions of content while animating the visible area.

### Practical Tips

- For most animations, keep **Maintain Proportions** enabled to avoid unintentional distortion. Disable it only when asymmetric scaling is part of the creative intent.
- When animating between two scale values, **Cubic InOut** or **Quadratic InOut** easing produces natural-looking acceleration and deceleration. Avoid Linear easing for scale changes — it tends to look mechanical.
- If you are combining scale with position, remember that the cue scales from its anchor point (the cue's position on Stage). A cue at the center of Stage will grow outward from the center; a cue near an edge will grow toward that edge. Adjust position accordingly if the growth direction matters.
