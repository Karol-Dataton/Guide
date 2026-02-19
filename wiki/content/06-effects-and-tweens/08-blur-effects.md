---
title: "Blur Effects"
---


## Blur Effects

WATCHOUT provides a **Gaussian Blur** tween for softening and defocusing cue content over time. Blur is a versatile creative tool — it can simulate depth-of-field focus pulls, smooth transitions, soften background elements to draw attention to foreground content, or create stylized intro and outro looks. The blur is applied per-cue, so each piece of content can have its own independent blur animation.

### Gaussian Blur Tween

The Gaussian Blur tween controls the blur radius applied to the cue:

- **Range:** 0.5 to 64
- **Default:** 0.5 (no visible blur)
- **Unit:** none (the value represents the blur radius in relative units)

At the minimum value of 0.5, no blurring is visible — the content appears sharp. As the value increases, the image becomes progressively softer. At 64 (the maximum), the content is extremely blurred, with fine detail completely dissolved.

The blur is Gaussian, meaning it uses a smooth, bell-curve-shaped filter kernel. This produces a natural, optically pleasing softness that resembles real camera defocus, as opposed to box blur or motion blur techniques that can look artificial.

### Adding a Blur Tween

To add blur animation to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click **Gaussian Blur**, or press **Alt+B**.
3. The blur tween appears in the tween area beneath the cue, within the **General** group.

The tween starts at its default value of 0.5 (no visible blur). Add tween points with higher values at the desired times to create blur effects.

### Common Use Cases

- **Focus pulls** — simulate depth-of-field transitions by animating blur from 0.5 (sharp) to a moderate value (8–15) and back. Layer a sharp foreground cue over a blurred background cue to direct audience attention, then reverse the blur to shift focus.
- **Soft intro/outro** — start a cue fully blurred (high value) and animate to sharp (0.5) for a dreamy fade-in effect. Reverse the process at the end of the cue for a soft fade-out. This pairs well with an Opacity tween for a combined blur-and-fade transition.
- **Background softening** — apply a static blur (constant value, no animation) to background or ambient content so that it provides visual texture without competing with sharp foreground elements.
- **Transition smoothing** — briefly blur content during a fast position move or scale change, then resolve to sharp at the destination. This mimics the way a moving camera briefly goes soft during a quick pan.
- **Text readability** — blur a background image behind text overlays to improve contrast and legibility without dimming the background content.

### Animating Blur

Blur tween points work like any other tween — place the time needle, add a point, set the value, and choose a transition type:

1. At the start of the blur transition, add a tween point at 0.5 (sharp).
2. At the point of maximum blur, add a tween point with the desired blur radius.
3. If the content should return to sharp, add a third point at 0.5.
4. Choose **Transition Type** on each point to control the speed curve. **Cubic InOut** produces a natural focus-pull feel. **Linear** works for mechanical or technical effects.

:::tip
Moderate blur values (5–15) produce the most useful creative results. Very high values (above 30) dissolve the image so completely that the content becomes an indistinct color wash — which can be useful as a stylistic choice but rarely works as a focus-pull effect.
:::

### Blur with Overlapping Cues

When multiple cues overlap on Stage and each has its own blur tween, the blurs are applied independently to each cue before compositing. The final composited image shows each cue at its own blur level. This is the expected behavior for most workflows — it lets you blur a background cue while keeping a foreground cue sharp, or vice versa.

If two blur tweens are applied to the same cue (for example, through tween expressions or multiple tween instances), the combined blur radius is calculated as the square root of the sum of squares of the individual radii. In practice, this means two moderate blurs combine to a somewhat larger blur, but not simply the sum of the two. The maximum combined radius is capped at 64.

### Performance Considerations

Gaussian blur is GPU-intensive because it requires sampling many surrounding pixels for each output pixel. The performance cost increases with the blur radius — higher values require larger sampling areas. In large compositions with many overlapping blurred cues, this can impact playback performance on the display server.

If you experience frame drops or stuttering during blur-heavy sections:

- **Reduce overlapping blurred cues.** Blur one or two key elements rather than blurring everything.
- **Lower the blur radius.** A radius of 10–15 often achieves a similar visual effect to 30+, at significantly lower cost.
- **Shorten blur durations.** Keep heavily blurred sections brief.
- **Pre-render where possible.** For mission-critical playback moments, consider rendering the blurred version as a separate media file rather than applying real-time blur.

### Combining with Other Effects

Blur pairs naturally with several other tweens:

- **Opacity** — combine blur and opacity for a "fade through soft" transition. Animate blur from high to low while fading opacity from 0% to 100% for content that materializes out of a soft haze.
- **Scale** — blur while scaling down for a "vanish into distance" effect, or blur while scaling up for a "rushing toward camera" feel.
- **Color adjustments** — desaturate and blur simultaneously for a "memory" or "flashback" aesthetic. Reduce saturation to 30–50% while increasing blur for a washed-out, dreamy look.
- **Position** — blur during fast position moves and resolve to sharp at the destination for motion-blur-like transitions.

### Practical Tips

- The minimum value of 0.5 means "no blur." You cannot set blur to 0. In practice this is invisible — 0.5 is indistinguishable from perfectly sharp.
- For focus-pull effects, animate over 0.5–1.0 seconds for a realistic camera feel. Faster pulls (under 0.3 seconds) can feel jarring; slower pulls (over 2 seconds) can feel sluggish.
- Always preview blur effects on the actual display output. The Stage view approximates the blur, but the final look depends on the output resolution and display characteristics.
- Blur interacts visually with edge blending and display masks. If a blurred cue extends to the edge of a display, the blur may soften the boundary in ways that affect mask transitions. Check the composited output in these cases.
