---
title: "Understanding Tweens"
---


## Understanding Tweens

Tweens are time-based value changes attached to cues. They define animation curves for motion, opacity, color, crop, and other properties.

### Tween Structure

A tween consists of:

- **Type** (for example position, opacity, blur)
- **Points** over cue time
- **Interpolation** between points
- **Value limits/units** depending on tween type

### Supported Categories

WATCHOUT includes media tweens for:

- Position, scale, rotation
- Opacity and fades
- Crop and blur
- Color controls
- Audio volume

### Units and Limits

Tween values can use different units depending on type:

- Percent-based values
- Degree-based values
- Raw numeric ranges

Value limits are defined per tween type and enforced in the editor.

### Practical Advice

- Start with two-point tweens (start/end), then refine.
- Keep easing readable and intentional.
- Avoid unnecessary tween density unless needed for precision.
