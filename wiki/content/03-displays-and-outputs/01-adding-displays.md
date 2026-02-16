---
title: "Adding Displays"
---


## Adding Displays

Displays are the output devices your cues render to. In WATCHOUT 7, each display combines three things:

- Stage placement (where the display sits in your show layout)
- Routing (which node/output the display is sent to)
- Signal settings (resolution, color, timing, and output mode)

This guide focuses on adding and configuring **physical displays**. For design-only targets, see the Virtual Displays workflow.

### Add a Physical Display

You can add displays from several places depending on how you are working:

- **Stage -> Add Display**
  - Adds a display at a default stage location.
- Right-click on the **Stage** and add a display
  - Adds a display at the clicked location.
  - Useful when laying out walls/screens quickly.
- Right-click a node in the **Network**/**Nodes** window and choose **Add Display**
  - Adds a display already assigned to that node.

If you know the target machine first, add from Network/Nodes. If you are sketching geometry first, add from Stage.

### Configure the New Display

After creation, select the display and use the **Properties** panel.

#### 1) General

Set:

- **Name** (clear operator-facing label)
- **Node / Address (Alias)** (target host)
- **Enabled** state (turn output on when ready)

Physical displays are often added before final routing is complete, so verify enabled state once assignment is done.

#### 2) Route

In the route/output section, set:

- **Output type** (`GPU`, `SDI`, or `NDI`)
- **Channel** for `GPU`/`SDI` outputs
- For `NDI`, stream identity is used instead of a physical channel

If two displays are mapped to the same route, WATCHOUT can flag a resource conflict.

#### 3) Dimensions

Set:

- **Resolution** (`width x height`) to match the real output raster
- **Use as Input Resolution** as needed:
  - enabled: stage size follows output raster (common/default)
  - disabled: stage size can be modeled independently from output raster

#### 4) Signal and Quality (when needed)

Depending on output type and hardware, configure:

- color depth / color space
- SDI link type
- interlaced mode
- output delay frames
- max quality rendering

Use non-default signal settings only when required by the deployment.

### Placement on Stage

Set display size and position to match the real-world layout:

- Use exact raster dimensions from the processor/projector chain.
- Align displays in Stage coordinates before programming cues.
- Use **Frame All Displays** to verify overall geometry.
- For repeated arrays, use **Create Display Grid** and then fine-tune.

### Verify Outputs Before Programming

Validate routing first, then validate content.

#### Option A: Test Pattern Verification (fast)

In **Device Properties -> Test Pattern**, cycle through:

1. **White** (confirm expected physical screen activates)
2. **Masked** / **Pattern** (confirm geometry and mask path)
3. **None** (return to normal show rendering)

Enable **Render Info** overlay temporarily when identifying many outputs.

#### Option B: Test Cue Verification (content path)

Before building the full show:

1. Add a simple test image/video cue.
2. Place it on the new display.
3. Confirm output appears on the expected node and connector.

Using both checks is best practice: patterns validate routing/geometry, cues validate real media playback.

### Common Issues

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| No image on display | Disabled output or wrong node alias | Enabled state, host assignment |
| Wrong screen lights up | Incorrect channel mapping | Output type and channel |
| Resource conflict warning | Duplicate route assignment | Unique route per display |
| Scale/crop looks wrong | Resolution mismatch | Display resolution vs processor raster |
| Stage looks right, output looks wrong | Warp/mask or signal path mismatch | Test Pattern `Masked`/`Pattern`, warp/mask settings |

### Recommended Setup Sequence

1. Add displays.
2. Name and assign nodes.
3. Set output type/channel and resolution.
4. Arrange Stage geometry.
5. Verify with test patterns.
6. Verify with a test cue.
7. Lock/hand off routing once approved.

:::tip
**Tip:** Use descriptive names like `Left_LED_Wall_A` instead of generic names like `Display 1`.
:::
