---
badge: Jacquie
badge: JME
badge: Karol
---

## Show Archiving

In a typical WATCHOUT workflow, your show file references media assets stored on an Asset Manager. The show file itself is relatively small — it contains display configurations, timeline data, and cue definitions, but not the actual media files. This design is efficient for production, but it means the show depends on the Asset Manager being available with the correct assets.

**Create Archive** solves this dependency by packaging the show file together with copies of all its referenced assets and layouts into a self-contained folder. An archived show can be moved between systems, backed up, or deployed without needing access to the original Asset Manager.

### When to Archive

Archiving is useful in several scenarios:

- **Archiving a finished show** — after a production wraps, archive the show to create a complete, portable copy that includes all media. This ensures the show can be reopened later without hunting for the original asset files.
- **Transferring to a different site** — when moving a show from a programming studio to an on-site production system, an archive ensures all assets travel with the show file, eliminating the risk of missing media.
- **Creating a backup snapshot** — before making major edits to a show, archive the current state as a recoverable checkpoint that includes both the show data and the exact media versions in use.
- **Offline work** — when you need to review or edit a show on a machine that doesn't have access to the Asset Manager or the original media storage.

### Creating an Archive

To archive your show:

1. Open the show you want to archive in Producer.
2. Choose **File → Create Archive**.
3. In the **Choose Export Location** dialog, select a destination folder.
4. The archive process begins, saving the show file and downloading all referenced assets into the folder.

The archive contains:
- A copy of the show file (`.watch`)
- An `assets` subfolder with all referenced assets
- Exported window layouts

The size of the archive depends on the total size of your referenced assets, so expect it to be significantly larger than the show file alone.

:::note
Archiving copies the current versions of all referenced assets. If assets are being actively optimized or transferred when you archive, the package will contain whatever state is available at that moment. For best results, ensure all asset processing is complete before archiving.
:::

### Importing Assets from an Archive

To restore assets from an archive (or any external folder) back into your show:

1. Open the Asset Window.
2. Right-click to open the context menu and navigate to **Transfer Assets → Import…**
3. In the **Import Assets** dialog, select the **target node** that holds the files you want to import from.
4. Enter the **directory path** pointing to the folder containing the assets (e.g. the `assets` subfolder of a previously created archive).
5. Click **OK** to begin the import.

The imported assets are registered with the show's Asset Manager and distributed to Runner nodes through the normal asset pipeline.

:::note
If importing from a local path into a show whose Asset Manager is on a remote node, WATCHOUT will verify that the path is accessible from the remote machine. If the path is not in the allowed list, a Remote Access dialog will appear.
:::

The same **Transfer Assets** submenu also provides options to **Export** all or selected assets and to **Download to Runners** (pre-cache assets on Runner nodes).

### Considerations

**File size:** Archives can be very large, especially for shows with high-resolution video content. Ensure you have sufficient disk space at the destination before starting.

**Multi-node setups:** Archiving creates a portable package, but it does not replace the normal asset distribution workflow for multi-Runner deployments. When you deploy an archived show to a production system, you will need to connect to the local Asset Manager so it can distribute the assets to all Runner nodes as part of the standard pipeline.
