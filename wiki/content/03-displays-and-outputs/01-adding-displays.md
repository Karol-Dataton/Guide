---
title: "Adding Displays"
---


## Adding Displays

A **display** is the fundamental output unit in WATCHOUT. It maps a rectangular pixel area on the stage to a physical output — a GPU connector, an SDI port, or an NDI stream — on a specific display server node. Every cue that appears on-screen is rendered through one or more displays.

Each display combines three things:

- **Stage placement** — where the display sits in your show layout (position, size, rotation)
- **Routing** — which node and output connector the display is sent to
- **Signal settings** — resolution, color space, color depth, output timing, and format

### Output Types

A display's routing is determined by its **Output Type**. WATCHOUT supports four output modes:

| Output Type | Routing Target | Channel/Port |
| --- | --- | --- |
| **GPU** | Physical GPU output on a display server | Numbered channel (1–65535) |
| **SDI** | SDI output interface | Numbered channel |
| **NDI** | NDI network stream | Stream identity |
| **Virtual** | Internal texture buffer (no physical output) | None |

GPU is the default when creating a new display. For virtual displays, see the dedicated Virtual Displays article.

### Where to Add Displays

You can add displays from several places depending on your workflow:

- **Stage → Add Display** — adds at a default stage location
- **Right-click in Stage → Add Display** — adds at the clicked position, useful when building screen arrays directly on the stage
- **Right-click a node in the Network/Nodes window → Add Display** — adds a display already assigned to that node

New displays are automatically named in sequence (`Display 1`, `Display 2`, etc.) with a default resolution of **1920 × 1080**.

:::tip
If you know the target machine first, add from the Network/Nodes window — the node assignment is filled in automatically. If you are sketching stage geometry first, add from Stage.
:::

### Configuring a Display

After creation, select the display and open the **Device Properties** panel. Configuration is grouped into several sections.

#### General

- **Name** — a clear operator-facing label (for example `Left_LED_Wall_A`)
- **Node / Address** — the display server host that will render this output
- **Enabled** — controls whether the output is active; new physical displays start disabled and must be enabled once routing is confirmed
- **Color tag** — a visual identifier used on the stage to distinguish displays at a glance
- **Lock** — prevents accidental edits to the display once configuration is finalized

#### Output and Routing

- **Output Type** — `GPU`, `SDI`, `NDI`, or `Virtual`
- **Channel** — the physical output port number (shown for GPU and SDI only)

If two displays are mapped to the same node and channel, WATCHOUT flags a resource conflict.

#### Dimensions

- **Resolution** (`width × height`) — must match the real output raster of the connected display device or processor
- **Use as Input Resolution** — when enabled (default), the display's stage size follows the output raster, so a 1920×1080 output is also 1920×1080 on stage; when disabled, the stage size can be modeled independently

#### Signal and Quality

These settings are available for physical output types (GPU, SDI, NDI) and should only be changed when required by the deployment:

| Setting | GPU | SDI | NDI |
| --- | --- | --- | --- |
| **Color Depth** (8/10/12 bpc) | ✓ | — | — |
| **Color Space** (sRGB, Rec. 709, Rec. 2020, HDR PQ/HLG, etc.) | ✓ | — | — |
| **SDI Link Type** | — | ✓ | — |
| **Interlaced** | — | ✓ | ✓ |
| **Max Quality** | ✓ | ✓ | ✓ |
| **Output Delay** (0–10 frames) | ✓ | ✓ | ✓ |
| **EDID** | ✓ | — | — |

#### Warp, Mask, and White Point

All display types support post-processing:

- **Warp** — apply geometry correction for curved or angled surfaces
- **Mask** — define a custom mask shape or enable automatic soft edges for overlapping displays
- **White Point** (R, G, B) — fine-tune color balance per display

### Placement on Stage

Set the display's position and size to match the real-world layout of your screens, projectors, or LED walls:

- Use the exact raster dimensions from the processor or projector chain
- Align displays in stage coordinates before programming cues
- Use **Frame All Displays** to verify overall geometry
- For repeated arrays, use **Create Display Grid** and then fine-tune individual positions

### Verifying Outputs

Validate routing before building show content.

#### Test Pattern Verification

In **Device Properties → Test Pattern**, cycle through:

1. **White** — confirm the expected physical screen activates
2. **Masked** / **Pattern** — confirm geometry and mask alignment
3. **None** — return to normal show rendering

Enable **Render Info** overlay temporarily when identifying many outputs.

#### Test Cue Verification

Place a simple test image or video cue on the new display and confirm that output appears on the expected node and connector. Using both test patterns and test cues gives the most complete validation — patterns check routing and geometry, cues check the full media playback path.

:::warning
Physical displays start **disabled** by default. You must enable a display in Device Properties before it will produce output.
:::
