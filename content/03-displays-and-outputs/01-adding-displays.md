---
title: "Adding Displays"
---


## Adding Displays

Displays are the output surfaces your cues render to. In WATCHOUT 7, each display is a configurable device object with placement, routing, and output settings.

### Add a Physical Display

From the **Stage** window, choose:

- **Stage → Add Display**
- Right-click context action for display creation

You can also add displays from the **Network** window to target a selected node.

### Initial Configuration Checklist

After adding a display, set:

- **Name** (clear operator-friendly label)
- **Address / Host** (target node alias)
- **Resolution** (`width × height`)
- **Output type** (GPU, SDI, NDI, or Virtual)
- **Channel** (physical output channel)

### Placement on Stage

Set display size and position to match the real-world layout:

- Use exact pixel dimensions from the processor or projector chain.
- Align displays in stage coordinates before adding cues.
- Use **Frame All Displays** to verify overall layout.

### Verify with a Test Cue

Before building the full show:

1. Add a simple test image/video cue.
2. Route it to the new display.
3. Confirm output appears on the expected node and connector.

:::tip
**Tip:** Use descriptive names like `Left_LED_Wall_A` instead of generic names like `Display 1`.
:::
