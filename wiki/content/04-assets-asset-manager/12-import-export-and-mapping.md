---
title: "Import, Export, and Mapping"
---


## Import, Export, and Mapping

**The Assets window provides workflows for exporting optimized assets to external storage, importing them onto another system, and controlling how the optimizer maps source codecs to output formats.** Export creates a self-contained package with the asset database and all chunk files; import reads that package and atomically merges it into the current Asset Manager. Codec mappings let you override the optimizer's default transcoding decisions for specific input formats.

### How Export Works

Export assembles a portable asset package using an exclusive locking mechanism to ensure consistency:

| Step | Action |
|------|--------|
| 1 | **Acquire lock** — opens (or creates) `assetdb.json` at the target location with an exclusive file lock. No other process can read or write this file until the export completes. |
| 2 | **Create shared folder** — creates a `shared/` directory at the target for content-addressed chunk files. |
| 3 | **Copy loop** — scans for assets in `Ok` state, copies their UUID folders and shared chunks to the target, skipping files already present. Assets still uploading or optimizing are retried on the next scan pass. |
| 4 | **Write asset database** — builds a filtered `assetdb.json` containing only the exported assets (plus their parent folder hierarchy) and writes it to the locked file. |
| 5 | **Release lock** — drops the file handle, allowing other processes to import from the package. |

:::warning
**Export holds an exclusive lock on the target `assetdb.json` for the entire duration.** Multiple exports to the same directory will queue — only one can proceed at a time. The order is non-deterministic. Do not manually modify the export folder while an export is in progress.
:::

### Export Package Structure

The export creates a `__WO_EXPORTED_ASSETS` folder at the target location with this structure:

```
<target path>/
  __WO_EXPORTED_ASSETS/
    assetdb.json                 # Filtered asset database (only exported assets)
    shared/                      # Content-addressed chunk files (Blake3-hashed)
      <hash-1>.chunk
      <hash-2>.chunk
      ...
    <asset-uuid-1>/              # Per-asset folder
      asset.json                 # Full-resolution part descriptor
      asset_preview.json         # Preview part descriptor
      thumbnail.jpg              # Asset thumbnail
      ...
    <asset-uuid-2>/
      ...
```

Assets in `Fail` or `Cancelled` state are excluded from the export. Assets still in `Uploading`, `Optimizing`, or `Importing` state are deferred until they complete — the export loop retries until all requested assets are ready or the job is cancelled.

### Export States

Each export job progresses through these states:

| State | Description |
|-------|-------------|
| **Pending** | Job is queued but has not started |
| **Scanning** | Comparing assets to determine what needs copying |
| **Transferring** | Copying asset files and chunks to the target |
| **Waiting** | Paused, retrying after a temporary error (with deadline) |
| **Success** | All requested assets exported successfully |
| **Cancelled** | Export stopped by the user |

Export progress includes detailed metrics: bytes/files copied, bytes/files skipped (already present at target), start time, and up to 100 error reports.

### Exporting Assets

From the Assets window context menu, choose **Transfer Assets** and then:

- **Export All** — exports every asset in the show.
- **Export Selected** — exports only the currently selected assets.

Both options open a dialog where you select:

1. **Target node** — the machine to export to (can be the local machine or any connected node).
2. **Destination path** — the folder on the target node where the `__WO_EXPORTED_ASSETS` folder will be created.

<!-- screenshot: Export dialog showing node selection and destination path -->

### How Import Works

Import reads an export package and atomically merges its contents into the current Asset Manager:

| Step | Action |
|------|--------|
| 1 | **Acquire lock** — opens the source `assetdb.json` with an exclusive lock to prevent concurrent reads. |
| 2 | **Read asset database** — deserializes the exported asset entries. |
| 3 | **Filter and stage** — for each asset: skips if already present in `Ok`/`Uploading`/`Optimizing`/`Importing` state; overrides if in `Fail`/`Cancelled` state; sets state to `Importing` for new entries. |
| 4 | **Copy data** — copies (or moves) asset folders and shared chunks from the source to the Asset Manager's storage. |
| 5 | **Commit or rollback** — if all assets copied successfully, transitions all imported assets to `Ok` state atomically. If any asset fails, **all imports are rolled back** (removed from the database entirely). |

:::warning
**Import is atomic — it either fully succeeds or fully rolls back.** If any single asset fails to copy, all assets from that import batch are removed from the database. This prevents partially-imported shows.
:::

:::info
**Crash recovery:** If the Asset Server restarts while an import is in progress, any assets still in `Importing` state are automatically removed from the database on startup. This ensures the system never starts with partially-imported data.
:::

### Importing Assets

From the Assets context menu, choose **Transfer Assets → Import**.

