---
title: "Cropping"
---


## Cropping

Crop tweens animate the visible bounds of a cue, progressively hiding content from any edge. Cropping is one of the most versatile visual tools in WATCHOUT — it can create directional reveals, simulate wipes, adjust framing to different aspect ratios, isolate specific regions of source media, and dynamically reshape the visible area of content during playback.

Unlike scaling (which changes the size of the entire image) or masking (which is applied at the display level), cropping works at the cue level and simply moves the visible boundary inward from any edge, making the cropped portion fully transparent.

### Crop Tween Channels

WATCHOUT provides four independent crop tweens, each controlling one edge of the cue:

| Tween | UI Name | Effect |
|---|---|---|
| **Crop Top** | Crop Top | Hides content from the top edge downward |
| **Crop Bottom** | Crop Bottom | Hides content from the bottom edge upward |
| **Crop Left** | Crop Left | Hides content from the left edge rightward |
| **Crop Right** | Crop Right | Hides content from the right edge leftward |

All four channels use the same value system:

- **Range:** 0% to 100%
- **Default:** 0% (no crop — the full edge is visible)
- **Unit:** percentage of the cue's dimension along that edge

A value of 0% means the edge is at its natural position (nothing cropped). A value of 50% moves the edge halfway across the cue. A value of 100% moves the edge all the way to the opposite side, completely hiding the content.

[[WIDGET:crop-edge-manipulator]]

### Dual Value Display

When you select a crop tween point, the Properties panel shows two fields:

- **Percentage** — the crop value as a percentage of the cue dimension (0–100%).
- **Pixels** — the crop value converted to pixels based on the cue's source media resolution.

You can edit either field. Changing the percentage recalculates the pixel value, and changing the pixel value recalculates the percentage. The pixel field is useful when you need to crop to an exact pixel boundary — for example, removing a specific number of pixels of black border from source media.

### Adding Crop Tweens

There are two ways to add crop tweens:

**All four sides at once:**

1. Select one or more cues in the Timeline.
2. Press **Alt+C**, or open the **Effect** menu and click the crop-all option.
3. All four crop channels (Top, Bottom, Left, Right) are added to the cue simultaneously, grouped under the **Crop** header in the tween area.

**Individual sides:**

1. Select one or more cues in the Timeline.
2. Open the **Effect > Crop** submenu and click the specific side you want: **Crop Top**, **Crop Bottom**, **Crop Left**, or **Crop Right**.
3. Only the selected channel is added.

Adding all four sides is the most common approach — you can leave the sides you do not need at 0% (their default), and they have no visual effect.

### Animating Crops

Like all tweens, crop channels support multiple tween points with configurable easing curves. To create a crop animation:

1. Place the time needle at the start of the transition.
2. Set the crop value (for example, Crop Left at 100% to fully hide content from the left).
3. Move the time needle to the end of the transition and add a tween point with the target value (for example, Crop Left at 0% to reveal the full content).
4. Choose a **Transition Type** to control the speed curve.

This produces a left-to-right reveal. By animating different sides in different directions, you can create a wide variety of reveal and conceal patterns.

### Common Use Cases

- **Directional reveals** — animate one crop channel from 100% to 0% to reveal content from a specific direction. For example, Crop Left 100% to 0% creates a left-to-right reveal; Crop Top 100% to 0% creates a top-to-bottom reveal.
- **Directional conceals** — animate one crop channel from 0% to 100% to hide content toward a specific edge.
- **Iris/box reveals** — animate all four crop channels simultaneously from 50% to 0% to create a box that opens outward from the center, revealing the content underneath.
- **Safe-area adjustments** — set static crop values (without animation) to trim edges of source media that extend beyond the desired display area. This is useful when repurposing 16:9 content for a non-standard aspect ratio without re-rendering.
- **Dynamic framing** — animate crops over time to shift the visible region of a large source image, creating a panning effect within the content without using position tweens.
- **Split-screen layouts** — crop multiple overlapping cues to different regions, creating a split-screen effect where each cue occupies a portion of the display area.
- **Text line reveals** — for text graphics, animate Crop Top or Crop Bottom to reveal text line by line, synchronized to narration or music beats.

### Crop vs. Linear Wipe

Both cropping and [Linear Wipe](11-linear-wipe.md) can create reveal and conceal transitions, but they differ in several ways:

| | Crop | Linear Wipe |
|---|---|---|
| **Edge direction** | Always aligned to cue edges (horizontal or vertical) | Freely rotatable to any angle |
| **Edge softness** | Hard edge only | Configurable feather for soft transitions |
| **Channels** | Four independent edges | Four linked channels (angle, location, feather, completion) |
| **Best for** | Rectangular framing, precise pixel-edge crops, aspect ratio adjustments | Angled reveals, soft transitions, cinematic wipes |

Use cropping when you need clean rectangular boundaries. Use Linear Wipe when you need angled or soft-edged transitions.

### Combining with Other Effects

Crop tweens work well alongside other effects:

- **Opacity** — combine a crop reveal with an opacity fade for a softer entrance. The crop provides the directional element while opacity adds an overall transparency transition.
- **Position** — slide content into view while simultaneously cropping the opposite edge for a clean, framed entrance that does not spill beyond a specific boundary.
- **Scale** — zoom into content while cropping edges to maintain a fixed visible frame, creating a "window" effect.
- **Color adjustments** — apply a brightness or saturation change synchronized with a crop reveal for a dramatic unveiling.

### Practical Tips

- Start with one side to define the motion intent, then add secondary crop channels if needed. Simpler crop animations are easier to time and adjust.
- For reveals synchronized to music, use just two tween points (start and end) with an appropriate easing curve rather than many intermediate points. The easing curve handles the acceleration naturally.
- When using crops for permanent framing adjustments (not animated), set the crop value on the first tween point and leave it constant. There is no need to add a second point for a static crop.
- Validate crop behavior on your target output resolution. Percentage-based crops always produce clean results, but if you are targeting specific pixel boundaries, verify using the Pixels field in the Properties panel.
- Remember that crops are percentage-based: a 10% crop on a 1920-pixel-wide cue removes 192 pixels, while the same 10% crop on a 3840-pixel-wide cue removes 384 pixels. If you are reusing cue settings across different media resolutions, check that the crop values still produce the desired framing.
