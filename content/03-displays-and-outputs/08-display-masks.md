---
title: "Display Masks"
---


## Display Masks

Display masks control which pixels on a display are visible and how their edges are shaped. Unlike warp geometry, which repositions pixels to correct for surface distortion, masks operate as alpha-based overlays that hide or reveal regions of the rendered output. Masks are applied *after* the warp stage in the rendering pipeline, meaning they work on already-corrected imagery.

Every display in WATCHOUT can have an independent set of mask surfaces. Masks are especially useful in projection environments where light spills beyond the intended surface, or where scenic elements require non-rectangular output boundaries.

### Accessing the Mask Editor

There are two ways to enable and edit masks on a display:

- **Device Properties → Mask section:** Toggle **Enabled** to activate the custom mask for the selected display, then click **Edit** to open the mask editor in the Stage view.
- **Stage context menu:** Right-click a display and choose **Edit Display Mask** to enter mask editing mode directly.

When the mask editor is active, the Stage view switches to a specialized editing mode where you can manipulate mask junction points, add or remove mask surfaces, and preview the result in real time.

### Mask Surfaces

A single display can contain multiple mask surfaces, each acting as an independent layer. Every mask surface has its own:

- **Name** — a label to identify the surface (e.g., "Left Spill Cut" or "Scenic Border")
- **Junction grid** — the mesh of control points that defines the shape
- **Gamma correction** — a per-surface gamma value that controls the intensity curve of the feathered edge
- **Enabled toggle** — individual surfaces can be enabled or disabled without deleting them

Multiple mask surfaces on the same display are composited together. This means you can combine, for example, a side-edge mask with an irregular scenic cutout mask on a single output.

### Built-in Mask Types

WATCHOUT provides several preset mask shapes that serve as starting points. These create a properly structured junction grid that you can then refine:

- **Left Mask** — hides the left edge of the display with a feathered transition toward the center. Useful for blending overlap regions where a neighboring projector covers the left side.
- **Right Mask** — the mirror of the left mask, hiding the right edge.
- **Top Mask** — hides the top edge with a downward feather.
- **Bottom Mask** — hides the bottom edge with an upward feather.
- **Rectangular Mask** — creates a rectangular cutout centered on the display, with feathered edges on all four sides. This is useful for framing output within a scenic opening or masking a border region.
- **Round Mask** — creates an elliptical mask centered on the display. The oval shape is built from a grid of junction points with Bézier handles that approximate a smooth curve. Ideal for circular screens, gobos, or spotlight-shaped output regions.

Each preset configures an opaque region (where content is hidden), a feathered transition region, and a fully visible region. After creation, all points can be freely repositioned and the feathered edges adjusted.

### Editing Mask Points

Mask geometry is defined by a grid of **junction points**. Each junction has the following properties:

- **Position (X / Y)** — the location of the point in normalized display coordinates, where (0, 0) is the lower-left corner and (1, 1) is the upper-right corner of the display.
- **Alpha value** — a number between 0 and 1 that controls the opacity at that point. A value of 0 means the content is fully visible (the mask is transparent), while a value of 1 means the content is fully hidden (the mask is opaque). The renderer interpolates alpha values smoothly across the mesh between junction points.
- **Bézier handles** — each junction can have up to four directional handles (Left, Right, Up, Down) that control the curvature of the mesh edges passing through that point. By adjusting handle length and angle, you can create smooth curves instead of straight-line segments between junctions.
- **Smooth toggle** — when enabled, forces the handles at a junction to maintain tangent continuity (G¹ continuity), so curves flowing through the point form a smooth, kink-free transition. Disable this when you need a sharp corner or abrupt direction change at a junction.

The mask mesh requires a minimum of two rows and two columns of junction points. You can add rows and columns by clicking on an edge between two existing junctions — the editor inserts a new junction at that position, splitting the adjacent Bézier curves while preserving the overall shape. Rows and columns can also be removed, as long as at least two remain in each dimension.

### Mask Images

In addition to geometric masks, you can assign an **image asset** as a mask source on a display. This is useful when you have a pre-rendered mask texture — for example, an alpha map exported from a 3D modeling tool or a camera-captured calibration image.

To assign a mask image, select the display and set the mask image property to the desired asset. To remove it, clear the asset reference. Mask images and geometric masks can coexist; the image acts as an additional masking layer.

### Gamma Correction

Each mask surface has a **gamma correction** parameter that adjusts how the feathered transition between visible and hidden regions is rendered. The default value approximates a perceptually linear fade, but depending on the display technology and viewing environment, you may need to adjust it:

- **Lower gamma values** (below the default) produce a softer, more gradual fade that may look more natural on projectors with higher native contrast.
- **Higher gamma values** produce a faster rolloff, concentrating the transition in a narrower band.

Gamma correction is particularly important when masks are used in combination with edge blending. Mismatched gamma between the mask feather and the soft-edge blend can produce visible intensity bands or dark seams in the overlap region.

### Automatic Soft Edges

In addition to custom masks, WATCHOUT offers an **Automatic Soft Edges** feature found in the Mask section of Device Properties. When enabled, the system automatically generates soft-edge gradients wherever overlapping displays are detected. This is a quick way to set up basic blend zones without manual mask editing.

Automatic soft edges have their own **Gamma Correction** slider (range 0.5–1.5, default 1.0) that controls the intensity falloff of the generated blend gradients. This setting is separate from the per-surface gamma of custom masks.

:::note
Automatic soft edges are not available for projector-type displays or canvas displays. Use custom masks for these configurations.
:::

### Common Workflows

**Masking projection spill:** When a projector illuminates an area larger than the intended surface, add a mask to cut the output at the scenic boundary. Start with a rectangular or side mask preset, then adjust junction points to follow the edge of the physical surface.

**Shaping output for scenic elements:** For irregularly shaped screens — curved walls, architectural features, or set pieces — use a combination of junction points with Bézier handles to trace the contour of the surface. The round mask preset is a good starting point for circular or oval elements.

**Custom blend regions with edge blending:** When the automatic soft-edge feature does not produce satisfactory results — for example, on non-planar surfaces or with uneven overlap widths — use custom masks to manually define the blend zone. Place junction points along the overlap boundary and set alpha values to create a graduated transition that matches the neighboring display's mask.

**Multi-layer masking:** Combine multiple mask surfaces on a single display for complex scenarios. For instance, one surface can handle the blend zone on the left edge, while another cuts an irregular scenic border on the right.

### Relationship to Warp Geometry

Warp geometry and display masks are independent systems that serve different purposes in the rendering pipeline:

- **Warp geometry** repositions pixels — it corrects for surface curvature, projector alignment errors, and perspective distortion by shifting where each pixel is drawn.
- **Display masks** control pixel visibility — they determine whether a pixel is shown, hidden, or partially transparent by applying an alpha overlay.

In the rendering chain, warp is applied first, and masks are applied afterward on the already-warped output. This means mask coordinates correspond to the final display surface, not the pre-warp content space.

As a general rule: use warp to make the image fit the surface geometry, and use masks to shape the visible boundary and blend zones after the geometry is correct.
