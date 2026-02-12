---
badge: Miro
badge: Jacquie
badge: JME
badge: Karol
---

## System Requirements

WATCHOUT 7 requires a Windows-based computer with modern hardware to deliver optimal performance. The requirements differ between the Producer computer (where you edit shows) and Display computers (which render and output to projectors/screens).

### Producer vs. Display Computer Architecture

WATCHOUT uses a **client-server architecture** that separates show creation from show playback:

**Producer Computer** – This is your creative workstation where you design, edit, and control shows. The Producer software provides the timeline editor, stage view, and all creative tools. You only need *one* Producer computer per show, and it doesn't need to be connected to any physical outputs—it can preview everything internally. The Producer sends commands and media to Display computers over the network.

**Display Computer(s)** – These are dedicated playback machines that render content and drive physical outputs (projectors, LED walls, monitors). Each Display computer runs the WATCHOUT Display software and connects to your actual screens. A single Display computer can drive up to 4-8 outputs depending on the graphics card. For larger installations, you simply add more Display computers—WATCHOUT synchronizes them frame-accurately over the network.

:::info
**Tip:** You can run both Producer and Display on the same computer for small setups or previewing. For production environments, dedicated Display computers ensure reliable, uninterrupted playback.
:::

### Producer Computer (Editing)

| Component | Minimum | Recommended |
| --- | --- | --- |
| Operating System | Windows 10 21H2 (64-bit) | Windows 11 23H2 or newer (64-bit) |
| Processor | Intel Core i3/i5 or AMD Ryzen 3/5 | Intel Core i7/i9 or AMD Ryzen 7/9 |
| RAM | 16 GiB DDR4 | 32 GiB DDR5 or more |
| Graphics | DirectX 12 compatible GPU with 4 GiB VRAM | NVIDIA RTX PRO |
| Storage | SSD with 100 GiB free | NVMe SSD (Gen4) with 1 TiB+ free |
| Network | Gigabit Ethernet | 2.5 Gigabit Ethernet |

### Display Computer (Playback)

| Component | Minimum | Recommended |
| --- | --- | --- |
| Operating System | Windows 10 21H2 (64-bit) | Windows 11 23H2 or newer (64-bit) |
| Processor | Intel Core i3/i5, AMD Ryzen 3/5, or equivalent Xeon/EPYC | Intel Core i7/i9, AMD Ryzen 7/9, or equivalent Xeon/EPYC |
| RAM | 16 GiB DDR4 | 32 GiB DDR5 or more |
| Graphics | NVIDIA GeForce RTX | NVIDIA RTX PRO |
| Storage | SATA SSD (500+ MiB/s sustained read) | NVMe SSD (Gen4, 3500+ MiB/s sustained read) |
| Network | Gigabit Ethernet | 2.5 Gigabit Ethernet |

:::info
**Note on CPU:** The processor is not a critical factor for most WATCHOUT installations. Workstation-class processors like Intel Xeon and AMD EPYC work well, and even an Intel Core i3 provides sufficient performance for basic playback scenarios.
:::

:::warning
**Note on AMD Graphics:** While AMD GPUs may work, NVIDIA is recommended for full WATCHOUT feature support. AMD graphics cards require additional testing before deployment in production environments.
:::

### Windows Editions: Consumer vs. WATCHPAX

When building your own display computer, you'll use standard consumer Windows editions. **Windows 11 Home** or **Windows 11 Pro** are the recommended options for user-built systems.

| Feature | Windows 11 Home/Pro | WATCHPAX |
| --- | --- | --- |
| Operating System | Standard Windows | Windows IoT Enterprise LTSC |
| Feature updates | Every 6-12 months | None (security only) |
| Support lifecycle | 24 months | 5-10 years |
| Bloatware/Store apps | Included | Removed |
| WPX Manager Support | No | Yes |
| Update control | Limited | Complete control |
| Pre-configured | No | Yes, optimized for WATCHOUT |

**Why choose WATCHPAX over a custom-built PC?**

- **No surprise updates** – The LTSC operating system receives security patches only; no feature updates that could change system behavior or require reboots during shows
- **Minimal background processes** – No Cortana, Xbox Game Bar, or Store apps consuming resources
- **Predictable environment** – The OS stays exactly as configured for years
- **Extended support** – Security patches available for 5+ years without major OS upgrades
- **Pre-configured** – WATCHPAX units arrive ready for WATCHOUT with optimal settings applied

**Managing updates on consumer Windows:**

If using Windows 11 Home or Pro, plan for regular maintenance windows:

- Schedule Windows updates during non-show periods
- Test updates in a staging environment before production systems
- Use the "Pause updates" feature in Windows Settings to defer updates during critical show periods
- Maintain no more than 24 months behind current Windows versions to remain in Microsoft's support window

