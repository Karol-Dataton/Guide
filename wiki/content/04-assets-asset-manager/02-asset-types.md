---
title: "Asset Types"
---


## Asset Types

**WATCHOUT 7 classifies every asset into a specific type that determines how it is optimized, how it behaves on the timeline, and what properties are available.** Choosing the right asset type — and understanding the differences between them — is important for efficient show design, because each type follows a different path through the optimization pipeline and has distinct playback characteristics.

### Type Overview

| Type | Description | Optimized? | Timeline Behavior | Typical Source |
|---|---|---|---|---|
| **Video** | Motion media from video files | Yes — transcoded to playback codec (HAP default) | Plays back with in/out points, looping, speed control | `.mov`, `.mp4`, `.avi`, `.mkv` |
| **Audio** | Sound files | Yes — transcoded to internal format | Plays on audio bus with volume, pan, fade | `.wav`, `.aiff`, `.mp3`, `.aac`, `.flac`, `.ogg` |
| **Image** | Still images | Yes — converted to GPU texture format | Displays as a static cue; instant scrub | `.jpg`, `.png`, `.tiff`, `.tga`, `.bmp`, `.exr`, `.psd`, `.webp`, `.ico`, `.gif` |
| **SVG** | Vector shapes (built-in or imported) | Yes — rasterized at configurable resolution | Behaves like an image; re-rasterizes on resolution change | Built-in editor or `.svg` file |
| **Image Sequence** | Folder of numbered frames | Yes — encoded into single video | Behaves like video after optimization | Folder of `.png`, `.tga`, `.tiff`, `.exr`, `.jpg` |
| **Composition** | Nested timeline with video + audio | N/A — contains sub-assets | Plays as a unified multi-track asset | `.mp4`/`.mov` with video + audio tracks |
| **Model** | 3D object | Imported directly | Placed on 3D stage; shows bounding box | 3D model files |
| **Font** | Typeface file | Thumbnailed | Referenced by SVG text shapes | `.ttf`, `.otf` |
| **Display Data** | Projection mapping geometry | Imported directly | Applied to display configuration | MPCDI files |
| **Art-Net Fixture** | DMX fixture definition | N/A | Used with Art-Net input system | Built-in presets |
| **Art-Net Recording** | Captured DMX data | N/A | Plays back recorded Art-Net data on timeline | Recorded in WATCHOUT |
| **EDID** | Display identification data | N/A | Applied to display configuration | Captured from connected display |
| **Folder** | Organizational container | N/A | Not playable | Created by user or system |

### Visual Media

Visual media assets produce imagery on displays. They are transcoded by the optimizer and distributed to display servers.

#### Video

Video assets are the most common media type in most shows. Source files are transcoded during optimization to a GPU-friendly playback codec — HAP by default, though this can be changed in [Asset Manager Settings](11-asset-manager-settings.md). Supported source codecs include HAP (all variants), ProRes 422/4444, H.264, HEVC/H.265, NotchLC, MPEG-2, and DNxHR, in containers such as `.mov`, `.mp4`, `.mkv`, `.avi`, and MPEG-TS.

After optimization, video assets support full timeline controls: in/out points, looping, speed adjustment, and scrubbing. Because HAP decodes on the GPU, playback imposes minimal CPU load even at 4K/8K resolutions and high frame rates.

:::tip
If your source video is already in a pass-through codec (HAP, NotchLC, or Raw RGB/RGBA 8-bit), the optimizer copies it without re-encoding, saving significant processing time. Deliver content in HAP whenever possible to avoid unnecessary transcoding.
:::

#### Image

Still images are optimized into GPU texture formats (Raw RGB or RGBA 8-bit). Common source formats include JPEG, PNG, BMP, TGA, TIFF, WebP, PSD (imported as flattened), ICO, and single-frame GIF. EXR files (32-bit float) are supported for HDR workflows.

Images have the highest optimization priority — they are small and fast to process, so they clear the queue before video and sequence assets.

#### SVG

SVG assets can be created using WATCHOUT's built-in shape editor (rectangles, ellipses, text) or imported from external `.svg` files. Internally, SVGs are rasterized to pixels at a configurable resolution, so they behave like image assets on the timeline. See [SVG Shapes](05-svg-shapes.md) for full details on creation and editing.

#### Image Sequence

An image sequence is a folder of numbered image files (e.g., `frame_0001.png` through `frame_2400.png`) that WATCHOUT treats as a single video-like asset. During optimization, the individual frames are encoded into a single optimized video file. Supported frame formats are TIFF, TGA, PNG, JPEG, and EXR.

