---
title: "Effects and Tweens"
icon: "sliders"
---

# EFFECTS AND TWEENS

**Tweens are time-based value changes attached to cues that bring your content to life with animation, transitions, and dynamic visual effects.** Every visual property of a cue - position, scale, opacity, color, crop, rotation, and more - can be animated over time using tweens. WATCHOUT supports 48 tween types across categories ranging from simple fades to complex corner-pin distortion and expression-driven automation.

### Start Here

Understand how tweens work before diving into specific effect types.

- [Understanding Tweens](01-understanding-tweens.md) - tween structure (type, keyframe points, interpolation curves, limits), how to add and edit tweens, and the categories of supported tween types
- [Opacity and Fades](05-opacity-and-fades.md) - the most common tween: custom transparency animation plus the dedicated Fade In, Fade Out, and Cross Fade helpers

### Transform Effects

Animate position, size, and rotation for motion graphics and spatial composition.

- [Position and Movement](02-position-and-movement.md) - animating cue placement on Stage for slide-ins, tracking moves, and camera-like pan effects
- [Scale and Size](03-scale-and-size.md) - X/Y scale tweens with maintain-proportions control, pixel value display, and zoom effects
- [Rotation Effects](04-rotation-effects.md) - rotation across three axes: Z (2D spin), Y (horizontal 3D turn), X (vertical 3D tilt)

### Visual Effects

Shape, color-correct, and blend your content.

- [Cropping](06-cropping.md) - animating visible bounds (top, bottom, left, right) for reveals, wipes, safe-area adjustments, and dynamic framing
- [Color Adjustments](07-color-adjustments.md) - brightness, contrast, gamma, hue, saturation, invert, and per-channel gain/offset tweens for mood transitions and color matching
- [Blur Effects](08-blur-effects.md) - Gaussian blur for softening and defocus effects
- [Blend Modes](12-blend-modes.md) - the seven per-pixel compositing modes (Normal, Add, Multiply, Screen, Lighten, Darken, Linear Burn)

### Audio

- [Audio Volume](09-audio-volume.md) - volume tweens for music fades, voice-over ducking, and ambience balancing

### Advanced Effects

Specialized tools for distortion, compositing, and data-driven animation.

- [Corner Pinning](10-corner-pinning.md) - per-cue perspective distortion via independent corner repositioning
- [Linear Wipe](11-linear-wipe.md) - directional reveal/hide transitions with angle, location, feather, and completion controls
- [Frame Blending](13-frame-blending.md) - temporal interpolation between adjacent video frames to smooth mismatched frame rates
- [Chroma Key](14-chroma-key.md) - per-cue green/blue screen compositing with wide-gamut color matching
- [Key and Fill](15-key-and-fill.md) - layer-level compositing where one layer generates a transparency mask for another
- [Tween Expressions](16-tween-expressions.md) - driving any tween property with mathematical expressions for interactive, variable-driven, and externally controllable animations
