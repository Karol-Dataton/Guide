---
title: "Edge Blending"
---


## Edge Blending

Edge blending is the process of seamlessly joining the output of two or more overlapping displays so that the combined image appears as a single continuous surface. In any multi-projector or tiled-display setup where adjacent outputs share a common overlap region, the pixels in that overlap are illuminated by both sources simultaneously. Without correction, the overlap zone appears significantly brighter than the rest of the image — roughly double the brightness — creating an obvious bright band across the seam. Edge blending solves this by gradually fading each display's contribution across the overlap, so the combined light output in the overlap region matches the surrounding single-display areas.

WATCHOUT handles edge blending through its **Automatic Soft Edges** system. Rather than requiring you to manually paint blend gradients or create feathered masks by hand, WATCHOUT detects where displays overlap on the Stage, computes the geometry of the overlap region, and generates intensity gradients that feather each display's brightness to zero at the point where the other display takes over. The result is a smooth, invisible transition between adjacent outputs.

<img src="../media/edge-blending-diagram.svg" alt="Edge Blending Principle" style="width: 100%; height: auto;">

### When Edge Blending is Needed

Edge blending applies whenever two or more display outputs overlap and you want them to appear as a single unified image. Common scenarios include:

- **Panoramic projection** — two or more projectors placed side by side with overlapping edges to create a wide-format image. This is the most common edge-blending use case in live events, corporate presentations, and permanent installations.
- **Immersive and dome environments** — surround projection where multiple outputs wrap around the viewer, each overlapping its neighbors at the edges.
- **Curved and cylindrical screens** — surfaces that require multiple projectors to cover the full arc, with overlap at each projector boundary.

Edge blending is not needed when displays are tiled without overlap (hard-edged tiling), or when each display shows independent content.

### How Automatic Soft Edges Work

WATCHOUT's automatic soft edges operate in three stages:

**1. Overlap detection.** The system examines all displays on the Stage and identifies pairs that physically overlap. It uses a geometric intersection test based on each display's position, size, and rotation. Only displays that share the same Stage tier and whose bounding regions actually intersect are considered overlapping. Each display receives a list of its overlapping neighbors along with the normalized coordinates of the overlap region.

**2. Gradient computation.** For each overlap pair, the system computes a gradient direction based on the line from one display's center to the other's. It then determines the shape of the overlap region by finding where the edges of the two displays intersect. Within this overlap shape, a linear intensity ramp is calculated: full brightness (1.0) at the far edge of the overlap (where this display alone covers the surface) fading to zero (0.0) at the near edge (where the neighboring display takes over). The system separates this into horizontal and vertical intensity components based on the predominant gradient direction, allowing it to handle both side-by-side and top-to-bottom overlap arrangements.

**3. Rendering.** The computed gradients are rendered into the display's mask texture as part of the output pipeline. Each display's soft-edge gradient is applied using a darken operation — if multiple overlapping displays affect the same region, the darkest (most attenuated) value wins, preventing over-darkening. Gamma correction is applied to the gradient during rendering to control the perceived brightness curve of the fade.

The entire process is automatic: move a display so it overlaps another, enable soft edges on both, and the blend gradients appear and update in real time.

### Soft Edge Controls

Automatic soft edges are controlled per display in the **Mask** section of **Device Properties**:

| Control | Description |
|---|---|
| **Enabled** | Toggles automatic soft-edge generation on or off for the selected display. Both overlapping displays must have soft edges enabled for the blend to work correctly. Default: off. |
| **Gamma Correction** | Adjusts the intensity curve of the soft-edge gradient. Range: **0.5–1.5**, default **1.0**. Lower values produce a more gradual fade; higher values concentrate the transition in a narrower band. Only visible when soft edges are enabled. |

:::note
Automatic soft edges are not available for **projector-type displays** (3D mapping projectors with frustum parameters) or **canvas displays** (MPCDI imports). For these display types, use custom masks to create blend zones manually. See [Display Masks](08-display-masks.md).
:::

To enable soft edges:

1. Select the display in **Stage** or **Devices**.
2. Open **Device Properties → Mask** section.
3. Under **Automatic Soft Edges**, toggle **Enabled** on.
4. Repeat for the adjacent overlapping display.
5. Adjust **Gamma Correction** on each display as needed.

