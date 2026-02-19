---
title: "Import, Export, and Mapping"
---


## Import, Export, and Mapping

**Export and import let you package a show's optimized assets into a portable archive and bring them into a different WATCHOUT system, or back into the same system after changes.** This is the standard workflow for moving shows between machines — preparing media on a production workstation, then deploying it at a venue; creating a backup before major edits; or transferring a show to a client's hardware after programming is complete. WATCHOUT also provides a pre-download option for pushing assets to specific display servers (Runners) ahead of going online, and codec mapping settings that control how source media is converted during optimization.

### When to Use Export and Import

- **Deploying to a venue.** Program and optimize a show on your production system, export the assets to a portable drive, then import them on the venue's WATCHOUT system.
- **Backup before major changes.** Export all assets before restructuring a show. If something goes wrong, you can import the backup to restore the original media.
- **Handing off to another operator.** Export the complete asset package so another team can import it on their hardware without needing your original source files.
- **Cloning a show across multiple systems.** Export once, then import the same package onto several WATCHOUT systems running identical or similar shows.

### Exporting Assets

To export assets, right-click in the Assets window and choose **Transfer Assets**, then either:

- **Export** — exports only the currently selected assets
- **Export All** — exports every asset in the show

Both options open the export dialog with two fields:

| Field | Purpose |
|---|---|
| **Destination Node** | The machine where the export package will be created. This can be the local machine or any connected node on the network. |
| **Directory Path** | The folder on the destination node where the export package will be stored. |

Click **Ok** to start the export. WATCHOUT creates a self-contained package folder at the destination containing all the optimized media files, thumbnails, and an asset database. The export skips any assets that have already been exported to the same location, so re-exporting after adding a few new assets is fast.

You can also export a single asset from the Properties panel using the **Export To** button.

:::note
Assets that are still being uploaded or optimized are not included immediately. The export waits for them to finish processing, then includes them automatically. Assets that failed during optimization are excluded entirely.
:::

**What to expect during export:**

- The export runs in the background. You can monitor progress in the Node Info panel, which shows the percentage complete, data copied, files copied, files skipped (already present at the destination), and any errors.
- While an export is running to a particular destination, no other export or import can use that same destination folder simultaneously. Wait for one operation to finish before starting another to the same location.
- Do not manually modify or move files in the export folder while an export is in progress.

### Importing Assets

To import assets, right-click in the Assets window and choose **Transfer Assets > Import**. The import dialog has two fields:

| Field | Purpose |
|---|---|
| **Source Node** | The machine where the export package is stored. |
| **Directory Path** | The folder on the source node that contains the exported asset package. |

Click **Ok** to start the import. WATCHOUT reads the export package and copies the assets into the current Asset Manager.

**Key behaviors:**

- **Asset identities are preserved.** Imported assets keep the same internal identifiers they had on the original system. This means timeline references, cue assignments, and all other links remain valid after import.
- **Duplicates are skipped.** If an asset with the same identity already exists in the current Asset Manager in a working state, the import skips it. This makes it safe to re-import a package without creating duplicates.
- **Failed assets are replaced.** If an asset previously failed during optimization, importing a working copy of that asset replaces the failed entry.
- **All-or-nothing safety.** The import either succeeds completely or rolls back entirely. If any asset in the batch fails to copy (due to disk space, permissions, or file corruption), all assets from that import are removed. This prevents partially imported shows that could cause unpredictable behavior.

:::warning
If the source node is a remote machine, the import path must be accessible via WATCHOUT's remote file access settings. If the path is not permitted, a dialog appears explaining how to configure remote access.
:::

### Merge Assets

When importing from an export package that is stored on the same physical disk as the Asset Manager, WATCHOUT offers the option to **Merge Assets** instead of copying. Merging moves files directly rather than copying them, which is significantly faster for large media libraries. However, merging consumes the export package — the files are relocated, so the export can only be used once.

:::tip
Use Merge Assets when deploying from a local export to the same machine's Asset Manager. Use standard import (copy) when working with portable drives or network locations where you want to keep the export package intact for reuse.
:::