:::info
**Note:** Display computers should be dedicated to WATCHOUT playback. Avoid running other applications during live shows to ensure consistent performance.
:::

### Windows Updates and Rendering Performance

Keeping Windows up to date is **critical for optimal WATCHOUT performance**. Newer Windows updates deliver significant improvements to rendering stability and visual output quality:

#### DirectX 12 Ultimate Enhancements

Windows updates continuously improve DirectX 12 capabilities:

- **Enhanced memory management** – Better VRAM allocation reduces out-of-memory errors with large textures and high-resolution video

- **Improved shader compilation** – Faster loading times and reduced hitching during playback

- **Multi-adapter support** – Better handling of systems with multiple GPUs

#### Multi-Head Output Stability

For display servers driving multiple outputs, Windows updates are essential:

- **Improved EDID handling** – Better detection and configuration of connected displays, especially when using EDID emulators or matrix switches

- **Hotplug stability** – Reduced crashes and display resets when cables are connected or disconnected

- **Resolution persistence** – Display configurations survive reboots more reliably

- **Mosaic/Surround mode fixes** – Critical patches for multi-display spanning configurations

#### Security and Reliability

- **Kernel improvements** – Reduced system crashes and blue screens during extended operation

- **Memory leak fixes** – Essential for 24/7 installations where systems run for weeks without restart

- **Timer resolution updates** – More accurate timing for frame-perfect synchronization

:::warning
**Recommendation:** Always use the latest stable Windows version and cumulative updates. Test updates in a staging environment before deploying to production show computers.
:::

### NVIDIA RTX PRO Professional Graphics

While consumer GeForce cards can run WATCHOUT, **NVIDIA RTX PRO (Quadro and RTX Ada) professional GPUs** are strongly recommended for display computers in production environments. Here's why:

#### Key Benefits of NVIDIA RTX PRO

| Feature | NVIDIA RTX PRO | GeForce RTX |
| --- | --- | --- |
| TCC Mode | ✓ Compute-optimized mode | ✗ Windows display only |
| EDID Management | ✓ Controllable via WATCHOUT | ✗ Not supported |
| Sync Connector | ✓ Hardware genlock/framelock | ✗ Software sync only |
| Driver Certification | ✓ Extended testing cycles | Game-focused optimization |
| Long-term Support | ✓ Enterprise driver branches | Consumer update cycle |

#### EDID Management

WATCHOUT can manage EDID (Extended Display Identification Data) directly when using **NVIDIA RTX PRO or Quadro** graphics cards. This allows you to:

- Set custom resolutions and refresh rates per output
- Emulate display EDIDs for consistent behavior without physical displays connected
- Configure outputs before connecting actual projectors or screens

:::info
**Note:** EDID management through WATCHOUT is only supported on NVIDIA professional GPUs. Users with AMD or other graphics cards will need to manage EDID settings outside of WATCHOUT using third-party tools or hardware EDID emulators.
:::

#### NVIDIA Sync Board: Framelock and Genlock

For multi-projector installations requiring **perfect frame synchronization**:

- **NVIDIA RTX PRO Sync boards** enable hardware-level genlock between multiple GPUs and external sync sources
- **Framelock** ensures all outputs across multiple cards/systems swap buffers simultaneously
- Critical for edge-blended panoramas and LED wall installations where frame tearing between panels is visible

:::warning
**Hardware Required:** Framelocking multiple display computers or syncing to an external genlock signal requires an NVIDIA Sync board installed in each display computer. This is a separate hardware add-on for RTX PRO / Quadro cards—it is not possible with consumer GeForce GPUs.
:::

#### Professional Driver Certification

RTX PRO drivers undergo extensive testing and certification:

- **Optimal Drivers for Enterprise (ODE)** – Stability-focused drivers with extended testing cycles

- **Longer support lifecycle** – Enterprise customers receive driver updates for extended periods

- **Better regression testing** – Less risk of updates breaking existing functionality

### Video Capture Requirements

When using video capture devices with WATCHOUT, ensure your hardware meets these requirements:

| Requirement | Description |
| --- | --- |
| **Windows Media Foundation** | Capture device must have Windows Media Foundation (WMF) compatible drivers |
| **Deltacast Cards** | Require GPUDirect support for optimal performance |

:::info
**GPUDirect:** For Deltacast capture cards, GPUDirect enables direct memory transfer between the capture card and GPU, bypassing system memory for lower latency and reduced CPU overhead.
:::

### Storage Recommendations

Video playback performance depends heavily on storage speed. **Sustained read rates** are more important than peak specifications—this is the read speed your SSD can maintain continuously during 24/7 operation without thermal throttling.

