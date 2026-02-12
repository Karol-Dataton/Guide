---
title: "Dynamic Assets"
---


## Dynamic Assets

A dynamic asset is a named container that holds one or more versions of the same content. Timeline cues reference the dynamic asset by name, and the currently active version determines which actual media file plays. This lets you swap content — different language tracks, updated sponsor logos, seasonal variations — without editing any timelines.

### How It Works

A dynamic asset appears in the Assets window as a special folder (marked with a recycle icon) containing its version assets. The most recently added version is treated as the **active version** by default. When a cue plays the dynamic asset, the runner loads the active version's media.

If you update the active version — by adding a new file or changing the selection — every cue referencing that dynamic asset picks up the change immediately.

### Categories

When creating a dynamic asset, you choose a **category** that determines what type of content it holds:

- **Visual** — images, video, and SVG content.
- **Audible** — audio content.
- **Display Data** — projection mapping data (MPCDI, etc.).

The category is shown as a suffix in the asset name (e.g. "MyContent (Visual)") and restricts which file types can be added as versions. A visual dynamic asset cannot hold audio files, and vice versa.

### Creating a Dynamic Asset

There are two ways to create a dynamic asset:

**From scratch:**

1. Right-click in the Assets window.
2. Choose **New → Create Dynamic Asset**.
3. Enter a name and select a category (Visual, Audible, or Display Data).
4. Click **Save**.

<!-- screenshot: New Dynamic Asset dialog showing name field and category dropdown -->

An empty dynamic asset folder is created. You can then add versions to it.

**From an existing asset:**

1. Select an existing asset (not a folder) in the Assets window.
2. Right-click and choose **New → Create Dynamic Asset**.
3. The existing asset is converted into the first version of a new dynamic asset. The asset's type determines the category automatically.

:::info
**Tip:** Converting an existing asset preserves all cue references. Cues that pointed to the original asset now point to the dynamic asset, which contains the original file as its first version.
:::

### Adding Versions

To add a new version to an existing dynamic asset:

- **Drag and drop** — drag a file from your file manager onto the dynamic asset folder.
- **Create Version** — select the dynamic asset or one of its versions, right-click, and choose **New → Create Version**. This opens a dialog where you can set the version name, frame rate (for video), and color space.
- **Move into folder** — drag an existing asset into the dynamic asset folder. Because versions must be cloned (not moved) into a dynamic asset, WATCHOUT creates a copy automatically.

Versions within a dynamic asset are sorted by creation date, newest first. The newest version is the active version.

### Version Limits

Dynamic assets have a maximum revision count of **2** by default. When a new version is added and the limit is exceeded, the oldest version is automatically removed. This keeps the asset folder from growing unbounded during automated update workflows.

### Managing Versions

- **Deleting a version** — select the version inside the dynamic asset folder and delete it. If the dynamic asset is used on the timeline, at least one version must remain — WATCHOUT prevents you from deleting the last version of a used dynamic asset.
- **The active version** — is always the newest version (by creation time). You can remove newer versions to effectively revert to an older one.

### Use Cases

- **Multi-language shows** — create a visual dynamic asset for each content piece, with one version per language. Swap the language set by replacing the active versions.
- **Sponsor updates** — replace sponsor logos without re-editing timelines. Drop a new logo file into the dynamic asset; it becomes the active version.
- **Content rotation** — automatically cycle content on a schedule by updating the dynamic asset versions through the Asset Watcher or Web UI.
- **A/B testing** — keep two content variations as versions and switch between them during rehearsals.

### Limitations

- **Version assets cannot be placed on the timeline directly.** Always use the parent dynamic asset when creating cues. Individual version files are internal to the dynamic asset.
- **Category is fixed at creation.** You cannot change a visual dynamic asset to an audible one after creation.
- **Folders and compositions cannot be converted** to dynamic assets. Only regular media assets support conversion.
