---
title: "Dante Audio"
---


## Dante Audio

WATCHOUT supports **Dante** as an audio output device type for professional networked audio routing. Dante (Digital Audio Network Through Ethernet) transmits uncompressed, multi-channel audio over standard IP networks with low latency and sample-accurate synchronization. In a WATCHOUT installation, Dante allows you to route audio output from Runner nodes to Dante-enabled receivers — mixing consoles, amplifiers, speaker processors, or any other device on the Dante network — without dedicated analog or AES audio cabling.

### How Dante Works in WATCHOUT

Dante is configured as an **audio device type** in WATCHOUT's audio device properties. When you set an audio device's type to Dante, WATCHOUT uses the Dante Application Library to create a Dante transmitter on the node, publishing audio channels to the Dante network. The transmitter appears on the Dante network with the name "WATCHOUT-" followed by the node's hostname, making it discoverable by Dante controllers and receivers.

Each Runner node that uses Dante audio needs a **Dante-compatible network interface**. This is typically a dedicated Ethernet port or a Dante-specific network adapter. The audio data is transmitted over this interface alongside other Dante traffic on the network.

### Configuring a Dante Audio Device

1. Open the **Devices** window (**Window > Devices**) and select the audio device you want to configure, or add a new audio device.
2. In the Properties panel, set the **Host** to the Runner node that will output the audio.
3. Set the **Device Type** to **Dante**.
4. Select the **Adapter** — the Dante network interface on the target node. The dropdown lists the available Dante-compatible adapters on the selected host.
5. Set the **Channels** — the number of Dante output channels. Available options are 2, 4, 8, 16, 32, or 64 channels.
6. Configure **Latency** as needed for your audio routing.

:::note
When Dante is selected as the device type, the **Device** selector (used for WASAPI and ASIO to choose a specific sound card) is replaced by the **Adapter** selector for choosing the Dante network interface. Sample format options are also handled by the Dante library rather than configured manually.
:::

### Dante Network Requirements

Dante audio relies on precise timing and dedicated network infrastructure:

- **Dedicated Dante network or VLAN.** Dante traffic is latency-sensitive and benefits from a dedicated network segment. In many professional installations, Dante runs on its own switch infrastructure or VLAN, separate from WATCHOUT control and media distribution traffic.
- **Managed Gigabit switch.** Dante requires QoS (Quality of Service) configuration on the network switch to prioritize timing packets. Most Dante-certified switches have appropriate QoS presets.
- **PTP timing.** Dante uses PTP (Precision Time Protocol) for clock synchronization between devices. WATCHOUT includes a PTP service that participates in the Dante clock domain. This is separate from WATCHOUT's own NTP-based time synchronization between nodes.
- **mDNS discovery.** Dante devices discover each other using mDNS (multicast DNS). WATCHOUT includes an mDNS responder service for this purpose. Ensure that mDNS traffic is not blocked by firewalls or switch access control lists.

### Dante Activation

Dante functionality requires activation on the node. If Dante is not activated, WATCHOUT displays an error message indicating that Dante is not available. If the Dante adapter does not have enough channels for the configured channel count, WATCHOUT reports an insufficient channel error. These status messages appear in the Nodes window message indicators.

### Channel Routing

Once a Dante audio device is configured, its output channels are published on the Dante network. To route these channels to physical outputs (speakers, amplifiers, etc.), use a Dante controller application (such as Dante Controller from Audinate) to create audio routes between the WATCHOUT transmitter and the receiving devices.

The WATCHOUT Dante transmitter appears in the Dante controller with the manufacturer name "Dataton AB" and model "WATCHOUT 7". The channel names correspond to the configured channel count.

### Comparison with Other Audio Device Types

| Device Type | Connection | Use Case |
|---|---|---|
| **WASAPI** | Local sound card via Windows audio | Standard audio output through the machine's built-in or USB audio interface |
| **WASAPI Exclusive** | Local sound card with exclusive access | Low-latency audio output, bypassing Windows audio mixer |
| **ASIO** | Local sound card via ASIO driver | Professional audio interfaces with ASIO driver support |
| **Dante** | Network via Dante protocol | Networked professional audio routing to any Dante receiver on the network |

Dante is the only audio device type that routes audio over the network rather than through a local hardware interface. This makes it ideal for installations where audio processing equipment is located remotely from the WATCHOUT Runner machines.

### Troubleshooting Dante

| Symptom | Likely Cause | Resolution |
|---|---|---|
| No Dante adapters listed | Dante drivers not installed or no Dante-capable interface present | Verify that Dante Virtual Soundcard or a Dante hardware adapter is installed and its drivers are loaded on the target node |
| "Dante not activated" error | Dante license not activated on the node | Activate Dante on the node using the appropriate Dante licensing tool |
| "Insufficient number of channels" error | The Dante adapter supports fewer channels than configured | Reduce the channel count in WATCHOUT to match the adapter's capability, or upgrade the Dante license/adapter |
| Audio not reaching receivers | Routing not configured in Dante Controller | Open Dante Controller and create routes from the WATCHOUT transmitter to the desired receiver channels |
| Audio dropouts or glitches | Network issues — insufficient bandwidth, missing QoS, or clock sync problems | Verify switch QoS configuration, check that PTP is running, and ensure no bandwidth contention on the Dante network |
| Duplicate Dante device conflict | Two audio devices assigned to the same Dante adapter on the same host | Each node should have only one Dante audio device per adapter. Remove the duplicate assignment. |

### Relationship to Other Articles

- [Connecting Devices](03-connecting-devices.md) — assigning audio devices to nodes
- [Firewall Configuration](04-firewall-configuration.md) — mDNS and PTP port requirements for Dante
- [NDI Video Sources](05-ndi-video-sources.md) — NDI is the video-over-IP counterpart to Dante's audio-over-IP
- [Time Synchronization](11-time-synchronization.md) — WATCHOUT's NTP time sync is separate from Dante's PTP clock sync