:::warning
**Sustained vs. Peak Performance:** SSD manufacturers often advertise peak read speeds, but thermal throttling can reduce actual performance during continuous operation. Ensure your system has adequate cooling for the SSD, and look for drives with good sustained performance ratings. The read rate an SSD can maintain indefinitely may be significantly lower than its maximum specification, depending on the drive model and thermal conditions.
:::

#### Video Codec Storage Requirements

| Content Type | Sustained Read Required | Recommended Storage |
| --- | --- | --- |
| HAP 1080p60 | ~59 MiB/s | SATA SSD |
| HAP 4K60 | ~237 MiB/s | SATA SSD or NVMe |
| Notch LC 4K60 | ~380 MiB/s | SATA SSD or NVMe |
| HAP 8K60 | ~949 MiB/s | NVMe Gen3 SSD |
| 4K image sequence (60 fps) | ~1,899 MiB/s | NVMe Gen4 SSD |
| 8K image sequence (60 fps) | ~7,594 MiB/s | NVMe Gen4 RAID array |

#### Asset Disk Space Guidelines

Plan storage capacity based on your content library. Below are typical file sizes for common media formats:

| Content | Duration/Count | Approximate Size |
| --- | --- | --- |
| HAP 1080p60 video | 1 minute | ~3.5 GiB |
| HAP 4K60 video | 1 minute | ~14 GiB |
| Notch LC 4K60 video | 1 minute | ~22 GiB |
| HAP 8K60 video | 1 minute | ~56 GiB |
| 4K image sequence (60 fps) | 1 minute | ~111 GiB |
| 8K image sequence (60 fps) | 1 minute | ~446 GiB |

:::info
**Note:** Images are stored as RAW/uncompressed for optimal playback performance. ProRes and other compressed video formats are automatically optimized to Notch LC by default.
:::

:::info
**Tip:** For shows with large media libraries, calculate total storage needs including headroom for revisions and additional content. A 1 TB NVMe SSD is suitable for most productions; consider 2 TB or more for 4K/8K heavy projects.
:::

### Network Requirements

| Component | Minimum | Recommended |
| --- | --- | --- |
| Speed | 1 Gbps | 2.5 Gbps |
| Switch | Managed Gigabit switch | Enterprise-grade with IGMP snooping |ßß
| Topology | Star (all on same subnet) | Dedicated VLAN for WATCHOUT |

:::info
**Why 2.5 Gbps?** Most modern motherboards include 2.5 Gigabit Ethernet as standard, providing a significant improvement over 1 Gbps without the cost and complexity of 10 Gbps infrastructure. This is the same networking standard used in WATCHPAX display servers.
:::

:::info
**What is IGMP Snooping?** Internet Group Management Protocol (IGMP) snooping is a switch feature that optimizes multicast traffic. Without it, multicast packets (used by WATCHOUT for synchronization and NDI video) flood all switch ports, wasting bandwidth. With IGMP snooping enabled, the switch intelligently forwards multicast traffic only to devices that need it—reducing network congestion and improving overall performance, especially in systems with multiple display servers or NDI sources.
:::

#### NDI Stream Bandwidth Requirements

NDI (Network Device Interface) is commonly used for video input in WATCHOUT. Here are the typical bandwidth requirements:

| Resolution | Frame Rate | Bandwidth (approx.) |
| --- | --- | --- |
| 1920×1080 | 60 fps | ~125 Mbps |
| 3840×2160 (4K) | 60 fps | ~250 Mbps |
| 7680×4320 (8K) | 60 fps | ~500 Mbps |

:::info
**Note:** Multiple simultaneous NDI streams may require 2.5 Gbps or faster networking depending on total throughput.
:::

#### File Transfer Time Comparison

Network speed dramatically affects how quickly you can deploy media to display servers. The table below shows approximate transfer times for common file sizes:

| File Size | 1 Gbps (~119 MiB/s) | 2.5 Gbps (~298 MiB/s) | 10 Gbps (~1.2 GiB/s) |
| --- | --- | --- | --- |
| 1 GiB | ~9 seconds | ~4 seconds | ~1 second |
| 100 GiB | ~15 minutes | ~6 minutes | ~90 seconds |
| 1 TiB | ~2.5 hours | ~60 minutes | ~15 minutes |

:::info
**Note:** Actual transfer speeds depend on disk I/O, network congestion, and switch quality. The values above assume modern SSDs and a well-configured network with minimal overhead.
:::

For productions with large media libraries or frequent content updates, faster networking pays for itself quickly in reduced setup and rehearsal time. Consider higher-speed networking especially for:

- **4K/8K video content** – Single uncompressed 4K frames can exceed 30 MB
- **Image sequences** – Thousands of files that benefit from sustained throughput
- **Multi-server deployments** – Simultaneous transfers to multiple display computers
- **Live event environments** – Last-minute content changes require rapid deployment