### Gamma Correction for Blends

The gamma correction slider controls how the soft-edge fade curve maps to perceived brightness. A linear intensity ramp (gamma 1.0) does not always look perceptually linear to the human eye, especially on projectors with non-linear light output characteristics. Adjusting gamma reshapes the fade curve to compensate:

- **Gamma below 1.0** — the fade rolls off more gently, spending more of its range in the mid-brightness region. This can help when the overlap zone appears too dark relative to the surrounding image (a common issue with projectors that have high native contrast).
- **Gamma above 1.0** — the fade drops off more aggressively, concentrating the transition in a narrower band. Use this when the overlap zone appears too bright or when the overlap width is generous and you want a tighter blend.

In practice, start with the default (1.0) and adjust in small increments (0.05–0.10) while viewing uniform color test content on the actual display surface. The correct gamma setting depends on the specific projector model, ambient light, and overlap width — there is no universally correct value.

:::warning
The soft-edge gamma and the per-surface gamma on custom masks are independent controls. If you combine automatic soft edges with custom masks on the same display, mismatched gamma values between them can produce visible intensity bands or dark seams in the overlap region. Keep both gamma values aligned unless you have a specific reason to separate them.
:::

### Manual Blend Zones with Custom Masks

Automatic soft edges work well when displays overlap in a regular, rectangular pattern on a flat surface. When the overlap geometry is more complex — non-planar surfaces, uneven overlap widths, displays at different angles, or artistic blend shapes — custom masks give you full manual control over the blend zone.

To create a manual blend zone:

1. Disable automatic soft edges on the display (or use them as a starting point).
2. Open the mask editor (**Device Properties → Mask → Edit**).
3. Add a mask surface using one of the side presets (**Left Mask**, **Right Mask**, **Top Mask**, **Bottom Mask**) to match the overlap edge.
4. Adjust junction points and alpha values to shape the blend gradient to the actual overlap geometry.
5. Set the mask surface gamma to match the neighboring display's blend characteristics.

Custom masks and automatic soft edges can coexist on the same display. The automatic soft edges handle the overall blend gradient while a custom mask surface can refine specific regions — for example, cutting an irregular scenic boundary while the soft edge manages the projector-to-projector transition.

For a complete guide to mask editing, built-in mask types, mask images, and junction point controls, see [Display Masks](08-display-masks.md).

### Position in the Rendering Pipeline

Edge blending occupies a specific position in WATCHOUT's rendering pipeline. Understanding this order is important when combining soft edges with warp geometry and masks:

1. **Compositing** — all cues are composited into the display's output buffer.
2. **Warp geometry** — the warp mesh transforms the composited output to match the physical surface. See [Warp Geometry](07-warp-geometry.md).
3. **Soft edges and masks** — automatic soft-edge gradients and custom mask surfaces are rendered into a shared mask texture, then multiplied together and applied to the warped output. Soft edges and custom masks are independent layers within this stage — they do not interfere with each other's geometry, but their combined effect determines the final pixel visibility and brightness.
4. **Final output** — the masked, warped, blended image is sent to the physical display.

Because soft edges are applied after warp, they operate on the already-corrected display surface. This means you should finalize warp geometry before fine-tuning blend settings — changes to the warp mesh will shift the overlap region and may require soft-edge or gamma readjustment.

### Recommended Workflow

1. **Complete physical alignment first.** Mount and aim projectors as accurately as possible. Ensure overlap regions are consistent in width across the full height (or width) of the shared edge. Uneven overlap makes blending harder.
2. **Set display positions on Stage.** Place displays in the Stage view so their positions and sizes match the physical arrangement, including the overlap. Accurate Stage placement is what drives the overlap detection.
3. **Apply warp geometry.** Correct for projector angle, surface curvature, and alignment errors. Get the geometry right before blending. See [Warp Geometry](07-warp-geometry.md).
4. **Enable automatic soft edges.** Turn on soft edges on all overlapping displays. The blend gradients should appear immediately in the overlap zones.
5. **Adjust gamma.** View a uniform mid-brightness color field (50% gray or similar) across the blend zone and adjust the gamma slider until the overlap region matches the surrounding brightness. Adjust each display's gamma independently if the projectors have different characteristics.
6. **Refine with custom masks if needed.** If automatic soft edges do not cover the overlap correctly (irregular surfaces, scenic cutouts), add custom mask surfaces to shape the blend zone.
7. **Validate with test content.** Check the blend with a variety of content — uniform colors, gradients, high-contrast graphics, and real show media. Issues that are invisible with test patterns can appear with specific content types.
8. **Lock and document.** Once the blend is correct, save the show state. Treat blend settings as critical calibration data that should be preserved across show revisions.

