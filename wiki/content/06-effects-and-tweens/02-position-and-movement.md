---
title: "Position and Movement"
---


## Position and Movement

Position tweens animate where a cue appears on Stage over time. By defining a path of positions across the cue's duration, you can create slide-ins, tracking moves, orbital motion, camera-like pans, and any other spatial animation. Position is one of the most commonly used tweens and provides the richest set of editing tools, including three-axis control, Bezier path handles for curved motion, and an option to automatically orient the cue along its travel direction.

### Position Tween Channels

The Position tween controls three axes simultaneously:

- **Position X** — horizontal placement on Stage.
- **Position Y** — vertical placement on Stage.
- **Position Z** — depth (used for 3D layering and perspective effects).

All three channels share the same tween points — each position tween point defines a complete X, Y, Z coordinate. The range is unlimited in all directions, with a default of 0 (the cue's initial placement as set in cue properties). Values represent Stage coordinates relative to the cue's base position.

### Adding a Position Tween

To add position animation to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click **Position**, or press **Alt+P**.
3. The Position tween appears in the tween area beneath the cue, within the **Transform** group.

The tween starts with a single point at the cue's current position. Add additional tween points at different times to define the motion path.

### Tween Point Properties

When you select a position tween point, the Properties panel shows:

| Property | Description |
|---|---|
| **Time from Start of Cue** | When this point occurs in the cue's timeline |
| **Position X** | Horizontal coordinate at this moment |
| **Position Y** | Vertical coordinate at this moment |
| **Position Z** | Depth coordinate at this moment |
| **Transition Type** | Easing curve from the previous point to this one |
| **Smooth In** | Enables a Bezier control handle for the incoming path segment |
| **Handle In X / Y / Z** | Coordinates of the incoming Bezier handle (visible when Smooth In is enabled) |
| **Smooth Out** | Enables a Bezier control handle for the outgoing path segment |
| **Handle Out X / Y / Z** | Coordinates of the outgoing Bezier handle (visible when Smooth Out is enabled) |
| **Linked Handles** | When enabled, the In and Out handles move together to maintain a smooth curve through the point |

### Straight vs. Curved Motion

By default, the cue moves in straight lines between tween points. To create curved paths:

1. Select a position tween point.
2. Enable **Smooth In** and/or **Smooth Out** in the Properties panel. This adds Bezier control handles to the point.
3. Adjust the **Handle In** and **Handle Out** coordinates to shape the curve. The handles define the tangent direction and curvature magnitude at that point.

When **Linked Handles** is enabled, the In and Out handles are locked together so that adjusting one automatically adjusts the other, maintaining a smooth, continuous curve through the point. Disable Linked Handles when you need a sharp change of direction at a specific point — for example, a cue that slides in from the left, pauses, then exits upward.

[[WIDGET:position-bezier-path]]

:::tip
When Linked Handles is active, the individual Smooth In and Smooth Out toggles are locked on. To control them independently, first disable Linked Handles.
:::

### Align with Trajectory

The **Align with Trajectory** option (shown in the tween-level Properties panel when a Position tween is selected) automatically rotates the cue so that it faces the direction it is currently moving. This is useful for:

- Objects that should always point in their direction of travel (arrows, vehicles, characters).
- Content that needs to follow a curved path while maintaining a natural orientation relative to the path.

When enabled, the cue's rotation is continuously updated based on the tangent of the motion path at each moment. Manual rotation tweens (Rotation X/Y/Z) are overridden along the affected axes while this option is active.

[[WIDGET:position-align-trajectory]]

### Building a Motion Path

A typical workflow for position animation:

1. **Place tween points at key moments.** Decide where the cue should be at the start, at significant scene beats, and at the end. Add a tween point at each of these times and set the X/Y/Z coordinates.
2. **Choose easing curves.** Set the **Transition Type** on each point to control the speed profile between positions. Use **Linear** for constant-speed movement, **Quadratic InOut** or **Cubic InOut** for natural acceleration and deceleration.
3. **Add curves where needed.** Enable Smooth handles on points where the path should curve rather than make a sharp turn. Adjust handle coordinates to shape arcs and sweeps.
4. **Preview and refine.** Play back the cue and watch the motion on Stage. Adjust point timing, positions, and handle shapes until the movement feels right.

### Common Use Cases

- **Slide-in and slide-out** — animate Position X (or Y) from off-screen to the final position, then back off-screen at the end. Use an InOut easing curve for a natural entrance.
- **Tracking across LED walls** — move content horizontally across a wide Stage surface, synchronized to physical movement or a scenic cue.
- **Camera-like pans** — with layered content at different scales, animate position on multiple cues at different speeds to create a parallax depth effect.
- **Orbital motion** — use curved paths with Smooth handles to move a cue in an arc or circle around a central point.
- **Z-depth animation** — animate Position Z to bring content forward or push it back in 3D space, useful when combined with perspective projection settings.

### Combining with Other Tweens

Position animation works well alongside:

- **Scale** — grow or shrink content as it moves, for zoom-in or zoom-out effects.
- **Rotation** — spin content while it travels for dynamic motion graphics.
- **Opacity** — fade in while sliding on, or fade out while sliding off.
- **Gaussian Blur** — blur content during fast movement for a motion-blur aesthetic.

### Practical Tips

- Animate one axis at a time to start, then layer in secondary motion once the primary path is correct.
- Keep motion paths simple for shows that need reliable, repeatable live operation. Complex multi-point paths are harder to adjust under time pressure.
- When combining position with rotation tweens, be aware that Align with Trajectory overrides rotation on the affected axes. If you need both automatic trajectory alignment and manual rotation adjustments, apply them on separate axes.
- Use Position Z sparingly — it is most effective when the display configuration includes perspective projection. On flat 2D setups, Z movement has no visible effect.
