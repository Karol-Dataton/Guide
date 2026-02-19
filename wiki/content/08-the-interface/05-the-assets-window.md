---
title: "The Assets Window"
---


## The Assets Window

The Assets window is your media library — the central place for managing all images, videos, audio files, 3D models, SVG graphics, and other resources used in your show. It connects to the **Asset Manager** service, which handles file storage, optimization, and distribution to display nodes. From this window you import new media, organize it into folders, monitor optimization progress, and drag assets onto the Stage or Timeline to create cues.

[[WIDGET:assets-window]]

### Asset Manager Connection

The Assets window requires a connection to an Asset Manager service. The connection status is displayed prominently in the window:

- **Connected** — full functionality available; the window shows your asset library
- **Offline** — the window displays an overlay message indicating the Asset Manager is not connected. Set or change the Asset Manager host from the Nodes window context menu (right-click a node and select **Use Asset Manager**).

When running without a Director connection, the Assets window also shows a demo mode banner.

### Interface Layout

The Assets window displays your media in a hierarchical tree table. The following columns are available:

| Column | Default Visible | Description |
|---|---|---|
| **Name** | Yes | File name with an icon indicating the asset type |
| **Image** | Yes | Thumbnail preview of the asset |
| **Dimensions** | Yes | Width and height in pixels (for image and video assets) |
| **Duration** | Yes | Length for video and audio files |
| **Date** | Yes | File date |
| **Type** | No | Asset type category |
| **FPS** | No | Frame rate (for video assets) |
| **Codec** | No | Encoding format |
| **Color Space** | No | Color profile information |
| **Channels** | No | Audio channel count |
| **Original Path** | No | Source file location |

Click the column chooser button to show or hide columns. Drag column headers to reorder them.

### Asset Type Icons

Each asset displays an icon in the Name column indicating its type:

| Icon | Asset Type |
|---|---|
| Music note | Audio |
| Image | Image |
| Movie | Video |
| Web/globe | 3D Model |
| Light | ArtNet Fixture |
| Gantt chart | Composition |
| Drawing box | SVG |
| Shape icons | Shapes (ellipse, rectangle, text) |

### Search and Filtering

Click the search icon or use **Ctrl+F** to reveal the search and filter panel at the top of the window.

#### Text Search

Type in the search field to filter assets by name. The list updates in real time as you type.

#### Kind Filter

The kind filter dropdown lets you narrow the list to a specific asset type:

| Filter | Shows |
|---|---|
| **All** | Every asset in the library |
| **Video** | Video files |
| **Image** | Image files |
| **Audio** | Audio files |
| **Model** | 3D models |
| **Other** | Assets that don't fit the above categories |
| **Failed** | Assets that encountered errors during import or optimization |
| **Used** | Assets referenced by at least one cue in the show |
| **Unused** | Assets not referenced by any cue |

#### Status Checkboxes

Additional checkboxes further narrow the results:

- **New** — show only recently added assets (marked with a star icon)
- **Selected Cues** — show only assets referenced by the currently selected cues
- **Preparing** — show only assets currently being optimized

### Asset Status Indicators

Each asset displays a status indicator showing its current state in the preparation pipeline:

| Indicator | Icon | Meaning |
|---|---|---|
| **Uploading** | Upload arrow | The file is being transferred to the Asset Manager |
| **Pending** | Hourglass | The asset is queued for optimization |
| **Optimizing** | Gears | The Asset Manager is processing the file for playback |
| **New** | Star | Recently added, not yet used in the show |
| **Auto-asset** | Recycle | Automatically generated asset (e.g., from a composition) |
| **Error** | Alert icon, red text | A problem occurred during import or optimization |

During uploading and optimizing, a progress bar shows the completion percentage.

### Organization

#### Folders

Create folders to organize your assets by right-clicking in the Assets window and selecting **New > Folder**. Drag assets into folders to group related media. Folders can be nested to create a hierarchical structure.

Use the context menu options **Collapse All Folders** and **Expand All Folders** to manage the tree view.

#### Reordering

Drag rows within the tree to reorder assets and move them between folders.

### Context Menu

Right-click an asset (or the window background) to access:

| Action | Description |
|---|---|
| **New** submenu | Create a new folder, add a media file, add an image sequence, create shapes, add an ArtNet fixture, add a dynamic asset, or create a version |
| **Delete** | Remove the selected asset(s) from the library |
| **Find Cues** | Locate all cues in the show that reference the selected asset |
| **Collapse All Folders** | Close all folder nodes in the tree |
| **Expand All Folders** | Open all folder nodes in the tree |
| **Codec Settings** | Configure encoding/optimization settings for the selected asset |
| **Transfer Assets** | Export assets to a file or import assets from a file |
| **Open Web UI** | Open the Asset Manager's web interface in a browser |

### Drag and Drop

The Assets window supports drag-and-drop in several directions:

- **From filesystem** — drag files from your operating system's file manager into the Assets window to import them
- **To Timeline** — drag assets onto the Timeline cue area to create cues at the drop position
- **To Stage** — drag assets onto the Stage to create cues at the visual drop location. Hold Ctrl to place on separate layers instead of in sequence.
- **To Cue List** — drag assets onto the Cue List to create or update cues

#### Double-Click

Double-click an asset (leaf node, not a folder) to activate the Properties window and display that asset's properties.

### Adding Media

There are several ways to add media to your show:

1. **Drag and drop** from the file system into the Assets window
2. **Context menu > New > Media File** — browse and select files
3. **Context menu > New > Image Sequence** — select a folder of sequentially numbered images
4. **Context menu > New > Shapes** — create built-in shape assets (ellipse, rectangle, text)
5. **Context menu > New > ArtNet Fixture** — add a lighting fixture definition
6. **Context menu > New > Dynamic Asset** — create an asset whose content updates at runtime

### Asset Versions

Assets can have multiple versions, allowing you to swap between different content files for the same cue. Use the context menu **New > Create Version** to add a version to an existing asset.

### Relationship to Other Windows

- **Timeline** — drag assets to the Timeline to create cues. See [The Timeline Window](03-the-timeline-window.md).
- **Stage** — drag assets to the Stage to place content visually. See [The Stage Window](02-the-stage-window.md).
- **Cue List** — use the Follow Asset toggle in the Cue List to see all cues using a selected asset. See [The Cue List Window](04-the-cue-list-window.md).
- **Properties** — selecting an asset shows its properties (file information, media specifications, codec settings) in the Properties panel. See [The Properties Panel](06-the-properties-panel.md).
