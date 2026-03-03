---
title: "Image Sequences"
---


## Image Sequences

**An image sequence is a series of numbered image files — such as `render_0001.png`, `render_0002.png`, `render_0003.png` — that WATCHOUT treats as a single video asset.** Each file represents one frame. The optimizer encodes them into a standard optimized video, so display servers play a single efficient file rather than thousands of individual images. This makes image sequences ideal for 3D render pipelines, HDR workflows, and situations where per-frame quality matters.

### When to Use Image Sequences

Image sequences are the preferred delivery format when:

- **3D rendering** — most render engines (Cinema 4D, Blender, After Effects, etc.) output numbered frames. Importing them directly avoids a separate encoding step.
- **HDR workflows** — EXR sequences carry 32-bit floating-point data per channel, preserving the full dynamic range from your render pipeline.
- **Per-frame quality** — each frame is stored independently, avoiding inter-frame compression artifacts that can appear in highly compressed video codecs.
- **Interrupted renders** — if a render crashes, you keep all completed frames. With video encoding, a crash may corrupt the entire file.

### Image Sequences vs. Video Files

| Aspect | Image Sequence | Video File |
|--------|---------------|------------|
| **Source format** | Folder of numbered images | Single container file (MP4, MOV, etc.) |
| **Alpha support** | Via PNG, TGA, EXR, TIFF formats | Via ProRes 4444, HAP Alpha codecs |
| **HDR support** | EXR with 32-bit float | Limited to codec capabilities |
| **Render pipeline fit** | Direct output from 3D apps | Requires encoding step after render |
| **Optimization priority** | Lowest (-3) — queued after all other types | Higher (-2 for video, +1 for images) |
| **Fault tolerance** | Individual frames survive crashes | Corrupt container may lose everything |
| **Import overhead** | Folder scan + contiguity check | Single file read |
| **Minimum frames** | 20 frames required | No minimum |

:::info
**When to prefer video:** If you don't need per-frame precision or HDR, it's more efficient to encode to ProRes or HAP in your compositing tool and import the resulting video file directly. This skips the sequence detection step and gets a higher optimization priority.
:::

### How Detection Works

When you add an image sequence, the Asset Manager scans the selected folder and applies a detection algorithm:

1. **Extension filter** — only files matching the supported image extensions are considered (see table below).
2. **Frame number parsing** — the filename is walked in reverse to extract trailing digits. For example, `render_0042.tiff` yields frame number 42. The parser uses the **last numeric group** before the extension.
3. **Prefix grouping** — files are grouped by their prefix (everything before the trailing digits). The group with the **most files** is selected as the sequence.
4. **Contiguity check** — the sequence must be contiguous with no gaps. If frame 15 is missing from a 1–100 range, the detection fails.
5. **Minimum count** — at least **20 frames** are required for a valid image sequence.

:::warning
**Sequences must be contiguous.** If any frame numbers are missing in the range, the import will fail. Verify your render output is complete before importing. A sequence of frames 1, 2, 4, 5 (missing frame 3) will be rejected.
:::

### Supported Frame Formats

| Format | Extensions | Alpha | HDR | Notes |
|--------|-----------|-------|-----|-------|
| **EXR** | `.exr` | Yes | Yes (32-bit float) | Recommended for HDR and high-precision workflows |
| **PNG** | `.png` | Yes | No | Lossless, best for graphics and rendered content |
| **TIFF** | `.tiff`, `.tif` | Optional | No | Lossless, high-quality archival option |
| **TGA** | `.tga` | Yes | No | Legacy format, still common in game/VFX pipelines |
| **JPEG** | `.jpg`, `.jpeg` | No | No | Lossy, good for photographic content |
| **BMP** | `.bmp` | No | No | Uncompressed, large file sizes |
| **GIF** | `.gif` | No | No | Limited to 256 colors per frame |
| **WebP** | `.webp` | Yes | No | Modern web format with good compression |
| **DDS** | `.dds` | Varies | No | DirectX texture format |
| **ICO** | `.ico` | Yes | No | Icon format, rarely used for sequences |

All files in a sequence must use the **same format and resolution**. Mixing formats within a single sequence is not supported.

### Adding an Image Sequence

1. Right-click in the Assets window and choose **New → Add Image Sequence**.
2. A folder browser opens. Select the **folder** containing the numbered image files.
3. The Asset Manager scans the folder, detects the longest contiguous sequence, and creates a single asset.

<!-- screenshot: Add Image Sequence folder browser dialog -->

The resulting asset appears in the Assets window with a video-style icon. Its type is set to `Video` (not `Image`), since it contains multiple frames.

### Frame Rate and Duration

Image sequences default to **60 fps**. You can change the frame rate when creating a version of the asset (via the **Create Version** dialog), or it may inherit the show's default frame rate.

