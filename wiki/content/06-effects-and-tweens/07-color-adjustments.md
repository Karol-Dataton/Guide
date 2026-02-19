---
title: "Color Adjustments"
---


## Color Adjustments

Color adjustment tweens let you animate tonal and channel-level color properties directly on individual cues. WATCHOUT provides 14 color tweens covering global adjustments (brightness, contrast, exposure), tone mapping (temperature, gamma), color manipulation (hue, saturation, invert), and per-channel corrections (red, green, and blue gain and offset). All are animatable over time and can be combined freely for precise color control.

Color tweens are accessed through the **Effect > Color** submenu. Each tween is added individually — you choose which color properties you need and add only those.

### Available Color Tweens

The following table lists all color tweens with their ranges, defaults, and units:

| Tween | Range | Default | Unit | Effect |
|---|---|---|---|---|
| **Brightness** | -100 to 100 | 0 | % | Shifts all pixel values lighter (positive) or darker (negative). At 0, no change. |
| **Contrast** | -100 to 100 | 0 | % | Increases (positive) or decreases (negative) the difference between light and dark areas. At 0, no change. |
| **Exposure** | -20 to 20 | 0 | EV | Simulates camera exposure adjustment in exposure value (EV) stops. Each +1 EV doubles brightness; each -1 EV halves it. |
| **Temperature** | -100 to 100 | 0 | % | Shifts the white balance warmer (positive, toward orange) or cooler (negative, toward blue). At 0, no change. |
| **Gamma** | 0.01–10.0 | 1.0 | — | Adjusts the midtone brightness curve. Values below 1.0 darken midtones; values above 1.0 lighten them. Shadows and highlights are less affected. |
| **Hue** | unlimited | 0 | degrees | Rotates the entire color spectrum. At 0, no change. A shift of 180° inverts all colors to their complements. Values beyond 360° wrap around. |
| **Saturation** | 0–100 | 100 | % | Controls color intensity. 100% = full color (default). 0% = fully desaturated (grayscale). |
| **Invert** | 0–100 | 0 | % | Blends between the original image (0%) and a fully color-inverted version (100%). Intermediate values produce a partial inversion effect. |
| **Red Gain** | 0–100 | 100 | % | Scales the red channel. 100% = unchanged. Lower values reduce red intensity. |
| **Green Gain** | 0–100 | 100 | % | Scales the green channel. 100% = unchanged. Lower values reduce green intensity. |
| **Blue Gain** | 0–100 | 100 | % | Scales the blue channel. 100% = unchanged. Lower values reduce blue intensity. |
| **Red Offset** | -100 to 100 | 0 | % | Adds to or subtracts from the red channel uniformly. 0 = unchanged. |
| **Green Offset** | -100 to 100 | 0 | % | Adds to or subtracts from the green channel uniformly. 0 = unchanged. |
| **Blue Offset** | -100 to 100 | 0 | % | Adds to or subtracts from the blue channel uniformly. 0 = unchanged. |

### Adding Color Tweens

To add a color tween to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect > Color** submenu.
3. Click the desired color property (Brightness, Contrast, Hue, etc.).
4. The tween appears in the tween area beneath the cue, within the **Color** group.

Color tweens are added individually. You can add as many or as few as needed for your purpose. All color tweens share the **Color** group header in the tween area.

### Understanding the Color Controls

The color tweens fall into three functional categories:

**Global adjustments** — Brightness, Contrast, Exposure, and Gamma affect the entire image uniformly. These are the most common adjustments for matching content to venue conditions or creating mood shifts.

- **Brightness** and **Exposure** both affect overall lightness, but in different ways. Brightness applies a linear shift — it moves all values up or down equally. Exposure applies a multiplicative change that mimics camera behavior — highlights shift more than shadows, producing a more natural look. For simple adjustments, either works. For photographic-quality correction, Exposure is generally preferred.
- **Contrast** widens or narrows the gap between the darkest and brightest pixels. Increasing contrast makes darks darker and lights lighter. Decreasing it pushes everything toward the midpoint.
- **Gamma** targets midtones specifically, leaving deep shadows and bright highlights relatively untouched. This is useful for adjusting the perceived brightness of content without clipping highlights or crushing shadows.

[[WIDGET:color-global-controls]]

**Tone and color manipulation** — Temperature, Hue, Saturation, and Invert change the color character of the image.

- **Temperature** shifts the color balance along the warm-cool axis. This is particularly useful for matching content shot under different lighting conditions, or for creating mood shifts (warm for sunset scenes, cool for moonlight).
- **Hue** rotates the entire color spectrum. Small shifts (10–20°) subtly change the mood of an image. Larger shifts create dramatic color transformations. At 180°, every color becomes its complement.
- **Saturation** controls how vivid colors appear. Reducing saturation toward 0% produces a grayscale look; the default 100% preserves the original color intensity. Values between create a "washed out" aesthetic.
- **Invert** blends between the normal and inverted image. Partial inversion (around 50%) produces a flat, low-contrast look. Full inversion (100%) reverses all colors — useful as a creative effect or for working with negative-format source material.

