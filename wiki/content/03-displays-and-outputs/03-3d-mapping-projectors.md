---
badge: Jacquie
badge: JME
badge: Karol
---

## 3D Mapping Projectors

**3D projectors** are used to project media content onto real-world three-dimensional surfaces such as buildings, stage sets, sculptures, and other irregular shapes. Unlike standard flat display outputs, 3D projectors allow content to wrap around and conform to the physical geometry of a surface, so that imagery appears correctly aligned and undistorted when viewed in the real environment. This makes them essential for architectural projection mapping, immersive stage design, and any application where projected content must match a non-flat surface.

### What is 3D Mapping?

3D mapping is the process of aligning a projector's output to the contours of a real-world surface so that projected content appears geometrically correct. Because physical surfaces are rarely flat or perfectly perpendicular to the projector, the software must account for the shape of the target surface, the projector's physical position and orientation, and the characteristics of the projector's lens. WATCHOUT models each projector as a virtual camera with a projection frustum. By matching this virtual frustum to the real projector's placement and lens properties, content can be warped and positioned so that it maps accurately onto the physical surface.

### What is Required

To use 3D mapping projectors in WATCHOUT, the following are needed:

- **One or more projectors** added to the WATCHOUT stage, representing the physical projectors in the venue.
- **Accurate projector placement** — the projector's position (**Eye**), the point it is aimed at (**Target**), and its **Roll** must reflect the real-world setup.
- **Lens parameters** — **Lens shift** (horizontal and vertical) and **Width/Distance ratio** must be set to match the physical projector's lens characteristics.
- **Calibration points** — a set of virtual points in the software matched to corresponding reality points on the physical surface. This calibration step is what enables WATCHOUT to compute the correct projection mapping.
- **3D calibration** — the mapping itself is accomplished through WATCHOUT's 3D calibration workflow, where virtual-to-reality point correspondences are established and refined. See [3D Calibration](#3d-calibration) below.

### Core Projector Parameters

These parameters define the projection frustum — the 3D volume that the projector illuminates. Together they tell WATCHOUT exactly how to warp content so it maps correctly onto the target surface.

- **Eye** (X, Y, Z) — the physical position of the projector in 3D space. This is where the projector is mounted, expressed in stage coordinate units. Moving the Eye changes the projection origin and the angle at which content reaches the surface.

- **Target** (X, Y, Z) — the point on the surface the projector is aimed at. Eye and Target together define the projection axis. Adjusting the Target tilts the projection without moving the projector body.

- **Roll** (degrees) — rotation around the projection axis (the Eye → Target line). A value of 0° means the projector is mounted level. Adjust for portrait orientation (90°) or to correct for a tilted mounting bracket.

- **Horizontal Lens Shift** (%) — offsets the projected image left or right without moving the projector. Expressed as a percentage of image width. Matches the physical lens shift mechanism on professional projectors.

- **Vertical Lens Shift** (%) — offsets the projected image up or down. Commonly used when a projector is ceiling-mounted (shift down) or floor-mounted (shift up) to avoid keystoning.

- **Width/Distance Ratio** (displayed as 1:N) — the throw ratio of the lens. Controls how wide the image is at a given throw distance. Smaller values produce a wider, shorter throw; larger values produce a narrower, longer throw. Enter the value as shown on the projector's specification sheet.

[[WIDGET:projector-frustum]]



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
