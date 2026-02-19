---
title: "Rotation Effects"
---


## Rotation Effects

Rotation tweens control the orientation of a cue over time, enabling everything from simple 2D spins to full 3D perspective turns. WATCHOUT provides three independent rotation axes, each with its own tween, giving you complete control over how content tilts, turns, and rolls on Stage.

### Rotation Axes

WATCHOUT offers three rotation tweens, each corresponding to a different axis:

| Tween | UI Name | Shortcut | Effect |
|---|---|---|---|
| **Rotation Z** | Rotation Z | **Alt+Z** | Rotates the cue in the plane of the screen — the classic 2D spin. Positive values rotate clockwise, negative values rotate counter-clockwise. |
| **Rotation Y** | Rotation Y | **Alt+Y** | Rotates the cue around a vertical axis — a horizontal 3D turn, like opening a door. |
| **Rotation X** | Rotation X | **Alt+X** | Rotates the cue around a horizontal axis — a vertical 3D tilt, like tilting a sign forward or backward. |

All three are measured in **degrees** with a default of **0** (no rotation). The range is unlimited — values beyond 360 or below -360 produce multiple full revolutions, which is useful for continuous spinning effects.

[[WIDGET:rotation-axes-3d]]

### Adding Rotation Tweens

To add rotation animation to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click **Rotation X**, **Rotation Y**, or **Rotation Z**, or use the corresponding keyboard shortcut.
3. The rotation tween appears in the tween area beneath the cue, within the **Transform** group.

Each rotation axis is added as a separate tween. You can add one, two, or all three depending on the effect you need. For a simple 2D spin, Rotation Z alone is sufficient. For 3D perspective effects, combine two or three axes.

### Rotation Order

When multiple rotation axes are active on the same cue, WATCHOUT applies them in a fixed order: **Rotation Z first, then Rotation Y, then Rotation X**. This order affects the final visual result because 3D rotations are not commutative — rotating Z then Y produces a different orientation than rotating Y then Z.

In practice, this means:

- **Rotation Z** establishes the base spin in the screen plane.
- **Rotation Y** then turns the already-Z-rotated cue horizontally.
- **Rotation X** then tilts the already-Z-and-Y-rotated cue vertically.

If you are creating simple single-axis effects, the order does not matter. When combining multiple axes, preview the result carefully and adjust values until the orientation matches your intent.

[[WIDGET:rotation-order-comparison]]

:::tip
For most 2D work, only Rotation Z is needed. Reserve Rotation X and Y for situations where you specifically want a 3D perspective effect — they are most impactful when combined with content that has a visible sense of depth or when used alongside Position Z changes.
:::

### Common Use Cases

- **Logo or badge spins** — apply a Rotation Z tween that goes from 0° to 360° for one full revolution, or animate continuously for a spinning effect. Use Sinusoidal InOut easing for a graceful start and stop.
- **Card-flip transitions** — animate Rotation Y from 0° to 180° to simulate flipping content around like a card. At the midpoint (90°) the cue is edge-on and invisible, making it a natural place to swap content.
- **Tilt reveals** — use Rotation X to tilt content forward from a top-down perspective (like a sign falling toward the viewer), combined with an Opacity fade-in for a dramatic reveal.
- **Continuous rotation** — set Rotation Z from 0° at the start of a long cue to 3600° at the end for ten full revolutions with constant-speed spinning (using Linear easing).
- **Rocking or oscillating motion** — alternate between small positive and negative rotation values (for example, -5° to 5°) with Sinusoidal InOut easing for a gentle rocking effect.

### 3D Rotation Considerations

Rotation Y and Rotation X produce perspective effects that simulate 3D depth. When using these:

- **Content appears to recede and advance.** As a cue rotates around the Y or X axis, parts of it move farther from and closer to the viewer, creating a perspective foreshortening effect.
- **Large rotations can make content edge-on or inverted.** At 90°, the cue is viewed from the side and becomes a thin line. At 180°, the content appears mirrored. Plan your animation range to stay within visually meaningful angles unless the goal is a full flip.
- **Combine with Position for richer effects.** A Rotation Y turn combined with a Position X shift creates a "swing in from the side" effect that feels more natural than rotation alone. Similarly, Rotation X combined with Position Y movement creates a "tip forward" or "fall back" effect.
- **Render Surface setting matters.** The cue property **Render Surface** (found in the cue Properties panel) controls whether the back face of content is visible during 3D rotation. By default it is set to **Outside**, meaning the back of the cue is not rendered. Set it to **Both Sides** if you want content to remain visible when rotated past 90°.

### Combining with Other Transform Tweens

Rotation works well alongside the other transform tweens:

- **Position** — move content while rotating for dynamic entrances and exits. A cue that slides in from the left while spinning creates an energetic motion graphic.
- **Scale** — shrink content while it rotates away, or grow it while it rotates toward the viewer, for zoom-spin effects.
- **Align with Trajectory** — if a Position tween is active with the Align with Trajectory option enabled, be aware that it overrides rotation on the affected axes to keep the cue oriented along its motion path.

### Practical Tips

- Keep pivot/anchor placement in mind. Rotation always occurs around the cue's position on Stage (its anchor point). If you want a cue to rotate around a different point, offset the cue's position and then use position animation to counteract the offset.
- For smooth, natural 3D rotation effects, use InOut easing curves (Cubic InOut or Sinusoidal InOut) to avoid abrupt starts and stops.
- Test large 3D rotations on the actual display hardware. Perspective foreshortening can appear differently in the Stage preview compared to the real output, especially on wide-format or multi-display setups.
- When animating continuous rotation, ensure the total degree value across tween points is a clean multiple of 360° if you want the cue to return to its original orientation at the end.
