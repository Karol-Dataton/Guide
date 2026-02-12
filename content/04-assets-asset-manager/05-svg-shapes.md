---
title: "SVG Shapes"
---


## SVG Shapes

WATCHOUT 7 includes a built-in SVG shape editor that lets you create vector-based assets — rectangles, ellipses, and text — directly within the application. These shapes are stored as SVG data and rendered to pixels at a configurable resolution, so they remain crisp at any size.

### Why Use Shapes?

Shapes are useful for:

- **Title cards and labels** — create text overlays without leaving WATCHOUT.
- **Solid backgrounds** — colored rectangles to place behind content or fill gaps.
- **Geometric overlays** — circles, rectangles, and stroked outlines for visual accents.
- **Dynamic text** — text content that can be changed during a show (when combined with expressions).

Because shapes are generated internally, there is no need to round-trip through an external graphics editor for simple visual elements.

### Creating a Shape

1. Right-click in the Assets window.
2. Choose **New** and select one of:
   - **New Rectangle Shape**
   - **New Ellipse Shape**
   - **New Text Shape**
3. Enter a name for the shape asset and click **OK**.

<!-- screenshot: New Shape dialog showing name field and OK/Cancel buttons -->

The new shape asset appears in the Assets window with a default white fill and a canvas size of 1920 × 1080 pixels. You can also create shapes inside folders — if a folder is selected when you create the shape, it is placed in that folder.

:::info
**Note:** Shapes cannot be created inside composition folders or non-visual dynamic asset folders.
:::

### Shape Properties Panel

Select a shape asset to view its dedicated properties panel. Unlike other asset types, shapes display an interactive editor rather than the standard property fields.

<!-- screenshot: Shape Properties panel showing preview, base size, geometry, and color sections -->

#### Preview

The top section shows a **live preview** of the shape on a checkerboard background (indicating transparency). The preview updates in real time as you modify properties. When multiple shapes are selected with different values, the preview displays a "Multiple values" message.

#### Base Size

The **Base Size** section controls the canvas dimensions:

- **Width** and **Height** — the SVG canvas size in pixels. Must be positive integers.
- The total pixel area must not exceed approximately 16K (3840 × 2160 × 8 pixels). This prevents creation of shapes that would consume excessive GPU memory.

For text shapes, a **Crop to Fit** button appears that automatically adjusts the canvas size to tightly fit the rendered text.

#### Geometry

The **Geometry** section lets you switch between shape types and set visual properties:

- **Kind** — toggle between **Ellipse**, **Rectangle**, and **Text**. Switching the kind preserves the canvas size and colors, but resets type-specific properties.
- **Fill** — the fill color, including alpha (transparency). Click to open a color picker with a spectrum view.
- **Stroke** — the stroke (outline) color, also with alpha support.
- **Stroke Width** — the thickness of the stroke in pixels. Set to 0 for no stroke.

Both fill and stroke show a reset button when their value differs from the original, allowing you to quickly revert individual properties.

#### Text Properties

When the geometry kind is set to **Text**, an additional section appears:

- **Text** — a multiline text field for the content to render.
- **Alignment** — left, center, or right alignment buttons.
- **Line Height** — the spacing multiplier between lines (e.g. 1.0 = normal, 1.5 = 150%).
- **Font Size** — the size of the text in pixels.
- **Fit Text** — a button that automatically calculates the largest font size that fits the current canvas dimensions.
- **Font** — a dropdown listing all available font assets in the show. Each option shows a thumbnail preview of the typeface.

<!-- screenshot: Text shape properties showing text field, alignment buttons, font size, and font dropdown -->

:::info
**Tip:** To use a custom font, first add the font file as an asset in the Assets window. It will then appear in the font dropdown.
:::

#### Applying Changes

Shape property changes are **not** applied automatically. After making edits, click the **Apply Changes** button at the bottom of the properties panel to commit the new shape data. This regenerates the SVG and updates all cues referencing the shape.

### SVG Render Resolution

When an SVG shape is placed on the timeline as a cue, you can override its render resolution on a per-cue basis. This is configured in the cue's properties:

- **Width** and **Height** — the rasterization resolution. By default, this matches the shape's base size.
- **Lock Aspect Ratio** — keeps the width-to-height ratio constant when adjusting one dimension.
- **Reset** — reverts the render resolution to the shape's base size.

Increasing the render resolution produces sharper output when the cue is scaled up on stage, at the cost of more GPU memory.

### Importing External SVGs

In addition to creating shapes internally, you can import `.svg` files as assets by dragging them into the Assets window. Imported SVGs are treated as SVG-type assets and can be placed on the timeline like any other media.

If an imported SVG references fonts, you may need to add matching font assets to the show and map them in the font selector.

### Using Shapes on the Timeline

Shape assets work like any other visual asset:

1. Drag the shape from the Assets window onto a timeline layer.
2. A media cue is created with the shape as its source.
3. Apply position, scale, opacity, and other tweens as usual.
4. If the shape content changes (e.g. text is updated), all cues referencing it are updated the next time the shape is applied.
