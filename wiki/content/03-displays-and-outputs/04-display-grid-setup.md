---
title: "Display Grid Setup"
---


## Display Grid Setup

**Display grid** is an array of tiled output devices — such as LED panels, monitors, or projectors — arranged in a uniform row-and-column pattern. Rather than adding and positioning each display individually, the grid tools let you define an entire multi-display layout in a single operation, ensuring consistent resolution, spacing, and alignment across every tile. This significantly reduces setup time and eliminates the manual positioning errors that arise when configuring large tiled surfaces display by display.

### When to Use Display Grids

Display grids are the right tool whenever multiple displays of the same resolution are arranged in a regular pattern. Typical scenarios include:

- **LED video walls** — large surfaces composed of many identical LED panels, often driven by one or more LED processors. The grid ensures every panel is placed at the correct offset with zero spacing for a seamless image.
- **Tiled monitor arrays** — screens arranged in a matrix for control rooms, lobby installations, or stage backdrops. Spacing can be set to account for physical bezels between monitors.
- **Repeated projection arrays** — multiple projectors tiling a single large image across a flat surface, where each projector covers one section of the overall canvas.
- **Any uniform layout** — whenever displays share identical resolution and need consistent row/column positioning, a grid is faster and more reliable than manual placement.

### What is Required

To set up a display grid in WATCHOUT, you need to know:

- **Tile resolution** — the pixel dimensions of each individual display in the grid.
- **Number of columns and rows** — how many displays wide and tall the grid is.
- **Spacing** — the gap (in pixels) between adjacent tiles. Use zero for seamless LED walls; use a positive value to model physical bezels or intentional gaps.
- **Start position** — the anchor point (typically left/bottom) where the grid begins on the WATCHOUT stage.
- **Output/channel assignments** — once the grid is created, each display must be assigned to the correct output or channel on the corresponding display node.

### Create Display Grid

Use **Create Display Grid** to generate multiple displays in one operation.

Typical parameters:

- **Columns / Rows**
- **Display Resolution**
- **Horizontal / Vertical spacing**
- **Start position** (left/bottom anchor)

### Arrange Existing Displays as Grid

Use **Arrange as Grid** when displays already exist but need structured alignment.

This is useful after importing or manual creation where displays are slightly misaligned.

The arrange tools support different ordering strategies:

- **Closest first**
- **Row order**
- **Column order**

### Arrange Selected Cues as Grid

The Stage also provides **Arrange as Grid** for selected cues. This is useful when you want rapid layout structure without changing display geometry.

Typical use:

1. Multi-select cues in Stage.
2. Open **Arrange as Grid**.
3. Set rows/columns, spacing, and strategy.
4. Apply and fine-tune manually if needed.

### Pack Cues Inside a Display

Use **Pack Inside Display** to fit selected cues inside a target display rectangle.

This is useful when:

- You need quick normalization after freehand cue placement.
- You want selected cues constrained to a specific output region.
- You are preparing cue clusters for handoff to another operator.