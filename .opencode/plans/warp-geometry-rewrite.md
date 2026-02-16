# Plan: Rewrite Warp Geometry as In-Depth Article

## File to edit
`wiki/content/03-displays-and-outputs/07-warp-geometry.md`

## Changes

Replace the entire file content with the following:

```markdown
---
title: "Warp Geometry"
---

## Warp Geometry

Warp geometry is WATCHOUT's system for correcting the shape of rendered output so that it aligns with the physical surface it is projected or displayed on. In any real-world installation, the target surface is rarely a perfect rectangle oriented exactly perpendicular to the projector or display. Screens may be curved, projectors may be mounted at an angle, LED panels may follow an arc, or scenic elements may present irregular shapes. Warp geometry compensates for all of these by repositioning pixels across the entire display output, bending and stretching the rendered image so that it appears correct on the actual surface.

Every display in WATCHOUT — GPU, SDI, NDI, or Virtual — supports its own independent warp mesh. Warp is applied as a post-rendering transformation: content is first composited flat, then the warp mesh remaps every pixel to its corrected position on the output.

[[WIDGET:warp-geometry]]

### When Warp Geometry is Needed

Warp geometry is used whenever the real projection surface or display alignment is not a perfect rectangle. Common scenarios include:

- **Curved screens and LED walls** — surfaces that follow an arc or compound curve require pixel repositioning so that straight lines in the content remain visually straight on the surface.
- **Imperfect projector mounting** — when a projector cannot be aimed perfectly perpendicular to the screen, the projected image is trapezoidal or skewed. Warp corrects this without requiring physical re-mounting.
- **Non-rectangular targets** — scenic facades, architectural surfaces, and stage set pieces that do not have standard rectangular proportions.
- **Multi-projector blends** — in edge-blended setups, warp ensures that adjacent projectors align precisely at their overlap boundaries so that the combined image appears seamless.
- **Domes and immersive surfaces** — environments where content must wrap around the viewer require significant pixel remapping to maintain correct geometry.
- **Transport and re-rigging** — after a show moves between venues or projectors are re-positioned, warp corrections can be updated to match the new physical alignment without re-authoring content.

The normal workflow is to do as much mechanical alignment as possible first, then use warp geometry to correct the remaining discrepancies.

### How Warp Geometry Works

Warp geometry is mesh-based. The warp mesh is a grid of **junction points** that defines how pixels are repositioned across the display output. Each junction point has a source position (where the pixel comes from in the rendered content) and a destination position (where it should appear on the display surface). Between junction points, the mesh interpolates smoothly using Bézier curves, producing continuous, artifact-free distortion.

When the warp mesh is in its default state, every junction sits at its neutral position and no correction is applied — pixels pass through unchanged. When you move junction points away from their neutral positions, the mesh stretches, compresses, or curves the image in that region to match the physical surface.

The density of the mesh — how many rows and columns of junction points it contains — determines how much local control you have. A coarse mesh (2×2, four corners) provides global perspective correction. A finer mesh (3×3 or larger) allows localized adjustments for curved or irregular surfaces.

### Warp Mesh Presets

WATCHOUT provides four built-in presets that initialize the warp mesh with a specific grid density:

| Preset | Grid Size | Typical Use |
|---|---|---|
| **2×2** | 2 rows × 2 columns (4 corner points) | Basic corner adjustment, simple keystoning, flat surfaces with minor alignment errors |
| **Horizontal** | 2 rows × 3 columns (6 points) | Surfaces that need more horizontal control, such as wide-format screens with lateral curvature |
| **Vertical** | 3 rows × 2 columns (6 points) | Surfaces that need more vertical control, such as tall screens or projectors with vertical offset |
| **3×3** | 3 rows × 3 columns (9 points) | General-purpose mesh for curved surfaces, providing both edge and center control |

Loading a preset replaces the current warp mesh. After loading, you can add additional rows and columns by clicking on mesh edges to insert new junction points wherever finer control is needed.

### Editing Junction Points

Each junction point on the warp mesh has the following properties:

- **Position (X / Y pixel offset)** — the offset of the junction from its neutral (uncorrected) position. Moving a junction shifts all pixels in that region of the mesh accordingly.
- **Bézier handles** — each junction can have up to four directional handles: **Left**, **Right**, **Up**, and **Down**. These control the curvature of the mesh edges passing through that point. Each handle has two parameters:
  - **Length** — how far the handle extends from the junction, controlling the extent of the curve's influence.
  - **Angle** — the direction of the handle in degrees, controlling the curve's trajectory.
- **Smooth toggle** — when enabled, forces the handles at a junction to maintain tangent continuity (G¹ continuity), creating smooth, kink-free curves through the point. Disable this when you need a sharp corner or abrupt direction change. Corner points (at the four corners of the mesh) do not have a smooth toggle.

You can select junction points in the Stage view and adjust their properties in the Properties panel, or drag them directly on stage. To navigate between junctions, use the arrow keys to move selection to the next point in the corresponding direction. To add a new junction point, hold **Ctrl** and click on a mesh edge — a new point is inserted at that position, splitting the adjacent curves while preserving the overall shape.

### Advanced Settings

The warp editor exposes two advanced options under the **Advanced** section:

- **Perspective Correction** — when enabled, the warp mesh applies a perspective-correct interpolation rather than simple bilinear interpolation. This produces more accurate results when the warp involves significant perspective changes (such as correcting for a steeply angled projector), preventing the texture swimming artifacts that bilinear interpolation can produce in those cases.
- **Corner Shapes** — when enabled, allows Bézier handles to be edited on corner junction points (the four corners of the mesh). By default, corner points do not expose handles. Enabling this option gives you curve control at the corners, which is useful when the physical surface has rounded or irregular corners.

### Show-Level Warp Defaults

The **Show Properties → Warp** section provides two defaults that apply whenever new warp points are created in any display:

- **New Warp Handles Should Have Fixed Length** — when enabled, newly created warp control handles start with a fixed pixel length that you specify, rather than being free-form. This helps maintain consistency across warp meshes in a multi-display setup.
- **New Warp Points Should be Smooth** — when enabled, new warp junction points are created with smooth (G¹ continuous) tangent handles by default.

These defaults affect only newly created points. Existing points retain their current settings.

### Accessing the Warp Editor

There are several ways to open the warp editor for a display:

- **Device Properties → Warp section:** Toggle **Enabled** to activate warp on the selected display, then click **Edit** to enter the warp editing mode in the Stage view.
- **Stage context menu:** Right-click a display and choose **Edit Warp**.
- **Nodes window context menu:** Right-click a display node and choose **Edit Warp**.

When the warp editor is active, the Stage view shows the warp mesh overlaid on the display output. You can toggle **Show on Display** to render the warp mesh grid on the actual display output, which is useful when working with test patterns to see the mesh relative to the projected image.

### Keyboard Shortcuts

The following shortcuts are available when editing warp geometry:

| Shortcut | Action |
|---|---|
| **Arrow keys** (Up / Down / Left / Right) | Select the next warp junction point in the corresponding direction |
| **Ctrl + Left Click** (on a mesh edge) | Add a new warp junction point at the clicked position |

### Position in the Rendering Pipeline

Warp geometry occupies a specific position in WATCHOUT's rendering pipeline, and understanding this order is important when combining it with other correction tools:

1. **Corner pinning** (per-cue effect) — applied first, during individual cue rendering. This is a creative or per-content adjustment, not a display-level correction. See [Corner Pinning](../06-effects-and-tweens/10-corner-pinning.md).
2. **Compositing** — all cues are composited into the display's output buffer.
3. **Warp geometry** — the warp mesh transforms the entire composited output, repositioning pixels to match the physical surface.
4. **Display masks** — applied after warp, controlling which pixels are visible and shaping edges and blend zones. Mask coordinates correspond to the final (post-warp) display surface. See [Display Masks](08-display-masks.md).

This means corner pinning and warp geometry complement each other without conflict: use corner pinning for cue-specific adjustments (fitting individual content to specific surfaces) and warp for global projector/display alignment.

### Relationship to Edge Blending and Masks

Warp geometry works alongside [Edge Blending](06-edge-blending.md) and [Display Masks](08-display-masks.md) to produce the final output:

- **Warp** corrects surface geometry — making the image fit the physical shape.
- **Masks** shape the visible boundary — hiding spill, defining blend zones, and cutting output to scenic limits.
- **Edge blending** (automatic soft edges) feathers brightness in overlap regions between adjacent displays.

As a general rule: get the warp geometry correct first, then apply masks and edge blending on top of the corrected output. Since masks are applied after warp, their coordinates always refer to the final display surface rather than the pre-warp content space.

For a complete guide to mask editing, built-in mask types, mask images, gamma correction, and automatic soft edges, see [Display Masks](08-display-masks.md).

### Recommended Workflow

1. **Complete physical alignment first.** Mount and aim projectors or position displays as accurately as possible mechanically. The less correction warp has to do, the better the image quality.
2. **Choose a warp preset.** Load a 2×2 mesh for simple keystoning, or a 3×3 mesh for curved surfaces. Add rows or columns if finer control is needed.
3. **Apply coarse corrections.** Move corner and edge junctions to roughly align the projected image with the physical surface. Work from large corrections to small.
4. **Refine with curve handles.** Adjust Bézier handles to smooth out curves between junction points. Enable Perspective Correction if the projector angle is steep.
5. **Check edge continuity.** For multi-projector setups, verify that adjacent warp meshes produce continuous straight lines across the boundary. Fine-tune junction points at the edges of neighboring displays.
6. **Add masks.** Apply masks for spill cutoffs, scenic limits, and blend zones. See [Display Masks](08-display-masks.md).
7. **Re-check with representative content.** Play back actual show media at final brightness to verify that the corrections hold under real conditions.

### Quality Control

Validate warp geometry using:

- **Grid test patterns** — reveal mesh distortion by showing evenly spaced lines across the entire display. Misalignment appears as bent or unevenly spaced grid lines.
- **Straight-line graphics** — horizontal and vertical lines that span the full output are particularly sensitive to warp errors, especially at mesh boundaries and junction transitions.
- **Real show media at final brightness** — small geometry errors that are invisible with test patterns can become obvious once high-contrast or motion content plays back.

Use the display's **Test Pattern** mode to switch between Pattern (renders through warp and mask pipeline), Masked (shows warp and mask result), and White (bypasses warp and mask for raw output comparison). See [Test Patterns](11-test-patterns.md).

Keep warp and geometry edits versioned like any other critical show state. After transport, re-rigging, or lamp/lens changes, revisit the warp mesh and fine-tune as needed rather than starting from scratch.
```

