---
Highest Impact (concepts that are genuinely hard to grasp from text)
1. Easing Curve Gallery — 01-understanding-tweens.md
The article lists 31 curves across 11 families with descriptions like "gentle acceleration" vs. "moderate acceleration" — meaningless without seeing actual curve shapes. An interactive widget showing each curve's motion profile with an animated dot would be the single most impactful visual in the chapter since easing curves are referenced by every other article.
2. Bezier Motion Path — 02-position-and-movement.md
The Smooth In/Out handles and linked vs. unlinked Bezier handles are fundamentally spatial-interactive concepts. "The handles define the tangent direction and curvature magnitude" is precise but opaque without dragging handles and seeing the curve change.
3. 3D Rotation Axes — 04-rotation-effects.md
Three-axis rotation (Z = flat spin, Y = door-opening turn, X = forward tilt) is inherently 3D-spatial. Users routinely confuse which axis does what. A card with per-axis sliders would resolve this instantly.
4. Corner Pinning — 10-corner-pinning.md
The coordinate system where 100 = natural position and 0 = opposite corner is non-obvious. The convexity constraint (some quadrilateral shapes are rejected) is impossible to understand without trying to create them. Draggable corners with value readout is the natural fit.
5. Linear Wipe Parameters — 11-linear-wipe.md
Four interacting parameters (angle, location, feather, completion) create a complex space. "Location determines where along the cue the dividing line sits" is ambiguous without seeing it — location along which axis? (Perpendicular to the angle.)
6. Key and Fill Compositing — 15-key-and-fill.md
The two-layer pipeline (key → mask → applied to fill → result) with four mode variants (Luma, Luma Inverted, Alpha, Alpha Inverted). Note: we already created a key-fill-modes widget for chapter 5 — this article could reuse it or get a tailored version.
---
Medium Impact
7. Opacity × Fade Interaction — 05-opacity-and-fades.md
The multiplicative relationship between the fade system and opacity tweens produces surprising results when both are active. Seeing two curves multiplied into a third makes this clear.
8. Color Adjustments — 07-color-adjustments.md
Brightness (linear shift) vs. Exposure (multiplicative) vs. Gamma (midtone bend) are three different mathematical transforms. Also Gain (multiplicative per-channel) vs. Offset (additive) for shadow tinting.
9. Audio Loudness Perception — 09-audio-volume.md
The counter-intuitive mismatch: a "Linear" fade that looks even on a graph sounds like a rapid drop then lingering tail, because perception is logarithmic.
10. Frame Blending Filmstrip — 13-frame-blending.md
How mismatched frame rates (24fps source → 60fps output) cause held frames without blending, and crossfaded frames with blending. A filmstrip diagram with alignment lines.
---
Lower Impact / Already Covered
- Cropping (06-cropping.md) — four-edge crop is fairly intuitive from text but a manipulator would help
- Scale and Size (03-scale-and-size.md) — anchor point + proportions concept benefits mildly from visuals
- Tween Expressions (16-tween-expressions.md) — expression curve vs. keyframe curve overlay
- Chroma Key spill removal (14-chroma-key.md) — before/after edge comparison (already has tolerance widget)
- Blur (08-blur-effects.md) — not essential; concept is intuitive
- Blend Modes (12-blend-modes.md) — already has widget
---