1. **Source node** — the machine where the export package resides.
2. **Source path** — the folder containing the `__WO_EXPORTED_ASSETS` directory (or the path to `assetdb.json` directly).

The import process copies files into the Asset Manager's storage. If the source node is the local machine but the Asset Manager runs on a remote node, WATCHOUT checks that the path is accessible via the remote file access allowlist. If the path is not permitted, a dialog appears explaining how to configure remote access.

**Key behaviors:**

- **Asset IDs are preserved** — imported assets keep their original UUIDs. This means if you export from system A and import on system B, the asset IDs remain identical.
- **No ID remapping** — there is no mapping table between old and new IDs. Assets are inserted with their original identifiers.
- **Existing assets are not overwritten** — if an asset with the same ID already exists in a non-failed state, the import skips it.
- **Original source paths are cleared** — imported assets have their `orig_path` set to `None`, since the original source file location is not relevant on the target system.

### Pre-Caching Assets on Runners

For shows with large media libraries, you can pre-cache selected assets onto specific Runners without going fully online:

1. Select the assets to cache.
2. Right-click → **Transfer Assets → Cache Selected Assets**.
3. Choose one or more Runners.
4. Click **OK**.

This pushes the optimized files to the selected Runners ahead of time, reducing the time needed when the show goes online. For details on the transfer mechanism, see [Asset Transfer](./10-asset-transfer.md).

### Codec Mapping (Optimizer Settings)

The **Asset Manager Settings** dialog (accessible from the Assets context menu) includes the codec mapping section. This controls how the optimizer converts source codecs to output formats — this is what "mapping" refers to in the context of the optimizer, not asset ID remapping.

Each row in the mapping table shows:

| Column | Description |
|--------|-------------|
| **In** | The source codec detected in the imported file |
| **Out** | The output codec the optimizer will produce |
| **Default** | The system's recommended output for that source |

You can override individual mappings by changing the output dropdown. Non-default mappings are highlighted. Use the **Reset All** button to revert all overrides. Codec mappings are stored in `optimizer_mapping.json` and persisted per Asset Manager.

For details on quality levels, track management, and default codec mappings, see [Asset Manager Settings](./11-asset-manager-settings.md).

[[WIDGET: interactive-export-import-flow — animated diagram showing the export package assembly, file locking, and atomic import commit/rollback]]

### Best Practices

- **Export before making changes** — create an export before major show modifications as a backup. The export is a complete, self-contained archive.
- **Verify after import** — check that all assets appear with `Ok` state after importing. Assets that failed to copy will have been rolled back.
- **Use copy mode for archives** — the default copy mode preserves the source package. Move mode is faster but removes assets from the source after successful import.
- **Check codec mappings on the target** — if the target system has different hardware capabilities (e.g., no GPU for HEVC decoding), update codec mappings in [Asset Manager Settings](./11-asset-manager-settings.md) before re-optimizing.
- **Plan for exclusive locks** — exports and imports hold exclusive file locks for their entire duration. Do not attempt to export to and import from the same location simultaneously.
- **Use Find Cues before deleting** — before deleting or replacing critical assets, use **Find Cues** to ensure no timeline references will break.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Export stalls on specific asset | Asset is still in `Uploading` or `Optimizing` state | Wait for the asset to finish processing, or cancel and re-export after it completes |
| "File is locked" error on export | Another export or import is using the target `assetdb.json` | Wait for the other operation to complete; only one can hold the lock at a time |
| Import reports all assets skipped | Assets already exist in `Ok` state on the target (same UUIDs) | Expected behavior — identical assets are not re-imported |
| Import rolled back entirely | One asset failed to copy, triggering atomic rollback | Check the error message; fix the issue (disk space, permissions, corrupt file) and retry |
| Assets show `Importing` state after restart | Previous import was interrupted by a crash or shutdown | Normal — these are automatically cleaned up on startup. Re-import the package. |
| Remote path not accessible during import | Path not in the remote file access allowlist | Add the path to the allowlist in the WATCHOUT administration settings |
| Export package larger than expected | Content-addressed chunks are not deduplicated against existing exports | Each export is self-contained; chunk deduplication only applies within a single export |

### See Also

- [Asset Manager](./01-asset-manager.md) — asset pipeline overview and optimization stages
- [Asset Transfer](./10-asset-transfer.md) — how assets are distributed to Runners during show playback
- [Asset Manager Settings](./11-asset-manager-settings.md) — codec mapping configuration and quality levels
- [Asset Properties](./03-asset-properties.md) — understanding asset states including `Importing`
- [Formats and Codecs](./04-formats-codecs.md) — supported codecs and optimization output details
