---
title: "Asset Watcher"
---


## Asset Watcher

**The Asset Watcher monitors designated folders on the Asset Manager node's file system and automatically imports new or changed files into the show.** This enables unattended content ingestion workflows — content creators, render farms, or automated systems can drop files into a watched folder, and the Asset Manager picks them up, optimizes them, and distributes them to display servers without any manual intervention.

The Asset Watcher is a key component in collaborative and live-update workflows where media changes frequently and the show must stay current without operator involvement.

### How It Works Internally

The Asset Watcher uses **operating system-level file system events** (Windows `ReadDirectoryChangesWatcher`) rather than periodic polling. This means:

- **Changes are detected instantly** — the OS notifies WATCHOUT as soon as a file is created, modified, or deleted. There is no scan interval or polling delay.
- **Burst debouncing** — when multiple file changes occur in rapid succession (e.g., a render farm writing many frames at once), the watcher collects them into a single batch using a 50ms debounce window. This prevents triggering dozens of separate import operations for a burst of file writes.
- **Low system overhead** — because event-driven monitoring does not require continuous directory scanning, the watcher consumes negligible CPU resources even when watching large folders.

When the watcher detects a change:

1. **New files** — the file is automatically imported as an asset. It is copied into the Asset Manager's internal storage and optimization begins using the current codec mapping and quality settings.
2. **Modified files** — if a source file that was previously imported is modified, the asset is re-imported and re-optimized. The updated content replaces the previous version and is distributed to display servers.
3. **Organization** — imported files are placed at the asset path specified when the watch folder was configured. If no path was specified, they go to the root of the asset tree.

The watcher processes files using the same optimization settings (codec mapping, quality, track management) as manually added assets. See [Asset Manager Settings](11-asset-manager-settings.md) for details.

### Setting Up a Watch Folder

Watch folders are configured in the Network window, under the Asset Manager node's settings:

1. In the Network window, locate the node designated as the Asset Manager.
2. Click **Add Folder to Watch**.
3. In the dialog, configure:
   - **Folder to Watch** — the path on the Asset Manager's file system to monitor. Use the file browser or type the path directly.
   - **Asset Path** — an optional sub-path within the show's asset tree where imported files should be placed. Leave empty to place them at the root.
4. Click **OK** to start watching.

<!-- screenshot: Add Watch Folder dialog showing folder path field and asset path field -->

The folder path is validated before the watcher is created. The system checks that:

- The path exists and is accessible on the Asset Manager node.
- The path does not conflict with the Asset Manager's internal storage directories.
- The path is a local disk path (for local Asset Managers) or accessible on the remote machine (for remote Asset Managers).

### Removing a Watch Folder

To stop watching a folder, locate it in the Asset Manager node's settings in the Network window and remove it. Existing assets that were imported from the folder remain in the show — removing the watch only stops monitoring for future changes.

### Local vs. Remote Configuration

| Scenario | Path Validation |
|---|---|
| Asset Manager runs on the **same machine** as the Producer | The folder path is validated as a local disk directory |
| Asset Manager runs on a **remote node** | The path is validated on that remote machine; it must be accessible from the Asset Manager's file system |

In remote configurations, ensure the watched folder path is valid on the Asset Manager node, not on the Producer machine. A common mistake is entering a local path that doesn't exist on the remote Asset Manager.

### Integration with Dynamic Assets

The Asset Watcher can work together with [Dynamic Assets](06-dynamic-assets.md) to create fully automated content rotation workflows:

1. Create a dynamic asset in the show and place it on the timeline.
2. Point the Asset Watcher at a folder where updated content will arrive.
3. When a new file arrives in the watched folder, the watcher imports it as a new version of the corresponding dynamic asset.
4. The dynamic asset automatically switches to the new version, and every cue referencing it picks up the change.

This is particularly useful for live content updates, sponsor rotations, and multi-language content swaps that need to happen without operator intervention.

### Use Cases

- **Collaborative workflows** — content creators drop rendered files into a shared folder on the Asset Manager node. The operator's show picks them up automatically without needing to manually import each file.
- **Live content updates** — update content during a running show by overwriting files in the watched folder. The watcher detects the change and triggers re-optimization. The new content reaches display servers as soon as optimization completes.
- **Render farm integration** — point the watcher at a render output directory. As the render farm completes frames or video files, they are imported into the show automatically.
- **Scheduled content changes** — combine the watcher with external scripting (e.g., a scheduled task that copies new files into the watched folder at specific times) to automate content rotations.

### Best Practices

- **Use a dedicated watched folder.** Do not point the watcher at a general-purpose directory (e.g., `Desktop` or `Downloads`). Use a dedicated, clearly named folder (e.g., `C:\WO_WatchFolder\`) to prevent accidental imports.

- **Ensure files are fully written before they appear.** If a content creation tool writes files directly into the watched folder, the watcher may detect the file before it is fully written. To avoid importing partial files, write to a staging folder first and then **move** (not copy) the completed file into the watched folder. On the same drive, a move operation is atomic and completes instantly.

- **Organize with Asset Path.** Use the Asset Path field to direct watched imports into specific subfolders in the asset tree. This prevents the root folder from becoming cluttered with auto-imported files.

- **Clean up the watched folder periodically.** The watcher does not delete source files after importing them. Over time, the watched folder can accumulate large amounts of media. Establish a cleanup procedure to archive or remove processed files.

- **Test with a single file first.** Before deploying a production watcher workflow, test with one file to verify that the import, optimization, and distribution pipeline works end-to-end.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| File is not detected after being placed in the watched folder | File was placed in a subdirectory, or the path does not match the configured watch path | Verify the watched folder path matches exactly; place files directly in the watched folder, not in subdirectories |
| File is imported but optimization fails | Source file format is unsupported or corrupt | Check the asset's error state in the Properties panel; verify the file plays in a media player |
| Partial or corrupt file is imported | The file was still being written when the watcher detected it | Write files to a staging folder first, then move them into the watched folder in a single operation |
| Watch folder validation fails | The path does not exist or is inaccessible on the Asset Manager node | Verify the path exists on the correct machine (the Asset Manager node, not the Producer); check file permissions |
| Watcher stops detecting changes after a long time | Network folder connection dropped, or OS file system event queue overflowed | Remove and re-add the watch folder; prefer local disk paths over network shares for reliability |
| Files from a network share are not detected | Network shares may not support file system change notifications reliably | Use a local folder on the Asset Manager node instead; copy files to the local folder via a script or sync tool |

:::warning
Watching **network folders** (UNC paths, mapped network drives) is unreliable because Windows file system change notifications are not guaranteed to work across network shares. For production workflows, always use a **local folder** on the Asset Manager node and copy files to it from the network.
:::
