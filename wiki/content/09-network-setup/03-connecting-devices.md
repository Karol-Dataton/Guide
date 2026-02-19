---
title: "Connecting Devices"
---


## Connecting Devices

In WATCHOUT, the physical outputs that render your show — displays, audio devices, and capture sources — are not tied to specific IP addresses or fixed hardware paths. Instead, each device is bound to a **host alias**: the human-readable name of the node where the device is physically connected. This name-based approach means your show configuration survives IP address changes, network reconfigurations, and even hardware swaps, as long as the replacement machine uses the same alias.

This article covers how devices are connected to nodes, how to assign and manage those connections, and best practices for keeping your device mapping reliable across rehearsals and performances.

### How Device-to-Node Binding Works

Every display, audio device, and capture source in your show has a **Host** property that specifies which node should drive it. When you set a display's Host to "Stage-Left-1", you are telling WATCHOUT: "Render this display on whichever machine currently identifies itself as Stage-Left-1 on the network."

When the Director starts a show, it looks at each device's Host assignment and instructs the corresponding Runner to take ownership of that device. The Runner then initializes the physical output (GPU output, audio interface, NDI stream, etc.) based on the device's configuration.

If the host machine is not available on the network, the device remains unconnected and Producer shows a warning. When the machine comes online and is discovered, the Director automatically assigns the device to it.

### Assigning a Host to a Display

To connect a display to a specific node:

1. Open the **Devices** window (**Window > Devices**) or select the display in the Stage view.
2. Open the display's properties in the **Properties** panel.
3. In the **Host** field, select the target node from the dropdown. The dropdown lists all currently discovered nodes.
4. Configure the output type (GPU, SDI, NDI, or Virtual) and output-specific settings (resolution, refresh rate, color depth, etc.).
5. The Director will assign this display to the selected node's Runner at the next show update.

:::tip
If the target node is not yet online, you can type the host alias manually in the Host field. The display will connect automatically once a node with that alias is discovered.
:::

### Assigning a Host to an Audio Device

Audio devices follow the same pattern:

1. Select the audio device in the **Devices** window.
2. In the Properties panel, set the **Host** to the target node.
3. Choose the **Device Type** — WASAPI, WASAPI Exclusive, Dante, or ASIO — and configure the specific audio interface, channel count, sample format, and latency.
4. The Runner on the target node will initialize the audio output when the show starts.

For Dante audio, the Host determines which machine's Dante network interface is used. See [Dante Audio](06-dante-audio.md) for details.

### Assigning Capture Sources

Capture sources (NDI streams and hardware capture devices) also use host aliases:

- **NDI sources** are network-based and discovered by stream name rather than by host. You add an NDI source by selecting its stream name from the list of discovered NDI streams. However, the capture is still processed by a Runner on a specific node, so the Host assignment determines which machine handles the NDI receive and decoding work.
- **Hardware capture sources** (webcams, capture cards, and other local devices) are bound to the node where the capture hardware is physically installed. Set the Host to that machine's alias.

See [NDI Video Sources](05-ndi-video-sources.md) for details on NDI capture configuration.

### The Devices Window

The **Devices** window (**Window > Devices**) provides a consolidated view of all output devices across your show, grouped by their host node. It shows:

- All displays, audio devices, and capture sources, organized under their assigned hosts
- Device status indicators showing whether each device is active and healthy
- Filter buttons to show **All**, **Display**, **Virtual**, **Capture**, or **Audio** device types

This window is the quickest way to see which devices are connected to which nodes and to spot any devices that are missing their host connection. For a full description of the Devices window interface, see [The Devices Window](../08-the-interface/08-the-nodes-window.md).

### Best Practices for Host Aliases

The reliability of your device connections depends on consistent, well-managed host aliases:

- **Use descriptive, unique names.** Aliases like "FOH-Left", "LED-Upstage", or "Audio-Main" immediately tell you what each machine does. Avoid generic names like "PC1" or "Node-A" that become confusing in larger systems.
- **Keep aliases stable.** Once you assign displays to a host alias during programming, do not rename the node before a show unless you also update all device assignments. Renaming a node changes its alias, which breaks the connection to any devices that reference the old name.
- **Document your alias-to-hardware mapping.** Especially for touring shows or multi-venue installations, keep a record of which physical machine corresponds to which alias. This makes troubleshooting and hardware replacement much faster.
- **Use the same alias on replacement hardware.** If a display server fails and you swap in a replacement, configure the replacement with the same host alias as the original machine. All device assignments will transfer automatically without any changes to the show file.

### Failover with Duplicate Aliases

As described in [Network Overview](01-network-overview.md), two machines can share the same host alias as a failover strategy. If the primary machine goes offline, the backup machine (with the same alias) takes over automatically. The Director will reassign all devices that reference that alias to the backup Runner.

This provides a basic hot-standby capability without modifying the show file. However, both machines must have identical hardware configurations (same GPU outputs, same audio interfaces) for the switchover to be seamless.

### Troubleshooting Device Connections

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Device shows "no host" or host warning | The node with the assigned alias is not online or not discovered | Verify the node is powered on, connected to the network, and visible in the Nodes window |
| Display renders on wrong node | Host alias collision — two machines share the same name unintentionally | Rename one of the machines to give it a unique alias |
| Audio device not producing output | Wrong device type or interface selected for the target hardware | Verify Device Type and adapter/device settings match the actual hardware on the host |
| NDI source not appearing | NDI discovery has not found the stream | Check that the NDI source is active, on the same network, and add Extra IPs in Show Properties if the source is on a different subnet |
| Devices disconnect intermittently | Network instability or firewall blocking | Check network cables, switch health, and firewall rules (see [Firewall Configuration](04-firewall-configuration.md)) |

### Relationship to Other Articles

- [Network Overview](01-network-overview.md) — how services communicate and discover each other
- [Display Servers](02-display-servers.md) — setting up the machines that host your display outputs
- [The Devices Window](../08-the-interface/08-the-nodes-window.md) — the Producer interface for managing device assignments
- [NDI Video Sources](05-ndi-video-sources.md) — connecting NDI streams as capture sources or display outputs
- [Dante Audio](06-dante-audio.md) — connecting Dante network audio devices
