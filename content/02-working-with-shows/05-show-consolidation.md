---
title: "Show Consolidation"
---


## Show Consolidation

In a typical WATCHOUT workflow, your show file references media assets stored on an Asset Manager. The show file itself is relatively small — it contains display configurations, timeline data, and cue definitions, but not the actual media files. This design is efficient for production, but it means the show depends on the Asset Manager being available with the correct assets.

**Consolidation** solves this dependency by packaging the show file together with copies of all its referenced assets into a single self-contained unit. A consolidated show can be moved between systems, archived, or deployed without needing access to the original Asset Manager.

### When to Consolidate

Consolidation is useful in several scenarios:

- **Archiving a finished show** — after a production wraps, consolidate the show to create a complete, portable archive that includes all media. This ensures the show can be reopened years later without hunting for the original asset files.
- **Transferring to a different site** — when moving a show from a programming studio to an on-site production system, a consolidated package ensures all assets travel with the show file, eliminating the risk of missing media.
- **Creating a backup snapshot** — before making major edits to a show, consolidate the current state as a recoverable checkpoint that includes both the show data and the exact media versions in use.
- **Offline work** — when you need to review or edit a show on a machine that doesn't have access to the Asset Manager or the original media storage.

### Consolidating a Show

To consolidate your show:

1. Open the show you want to consolidate in Producer.
2. Choose **File → Consolidate Show**.
3. Select a destination folder where the consolidated package will be created.
4. The consolidation process begins, copying all referenced assets into the package.

During consolidation, a progress indicator shows the current task and overall completion. The process copies every asset referenced by the show — images, videos, audio files, display data, models, EDID files, fonts, SVGs, and any other asset types used in the production.

The resulting consolidated package contains the show file alongside all its media, making it fully self-contained. The size of the consolidated package depends on the total size of your referenced assets, so expect it to be significantly larger than the show file alone.

:::note
Consolidation copies the current versions of all referenced assets. If assets are being actively optimized or transferred when you consolidate, the package will contain whatever state is available at that moment. For best results, ensure all asset processing is complete before consolidating.
:::

### Unconsolidating a Show

If you want to reverse consolidation — restoring the show to reference assets from the Asset Manager rather than its embedded copies — use the unconsolidate command:

1. Open the consolidated show in Producer.
2. Choose **File → Unconsolidate Show**.
3. Specify the consolidated package path and the target show file location.

Unconsolidation restores the show to its normal Asset Manager-dependent mode. The show file goes back to referencing assets by their Asset Manager identifiers, and subsequent operations (adding new media, optimizing assets, distributing to Runners) use the Asset Manager as usual.

This is typically done when deploying a consolidated show to a new production environment: you unconsolidate the show, connect to the local Asset Manager, and the assets are ingested into the new Asset Manager's library.

### Considerations

**File size:** Consolidated packages can be very large, especially for shows with high-resolution video content. Ensure you have sufficient disk space at the destination before starting consolidation.

**Multi-node setups:** Consolidation creates a portable package, but it does not replace the normal asset distribution workflow for multi-Runner deployments. When you deploy a consolidated show to a production system, you will typically unconsolidate it so the Asset Manager can distribute the assets to all Runner nodes as part of the standard pipeline.

**Progress and interruption:** The consolidation process runs as a background operation with progress reporting. If you need to cancel, close the progress dialog. However, a partial consolidation may result in an incomplete package, so it is best to let the process complete.
