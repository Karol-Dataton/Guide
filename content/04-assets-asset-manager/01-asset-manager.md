---
title: "Asset Manager"
---


## Asset Manager

The Asset Manager is the background service that handles all media in a WATCHOUT 7 show. It accepts source files, optimizes them for real-time playback, and distributes the results to every display server on the network.

### Overview

Every WATCHOUT show has exactly one Asset Manager, which runs on the node designated in the show's host configuration. The Asset Manager provides:

- **Centralized storage** – all media files are managed from a single location.
- **Automatic optimization** – source files are transcoded to GPU-friendly playback codecs (HAP by default).
- **Network distribution** – optimized assets are transferred to display servers when a show goes online.
- **Version tracking** – changes to source files are detected and, if configured, re-optimized automatically.

When an asset is added, the Asset Manager copies the source file, runs the optimizer, and stores both the original and the optimized version. Display servers receive only the optimized file.

### The Assets Window

The Assets window is the primary interface for browsing and managing media. Open it from **Window → Assets** or press **Ctrl+2**.

<!-- screenshot: Assets window overview showing toolbar, search bar, tree table with folders and assets -->

The window displays assets in a tree table with the following default columns:

- **Name** – file name, with an icon indicating asset type and status.
- **Image** – thumbnail preview (shown for video, image, SVG, composition, and font assets).
- **Dimensions** – pixel resolution (width × height) or 3D bounding box.
- **Duration** – length for video and audio assets (HH:MM:SS.ms).
- **Date** – creation or modification timestamp.

Additional columns can be enabled from the column menu (gear icon in the top-right corner):

- **Type** – the asset kind (Video, Image, Audio, etc.).
- **FPS** – frame rate for video assets.
- **Codec** – the optimized or original codec name.
- **Color Space** – color space and transfer function (e.g. Rec. 709, sRGB, Rec. 2100 PQ).
- **Channels** – audio channel count.
- **Original Path** – the source file location on disk.

### Asset Status Indicators

Each asset displays a status icon next to its name:

- **Star** – the asset is new (not yet clicked or viewed since it was added).
- **Hourglass** – the asset is pending optimization (waiting in the queue).
- **Upload arrow** – the asset is currently being uploaded to the Asset Manager.
- **Gears** – the asset is currently being optimized.
- **Recycle icon** – the asset is a dynamic (auto-updating) asset.
- **Progress bar** – a linear progress bar appears beneath the name during upload or optimization.

Assets that failed to optimize are shown with a red name. Select the asset and check the Properties panel for error details.

### Adding Assets

There are several ways to add media to a show:

- **Drag and drop** – drag files directly from your file manager into the Assets window. Drop onto a folder row to place them in that folder.
- **Add Media File** – right-click in the Assets window and choose **New → Add Media File**, or use the menu shortcut. A file browser opens to select one or more files.
- **Add Image Sequence** – right-click and choose **New → Add Image Sequence**, then select the folder containing the numbered frames.
- **Asset Watcher** – configure watched folders that automatically import new or changed files (see [Asset Watcher](../09-asset-watcher)).
- **Web User Interface** – upload files remotely through the browser-based interface (see [Web User Interface](../08-web-user-interface)).

:::info
**Tip:** When a single folder or dynamic asset is selected, newly added files are placed inside that folder automatically.
:::

### Organizing Assets with Folders

Create folders to keep large shows organized:

1. Right-click in the Assets window and choose **New → New Folder**.
2. Enter a name and press **OK**.
3. Drag assets into the folder to move them.

Folder operations:

- **Collapse All Folders** / **Expand All Folders** – available from the context menu to quickly navigate large asset trees.
- **Drag and drop reorder** – drag assets or folders to reorder them within the same parent.
- Folder open/closed states are remembered per-node and persist between sessions.

:::info
**Note:** Composition and dynamic asset folders are special containers managed by the system. You cannot move assets into or out of composition folders.
:::

### Searching and Filtering

Click the magnifying glass icon (or press **Ctrl+F** when the Assets window is active) to open the search panel.

<!-- screenshot: Search panel expanded, showing text field, type dropdown, and filter checkboxes -->

The search panel provides:

- **Text search** – type one or more keywords. The list filters to assets whose name or folder path contains all keywords (case-insensitive).
- **Type filter** – restrict results by asset type: All, Video, Image, Audio, Model, Other, Failed, Used, or Unused.
- **Only New** – show only assets that haven't been viewed yet.
- **Only Selected Cues** – show only assets referenced by currently selected cues.
- **Preparing** – show only assets that are currently uploading or optimizing.

When a search or type filter is active, folders expand automatically so matching assets are visible. Press **Escape** to clear the search and restore the previous folder state.

### Sorting

Click any sortable column header to sort the asset list by that column. Click again to reverse the sort direction. When a column sort is active, the tree view temporarily flattens into a flat list — folder hierarchy is restored when sorting is cleared.

### Context Menu

Right-click in the Assets window to access:

- **New** – create folders, shapes (Rectangle, Ellipse, Text), Art-Net fixtures, dynamic assets, or asset versions.
- **Delete** – remove selected assets (with confirmation). Assets currently in use on the timeline require additional confirmation.
- **Find Cues** – select all cues on the timeline that reference the selected asset(s).
- **Collapse/Expand All Folders** – toggle folder visibility.
- **Asset Manager Settings** – open the codec and optimization settings dialog.
- **Transfer Assets** – export selected or all assets, import from another location, or cache assets on specific runners.
- **Asset Web** – open the web-based asset management interface in your browser.

### Keyboard Navigation

- **Up / Down arrows** – move selection through the asset list.
- **Left / Right arrows** – collapse or expand folders.
- **Home / End** – jump to the first or last asset.
- **Enter** – open the Properties panel for the selected asset.
- **Delete** – delete the selected asset(s).
- **Escape** – clear the search and deselect all assets.
- **Ctrl+A** – select all visible assets.
- **Ctrl+F** – open the search panel.
