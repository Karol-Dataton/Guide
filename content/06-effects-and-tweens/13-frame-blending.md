---
title: "Frame Blending"
---


## Frame Blending

Frame Blending is a per-cue option that smooths video playback when the source media's native frame rate does not match the show's output frame rate. Instead of repeating or dropping frames to fill the gap, WATCHOUT interpolates between adjacent video frames, producing a crossfade that results in visibly smoother motion.

### How It Works

When a video plays at a different rate than the show's output (for example, 24 fps content in a 60 fps show), some output frames fall between two source frames. Without frame blending, WATCHOUT displays the nearest available source frame, which can cause stuttering or judder — especially noticeable in panning shots or smooth animations.

With Frame Blending enabled, the renderer blends the two neighboring source frames together for any output frame that falls between them. The blend ratio is determined by the fractional position between the two source frames, producing a smooth temporal crossfade.

### Enabling Frame Blending

To enable Frame Blending on a cue:

1. Select the media cue in the Timeline.
2. Open the **Properties** panel.
3. In the **Playback** page, locate the **Frame Blending** toggle.
4. Enable the checkbox.

Frame Blending is disabled by default and must be enabled on each cue individually.

### When to Use It

Frame Blending is most beneficial in these scenarios:

- **Mismatched frame rates** — playing 24 fps or 25 fps film content in a 50 fps or 60 fps show. The interpolation eliminates the 3:2 pulldown stutter that would otherwise occur.
- **Slow-motion playback** — when slowing down video via playback speed adjustments or tween-controlled playback rate. Frame blending fills in the gaps between source frames to maintain smooth motion.
- **Variable-speed tweens** — when a playback rate tween causes the media to play at non-integer speed ratios, frame blending smooths the transitions.

### When to Avoid It

Frame Blending is not ideal for all content types. Avoid it when:

- **Text and sharp-edged graphics** — the crossfade between frames can produce visible ghosting on high-contrast edges, making text appear blurry during motion.
- **Content already matching the show frame rate** — if the source frame rate matches the output rate, every output frame maps exactly to a source frame and blending provides no benefit.
- **Rapid cuts or flash sequences** — frame blending across hard cuts produces brief double-exposure artifacts that may be undesirable.

:::note
Frame Blending interpolates by crossfading pixel values between frames. It does not perform optical flow or motion-vector interpolation, so very fast motion may still show some ghosting.
:::

### Performance Considerations

When Frame Blending is enabled, the renderer must decode and hold **two adjacent frames** in memory simultaneously and perform a per-pixel blend for every output frame. This roughly doubles the texture memory and bandwidth required for that cue compared to non-blended playback. On systems with many simultaneous video cues, enabling Frame Blending on all of them may impact overall GPU performance. Enable it selectively on the cues where smooth motion matters most.