## Summary of changes

1. **Expanded intro** — explains what warp geometry is, why it exists (correcting output to match imperfect real-world surfaces), and that all display types support it.

2. **New "When Warp Geometry is Needed"** — covers curved screens, imperfect mounting, non-rectangular targets, multi-projector blends, domes, and transport/re-rigging.

3. **New "How Warp Geometry Works"** — explains mesh-based system with junction points, source-to-destination mapping, Bézier interpolation, and mesh density.

4. **New "Warp Mesh Presets"** — documents all four presets (2×2, Horizontal, Vertical, 3×3) with grid sizes and typical use cases.

5. **New "Editing Junction Points"** — documents position (pixel offset X/Y), Bézier handles (Left/Right/Up/Down with length and angle), smooth toggle, corner behavior, keyboard navigation, and Ctrl+Click to add points.

6. **New "Advanced Settings"** — documents Perspective Correction and Corner Shapes options.

7. **New "Show-Level Warp Defaults"** — documents fixed handle length and smooth points settings from Show Properties.

8. **New "Accessing the Warp Editor"** — documents Device Properties, Stage context menu, Nodes window context menu, and show-on-display toggle.

9. **New "Keyboard Shortcuts"** — documents arrow key navigation and Ctrl+Click point insertion.

10. **New "Position in the Rendering Pipeline"** — documents the full pipeline order: corner pinning → compositing → warp → masks, with cross-references.

11. **New "Relationship to Edge Blending and Masks"** — explains how warp, masks, and edge blending work together, with links to related pages.

12. **Enhanced "Recommended Workflow"** — expanded from 5 to 7 detailed steps.

13. **Enhanced "Quality Control"** — expanded with test pattern mode details and versioning advice.

14. **Removed separate "Mask Geometry" section** — replaced with references to the comprehensive Display Masks page, avoiding duplication.
