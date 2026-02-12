---
title: "Asset Manager Settings"
---


## Asset Manager Settings

The Asset Manager Settings dialog controls how assets are optimized, transferred, and managed. Open it by right-clicking in the Assets window and choosing **Asset Manager Settings**.

<!-- screenshot: Asset Manager Settings dialog showing all sections -->

### Bandwidth Limit

The **Bandwidth Limit** setting caps the data rate (in Mbit/s) used when transferring optimized assets to display servers.

- Set to **0** for unlimited bandwidth (default).
- Set a positive value (e.g. 500) to limit transfers to that rate, useful when sharing the network with other traffic.

### Track Management

The **Track Management** section controls how the optimizer handles source files that contain both video and audio tracks. The **Composition Logic** dropdown provides four options:

- **Skip Audio** – only the video track is optimized; audio is discarded.
- **Skip Video** – only the audio track is optimized; video is discarded.
- **Composition** – both tracks are kept together as a single composition asset.
- **Individual Assets** – video and audio are split into separate assets.

This setting applies globally to all newly imported assets.

### Output Properties

The **Output Properties** section lists codecs that support quality configuration. For each codec, you can set a **Quality Level**:

1. **Good** – smallest output, lower visual quality.
2. **Very Good** – balanced.
3. **Excellent** – higher quality, larger files.
4. **Optimal** – near-maximum quality.
5. **Best** – maximum quality, largest files.

Not all codecs expose a quality setting. Codecs that don’t have a configurable quality (e.g. some passthrough formats) appear in the list without a dropdown.

### Codec Mapping

The **Codecs** section shows the input-to-output codec mapping. Each row maps a source codec ("in") to the codec used for the optimized output ("out").

- **Default mapping** – each source codec has a default output target (typically HAP for video).
- **Custom mapping** – click the output dropdown to choose a different output codec. Rows with non-default mappings are highlighted with a colored arrow.
- **Restore individual row** – hover over the arrow on a non-default row and click the restore icon to revert that row to its default.
- **Reset All** – the **Reset All** button at the bottom reverts every row to the default mapping.

:::info
**Tip:** Codec mapping changes take effect for all future optimizations. Assets already optimized are not re-processed unless you manually trigger re-optimization.
:::

### Saving Changes

Click **Save** to apply the current settings. The **Save** button is only enabled when changes have been made. Click **Cancel** to discard changes and close the dialog.
