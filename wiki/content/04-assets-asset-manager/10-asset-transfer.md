---
title: "Asset Transfer"
---


## Asset Transfer

**When a show goes online, WATCHOUT automatically distributes optimized media to every display server (Runner) in the system over the network.** Each Runner receives only the assets it actually needs — based on which cues are assigned to its displays — so a Runner driving a single LED wall does not download media meant for a different projector across the venue. When you update a show and go online again, only the changed or newly added media is transferred; assets that already exist on a Runner are skipped automatically.

This transfer process is what connects the media preparation you do in the Asset Manager to the actual playback on your display hardware. Understanding how it works helps you plan network infrastructure, estimate setup time at a venue, and troubleshoot situations where media is not appearing as expected.

### What Happens When You Go Online

When you take a show online, the following sequence occurs for each Runner:

1. **Asset selection.** The Runner determines which assets it needs by examining which cues are visible on its assigned displays. This includes media cues, display-related data (warp meshes, blend configurations, masks), and audio assets routed to that Runner.
2. **Transfer.** The Runner downloads the required optimized media from the Asset Manager over the network. Files that already exist on the Runner from a previous session are skipped.
3. **Playback readiness.** Once all required assets are downloaded, the Runner is fully loaded and ready for playback.

If an asset is still being optimized when the Runner requests it, the Runner waits and retries automatically until the optimized version is available. Large assets (high-resolution video, long image sequences) may take time to optimize before they can be transferred.

:::note
Runners only download assets they need for their assigned displays. If you reassign displays to different Runners or change which cues appear on which displays, the asset requirements for each Runner update accordingly the next time you go online.
:::

### Automatic Deduplication

WATCHOUT uses a storage system that avoids transferring or storing duplicate data. When the same media file appears in multiple places in a show — for example, a logo used on several timelines — the underlying data is stored only once. When you update a show and go online again, only the files that have actually changed are transferred. Media that has not changed since the last transfer is recognized automatically and skipped.

This means that updating a show with minor changes (swapping a few videos, adjusting graphics) results in a fast incremental transfer rather than a full re-download of the entire media library.

### Seamless Version Swapping

When a [Dynamic Asset](./06-dynamic-assets.md) is updated with a new version while a show is running, the Runner handles the transition smoothly:

1. The current version continues playing without interruption while the new version downloads in the background.
2. Once the new version is fully downloaded, playback switches to it seamlessly.
3. If another update arrives while a previous one is still downloading, the Runner continues using the last fully downloaded version until the newest version finishes transferring.

This means you can update dynamic content (live data feeds, sponsor graphics, schedule boards) without visible interruptions to the audience.

### Transfer Monitoring

You can monitor transfer progress in the **Node Info** panel, which shows detailed metrics for each Runner:

- **Progress percentage** — overall completion of the transfer
- **Data copied and skipped** — how much data was transferred versus how much was already present on the Runner
- **Files copied and skipped** — the same breakdown by file count
- **Download speed** — the current transfer rate
- **Estimated time remaining** — an estimate of when the transfer will complete (shown once enough data has been transferred to calculate a reliable estimate)
- **Errors** — any transfer errors are collected and displayed with details

### Pre-Downloading Assets to Runners

For shows with large media libraries (tens or hundreds of gigabytes), you can push assets to specific Runners before going online. This significantly reduces the time needed when the show actually goes online, because the media is already in place.

1. In the Assets window, select the assets you want to pre-download.
2. Right-click and choose **Transfer Assets > Download to Runners**.
3. In the dialog, select one or more Runners to receive the assets. Use **Select All** or **Clear** to manage the selection.
4. Click **Ok** to start the transfer.

:::warning
Pre-downloading transfers media over the network while the system is offline. If a show is already running, this operation may temporarily affect playback performance and may interfere with automatic transfers. Plan pre-downloads during non-critical periods — ideally before the show goes online for the first time.
:::

For details on packaging assets for portable transfer between systems (via USB drives or external storage), see [Import, Export, and Mapping](./12-import-export-and-mapping.md).

### Bandwidth Management

