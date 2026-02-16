---
title: "Display Properties"
---


## Display Properties

**Display Properties** control how each display is named, placed, routed, rendered, and calibrated. In practice, this panel is where most output troubleshooting and final show handoff work happens.

### Open Display Properties

1. Select a display in **Stage** or in the **Devices** pane.
2. Open the **Properties** panel.
3. Edit values in the display sections described below.

Many properties can be edited on multiple selected displays at once, which is useful for fast setup across large systems.

### Property Groups at a Glance

| Group | Typical settings | Why it matters |
| --- | --- | --- |
| **General** | Name, Node/Alias, Enabled, Color | Device identity and operator clarity |
| **Placement** | Position/orientation, projector eye/target | Visual alignment on Stage and in 3D mapping |
| **Presentation** | Stage tier visibility | Controls which tiers can show content |
| **Output** | Output type, channel, resolution, size mapping | Physical/virtual routing and raster behavior |
| **Signal** | Color depth/space, SDI link type, interlaced, delay, quality | Signal compatibility and image quality |
| **Warp/Mask** | Warp enable/edit, mask enable/edit, soft edges | Geometry correction and edge shaping |
| **Calibration** | NDI calibration stream, display asset context | Camera-based and imported calibration workflows |
| **White Point** | Per-display R/G/B trim | Cross-display color matching |
| **Test Pattern** | None/Muted/White/Masked/Pattern, overlay | Fast output verification and diagnostics |

### General Properties

Use this section first, before deep signal tuning:

- **Name** - keep labels operator-readable and patch-sheet aligned.
- **Node / Address (Alias)** - host assignment for non-virtual displays.
- **Enabled** - output active state.
- **Color** - visual identification in Stage/Devices views.

For virtual displays, node assignment is not required.

### Placement and Orientation

Placement settings control where the display exists in the show coordinate space.

For regular 2D displays, use placement tools to set position/size/orientation. For 3D projectors, additional parameters are available:

- **Eye** (projector position)
- **Target** (look-at point)
- **Roll**
- **Lens shift**
- **Width/Distance ratio**

Projector calibration lock options can prevent calibration from changing lens shift or width/distance ratio when those values are known and fixed.

### Presentation (Tiers)

The **tiers mask** determines which Stage tiers are allowed to render cues on that display.

Use this to isolate content families (for example show layer variants, rehearsal overlays, operator-only graphics) without changing cue geometry.

### Output Properties

| Property | Purpose |
| --- | --- |
| **Output Type** | `GPU`, `SDI`, `NDI`, or `Virtual` |
| **Channel** | Physical output index (`GPU`/`SDI`) |
| **Resolution** | Render target dimensions |
| **Use as Input Resolution** | Couples display size to output raster |
| **Color Depth** | Output precision (`GPU`) |
| **Color Space** | Display color pipeline target (`GPU`) |
| **NDI Color Space** | Stream color encoding (`NDI`) |
| **SDI Link Type** | SDI transport mode (`SDI`) |
| **Interlaced** | Interlaced output mode (`NDI`/`SDI`) |
| **Delay Frames** | Output delay compensation |
| **Max Quality** | Higher quality render path where needed |

#### Routing Notes

- `GPU` and `SDI` routing depends on node alias + channel.
- `NDI` routing uses stream identity instead of a physical channel.
- `Virtual` has no physical routing.

If two displays share the same route resources, WATCHOUT can report a **resource conflict** warning.

#### Resolution and Size Behavior

The **Use as Input Resolution** toggle controls how stage dimensions relate to output resolution:

- enabled: display size follows output resolution (common/default)
- disabled: display size is modeled independently from output raster

Use independent size only when you intentionally want design-space dimensions to differ from transmission raster.

### Signal and EDID

Signal-related options are output-type dependent:

- **GPU:** color depth, color space, EDID selection/capture
- **SDI:** SDI link type
- **NDI:** NDI color space
- **NDI/SDI:** interlaced toggle

Additional controls:

- **Delay (frames):** fine timing offset (0-10 frames)
- **Render with maximum quality:** enables higher quality rendering path

Use non-default signal settings only when they solve a specific hardware or show requirement.

### Signal and Calibration

Display-level calibration settings include:

- **White point**
- **NDI calibration stream**
- **Render info overlay**
- **Warp/mask/soft-edge integration**

Notes:

- **NDI calibration stream** is available for GPU display workflows that use camera-based alignment.
- Imported canvas/display-asset workflows may show additional calibration context.

### Warp, Mask, and Soft Edges

Display shaping tools are configured per display:

- **Warp:** enable/disable and open warp editor
- **Mask:** enable/disable and open mask editor
- **Automatic soft edges:** blend setup for overlap workflows
- **Soft-edge gamma:** edge blend response trim

Use these together for projector blending and irregular output surfaces.

### White Point and Test Pattern

#### White Point

Per-display red/green/blue white point controls are used to match output color temperature between displays.

#### Test Pattern

Diagnostic output modes are available per display:

- `None` (normal playback)
- `Muted`
- `White`
- `Masked`
- `Pattern`

The **Show Overlay / Render Info** toggle helps identify outputs during setup.

### Practical Advice

- Set identity and routing first (name, node, output type/channel), then tune signal.
- Keep channel numbering and naming consistent with physical labels.
- Verify every routed display with test patterns before content checks.
- Document all non-default signal and timing values for handoff.
- Lock finalized devices once routing and calibration are approved.
