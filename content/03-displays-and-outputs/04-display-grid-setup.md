---
title: "Display Grid Setup"
---


## Display Grid Setup

Grid tools speed up setup for LED walls, tiled monitors, and repeated projection arrays.

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

### Recommended Workflow

1. Create or arrange the grid.
2. Frame all displays and verify orientation.
3. Rename displays logically by row/column.
4. Apply output/channel assignments.
5. Add test content spanning the full grid.

### Grid Strategy Tips

- For LED processors, match processor canvas dimensions exactly.
- Keep spacing at zero unless you intentionally model physical gaps.
- Use separate stage tiers for alternate grid states (rehearsal vs show variants).