[[WIDGET:color-hue-rotation-wheel]]

**Per-channel corrections** — Red/Green/Blue Gain and Red/Green/Blue Offset provide independent control over each color channel.

- **Gain** scales a channel multiplicatively. Reducing Red Gain from 100% to 50% halves the red intensity everywhere, shifting the image toward cyan. Gain is best for overall color balance adjustments.
- **Offset** adds or subtracts a flat value to a channel. Adding Red Offset shifts the entire image toward red, including areas that originally had no red at all. Offset is useful for tinting shadows (which Gain cannot easily affect since they start near zero).

### Animating Color Changes

Color tweens work like any other tween — add tween points at different times with different values and choose transition types to control the interpolation:

1. Place the time needle at the moment where you want the color to start changing.
2. Set the tween value (for example, Saturation at 100%).
3. Move the time needle to the end of the transition and add a point with the target value (for example, Saturation at 0%).
4. Choose a **Transition Type** for the interpolation curve.

For smooth, natural-looking color transitions, **Cubic InOut** or **Sinusoidal InOut** easing curves work well. For sudden shifts (like a lighting change on a beat), use **Linear** with a short time interval.

### Common Use Cases

- **Day-to-night transitions** — combine decreasing Brightness, decreasing Temperature (cooler), and slightly decreasing Saturation over a long duration for a gradual sunset-to-night effect.
- **Desaturation for emphasis** — reduce Saturation on background content to 20–30% while keeping the foreground cue at full color, drawing the audience's attention to the foreground.
- **Color matching between sources** — when mixing media from different cameras or lighting conditions, use Temperature and per-channel Gain/Offset to bring content into visual alignment.
- **Mood shifts** — animate Hue rotation over time for a psychedelic or dreamy color-cycling effect. Even small hue shifts (5–10° over several seconds) can create a subtle sense of change.
- **Highlight/shadow coloring** — use Gain to reduce a channel in the highlights (bright areas) and Offset to add a different channel in the shadows (dark areas), creating a split-toning look.
- **Flash effects** — briefly spike Brightness or Exposure to a high value and immediately return to normal for a camera-flash or strobe effect.

### Processing Order

When multiple color tweens are active on the same cue, they are applied in a defined order. The general sequence is: gain and offset adjustments are applied to individual channels first, then global adjustments (brightness, contrast, exposure, gamma) are applied, then hue, saturation, and invert transformations are processed. The temperature adjustment uses a white-balance correction that is applied during the matrix processing stage.

In practice, the processing order is most relevant when using extreme values. For moderate adjustments, the order has minimal visible impact and you can work with the controls intuitively without worrying about the pipeline sequence.

### Quality Considerations

- **Extreme values can clip.** Pushing Brightness, Contrast, or Exposure to high values can clip highlights to pure white or crush shadows to pure black, losing detail that cannot be recovered. Work with moderate values and check the result on calibrated output.
- **Color shifts are additive across cues.** If multiple cues overlap on Stage with color adjustments, each cue's color correction is independent — they do not interact. The cues are composited after color correction is applied to each one individually.
- **Temperature adjustments are most accurate on neutral content.** Shifting temperature on content that is already heavily color-graded may produce unexpected results because the correction assumes a roughly neutral starting point.
- **Monitor vs. projector differences.** Color adjustments that look correct on a workstation monitor may appear different on projectors, LED walls, or other display hardware due to differences in color gamut, brightness, and black levels. Always verify on the actual output.

### Combining with Other Effects

Color tweens combine well with:

- **Opacity** — fade in while simultaneously shifting from desaturated to full color for a dramatic reveal.
- **Blur** — combine desaturation and blur for a "flashback" or "memory" aesthetic.
- **Linear Wipe** — wipe in content while transitioning from a color-treated look to the natural image.

### Practical Tips

- For show-wide looks (such as making all content warmer or cooler), apply consistent color tween values across related cues rather than adjusting each cue individually. Consider using [Tween Expressions](16-tween-expressions.md) driven by a variable to control color adjustments globally.
- When color-matching multiple sources, start with Temperature and Brightness to get the broad feel right, then fine-tune with per-channel Gain and Offset.
- Keep Gamma adjustments subtle (typically between 0.7 and 1.5). The scale is non-linear — small changes near 1.0 have a visible impact, while extreme values produce harsh, unnatural results.
- Test color tweens on calibrated outputs when possible. What looks right on a workstation preview panel may shift noticeably on the final display hardware.
