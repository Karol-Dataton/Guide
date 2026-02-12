---
title: "Asset Watcher"
---


## Asset Watcher

The Asset Watcher monitors designated folders on the Asset Manager node’s file system. When new or changed files appear in a watched folder, they are automatically imported into the show and processed through the optimization pipeline.

### Setting Up a Watch Folder

Watch folders are configured in the Network window, under the Asset Manager node's settings:

1. In the Network window, locate the node designated as the Asset Manager.
2. Click **Add Folder to Watch**.
3. In the dialog, configure:
   - **Folder to Watch** – the path on the Asset Manager’s file system to monitor. Use the file browser or type the path directly.
   - **Asset Path** – an optional sub-path within the show’s asset tree where imported files should be placed. Leave empty to place them at the root.
4. Click **OK** to start watching.

<!-- screenshot: Add Watch Folder dialog showing folder path field and asset path field -->

The folder path is validated before the watcher is created. The system checks that the path exists and is accessible on the Asset Manager node, and that it does not conflict with the Asset Manager’s internal storage directories.

### How It Works

The Asset Watcher continuously scans the watched folder for changes:

1. **New files** – when a new file appears in the folder, it is automatically imported as an asset. The file is copied into the Asset Manager’s storage and optimization begins.
2. **Modified files** – if a source file that was previously imported is modified (detected by file system events), the asset is re-imported and re-optimized. The updated content is distributed to display servers.
3. **Organization** – imported files are placed in the asset path specified when the watch folder was created. If no path was specified, they go to the root of the asset tree.

The watcher processes files using the same optimization settings (codec mapping, quality, track management) as manually added assets.

### Removing a Watch Folder

To stop watching a folder, locate it in the Asset Manager node’s settings in the Network window and remove it. Existing assets that were imported from the folder remain in the show.

### Local vs. Remote Configuration

If the Asset Manager runs on the same machine as the Producer, the folder path is validated as a local disk folder (checking that the directory exists). If the Asset Manager runs on a remote node, the path is validated on that remote machine.

### Use Cases

- **Collaborative workflows** – content creators drop rendered files into a shared folder. The operator’s show picks them up automatically.
- **Live content updates** – update content during a running show by overwriting files in the watched folder. The watcher detects the change and triggers re-optimization.
- **Render farm integration** – point the watcher at a render output directory. Completed renders are imported as they finish.
- **Dynamic asset updates** – combine the watcher with dynamic assets to automatically rotate content versions. New files dropped into the folder become new versions of the corresponding dynamic asset.