The duration is calculated from frame count and frame rate:

> **Duration** = number of frames / frame rate

For example, a 1200-frame sequence at 30 fps produces a 40-second asset. The same sequence at 60 fps produces a 20-second asset.

### Optimization

When an image sequence is added, the Asset Manager processes it through the same optimization pipeline as video files:

1. The individual frames are read in sequence order via an `ImageSequenceContainer`.
2. The pixel format of the first frame determines the source codec (RGB8, RGBA8, RGB16, etc.).
3. Frames are encoded into the configured output codec through the GPU shader pipeline and written as WAF chunks.
4. The result is a single optimized file that display servers can play back efficiently.

**Output codec mapping for common image formats:**

| Source Pixel Format | Default Output Codec |
|--------------------|---------------------|
| RGB 8-bit | RGB 8-bit (pass-through) |
| RGBA 8-bit | RGBA 8-bit (pass-through) |
| RGB 16-bit | RGB 10A2 (reduced precision) |
| RGBA 16-bit | RGBA 8-bit |
| Grayscale 8-bit | RGB 8-bit |
| Grayscale + Alpha 8-bit | RGBA 8-bit |

Preview thumbnails always use **HAP** (HapStd for opaque, HapAlpha for transparent content).

:::warning
**Image sequences have the lowest optimization priority (-3).** They are processed after images (+1), other assets (0), audio (-1), and video (-2). For large sequences, plan for significant optimization time. If you need faster processing, encode the sequence to a video file in your compositing tool first.
:::

### Playback Behavior

Once imported and optimized, an image sequence behaves identically to a video asset:

- Place it on the timeline by dragging from the Assets window.
- Set **in/out points**, **loop mode**, and **duration** in the cue properties.
- Apply effects, tweens, and transitions as with any video cue.
- Use as a [Dynamic Asset](./06-dynamic-assets.md) version for content that changes between shows.

### Performance Considerations

Image sequences can be very large — a 4K EXR sequence at 60 fps can easily produce hundreds of gigabytes of source data. Keep in mind:

- **Storage** — the source images require significant disk space during import and optimization. The optimized output is typically much smaller. Chunks are written at a default size of 512 MB.
- **Optimization time** — encoding thousands of frames takes longer than re-encoding a single video file. Plan for longer optimization times with large sequences.
- **Color space** — image sequences are imported with **sRGB / Rec.709** color characteristics. The optimizer handles color transfer during encoding, with special handling for multi-frame sequences to ensure correct SDR display.
- **License required** — image sequence optimization is not available in demo mode. A valid WATCHOUT license is required.

### Best Practices

- **Use consistent numbering with leading zeros** (e.g., `frame_0001.png` through `frame_2400.png`). The detection algorithm relies on trailing digits in filenames.
- **Verify contiguity before importing** — missing frames will cause the import to fail. Check your render output is complete.
- **Prefer EXR for HDR content** — it preserves the full dynamic range and is well-supported in the optimization pipeline.
- **Match your target frame rate** — set the correct fps during import to avoid unexpected playback speed. The default 60 fps may not match your show's timeline.
- **Consider pre-encoding for faster turnaround** — if optimization time is a concern, encode to ProRes or HAP in your compositing tool and import as a video instead.
- **Keep source files available** until optimization is complete — the optimizer reads frames directly from disk during processing.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| "Bad image sequence!" error | Sequence has gaps (non-contiguous frame numbers) | Re-render missing frames; verify no files were accidentally deleted |
| No sequence detected in folder | Fewer than 20 matching image files, or filenames lack trailing numbers | Ensure at least 20 files with consistent naming like `name_0001.ext` |
| Wrong frame count detected | Multiple naming patterns in the same folder | Move unrelated files out of the folder; only one naming pattern should be present |
| Sequence optimization takes very long | Lowest priority (-3) in the queue; large frame count | Wait for higher-priority assets to finish, or pre-encode as video for faster processing |
| Incorrect playback speed | Frame rate mismatch between source and asset settings | Change the frame rate via **Create Version** to match your intended playback speed |
| "Image sequence" rejected in demo | License requirement for sequence optimization | Activate a valid WATCHOUT license |
| Alpha channel missing after optimization | Source format doesn't support alpha (JPEG, BMP) or codec mapping dropped it | Use PNG, TGA, or EXR source formats; verify the output codec supports alpha |

### See Also

- [Asset Manager](./01-asset-manager.md) — asset pipeline overview and optimization stages
- [Formats and Codecs](./04-formats-codecs.md) — supported codecs and optimization output mappings
- [Asset Properties](./03-asset-properties.md) — understanding frame count, fps, and codec metadata
- [Asset Transfer](./10-asset-transfer.md) — how optimized sequences are distributed to display servers
- [Dynamic Assets](./06-dynamic-assets.md) — using sequences as swappable versioned content
