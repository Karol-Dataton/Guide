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
