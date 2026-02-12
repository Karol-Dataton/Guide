---
title: "The Assets Window"
---


## The Assets Window

The **Assets** window is your media library—the central repository for all images, videos, audio files, and other resources available for use in your show. It connects to the **Asset Manager** service to provide organization, search, and status tracking for your project media.

### Asset Manager Connection

The Assets window requires connection to an **Asset Manager** service to function. Connection status displays in the window:

*   **Connected** – Full functionality available
*   **Offline** – Window shows "Asset Manager offline" with cloud-off icon

Configure the Asset Manager host via **Network → Use Asset Manager**.

### Interface Layout

The Assets window displays your media in a hierarchical tree table:

| Column | Description |
| --- | --- |
| **Name** | File name with icon indicating asset type |
| **Status** | Optimization and transfer state |
| **Duration** | Length for video and audio files |
| **Resolution** | Width × Height for image and video files |
| **Format** | File type and codec information |

### Adding Media

#### Drag and Drop

Drag files directly from Windows Explorer into the Assets window.

#### Menu Commands

*   **Media → Add Media File** – Browse and select individual files
*   **Media → Add Image Sequence** – Select a folder containing numbered image sequences

#### Supported Formats

WATCHOUT 7 supports a wide variety of media types:

*   **Images** – PNG, JPEG, TIFF, BMP, WebP, EXR, PSD
*   **Video** – MP4, MOV, AVI, MKV, HAP, ProRes, H.264, H.265/HEVC
*   **Audio** – WAV, MP3, AAC, FLAC, OGG
*   **Other** – SVG, PDF, image sequences

### Search and Filtering

#### Search Bar

Click the magnifying glass icon or press `Ctrl+F` to reveal the search panel:

*   **Text Search** – Find assets by name
*   **Type Filter** – Filter by media type (images, video, audio, etc.)
*   **Status Filters** – Show only new assets or assets being prepared

Press `Escape` to close the search panel and reset filters.

#### Filter Options

| Filter | Description |
| --- | --- |
| **Only New** | Show assets recently added |
| **Preparing** | Show assets currently being optimized |

### Organization

#### Folders

Create folders to organize your assets:

*   Right-click and select **Add Folder**
*   Use **Media → Add Folder**

Drag assets into folders to group related media.

#### Folder Navigation

*   **Expand** – Click the arrow or double-click the folder
*   **Collapse** – Click the arrow or use **Media → Collapse All Folders**
*   **Expand All** – **Media → Expand All Folders**

### Asset Status

Each asset displays a status indicator showing its readiness:

| Status | Meaning |
| --- | --- |
| **New** | Recently added, not yet processed |
| **Preparing** | Being optimized for playback |
| **Ready** | Optimized and available for use |
| **Transferring** | Being sent to display servers |
| **Online** | Available on all assigned display servers |
| **Error** | Problem with file or optimization |

### Using Assets

#### Add to Timeline

Drag an asset from the Assets window onto:

*   **Timeline** – Creates a cue at the drop position
*   **Stage** – Creates a cue at the visual drop location
*   **Existing Cue** – Replaces the cue's media source

#### Find Associated Cues

Right-click an asset and select **Find Cues** to locate all cues using that asset.

### Asset Properties

Select an asset and view its properties in the **Properties** panel:

*   **File Path** – Location of the source file
*   **Resolution** – Native width and height
*   **Duration** – Length for time-based media
*   **Frame Rate** – For video files
*   **Codec** – Encoding information
*   **Color Space** – HDR and color profile information

### Context Menu

Right-click assets to access common operations:

*   **Add to Timeline** – Create a cue using this asset
*   **Reveal in Explorer** – Open the containing folder
*   **Delete** – Remove from the asset library
*   **Properties** – Open detailed properties

