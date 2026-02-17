---
title: "Asset Manager"
---


## Asset Manager

**The Asset Manager is the centralized service that handles the entire lifecycle of media in a WATCHOUT 7 show** — from ingesting source files, through optimization (transcoding to GPU-friendly playback codecs), to distributing the results across every display server on the network. Every show has exactly one Asset Manager, and understanding how it works is essential for managing media at any scale.

### How the Asset Pipeline Works

When a source file is added to the show — whether by drag-and-drop, the Web UI, or a watched folder — it passes through a multi-stage pipeline before it reaches the display servers:

1. **Upload** — the source file is copied into the Asset Manager's internal storage, organized by asset UUID. The asset state changes to `Uploading` with tracked progress.
2. **Optimization** — the optimizer transcodes the source into a GPU-friendly playback codec (HAP by default). The asset state changes to `Optimizing`. Optimized data is stored as content-addressed chunks using Blake3 hashes, enabling deduplication across assets.
3. **Storage** — both the original source and the optimized output are retained. The asset database (`assetdb.json`) is updated atomically to prevent corruption. Each asset's storage is split into **exclusive** data (unique to that asset) and **shared** data (deduplicated chunks referenced by multiple assets).
4. **Distribution** — when the show goes online, optimized assets are transferred to each Runner (display server) over the network. Runners use 2 concurrent download workers to pull data from the Asset Manager on port 3023.

[[WIDGET:asset-pipeline-flow]]

:::warning
Only one Asset Manager can serve a show at a time. If the Asset Manager node goes offline, no new assets can be added, optimized, or distributed until it is restored. Plan your network topology accordingly — the Asset Manager node should be your most reliable machine.
:::

### Optimization Priority

The optimizer processes assets in a priority order based on type. Assets that are least efficient to stream in their raw form are prioritized highest:

| Priority | Asset Type | Reason |
|---|---|---|
| Highest | Image | Small, fast to optimize — clear the queue quickly |
| High | Other (Model, Font, etc.) | Lightweight processing |
| Medium | Audio | Moderate processing time |
| Low | Video | Longer transcoding, but source is already streamable |
| Lowest | Image Sequence | Thousands of individual frames require the most processing time |

This ordering ensures that quick-to-process assets are available sooner, while long-running video and sequence optimizations proceed in the background.

### The Assets Window

The Assets window is the primary interface for browsing and managing media. Open it from **Window → Assets** or press **Ctrl+2**.

<!-- screenshot: Assets window overview showing toolbar, search bar, tree table with folders and assets -->

The window displays assets in a tree table with the following default columns:

- **Name** — file name, with an icon indicating asset type and status.
- **Image** — thumbnail preview (shown for video, image, SVG, composition, and font assets).
- **Dimensions** — pixel resolution (width × height) or 3D bounding box.
- **Duration** — length for video and audio assets (HH:MM:SS.ms).
- **Date** — creation or modification timestamp.

Additional columns can be enabled from the column menu (gear icon in the top-right corner):

- **Type** — the asset kind (Video, Image, Audio, etc.).
- **FPS** — frame rate for video assets.
- **Codec** — the optimized or original codec name.
- **Color Space** — color space and transfer function (e.g. Rec. 709, sRGB, Rec. 2100 PQ).
- **Channels** — audio channel count.
- **Original Path** — the source file location on disk.

### Asset Status Indicators

Each asset displays a status icon next to its name:

- **Star** — the asset is new (not yet clicked or viewed since it was added).
- **Hourglass** — the asset is pending optimization (waiting in the queue).
- **Upload arrow** — the asset is currently being uploaded to the Asset Manager.
- **Gears** — the asset is currently being optimized.
- **Recycle icon** — the asset is a dynamic (auto-updating) asset.
- **Progress bar** — a linear progress bar appears beneath the name during upload or optimization.

Assets that failed to optimize are shown with a **red name**. Select the asset and check the Properties panel for error details — the `Fail` state includes a specific error message from the optimizer.

### Adding Assets

There are several ways to add media to a show:

- **Drag and drop** — drag files directly from your file manager into the Assets window. Drop onto a folder row to place them in that folder.
- **Add Media File** — right-click in the Assets window and choose **New → Add Media File**, or use the menu shortcut. A file browser opens to select one or more files.
- **Add Image Sequence** — right-click and choose **New → Add Image Sequence**, then select the folder containing the numbered frames (see [Image Sequences](07-image-sequences.md)).
- **Asset Watcher** — configure watched folders that automatically import new or changed files (see [Asset Watcher](09-asset-watcher.md)).
- **Web User Interface** — upload files remotely through the browser-based interface at `http://<asset-manager-ip>:3023` (see [Web User Interface](08-web-user-interface.md)).

:::tip
When a single folder or dynamic asset is selected, newly added files are placed inside that folder automatically.
:::

### Organizing Assets with Folders

Create folders to keep large shows organized:

1. Right-click in the Assets window and choose **New → New Folder**.
2. Enter a name and press **OK**.
3. Drag assets into the folder to move them.

Folder operations:

- **Collapse All Folders** / **Expand All Folders** — available from the context menu to quickly navigate large asset trees.
- **Drag and drop reorder** — drag assets or folders to reorder them within the same parent.
- Folder open/closed states are remembered per-node and persist between sessions.

:::warning
Composition and dynamic asset folders are special containers managed by the system. You cannot move assets into or out of composition folders, and dynamic asset folders enforce strict versioning rules. See [Dynamic Assets](06-dynamic-assets.md) for details.
:::

### Searching and Filtering

Click the magnifying glass icon (or press **Ctrl+F** when the Assets window is active) to open the search panel.

