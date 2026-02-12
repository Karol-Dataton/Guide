---
title: "Image Sequences"
---


## Image Sequences

An image sequence is a series of numbered image files — for example, `render_0001.png`, `render_0002.png`, `render_0003.png` — that WATCHOUT treats as a single video-like asset. Each file represents one frame.

### When to Use Image Sequences

Image sequences are the preferred delivery format when:

- **3D rendering** — most render engines (Cinema 4D, Blender, After Effects, etc.) output numbered frames. Importing them directly avoids a separate encoding step.
- **HDR workflows** — EXR sequences carry 32-bit floating point data per channel, preserving the full dynamic range from your render pipeline.
- **Per-frame quality** — each frame is stored independently, avoiding inter-frame compression artifacts that can appear in highly compressed video codecs.
- **Interrupted renders** — if a render crashes, you keep all completed frames. With video encoding, a crash may corrupt the entire file.

### Supported Frame Formats

- **JPEG** — lossy, no alpha. Good for photographic content where file size matters.
- **PNG** — lossless with alpha support. Best for graphics and rendered content.
- **TGA** — lossless with alpha. Legacy format, still common in some pipelines.
- **TIFF** — lossless, optional alpha. High-quality archival option.
- **EXR** — 32-bit float with HDR support. Recommended for HDR and high-precision color workflows.

### Adding an Image Sequence

1. Right-click in the Assets window and choose **New → Add Image Sequence**.
2. A folder browser opens. Select the **folder** containing the numbered image files.
3. The Asset Manager scans the folder, detects the numbering pattern, and creates a single asset representing the entire sequence.

<!-- screenshot: Add Image Sequence folder browser dialog -->

The resulting asset appears in the Assets window with a video-style icon. Its duration is determined by the number of frames and the configured frame rate.

:::info
**Tip:** Ensure your image files use a consistent numbering scheme with leading zeros (e.g. `frame_0001.png` through `frame_2400.png`). The Asset Manager relies on the numbering pattern to determine frame order.
:::

### Frame Rate

The playback speed of an image sequence is determined by the asset's frame rate setting. You can set or change the frame rate when creating a version of the asset (via the **Create Version** dialog), or it may inherit the show's default frame rate.

For example, a 1200-frame sequence at 30 fps produces a 40-second asset.

### Optimization

When an image sequence is added, the Asset Manager processes it through the same optimization pipeline as video files:

1. The individual frames are read in sequence order.
2. They are encoded into the configured output codec (typically HAP).
3. The result is a single optimized video file that display servers can play back efficiently.

This means that even though you import individual frames, the display servers receive a standard optimized video — they do not need to read thousands of individual image files during playback.

:::info
**Note:** Image sequences receive a higher optimization priority than standalone video files to ensure they are processed promptly, since the source data (many small files) is less efficient to stream directly.
:::

### Playback Behavior

Once imported and optimized, an image sequence behaves identically to a video asset:

- Place it on the timeline by dragging from the Assets window.
- Set **in/out points**, **loop mode**, and **duration** in the cue properties.
- Apply effects, tweens, and transitions as with any video cue.

### Performance Considerations

Image sequences can be very large — a 4K EXR sequence at 60 fps can easily produce hundreds of gigabytes of source data. Keep in mind:

- **Storage** — the source images require significant disk space during import and optimization. The optimized output is typically much smaller (especially when using HAP).
- **Optimization time** — encoding thousands of frames takes longer than re-encoding a single video file. Plan for longer optimization times with large sequences.
- **When to prefer video** — if you don't need per-frame precision or HDR, it's more efficient to encode to ProRes or HAP in your compositing tool and import the resulting video file directly. This skips the sequence import step entirely.
