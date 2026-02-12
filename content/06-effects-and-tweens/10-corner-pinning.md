---
title: "Corner Pinning"
---


## Corner Pinning

Corner pinning is a per-cue distortion effect that lets you independently reposition each of the four corners of a media cue. By moving corners away from their default positions, you can create perspective distortion, trapezoid correction, and arbitrary quadrilateral deformations — all without modifying the source media.

Internally, WATCHOUT computes a **homography projection matrix** from the four corner positions. This matrix maps every pixel from the original rectangular cue into the new quadrilateral shape in a single GPU pass, preserving smooth interpolation across the entire surface.

### Corner Tween Channels

The Corners effect is controlled through **eight tween channels**, one for each axis of each corner:

- **Corner Top Left X** / **Corner Top Left Y**
- **Corner Top Right X** / **Corner Top Right Y**
- **Corner Bottom Left X** / **Corner Bottom Left Y**
- **Corner Bottom Right X** / **Corner Bottom Right Y**

Each channel represents a **normalized offset** from the corner's default position. A value of **100** (the default) means the corner is at its natural position. A value of **0** moves the corner all the way to the opposite corner of the cue. Values beyond this range are permitted — the channels are unlimited — allowing you to extend corners outside the original cue boundary for exaggerated distortion.

:::tip
Because each axis is independent, you have full control over both horizontal and vertical movement of every corner. This makes it possible to create not just simple trapezoids but complex quadrilateral shapes.
:::

### Adding Corner Tweens

To add corner tweens to a cue:

1. Select one or more media cues in the Timeline.
2. Open the **Effect** menu and click **Corners**. This adds all eight corner channels to the cue simultaneously.
3. The Corners tween group appears in the tween area beneath the cue, labeled **Corners** in the tween group header.

Alternatively, you can add corner tweens by right-clicking a cue and accessing the effect options from the context menu.

Once added, each channel starts at its default value of 100 (the corner's natural position). You can then adjust individual corner coordinates by editing tween point values in the Properties panel or by adding additional keyframes.

### Animating Corners

Like all tweens in WATCHOUT, corner channels support multiple **tween points** (keyframes) with configurable easing curves. To animate a corner:

1. Place the time needle at the desired moment and add a tween point to the corner channel.
2. Set the target corner position value.
3. Choose a **transition type** (Linear, Quadratic, Cubic, Sinusoidal, etc.) to control the interpolation curve between points.

By placing keyframes at different times with different corner positions, you can create dynamic perspective shifts — for example, gradually skewing a cue to simulate a turning page or morphing a rectangle into a trapezoid during a transition.

### Convexity Constraint

WATCHOUT automatically enforces a **convexity constraint** on the resulting quadrilateral. If you move corners into a configuration that would create a concave (self-intersecting) shape, the system subtly adjusts the offending corner to maintain a valid convex quadrilateral. This ensures the homography transform always produces a reasonable, artifact-free result.

:::note
The convexity adjustment is minimal and designed to be visually imperceptible in most cases. However, extreme corner configurations may result in slightly different positions than the values you entered.
:::

### Use Cases

- **Projection mapping** — fit rectangular content onto non-rectangular physical surfaces such as angled screens, building facades, or set pieces.
- **Trapezoid correction** — compensate for projector keystoning or physical misalignment by pinning corners to match the actual projection surface.
- **Perspective effects** — simulate depth and dimensionality by skewing content to create a vanishing-point illusion.
- **Artistic distortion** — animate corners over time for creative transitions, shape morphing, or dynamic visual effects.

### Interaction with Display-Level Warp

Corner pinning is a **per-cue effect** applied during the rendering of individual cues, before any display-level geometry correction. If your displays also use warp meshes or geometric correction, the two effects are applied in sequence: the cue is first distorted by its corner pinning, then the entire composited output is transformed by the display warp.

This layered approach means you can use corner pinning for cue-specific adjustments (fitting individual content to specific surfaces) while relying on display warp for global projector alignment — and the two will complement each other without conflict.
