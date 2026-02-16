---
title: "Warp Geometry"
---

Geometry correction aligns rendered imagery to real-world surfaces. In WATCHOUT, this is handled through [[WIDGET:warp-geometry]]

### Warp Geometry

Warp geometry is mesh-based and supports:

- Adjustable junction points
- Handle-based curve shaping
- Perspective correction transforms
- Per-display editing

This allows precise correction for curved screens, imperfect mounting, and non-rectangular targets.

In practice, warp geometry is used whenever the real projection surface or display alignment is not a perfect rectangle - for example curved LED walls, multi-projector blends, scenic facades, domes, or stages where projector mounting cannot be physically perfect. The normal workflow is to do as much mechanical alignment as possible first, then open the display's warp editor, apply a grid/test pattern, and correct from large to small: first corner/junction placement, then curve handles, then fine edge continuity between adjacent outputs. This iterative approach keeps corrections stable and makes it easier to maintain alignment after transport, re-rigging, or lamp/lens changes.

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
