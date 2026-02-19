---
title: "Assets & Asset Manager"
icon: "film"
---

# ASSETS & ASSET MANAGER

**The Asset Manager is the centralized service that handles every stage of the media lifecycle - upload, optimization, storage, and distribution to display servers.** All media in a WATCHOUT 7 show passes through the Asset Manager, which transcodes source files into GPU-friendly formats, stores them in a content-addressed chunk system using Blake3 hashes, and distributes them to Runner nodes on demand. Understanding this system is essential for efficient show production and reliable playback.

### Start Here [Core Concepts]

Core concepts for working with media in WATCHOUT.

- [Asset Manager](01-asset-manager.md) - how the centralized service handles upload, optimization, chunk storage, and distribution across your production network
- [Asset Types](02-asset-types.md) - the complete catalog of asset types (Video, Audio, Image, SVG, Image Sequence, Composition, Model, Font, Display Data, Art-Net, EDID, Folder) with their optimization behavior and timeline characteristics
- [Asset Properties](03-asset-properties.md) - the Properties panel for assets: metadata fields, the asset state pipeline (Uploading, Optimizing, Ok, Error), and type-specific diagnostics

### Media Formats and Creation

Understanding what media WATCHOUT accepts and how to create content within the application.

- [Formats & Codecs](04-formats-codecs.md) - the codec mapping table that determines transcoding paths (e.g., H.264 to HEVC, ProRes to NotchLC), plus pass-through rules for already-optimized formats
- [SVG Shapes](05-svg-shapes.md) - the built-in shape editor for creating vector rectangles, ellipses, and text that are rasterized at configurable resolution
- [Image Sequences](07-image-sequences.md) - importing numbered frame folders as single video assets for 3D render pipelines, HDR/EXR workflows, and per-frame quality control

### Advanced Asset Workflows

Tools for dynamic content, collaborative uploads, automated imports, and network distribution.

- [Dynamic Assets](06-dynamic-assets.md) - versioned asset containers for media swapping (languages, sponsors, seasonal content) without editing timelines
- [Web User Interface](08-web-user-interface.md) - the browser-based Asset Manager UI on port 3023 for collaborative upload and management from any networked device
- [Asset Watcher](09-asset-watcher.md) - OS-level file system monitoring that automatically imports new or changed files from watched folders
- [Asset Transfer](10-asset-transfer.md) - the pull-based distribution system where Runners download only needed content-addressed chunks, with substitution during transfers

### Settings and Data Management

Configuring optimization behavior and moving assets between systems.

- [Asset Manager Settings](11-asset-manager-settings.md) - codec mapping overrides, optimization quality, bandwidth limiting, and alpha channel configuration
- [Import, Export, and Mapping](12-import-export-and-mapping.md) - creating portable asset packages, atomic import into another Asset Manager, and codec mapping override workflows