Asset transfers can consume significant network bandwidth, especially for large shows. WATCHOUT provides a **Bandwidth Limit** setting in the [Asset Manager Settings](./11-asset-manager-settings.md) dialog that caps the transfer rate in Mbit/s. Set this when WATCHOUT shares the network with other traffic (lighting control, audio, show control). On a dedicated WATCHOUT network, leave it at the default (unlimited) for the fastest possible transfers.

### Storage Footprint

Each asset's disk usage on a Runner is reported with two components:

| Component | Description |
|---|---|
| **Exclusive** | Storage used by files unique to this asset (metadata, thumbnails) |
| **Shared** | Storage used by media data that may be shared with other assets through deduplication |
| **Total** | The sum of exclusive and shared storage |

Because shared data may be referenced by multiple assets, adding up the total footprint of every asset can exceed the actual disk usage on the Runner. The system automatically cleans up shared data that is no longer referenced by any asset.

:::tip
Monitor disk space on your Runners before going online with a large show. Ensure each Runner has enough free storage to hold all the assets assigned to its displays, plus some headroom for temporary files during transfer.
:::

### Best Practices

- **Use high-speed networking.** 1 Gbps is the minimum for production use; 10 Gbps is recommended for large shows with high-resolution or high-frame-rate media. Low-latency, dedicated network connections produce the best transfer performance.

- **Dedicate the network.** Isolate WATCHOUT traffic from other network data (office internet, streaming, file sharing) to avoid contention that slows transfers and can affect playback reliability.

- **Pre-download before showtime.** For shows with hundreds of gigabytes of media, start pre-downloading to Runners well in advance. Use the Node Info panel to monitor progress and confirm completion before the audience arrives.

- **Reuse assets when updating shows.** When updating a show, keep unchanged media in place rather than deleting and re-adding it. The deduplication system ensures that only genuinely new or modified media is transferred.

- **Use managed network switches.** Quality switches with sufficient backplane bandwidth prevent bottlenecks when multiple Runners are downloading simultaneously. Avoid consumer-grade equipment for production deployments.

- **Allow time for optimization.** Assets must finish optimizing before they can be transferred. If you add large video files shortly before going online, factor in optimization time on top of transfer time. Check the Assets window for optimization progress.

- **Keep codec and quality settings consistent.** If you change codec mappings or quality levels in [Asset Manager Settings](./11-asset-manager-settings.md) between show versions, the optimized output changes and previously transferred media cannot be reused. Set your optimization settings before importing content to avoid unnecessary re-transfers.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Transfer stalls at 0% | The asset is still being optimized and is not yet available for transfer | Wait for optimization to complete; check progress in the Assets window |
| Slow transfer speed | Network congestion, insufficient bandwidth, or low-quality network equipment | Use a dedicated network; upgrade to 10 Gbps; check that switches have adequate backplane capacity |
| Asset not found error | The asset was deleted or the show was modified during transfer | Verify the asset still exists in the Asset Manager; restart the transfer |
| Runner runs out of disk space | Not enough free storage on the Runner for the required assets | Free space on the Runner by removing unused local assets, or add storage capacity |
| Asset appears on the wrong Runner | The display-to-Runner assignment does not match expectations | Check display assignments in the show configuration to verify which Runner drives which displays |
| Transfer keeps retrying | A network or disk error is preventing the download from completing | Check network connectivity between the Runner and the Asset Manager; verify disk health on the Runner |
| Old content still playing after a dynamic asset update | The new version has not finished downloading yet | Check transfer progress in the Node Info panel; the Runner switches automatically when the download completes |
| Previously transferred media is being re-downloaded | Optimization settings were changed, producing different output files | Use consistent [Asset Manager Settings](./11-asset-manager-settings.md) across show versions to preserve deduplication |

### See Also

- [Asset Manager](./01-asset-manager.md) — the optimization pipeline that prepares assets before transfer
- [Asset Properties](./03-asset-properties.md) — understanding asset status, storage footprint, and codec metadata
- [Dynamic Assets](./06-dynamic-assets.md) — version swapping and how content updates are handled during playback
- [Asset Manager Settings](./11-asset-manager-settings.md) — codec mapping, quality levels, bandwidth limits, and track management
- [Import, Export, and Mapping](./12-import-export-and-mapping.md) — packaging assets for portable transfer between systems
