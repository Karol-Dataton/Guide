---
title: "Linear Wipe"
---


## Linear Wipe

Linear Wipe is a transition effect that progressively reveals or hides a cue's content using a straight-line boundary. By animating the wipe's parameters over time, you can create clean reveal and conceal transitions, split-screen effects, and dynamic content boundaries.

The wipe works by defining an invisible edge that divides the cue into a visible region and a transparent region. The edge can be positioned, angled, and softened to produce a wide variety of transition styles.

### Wipe Tween Channels

The Linear Wipe effect is controlled through four tween channels, all added together as a group:

- **Angle** — the direction of the wipe edge, expressed in degrees. The range is unlimited (default display range −80° to 180°), so you can rotate the wipe boundary to any orientation. At 0° the edge is vertical; changing the angle rotates it accordingly.
- **Location** — the position of the wipe edge along the perpendicular axis, expressed as a percentage from 0 to 100. This determines where along the cue the dividing line sits. The default value is 100 (fully visible).
- **Feather** — the softness of the transition zone at the wipe edge, expressed as a percentage. A value of 0 produces a hard, crisp edge. Higher values create a gradual fade from opaque to transparent across the boundary. The minimum is 0; there is no hard upper limit.
- **Completion** — the overall progress of the wipe, from 0 (fully hidden) to 100 (fully visible). This is the primary channel you animate to drive a reveal or conceal transition. The default value is 0 (fully hidden).

:::tip
For a simple left-to-right reveal, set the Angle to 0° and animate Completion from 0 to 100. For a top-to-bottom reveal, set the Angle to 90°. Add Feather to soften the transition edge.
:::

### Creating a Linear Wipe

To add a Linear Wipe to a cue:

1. Select one or more media cues in the Timeline.
2. Open the **Effect** menu and click **Linear Wipe**. This adds all four wipe channels to the cue simultaneously.
3. The wipe channels appear in the tween area beneath the cue, grouped under the **Linear Wipe** header.

Once added, the cue starts fully hidden (Completion = 0) by default. Add tween points to the Completion channel to animate the reveal.

### Animating the Wipe

Linear Wipe channels support multiple **tween points** with configurable easing curves, just like any other tween in WATCHOUT:

1. Place the time needle at the start of the transition and set Completion to 0.
2. Move the time needle to the end of the transition and add a tween point with Completion set to 100.
3. Choose a **transition type** (Linear, Quadratic, Cubic, Sinusoidal, etc.) to control the speed curve.

You can also animate the Angle, Location, and Feather channels independently. For example, you might rotate the wipe edge while it sweeps across the cue, or gradually increase feather softness during the transition for a more organic feel.

### Effect Ordering

Linear Wipe is an **orderable effect**, meaning its position in the tween processing chain relative to other orderable effects (such as keying) matters. Effects are processed in the order they appear in the tween list. You can reorder effects to control how they interact — for example, applying a wipe after or before a color key will produce different visual results.

### Combining with Other Effects

Linear Wipe works well in combination with other tweens:

- **Opacity** — combine a wipe with an opacity fade for a reveal that also fades in.
- **Position** — slide content into view while simultaneously wiping it on, creating a cinematic entrance.
- **Corner Pinning** — distort the cue shape while wiping for perspective-aware transitions.
- **Color adjustments** — desaturate or brighten content as it wipes in for dramatic reveals.

### Use Cases

- **Scene transitions** — wipe between content by placing two cues back-to-back and animating their Completion values in opposite directions.
- **Progressive reveals** — gradually uncover text, images, or video using an animated Completion value.
- **Split-screen effects** — set static Location and Completion values (without animation) to divide the cue into visible and hidden regions, effectively cropping along an angled line.
- **Dynamic content boundaries** — animate the Angle or Location over time to create moving borders within a cue.