<!-- screenshot: Search panel expanded, showing text field, type dropdown, and filter checkboxes -->

The search panel provides:

- **Text search** — type one or more keywords. The list filters to assets whose name or folder path contains all keywords (case-insensitive).
- **Type filter** — restrict results by asset type: All, Video, Image, Audio, Model, Other, Failed, Used, or Unused.
- **Only New** — show only assets that haven't been viewed yet.
- **Only Selected Cues** — show only assets referenced by currently selected cues.
- **Preparing** — show only assets that are currently uploading or optimizing.

When a search or type filter is active, folders expand automatically so matching assets are visible. Press **Escape** to clear the search and restore the previous folder state.

### Sorting

Click any sortable column header to sort the asset list by that column. Click again to reverse the sort direction. When a column sort is active, the tree view temporarily flattens into a flat list — folder hierarchy is restored when sorting is cleared.

### Context Menu

Right-click in the Assets window to access:

- **New** — create folders, shapes (Rectangle, Ellipse, Text), Art-Net fixtures, dynamic assets, or asset versions.
- **Delete** — remove selected assets (with confirmation). Assets currently in use on the timeline require additional confirmation.
- **Find Cues** — select all cues on the timeline that reference the selected asset(s).
- **Collapse/Expand All Folders** — toggle folder visibility.
- **Asset Manager Settings** — open the codec and optimization settings dialog (see [Asset Manager Settings](11-asset-manager-settings.md)).
- **Transfer Assets** — export selected or all assets, import from another location, or cache assets on specific Runners (see [Asset Transfer](10-asset-transfer.md) and [Import, Export, and Mapping](12-import-export-and-mapping.md)).
- **Asset Web** — open the web-based asset management interface in your browser.

### Keyboard Navigation

| Key | Action |
|---|---|
| **Up / Down arrows** | Move selection through the asset list |
| **Left / Right arrows** | Collapse or expand folders |
| **Home / End** | Jump to the first or last asset |
| **Enter** | Open the Properties panel for the selected asset |
| **Delete** | Delete the selected asset(s) |
| **Escape** | Clear the search and deselect all assets |
| **Ctrl+A** | Select all visible assets |
| **Ctrl+F** | Open the search panel |

### Relationship to Other Systems

The Asset Manager interacts with several other WATCHOUT components:

| Component | Interaction |
|---|---|
| **Director** | Coordinates asset version upgrades across Runners; forwards show updates that reference new or changed assets |
| **Runner** | Downloads optimized assets from the Asset Manager; uses previously downloaded versions as substitutes while new versions transfer |
| **Producer** | Provides the UI for the Assets window; sends add/delete/organize commands to the Asset Manager |
| **Optimizer** | Runs as a subprocess of the Asset Manager; transcodes source files to playback codecs |
| **Web UI** | Embedded web server (port 3023) serving an upload and browse interface |
| **Asset Watcher** | Monitors file system folders for new/changed files and triggers automatic import |

The Asset Manager also exposes a **Server-Sent Events (SSE)** endpoint at `/sse` that provides real-time state updates to connected clients (including the Producer's Assets window). A heartbeat ping is sent every 10 seconds to keep connections alive.

### Best Practices

- **Name assets consistently.** Establish a naming convention early (e.g., `SCENE_ELEMENT_VERSION.ext`) and enforce it across the team. Consistent naming makes search filters effective and keeps large asset trees navigable.

- **Organize by scene or zone, not by type.** Grouping assets by where they appear in the show (e.g., `Act1/`, `Lobby/`, `MainStage/`) is generally more useful than grouping by format (e.g., `Videos/`, `Images/`), since you typically work on one scene at a time.

- **Pre-optimize before show day.** Large shows with hundreds of video assets can take hours to optimize. Add all media well before the first rehearsal and verify that every asset reaches the `Ok` state. Do not rely on real-time optimization during a live event.

- **Plan disk space.** HAP-encoded video is significantly larger than the source file (typically 3–10× larger depending on codec and quality). Ensure the Asset Manager node and all Runners have sufficient storage. Use the asset footprint information (exclusive + shared bytes) to estimate requirements.

- **Use the dedicated network.** Asset transfers saturate network bandwidth. Isolate WATCHOUT traffic on a dedicated network segment, and use 10 Gbps links for large shows.

- **Monitor optimization status.** Use the **Preparing** filter to watch for assets stuck in the optimization queue. A red asset name indicates a failure — check the error in the Properties panel and re-add the asset or change codec settings.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Asset stays in `Optimizing` state indefinitely | The optimizer process may have crashed or the source file is corrupt | Check the Runner logs for optimizer errors; try re-adding the asset; verify the source file plays in a media player |
| Asset name is red (failed state) | The optimizer could not process the source file — unsupported codec, corrupt data, or insufficient disk space | Open the Properties panel to read the specific error message; re-encode the source in a supported format; check disk space |
| Assets not appearing on Runners | Transfer has not started (show not online) or bandwidth limit is too restrictive | Verify the show is online; check bandwidth limit in [Asset Manager Settings](11-asset-manager-settings.md); verify network connectivity to each Runner |
| Uploaded file via Web UI doesn't appear | Upload still in progress, or browser connection was interrupted | Check the web UI at `http://<asset-manager-ip>:3023` for upload status; retry the upload; check that the Asset Manager service is running |
| Duplicate assets after re-import | Assets imported from an export package already exist in the show | Use the asset UUID to identify duplicates; delete the older copies after verifying the new ones are fully optimized |
| Optimization is very slow | Large video files or image sequences with thousands of frames | This is expected behavior — see the [optimization priority table](#optimization-priority). Pre-optimize overnight for large shows |
