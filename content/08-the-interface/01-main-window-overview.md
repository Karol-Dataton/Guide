---
title: "Main Window Overview"
---


## Main Window Overview

The WATCHOUT 7 **Producer** interface presents a modern, flexible workspace designed for efficient show creation and management. The application uses a windowed design where each component operates in its own resizable, repositionable window, allowing you to customize your workspace to match your project requirements and personal preferences.

### Window Architecture

WATCHOUT 7 employs a **multi-document interface** where all primary functions exist as separate windows within the main application frame:

*   **Stage** – Your visual canvas showing all displays and content positioning
*   **Timeline** – Where you arrange and time cues for your show
*   **Assets** – Your media library for managing project files
*   **Properties** – Context-sensitive settings for selected items
*   **Network** – Device discovery and connection management

Each window can be:

*   **Moved** – Drag the title bar to reposition
*   **Resized** – Drag corners or edges to adjust dimensions
*   **Closed** – Click the × button in the title bar
*   **Docked** – Hold `Ctrl` and double-click the title bar to dock to an edge

### Menu Bar

The **Menu Bar** provides access to all application commands organized in logical groups:

| Menu | Purpose |
| --- | --- |
| **File** | Create, open, save, and export shows |
| **Edit** | Undo, redo, cut, copy, paste, and selection commands |
| **Stage** | Display and projector management, view controls |
| **Media** | Add and manage media files |
| **Timeline** | Layer, cue, and playback controls |
| **Tween** | Animation property toggles |
| **Window** | Workspace layout and window visibility |
| **Help** | Documentation, licenses, and about information |

### Keyboard Accelerators

Most menu commands have associated keyboard shortcuts displayed alongside the command name. Common accelerators follow standard conventions:

*   `Ctrl+N` – New show
*   `Ctrl+O` – Open show
*   `Ctrl+S` – Save show
*   `Ctrl+Z` – Undo
*   `Ctrl+Shift+Z` – Redo
*   `Spacebar` – Toggle playback

### Theme Support

WATCHOUT 7 supports both **dark** and **light** visual themes. Toggle between themes via **Window → Light Theme** or through preferences. The dark theme reduces eye strain in low-light production environments, while the light theme may be preferred in brighter working conditions.

### Director Connection Status

The interface displays real-time connection status to the **Director** service. When connected, windows requiring Director communication (such as Timeline and Assets) show full functionality. When disconnected, these windows display an offline indicator with the message "Director offline" and a cloud-off icon.

### Window Focus

The currently active window displays with enhanced visual prominence—a brighter border and stronger shadow in dark mode. Only the focused window receives keyboard input, and clicking any window brings it to the front and transfers focus.