Image sequences have the **lowest optimization priority** because encoding thousands of frames is the most time-consuming operation. See [Image Sequences](07-image-sequences.md) for guidance on when to use sequences vs. pre-encoded video.

### Audible Media

**Audio** assets support WAV (recommended), AIFF, MP3, AAC-LC, FLAC, OGG/Vorbis, ADPCM, ALAC, and PCM formats in various containers (WAV, ISO/MP4, MKV/WebM, OGG). Audio assets display sample rate, channel count, and duration in their properties.

Audio is routed through the show's audio bus system and rendered by the Audio Renderer, which supports WASAPI, ASIO, and Dante output devices.

### Compositions

A **Composition** is created automatically when a source file contains both video and audio tracks and the track management setting is set to **Composition** (see [Asset Manager Settings](11-asset-manager-settings.md)). The result is a special folder in the Assets window containing the video and audio sub-assets as children. A `composition.json` file tracks the relationship between the tracks.

Compositions appear on the timeline as a single, unified asset — the video and audio play in sync. You cannot move assets into or out of a composition folder manually; its contents are system-managed.

:::note
If you prefer to work with video and audio as separate, independent assets, change the track management setting to **Individual Assets** before importing. This splits the tracks into separate assets with no composition wrapper.
:::

### 3D Models

**Model** assets are 3D objects that can be placed on the stage. They display a 3D bounding box (X × Y × Z) in their properties instead of a pixel resolution, and their `mesh_names` are extracted during import for reference.

### Fonts

**Font** assets (`.ttf`, `.otf`) are used by SVG text shapes. When a font is added, the optimizer generates a thumbnail preview of the typeface. Fonts appear in the font dropdown when editing text shapes in the [SVG Shapes](05-svg-shapes.md) properties panel.

### Display Data

**Display Data** assets hold projection mapping geometry, such as MPCDI files. Their properties include the MPCDI version and canvas size information. These are used when configuring display geometry for warped or blended projections (see [Warp Geometry](../03-displays-and-outputs/07-warp-geometry.md)).

### Art-Net Assets

**Art-Net Fixture** assets are fixture definitions created from built-in presets, used with the Art-Net input system for DMX-based control of show parameters.

**Art-Net Recording** assets are captured recordings of Art-Net data that can be played back on the timeline, useful for replaying lighting sequences or DMX-controlled effects.

### EDID

**EDID** assets contain captured display identification data from a connected monitor or projector. You can save an EDID snapshot from a connected display through the Network window. EDID data is used to configure display properties and ensure correct signal negotiation.

### Folders

**Folder** assets are organizational containers. There are three folder subtypes:

| Folder Type | Description | User-Modifiable? |
|---|---|---|
| **Regular** | Created by the user to organize assets freely | Yes — assets can be moved in and out |
| **Composition** | System-managed container for video + audio sub-assets | No — contents are locked |
| **Dynamic Asset** | Auto-updating container holding versions of the same content | Restricted — see [Dynamic Assets](06-dynamic-assets.md) |

### Choosing the Right Asset Type

When planning content delivery, consider:

- **Video vs. Image Sequence** — use video when your compositing tool can export directly to HAP, ProRes, or another supported codec. Use image sequences when you need per-frame precision, HDR (EXR), or when working with render farms that output numbered frames. See [Image Sequences](07-image-sequences.md) for a detailed comparison.

- **Composition vs. Individual Assets** — use compositions when video and audio must stay in sync and you want a single timeline cue. Use individual assets when you need independent control over video and audio placement, routing, or timing.

- **SVG vs. Image** — use SVG for simple geometric shapes, text overlays, and elements that may need resolution changes. Use pre-rendered images for complex graphics that exceed SVG's feature set.

- **Dynamic Asset vs. Regular Asset** — use dynamic assets when content will be updated during the show run (multi-language, sponsor rotations, live updates). Use regular assets for fixed content that won't change. See [Dynamic Assets](06-dynamic-assets.md).

### Type Filtering

The Assets window search panel includes a type filter dropdown with the following categories:

- **All** — show every asset.
- **Video** — video files and image sequences.
- **Image** — still images and SVGs.
- **Audio** — sound files.
- **Model** — 3D model files.
- **Other** — any asset that doesn't fall into the above categories (fonts, display data, Art-Net fixtures, etc.).
- **Failed** — assets that encountered an error during optimization.
- **Used** — assets referenced by at least one cue on the timeline.
- **Unused** — assets not referenced by any cue.
