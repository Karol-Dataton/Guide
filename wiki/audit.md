# Wiki Completeness Audit

Date: 2026-02-23

Compared:
- New wiki: `/Users/karol/Desktop/src/WO_keys/wiki`
- Old docs: `/Users/karol/Desktop/src/mdbook`

## Executive Summary

The new wiki is stronger in presentation and interactivity (widgets, richer UX, granular pages), but it is not fully complete relative to the old mdBook docs. Several reference and system-level sections from the old documentation are missing.

## Major Elements Missing in New Wiki

### 1) Entire documentation sets not migrated
- WATCHPAX Config guide
- WATCHPAX 30 guide
- WATCHPAX 62 guide
- WATCHPAX 64 guide

### 2) Core WATCHOUT 7 sections/pages missing
- Architecture page (system architecture and component relationships)
- FAQ page
- Color chapter (overview, compression, pipeline)
- Glossary
- External Protocol legacy/v6 compatibility docs
- Audio VU meters page
- Audio NDI capture page
- Dedicated Capture section (NDI/Spout/Deltacast/MediaFoundation)
- Dedicated Nodes section (list/info/dashboard/monitoring)
- Dedicated Devices section
- 3D chapter depth (models + mapping/calibration workflow)

### 3) Appendix/reference material missing
- XBox controller mappings
- Network ports reference
- Hardware recommendations
- Autostart setup
- Enable WATCHOUT on custom hardware

## Differences in Coverage Depth

- Old docs include more integrator/operator reference material (ports, hardware, deployment details).
- New docs split many topics into smaller pages and interactive demos, but omit several deep reference topics.
- Old docs include release-notes style technical details in repo root; new wiki is less focused on that style of changelog reference.

## Main Structural Differences

- Old: mdBook with multiple books/projects.
- New: custom Node.js static generator for a single wiki.

- Old: mostly static textual reference.
- New: full-text search, theme switcher, widget embeds, and badge/reviewer tracking via Supabase.

## What New Wiki Adds (Not present in old docs)

- 30+ interactive widgets (effects, color, calibration, mapping visualizers)
- Badge/review tracking system
- More granular page breakdown for many effects and timeline tasks
- Dedicated pages for some practical workflows (e.g., blind edit mode, insert/delete time, media snapshots)

## Bottom Line

The new wiki is modern and user-friendly but currently incomplete versus old mdBook coverage. The biggest gaps are:

1. Missing WATCHPAX guides
2. Missing system/integration sections (Nodes, Devices, Capture)
3. Missing deep reference chapters (Color, Glossary, appendices)
4. Missing legacy protocol compatibility documentation



1. Stub Widget Files (15 widgets)
These files exist in widgets/ but contain only a placeholder <div> with "Stub only - interactive implementation pending":
| # | Widget Name | Planned Behavior |
|---|-------------|-----------------|
| 1 | tween-easing-curves-gallery | Gallery of easing curve families with mini graphs and animated playback |
| 2 | tween-keyframe-interpolation | Interactive timeline graph with draggable tween points |
| 3 | tween-expression-visualizer | Graph overlay of keyframe curve and expression output |
| 4 | position-bezier-path | 2D path editor with draggable Bezier handles |
| 5 | position-align-trajectory | Side-by-side path animation with trajectory alignment |
| 6 | scale-anchor-proportions | Rectangle preview with X/Y scale sliders and anchor point |
| 7 | rotation-axes-3d | Perspective card with Rotation X/Y/Z sliders |
| 8 | rotation-order-comparison | Side-by-side rotation order comparison |
| 9 | opacity-fade-multiplier | Two editable opacity curves with multiplicative result |
| 10 | crop-edge-manipulator | Image preview with Crop controls and presets |
| 11 | color-global-controls | Brightness/Exposure/Contrast/Gamma controls with histogram |
| 12 | color-hue-rotation-wheel | Color wheel with hue rotation slider |
| 13 | corner-pinning-editor | Draggable four-corner quadrilateral editor |
| 14 | linear-wipe-controls | Live wipe preview with Angle/Location/Feather controls |
| 15 | key-fill-compositor | Three-stage compositing preview (key, fill, result) |
2. Missing Widget Files (9 widgets)
Referenced via [[WIDGET:name]] in Markdown but no .html file exists at all -- the build emits "Widget not found" errors:
| # | Widget Name | Referenced From |
|---|-------------|----------------|
| 1 | main-window-overview | content/08-the-interface/01-main-window-overview.md:12 |
| 2 | stage-window | content/08-the-interface/02-the-stage-window.md:12 |
| 3 | timeline-window | content/08-the-interface/03-the-timeline-window.md:10 |
| 4 | cue-list-window | content/08-the-interface/04-the-cue-list-window.md:12 |
| 5 | assets-window | content/08-the-interface/05-the-assets-window.md:10 |
| 6 | properties-panel | content/08-the-interface/06-the-properties-panel.md:12 |
| 7 | nodes-window | content/08-the-interface/07-the-network-window.md:12 |
| 8 | devices-window | content/08-the-interface/08-the-nodes-window.md:12 |
| 9 | customizing-workspace | content/08-the-interface/09-customizing-your-workspace.md:10 |
3. Malformed/Wishlist References (3 widgets)
[[WIDGET: name — long description]] format that can never resolve to a file:
| # | Widget Name | Referenced From |
|---|-------------|----------------|
| 1 | interactive-optimization-priority | content/04-assets-asset-manager/07-image-sequences.md:113 |
| 2 | interactive-dynamic-asset-flow | content/04-assets-asset-manager/06-dynamic-assets.md:108 |
| 3 | interactive-render-resolution | content/04-assets-asset-manager/05-svg-shapes.md:127 |
