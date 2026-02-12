---
title: "Web User Interface"
---


## Web User Interface

The Asset Manager includes a built-in web server that provides a browser-based interface for uploading and managing assets. This allows team members to contribute media from any device on the network without needing the WATCHOUT Producer application.

### Accessing the Web UI

1. Ensure the Asset Manager node is running and connected.
2. Open a web browser on any device on the same network.
3. Navigate to `http://<asset-manager-ip>:3023`.

The web interface loads automatically. You can also open it from the Producer by right-clicking in the Assets window and choosing **Asset Web** — this opens your default browser and navigates to the correct address.

<!-- screenshot: Web UI landing page showing asset browser and upload area -->

:::info
**Note:** The port is **3023** and is fixed. The URL uses the IP address of the node designated as the Asset Manager, not necessarily the Producer machine.
:::

### Features

The web interface provides:

- **Upload files** – drag and drop files or use the file browser to upload media. Multiple files can be uploaded simultaneously.
- **Browse assets** – view all assets in the current show in a folder tree.
- **Create folders** – organize assets into folders.
- **Preview media** – view thumbnails for images, video, SVGs, and fonts.
- **Monitor status** – check optimization progress and asset states.
- **Delete assets** – remove unwanted media.

Uploaded files are processed through the same optimization pipeline as files added from the Producer — they appear in the Assets window and are optimized and distributed to display servers automatically.

### Upload Progress

Large files display upload progress in the web interface. Once the upload completes, optimization begins immediately. The asset appears in the Producer's Assets window as soon as the upload is received.

### Security Considerations

The web UI has no authentication — it is accessible to anyone who can reach the Asset Manager's IP address and port on the network. For production environments:

- Use a **dedicated network** for WATCHOUT systems, separate from general-purpose networks.
- Apply **firewall rules** to restrict access to port 3023 if needed.
- Consider **network segmentation** (VLANs) to isolate the WATCHOUT network.

### Mobile Access

The web interface is responsive and works on tablets and smartphones, making it convenient for on-the-go asset management during setup and rehearsals.