### Quality Control

Validate edge blending using the following methods:

- **Uniform color fields** — display a single solid color (white, 50% gray, red, green, blue) across all blended outputs. The overlap region should be indistinguishable from the surrounding areas. Gray is particularly revealing because the eye is most sensitive to brightness variation at mid-tones.
- **Grayscale ramps** — a smooth gradient from black to white running perpendicular to the blend edge will reveal any intensity discontinuities in the blend zone.
- **Crossfade content** — slowly crossfade between two full-screen images. Blend errors that are masked by static content can become visible during transitions.
- **High-contrast graphics** — bold lines, text, and geometric shapes that cross the blend boundary should appear continuous without doubling, darkening, or color shifts.
- **Real show media at final brightness** — always validate with actual show content as the final check. Subtle gamma or color mismatches may only appear with specific content characteristics.

Use the display's **Test Pattern** mode to assist validation. The **Pattern** mode renders through the full warp and mask pipeline (including soft edges), while **White** bypasses them for comparison. See [Test Patterns](11-test-patterns.md).

:::tip
Blend calibration is most reliable in a controlled lighting environment with stable projector warm-up. Projectors shift in brightness and color temperature during the first 15–30 minutes of operation. Allow full warm-up before making final gamma adjustments.
:::

### Common Issues

| Symptom | Likely Cause | Fix |
|---|---|---|
| Bright band in the overlap zone | Soft edges not enabled on one or both displays | Enable soft edges on all overlapping displays |
| Dark band or dip in the overlap zone | Gamma too high — the fade drops off too aggressively | Lower the gamma correction value toward 0.5 |
| Overlap zone brighter than surroundings but softer than full double-brightness | Gamma too low — the fade is too gradual | Raise the gamma correction value toward 1.5 |
| Visible color shift in the overlap | Projectors have different color temperatures or lamp aging | Use the per-display **White Point** controls to match color temperature across outputs |
| Blend looks correct on test patterns but wrong on show content | Non-linear projector response or content with extreme contrast | Verify gamma with representative content, not just uniform fields |
| Soft edges option is grayed out / unavailable | Display is a projector-type (3D mapping) or canvas/MPCDI display | Use custom masks instead; automatic soft edges are not supported on these display types |
| Blend shifts after warp adjustment | Warp changes the overlap geometry, requiring re-evaluation of soft edges | Re-check soft edge gamma after any warp mesh changes |
| Edge shimmer or flickering in the blend zone | Sub-pixel misalignment between overlapping displays, or projector vibration | Verify physical stability; fine-tune warp junction points at the overlap boundary |
| Inconsistent blend quality across the edge | Overlap width varies — wider at one end than the other | Improve physical alignment to make overlap width uniform, or use custom masks for variable-width blends |

### Relationship to Warp Geometry and Masks

Edge blending, warp geometry, and display masks are three complementary systems that work together to produce final output:

- **Warp geometry** corrects the image shape — making pixels land in the right place on the physical surface. Warp must be correct before blending can work, because the blend zone is defined by the overlap of the corrected display surfaces.
- **Edge blending** (automatic soft edges) manages brightness in the overlap — fading each display's contribution so the combined output appears uniform.
- **Display masks** shape the visible boundary — hiding spill, defining scenic cutouts, and providing manual blend control when automatic soft edges are insufficient.

The recommended order is always: **warp first, then blend, then masks**. Each layer builds on the one before it. Warp defines the surface geometry, blending manages the overlap brightness, and masks handle everything else — spill cutoffs, scenic shaping, and fine-tuning of blend zones.

For complete coverage of these related systems, see [Warp Geometry](07-warp-geometry.md) and [Display Masks](08-display-masks.md).
