---
title: "Import, Export, and Mapping"
---


## Import, Export, and Mapping

The Assets window provides workflows for exporting assets to external storage, importing them onto another system, and controlling how the optimizer maps source codecs to output formats.

### Exporting Assets

Export copies optimized asset files from the Asset Manager to a destination path on any accessible node. Use this to archive a show’s media, transfer it to another system, or prepare a backup.

From the Assets window context menu, choose **Transfer Assets** and then:

- **Export All** – exports every asset in the show.
- **Export Selected** – exports only the currently selected assets.

Both options open a dialog where you select:

1. **Target node** – the machine to export to (can be the local machine or any connected node).
2. **Destination path** – the folder on the target node where files will be written.

<!-- screenshot: Export dialog showing node selection and destination path -->

Once started, the export job tracks progress through the standard transfer stages (Scanning → Transferring → Success). You can monitor progress in the Assets window’s activity panel.

### Importing Assets

Import reads an asset package from a path on a connected node and adds the contents to the current show.

From the Assets context menu, choose **Transfer Assets → Import**.

1. **Source node** – the machine where the asset package resides.
2. **Source path** – the folder containing the exported assets.

The import process copies files into the Asset Manager’s storage. If the source node is the local machine but the Asset Manager runs on a remote node, WATCHOUT checks that the path is accessible via the remote file access allowlist. If the path is not permitted, a dialog appears explaining how to configure remote access.

:::info
**Tip:** Importing is a copy operation. The source files are not modified or deleted.
:::

### Pre-Caching on Runners

For shows with large media libraries, you can pre-cache selected assets onto specific Runners without going fully online:

1. Select the assets to cache.
2. Right-click → **Transfer Assets → Cache Selected Assets**.
3. Choose one or more Runners.
4. Click **OK**.

This pushes the optimized files to the selected Runners ahead of time, reducing the time needed when the show goes online.

### Codec Settings (Optimizer Mapping)

The **Asset Manager Settings** dialog (accessible from the Assets context menu) includes the codec mapping section. This controls how the optimizer converts source codecs to output formats.

Each row in the mapping table shows:

- **In** – the source codec detected in the imported file.
- **Out** – the output codec the optimizer will produce.
- **Default** – the system’s recommended output for that source.

You can override individual mappings by changing the output dropdown. Non-default mappings are highlighted. Use the **Reset All** button to revert all overrides.

For details on quality levels, track management, and bandwidth settings, see [Asset Manager Settings](../11-asset-manager-settings).

### Practical Workflow

1. **Before migration** – export all assets to a portable drive or network share.
2. **On the target system** – open the show and import from the export location.
3. **Verify** – check that all assets appear and are in the correct optimization state.
4. **Adjust mappings** – if the target system has different hardware capabilities, update codec mappings before re-optimizing.
5. **Use Find Cues** – before deleting or replacing critical assets, use **Find Cues** to ensure no timeline references will break.
