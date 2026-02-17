---
title: "Formats & Codecs"
---


## Formats & Codecs

**Choosing the right source format and optimization codec is one of the most consequential decisions in show design.** The codec determines GPU vs. CPU decode load, file size, scrub responsiveness, maximum resolution, and alpha channel support. This article covers every format WATCHOUT supports, how the optimizer converts between them, and when to use each option.

### How the Optimizer Chooses an Output Codec

When a source file is added to the show, the optimizer does not simply re-encode it to HAP. Instead, it consults the **codec mapping table** — a configurable set of rules that maps each source codec to a specific output codec. The default mapping targets GPU-friendly formats:

| Source Codec | Default Output | Notes |
|---|---|---|
| H.264 (AVC 4:2:0) | HEVC 4:2:0 | Re-encoded for GPU-accelerated decode |
| HEVC / H.265 | HEVC 4:2:0 | Pass-through if already HEVC; re-encode otherwise |
| MPEG-2 | HEVC 4:2:0 | Legacy broadcast sources |
| ProRes 422 / 422 LT / 422 HQ | NotchLC Opaque | High-quality intermediate → high-quality GPU codec |
| ProRes 4444 (with alpha) | NotchLC Alpha | Preserves alpha channel |
| ProRes 4444 XQ | NotchLC Opaque/Alpha | Depending on alpha presence |
| HAP / HAP Q / HAP Alpha | Pass-through | Already GPU-optimized; copied without re-encoding |
| NotchLC | Pass-through | Already GPU-optimized |
| Raw RGB/RGBA 8-bit | Pass-through | Already in raw texture format |
| RGB 16-bit | RGB 10-bit (R10G10B10A2) | Downsampled to 10-bit precision |

You can override any row in this table through the [Asset Manager Settings](11-asset-manager-settings.md) dialog. Non-default mappings are highlighted with a colored arrow.

:::tip
If your content pipeline already outputs HAP or NotchLC, the optimizer simply copies the data without re-encoding — this saves significant time. Coordinate with your content creators to deliver in the target codec whenever possible.
:::

### Video Codec Comparison

| Codec | Decode Method | Alpha Support | Relative File Size | Scrub Performance | Best For |
|---|---|---|---|---|---|
| **HAP** | GPU (DXT1) | No | Large (5–10× H.264) | Excellent — every frame independent | Most standard video content |
| **HAP Alpha** | GPU (DXT5) | Yes | Large | Excellent | Transparent video overlays |
| **HAP Q** | GPU (BC7) | No | Very large | Excellent | High-quality content where visual fidelity matters |
| **HAP Q Alpha** | GPU (BC7 + DXT5) | Yes | Very large | Excellent | High-quality transparent content |
| **NotchLC Opaque** | GPU | No | Medium-large | Excellent | ProRes replacement; high quality, smaller than HAP |
| **NotchLC Alpha** | GPU | Yes | Medium-large | Excellent | ProRes 4444 replacement with alpha |
| **HEVC 4:2:0** | GPU (HW accel) | No | Small | Good — some seek latency | Standard video when file size matters |
| **HEVC X010** | GPU (HW accel) | No | Small | Good | 10-bit color depth content |
| **ProRes 422** | CPU | No | Medium | Good | Intermediate editing codec |
| **ProRes 4444** | CPU | Yes | Large | Good | High-quality with alpha |
| **H.264** | CPU | No | Small | Moderate — GOP-based | Source delivery; not recommended as output |
| **MPEG-2** | CPU | No | Medium | Moderate | Legacy broadcast sources |
| **Raw RGB 8-bit** | None (direct) | No | Very large | Instant | Uncompressed texture data |
| **Raw RGBA 8-bit** | None (direct) | Yes | Very large | Instant | Uncompressed with alpha |
| **Raw RGB 10-bit** | None (direct) | No | Very large | Instant | 10-bit uncompressed |

### Why HAP is Recommended

HAP is the default optimization target because it decodes entirely on the GPU using DXT texture compression:

- **Minimal CPU usage** — leaves the CPU free for effects, compositing, and control tasks.
- **Instant scrubbing** — every frame can be accessed independently (no inter-frame dependencies), so timeline navigation is smooth even with 8K content.
- **High frame rates** — easily handles 60 fps and beyond without CPU bottlenecks.
- **Large resolutions** — supports 4K, 8K, and higher. The GPU handles decompression in parallel with rendering.

