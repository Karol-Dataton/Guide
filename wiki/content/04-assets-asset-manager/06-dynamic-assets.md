---
title: "Dynamic Assets"
---


## Dynamic Assets

**A dynamic asset is a named container that holds versioned content, allowing you to swap media — different language tracks, updated sponsor logos, seasonal variations — without editing any timelines.** Timeline cues reference the dynamic asset by name rather than a specific file, so the currently active version determines which media plays. When you update a version, every cue referencing that dynamic asset picks up the change automatically, coordinated across all Runners without requiring a running Producer.

### How It Works

A dynamic asset appears in the Assets window as a special folder (marked with a recycle icon) containing its version assets. Internally, versions form a **parent-child chain** — each new version is created as a child of the current latest version. The most recently added version (the end of the chain) is treated as the **active version** by default.

The system tracks versions through a `latest_versions` map that points every asset ID in the chain to the newest child. When asset C is added as a child of B (which was a child of A), querying the latest version for any of A, B, or C returns C.

:::info
Each cue stores an `AssetVersion` policy — either **Latest** (automatically upgrade to newer versions) or **Fixed** (pinned to the exact asset it was assigned). Only cues set to `Latest` participate in automatic version upgrades.
:::

### What Happens During a Version Swap

When a new version is added to a dynamic asset, a coordinated update flows through the system:

| Step | Component | Action |
|------|-----------|--------|
| 1 | **Asset Server** | Receives the new child asset, enforces one-child-per-parent rule, broadcasts SSE event |
| 2 | **Director** | Detects asset DB change, queries cues with `AssetVersion::Latest`, builds upgrade map |
| 3 | **Director → Runners** | Sends upgrade map to all Runners via `/v0/asset-upgrades` |
| 4 | **Runner (Downloader)** | Adds new version to download queue, continues using previous version as substitute |
| 5 | **Runner (Playback)** | Switches to new version once download completes; preview thumbnails update immediately |

:::warning
**The Director coordinates upgrades independently of the Producer.** Version swaps work even when the Producer is not running. The Producer is notified after the fact so it can permanently apply the upgrade to the show file.
:::

### Asset Substitution During Downloads

Runners do not interrupt playback while downloading a new version. The downloader uses a **substitution mechanism**:

1. If the latest version is **fully downloaded** — use it immediately and record it as the current substitution.
2. If the latest version is **still downloading** but a previous upgrade was completed — continue using that intermediate version.
3. If **no newer version** has been downloaded — fall back to the original asset.
4. **Preview assets** (thumbnails) always use the latest version regardless of download status.

This means content swaps are **glitch-free** on each Runner — the old version plays until the new one is ready, then the switch happens seamlessly.

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

### Version Structure

Dynamic assets enforce a **one-child-per-parent** rule: each asset in the version chain can have at most one child. When a new version is added, it becomes the child of the current latest version, extending the chain. If a version already has a child, the asset server rejects the addition with an error.

In practice, this means a dynamic asset maintains a linear version history. Automated workflows (such as the [Asset Watcher](./09-asset-watcher.md) or [Web UI](./08-web-user-interface.md)) that repeatedly update a dynamic asset will extend this chain each time.

:::warning
**Compositions and folders cannot be used as dynamic asset versions.** Only regular media assets (video, audio, image, display data) support the parent-child versioning mechanism. Attempting to add a composition as a version will fail.
:::

### Automatic File-Based Updates

When **Auto Update Assets** is enabled in the show settings, the Producer monitors the original source files of all assets every 6 seconds. If a file's last-modified timestamp has changed since the asset was imported, the Producer automatically creates a new child version — triggering the full upgrade pipeline described above.

This works in combination with the [Asset Watcher](./09-asset-watcher.md): the watcher detects new files in watched folders, and the auto-update mechanism detects changes to existing source files.

### Managing Versions

- **Deleting a version** — select the version inside the dynamic asset folder and delete it. If the dynamic asset is used on the timeline, at least one version must remain — WATCHOUT prevents you from deleting the last version of a used dynamic asset.
- **The active version** — is always the newest version (by creation time). You can remove newer versions to effectively revert to an older one.

### Use Cases

| Scenario | How It Works |
|----------|-------------|
| **Multi-language shows** | Create a visual dynamic asset for each content piece, with one version per language. Swap the active version to change language across all cues. |
| **Sponsor updates** | Replace sponsor logos without re-editing timelines. Drop a new logo file into the dynamic asset; it becomes the active version. |
| **Content rotation** | Automatically cycle content on a schedule by updating versions through the [Asset Watcher](./09-asset-watcher.md) or [Web UI](./08-web-user-interface.md). |
| **A/B testing** | Keep two content variations as versions and switch between them during rehearsals. |
| **Live event updates** | Update scores, standings, or info graphics during a live show by replacing the source file — auto-update picks up the change within 6 seconds. |

### Best Practices

- **Use `Latest` version mode for cues that should auto-update**, and `Fixed` for cues that must never change (e.g., safety instructions, calibration patterns).
- **Match resolution and duration** between versions to avoid unexpected cropping or timing mismatches on the timeline.
- **Test version swaps during rehearsal** before relying on them in a live show — verify that all Runners receive and switch to the new version correctly.
- **Keep source files accessible** if using auto-update — the Producer needs to read the original file path to detect changes.
- **Monitor the [Asset Transfer](./10-asset-transfer.md) status** after swapping versions to confirm all Runners have downloaded the new content before showtime.
- **Use the same codec and color space** across versions when possible to avoid re-optimization delays.

### Limitations

- **Version assets cannot be placed on the timeline directly.** Always use the parent dynamic asset when creating cues. Individual version files are internal to the dynamic asset.
- **Category is fixed at creation.** You cannot change a visual dynamic asset to an audible one after creation.
- **Folders and compositions cannot be converted** to dynamic assets. Only regular media assets support conversion.
- **One child per parent** — you cannot branch the version chain. Each version can have at most one successor.
- **Auto-update requires the Producer** — while version *distribution* works without the Producer, *detecting* source file changes requires the Producer to be running.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| "Parent asset already has a child!" error | The current latest version already has a child in the chain | Delete the existing child version first, then add the new one |
| New version not appearing on Runners | Cue is set to `Fixed` version mode | Change the cue's asset version setting to `Latest` in the cue properties |
| Playback glitch during version swap | Should not happen — substitution mechanism prevents this | Check Runner logs for download failures; ensure sufficient disk space |
| Auto-update not detecting file changes | Auto Update Assets is disabled, or Producer is not running | Enable auto-update in show settings and ensure the Producer is active |
| Version swap takes too long | Large file downloading to multiple Runners | Pre-stage the file by uploading it via the [Web UI](./08-web-user-interface.md) before the swap is needed |
| Old version still playing after swap | Download of new version not yet complete on that Runner | Check [Asset Transfer](./10-asset-transfer.md) status; the Runner will switch automatically when download finishes |

### See Also

- [Asset Manager](./01-asset-manager.md) — asset pipeline overview and optimization stages
- [Asset Transfer](./10-asset-transfer.md) — how versions are distributed to Runners and substitution works
- [Asset Watcher](./09-asset-watcher.md) — automated file detection that can trigger dynamic asset updates
- [Web User Interface](./08-web-user-interface.md) — browser-based upload for adding versions remotely
- [Import, Export, and Mapping](./12-import-export-and-mapping.md) — packaging dynamic assets for transfer between shows
