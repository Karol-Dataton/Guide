---
title: "NDI Video Sources"
---


## NDI Video Sources

WATCHOUT 7 integrates with NDI (Network Device Interface) for both video input and video output over standard Ethernet networks. NDI allows WATCHOUT to receive live video streams from cameras, media servers, graphics systems, and any other NDI-enabled device — and to send rendered output as NDI streams to downstream systems like switchers, recorders, or additional media servers. This makes NDI a versatile tool for integrating WATCHOUT into larger production workflows without dedicated video cabling.

### NDI as a Capture Source (Input)

You can bring live NDI video streams into WATCHOUT as capture sources, then use them in cues on your timelines just like any other media. The stream is received in real time over the network, decoded, and rendered to displays.

#### Adding an NDI Source

1. In the **Assets** window, click **Add** and choose **Capture Source**.
2. In the capture source properties, click **Add NDI Source**.
3. The **Stream** dropdown lists all NDI sources currently discovered on the network. Select the stream you want to capture.
4. Configure the source properties:

| Property | Description |
|---|---|
| **Stream** | The NDI source stream name. WATCHOUT continuously scans the network for available NDI streams and populates this list automatically. |
| **Audio Channels** | Number of audio channels to capture from the NDI stream: 0 (no audio), 1, 2, 4, or 8. |
| **Color Space** | How the NDI stream's color data is interpreted. Options: **Auto** (WATCHOUT selects based on resolution), **Rec.601**, **Rec.709**, or **Rec.2020**. In Auto mode, streams above 1920x1080 default to Rec.2020, streams above 720x576 default to Rec.709, and smaller streams default to Rec.601. |
| **Sync Mode** | Controls how the captured frames are synchronized. **Off** uses frames as they arrive. **Maintain** preserves the original frame timing. |
| **Audio Latency** | Buffer size for audio reception, in milliseconds (20 to 1000). Higher values increase reliability but add delay. |

5. Configure the **Audio Route** grid if you need to map NDI audio channels to specific WATCHOUT audio output channels.
6. Click **OK** to add the source.

Once added, the NDI capture source appears as an asset that you can place on timelines as a cue, assign to displays, and apply effects to — just like a video file.

#### NDI Source Discovery

WATCHOUT runs continuous NDI discovery in the background, scanning the network for available streams. Discovered sources appear in the Stream dropdown when adding or editing an NDI source.

By default, NDI discovers sources on the local subnet using mDNS. If you need to receive streams from NDI sources on a different subnet (across a router boundary), add the remote machines' IP addresses to the **NDI Extra IPs** list:

1. Open **Edit > Show Properties** (or the Preferences panel).
2. In the **NDI** section, click **Add** to add an IP address.
3. Enter the IP address of the remote machine hosting the NDI source.
4. WATCHOUT will include this address in its NDI discovery scan.

You can add multiple Extra IPs for sources across different subnets. Changes take effect within a few seconds as the discovery cycle refreshes.

### NDI as a Display Output

WATCHOUT can send rendered display output as NDI streams, making the output available to any NDI receiver on the network. This is useful for:

- **Monitoring** — feeding a preview of the display output to a production switcher or multiviewer without a physical video connection
- **Recording** — sending the rendered output to an NDI-capable recording system
- **Cascading** — feeding WATCHOUT output into another media server or processing system

#### Configuring NDI Output

1. Select the display in the **Devices** window or Stage view.
2. In the display's properties, set the **Output Type** to **NDI**.
3. Configure the **NDI Color Space** — the color encoding used for the output stream:
   - **Auto** — WATCHOUT selects based on the output resolution
   - **Rec.601** — standard-definition color space
   - **Rec.709** — HD color space (most common)
   - **Rec.2020** — wide-gamut UHD color space

The NDI stream is published on the network using the display's name and is discoverable by any NDI receiver on the same network (or via NDI Extra IPs on other subnets).

### NDI Calibration Stream

For GPU-output displays (not NDI output), the display properties include an **NDI Calibration Stream** field. This allows you to associate an external NDI stream with the display for calibration workflows — for example, using a camera feed to align projector output with the physical surface. The calibration stream is referenced by name and is independent of the display's normal output path.

### Infrastructure Recommendations

NDI streams carry uncompressed or lightly compressed video over standard IP networks. A single 1080p NDI stream typically requires 100-150 Mbps of bandwidth, and 4K streams require substantially more. Consider the following:

- **Use Gigabit Ethernet or faster** for all machines sending or receiving NDI streams. Multiple simultaneous streams can easily saturate a Gigabit link.
- **Use a managed switch** with sufficient backplane bandwidth. NDI traffic is unicast TCP, so each receiver creates a separate stream from the sender.
- **Separate NDI traffic from WATCHOUT control traffic** using VLANs if bandwidth is a concern. NDI media streams and WATCHOUT control/discovery traffic can coexist on the same physical network, but heavy NDI traffic may affect the responsiveness of other WATCHOUT operations.
- **Avoid wireless links** for NDI streams. The bandwidth requirements and latency sensitivity of live video are not compatible with typical Wi-Fi connections.

:::tip
If NDI sources are not appearing in the Stream dropdown, verify that the source machine is on the same subnet, that mDNS is not blocked by a firewall, and that the NDI source application is actively transmitting. For cross-subnet discovery, add the source machine's IP to the NDI Extra IPs list.
:::

### Troubleshooting NDI

| Symptom | Likely Cause | Resolution |
|---|---|---|
| NDI source not listed in Stream dropdown | Source not discovered — different subnet or mDNS blocked | Add the source machine's IP to NDI Extra IPs in Show Properties. Verify firewall allows mDNS. |
| NDI capture shows black or freezes | Network bandwidth insufficient or source stopped transmitting | Check network throughput. Verify the NDI source is actively sending. Try a lower resolution source. |
| Color appears incorrect | Wrong color space setting | Change Color Space from Auto to the correct standard (Rec.601, Rec.709, or Rec.2020) for your source. |
| Audio from NDI source not playing | Audio Channels set to 0, or audio routing not configured | Set Audio Channels to match the source stream and configure the Audio Route grid. |
| NDI output stream not visible to receivers | NDI output not started, or firewall blocking | Verify the display is set to NDI output type and the show is playing. Check firewall program rules for the rendering executables. |

### Relationship to Other Articles

- [Connecting Devices](03-connecting-devices.md) — assigning displays and capture sources to nodes
- [Firewall Configuration](04-firewall-configuration.md) — network ports and firewall rules for NDI discovery and transport
- [Dante Audio](06-dante-audio.md) — networked audio integration (Dante is to audio what NDI is to video)
- [Displays and Outputs](../03-displays-and-outputs/) — detailed display configuration including output types
