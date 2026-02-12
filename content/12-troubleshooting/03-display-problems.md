---
title: "Display Problems"
---


## Display Problems

When a display misbehaves, diagnose in this order: routing, output mode, geometry, then content.

### No Signal on a Display

Check:

1. Display is **enabled** and not locked to wrong settings.
2. Correct **host alias** and **output channel**.
3. Correct **output type** (GPU/SDI/NDI/Virtual).
4. Node services are online.

### Wrong Screen / Wrong Position

- Re-check stage placement and display naming.
- Use **Frame in Stage** and **Frame All Displays**.
- Validate channel mapping in device properties.

### Visible Seams or Warped Content

- Revisit warp geometry and mask edits.
- Verify soft-edge overlap quality.
- Re-run projector calibration where required.

### Interlaced/Color Artifacts

- Confirm interlaced setting is intentional.
- Verify color depth/color space settings per output path.
- Compare with known test pattern media.
