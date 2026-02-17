---
title: "Web User Interface"
---


## Web User Interface

**The Asset Manager includes a built-in web server that provides a browser-based interface for uploading and managing assets.** This allows team members to contribute media from any device on the network — laptops, tablets, or smartphones — without needing the WATCHOUT Producer application installed. The Web UI is particularly valuable during collaborative setup and rehearsal phases when multiple people need to add or review content simultaneously.

### How It Works

The Web UI is an embedded web application served directly by the Asset Manager process on **port 3023**. It is compiled into the Asset Manager binary and does not require a separate web server installation. When the Asset Manager starts, the web server starts automatically — there is no additional configuration needed.

Files uploaded through the Web UI enter the same processing pipeline as files added through the Producer:

1. **Upload** — the browser sends the file over HTTP to the Asset Manager.
2. **Storage** — the file is written to the Asset Manager's internal storage.
3. **Optimization** — the optimizer transcodes the file using the current codec mapping and quality settings (see [Asset Manager Settings](11-asset-manager-settings.md)).
4. **Distribution** — the optimized file is transferred to display servers when the show is online.

Assets uploaded via the Web UI appear in the Producer's Assets window in real time — the Asset Manager uses Server-Sent Events (SSE) to push state updates to all connected clients.

### Accessing the Web UI

1. Ensure the Asset Manager node is running and the show is loaded.
2. Open a web browser on any device on the same network.
3. Navigate to:

   ```
   http://<asset-manager-ip>:3023
   ```

   Replace `<asset-manager-ip>` with the IP address or hostname of the node designated as the Asset Manager.

You can also open the Web UI directly from the Producer: right-click in the Assets window and choose **Asset Web**. This opens your default browser and navigates to the correct address automatically.

<!-- screenshot: Web UI landing page showing asset browser and upload area -->

:::note
The port is always **3023** and cannot be changed. The URL uses the IP address of the Asset Manager node, which may be different from the Producer machine. If you're unsure which node is the Asset Manager, check the Network window in the Producer.
:::

### Features

The web interface provides the following capabilities:

| Feature | Description |
|---|---|
| **Upload files** | Drag and drop files or use the file browser to upload media. Multiple files can be uploaded simultaneously. |
| **Browse assets** | View all assets in the current show in a folder tree. |
| **Create folders** | Organize assets into folders. |
| **Preview media** | View thumbnails for images, video, SVGs, and fonts. |
| **Monitor status** | Check optimization progress and asset states in real time. |
| **Delete assets** | Remove unwanted media from the show. |
| **Internationalization** | The interface supports multiple languages. |

### Upload Details

#### File Size Limit

The Web UI accepts uploads up to approximately **3.9 GB** (4,194,304,000 bytes) per request. This limit applies to the HTTP request body and is shared across all API endpoints. Files larger than this limit must be added through the Producer's drag-and-drop interface or via the [Asset Watcher](09-asset-watcher.md).

#### Upload Progress

Large files display upload progress in the web interface. Once the upload completes:

1. The asset appears in the Producer's Assets window immediately (in `Uploading` state).
2. Optimization begins as soon as the upload finishes.
3. The asset transitions through `Optimizing` → `Ok` states.
4. Once optimized, the asset is ready for distribution to display servers.

#### Multiple Uploads

Multiple files can be uploaded in parallel. Each upload is tracked independently with its own progress indicator. Uploads do not block each other or prevent the operator from using the Producer simultaneously.

### Browser Compatibility

The Web UI is built with Vue 3 and the Quasar framework, targeting modern browsers:

| Browser | Minimum Version |
|---|---|
| Chrome / Chromium | 87+ |
| Microsoft Edge | 88+ |
| Firefox | 78+ |
| Safari | 14+ |

Internet Explorer is not supported. The interface is responsive and adapts to different screen sizes, including tablets and smartphones.

### Security Considerations

The Web UI has **no authentication** — it is accessible to anyone who can reach the Asset Manager's IP address and port on the network. This is by design for ease of use in controlled AV environments, but it means anyone on the network can upload, browse, or delete assets.

:::warning
In production environments, protect the Web UI with network-level controls. Anyone with network access to port 3023 can modify your show's assets — including deleting them.
:::

For production environments:

- **Use a dedicated network** for WATCHOUT systems, physically or logically separated from general-purpose networks.
- **Apply firewall rules** to restrict access to port 3023 to trusted devices only. The WATCHOUT installer includes predefined firewall rules that can be configured for this purpose.
- **Use VLANs** to isolate the WATCHOUT network segment from other traffic.
- **Disable the Web UI** at the network level if it is not needed — block port 3023 on the Asset Manager node's firewall.

### Relationship to Other Ingestion Methods

The Web UI is one of several ways to add media to a show. Choose the method that fits your workflow:

| Method | Best For | Requires Producer? |
|---|---|---|
| **Web UI** | Remote team members, mobile devices, quick uploads during setup | No |
| **Drag and drop** (Producer) | Primary operator adding files from the local machine | Yes |
| **Asset Watcher** | Automated pipelines, render farms, scheduled updates | No |
| **Import** | Migrating a complete show package from another system | Yes |

All methods feed into the same optimization pipeline and produce identical results. The choice is purely about workflow convenience. See [Asset Manager](01-asset-manager.md) for an overview of all ingestion options.

### Best Practices

- **Share the URL with your team.** At the start of setup, share the Asset Manager URL (`http://<ip>:3023`) with all team members who need to contribute content. This saves time compared to collecting files on USB drives or email.

- **Use folders to organize uploads.** Create folders in the Web UI before team members start uploading. This prevents all files from landing in the root of the asset tree.

- **Monitor from the Producer.** While others upload via the Web UI, the operator should monitor the Assets window in the Producer to verify that uploads complete successfully and optimization proceeds as expected.

- **Test connectivity first.** Before relying on the Web UI during a show, verify that the device can reach the Asset Manager. Open the URL in a browser and confirm the interface loads. Firewall rules, network segmentation, or IP address changes can silently break access.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Web UI does not load (connection refused) | Asset Manager is not running, wrong IP address, or port 3023 is blocked by a firewall | Verify the Asset Manager service is running; check the IP address in the Network window; check firewall rules for port 3023 |
| Upload fails or times out | File exceeds the ~3.9 GB limit, network interruption, or browser closed during upload | For files over 3.9 GB, use the Producer's drag-and-drop or the Asset Watcher; retry the upload on a stable connection |
| Uploaded asset does not appear in the Producer | SSE connection to the Producer may have dropped, or the asset is still being processed | Refresh the Assets window in the Producer; check the Web UI for the asset's current state |
| Web UI looks broken or layout is wrong | Outdated browser version | Update to a supported browser version (Chrome 87+, Edge 88+, Firefox 78+, Safari 14+) |
| Uploads are slow | Network bandwidth is limited or shared with other traffic | Use a wired connection instead of Wi-Fi; check for bandwidth contention on the network |
| Cannot delete assets from the Web UI | The asset may be in use on the timeline or in a protected state | Check the Producer for timeline references; use the Producer to force-delete if necessary |
