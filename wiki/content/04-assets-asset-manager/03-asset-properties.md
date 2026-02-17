---
title: "Asset Properties"
---


## Asset Properties

**The Properties panel displays detailed metadata for any selected asset, adapting its layout to show only the fields relevant to that asset's type.** Understanding these properties is essential for diagnosing problems, verifying optimization results, and managing color workflows — especially in HDR or multi-format shows where color space mismatches can cause visible errors.

Select one or more assets in the Assets window to view their properties. Double-click an asset or press **Enter** to focus the Properties panel directly.

### General Information

All assets display the following read-only fields in the Info section:

| Property | Description | Editable? |
|---|---|---|
| **Name** | The display name of the asset. Click to rename. | Yes (unless in error state) |
| **Type** | The asset kind (Video, Image, Audio, SVG, Composition, etc.) | No |
| **UUID** | The unique identifier assigned to the asset — used internally for tracking across the system | No |
| **Original Path** | The source file location from which the asset was imported | No |

### Asset State

Every asset has a state that reflects its position in the processing pipeline. The state determines what operations are available and how the asset appears in the Assets window:

| State | Icon / Indicator | Meaning |
|---|---|---|
| **Uploading** | Upload arrow + progress bar | The source file is being transferred to the Asset Manager. Progress is tracked as `uploaded_bytes / total_bytes`. |
| **Optimizing** | Gears + progress bar | The optimizer is transcoding the asset to its output codec. |
| **Ok** | Normal icon | The asset is fully optimized and ready for playback and distribution. |
| **Importing** | — | The asset is being imported from an external package (see [Import, Export, and Mapping](12-import-export-and-mapping.md)). |
| **Fail** | Red name | Optimization failed. The error message is shown in the Properties panel. |
| **Cancelled** | — | Optimization was cancelled before completion. |

:::warning
Assets in the `Fail` state cannot be used on the timeline or distributed to Runners. The Properties panel shows the specific error message from the optimizer — common causes include unsupported codecs, corrupt source files, and insufficient disk space. Fix the underlying issue and re-add the asset.
:::

### Visual Asset Properties

For image and video assets, the following additional fields appear:

