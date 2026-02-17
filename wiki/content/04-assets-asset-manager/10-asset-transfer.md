---
title: "Asset Transfer"
---


## Asset Transfer

**When a show goes online, the Asset Manager distributes optimized assets to every display server (Runner) in the system over the network.** Each Runner determines which assets it actually needs based on visibility culling — only assets referenced by cues visible on that Runner's displays are downloaded. The transfer uses content-addressed chunk storage with Blake3 hashing for automatic deduplication, two concurrent download workers per Runner, and a substitution mechanism that keeps existing content playing while new versions download.

### How It Works

Asset transfer is a pull-based system: Runners request files from the Asset Server (port 3023) rather than the server pushing files out. The process follows a priority-ordered worker loop:

| Priority | Action | Description |
|----------|--------|-------------|
| 1 | **GetFileInfo** | Query the Asset Server for the file list and sizes of an asset part |
| 2 | **GetThumbnail** | Download the preview thumbnail for an asset |
| 3 | **GetFile** | Download an actual asset file (chunk or unique file) |
| 4 | **Idle** | No work available; wait 1 second before checking again |

Each Runner runs **2 concurrent download workers** that independently pick the highest-priority available action. Workers cycle continuously, checking for new work after each completed action.

### The Download Pipeline

When the Runner determines it needs an asset, the download progresses through these states:

| State | Description |
|-------|-------------|
| **NeedsFileInfo** | Initial state — the Runner needs to query the Asset Server for this asset's file manifest |
| **DownloadingFileInfo** | File info request is in progress |
| **Downloading** | File manifest received; workers are downloading individual files |
| **Ok** | All files downloaded successfully |
| **Failed** | A permanent error occurred (asset not found, server error) |

If the asset is still being optimized on the Asset Server, the file info response returns a "working" status, and the Runner rechecks every **5 seconds** until the asset is ready.

:::warning
**IO errors trigger a 10-second retry delay.** If a download fails due to a network or disk error, the worker waits 10 seconds before retrying. There is no exponential backoff — all retries use the same fixed interval.
:::

### Content-Addressed Storage

Both the Asset Server and Runners store optimized media using a **content-addressed chunk system**:

- Optimized assets are split into chunks during optimization (default chunk size: 512 MB).
- Each chunk's filename is the **RFC 4648 Base32-encoded Blake3 hash** of its contents.
- Chunks are stored in a `shared/` folder, separate from asset-specific files.
- When two assets contain identical data (e.g., same video used in different folders), their chunks share the same hash — the file is stored only once.

**Folder structure on disk:**

```
/
  shared/                        # Content-addressed chunks
    <blake3-hash-1>.chunk
    <blake3-hash-2>.chunk
    ...
  <asset-uuid-1>/                # Asset-specific files
    asset.json                   # Default part descriptor
    asset_preview.json           # Preview part descriptor (if applicable)
    <local data files>
  <asset-uuid-2>/
    ...
```

Each download file is classified as either **Shared** (a `.chunk` file in `shared/`) or **Unique** (an asset-specific file in the UUID folder). The downloader constructs HTTP requests accordingly:

- Shared: `GET /assets/shared/<hash>.chunk`
- Unique: `GET /assets/<asset-id>/<filename>`

:::info
**Deduplication is automatic.** If a shared chunk file already exists locally with the correct hash, it is not re-downloaded. This means transferring an updated show that reuses most of its media only transfers the changed chunks.
:::

### Active Asset Selection

Runners do not download every asset in the show — they use **visibility culling** to determine which assets are needed:

1. **Cue visibility** — the Runner calculates which cues are potentially visible on its assigned physical displays.
2. **Asset collection** — assets referenced by visible cues are collected, along with display assets (warp/blend data, masks) and audio assets routed to the Runner.
3. **Version upgrades** — if the Director has sent asset upgrade mappings, the new version IDs are added to the active set. Old versions are removed once the upgrade is downloaded.
4. **Downloader activation** — the final set of asset IDs is passed to the downloader, which starts or continues downloads as needed.

Assets that are no longer active (e.g., after a show change removes a cue) have their downloads discarded and their HTTP requests aborted.

### Asset Substitution During Upgrades

When a [Dynamic Asset](./06-dynamic-assets.md) version is swapped, the Runner does not interrupt playback:

1. The **old version** continues playing while the new version downloads.
2. Once the new version is fully downloaded, it becomes the **active substitution** and playback switches seamlessly.
3. If a third version arrives while the second is still downloading, the Runner keeps using the first (completed) version until the third finishes.
4. **Preview thumbnails** always use the latest version immediately, regardless of download status.

[[WIDGET: interactive-asset-transfer-flow — animated diagram showing the download pipeline from Runner visibility culling through worker priority loop to chunk storage]]

