---
title: "Formats & Codecs"
---


## Formats & Codecs

Choosing the right source format and optimization codec is crucial for reliable, high-performance playback. This article covers the formats WATCHOUT supports and how the optimizer converts them.

### Video Codecs

Source video files can use any of the following codecs. During optimization, the Asset Manager transcodes them to the configured output codec.

**GPU-decoded (recommended)**

- **HAP** – GPU-decoded, excellent performance, large files. Recommended for most content.
- **HAP Alpha** – HAP with an alpha channel for transparent video.
- **HAP Q** – higher visual quality than standard HAP, with larger file sizes.

**CPU-decoded**

- **ProRes 422** – high-quality intermediate codec from Apple.
- **ProRes 4444** – ProRes with alpha channel support.
- **DNxHR** – Avid's high-resolution codec.
- **H.264** – widely compatible, smaller file sizes, higher CPU load.
- **HEVC / H.265** – improved compression over H.264, higher CPU load.
- **NotchLC** – optimized for real-time graphics from Notch.

### Why HAP is Recommended

HAP is the default optimization target because it decodes entirely on the GPU:

- **Minimal CPU usage** – leaves the CPU free for effects, compositing, and control tasks.
- **Instant scrubbing** – every frame can be accessed independently, so timeline navigation is smooth.
- **High frame rates** – easily handles 60 fps and beyond.
- **Large resolutions** – supports 4K, 8K, and higher without CPU bottlenecks.

The trade-off is larger file sizes and higher storage bandwidth requirements compared to CPU-decoded codecs.

### Container Formats

WATCHOUT supports the following video container formats:

- **.mov** – QuickTime; commonly used with HAP, ProRes, and H.264.
- **.mp4** – MPEG-4 Part 14; commonly used with H.264 and HEVC.
- **.avi** – legacy container; sometimes used with HAP.
- **.mkv** – Matroska; supports a wide range of codecs.

### Image Formats

- **JPEG** – lossy compression, no transparency. Best for photos and backgrounds.
- **PNG** – lossless with 8-bit alpha. Best for graphics, logos, and overlays.
- **TIFF** – lossless, supports alpha. High-quality archival images.
- **TGA** – legacy format with alpha support.
- **BMP** – uncompressed bitmap.
- **EXR** – 32-bit floating point with HDR support. Best for high-precision and HDR content.
- **PSD** – imported as a flattened image.

### Audio Formats

- **WAV** – uncompressed PCM. Recommended for best quality and lowest latency.
- **AIFF** – uncompressed audio, similar to WAV.
- **MP3** – lossy compression, widely compatible.
- **AAC** – lossy compression, higher quality than MP3 at similar bitrates.
- **FLAC** – lossless compression.
- **OGG** – open-source lossy compression.

### The Optimization Pipeline

When a source file is added, the Asset Manager processes it through the optimizer:

1. **Upload** – the source file is copied to the Asset Manager's storage.
2. **Optimize** – the file is transcoded to the configured output codec and quality settings.
3. **Store** – both the original and the optimized version are retained.
4. **Distribute** – the optimized file is transferred to display servers when the show goes online.

The optimizer uses the codec mapping to decide which output codec to use for each input codec (see [Import, Export, and Mapping](../12-import-export-and-mapping)).

### Track Management

For source files that contain both video and audio tracks, the optimizer offers four track management modes:

- **Skip Audio** – optimize only the video track; discard audio.
- **Skip Video** – optimize only the audio track; discard video.
- **Composition** – keep both tracks together as a single composition asset.
- **Individual Assets** – split video and audio into separate assets.

### Quality Levels

For codecs that support quality settings, the optimizer provides five levels:

1. **Good** – smallest file size, lower visual quality.
2. **Very Good** – balanced.
3. **Excellent** – higher quality, larger files.
4. **Optimal** – near-maximum quality.
5. **Best** – maximum quality, largest files.

### Bandwidth Limit

The Asset Manager Settings dialog includes a **Bandwidth Limit** setting (in Mbit/s) that caps the data rate used when transferring assets to display servers. Set to **0** for unlimited bandwidth.
