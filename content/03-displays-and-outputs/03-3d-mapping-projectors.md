---
title: "3D Mapping Projectors"
---


## 3D Mapping Projectors

Projector displays extend WATCHOUT from flat 2D layouts to spatially mapped output. Projector mode uses camera/frustum parameters and calibration tools to align content to real surfaces.

### Adding a Projector

Use:

- **Stage → Add 3D Projector**
- Network context actions for selected node

You can add at default placement or at a chosen stage/world position.

### Core Projector Parameters

Projector displays expose parameters such as:

- **Eye** (projector position)
- **Target** (look-at point)
- **Roll**
- **Lens shift** (horizontal/vertical)
- **Width/Distance ratio**

These define the projection frustum used for mapping.

### Projector Camera Mode

Switch Stage camera mode to **Projector** for alignment work. WATCHOUT supports calibration workflows with virtual/reality points and continuous/manual calibration behavior.

### Calibration Requirements

For reality-point adjustment workflows, provide enough calibration points first.

:::warning
Projector calibration in 2D reality mode requires at least six virtual points before editing reality points.
:::

### Operational Notes

- Projector mode is not available while viewing a composition-only stage context.
- Keep calibration and geometry edits versioned like any other critical show state.