### Transfer Monitoring

The Asset Manager tracks transfer progress with detailed metrics:

- **Files total / copied / skipped** — total file count, how many were transferred, and how many already existed on the Runner.
- **Bytes total / copied / skipped** — the same breakdown by data volume.
- **Download speed** — measured every 2 seconds based on accumulated bytes.
- **ETA** — after 1 GB of data has been transferred, the system calculates an estimated completion time based on the current transfer rate.
- **Errors** — transfer errors are collected and displayed. Up to 100 unique error messages are retained per job.

### Transfer States (Server-Side)

When using the [Import/Export](./12-import-export-and-mapping.md) or pre-cache features, transfers are tracked with these server-side states:

| State | Description |
|-------|-------------|
| **Pending** | Job is queued but has not started |
| **Scanning** | Comparing local and remote asset inventories |
| **Transferring** | Files are being sent |
| **Waiting** | Paused (e.g., waiting for Runner availability) |
| **Success** | All files transferred successfully |
| **Cancelled** | Transfer stopped by the user |

### Pre-Caching Assets on Runners

For large shows, you can pre-cache assets onto specific Runners before going fully online:

1. In the Assets window, select the assets you want to pre-cache.
2. Right-click and choose **Transfer Assets → Cache Selected Assets**.
3. Select the Runner(s) to cache the assets on.
4. Click **OK** to begin the transfer.

<!-- screenshot: Pre-download Runner Assets dialog showing runner selection -->

This is useful when you need to transfer large volumes of media (tens or hundreds of gigabytes) before a show, without waiting for the full online process.

### Best Practices

- **Use high-speed networking** — 1 Gbps minimum, 10 Gbps recommended for large shows. The 2-worker design benefits from low-latency connections.
- **Dedicate the network** — isolate WATCHOUT traffic from other network data to avoid contention. The downloader does not implement bandwidth throttling.
- **Pre-cache before showtime** — for shows with hundreds of gigabytes of media, start transfers well in advance. Monitor progress to ensure completion.
- **Leverage deduplication** — when updating a show, reuse existing assets where possible. Content-addressed chunks mean unchanged media is never re-transferred.
- **Monitor disk space** — the downloader does not check available disk space before writing. Ensure Runners have sufficient storage for all active assets plus the `shared/` chunk folder.
- **Plan for optimization timing** — assets still being optimized return a "working" status. Runners poll every 5 seconds until the asset is ready, but large assets may take significant time to optimize before transfer can begin.
- **Use quality switches** — managed switches with sufficient backplane bandwidth prevent bottlenecks when multiple Runners download simultaneously.

### Storage Footprint

Each asset's disk usage is reported as a **footprint** with two components:

| Component | Description |
|-----------|-------------|
| **Exclusive** | Bytes of files owned only by this asset (asset.json, local data files in the UUID folder) |
| **Shared** | Bytes of chunk files in `shared/` referenced by this asset |
| **Total** | Sum of exclusive + shared |

Since shared chunks may be referenced by multiple assets, the sum of all asset footprints can exceed the actual disk usage. Garbage collection removes unreferenced chunks from the `shared/` folder.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Transfer stalls at 0% | Asset still optimizing on the Asset Server | Wait for optimization to complete; check [Asset Manager](./01-asset-manager.md) status |
| Slow transfer speed | Network congestion or insufficient bandwidth | Use dedicated network; upgrade to 10 Gbps; check switch backplane capacity |
| "Unknown asset id" error | Asset was deleted or show changed during transfer | Restart the transfer; verify the asset exists in the Asset Manager |
| Runner disk full | No disk space check before download | Free space on the Runner; remove unused cached assets via garbage collection |
| Asset shows on wrong Runner | Visibility culling assigns assets based on display configuration | Verify display-to-Runner assignments in the show configuration |
| Download retries every 10 seconds | IO error on network or disk | Check network connectivity; verify disk health; review Runner logs for specific error |
| Old content still playing after version swap | New version not yet fully downloaded | Check download progress; the Runner switches automatically when the download completes |
| Chunks not deduplicated | Different optimization settings produced different output | Use consistent [Asset Manager Settings](./11-asset-manager-settings.md) across versions |

### See Also

- [Asset Manager](./01-asset-manager.md) — optimization pipeline that prepares assets before transfer
- [Asset Properties](./03-asset-properties.md) — understanding footprint, state, and codec metadata
- [Dynamic Assets](./06-dynamic-assets.md) — version swapping and the substitution mechanism during transfers
- [Asset Manager Settings](./11-asset-manager-settings.md) — quality and codec settings that affect transfer sizes
- [Import, Export, and Mapping](./12-import-export-and-mapping.md) — packaging assets for offline transfer between systems
