---
title: "Warp Geometry"
---


## Warp Geometry

Geometry correction aligns rendered imagery to real-world surfaces. In WATCHOUT, this is handled through warp geometry and optional mask geometry.

### Warp Geometry

Warp geometry is mesh-based and supports:

- Adjustable junction points
- Handle-based curve shaping
- Perspective correction transforms
- Per-display editing

This allows precise correction for curved screens, imperfect mounting, and non-rectangular targets.

### Mask Geometry

Mask geometry controls where pixels are visible and how edges are shaped. Use it to:

- Hide spill outside scenic boundaries
- Build custom blend/feather regions
- Combine multiple mask regions on one display

### Recommended Workflow

1. Complete physical alignment first.
2. Apply coarse warp adjustments.
3. Add fine curve/handle corrections.
4. Add masks for cutouts and scenic limits.
5. Re-check cue positioning with representative content.

### Quality Control

Validate with:

- Grid test patterns
- Straight-line graphics for distortion checks
- Real show media at final brightness

Small geometry errors become obvious once motion and high-contrast content play back.