The trade-off is **larger file sizes** and higher storage bandwidth requirements compared to CPU-decoded codecs. A 1-minute 4K ProRes video at ~2 GB may become ~8 GB as HAP. Plan storage and network capacity accordingly.

### When to Use Other Codecs

- **NotchLC** — when you need GPU decoding with smaller files than HAP. NotchLC produces higher visual quality at comparable or smaller file sizes. Ideal when your source is ProRes.
- **HEVC** — when file size is the primary concern and you have GPUs with hardware HEVC decode. Seek performance is slightly worse than HAP due to GOP structure, but the size reduction is significant.
- **Raw** — when you need zero decode latency and have sufficient disk bandwidth. Raw formats are used for uncompressed texture streaming, typically for smaller assets or specialized pipelines.
- **Pass-through** — when your source is already in HAP, NotchLC, or Raw format. The optimizer copies without re-encoding, saving time and avoiding generational quality loss.

### Alpha Channel Handling

Alpha (transparency) support depends on both the source and output codec:

| Source Has Alpha? | Output Codec Options |
|---|---|
| Yes | HAP Alpha, HAP Q Alpha, NotchLC Alpha, Raw RGBA 8-bit |
| No | HAP, HAP Q, NotchLC Opaque, HEVC, Raw RGB 8-bit/10-bit |

When the source has an alpha channel and the output codec supports it, transparency is preserved through the entire pipeline. If you map a source with alpha to a codec that does not support alpha (e.g., standard HAP), the alpha channel is discarded during optimization.

:::warning
If you need transparent video overlays on the timeline, verify that your codec mapping preserves alpha. Check the output codec in the asset's Properties panel after optimization — if it shows a non-alpha codec (e.g., "HAP" instead of "HAP Alpha"), the transparency has been lost.
:::

### Container Formats

WATCHOUT supports the following video container formats:

| Container | Extension | Common Codecs | Notes |
|---|---|---|---|
| QuickTime | `.mov` | HAP, ProRes, H.264, NotchLC | Most common for professional content |
| MPEG-4 | `.mp4` | H.264, HEVC, AAC | Standard delivery format |
| AVI | `.avi` | HAP | Legacy; sometimes used for HAP on Windows |
| Matroska | `.mkv` | H.264, HEVC, Vorbis | Open container; supports many codecs |
| MPEG TS/PS | `.ts`, `.mpg` | MPEG-2, H.264, HEVC | Broadcast transport streams |
| MXF | `.mxf` | ProRes 422 | Professional broadcast exchange |

### Image Formats

| Format | Extension | Alpha | Bit Depth | Compression | Best For |
|---|---|---|---|---|---|
| JPEG | `.jpg` | No | 8-bit | Lossy | Photos and backgrounds |
| PNG | `.png` | Yes (8-bit) | 8-bit | Lossless | Graphics, logos, overlays |
| TIFF | `.tiff` | Optional | 8/16-bit | Lossless | Archival, image sequences |
| TGA | `.tga` | Yes | 8-bit | Lossless | Legacy pipelines, image sequences |
| BMP | `.bmp` | No | 8-bit | None | Uncompressed bitmap |
| WebP | `.webp` | Yes | 8-bit | Lossy/Lossless | Web-sourced content |
| EXR | `.exr` | Yes | 32-bit float | Lossless | HDR, high-precision color |
| PSD | `.psd` | No | 8-bit | — | Imported as flattened image |
| GIF | `.gif` | No | 8-bit | Lossless | Single frame only |
| ICO | `.ico` | Yes | 8-bit | — | Icon files |

### Audio Formats

| Format | Extension | Compression | Recommendation |
|---|---|---|---|
| WAV | `.wav` | None (PCM) | Recommended — best quality, lowest latency |
| AIFF | `.aiff` | None | Similar to WAV; Apple ecosystem |
| MP3 | `.mp3` | Lossy | Widely compatible; acceptable for non-critical audio |
| AAC-LC | `.aac`, `.m4a` | Lossy | Higher quality than MP3 at similar bitrates |
| FLAC | `.flac` | Lossless | When you need lossless compression |
| OGG Vorbis | `.ogg` | Lossy | Open-source alternative to MP3 |
| ALAC | `.m4a` | Lossless | Apple Lossless; equivalent to FLAC |
| ADPCM | `.wav` | Lossy | Legacy compressed WAV |