### Pre-Downloading Assets to Runners

For shows with large media libraries, you can push selected assets to specific Runners before the show goes online. This reduces the time needed when you go online because the media is already in place on the display servers.

1. Select the assets to pre-download in the Assets window.
2. Right-click and choose **Transfer Assets > Download to Runners**.
3. In the dialog, select one or more Runners to receive the assets. Use **Select All** or **Clear** to manage the selection.
4. Click **Ok** to start the transfer.

:::warning
Pre-downloading transfers media over the network to Runners. This operation may temporarily affect playback performance if a show is already running, and it may interfere with automatic file transfers that occur when going online. Plan pre-downloads during non-critical periods.
:::

For details on how assets are distributed to Runners during normal show operation, see [Asset Transfer](./10-asset-transfer.md).

### Codec Mapping

The term "mapping" in the context of asset management also refers to **codec mapping** — the rules that determine how the optimizer converts source media formats into playback-optimized formats. For example, an H.264 video might be mapped to HEVC for GPU-accelerated decoding, or a ProRes file might be mapped to NotchLC.

Codec mapping is configured in the **Asset Manager Settings** dialog, accessible by right-clicking in the Assets window and choosing **Asset Manager Settings**. The dialog shows each source format with its configured output format, and lets you override the defaults to match your hardware capabilities and quality requirements.

For the complete guide to codec mappings, quality levels, track management, and bandwidth settings, see [Asset Manager Settings](./11-asset-manager-settings.md).

### Best Practices

- **Export before making major changes.** Create an export as a checkpoint before restructuring timelines, deleting assets, or changing codec settings. The export is a complete, self-contained archive you can import to restore.

- **Verify assets after import.** After importing, check the Assets window to confirm all assets show a healthy status. If the import encountered an error, all assets from that batch will have been removed — check the error message, fix the underlying issue (disk space, permissions), and re-import.

- **Check codec settings on the target system.** If the target system has different hardware (for example, GPUs without HEVC decode support), review the codec mappings in [Asset Manager Settings](./11-asset-manager-settings.md) before re-optimizing content.

- **Use pre-download for large venue deployments.** When deploying hundreds of gigabytes of media, start pre-downloading to Runners well in advance of showtime. Monitor the transfer progress in the Node Info panel.

- **Use Find Cues before deleting assets.** Before deleting or replacing assets, use the **Find Cues** feature to check whether any timeline cues reference them. This prevents broken references during playback.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Export takes a long time on certain assets | Some assets are still being optimized and the export is waiting for them to finish | Wait for optimization to complete, or cancel and re-export after all assets are ready |
| Cannot start a second export to the same folder | Only one export or import operation can use a given folder at a time | Wait for the current operation to finish before starting another |
| Import reports all assets skipped | The same assets already exist in the current Asset Manager | Expected behavior — identical assets are not re-imported. No action needed. |
| Import failed and all assets were removed | One asset in the batch could not be copied, triggering the all-or-nothing safety rollback | Check the error message for the specific cause (disk space, permissions, corrupt file), fix it, and re-import |
| Assets show as still importing after a restart | A previous import was interrupted by a crash or unexpected shutdown | These entries are automatically cleaned up on restart. Re-import the package to complete the operation. |
| Remote path not accessible during import | The path is not included in WATCHOUT's remote file access settings | Add the path to the remote access allowlist in the WATCHOUT administration settings |
| Merge Assets option not available | The export package is not on the same physical disk as the Asset Manager | Use standard import (copy) instead, or move the export package to the same disk first |

### See Also

- [Asset Manager](./01-asset-manager.md) — overview of the asset pipeline and optimization stages
- [Asset Transfer](./10-asset-transfer.md) — how assets are distributed to Runners during show playback
- [Asset Manager Settings](./11-asset-manager-settings.md) — codec mapping, quality levels, track management, and bandwidth configuration
- [Asset Properties](./03-asset-properties.md) — understanding asset status and metadata
- [Formats and Codecs](./04-formats-codecs.md) — supported media formats and optimization output details