- **Codec** — the optimized codec (if different from the original, both are shown, e.g., "H.264 → HAP"). This tells you exactly what transformation the optimizer performed.
- **Color Space** — the color standard and transfer function. If the input and output differ, both are displayed with an arrow (e.g., "sRGB → Rec. 709"). See the [Color Space Reference](#color-space-reference) section below.
- **Dimensions** — width × height in pixels for 2D assets, or X × Y × Z bounding box for 3D models.
- **Bitrate** — the video bitrate (video assets only).
- **Compression Ratio** — the ratio between uncompressed and compressed file size (video and image assets).

### Video-Specific Properties

- **Frame Rate** — displayed in frames per second. Fractional rates (e.g., 29.97) are shown with two decimal places.
- **Duration** — total playback length, formatted as HH:MM:SS.ms.
- **Progress** — optimization or upload progress percentage (visible only while the asset is being processed).

### Audio-Specific Properties

- **Channels** — the number of audio channels (1 = mono, 2 = stereo, etc.).
- **Sample Rate** — displayed in kHz (e.g., 48 kHz).
- **Duration** — total playback length.

### Display Data Properties

For MPCDI display data assets:

- **Version** — the MPCDI file version.
- **Canvases Size** — the total canvas dimensions.

### Dynamic Asset Properties

When a dynamic (auto-updating) asset is selected, an additional **Active Version** section appears showing:

- The currently active version and its details.
- A version count indicator (e.g., "2 versions").
- Controls for managing and switching between versions.

See [Dynamic Assets](06-dynamic-assets.md) for details on version management.

### SVG Shape Properties

SVG shape assets display a dedicated shape editor instead of the standard property fields. This includes a live preview, geometry controls, fill and stroke colors, and (for text shapes) font and text properties.

See [SVG Shapes](05-svg-shapes.md) for full documentation.

### Color Space Reference

WATCHOUT tracks both the **input** color space (from the source file) and the **output** color space (used during rendering). The Properties panel shows both when they differ. Getting color spaces right is critical for accurate reproduction, especially when mixing SDR and HDR content.

| Color Space | Transfer Function | Typical Use |
|---|---|---|
| **sRGB** | sRGB curve | Standard web and computer graphics content |
| **sRGB (gamma 2.2)** | Pure 2.2 gamma | Legacy content mastered to 2.2 gamma (default) |
| **Rec. 601** | SDR | Standard-definition broadcast content |
| **Rec. 709** | SDR | HD broadcast content; most professional video |
| **Rec. 2020** | SDR | Wide color gamut SDR content |
| **Rec. 2100 HLG** | HLG | HDR content for broadcast (Hybrid Log-Gamma) |
| **Rec. 2100 PQ** | PQ (Perceptual Quantizer) | HDR content for cinema / high-end display |
| **Rec. 2100 PQ (HDR10)** | PQ | HDR10 mastered content |

:::note
If the color space shown in the Properties panel does not match the content's actual mastering, the rendered output will have incorrect brightness or color. For example, an sRGB-mastered image incorrectly tagged as Rec. 2100 PQ will appear washed out. Verify color space metadata with your content provider if visuals look wrong. For a deeper discussion of HDR and color management, see [HDR and Color Management](../03-displays-and-outputs/10-hdr-and-color-management.md).
:::

### Original vs. Optimized Properties

Several properties exist in pairs — an **original** value from the source file and an **optimized** value from the output:

| Property | Original | Optimized |
|---|---|---|
| **Codec** | The source codec (e.g., H.264, ProRes 4444) | The output codec (e.g., HAP, HEVC, NotchLC) |
| **Color** | The source color space + transfer function | The output color space + transfer function |
| **Resolution** | The source pixel dimensions | The optimized pixel dimensions (may differ for scaled or cropped assets) |

When both values differ, the Properties panel displays them as `Original → Optimized` with an arrow. When they match, only one value is shown.

### Storage Footprint

Each asset's storage is tracked in two categories:

- **Exclusive** — bytes stored in the asset's own directory, unique to this asset.
- **Shared** — bytes in the shared chunk store referenced by this asset. Shared chunks use content-addressed storage (Blake3 hashes), so identical data across multiple assets is stored only once.

The total disk consumption of an asset is `exclusive + shared`, but the shared portion may overlap with other assets — deleting one asset does not necessarily free its shared bytes if another asset references the same chunks.

### Error Information

If an asset failed to optimize, the Properties panel displays:

- **Error** — the error message explaining why optimization failed.

Assets in an error state show their name in red in the Assets window and cannot be renamed or used until the issue is resolved.

### Diagnosing Issues with Properties

Use the Properties panel systematically when something looks wrong:

1. **Check the state** — is the asset in `Ok`, `Optimizing`, or `Fail`? If `Fail`, read the error message.
2. **Check the codec** — does the `Original → Optimized` codec pair make sense? An unexpected output codec may indicate a custom mapping in [Asset Manager Settings](11-asset-manager-settings.md).
3. **Check the color space** — does the source color space match what your content provider specified? Mismatched color spaces cause brightness and saturation errors.
4. **Check the dimensions** — do the optimized dimensions match the original? Unexpected changes may indicate a scaling or cropping issue.
5. **Check the duration and FPS** — for video assets, verify these match the source. A wrong frame rate means the asset will play at the wrong speed.

### Best Practices

- **Verify color space on import.** Content from different sources may be tagged with different color spaces. Check every visual asset's color space after import, especially when mixing content from multiple vendors.

- **Use the codec column in the Assets window.** Enable the **Codec** column to see at a glance which output codec each asset is using. This helps catch misconfigurations before they reach the display servers.

- **Check footprint before large shows.** Use the exclusive and shared footprint values to estimate total storage requirements before transferring to Runners. HAP-encoded assets can be 3–10× larger than their source files.

- **Keep UUIDs for scripting.** If you use external control (OSC, HTTP API) to reference assets, note the UUID from the Properties panel. UUIDs are stable across renames and moves.
