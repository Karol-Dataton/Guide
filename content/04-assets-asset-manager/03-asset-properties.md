---
title: "Asset Properties"
---


## Asset Properties

Select one or more assets in the Assets window to view their properties in the Properties panel. Double-click an asset or press **Enter** to focus the Properties panel directly.

The Properties panel adapts to the asset type, showing only the fields relevant to the selected asset.

### General Information

All assets display the following read-only fields in the Info section:

- **Name** – the display name. Click the name field to rename the asset (editable unless the asset is in an error state).
- **Type** – the asset kind (Video, Image, Audio, SVG, Composition, etc.).
- **UUID** – the unique identifier assigned to the asset.
- **Original Path** – the original file location from which the asset was imported.

### Visual Asset Properties

For image and video assets, the following additional fields appear:

- **Codec** – the optimized codec (if different from the original, both are shown, e.g. "H.264 → HAP").
- **Color Space** – the color standard and transfer function. If the input and output differ, both are displayed with an arrow (e.g. "sRGB → Rec. 709"). Recognized standards include Rec. 709, Rec. 2020, Rec. 2100 PQ, Rec. 2100 HLG, and sRGB.
- **Dimensions** – width × height in pixels for 2D assets, or X × Y × Z bounding box for 3D models.
- **Bitrate** – the video bitrate (video assets only).
- **Compression Ratio** – the ratio between uncompressed and compressed file size (video and image assets).

### Video-Specific Properties

- **Frame Rate** – displayed in frames per second. Fractional rates (e.g. 29.97) are shown with two decimal places.
- **Duration** – total playback length, formatted as HH:MM:SS.ms.
- **Progress** – optimization or upload progress percentage (visible only while the asset is being processed).

### Audio-Specific Properties

- **Channels** – the number of audio channels (1 = mono, 2 = stereo, etc.).
- **Sample Rate** – displayed in kHz (e.g. 48 kHz).
- **Duration** – total playback length.

### Display Data Properties

For MPCDI display data assets:

- **Version** – the MPCDI file version.
- **Canvases Size** – the total canvas dimensions.

### Dynamic Asset Properties

When a dynamic (auto-updating) asset is selected, an additional **Active Version** section appears showing:

- The currently active version and its details.
- A version count indicator (e.g. "2 versions").
- Controls for managing and switching between versions.

See [Dynamic Assets](../06-dynamic-assets) for details on version management.

### SVG Shape Properties

SVG shape assets display a dedicated shape editor instead of the standard property fields. This includes a live preview, geometry controls, fill and stroke colors, and (for text shapes) font and text properties.

See [SVG Shapes](../05-svg-shapes) for full documentation.

### Error Information

If an asset failed to optimize, the Properties panel displays:

- **Error** – the error message explaining why optimization failed.

Assets in an error state show their name in red in the Assets window and cannot be renamed or used until the issue is resolved.
