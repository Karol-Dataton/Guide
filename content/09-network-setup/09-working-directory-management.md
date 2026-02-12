---
title: "Working Directory Management"
---


## Working Directory Management

Every WATCHOUT node has a **working directory** — the location on disk where the node stores essential runtime data, including cached media assets, show files, and internal state. By default, WATCHOUT creates this directory automatically in a system-managed location relative to the installation path (a `.wo` subfolder).

You can change the working directory on any node to redirect data storage to a different drive or partition — for example, a faster SSD or a larger data volume.

### What the Working Directory Contains

The working directory stores:

- **Cached assets** — local copies of media files downloaded from the Asset Manager for playback.
- **Show data** — show files that have been loaded or uploaded to the node.
- **Runtime files** — internal state and temporary data used by WATCHOUT services.

All of this data is tied to the working directory's location. If the directory changes, the node loses access to previously stored data at the old path.

### Changing the Working Directory

To change a node's working directory:

1. Open the **Nodes** window and select the target node.
2. In **Node Properties**, locate the **Working Directory** section.
3. Click the change button to open the **Change Working Directory** dialog.
4. Enter the new path or browse to select it.
5. Confirm the change.

The dialog displays the following important warnings:

- The specified path must be an **existing directory** on the selected node. WATCHOUT validates that the path exists before accepting it.
- **All assets used in the show will no longer be available.** The cached asset copies at the old location are not moved — they remain on disk but are no longer referenced.
- **Some error messages will appear** temporarily as the connection to the old asset manager storage is lost and re-established at the new location.

:::warning
Changing the working directory means all previously cached assets must be **re-transferred** from the Asset Manager. This can take significant time depending on the size of your asset library and network speed. Plan this operation for a maintenance window, not during a live show.
:::

### Resetting to Default

To reset a node's working directory to the default system-managed location, click the **Reset to Default** button in the Working Directory section of Node Properties. The default location is a `.wo` subfolder relative to the WATCHOUT installation path.

The same warnings about asset availability apply when resetting to default — assets cached at the custom location will need to be re-transferred.

### Use Cases

- **Moving to a faster or larger drive** — if the default system drive has limited space or slower I/O, point the working directory to a dedicated high-performance SSD or a larger data volume.
- **Separating show data across storage volumes** — keep the operating system and WATCHOUT installation on one drive, and all show/asset data on a separate data drive for easier backup and management.
- **Standardizing paths across a fleet** — in multi-node installations, set the same working directory path (e.g., `D:\watchout-data`) on all Runner machines for consistency.

### Troubleshooting

If the working directory path becomes invalid (e.g., the target drive is removed), WATCHOUT will attempt to fall back to the default location. If neither the configured path nor the default path is available, the Process Manager will log an error and may be unable to start services.

To recover, either restore the target drive or reset the working directory by editing the WATCHOUT Manager settings file directly on the affected node.
