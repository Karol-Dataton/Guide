---
title: "Asset Types"
---


## Asset Types

WATCHOUT 7 supports a range of asset types, each serving a different role in a show. The Asset Manager classifies every asset into one of the types described below.

### Visual Media

Visual media assets produce imagery on displays. They are transcoded by the optimizer and distributed to display servers.

**Image** – still images imported from files. Common formats include JPEG, PNG, BMP, TGA, TIFF, EXR, and PSD. Images are optimized into a GPU-friendly format when added to a show.

**Video** – motion media imported from video files. Supported source codecs include HAP, HAP Alpha, HAP Q, ProRes 422/4444, DNxHR, H.264, HEVC/H.265, and NotchLC. During optimization, video files are transcoded to the configured output codec (HAP by default).

**SVG** – vector shape assets. SVGs can be imported from external files or created directly within WATCHOUT using the built-in shape editor (see [SVG Shapes](../05-svg-shapes)). SVG assets are rendered as images at a configurable resolution.

**Image Sequence** – a folder of numbered image files (e.g. `frame_0001.png`, `frame_0002.png`) that is treated as a single video-like asset. Supported frame formats include JPEG, PNG, TGA, TIFF, and EXR (see [Image Sequences](../07-image-sequences)).

### Audible Media

**Audio** – sound files in WAV, AIFF, MP3, AAC, FLAC, or OGG format. WAV is recommended for uncompressed quality. Audio assets display sample rate, bit depth, and channel count in their properties.

### 3D Models

**Model** – 3D object files that can be placed on the stage. Models display a 3D bounding box (X × Y × Z) instead of a pixel resolution.

### Compositions

**Composition** – a nested timeline packaged as a reusable asset. Compositions appear in the Assets window as a special folder that contains the video and audio sub-assets it uses. You cannot move assets into or out of a composition folder manually — its contents are managed by the system.

### Fonts

**Font** – font files used by SVG text shapes. Fonts are added as assets and then referenced by text shapes via the font selector in the Shape Properties panel. Font assets show a thumbnail preview of the typeface.

### Display Data

**Display Data** – projection mapping data files (such as MPCDI files) that define display geometry for warped or blended projections. Display data assets show MPCDI version and canvas size information in their properties.

### Art-Net Assets

**Art-Net Fixture** – a fixture definition created from a built-in preset. Art-Net fixtures are used with the Art-Net input system for DMX-based control of show parameters.

**Art-Net Recording** – a captured recording of Art-Net data for playback on the timeline.

### EDID

**EDID** – captured EDID data from a display device. You can save an EDID snapshot from a connected display through the Network window.

### Folders

**Folder** – a user-created container for organizing assets. Folders can be nested and support drag-and-drop reordering. Some folder types are special:

- **Regular folders** – created by the user to organize assets freely.
- **Composition folders** – system-managed containers whose contents cannot be modified by the user.
- **Dynamic asset folders** – auto-updating containers that hold multiple versions of the same asset (see [Dynamic Assets](../06-dynamic-assets)).

### Type Filtering

The Assets window search panel includes a type filter dropdown with the following categories:

- **All** – show every asset.
- **Video** – video files and image sequences.
- **Image** – still images and SVGs.
- **Audio** – sound files.
- **Model** – 3D model files.
- **Other** – any asset that doesn't fall into the above categories (fonts, display data, Art-Net fixtures, etc.).
- **Failed** – assets that encountered an error during optimization.
- **Used** – assets referenced by at least one cue on the timeline.
- **Unused** – assets not referenced by any cue.
