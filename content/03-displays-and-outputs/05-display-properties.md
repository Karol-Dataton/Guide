---
title: "Display Properties"
---


## Display Properties

Display Properties control how each display is rendered, routed, and calibrated.

### General Properties

- **Name / Color / Enabled / Locked**
- **Address (host alias)**
- **Placement and orientation**
- **Tier visibility** (which stage tiers can show cues)

### Output Properties

| Property | Purpose |
| --- | --- |
| **Output Type** | `GPU`, `SDI`, `NDI`, or `Virtual` |
| **Channel** | Physical/logic output index |
| **Resolution** | Render target dimensions |
| **Color Depth** | Output precision (for supported hardware) |
| **Color Space** | Display color pipeline target |
| **Interlaced** | Enable interlaced output where required |
| **Delay Frames** | Output delay compensation |
| **Max Quality** | Higher quality render path where needed |

### Signal and Calibration

Display-level calibration settings include:

- **White point**
- **NDI calibration stream**
- **Render info overlay**
- **Warp/mask/soft-edge integration**

### Practical Advice

- Keep channel numbering consistent with physical labeling.
- Use lock state once routing is approved.
- Document non-default delay/color settings for handoff.
