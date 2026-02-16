# Plan: Expand 3D Mapping Projectors Wiki Page

## File to edit
`wiki/content/03-displays-and-outputs/03-3d-mapping-projectors.md`

## Changes

Replace the entire file content with the following:

```markdown
---
title: "3D Mapping Projectors"
---


## 3D Mapping Projectors

In WATCHOUT, 3D projectors are used to project media content onto real-world three-dimensional surfaces such as buildings, stage sets, sculptures, and other irregular shapes. Unlike standard flat display outputs, 3D projectors allow content to wrap around and conform to the physical geometry of a surface, so that imagery appears correctly aligned and undistorted when viewed in the real environment. This makes them essential for architectural projection mapping, immersive stage design, and any application where projected content must match a non-flat surface.

### What is 3D Mapping?

3D mapping is the process of aligning a projector's output to the contours of a real-world surface so that projected content appears geometrically correct. Because physical surfaces are rarely flat or perfectly perpendicular to the projector, the software must account for the shape of the target surface, the projector's physical position and orientation, and the characteristics of the projector's lens. WATCHOUT models each projector as a virtual camera with a projection frustum. By matching this virtual frustum to the real projector's placement and lens properties, content can be warped and positioned so that it maps accurately onto the physical surface.

### What is Required

To use 3D mapping projectors in WATCHOUT, the following are needed:

- **One or more projectors** added to the WATCHOUT stage, representing the physical projectors in the venue.
- **Accurate projector placement** — the projector's position (**Eye**), the point it is aimed at (**Target**), and its **Roll** must reflect the real-world setup.
- **Lens parameters** — **Lens shift** (horizontal and vertical) and **Width/Distance ratio** must be set to match the physical projector's lens characteristics.
- **Calibration points** — a set of virtual points in the software matched to corresponding reality points on the physical surface. This calibration step is what enables WATCHOUT to compute the correct projection mapping.
- **3D calibration** — the mapping itself is accomplished through WATCHOUT's 3D calibration workflow, where virtual-to-reality point correspondences are established and refined. See [3D Calibration](#3d-calibration) below.

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

### 3D Calibration

3D mapping in WATCHOUT is achieved through 3D calibration. Calibration establishes the correspondence between virtual points (defined in the software's coordinate space) and reality points (physical locations on the target surface). By providing a sufficient number of these point pairs, WATCHOUT can compute the precise transformation needed to warp the projected image so that it aligns with the real-world geometry.

For reality-point adjustment workflows, provide enough calibration points first. For a complete guide to calibration workflows, including NDI streams, EDID management, and external calibration integration, see [Display Calibration](12-display-calibration.md).

:::warning
Projector calibration in 2D reality mode requires at least six virtual points before editing reality points.
:::

### Operational Notes

- Projector mode is not available while viewing a composition-only stage context.
- Keep calibration and geometry edits versioned like any other critical show state.
```

## Summary of changes

1. **Expanded intro paragraph** — explains that 3D projectors are used to project content onto real-world 3D surfaces (buildings, stage sets, sculptures), conforming imagery to physical geometry.

2. **New "What is 3D Mapping?" section** — explains that 3D mapping aligns projector output to surface contours using a virtual camera/frustum model that matches the real projector's position and lens.

3. **New "What is Required" section** — lists prerequisites: projectors on stage, accurate placement (Eye/Target/Roll), lens parameters, calibration points, and 3D calibration.

4. **Renamed and expanded "Calibration Requirements" → "3D Calibration"** — explains that 3D mapping is accomplished through 3D calibration, which establishes virtual-to-reality point correspondences so WATCHOUT can compute the correct projection warp.

5. **All existing content preserved** — Adding a Projector, Core Projector Parameters, Projector Camera Mode, and Operational Notes sections remain intact.
