---
title: "Edge Blending"
---


## Edge Blending

Edge blending smooths overlap regions between adjacent projected outputs so they appear as one continuous image.

### Automatic Soft Edges

WATCHOUT supports automatic soft-edge generation using overlap geometry between displays.

Under the hood, overlap regions are converted into gradient-intensity meshes so brightness can be feathered across boundaries.

### Blend Control Methods

Common methods include:

- **Automatic soft edges** from overlapping display geometry
- **Mask-based shaping** for custom overlap boundaries
- **Manual warp/mask refinement** for irregular surfaces

### Calibration Workflow

1. Align projector geometry first.
2. Enable soft edges and review overlap zones.
3. Fine-tune masks where automatic blending is insufficient.
4. Validate using grayscale ramps and full-brightness test images.

### Common Pitfalls

- Incorrect projector black levels can make seams visible.
- Non-uniform brightness or color temperature across projectors reduces blend quality.
- Overly narrow overlaps leave no room for smooth falloff.

:::tip
Blend calibration is most reliable in a controlled lighting environment with stable projector warm-up.
:::
