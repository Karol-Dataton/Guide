---
title: "Display Servers"
---


## Display Servers

A display server is any machine in your WATCHOUT network that runs the Runner service and is responsible for rendering content to physical outputs. In a typical production, the operator designs the show on a Producer machine, and one or more display server machines handle the actual rendering — driving projectors, LED walls, monitors, audio systems, and capture devices. Display servers are the workhorses of a WATCHOUT installation: their GPU power, storage speed, and network connection directly determine what you can play back and at what quality.

### What a Display Server Does

When a display server starts, its management service announces the machine on the network so Producer can discover it. Once the Director assigns work to the machine (based on which displays are mapped to its host alias), the Runner service on that machine:

1. **Connects to the Director** to receive real-time playback instructions — which timelines are playing, at what position, and what cues are active.
2. **Downloads required assets** from the Asset Manager — media files are transferred over the network and cached locally so they are ready for instant playback.
3. **Renders content** to its assigned display outputs using the machine's GPU, and routes audio to its configured audio devices.
4. **Reports status** back to Producer, including download progress, playback health, GPU utilization, drive space, and network throughput.

A single display server can drive multiple display outputs if the machine has multiple GPU outputs, SDI cards, or NDI streams configured.

### Hardware Considerations

Display servers are typically dedicated machines optimized for media playback:

- **GPU** — the primary factor in rendering performance. Choose a GPU that can handle the resolution, codec, and layer count your show requires. WATCHOUT supports NVIDIA GPUs with hardware video decoding.
- **Storage** — a fast SSD is recommended for the working directory where cached assets are stored. Media playback reads from this local cache, so disk speed directly affects performance with large or high-bitrate files.
- **Network** — Gigabit Ethernet minimum, with 10GbE recommended for installations with many large assets or frequent show changes. The network connection is used for asset downloads, playback state updates, and status reporting.
- **CPU** — generally less critical than GPU for media playback, but needed for audio rendering, NDI processing, and general system responsiveness.

For dedicated installations, Dataton offers **WATCHPAX** hardware — purpose-built display servers pre-configured with WATCHOUT software. WATCHPAX units come with a default configuration that includes pre-set working directories and remote file access permissions, reducing setup time.

### Setup Checklist

Setting up a new display server involves these steps:

1. **Install WATCHOUT node software** on the machine. The installer sets up all required services and configures firewall rules automatically.
2. **Verify network connectivity.** Ensure the machine is on the same network subnet as your Producer and other WATCHOUT nodes.
3. **Confirm the node appears in Producer.** Open **Window > Nodes** in Producer and verify the new machine shows up in the node list with its host alias and available services.
4. **Assign displays to the node.** In your show's display configuration, set the **Host** field of each display to the node's alias. This tells the Director which Runner should render each display output.
5. **Assign an Asset Manager.** Ensure a node is designated as the Asset Manager so the display server can download media files.
6. **Assign a Director.** Ensure a node is designated as the Director so the display server receives playback commands.
7. **Verify asset download.** After the Director starts, check that the Runner is downloading assets from the Asset Manager. Download progress is visible in the Nodes window.
8. **Test playback.** Run a timeline and confirm that content appears on the physical display outputs connected to the machine.

### Monitoring Display Server Health

Producer provides real-time status information for each display server in the **Nodes** window and the node's properties panel. Key indicators include:

| Indicator | What It Shows |
|---|---|
| **Services** | Which WATCHOUT services are running on the node (Runner, Visual Renderer, Audio Renderer, etc.) |
| **Software Version** | The installed WATCHOUT version — a warning icon appears if it does not match Producer's version |
| **NTP Diff** | The time offset between this node and the NTP reference — should be near zero for synchronized playback |
| **Download Progress** | Current asset download state and percentage for pending transfers |
| **CPU / GPU / Memory / Drive** | System resource utilization on the node |
| **Network** | Upload and download throughput on the node's network interface |
| **Last Seen** | When the node last announced itself on the network — a stale timestamp may indicate a connectivity problem |

### Startup Action

Each display server can be configured with a **Startup Action** that determines what happens when the machine boots (or when WATCHOUT services restart):

| Mode | Behavior |
|---|---|
| **No Show** | The node starts without loading any show. It waits for a Director to assign work. |
| **Last Show** | The node automatically loads the most recently active show from its local storage. |
| **Specific Show** | The node loads a particular show file that has been uploaded to its local storage. |

Startup Action is configured per node in the **Nodes** window under the node's Director settings. You can upload show files to the node for the "Specific Show" option, and remove them when they are no longer needed.

This feature is essential for unattended installations where machines must begin playback automatically after a power cycle without an operator present.

### Multiple Shows and Warnings

A display server is typically associated with a single show at a time through its Director connection. If the Director sends a different show than the one the Runner is currently running, the Runner transitions to the new show. Producer will display a warning if there is a show mismatch between what the Director expects and what a Runner is currently running — this typically resolves automatically as the new show loads.

### Relationship to Other Articles

- [Network Overview](01-network-overview.md) — the overall architecture of Producer, Director, Runner, and Asset Manager
- [Connecting Devices](03-connecting-devices.md) — how to assign displays and audio outputs to specific display server nodes
- [Node Management and Maintenance](07-node-management-and-maintenance.md) — restarting services, updating software, and other maintenance operations
- [Software Updates](10-software-updates.md) — keeping all display servers at the same software version
- [Working Directory Management](09-working-directory-management.md) — configuring where cached assets are stored on the display server
