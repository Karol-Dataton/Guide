---
badge: Jacquie
badge: JME
badge: Karol
---

## Show Information

The **Show Information** section provides a statistical overview of the current show, giving you a quick summary of its contents, complexity, and file details. It is a read-only view — no settings are changed here — designed for auditing, documentation, and pre-deployment verification.

### Accessing Show Information

Show Information is located at the bottom of the [Show Properties](./04-show-properties.md) panel. Open Show Properties by deselecting everything (so the Properties panel shows show-level settings), or via **File → Show Properties**. Then expand the **Show Information** section, which is collapsed by default. The data is presented in a series of expandable subsections.

### Statistics

The **Statistics** section is the primary overview, organized into expandable subsections:

#### Cue Summary

Shows the **total number of cues** across the entire show, with an expandable breakdown by cue kind:

- **Media Cues** — cues that render visual or audio content (images, video, audio, compositions, captures)
- **Control Cues** — playback control cues (go, pause, stop, jump, etc.)
- **Output Cues** — cues that affect display output behavior
- **Variable Cues** — cues that set or modify show variables/inputs
- **Marker Cues** — comment and marker cues used for notes, show calling, and countdown references

This breakdown helps you understand the composition of your show at a glance — whether it's primarily media-driven or relies heavily on control logic.

#### Timeline Details

Shows the **number of timelines** in the show. Expanding this section reveals each timeline individually with:

- **Timeline name** — the name you assigned to the timeline
- **Duration** — the total duration of the timeline, formatted as HH:MM:SS or MM:SS
- **Cue count** — an expandable sub-section showing the total number of cues in that timeline, broken down by kind (media, control, output, variable, marker)

This per-timeline detail is useful for identifying which timelines are the most complex and where the bulk of your cues reside.

#### Compositions

Displays the **number of compositions** defined in the show. Compositions are self-contained visual elements with their own internal layers and cues, used as reusable building blocks across timelines.

#### Display Summary

Shows the **total number of displays** with a breakdown by output type:

- **GPU Displays** — displays using direct GPU output to connected monitors or projectors
- **NDI Displays** — displays outputting via NDI network video
- **SDI Displays** — displays outputting via SDI hardware (Deltacast cards)
- **Virtual Displays** — software-only displays used for compositions, previsualization, or design work

This overview is helpful for verifying that your display configuration matches the expected hardware setup before deployment.

### Asset Summary

The **Assets** section shows the **total number of used assets** in the show, with a breakdown by asset type:

- **Images** — still image files (PNG, JPEG, TIFF, BMP, WebP, EXR, PSD)
- **Videos** — video files (MP4, MOV, AVI, MKV, HAP, ProRes, H.264, H.265)
- **Audio** — audio files (WAV, MP3, AAC, FLAC, OGG)
- **Compositions** — composition assets
- **Display Data** — display calibration and configuration data (MPCDI, etc.)
- **Models** — 3D model files used for projection mapping
- **EDID** — captured EDID data from display hardware
- **Art-Net Fixtures** — Art-Net fixture definition files
- **Art-Net Recordings** — recorded Art-Net data files
- **Fonts** — font files used by SVG or text elements
- **SVGs** — scalable vector graphics
- **Unknown** — assets referenced by the show that could not be found in the Asset Manager. A non-zero count here may indicate missing or deleted assets.

The asset count includes only assets that are actually referenced by the show (used in cues or display configurations), not every asset in the Asset Manager's library.

### Technical Details

The **Technical Details** section shows file-level information about the show:

- **Name** — the show file name (without extension)
- **Created** — the file creation date and time
- **File Path** — the full path to the show file on disk
- **File Size** — the size of the show file, formatted in human-readable units (KB, MB, GB)
- **Last Modified** — the most recent modification date and time

If the show was opened from a Director (not from a local file), these fields display "n/a" since there is no local file to report on.