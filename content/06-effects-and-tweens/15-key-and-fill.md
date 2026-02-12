---
title: "Key and Fill"
---


## Key and Fill

Key & Fill is a **layer-level** compositing feature that uses the content of one layer (the **key** layer) to generate a transparency mask that is applied to another layer (the **fill** layer). This enables sophisticated compositing effects — such as masking content through animated shapes, text cutouts, or grayscale mattes — without modifying the source media.

Unlike Chroma Key, which operates on a single cue's own pixel colors, Key & Fill uses a separate layer as the mask source. This gives you the flexibility to use any content — video, images, text, or generated graphics — as a transparency mask for other content.

### How It Works

Key & Fill involves two layers working together:

- The **key layer** contains the content that defines the mask. Its visual output (luminance or alpha) is converted into transparency values.
- The **fill layer** contains the content you want to display. The transparency mask from the key layer is applied to it, making portions of the fill layer transparent or opaque based on the key.

The key layer provides the mask signal, and the fill layer is where the mask is consumed. The key layer itself is not rendered to the output — it exists solely to generate the transparency mask.

### Keying Modes

WATCHOUT supports four keying modes that determine how the key layer's content is interpreted as a mask:

- **Luma Key** — uses the luminance (brightness) of the key layer to define transparency. Bright areas of the key make the fill opaque; dark areas make it transparent.
- **Luma Key (Inverted)** — inverts the luminance mask. Dark areas of the key make the fill opaque; bright areas make it transparent.
- **Alpha Key** — uses the alpha channel of the key layer to define transparency. Opaque areas of the key make the fill opaque; transparent areas make it transparent.
- **Alpha Key (Inverted)** — inverts the alpha mask, reversing which areas are opaque and transparent.

:::tip
Luma Key is the most versatile mode because any content — including video without an alpha channel — can serve as a mask based on its brightness values. Alpha Key is useful when working with content that has a pre-defined transparency channel, such as PNG images or ProRes 4444 video.
:::

### Configuring Key & Fill

Key & Fill is configured in two places — once on the key layer and once on the fill layer:

**On the key layer (providing the mask):**

1. Select a layer in the Timeline.
2. In the **Layer Properties**, enable the **Key & Fill** option for this layer.
3. Select the **keying mode** (Luma, Luma Inverted, Alpha, or Alpha Inverted).

Once a layer is designated as a key source, a visual indicator appears on the layer header in the Timeline showing its keying role (e.g., "This layer is used as Luma Key").

**On the fill layer (receiving the mask):**

1. Select the cue(s) on the fill layer.
2. In the cue's **Properties** panel, locate the **Key & Fill** section.
3. Toggle **Enabled** on.
4. The fill cue will receive the mask from the key layer.

### Invert Toggle

The fill-side **Invert** toggle provides an additional way to flip the mask behavior at the cue level. This is independent of the key mode selection and allows you to invert the mask on specific fill cues without changing the key layer's mode.

### Visualize Key

The **Visualize Key** toggle on the fill cue switches the output to a diagnostic view that displays the generated mask directly:

- **White areas** represent opaque regions of the fill.
- **Black areas** represent transparent regions.
- **Gray areas** represent partially transparent regions.

This is useful for verifying that the key layer is producing the expected mask shape before viewing the final composited result. Disable Visualize Key to return to normal output.

### Layer Indicators

When a layer is configured as a key source, WATCHOUT displays a tooltip indicator on the layer header in the Timeline. The indicator describes the layer's keying role:

- "This layer is used as Alpha Key"
- "This layer is used as Luma Key"
- "This layer is used as Inverted Alpha Key"
- "This layer is used as Inverted Luma Key"

These indicators help you quickly identify which layers are participating in Key & Fill relationships without opening the properties panel.

### Use Cases

- **Dynamic text reveals** — place text or animated typography on the key layer and video content on the fill layer. The text shape cuts through the video, revealing it only where the text appears.
- **Shaped content windows** — use a grayscale matte (a white shape on a black background) as the key to display fill content only within the shape boundary.
- **Graphic overlays with custom transparency** — use a pre-rendered alpha matte video as the key to create complex, animated transparency patterns on the fill layer.
- **Creative transitions** — animate the key layer content (e.g., an expanding circle or a moving gradient) to progressively reveal or hide the fill layer over time.

### Relationship to Chroma Key

Key & Fill and Chroma Key are complementary but distinct features:

- **Chroma Key** operates **per-cue** on the cue's own pixel colors, removing a specific color (typically green or blue) to create transparency.
- **Key & Fill** operates at the **layer level**, using a completely separate layer's content as the transparency source.

You can use both features simultaneously — for example, chroma-keying a green screen subject on the fill layer while also applying a Key & Fill mask from a matte on the key layer.