Audio codecs are supported in the following containers: WAV, ISO/MP4, MKV/WebM, and OGG.

### The Optimization Pipeline

When a source file is added, it passes through these stages:

1. **Upload** — the source file is copied to the Asset Manager's internal storage.
2. **Codec mapping lookup** — the optimizer reads the source codec and consults the mapping table to determine the output codec.
3. **Transcode** — the source is decoded and re-encoded to the output codec at the configured quality level. Pass-through codecs skip this step.
4. **Chunk storage** — the optimized output is written as content-addressed chunks (Blake3 hashed). Identical data across assets is deduplicated.
5. **Distribution** — the optimized file is transferred to display servers when the show goes online.

[[WIDGET:codec-comparison]]

### Track Management

For source files that contain both video and audio tracks, the optimizer offers four track management modes (configured in [Asset Manager Settings](11-asset-manager-settings.md)):

| Mode | Behavior |
|---|---|
| **Skip Audio** | Optimize only the video track; discard audio |
| **Skip Video** | Optimize only the audio track; discard video |
| **Composition** | Keep both tracks as a single composition asset (video + audio in sync) |
| **Individual Assets** | Split video and audio into separate, independent assets |

### Quality Levels

For codecs that support quality settings, the optimizer provides five levels:

| Level | Quality | File Size | When to Use |
|---|---|---|---|
| **Good** | Lower | Smallest | Previews, rehearsal content, when storage is limited |
| **Very Good** | Balanced | Moderate | Default for most content |
| **Excellent** | High | Larger | Production content with fine detail |
| **Optimal** | Very high | Large | Critical visual content |
| **Best** | Maximum | Largest | Final mastering, archival |

Quality is specified as a numeric value internally (0 = lowest, increasing = better). Not all codecs expose a quality setting — pass-through formats and some GPU codecs produce a fixed output regardless of the quality parameter.

### Bandwidth Limit

The Asset Manager Settings dialog includes a **Bandwidth Limit** setting (in Mbit/s) that caps the data rate used when transferring assets to display servers. Set to **0** for unlimited bandwidth. Use this when WATCHOUT shares a network with other traffic. See [Asset Transfer](10-asset-transfer.md) for transfer optimization guidance.

### Best Practices

- **Deliver in the target codec.** If possible, have content creators export directly in HAP or NotchLC. This eliminates transcoding time and avoids generational quality loss.

- **Match frame rates.** Source frame rate should match the show's frame rate (or be an exact multiple/divisor). Mismatched frame rates cause dropped or duplicated frames during playback.

- **Use HAP Q for hero content.** For content that will be displayed prominently (e.g., main stage, close-up screens), HAP Q provides visibly better quality than standard HAP at the cost of larger files.

- **Reserve HEVC for constrained storage.** HEVC produces much smaller files but requires hardware decode support on the GPU. Verify your display servers have compatible GPUs before committing to HEVC as the output codec.

- **Test alpha pipelines end-to-end.** Verify that the source → optimize → playback chain preserves alpha correctly by placing a transparent asset over a colored background and checking the result on a display server.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Optimization fails with codec error | Source uses an unsupported or corrupt codec | Re-encode the source in a supported format (ProRes, H.264, or HAP); verify the file plays in a media player |
| Output file is unexpectedly large | Source was re-encoded to HAP (which is larger by design) | Expected behavior — plan storage accordingly. If file size is critical, consider NotchLC or HEVC as the output codec |
| Alpha transparency lost after optimization | Codec mapping routes to a non-alpha output codec | Change the codec mapping to HAP Alpha, NotchLC Alpha, or Raw RGBA in [Asset Manager Settings](11-asset-manager-settings.md) |
| Playback stutters on display server | CPU-decoded codec at high resolution, or insufficient disk bandwidth for HAP | Switch to a GPU-decoded codec (HAP, NotchLC, HEVC); ensure display server has SSD storage with sufficient read speed |
| Color looks wrong after optimization | Color space mismatch between source and output | Check the color space in [Asset Properties](03-asset-properties.md); ensure the source color space metadata is correct |
| Scrubbing is sluggish | Using a GOP-based codec (H.264, HEVC) as the output | Switch to HAP or NotchLC, which support frame-independent access |
