---
title: "SVG Shapes"
---


## SVG Shapes

**WATCHOUT 7 includes a built-in shape editor that lets you create vector-based assets — rectangles, ellipses, and text — directly within the application.** These shapes are stored as SVG data internally and rasterized to pixels at a configurable resolution before rendering on display servers. This means shapes remain crisp at any target size, but the final output is always a pixel image — the visual renderer does not process vector graphics natively.

### How It Works

Shapes follow a different pipeline than imported media assets. Instead of going through the full optimization process (upload → optimize → distribute), shapes are:

1. **Defined** in the Producer using the shape properties panel (geometry, colors, text).
2. **Stored** as SVG markup within the show data.
3. **Rasterized** to pixels at the configured resolution using an SVG rendering engine (`resvg`/`usvg` with CPU-based `tiny-skia` rasterization).
4. **Distributed** to Runners as standard pixel data, identical to an image asset.

:::warning
**The visual renderer has no native SVG support.** All shapes are rasterized to pixels before being sent to display servers. If you scale a shape cue beyond its render resolution, it will exhibit the same pixelation as any bitmap image. Set the render resolution to match or exceed the final display size.
:::

### Shapes vs. Imported Images

| Aspect | SVG Shape | Imported Image |
|--------|-----------|---------------|
| **Creation** | Built-in editor in WATCHOUT | External graphics application |
| **Storage** | SVG markup in show data | File on disk, managed by Asset Manager |
| **Resolution** | Configurable per-cue; re-rasterized on change | Fixed at source resolution |
| **Alpha support** | Yes (fill and stroke alpha) | Depends on format (PNG, TGA, EXR) |
| **Optimization** | Rasterized directly, no codec transcoding | Goes through full optimization pipeline |
| **Editing** | In-app property panel | Requires external tool and re-import |
| **Use case** | Simple geometric shapes, titles, labels | Complex graphics, photographs, renders |

### Why Use Shapes?

Shapes are useful for:

- **Title cards and labels** — create text overlays without leaving WATCHOUT.
- **Solid backgrounds** — colored rectangles to place behind content or fill gaps.
- **Geometric overlays** — circles, rectangles, and stroked outlines for visual accents.
- **Dynamic text** — text content that can be changed during a show (when combined with expressions).
- **Quick prototyping** — placeholder graphics during show development without needing external tools.

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
**Note:** Shapes cannot be created inside composition folders or non-visual [Dynamic Asset](./06-dynamic-assets.md) folders.
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

| Property | Description |
|----------|-------------|
| **Text** | Multiline text field for the content to render |
| **Alignment** | Left, center, or right alignment buttons |
| **Line Height** | Spacing multiplier between lines (e.g., 1.0 = normal, 1.5 = 150%) |
| **Font Size** | Size of the text in pixels |
| **Fit Text** | Automatically calculates the largest font size that fits the current canvas |
| **Font** | Dropdown listing all available font assets in the show, with thumbnail previews |

<!-- screenshot: Text shape properties showing text field, alignment buttons, font size, and font dropdown -->

:::info
**Tip:** To use a custom font, first add the font file as an asset in the Assets window (see [Asset Types](./02-asset-types.md)). It will then appear in the font dropdown. Font thumbnails are generated using SVG rasterization during optimization.
:::

#### Applying Changes

Shape property changes are **not** applied automatically. After making edits, click the **Apply Changes** button at the bottom of the properties panel to commit the new shape data. This regenerates the SVG and updates all cues referencing the shape.

### SVG Render Resolution

When an SVG shape is placed on the timeline as a cue, you can override its render resolution on a per-cue basis. This is configured in the cue's properties:

- **Width** and **Height** — the rasterization resolution. By default, this matches the shape's base size.
- **Lock Aspect Ratio** — keeps the width-to-height ratio constant when adjusting one dimension.
- **Reset** — reverts the render resolution to the shape's base size.

Increasing the render resolution produces sharper output when the cue is scaled up on stage, at the cost of more GPU memory.

[[WIDGET: interactive-render-resolution — side-by-side comparison showing a text shape at 1080p vs 4K render resolution when scaled to fill a large display]]

### Using Shapes on the Timeline

Shape assets work like any other visual asset:

1. Drag the shape from the Assets window onto a timeline layer.
2. A media cue is created with the shape as its source.
3. Apply position, scale, opacity, and other tweens as usual.
4. If the shape content changes (e.g., text is updated and applied), all cues referencing it are updated.

Shapes can be used as versions in [Dynamic Assets](./06-dynamic-assets.md) — for example, a dynamic text shape whose content changes between shows.

### Best Practices

- **Set render resolution to match display output** — a shape displayed at 4K should have at least a 4K render resolution to avoid pixelation.
- **Use Crop to Fit for text** — avoid oversized canvases that waste GPU memory. The Crop to Fit button sizes the canvas to the text's actual bounds.
- **Keep shapes simple** — for complex graphics with gradients, shadows, or many elements, use an external graphics tool and import as an image instead.
- **Use font assets** — add font files to the show before creating text shapes. System fonts may not be available on all Runners.
- **Apply changes deliberately** — the manual "Apply Changes" step prevents accidental updates to live shows. Review the preview before applying.
- **Mind the pixel area limit** — the maximum area (approximately 66 megapixels) prevents GPU memory exhaustion, but even smaller shapes consume memory proportional to their resolution.

### Limitations

- **No native vector rendering** — shapes are rasterized to pixels. The visual renderer does not process SVG natively. Scaling beyond the render resolution causes pixelation.
- **Simple geometry only** — the editor supports rectangles, ellipses, and text. Complex paths, gradients, filters, and other SVG features are not available.
- **No SVG file import** — `.svg` files cannot be imported as media assets. SVG is not a recognized input format for the optimizer. To use external SVG artwork, rasterize it to PNG or another supported image format in an external tool first.
- **CPU-based rasterization** — shape rendering uses CPU rasterization (`tiny-skia`), not GPU acceleration. Very large shapes at high resolution may take longer to generate.
- **Font dependency** — text shapes require the font to be available as a font asset. Missing fonts will cause rendering issues.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Shape appears pixelated on display | Render resolution is lower than display output size | Increase the render resolution in the cue's properties to match the display |
| Text not rendering correctly | Font asset missing from the show | Add the required font file as an asset; select it in the font dropdown |
| "Multiple values" in preview | Multiple shapes selected with different properties | Select a single shape to see its individual preview |
| Canvas size rejected | Pixel area exceeds the ~66 megapixel limit | Reduce width or height to stay within the limit |
| Changes not visible on timeline | "Apply Changes" not clicked after editing | Click **Apply Changes** in the properties panel to commit edits |
| Imported `.svg` file rejected | SVG is not a supported import format | Rasterize the SVG to PNG, TIFF, or another supported format in an external tool |

### See Also

- [Asset Types](./02-asset-types.md) — overview of all asset types including font assets for text shapes
- [Asset Properties](./03-asset-properties.md) — understanding resolution, color space, and state metadata
- [Formats and Codecs](./04-formats-codecs.md) — supported image formats if you need to import external graphics
- [Dynamic Assets](./06-dynamic-assets.md) — using shapes as versioned content that changes between shows
