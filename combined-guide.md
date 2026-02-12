---
title: "WATCHOUT 7 User Guide"
subtitle: "Complete Documentation for Dataton WATCHOUT"
author: "Dataton"
date: "February 2026"
titlepage: true
titlepage-color: "1a1a2e"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "00d4ff"
toc: true
toc-title: "Table of Contents"
toc-depth: 3
numbersections: true
geometry: margin=1in
fontsize: 11pt
linestretch: 1.25
links-as-notes: true
---

\newpage

# GETTING STARTED

Welcome to **WATCHOUT 7** – the premier multi-display presentation and production system from Dataton. This guide will help you create stunning visual experiences using projectors, LED walls, monitors, and other display technologies.


## Welcome to WATCHOUT 7

**WATCHOUT 7** is the latest evolution of Dataton's award-winning multi-display production and playback system. Designed for show creators, live event professionals, and system integrators, WATCHOUT empowers you to orchestrate massive-scale visuals across unlimited displays, projectors, and LED walls—all from a single timeline.

Whether you are creating a digital signage installation, a projection mapping spectacle, a live concert background, or a corporate presentation, WATCHOUT provides the tools to compose, manage, and play back high-resolution media with frame-accurate synchronization.

> **Note:** **New in WATCHOUT 7:** This version introduces a completely new high-performance video engine, **HDR** (High Dynamic Range) support, and a modernized user interface with dark mode, asset management, and collaborative workflows.

### The Core Concept: One Giant Canvas

If you are new to multi-display systems, the easiest way to understand WATCHOUT is to think of it as **one giant digital canvas**.

In traditional systems with a ten-screen video wall, you might need ten separate video files and players. WATCHOUT eliminates this complexity.

With WATCHOUT, you place your media on a **Stage**—a continuous workspace representing your entire display area. You can drag a video across all screens or animate an image from one side to the other. The system treats the entire display arrangement as a unified creative space.

Behind the scenes, WATCHOUT handles the processing:

*   **Producer:** You use the **Producer** software to design your show, arrange media on the Timeline, and animate content.
*   **Display Computers:** These computers connect to your projectors or LED walls and render the content.
*   **The Playback:** When you run your show, WATCHOUT automatically slices your content in real-time, sending the correct portion to each Display Computer. All computers play in perfect synchronization, creating a seamless image.

### System Architecture

WATCHOUT uses a distributed client-server architecture designed for reliability and scalability.

![WATCHOUT System Architecture Diagram](content/media/system_architecture_diagram.svg)

1.  **Production Computer:** Runs the **Producer** software and manages your project files. This is your creative workstation where you organize content using the **Asset Manager**. It sends control commands (Play, Pause, Update) to the network while leaving heavy rendering to the display computers.
2.  **Display Computers:** Run the **Display** software (formerly Watchpoint). These machines handle video decoding, real-time compositing, and rendering. Each Display Computer synchronizes automatically with the Production Computer and can run "headless" (without a monitor).
3.  **Network:** Connects your Production and Display computers via standard Ethernet.

This architecture allows you to scale from a simple two-screen setup to hundreds of outputs without changing your workflow.

### What You Can Create

WATCHOUT is a blank canvas limited only by your hardware and imagination. Common applications include:

*   **Wide-screen Projection:** Blends multiple projectors to form massive panoramic screens.
*   **Projection Mapping:** Wraps video content around complex 3D objects or buildings.
*   **LED Video Walls:** Drives custom-resolution LED processors with pixel-perfect accuracy.
*   **Digital Signage:** Synchronizes playback across multiple monitors throughout a venue.
*   **Live Broadcasts:** Provides dynamic backdrops and lower-thirds for broadcast or streaming.
*   **Interactive Installations:** Triggers content based on external inputs from sensors, buttons, or network commands.

The system adapts to your creative vision, whether you are designing an intimate gallery experience or a stadium concert.

\newpage

## System Requirements

WATCHOUT 7 requires a Windows-based computer with modern hardware to deliver optimal performance. The requirements differ between the Producer computer (where you edit shows) and Display computers (which render and output to projectors/screens).

### Producer vs. Display Computer Architecture

WATCHOUT uses a **client-server architecture** that separates show creation from show playback:

**Producer Computer** – This is your creative workstation where you design, edit, and control shows. The Producer software provides the timeline editor, stage view, and all creative tools. You only need *one* Producer computer per show, and it doesn't need to be connected to any physical outputs—it can preview everything internally. The Producer sends commands and media to Display computers over the network.

**Display Computer(s)** – These are dedicated playback machines that render content and drive physical outputs (projectors, LED walls, monitors). Each Display computer runs the WATCHOUT Display software and connects to your actual screens. A single Display computer can drive up to 4-8 outputs depending on the graphics card. For larger installations, you simply add more Display computers—WATCHOUT synchronizes them frame-accurately over the network.

> **Note:** **Tip:** You can run both Producer and Display on the same computer for small setups or previewing. For production environments, dedicated Display computers ensure reliable, uninterrupted playback.

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

> **Note:** **Note on CPU:** The processor is not a critical factor for most WATCHOUT installations. Workstation-class processors like Intel Xeon and AMD EPYC work well, and even an Intel Core i3 provides sufficient performance for basic playback scenarios.

> **Warning:** **Note on AMD Graphics:** While AMD GPUs may work, NVIDIA is recommended for full WATCHOUT feature support. AMD graphics cards require additional testing before deployment in production environments.

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

> **Note:** **Note:** Display computers should be dedicated to WATCHOUT playback. Avoid running other applications during live shows to ensure consistent performance.

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

> **Warning:** **Recommendation:** Always use the latest stable Windows version and cumulative updates. Test updates in a staging environment before deploying to production show computers.

### NVIDIA RTX PRO Professional Graphics

While consumer GeForce cards can run WATCHOUT, **NVIDIA RTX PRO (Quadro and RTX Ada) professional GPUs** are strongly recommended for display computers in production environments. Here's why:

#### Key Benefits of NVIDIA RTX PRO

| Feature | NVIDIA RTX PRO | GeForce RTX |
| --- | --- | --- |
| TCC Mode | [x] Compute-optimized mode | [ ] Windows display only |
| EDID Management | [x] Controllable via WATCHOUT | [ ] Not supported |
| Sync Connector | [x] Hardware genlock/framelock | [ ] Software sync only |
| Driver Certification | [x] Extended testing cycles | Game-focused optimization |
| Long-term Support | [x] Enterprise driver branches | Consumer update cycle |

#### EDID Management

WATCHOUT can manage EDID (Extended Display Identification Data) directly when using **NVIDIA RTX PRO or Quadro** graphics cards. This allows you to:

- Set custom resolutions and refresh rates per output
- Emulate display EDIDs for consistent behavior without physical displays connected
- Configure outputs before connecting actual projectors or screens

> **Note:** **Note:** EDID management through WATCHOUT is only supported on NVIDIA professional GPUs. Users with AMD or other graphics cards will need to manage EDID settings outside of WATCHOUT using third-party tools or hardware EDID emulators.

#### NVIDIA Sync Board: Framelock and Genlock

For multi-projector installations requiring **perfect frame synchronization**:

- **NVIDIA RTX PRO Sync boards** enable hardware-level genlock between multiple GPUs and external sync sources
- **Framelock** ensures all outputs across multiple cards/systems swap buffers simultaneously
- Critical for edge-blended panoramas and LED wall installations where frame tearing between panels is visible

> **Warning:** **Hardware Required:** Framelocking multiple display computers or syncing to an external genlock signal requires an NVIDIA Sync board installed in each display computer. This is a separate hardware add-on for RTX PRO / Quadro cards—it is not possible with consumer GeForce GPUs.

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

> **Note:** **GPUDirect:** For Deltacast capture cards, GPUDirect enables direct memory transfer between the capture card and GPU, bypassing system memory for lower latency and reduced CPU overhead.

### Storage Recommendations

Video playback performance depends heavily on storage speed. **Sustained read rates** are more important than peak specifications—this is the read speed your SSD can maintain continuously during 24/7 operation without thermal throttling.

> **Warning:** **Sustained vs. Peak Performance:** SSD manufacturers often advertise peak read speeds, but thermal throttling can reduce actual performance during continuous operation. Ensure your system has adequate cooling for the SSD, and look for drives with good sustained performance ratings. The read rate an SSD can maintain indefinitely may be significantly lower than its maximum specification, depending on the drive model and thermal conditions.

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

> **Note:** **Note:** Images are stored as RAW/uncompressed for optimal playback performance. ProRes and other compressed video formats are automatically optimized to Notch LC by default.

> **Note:** **Tip:** For shows with large media libraries, calculate total storage needs including headroom for revisions and additional content. A 1 TB NVMe SSD is suitable for most productions; consider 2 TB or more for 4K/8K heavy projects.

### Network Requirements

| Component | Minimum | Recommended |
| --- | --- | --- |
| Speed | 1 Gbps | 2.5 Gbps |
| Switch | Managed Gigabit switch | Enterprise-grade with IGMP snooping |ßß
| Topology | Star (all on same subnet) | Dedicated VLAN for WATCHOUT |

> **Note:** **Why 2.5 Gbps?** Most modern motherboards include 2.5 Gigabit Ethernet as standard, providing a significant improvement over 1 Gbps without the cost and complexity of 10 Gbps infrastructure. This is the same networking standard used in WATCHPAX display servers.

> **Note:** **What is IGMP Snooping?** Internet Group Management Protocol (IGMP) snooping is a switch feature that optimizes multicast traffic. Without it, multicast packets (used by WATCHOUT for synchronization and NDI video) flood all switch ports, wasting bandwidth. With IGMP snooping enabled, the switch intelligently forwards multicast traffic only to devices that need it—reducing network congestion and improving overall performance, especially in systems with multiple display servers or NDI sources.

#### NDI Stream Bandwidth Requirements

NDI (Network Device Interface) is commonly used for video input in WATCHOUT. Here are the typical bandwidth requirements:

| Resolution | Frame Rate | Bandwidth (approx.) |
| --- | --- | --- |
| 1920×1080 | 60 fps | ~125 Mbps |
| 3840×2160 (4K) | 60 fps | ~250 Mbps |
| 7680×4320 (8K) | 60 fps | ~500 Mbps |

> **Note:** **Note:** Multiple simultaneous NDI streams may require 2.5 Gbps or faster networking depending on total throughput.

#### File Transfer Time Comparison

Network speed dramatically affects how quickly you can deploy media to display servers. The table below shows approximate transfer times for common file sizes:

| File Size | 1 Gbps (~119 MiB/s) | 2.5 Gbps (~298 MiB/s) | 10 Gbps (~1.2 GiB/s) |
| --- | --- | --- | --- |
| 1 GiB | ~9 seconds | ~4 seconds | ~1 second |
| 100 GiB | ~15 minutes | ~6 minutes | ~90 seconds |
| 1 TiB | ~2.5 hours | ~60 minutes | ~15 minutes |

> **Note:** **Note:** Actual transfer speeds depend on disk I/O, network congestion, and switch quality. The values above assume modern SSDs and a well-configured network with minimal overhead.

For productions with large media libraries or frequent content updates, faster networking pays for itself quickly in reduced setup and rehearsal time. Consider higher-speed networking especially for:

- **4K/8K video content** – Single uncompressed 4K frames can exceed 30 MB
- **Image sequences** – Thousands of files that benefit from sustained throughput
- **Multi-server deployments** – Simultaneous transfers to multiple display computers
- **Live event environments** – Last-minute content changes require rapid deployment


\newpage

## Installing WATCHOUT

Setting up WATCHOUT represents the first step toward creating your show. The installation process is straightforward, but ensuring your system is prepared correctly is key to a stable performance environment.

### Getting the Installer

1.  Visit the official Dataton website at **dataton.com/downloads**.
2.  Navigate to the **WATCHOUT 7** section.
3.  Download the latest release installer.

### Installation Process

#### 1. Run as Administrator

Right-click the downloaded installer file and select **Run as administrator**. This ensures the installer has the necessary permissions to register components and modify system settings.

#### 2. Select Components

During installation, you will be prompted to select components. Ensure valid options are selected for your needs.

![WATCHOUT Setup - Choose Components](content/media/watchout-setup.png)

#### 3. Drivers and Prerequisites

The installer checks for and installs several critical system dependencies. It is essential to allow these installations to complete:

*   **CodeMeter Runtime:** This is the background service that manages your Dataton license keys. It ensures your software is properly authorized and handles network licensing if applicable.
*   **Microsoft WebView2:** Required for certain parts of the user interface (such as the Asset Manager and Help system) that are built on modern web technologies.
*   **Vulkan Runtime:** A modern, high-performance graphics API. WATCHOUT 7 uses Vulkan for its rendering engine to achieve lower overhead and efficient GPU resource management.

#### 4. Restart

After the installation completes, **restart your computer**. This is mandatory to ensure all system drivers and network services are correctly initialized.

### Post-Installation Checklist

*   **Windows Settings:** Set "Power & sleep" settings to **Never** for both screen and sleep.
*   **Notifications:** Turn off "Focus assist" and Windows notifications to prevent interruptions.
*   **User Account:** It is recommended to run WATCHOUT under a Standard User account with auto-login enabled for Display computers, not Administrator, to prevent accidental system changes during a show.


\newpage

## Launching the Application

Once WATCHOUT is installed, you are ready to launch the software. How you launch it depends on whether you are working on the Production Computer (designing) or a Display Computer (playback).

### On the Production Computer

Launch **WATCHOUT Producer** from the desktop shortcut or Start Menu.

#### The Welcome Screen
Upon first launch, you are greeted by the Welcome Screen, which serves as your project hub:

*   **New:** Creates a blank canvas for a new show.
*   **Open:** Browse your file system for an existing `.watch` show file.
*   **Open show from Director:** Connect to a Director on your network to open its currently running show.
*   **Learn:** Opens the WATCHOUT 7 User's Guide in your web browser.
*   **Recent Shows:** A list of your most recently accessed show files for quick entry (displayed on the right side of the Welcome Screen).

#### Layout Presets
WATCHOUT 7 allows you to save and load custom layout presets. You can save up to 9 layout presets and quickly switch between them using keyboard shortcuts or the Window menu. Use **Reset Layout** from the Window menu to return to the default layout.

### On Display Computers

On your media servers, launch the **WATCHOUT Manager** to start playback services.

1.  Look for the **WATCHOUT Manager** shortcut on the desktop.
2.  Launch the application.
3.  A splash screen will appear on connected displays, indicating the system is ready and listening for commands from a Director.
4.  **Important:** The WATCHOUT Manager must be running *before* you try to connect from the Production computer.

The WATCHOUT Manager coordinates multiple background services including the Director, Runner, and Visual Renderer components that work together to deliver synchronized playback.

#### Configuring Auto-Launch

For permanent installations, it is critical that WATCHOUT starts automatically when the computer boots. This ensures the system recovers automatically after a power cycle.

**Using Windows Task Scheduler (Recommended):**

1.  **Open Task Scheduler:**
    *   Press `Windows Key`, type **Task Scheduler**, and press **Enter**.
    *   Alternatively, press `Windows Key + R`, type `taskschd.msc`, and press **Enter**.

2.  **Import the Task File:**
    *   In the right-hand **Actions** panel, click **Import Task...**.
    *   Navigate to your WATCHOUT installation directory (e.g., `C:\WATCHOUT7\`).
    *   Select the file `wo-autostart.xml` and click **Open**.

3.  **Review Task Settings:**
    *   A dialog will appear showing the task configuration.
    *   On the **General** tab, ensure **Run with highest privileges** is checked.
    *   On the **Triggers** tab, verify the trigger is set to **At log on**.
    *   On the **Actions** tab, confirm the action points to `C:\WATCHOUT7\process-manager.exe` (adjust if you installed elsewhere).

4.  **Save the Task:**
    *   Click **OK** to create the scheduled task.
    *   If prompted for credentials, enter your Windows username and password.

5.  **Verify:** Restart the computer to confirm that WATCHOUT Manager launches automatically upon login.

> **Tip:** **Managing the Task:** To edit or delete the task later, open Task Scheduler and look for the task named **WATCHOUT manager** under *Task Scheduler Library > WATCHOUT*.

> **Tip:** **Auto-Login:** Ensure your Windows user account is configured to log in automatically without a password prompt. This can be configured using the `netplwiz` Windows utility.

### Troubleshooting Launch Issues

If the application fails to launch:

*   **License Error:** Check that your License Key is plugged in and the light is on. Open CodeMeter Control Center to verify it is detected.
*   **GPU Driver Error:** Ensure your GPU drivers are up to date. WATCHOUT uses OpenGL for rendering.
*   **Firewall Prompt:** If Windows asks to allow the application access to the network, check **both** "Private" and "Public" networks and click **Allow Access**.


\newpage

## Network Configuration

Establishing a robust and properly configured network is critical for WATCHOUT 7. The system relies on the network not just for file transfer, but for frame-accurate synchronization (UDP) and system control (TCP).

### General Recommendations

*   **Dedicated Network:** The WATCHOUT network should be a closed, dedicated local area network (LAN). Do **not** connect it to the internet or a general office network alongside your show data.
*   **Wired Connections:** Always use wired Ethernet connections (Cat5e, Cat6, or fiber). Wi-Fi is not supported for show synchronization due to latency and packet loss.
*   **Quality Components:** Invest in reliable, professional-grade networking equipment. Consumer-grade hardware may introduce latency spikes or dropped packets under sustained load.

### Recommended Network Hardware

Choosing the right hardware ensures stable, low-latency communication between your Production and Display computers.

#### Network Switches

For most WATCHOUT installations, a quality unmanaged gigabit switch is sufficient. However, for larger or more demanding setups, consider managed switches that offer greater control.

| Type | Use Case | Recommended Models |
| :--- | :--- | :--- |
| **Unmanaged Gigabit** | Small to medium shows<br>(2-8 displays) | Netgear GS108, TP-Link TL-SG108,<br>Cisco CBS110 |
| **Managed Gigabit** | Medium to large shows,<br>VLANs, QoS | Cisco CBS250, Netgear GS310TP,<br>Ubiquiti UniFi Switch |
| **10GbE** | High bandwidth<br>(NDI, 4K+, many outputs) | Netgear XS508M, MikroTik CRS305,<br>Ubiquiti UniFi 10G |

> **Warning:** **Disable Power Saving Features:** If using managed switches, disable "Green Ethernet," "Energy Efficient Ethernet" (EEE), and any auto-sleep modes. These features can interrupt synchronization and cause stuttering.

#### Network Interface Cards (NICs)

Built-in motherboard NICs (Intel I211, I225, Realtek RTL8125) are typically adequate. For demanding workflows (10GbE, NDI sources), consider dedicated add-in cards:

*   **Intel X550-T2:** Dual-port 10GbE, excellent driver support.
*   **Mellanox ConnectX-3:** High performance, often used in broadcast environments.
*   **ASUS XG-C100C:** Cost-effective 10GbE option for smaller budgets.

#### Cabling

*   **Cat5e:** Suitable for Gigabit Ethernet up to 100 meters.
*   **Cat6/Cat6a:** Recommended for 10GbE or runs approaching 100 meters with better shielding.
*   **Fiber Optic (SFP/SFP+):** Essential for long-distance runs (over 100 meters) or electrically noisy environments (near LED walls, dimmers, etc.).

### IP Addressing

WATCHOUT computers must be on the same subnet to discover each other. We recommend using static IP addresses to ensure consistent connectivity.

#### Recommended Scheme

*   **Subnet Mask:** `255.255.255.0` (Class C)
*   **Production Computer:** `192.168.1.10`
*   **Display Computers:** `192.168.1.11`, `192.168.1.12`, etc.

> **Warning:** **Avoid DHCP:** While WATCHOUT can technically work with auto-assigned IPs (DHCP), it is strongly discouraged for live environments. IPs can change upon reboot, potentially breaking your mapping and control links.

### Windows Firewall

WATCHOUT 7 requires specific network ports to operate. Upon installation, the installer typically adds the necessary rules to the Windows Defender Firewall.

If you need to manage ports manually:

*   **TCP Port 3040:** Main communication.
*   **UDP Port 3040:** Synchronization.
*   **Asset Management:** Various ports are used for the new Asset Manager syncing; ensure the `Dataton.Watchout.exe` and `Dataton.Watchout.Display.exe` applications are fully allowed through the firewall for both Private and Public profile types.

### Advanced: Jumbo Frames

For 10GbE networks or systems pushing very high bandwidth video data (especially NDI or uncompressed streams), enabling **Jumbo Frames** (usually 9000 MTU) on all network cards and switches can improve performance. Ensure every device in the chain supports and is configured for the same MTU size.

> **Note:** **Testing Tip:** After changing MTU settings, use `ping -f -l 8972 <target_ip>` from a command prompt to verify jumbo frames are working end-to-end. If the ping fails, a device in the chain isn't configured correctly.


\newpage

## Quick Start Tutorial

Follow these steps to create your first simple presentation in WATCHOUT 7.

### Step 1: Create a New Show

1.  Launch **WATCHOUT Producer** from the desktop shortcut.
2.  From the **Welcome Screen**, click **New Show**.
3.  Choose a location and name for your show file (e.g., "MyFirstShow.watch").
4.  Click **Save**. Your new show opens with an empty Stage and Timeline.

### Step 2: Add a Display

<div class="video-placeholder">Video Placeholder</div>

In WATCHOUT 7, displays are added directly on the Stage canvas.

1.  Click on an empty area of the **Stage** window to make sure it's active.
2.  Go to the **Stage** menu and select **Add Display**, or right-click on the Stage and choose **Add Display**.
3.  A new display rectangle appears. It is automatically selected.
4.  In the **Properties** panel on the right, configure the display:
    *   **Name:** Give it a descriptive name (e.g., "Main Screen").
    *   **Resolution:** Set width and height to match your physical output (e.g., `1920` x `1080`).
    *   **Alias:** Enter a name or address to identify the output (this is used when routing to physical devices).
5.  Position the display on the Stage by dragging it to your desired location.

### Step 3: Import Media

@[Adding media to the Asset Manager](../media/add_media.mp4)

WATCHOUT 7 uses the **Asset Manager** to handle all media.

1.  Open the **Assets** window by going to **Window > Assets** or pressing `Ctrl+4`.
2.  Use **File > New Media File** to add media, or drag files directly from Windows Explorer into the Assets window.
3.  Select your image or video files and click **Open**.
4.  The files are now listed in the Assets window and are ready to be used.

### Step 4: Place Media on the Timeline

@[Placing media on the Timeline](../media/add_to_timeline.mp4)

1.  In the **Assets** window, select the media you want to use.
2.  Drag the media from the Assets window directly onto the **Timeline** window.
3.  This creates a new **Media Cue** on a layer.
4.  Drag the cue left or right to adjust its start time, or drag its edges to change its duration.

### Step 5: Position on Stage

@[Moving the Playhead](../media/playhead.mp4)

1.  Move the **Playhead** (the red vertical line on the Timeline) so it is positioned over your cue.
2.  Your media will now be visible in the **Stage** window.
3.  Click and drag the media directly on the Stage to position it within your display area.
4.  Use the handles to resize or rotate the media as needed.

### Step 6: Set Up a Display Node

<div class="video-placeholder">Video Placeholder</div>

Before you can see your content on a physical screen, you need to configure a **Display Node** — the computer that will render and output the visuals.

1.  On your Display Computer, launch the **WATCHOUT Manager** from the desktop shortcut.
2.  The splash screen will appear on connected displays, showing the WATCHOUT logo while waiting for a connection.
3.  Back on your Producer computer, open the **Network** window by going to **Window > Network** or pressing `Ctrl+5`.
4.  Your Display Computer should appear in the list as a node with available services. If it doesn't:
    *   Ensure both computers are on the same network subnet.
    *   Check that Windows Firewall allows WATCHOUT through (both Private and Public networks).
5.  In the **Stage** window, select your display rectangle.
6.  In the **Properties** panel, configure the **Route** to specify which device and output channel to use.
7.  Connect to a **Director** by clicking **Connect** in the Welcome Screen or using **File > Connect**. The Director coordinates playback across all your nodes.

### Step 7: Run the Show

<div class="video-placeholder">Video Placeholder</div>

1.  Press the **Spacebar** or click the **Play** button to start playback.
2.  The Timeline will play forward from the current position of the Playhead.
3.  Watch your physical screen—the content will be perfectly synchronized.

> **Tip:** **Tip:** Use **Ctrl+Home** to jump to the beginning of the timeline before pressing play.


\newpage


# THE INTERFACE

WATCHOUT 7 features a modern, flexible interface designed for efficient show production. Learn how to navigate and customize your workspace for maximum productivity.



## Main Window Overview

The WATCHOUT 7 **Producer** interface presents a modern, flexible workspace designed for efficient show creation and management. The application uses a windowed design where each component operates in its own resizable, repositionable window, allowing you to customize your workspace to match your project requirements and personal preferences.

### Window Architecture

WATCHOUT 7 employs a **multi-document interface** where all primary functions exist as separate windows within the main application frame:

*   **Stage** – Your visual canvas showing all displays and content positioning
*   **Timeline** – Where you arrange and time cues for your show
*   **Assets** – Your media library for managing project files
*   **Properties** – Context-sensitive settings for selected items
*   **Network** – Device discovery and connection management

Each window can be:

*   **Moved** – Drag the title bar to reposition
*   **Resized** – Drag corners or edges to adjust dimensions
*   **Closed** – Click the × button in the title bar
*   **Docked** – Hold `Ctrl` and double-click the title bar to dock to an edge

### Menu Bar

The **Menu Bar** provides access to all application commands organized in logical groups:

| Menu | Purpose |
| --- | --- |
| **File** | Create, open, save, and export shows |
| **Edit** | Undo, redo, cut, copy, paste, and selection commands |
| **Stage** | Display and projector management, view controls |
| **Media** | Add and manage media files |
| **Timeline** | Layer, cue, and playback controls |
| **Tween** | Animation property toggles |
| **Window** | Workspace layout and window visibility |
| **Help** | Documentation, licenses, and about information |

### Keyboard Accelerators

Most menu commands have associated keyboard shortcuts displayed alongside the command name. Common accelerators follow standard conventions:

*   `Ctrl+N` – New show
*   `Ctrl+O` – Open show
*   `Ctrl+S` – Save show
*   `Ctrl+Z` – Undo
*   `Ctrl+Shift+Z` – Redo
*   `Spacebar` – Toggle playback

### Theme Support

WATCHOUT 7 supports both **dark** and **light** visual themes. Toggle between themes via **Window -> Light Theme** or through preferences. The dark theme reduces eye strain in low-light production environments, while the light theme may be preferred in brighter working conditions.

### Director Connection Status

The interface displays real-time connection status to the **Director** service. When connected, windows requiring Director communication (such as Timeline and Assets) show full functionality. When disconnected, these windows display an offline indicator with the message "Director offline" and a cloud-off icon.

### Window Focus

The currently active window displays with enhanced visual prominence—a brighter border and stronger shadow in dark mode. Only the focused window receives keyboard input, and clicking any window brings it to the front and transfers focus.



\newpage


## The Stage Window

The **Stage** is your visual canvas—a representation of all your displays and how content appears on them. It provides a unified view of your entire display arrangement, allowing you to position and manipulate content directly.

### Stage Modes

The Stage window operates in three distinct modes, accessible via the topbar button or the **Stage** menu:

| Mode | Description |
| --- | --- |
| **Default (Front View)** | Standard 2D editing view for positioning and arranging content |
| **FPS Camera** | First-person navigation for 3D environments with WASD-style controls |
| **Projector View** | View the Stage from a selected projector's perspective for calibration |

### Navigation Controls

#### Pan

Move your view around the Stage:

*   **Mouse** – Hold `Ctrl+Alt` and drag
*   **Button** – Click the pan button (hand icon) in the top-right toolbar and drag

#### Zoom / Scale

Adjust your view magnification:

*   **Mouse Wheel** – `Ctrl+Mouse Wheel` to zoom in/out
*   **Button** – Click the magnify button and drag vertically
*   **Menu** – **Stage -> Scale** with preset levels (1:16, 1:8, 1:4, 1:2, 1:1)

The current scale ratio displays in the title bar when in Front View mode.

#### Orbit (3D Views)

When not in Front View:

*   **Button** – Click the orbit button (rotate icon) and drag to rotate the camera around the Stage

#### Camera Velocity

In 3D modes, adjust movement speed using the velocity slider (running figure icon).

### View Commands

| Shortcut | Command | Description |
| --- | --- | --- |
| `Ctrl+Shift+D` | Frame All Displays | Zoom to fit all displays in the viewport |
| `Ctrl+Shift+O` | Scroll to Origin | Center the view on coordinates (0, 0) |
| `Ctrl+Shift+S` | Frame Selected | Zoom to fit selected displays |

### Working with Content

#### Selection

*   **Single Click** – Select a cue or display
*   **Shift+Click** – Add to selection
*   **Ctrl+Click** – Toggle selection
*   **Marquee** – Click and drag on empty space to create a selection rectangle

#### Transformation

Selected cues can be manipulated directly on the Stage:

*   **Move** – Drag selected items to reposition
*   **Resize** – Drag corner or edge handles
*   **Rotate** – Use rotation handles when available
*   **Nudge** – Arrow keys move selection by 1 pixel; `Shift+Arrow` moves by 10 pixels

#### Drag and Drop

Drag media from the **Assets** window directly onto the Stage to create cues at the drop location.

### Display Labels

When enabled, display names appear centered on each display rectangle, making it easy to identify outputs in complex multi-display configurations.

### Projector Mode

When viewing from a projector's perspective, additional controls appear for calibration:

*   **View Mode** – Preview content as the projector sees it
*   **Calibration Mode** – Adjust 2D or 3D calibration points
*   **Calibration Actions** – Add, move, or remove calibration points
*   **Snap Toggle** – Enable snapping to geometry
*   **Link Toggle** – Link calibration points across projectors
*   **Accuracy Display** – Shows current calibration accuracy percentage

### Composition View

When editing a **Composition** cue, the Stage displays the composition's internal canvas rather than the main Stage, indicated by a border around the viewport and a gantt chart icon in the title bar.



\newpage


## The Timeline Window

The **Timeline** is where you orchestrate your show—arranging media and controlling precisely when things happen. It provides a horizontal time-based view of your content, organized in layers.

### Timeline Structure

The Timeline window is divided into several key areas:

#### Header Area

*   **Timecode Display** – Shows the current playback position in hours:minutes:seconds:frames format. Click to jump to a specific time.
*   **Sync Indicator** – Displays synchronization status with the Director
*   **Cue Status Line** – Shows information about selected cues
*   **Countdown Display** – Indicates time remaining until the next pause cue

#### Layer Headers

The left column displays layer names. Each layer is a horizontal track for organizing content:

*   **Layer Name** – Custom name or default "Layer N" numbering
*   **Key and Fill Mode** – Icon indicates if a layer uses luma or alpha keying
*   **Selection Highlight** – Active layer appears with elevated background

Layers are ordered with higher numbers appearing on top in the Stage view.

#### Time Ruler

The horizontal ruler at the top of the cue area shows time in your configured format. Features include:

*   **Time Markings** – Major and minor divisions based on zoom level
*   **Play Cursor Indicator** – Triangle marker showing current time
*   **Click to Jump** – Click in the ruler to move the play cursor (when "Click Jumps to Time" is enabled)

#### Cue Area

The main workspace where cues are displayed:

*   **Tracks** – Horizontal lanes corresponding to layers
*   **Cues** – Colored rectangles representing media and control cues
*   **Play Cursor** – Vertical red line showing current playback position
*   **Overlap Indicators** – Cues that overlap in time on the same layer show warning styling

#### Tween Curves Panel

When a media cue is selected, the lower panel displays animation curves showing how properties change over time.

#### Minimap

The bottom bar shows a compressed overview of your entire timeline, with:

*   **Visible Range Indicator** – Shows which portion of the timeline is currently displayed
*   **Pan Control** – Drag to scroll horizontally
*   **Play Position** – Small indicator of current playback time
*   **Cue Overview** – Tiny representations of all cues

### Playback Controls

| Shortcut | Action |
| --- | --- |
| `Spacebar` | Toggle play/pause |
| `Numpad 0` | Start playback |
| `Escape` | Pause |
| `Home` | Jump to beginning |
| `End` | Jump to end |
| `Numpad +` | Zoom in |
| `Numpad -` | Zoom out |

### Working with Layers

| Action | Method |
| --- | --- |
| Add Layer | **Timeline -> Append Layer** or `Ctrl+I` |
| Insert Layer | **Timeline -> Insert Layer** |
| Delete Layer | **Timeline -> Delete Layer** |
| Select Layer | Click the layer header |
| Rename Layer | Double-click layer header to open Properties |

### Working with Cues

#### Adding Cues

*   **Drag and Drop** – Drag media from Assets onto the Timeline
*   **Menu** – Use **Timeline -> Add** submenu for control cues

#### Selecting Cues

*   **Click** – Select a single cue
*   **Shift+Click** – Add to selection
*   **Ctrl+Click** – Toggle selection
*   **Marquee** – Drag on empty track space to select multiple cues

#### Editing Cues

*   **Move** – Drag cues left/right to change timing; drag up/down to change layers
*   **Resize Start** – Drag the left edge to adjust in-point
*   **Resize End** – Drag the right edge to adjust duration
*   **Trim to Time** – Use **Timeline -> Trim Start** or **Trim End** to cut at play cursor
*   **Double-click** – Open Properties panel for detailed editing

#### Cue Context Menu

Right-click a cue for common actions:

*   Cut, Copy, Paste, Delete
*   Group / Ungroup cues
*   Add tweens
*   Fade In, Fade Out, Cross Fade

### Snapping

When **Edit -> Snap** is enabled, cues snap to:

*   Other cue edges
*   The play cursor
*   Time ruler divisions

A highlight appears when snapping occurs.

### Timeline Identification

When multiple timelines exist, the window title displays the timeline name and ID number (e.g., "Main #1").



\newpage


## The Assets Window

The **Assets** window is your media library—the central repository for all images, videos, audio files, and other resources available for use in your show. It connects to the **Asset Manager** service to provide organization, search, and status tracking for your project media.

### Asset Manager Connection

The Assets window requires connection to an **Asset Manager** service to function. Connection status displays in the window:

*   **Connected** – Full functionality available
*   **Offline** – Window shows "Asset Manager offline" with cloud-off icon

Configure the Asset Manager host via **Network -> Use Asset Manager**.

### Interface Layout

The Assets window displays your media in a hierarchical tree table:

| Column | Description |
| --- | --- |
| **Name** | File name with icon indicating asset type |
| **Status** | Optimization and transfer state |
| **Duration** | Length for video and audio files |
| **Resolution** | Width × Height for image and video files |
| **Format** | File type and codec information |

### Adding Media

#### Drag and Drop

Drag files directly from Windows Explorer into the Assets window.

#### Menu Commands

*   **Media -> Add Media File** – Browse and select individual files
*   **Media -> Add Image Sequence** – Select a folder containing numbered image sequences

#### Supported Formats

WATCHOUT 7 supports a wide variety of media types:

*   **Images** – PNG, JPEG, TIFF, BMP, WebP, EXR, PSD
*   **Video** – MP4, MOV, AVI, MKV, HAP, ProRes, H.264, H.265/HEVC
*   **Audio** – WAV, MP3, AAC, FLAC, OGG
*   **Other** – SVG, PDF, image sequences

### Search and Filtering

#### Search Bar

Click the magnifying glass icon or press `Ctrl+F` to reveal the search panel:

*   **Text Search** – Find assets by name
*   **Type Filter** – Filter by media type (images, video, audio, etc.)
*   **Status Filters** – Show only new assets or assets being prepared

Press `Escape` to close the search panel and reset filters.

#### Filter Options

| Filter | Description |
| --- | --- |
| **Only New** | Show assets recently added |
| **Preparing** | Show assets currently being optimized |

### Organization

#### Folders

Create folders to organize your assets:

*   Right-click and select **Add Folder**
*   Use **Media -> Add Folder**

Drag assets into folders to group related media.

#### Folder Navigation

*   **Expand** – Click the arrow or double-click the folder
*   **Collapse** – Click the arrow or use **Media -> Collapse All Folders**
*   **Expand All** – **Media -> Expand All Folders**

### Asset Status

Each asset displays a status indicator showing its readiness:

| Status | Meaning |
| --- | --- |
| **New** | Recently added, not yet processed |
| **Preparing** | Being optimized for playback |
| **Ready** | Optimized and available for use |
| **Transferring** | Being sent to display servers |
| **Online** | Available on all assigned display servers |
| **Error** | Problem with file or optimization |

### Using Assets

#### Add to Timeline

Drag an asset from the Assets window onto:

*   **Timeline** – Creates a cue at the drop position
*   **Stage** – Creates a cue at the visual drop location
*   **Existing Cue** – Replaces the cue's media source

#### Find Associated Cues

Right-click an asset and select **Find Cues** to locate all cues using that asset.

### Asset Properties

Select an asset and view its properties in the **Properties** panel:

*   **File Path** – Location of the source file
*   **Resolution** – Native width and height
*   **Duration** – Length for time-based media
*   **Frame Rate** – For video files
*   **Codec** – Encoding information
*   **Color Space** – HDR and color profile information

### Context Menu

Right-click assets to access common operations:

*   **Add to Timeline** – Create a cue using this asset
*   **Reveal in Explorer** – Open the containing folder
*   **Delete** – Remove from the asset library
*   **Properties** – Open detailed properties



\newpage


## The Properties Panel

The **Properties** panel is a context-sensitive inspector that displays settings for whatever is currently selected—displays, cues, layers, tweens, assets, or application preferences.

### Dynamic Content

The Properties panel automatically adapts to show relevant settings based on your current selection:

| Selection | Properties Shown |
| --- | --- |
| **No selection** | Application Preferences |
| **Cue** | Cue properties (position, timing, effects) |
| **Layer** | Layer settings (name, key and fill options) |
| **Tween** | Tween curve properties |
| **Tween Point** | Individual keyframe values |
| **Asset** | Media file information |
| **Display** | Display configuration |
| **Device** | Network device settings |
| **Stage (background)** | Stage display settings |

### Accessing Properties

*   **Automatic** – Select any item and its properties appear
*   **Double-click** – Double-click items in Stage or Timeline to focus the Properties panel
*   **Keyboard** – Press `Enter` with selection to shift focus to Properties
*   **Menu** – **Window -> Properties** or `Ctrl+P`

### Property Categories

Properties are organized into collapsible categories for easier navigation. Each category can be expanded or collapsed by clicking its header.

#### Cue Properties

When a media cue is selected:

*   **Transform**
    *   Position (X, Y, Z)
    *   Scale (Width, Height, or unified)
    *   Rotation (Roll, Pitch, Yaw)
    *   Anchor Point

*   **Appearance**
    *   Opacity
    *   Crop (Top, Bottom, Left, Right)
    *   Blur

*   **Color**
    *   Brightness
    *   Contrast
    *   Gamma
    *   Hue
    *   Saturation
    *   Invert
    *   RGB Offset and Gain

*   **Timing**
    *   Start Time
    *   Duration
    *   In Point (media offset)
    *   Play Rate

*   **Audio**
    *   Volume
    *   Pan
    *   Mute

#### Layer Properties

When a layer is selected:

*   **Name** – Custom layer identifier
*   **Key and Fill** – Enable external keying mode
    *   Mode: Luma, Alpha, Luma Inverted, Alpha Inverted
    *   Associated fill layer selection

#### Timeline Properties

When a timeline is selected (via layer):

*   **Timeline Name**
*   **Duration**
*   **Frame Rate**

#### Asset Properties

When an asset is selected:

*   **File Information** – Path, size, format
*   **Media Specifications** – Resolution, duration, codec
*   **Optimization** – Target format settings

#### Display Properties

When a display is selected on the Stage:

*   **Name** – Display identifier
*   **Resolution** – Output dimensions
*   **Position** – Location on the Stage canvas
*   **Rotation** – Display orientation
*   **Host Assignment** – Which display server renders this output
*   **Edge Blending** – Overlap and blend settings
*   **Masking** – Output mask configuration

### Input Fields

Property values can be edited using various input types:

*   **Text Fields** – Type values directly; press `Enter` to confirm
*   **Number Fields** – Type or use increment buttons; drag to scrub values
*   **Sliders** – Drag for continuous adjustment
*   **Color Pickers** – Click the swatch to open the color selector
*   **Dropdowns** – Click to select from available options
*   **Toggles** – Click to enable/disable boolean settings

### Scroll Position Memory

The Properties panel remembers scroll position for each property page type, so switching between different selections maintains your viewing position within similar content.

### Focus Behavior

When the Properties panel receives focus:

*   Tab navigation cycles through editable fields
*   Press `Enter` to return focus to the previous window
*   Changes apply immediately when values are modified



\newpage


## The Network Window

The **Network** window shows all WATCHOUT devices on your network and their status. It provides centralized management of display servers, directors, asset managers, and other network services.

### Device Discovery

WATCHOUT uses **automatic discovery** to find devices on your local network. All WATCHOUT 7 services running on the same subnet automatically appear in the Network window without manual configuration.

The device list refreshes periodically (every few seconds) to reflect current status.

### Device Table

The Network window displays devices in a table with the following columns:

| Column | Description |
| --- | --- |
| **Name** | Device hostname or identifier |
| **Services** | Icons indicating available services (Director, Display, Asset Manager) |
| **Address** | IP address of the device |
| **Version** | WATCHOUT software version (shown in toolbar) |

### Device Status

Devices show visual status indicators:

*   **Online** – Device is connected and responsive
*   **Active in Show** – Device is assigned to the current show
*   **Offline** – Device is not responding

The text styling changes based on status:

*   Normal text – Online and ready
*   Dimmed text – Offline or unavailable

### Service Icons

Each device displays icons for its available services:

| Icon | Service | Description |
| --- | --- | --- |
| Director | Playback control and synchronization master |
| Display | Video rendering and output |
| Asset Manager | Media file management and optimization |
| Audio | Audio output device |
| Capture | Video input/capture device |

### Filtering Devices

Use the filter dropdown to narrow the device list:

| Filter | Shows |
| --- | --- |
| **All** | Every discovered device |
| **Active in Show** | Only devices currently assigned to the show |
| **Referred by Show** | Devices referenced in show configuration |

### Context Menu Actions

Right-click a device or use the window menu button to access:

#### Device Management

*   **Add Display** – Create a new display output on this device
*   **Add 3D Projector** – Add a 3D mapping projector
*   **Add Audio Device** – Configure audio output
*   **Add Capture** – Set up video input

#### Director Configuration

*   **Use as Director** – Set the selected device as the show's Director
*   **Clear Show from Director** – Remove show data from the Director

#### Asset Manager Configuration

*   **Use as Asset Manager** – Set the selected device for asset management
*   **Close Asset Manager** – Disconnect from current Asset Manager

#### Monitoring

*   **Performance** – Open hardware performance monitor for the device

### Multi-Show Indication

When a device is serving multiple shows simultaneously, a special indicator appears. This helps identify shared resources in multi-show environments.

### Properties

Select a device and view detailed information in the **Properties** panel:

*   **Device Name** – Hostname and identifier
*   **IP Address** – Network address
*   **Services** – List of available services
*   **Version** – Software version information
*   **Status** – Connection and activity state

### Assigning Displays

To assign a display to a device:

1. Create a display on the Stage
2. Open the display's Properties
3. Select the target device from the **Host** dropdown

Or right-click the device in the Network window and choose **Add Display**.

### Refresh

Click the refresh button to manually update the device list. This triggers an immediate network scan for WATCHOUT devices.



\newpage


## Customizing Your Workspace

WATCHOUT 7's interface is fully customizable to match your workflow. The flexible window system allows you to arrange, resize, and organize your workspace exactly as you prefer.

### Window Management

#### Moving Windows

Drag any window by its title bar to reposition it within the application. Windows can be placed anywhere on screen and can overlap freely.

#### Resizing Windows

Drag the edges or corners of any window to resize:

*   **Edges** – Resize in one direction
*   **Corners** – Resize in both directions simultaneously

Windows maintain a minimum size to ensure controls remain usable.

#### Closing Windows

Click the × button in any window's title bar, or right-click the title bar and select **Close**.

#### Reopening Windows

Closed windows can be reopened via the **Window** menu:

*   **Window -> Stage**
*   **Window -> Timeline**
*   **Window -> Assets**
*   **Window -> Properties**
*   **Window -> Network**
*   **Window -> Variables** (for show variables/inputs)

### Window Docking

Windows can be **docked** to the edges of the application:

1. Hold `Ctrl` and double-click a window's title bar
2. The window docks to the nearest edge

Docked windows:

*   Stretch to fill the edge
*   Don't overlap other content
*   Stay at their docked position when the application resizes

To undock, hold `Ctrl` and double-click the title bar again.

### Layout Presets

Save and recall up to 9 custom workspace layouts:

#### Saving Presets

*   `Ctrl+Shift+1` through `Ctrl+Shift+9` – Save current layout to preset 1-9

#### Loading Presets

*   `Ctrl+1` through `Ctrl+9` – Load layout preset 1-9

Presets remember:

*   Window positions
*   Window sizes
*   Which windows are open
*   Docking states

### Layout Files

For sharing layouts between projects or team members:

#### Save Layout to File

*   **Window -> Save Layout** – Export current workspace to a `.layout.json` file

#### Load Layout from File

*   **Window -> Load Layout** – Import a workspace from file

### Reset Layout

To restore the default workspace arrangement:

*   **Window -> Reset Layout**

This returns all windows to their original positions and sizes.

### Window Navigation

#### Cycling Windows

Navigate between windows using keyboard shortcuts:

| Shortcut | Action |
| --- | --- |
| `Ctrl+Tab` | Activate next window |
| `Ctrl+Shift+Tab` | Activate previous window |
| `Ctrl+\`` | Next window of same type |
| `Ctrl+Shift+\`` | Previous window of same type |

#### Direct Window Access

Jump directly to specific windows:

*   **Stage** – Click in background or use **Window -> Stage**
*   **Timeline** – **Window -> Timelines**
*   **Assets** – **Window -> Assets**
*   **Properties** – **Window -> Properties** or `Ctrl+P`
*   **Network** – **Window -> Network**

### Theme Selection

Toggle between visual themes via **Window -> Light Theme**:

*   **Dark Theme** – Reduced brightness for low-light environments
*   **Light Theme** – Higher contrast for bright environments

Your theme preference persists across sessions.

### Multiple Timeline Windows

WATCHOUT supports multiple Timeline windows open simultaneously, useful when working with multiple timelines in your show. Each Timeline window operates independently and can display a different timeline.

### Window Focus Indicators

The active (focused) window displays:

*   Brighter title bar text
*   Enhanced border color
*   Stronger drop shadow

This visual hierarchy helps identify which window receives keyboard input.

### Transparent Stage

The Stage window can display a transparent background when configured, allowing the operating system desktop or other applications to show through. This is useful for:

*   Calibration reference
*   Matching on-screen content with physical elements
*   Presentation previews



\newpage


## The Nodes Window

The **Nodes** window (also known as the Devices & Network window) provides a unified view of your show's output devices and the WATCHOUT nodes available on your network. It consists of two panes that work together to help you configure and monitor your display system.

### Window Layout

The Nodes window is split into two resizable panes:

| Pane | Purpose |
| --- | --- |
| **Devices** (left) | Output devices assigned to your show |
| **Network** (right) | WATCHOUT nodes discovered on the network |

Drag the splitter between panes to adjust their relative sizes.

---

## Devices Pane

The **Devices** pane lists all output devices configured in your show, including displays, audio devices, and capture sources.

### Device Table

| Column | Description |
| --- | --- |
| **Name** | Device name with type icon and optional warning indicators |
| **Host** | The network node hosting this device, or "Virtual" for virtual displays |

### Device Types

Each device displays an icon indicating its type:

| Icon | Type | Description |
| --- | --- | --- |
| Monitor | Display | Physical video output |
| Monitor (shimmer) | Virtual Display | Software-rendered output for compositions |
| Volume | Audio | Audio output device |
| Cast | Capture | Video input source |

### Filtering Devices

Use the dropdown filter to narrow the device list:

| Filter | Shows |
| --- | --- |
| **All** | Every device in the show |
| **Display** | Physical display outputs only |
| **Virtual** | Virtual displays only |
| **Capture** | Video capture sources |
| **Audio** | Audio output devices |

### Device Status Indicators

Devices may display warning icons for issues such as:

*   Missing host assignment
*   Offline host
*   Configuration errors
*   Resolution mismatches

Hover over warning icons to see details.

### Color Coding

Display devices show a colored left border matching their assigned color, making it easy to identify displays across the Stage and Devices views.

### Host Grouping

When sorted by Host, devices on the same node display a connecting bracket in the left margin, visually grouping outputs by their rendering machine.

### Context Menu Actions

Right-click devices to access:

*   **Enable/Disable Device** – Toggle device output
*   **Edit Warp** – Open warp correction editor
*   **Edit Mask** – Open mask editor
*   **Cut/Copy/Paste/Delete** – Standard editing operations
*   **Add Capture** – Create a new capture source
*   **Add Virtual Display** – Create a new virtual display

### Adding Devices

Create new devices using:

*   **Right-click menu** in the Devices pane
*   **Stage menu -> Add Display/Projector**
*   **Right-click a node** in the Network pane

### Editing Devices

*   **Double-click** a device to open its properties
*   **Drag** devices to reorder (when enabled)
*   Select multiple devices with `Shift+Click` or `Ctrl+Click`

---

## Network Pane

The **Network** pane displays all WATCHOUT nodes discovered on your local network. For detailed information, see [The Network Window](06-the-network-window.md).

### Quick Overview

The Network pane shows:

*   **Node name** – Hostname or identifier
*   **Services** – Available WATCHOUT services (Director, Runner, Asset Manager)
*   **Address** – IP address

### Assigning Devices to Nodes

1. Select a node in the Network pane
2. Right-click and choose **Add Display** or **Add Audio Device**
3. The new device is automatically assigned to that node

### Monitoring Node Status

Nodes display real-time status:

*   Normal text – Online and responsive
*   Dimmed text – Offline or not responding recently

---

## Workflow Tips

### Efficient Device Management

1. **Filter by type** when working with many devices
2. **Sort by Host** to see device groupings per node
3. **Use color coding** to match devices between Stage and Devices views

### Multi-Selection

Select multiple devices to:

*   Enable or disable as a group
*   Move to a different host
*   Delete in bulk

### Drag and Drop

Drag devices from the Devices pane to the Stage to reposition displays visually.



\newpage


# WORKING WITH SHOWS

A WATCHOUT show (.watch file) contains all your display configurations, media references, timeline data, and settings. Learn how to create, manage, and organize your shows effectively.



## Creating a New Show

Every WATCHOUT project begins with creating a show. A show is the container for all your displays, timelines, cues, and media references—essentially your entire production wrapped into a single document that can be saved, shared, and deployed across your network.

When you create a new show, WATCHOUT prepares a fresh workspace with an empty Stage canvas and at least one Timeline ready for programming. No displays are defined yet, no media has been imported, and the stage coordinates default to a neutral origin point. This blank slate approach means you have complete control over how your production takes shape from the very beginning.

### Starting a New Show

You can create a new show in two ways. From the **Welcome Screen** that appears when you first launch Producer, click **New Show** to begin immediately. Alternatively, if you're already working in the application, choose **File -> New** from the menu bar.

If you have unsaved changes in a currently open show, WATCHOUT will ask whether you want to save your work before proceeding. This safeguard ensures you never accidentally lose edits by starting fresh.

### What a New Show Contains

A freshly created show includes the fundamental structures you need to begin production work. The **Stage** window displays an empty canvas where you'll eventually position displays and arrange visual content. A default **Timeline** is created so you can start adding cues right away. The show also inherits default settings for frame rate, timing resolution, and network routing that you can adjust later through Show Properties.

At this point, nothing is connected—no display servers, no Director, no Asset Manager. The show exists purely as a local document on your Producer workstation until you choose to connect it to network resources.

### Organizing Your Project Files

Consider where you'll store your show file before you begin programming. Keeping your show file alongside its associated media assets in a dedicated project folder simplifies collaboration and makes packaging the show for transport much easier. A typical structure might place the show file in a project root folder with subfolders for video assets, images, and audio.

When multiple team members work on the same production, consistent folder conventions prevent confusion about which version of the show is current and where media files should be located.

### Network Considerations

If you create a show while already connected to network nodes, WATCHOUT remains aware of the Director's state. Should you attempt to deploy your new show to a Director that's already running a different production, you'll receive a warning about overriding the existing show. This protection helps prevent accidental interruptions to live systems.



\newpage


## Opening Existing Shows

Most of your time in WATCHOUT will be spent working on shows that already exist—whether you created them yourself in an earlier session or received them from a colleague. The application provides several ways to return to previous work, each suited to different situations.

### Opening from Disk

The most common method is opening a show file directly from your computer's storage. Choose **File -> Open** or press `Ctrl+O` to browse for a show file. WATCHOUT's file dialog filters for its native show format, making it easy to locate the correct file among other project assets.

For shows you've worked on recently, **File -> Open Recent** provides quick access without navigating through folders. Producer remembers your recent show history, so returning to yesterday's work typically requires just two clicks.

### Opening from a Director

Sometimes the show you want to work on isn't stored locally—it's already running on a Director node elsewhere on the network. In these situations, use **File -> Open Show from Director** to connect directly to the running production.

This approach proves valuable when you need to take over programming responsibilities on an existing system. Rather than transferring files and risking version mismatches, you connect straight to the live show data. The same method works well when verifying show state before a performance or when handing off between operators during a multi-day event.

The Welcome Screen also offers connection options for Director-hosted shows, letting you choose between starting fresh locally or joining an existing network session.

### Protecting Unsaved Work

WATCHOUT guards against accidental data loss when switching between shows. If your current show contains unsaved changes and you attempt to open a different one, the application pauses to ask what you'd like to do. You can save your current work, proceed without saving (abandoning recent edits), or cancel the operation entirely and remain in your current show.

This protection applies regardless of how you're opening the new show—whether from disk, from a Director, or via the recent files list.

### Director Override Warnings

When opening a show from a Director that's already running a different production, WATCHOUT displays a prominent warning. Proceeding with the operation will replace the currently running show with the one you're opening, which could interrupt playback or affect displays that are actively showing content.

In rehearsal environments this is typically acceptable, but during live performances such an override could be disruptive. The warning ensures you always make this choice deliberately rather than accidentally.



\newpage


## Saving Your Work

Regular saving is fundamental to any production workflow. WATCHOUT provides several save options to accommodate different scenarios—from quick incremental saves during programming to deliberate version snapshots before major changes.

### The Save Command

The primary save command, accessible via **File -> Save** or `Ctrl+S`, writes your current changes to the show file you're working in. If you're editing a show that's never been saved, this command prompts you to choose a location and filename.

Use this frequently throughout your programming session. Timeline edits, display configurations, property adjustments—all of these modifications live only in memory until you save. A power interruption or application crash would lose unsaved work, so developing a habit of regular saves protects your progress.

### Save As

**File -> Save As** (or `Ctrl+Shift+S`) lets you write the current show to a new file with a different name or location. After saving, your working context switches to this new file—subsequent saves will update the new location rather than the original.

This command is useful when you want to branch your work. Perhaps you're about to make experimental changes and want to preserve a known-good version first. By saving as a new file, you create a checkpoint you can return to if the experiment doesn't work out.

### Save Copy

**File -> Save Copy** creates a duplicate of your show without changing which file you're actively working in. The copy is written to a location you specify, but your current show file remains the active target for future saves.

Think of this as creating a snapshot for archival purposes. You might save a copy before a major rehearsal to preserve that day's version, then continue editing without interruption. The copy serves as a recoverable milestone while your workflow continues unbroken.

### Understanding the Differences

The distinction between these three commands matters in practice. **Save** updates your current file. **Save As** creates a new file and switches your context to it. **Save Copy** creates a new file but leaves your context unchanged.

Knowing which to use prevents confusion about which file contains your latest work. When collaborating with others or managing multiple versions of a production, clear understanding of your save behavior keeps everyone synchronized.



\newpage


## Show Properties

Every show carries a set of properties that define how it behaves globally—settings that affect all timelines, all displays, and all network interactions. These properties establish the fundamental parameters under which your entire production operates.

### Accessing Show Properties

Show properties are accessible through the **Properties** panel when no specific element is selected. Alternatively, you can access them via the **Show > Show Properties** menu option. The properties panel displays all configurable settings organized into logical sections.

---

## General Properties

### Frame Rate

The **Frame Rate** determines the temporal resolution for all timeline operations throughout your show. This setting affects how precisely you can position cues in time and how smoothly animations play back.

**Available Presets:**
- **23.98 FPS** – Standard film rate (24000/1001)
- **24 FPS** – Film rate
- **25 FPS** – PAL/SECAM broadcast standard
- **29.97 FPS** – NTSC broadcast standard (30000/1001)
- **30 FPS** – Standard video rate
- **48 FPS** – High frame rate film
- **50 FPS** – PAL high frame rate
- **59.94 FPS** – NTSC high frame rate (60000/1001)
- **60 FPS** – High frame rate video
- **120 FPS** – Ultra high frame rate
- **Custom** – Specify any frame rate using numerator and denominator values

When selecting **Custom**, you can specify the exact numerator and denominator. The denominator options are **1** (for integer frame rates) or **1.001** (for NTSC-compatible fractional rates).

> **Note:** Frame rate changes affect how timeline positions are calculated. Changing this setting mid-production may shift the timing of existing cues.

### Eye Point

The **Eye Point** defines the default viewer position in 3D space, used for perspective calculations across displays. This setting consists of three coordinates:

- **X** – Horizontal position of the viewer
- **Y** – Vertical position (height) of the viewer  
- **Z** – Distance from the stage/display plane

The eye point is particularly important for:
- 3D projection mapping scenarios
- Multi-display perspective corrections
- Virtual camera positioning

### Auto Update Assets

When enabled, the **Auto Update Assets** option automatically refreshes media files when changes are detected on the Asset Manager. This is useful during content development when source files are being actively modified.

| State | Behavior |
|-------|----------|
| **Enabled** | WATCHOUT monitors source files and updates cues when files change |
| **Disabled** | Assets remain static until manually refreshed |

> **Caution:** Enable this setting during content development, but consider disabling it for live shows to prevent unexpected visual changes.

### SDI Genlock

The **SDI Genlock** option enables hardware synchronization for outputs using SDI (Serial Digital Interface) connections. When enabled, WATCHOUT locks video output timing to an external reference signal.

| State | Use Case |
|-------|----------|
| **Enabled** | Synchronized multi-display setups with SDI infrastructure |
| **Disabled** | Standard software-timed output |

Genlock ensures frame-accurate synchronization across multiple displays, eliminating tearing or timing drift. This requires compatible SDI hardware with genlock input capability.

### Default Anchor Position

The **Default Anchor Position** determines the reference point for newly created media cues. When you add a media cue to a timeline, this anchor point defines which part of the media aligns with the specified position.

**Available Options:**

| Position | Description |
|----------|-------------|
| **Top Left** | Upper-left corner as reference |
| **Top** | Center of top edge |
| **Top Right** | Upper-right corner |
| **Left** | Center of left edge |
| **Center** | Center of the media (default) |
| **Right** | Center of right edge |
| **Bottom Left** | Lower-left corner |
| **Bottom** | Center of bottom edge |
| **Bottom Right** | Lower-right corner |

The anchor position is represented visually using a 3×3 grid selector in the Properties panel.

---

## Sync Groups

**Sync Groups** coordinate playback timing across multiple display servers. By grouping nodes together, you ensure their timelines run in lockstep, which is essential for seamless multi-display presentations.

### Managing Sync Groups

To create a new sync group:
1. Click **Add Sync Group**
2. Enter a name for the group
3. Add member nodes by typing or selecting from available devices

Each sync group displays its member nodes, which can be added or removed using the multi-select chip interface. Nodes are identified by their host reference names as they appear on the network.

### When to Use Sync Groups

- **Multi-server installations** – When content spans multiple playback machines
- **Edge-blended displays** – Where precise frame alignment prevents visible seams
- **Redundant systems** – To keep backup servers synchronized with primary units

> **Note:** Nodes must be network-accessible to participate in sync group coordination. Verify network connectivity before adding nodes to sync groups.

---

## Host Configuration

Host settings define the network infrastructure supporting your show. These properties are typically configured during initial setup and bind the show to specific servers.

### Director

The **Director** host coordinates overall show playback. This is the central server that:
- Manages timeline execution
- Coordinates commands across all nodes
- Maintains master timing for the production

The Director hostname appears in the menu bar during active connections.

### Asset Manager

The **Asset Manager** host stores and distributes media files to display nodes. This server:
- Maintains the central asset library
- Handles file distribution to playback nodes
- Manages asset versioning and updates

The Asset Manager connection status enables or disables asset-related operations throughout the application.

### Time Server

The optional **Time Server** provides network time synchronization for the show. This ensures all nodes reference the same clock source for coordinated playback.

### Log Server

The optional **Log Server** receives logging output from all nodes in the production. Centralizing logs simplifies troubleshooting and provides a unified view of system activity.

---

## Best Practices

### During Pre-Production

Establish your show properties early in the production process:
- Set the frame rate to match your content and output requirements
- Configure host addresses for your network environment
- Define sync groups based on your display topology

### During Technical Rehearsals

Technical rehearsals often reveal issues related to show properties:
- Verify sync group membership matches physical node connections
- Confirm frame rate compatibility with content and displays
- Test genlock settings if using synchronized SDI outputs

### During Live Shows

Maintain stability during live operation:
- Avoid changing frame rate or host configuration
- Consider disabling auto-update assets to prevent surprises
- Document your property settings for quick recovery if needed

If a property change becomes necessary during a live show, pause playback to a safe state before making adjustments. The brief transition is preferable to unexpected disruptions during active content playback.



\newpage


# DISPLAYS AND OUTPUTS

Learn how to configure displays, projectors, and video walls in WATCHOUT. Proper display setup is essential for achieving seamless multi-screen presentations.



## Adding Displays

Displays are the output surfaces your cues render to. In WATCHOUT 7, each display is a configurable device object with placement, routing, and output settings.

### Add a Physical Display

From the **Stage** window, choose:

- **Stage -> Add Display**
- Right-click context action for display creation

You can also add displays from the **Network** window to target a selected node.

### Initial Configuration Checklist

After adding a display, set:

- **Name** (clear operator-friendly label)
- **Address / Host** (target node alias)
- **Resolution** (`width × height`)
- **Output type** (GPU, SDI, NDI, or Virtual)
- **Channel** (physical output channel)

### Placement on Stage

Set display size and position to match the real-world layout:

- Use exact pixel dimensions from the processor or projector chain.
- Align displays in stage coordinates before adding cues.
- Use **Frame All Displays** to verify overall layout.

### Verify with a Test Cue

Before building the full show:

1. Add a simple test image/video cue.
2. Route it to the new display.
3. Confirm output appears on the expected node and connector.

> **Tip:** **Tip:** Use descriptive names like `Left_LED_Wall_A` instead of generic names like `Display 1`.


\newpage


## Virtual Displays

A virtual display behaves like a normal display in the Stage and Timeline, but it is not tied to a physical connector. It is useful for design, planning, and previsualization.

### When to Use Virtual Displays

Use virtual displays when you need to:

- Design content before hardware is on site
- Build a stage map for client review
- Prepare layout/animation while waiting for final routing details
- Simulate a complete system on a laptop or single workstation

### How They Behave

Virtual displays support standard workflow operations:

- Cue placement and stacking
- Tween animation
- Timeline playback preview
- Grouping and composition work

### Transitioning to Physical Outputs

When hardware is ready:

1. Replace virtual targets with GPU/SDI/NDI outputs as needed.
2. Set host address and channel routing.
3. Validate resolution, frame rate, and color settings.

### Best Practice

Keep a naming convention that distinguishes virtual from physical targets, for example:

- `VIRT_MainWall`
- `VIRT_SideScreen_R`

This avoids routing mistakes during deployment.


\newpage


## 3D Mapping Projectors

Projector displays extend WATCHOUT from flat 2D layouts to spatially mapped output. Projector mode uses camera/frustum parameters and calibration tools to align content to real surfaces.

### Adding a Projector

Use:

- **Stage -> Add 3D Projector**
- Network context actions for selected node

You can add at default placement or at a chosen stage/world position.

### Core Projector Parameters

Projector displays expose parameters such as:

- **Eye** (projector position)
- **Target** (look-at point)
- **Roll**
- **Lens shift** (horizontal/vertical)
- **Width/Distance ratio**

These define the projection frustum used for mapping.

### Projector Camera Mode

Switch Stage camera mode to **Projector** for alignment work. WATCHOUT supports calibration workflows with virtual/reality points and continuous/manual calibration behavior.

### Calibration Requirements

For reality-point adjustment workflows, provide enough calibration points first.

> **Warning:** Projector calibration in 2D reality mode requires at least six virtual points before editing reality points.

### Operational Notes

- Projector mode is not available while viewing a composition-only stage context.
- Keep calibration and geometry edits versioned like any other critical show state.


\newpage


## Display Grid Setup

Grid tools speed up setup for LED walls, tiled monitors, and repeated projection arrays.

### Create Display Grid

Use **Create Display Grid** to generate multiple displays in one operation.

Typical parameters:

- **Columns / Rows**
- **Display Resolution**
- **Horizontal / Vertical spacing**
- **Start position** (left/bottom anchor)

### Arrange Existing Displays as Grid

Use **Arrange as Grid** when displays already exist but need structured alignment.

This is useful after importing or manual creation where displays are slightly misaligned.

The arrange tools support different ordering strategies:

- **Closest first**
- **Row order**
- **Column order**

### Arrange Selected Cues as Grid

The Stage also provides **Arrange as Grid** for selected cues. This is useful when you want rapid layout structure without changing display geometry.

Typical use:

1. Multi-select cues in Stage.
2. Open **Arrange as Grid**.
3. Set rows/columns, spacing, and strategy.
4. Apply and fine-tune manually if needed.

### Pack Cues Inside a Display

Use **Pack Inside Display** to fit selected cues inside a target display rectangle.

This is useful when:

- You need quick normalization after freehand cue placement.
- You want selected cues constrained to a specific output region.
- You are preparing cue clusters for handoff to another operator.

### Recommended Workflow

1. Create or arrange the grid.
2. Frame all displays and verify orientation.
3. Rename displays logically by row/column.
4. Apply output/channel assignments.
5. Add test content spanning the full grid.

### Grid Strategy Tips

- For LED processors, match processor canvas dimensions exactly.
- Keep spacing at zero unless you intentionally model physical gaps.
- Use separate stage tiers for alternate grid states (rehearsal vs show variants).


\newpage


## Display Properties

Display Properties control how each display is rendered, routed, and calibrated.

### General Properties

- **Name / Color / Enabled / Locked**
- **Address (host alias)**
- **Placement and orientation**
- **Tier visibility** (which stage tiers can show cues)

### Output Properties

| Property | Purpose |
| --- | --- |
| **Output Type** | `GPU`, `SDI`, `NDI`, or `Virtual` |
| **Channel** | Physical/logic output index |
| **Resolution** | Render target dimensions |
| **Color Depth** | Output precision (for supported hardware) |
| **Color Space** | Display color pipeline target |
| **Interlaced** | Enable interlaced output where required |
| **Delay Frames** | Output delay compensation |
| **Max Quality** | Higher quality render path where needed |

### Signal and Calibration

Display-level calibration settings include:

- **White point**
- **NDI calibration stream**
- **Render info overlay**
- **Warp/mask/soft-edge integration**

### Practical Advice

- Keep channel numbering consistent with physical labeling.
- Use lock state once routing is approved.
- Document non-default delay/color settings for handoff.


\newpage


## Edge Blending

Edge blending smooths overlap regions between adjacent projected outputs so they appear as one continuous image.

### Automatic Soft Edges

WATCHOUT supports automatic soft-edge generation using overlap geometry between displays.

Under the hood, overlap regions are converted into gradient-intensity meshes so brightness can be feathered across boundaries.

### Blend Control Methods

Common methods include:

- **Automatic soft edges** from overlapping display geometry
- **Mask-based shaping** for custom overlap boundaries
- **Manual warp/mask refinement** for irregular surfaces

### Calibration Workflow

1. Align projector geometry first.
2. Enable soft edges and review overlap zones.
3. Fine-tune masks where automatic blending is insufficient.
4. Validate using grayscale ramps and full-brightness test images.

### Common Pitfalls

- Incorrect projector black levels can make seams visible.
- Non-uniform brightness or color temperature across projectors reduces blend quality.
- Overly narrow overlaps leave no room for smooth falloff.

> **Tip:** Blend calibration is most reliable in a controlled lighting environment with stable projector warm-up.


\newpage


## Geometry Correction

Geometry correction aligns rendered imagery to real-world surfaces. In WATCHOUT, this is handled through warp geometry and optional mask geometry.

### Warp Geometry

Warp geometry is mesh-based and supports:

- Adjustable junction points
- Handle-based curve shaping
- Perspective correction transforms
- Per-display editing

This allows precise correction for curved screens, imperfect mounting, and non-rectangular targets.

### Mask Geometry

Mask geometry controls where pixels are visible and how edges are shaped. Use it to:

- Hide spill outside scenic boundaries
- Build custom blend/feather regions
- Combine multiple mask regions on one display

### Recommended Workflow

1. Complete physical alignment first.
2. Apply coarse warp adjustments.
3. Add fine curve/handle corrections.
4. Add masks for cutouts and scenic limits.
5. Re-check cue positioning with representative content.

### Quality Control

Validate with:

- Grid test patterns
- Straight-line graphics for distortion checks
- Real show media at final brightness

Small geometry errors become obvious once motion and high-contrast content play back.


\newpage


# ASSETS & ASSET MANAGER

The Asset Manager is the central hub for all media content in WATCHOUT 7. It handles importing, organizing, optimizing, and distributing media files across your production network. Understanding the Asset Manager is essential for efficient show production.



## Asset Manager

The Asset Manager is a core component of WATCHOUT 7 that manages all media files used in your shows.

### Overview

The Asset Manager runs as a background service and provides:

- **Centralized Storage** – All media files are managed from a single location

- **Automatic Optimization** – Video files are transcoded to optimal playback formats

- **Network Distribution** – Assets are automatically transferred to display servers

- **Version Tracking** – Changes to source files are detected and handled

### Assets Window

The Assets window displays all media in your show. Access it from **Window -> Assets** or press `Ctrl+2`.

### Adding Assets

- **Drag and Drop** – Drag files directly from Windows Explorer into the Assets window

- **Menu** – Use **Media -> Add Media File** or **Add Image Sequence**

- **Right-Click** – Right-click in the Assets window and choose **Add Media**

- **Asset Watcher** – Automatically import from watched folders

### Asset Organization

Organize assets using folders:

- Right-click in the Assets window

- Select **Add Folder**

- Drag assets into folders to organize them

Use **Media -> Collapse All Folders** and **Expand All Folders** for quick navigation.


\newpage


## Asset Types

WATCHOUT 7 supports a wide variety of media types, each with specific capabilities and use cases.

### Still Images

| Type | Formats | Notes |
| --- | --- | --- |
| Standard Images | JPEG, PNG, BMP, TGA, TIFF | Common image formats |
| High Dynamic Range | EXR, HDR | For HDR displays |
| Layered | PSD | Imported as flattened image |
| Vector | SVG | Rasterized at import |

### Video

| Type | Formats | Notes |
| --- | --- | --- |
| GPU-Accelerated | HAP, HAP Alpha, HAP Q | Best performance - recommended |
| Professional | ProRes 422/4444, DNxHR | High quality, decode only |
| Compressed | H.264, HEVC/H.265 | Smaller files, more CPU usage |
| Specialty | NotchLC | Real-time graphics from Notch |

### Image Sequences

Numbered image files treated as video frames. Supports JPEG, PNG, TGA, TIFF, and EXR sequences.

### Audio

| Format | Notes |
| --- | --- |
| WAV | Recommended - uncompressed, best quality |
| AIFF | Uncompressed audio |
| MP3 | Compressed audio |
| AAC, FLAC, OGG | Additional compressed formats |

### Live Sources

- **NDI** – Network Device Interface streams

- **Capture Cards** – BlackMagic, AJA, and other capture devices

- **Screen Capture** – Capture from desktop or specific windows

- **Web Browser** – Render web pages as live content

### Special Types

- **Composition** – Nested timeline as a reusable asset

- **Solid Color** – Color fills for backgrounds or overlays

- **Dynamic Text** – Text that can be updated at runtime


\newpage


## Asset Properties

Each asset has properties that control how it behaves in your show. Access properties by selecting an asset and viewing the Properties panel, or double-click to open the Asset Properties dialog.

### General Properties

| Property | Description |
| --- | --- |
| Name | Display name in the Assets window |
| Source Path | Location of the original file |
| Duration | Length for video/audio assets |
| Dimensions | Width × Height in pixels |
| Frame Rate | Playback speed for video/sequences |

### Video Properties

| Property | Description |
| --- | --- |
| Codec | Video compression format |
| Bit Depth | Color depth (8-bit, 10-bit, etc.) |
| Alpha Channel | Transparency support |
| In Point | Start trim point |
| Out Point | End trim point |
| Loop Mode | None, Loop, or Ping-Pong |

### Audio Properties

| Property | Description |
| --- | --- |
| Sample Rate | 44.1kHz, 48kHz, 96kHz, etc. |
| Bit Depth | 16-bit, 24-bit, 32-bit float |
| Channels | Mono, Stereo, 5.1, 7.1, etc. |
| Volume | Default playback level |

### Optimization Status

- **Pending** (gray) – Not yet optimized

- **Optimizing** (yellow) – Currently being processed

- **Ready** (green) – Optimized and ready for playback

- **Error** (red) – Optimization failed

- **Modified** (orange) – Source file has changed, needs re-optimization

### Actions

- **Re-optimize** – Regenerate optimized version

- **Reveal in Explorer** – Open source file location

- **Find Cues** – Locate all timeline cues using this asset

- **Replace Asset** – Swap with a different file


\newpage


## Formats & Codecs

Choosing the right format and codec is crucial for optimal playback performance.

### Recommended Video Codecs

| Codec | Best For | Performance | File Size |
| --- | --- | --- | --- |
| **HAP** | Most video content | ***** | Large |
| **HAP Alpha** | Video with transparency | ***** | Very Large |
| **HAP Q** | Highest quality HAP | ****o | Very Large |
| **ProRes 422** | High quality editing | ***oo | Large |
| **ProRes 4444** | Quality with alpha | ***oo | Very Large |
| **H.264** | Small files, wide compatibility | **ooo | Small |
| **HEVC/H.265** | Better compression than H.264 | **ooo | Very Small |
| **NotchLC** | Real-time graphics | ***** | Large |

### Why HAP is Recommended

- **GPU Decoding** – Decodes directly on the graphics card

- **Minimal CPU Usage** – Leaves CPU free for other tasks

- **Instant Scrubbing** – Smooth timeline navigation

- **High Frame Rates** – Supports 60fps and beyond

- **Large Resolutions** – Handles 4K, 8K, and higher

### Container Formats

| Container | Common Codecs |
| --- | --- |
| .mov | HAP, ProRes, H.264 |
| .mp4 | H.264, HEVC |
| .avi | HAP (legacy) |
| .mkv | Various |

### Audio Codecs

- **PCM/WAV** – Uncompressed, best quality, larger files

- **AAC** – High quality compressed

- **MP3** – Widely compatible compressed

### Image Formats

| Format | Transparency | Best For |
| --- | --- | --- |
| PNG | Yes (8-bit) | Graphics, logos, overlays |
| JPEG | No | Photos, backgrounds |
| TIFF | Yes | High quality images |
| TGA | Yes | Legacy graphics |
| EXR | Yes (32-bit) | HDR content |


\newpage


## Web User Interface

WATCHOUT 7 includes a web-based interface for managing assets remotely. This allows team members to upload and organize media without direct access to the production computer.

### Accessing the Web UI

- Open a web browser on any device on the same network

- Navigate to `http://[producer-ip]:3040`

- The Asset Manager web interface loads automatically

### Features

- **Upload Files** – Drag and drop or browse to upload media

- **Browse Assets** – View all assets in the current show

- **Create Folders** – Organize assets into folders

- **Preview Media** – View thumbnails and preview video

- **Check Status** – Monitor optimization progress

- **Delete Assets** – Remove unwanted media

### Upload Progress

Large files show upload progress in the web interface. Once uploaded, optimization begins automatically.

### Security Considerations

- The web UI is accessible to anyone on the local network

- Consider network segmentation for production environments

- Use firewall rules to restrict access if needed

### Mobile Access

The web interface is responsive and works on tablets and smartphones for on-the-go asset management.


\newpage


## Asset Watcher

The Asset Watcher automatically monitors designated folders for new or changed files, streamlining the content workflow.

### Setting Up Watch Folders

- Go to **Settings -> Asset Manager**

- Click **Add Watch Folder**

- Browse to the folder you want to monitor

- Configure import options

- Click **OK** to enable watching

### Watch Folder Options

| Option | Description |
| --- | --- |
| Include Subfolders | Monitor subdirectories recursively |
| File Types | Filter which file types to import |
| Target Folder | Where to place imported assets in the show |
| Auto-Delete Source | Remove source after successful import |

### How It Works

- Place new media files in the watched folder

- Asset Watcher detects the new files

- Files are automatically imported into the show

- Optimization begins immediately

- Assets appear in the Assets window when ready

### File Change Detection

If a source file is modified:

- The Asset Watcher detects the change

- The asset is marked as modified (orange icon)

- Re-optimization is triggered automatically

- Updated content is distributed to display servers

### Use Cases

- **Collaborative Workflows** – Content creators drop files for operators

- **Live Updates** – Update content during a show

- **Automated Pipelines** – Integrate with render farms or CMS


\newpage


## Asset Transfer

When going online, optimized assets must be transferred to display servers. WATCHOUT manages this automatically.

### Transfer Process

- **Comparison** – Producer compares local and remote asset versions

- **Queue** – Changed or new assets are queued for transfer

- **Transfer** – Files are sent over the network to each server

- **Verification** – Checksums confirm successful transfer

- **Ready** – Server signals ready when all assets are loaded

### Transfer Status

Monitor transfer progress in the Network window:

- **Blue progress bar** – Transfer in progress

- **Percentage** – Completion status per server

- **Green check** – All assets transferred successfully

- **Red X** – Transfer error occurred

### Optimizing Transfer Speed

- **Use Gigabit or faster** – 1Gbps minimum, 10Gbps recommended

- **Quality switches** – Avoid consumer-grade network equipment

- **Dedicated network** – Separate WATCHOUT traffic from other data

- **Pre-stage assets** – Copy large files manually before going online

### Pre-Staging Assets

For very large shows, pre-stage assets on display servers:

- Copy optimized asset folder to display server

- Place in the designated asset cache location

- When going online, existing assets are used without transfer

### Managing Disk Space

- **Optimized cache** – Located in the show's asset folder

- **Server cache** – Stored on each display server's local drive

- **Cleanup** – Remove unused optimized assets via File menu


\newpage


## Asset Manager Settings

Configure the Asset Manager behavior through the Settings dialog.

### Accessing Settings

Go to **Edit -> Preferences -> Asset Manager** or access from the Assets window menu.

### General Settings

| Setting | Description |
| --- | --- |
| Cache Location | Where optimized assets are stored |
| Max Cache Size | Limit on disk space for optimized files |
| Auto-Optimize | Automatically optimize new imports |
| Parallel Optimize | Number of simultaneous optimization jobs |

### Optimization Defaults

| Setting | Description |
| --- | --- |
| Target Codec | Default codec for optimized video (HAP recommended) |
| Quality Level | Balance between quality and file size |
| Max Resolution | Cap on output resolution |
| Frame Rate | Target frame rate for optimization |

### Network Settings

| Setting | Description |
| --- | --- |
| Web UI Port | HTTP port for web interface (default: 3040) |
| Transfer Port | Port for asset distribution |
| Bandwidth Limit | Maximum network speed for transfers |

### Watch Folder Settings

- Add, remove, and configure watched directories

- Set default import behavior

- Enable/disable watching per folder

### Advanced Settings

- **GPU Acceleration** – Use graphics card for encoding/decoding

- **Hardware Encoder** – Select specific GPU for optimization

- **Thread Count** – CPU threads for software encoding

- **Memory Limit** – Maximum RAM for optimization processes

### Maintenance

- **Clear Cache** – Remove all optimized files (will re-optimize on demand)

- **Rebuild Database** – Fix corruption in asset database

- **Verify Assets** – Check all source files exist and are valid

- **Export Asset List** – Generate report of all show assets


\newpage


## Import, Export, and Mapping

Beyond normal drag-and-drop ingest, the Assets window includes transfer workflows for moving asset sets between systems and controlling optimization behavior.

### Export Workflows

From the Assets context menu, use:

- **Export All Assets...**
- **Export Selected Assets...**

Both open a destination dialog and validate the target path before export.

Use export when you need to:

- Hand over media to another system
- Archive a show media package
- Prepare a controlled import on another production machine

### Import Workflows

Use **Import Assets...** to import an exported asset package.

Key options:

- **Import path** on the current Asset Manager host
- **Merge Assets** toggle

`Merge Assets` can be much faster than copy-based import, but it is intended for specific cases:

- Source and target must be on the same disk/volume
- The export package should be treated as a one-time merge source

### Optimizer Mapping

Use **Mapping...** from the Assets context menu to manage optimizer mapping.

This workflow lets you map source format groups ("in") to optimization targets ("out"), then save the mapping for future optimization jobs.

Supported operations in the mapping dialog:

- Override individual mappings
- Restore a row to default
- Reset all non-default mappings
- Store the updated mapping

### Practical Workflow

1. Export before major cleanup or migration.
2. Import on the target system and verify optimization status.
3. Apply mapping changes only when there is a clear format/performance goal.
4. Use **Find Cues** on critical assets before delete/replace operations.


\newpage


# TIMELINE AND CUES

The timeline is where your show comes to life. Learn how to arrange media, control timing, and create dynamic presentations.



## Understanding the Timeline

The Timeline is where show logic is sequenced. Cues on layers define what plays, when it plays, and how it behaves.

### Core Elements

- **Time ruler**: visual time scale for navigation and placement
- **Play cursor**: current playback/jump position
- **Layers**: stacking order for visual priority
- **Cues**: media or control objects with start and duration
- **Zoom and scroll**: precision editing across long timelines

### Cue Sequences

A timeline can represent:

- A normal timeline
- A composition timeline

Both use the same editing concepts, but compositions are often used as grouped reusable structures.

### Navigation Patterns

- Click the ruler to move time.
- Use arrow-key navigation to step between cues on active layer.
- Use zoom controls (`Numpad +` / `Numpad -`) for fine timing edits.

### Selection Context

The Timeline has context-sensitive behavior:

- Timeline context (global operations)
- Cue context (cue edits)
- Layer context (layer properties)

Shortcuts and menu actions can change behavior depending on which context is active.


\newpage


## Adding Media Cues

Media cues are created by placing assets on a timeline.

### Add a Cue

1. Import media into **Assets**.
2. Drag the asset into the Timeline.
3. Drop at the desired start time and layer.

### Placement Behavior

WATCHOUT supports different placement strategies during drag/drop:

- **Sequence-oriented** placement
- **Layer-oriented** placement

Use modifier behavior (such as `Ctrl` during drag) when you want to force layer-based placement behavior.

### Initial Cue Values

A newly created media cue usually gets:

- Start time from drop position
- Duration from source media (or default behavior)
- Layer assignment from drop target

### Next Steps After Placement

- Move or trim cue timing
- Add tweens for motion/effects
- Set cue routing/output options if needed
- Test by scrubbing and short playback loops


\newpage


## Working with Layers

Layers determine draw order and help organize complex timelines.

### Layer Basics

- Higher layers visually stack above lower layers.
- Layer names should reflect purpose (for example `BG`, `FX`, `Titles`).
- Keep a clean layer structure early to avoid late-stage confusion.

### Layer Operations

| Action | Shortcut |
| --- | --- |
| Insert layer | `Ctrl+I` |
| Delete active layer | `Ctrl+Delete` |
| Select all cues on active layer | *(menu action)* |

You can also append layers and reorder them during timeline editing.

### Layer-Focused Workflow

- Use one layer for each functional category when possible.
- Keep control cues separate from media-heavy layers.
- Lock or minimize edits to stable layers during live programming.

### Key-Layer Considerations

Some workflows use key/fill logic at layer level. Verify cue compatibility before grouping effects across mixed-purpose layers.


\newpage


## Adjusting Timing

Precise timing is central to show quality. WATCHOUT provides direct manipulation and command-based timing edits.

### Common Timing Edits

- Drag cue body to move start time
- Drag cue edges to trim duration
- Use trim commands for exact operations

### Trim and Reset Actions

Available timeline actions include:

- **Trim Start**
- **Trim End**
- **Reset Duration**
- **Reset In-Time**

These are useful when cues need to be quickly normalized after rehearsal changes.

### Snapping

Snapping helps align edits to meaningful points:

- Cue start/end points
- Current play cursor
- Nearby timeline structures

Toggle snapping with `Ctrl+N`.

### Navigation-Assisted Timing

Use keyboard navigation to jump between cues on active layer, then adjust timing without losing selection context.


\newpage


## Control Cues

Control cues affect playback state instead of rendering media.

### Main Control Cue Types

- **Play Control Cue**: starts target timeline/composition
- **Pause Control Cue**: pauses target timeline/composition
- **Output Cue**: sends external output data
- **Variable Cue**: automates show variable values

### Creating Control Cues

Use the Timeline menu or shortcuts:

- Add Play Cue: `Ctrl+P`
- Add Pause Cue: `Ctrl+Shift+P`

Output and variable cues are available from timeline actions and context menus.

### Targeting Behavior

Control cues can target:

- Enclosing timeline
- Explicit include/exclude lists
- Other timelines or all timelines depending on mode

Targeting modes are typically used as:

- **All**: broad control across active timeline set
- **Others**: affect all timelines except the enclosing timeline
- **List**: explicit include list (or exclude list depending on mode)
- **Enclosing**: local/self timeline control

### Jump Behavior

Control cues can also define jump behavior:

- No jump
- Jump to target time
- Jump to target cue (forward/search variants)

This is useful for structured branching and operator-assisted recovery paths.

### Variable Cue Note

Variable cues are part of control-oriented timeline workflows and are covered in detail in [Variables and Variable Cues](09-variables-and-variable-cues.md).

Use clear naming and color coding so operators can identify control intent quickly.


\newpage


## Comment Cues

Comment cues (marker cues) provide timeline annotations for operators, programmers, and show callers.

### What Comment Cues Are For

- Scene-change notes
- Technical reminders
- Operator prompts
- Countdown/count-up references

### Creating Comment Cues

- Use **Add Comment/Marker Cue** actions
- Shortcut: `Ctrl+Enter`

### Marker Options

Comment cues can include:

- Description text
- Countdown mode
- Count-up mode
- Marker duration settings

### Best Practices

- Keep marker text short and operational.
- Use consistent prefixes (`LX`, `SFX`, `VFX`, `GO`) when collaborating with show control teams.
- Place markers slightly ahead of critical moments for operator reaction time.


\newpage


## Output Cues

Output cues transmit external control data during timeline playback.

### Output Cue Fields

Typical output cue properties include:

- **Protocol**
- **Address**
- **Port**
- **Data payload**

These let you trigger external systems in sync with timeline events.

### Typical Use Cases

- Triggering automation systems
- Sending commands to control middleware
- Driving external effects synchronized with visuals

### Reliability Tips

- Keep payloads deterministic and documented.
- Test cue timing with full show playback speed.
- Validate routing on the same network architecture used in production.

> **Warning:** If external systems are safety-critical, include operator confirmation and fallback procedures outside timeline automation.


\newpage


## Grouping Cues

Grouping lets you treat multiple cues as a single composition unit.

### Why Group Cues

Use grouping to:

- Reuse complex multi-cue moments
- Keep large timelines manageable
- Apply structure for team collaboration

### Group / Ungroup Operations

| Action | Shortcut |
| --- | --- |
| Group selected cues | `Ctrl+G` |
| Ungroup selected cues | `Ctrl+Shift+G` |

Grouped cues become composition-like structures you can manage independently.

### Practical Workflow

1. Build and test the cue cluster.
2. Group when behavior is stable.
3. Name the resulting composition clearly.
4. Avoid frequent regrouping late in production unless necessary.

### Important Note

Some stage operations (such as projector-mode workflows) are restricted while working in composition-focused contexts. Plan mapping work in the main stage context when needed.


\newpage


## Variables and Variable Cues

WATCHOUT variables let you drive timeline behavior and runtime values with explicit numeric controls.

### Variables Window Workflow

Open **Window -> Variables** to manage show variables.

Core actions:

- Add/remove variables
- Edit live values with sliders
- Save current values as new defaults

Each variable can define:

- Name
- External key
- Min/max/default value
- Interpolation mode

### Learning External Keys

Variable properties include a **Learn** mode for capturing an external key assignment.

Typical workflow:

1. Select a variable.
2. Enable **Learn**.
3. Send the external control signal.
4. Confirm key assignment and disable learning.

### Adding Variable Cues on the Timeline

Variable automation can be added in timeline context by using variables as drag sources.

Supported interactions:

- Drag variables to a layer area to create a **Variable Cue**
- Drop variables on an existing cue to add variable-related tween data

### Good Practice

- Keep variable names stable and descriptive.
- Set realistic min/max bounds before building automation.
- Save known-safe defaults before rehearsals and show runs.
- Use marker/comment cues to document operator-sensitive variable changes.


\newpage


## Timeline Triggers and Expressions

Timelines can react automatically to expression-based trigger rules for play, pause, and stop.

### Where to Configure Triggers

1. Open the **Timelines** window.
2. Select a timeline (or folder context where applicable).
3. Open **Properties**.
4. Go to the **Triggers** section.
5. Edit:
   - **Play Expression**
   - **Pause Expression**
   - **Stop Expression**

### Validation and Hints

Trigger fields are validated while editing.

The editor also provides expression hints/autocomplete support based on the current token, helping you reference available inputs correctly.

If an expression references unknown inputs, validation will fail until corrected.

### How to Use This in Practice

- Use trigger expressions for predictable state transitions.
- Keep expressions simple and testable.
- Prefer explicit variable names over implicit assumptions.
- Verify trigger behavior in rehearsal with controlled input changes.

### Scope Notes

Trigger editing is intended for timeline control contexts and is not shown for composition-only contexts.

Treat trigger rules as show logic: version them, review them, and regression-test them after major timeline edits.


\newpage


## ArtNet Fixture Cues

WATCHOUT includes an ArtNet fixture workflow spanning Assets and Cue Properties.

### Create Fixture Assets

In the **Assets** window context menu, use **Add ArtNet Fixture...** and choose a preset.

This creates fixture-oriented assets that can be used in timeline cues.

### Add Fixture Cues to a Timeline

Add the fixture asset to a timeline as a media cue, then open **Cue Properties**.

When a cue is ArtNet-based, a **Fixture** section is available for addressing and mode selection.

### Fixture Address and Mode

Fixture properties include:

- Universe addressing fields (net/sub-net/universe and absolute universe)
- Start channel
- Fixture mode selection (from available fixture modes)

Use consistent addressing conventions across your control/network team to avoid collisions.

### Recording Source and Channel Mapping

If a fixture cue uses ArtNet recording data, cue properties include mapping tools to route recorded channels to fixture output channels.

Typical operations:

- Choose fixture and recording asset versions
- Map recorded channels to fixture channels
- Clear mappings where needed
- Discard recording linkage when reworking the cue

### Operational Tips

1. Lock addressing decisions early in rehearsal.
2. Version fixture assets deliberately; avoid last-minute mode swaps.
3. Validate channel mapping on the real output network before show operation.


\newpage


# EFFECTS AND TWEENS

Tweens bring your content to life with animation. Learn how to create smooth transitions and dynamic effects.



## Understanding Tweens

Tweens are time-based value changes attached to cues. They define animation curves for motion, opacity, color, crop, and other properties.

### Tween Structure

A tween consists of:

- **Type** (for example position, opacity, blur)
- **Points** over cue time
- **Interpolation** between points
- **Value limits/units** depending on tween type

### Supported Categories

WATCHOUT includes media tweens for:

- Position, scale, rotation
- Opacity and fades
- Crop and blur
- Color controls
- Audio volume

### Units and Limits

Tween values can use different units depending on type:

- Percent-based values
- Degree-based values
- Raw numeric ranges

Value limits are defined per tween type and enforced in the editor.

### Practical Advice

- Start with two-point tweens (start/end), then refine.
- Keep easing readable and intentional.
- Avoid unnecessary tween density unless needed for precision.


\newpage


## Position and Movement

Position tweens animate where a cue appears on Stage over time.

### Add Position Animation

Use **Position** tween actions (menu or shortcut `Alt+P`) on selected cues.

### Typical Uses

- Slide-ins and exits
- Object tracking across LED canvases
- Camera-like pan effects with layered content

### Precision Tools

- Add points directly on tween curves for key moments.
- Combine with cue start/duration edits for exact synchronization.
- Use nudge commands for fine stage-space adjustments.

### Best Practices

- Animate on one axis first, then add secondary motion.
- Keep movement curves simple for repeatable live operation.


\newpage


## Scale and Size

Scale controls cue size over time and can be driven by tween points or static cue settings.

### Scale Modes

WATCHOUT supports multiple scaling strategies in cue properties, including:

- Scale to explicit size
- Scale by factor
- Media-based scaling behavior

### Scale Tweens

Use **Scale** tween actions (shortcut `Alt+S`) to animate growth/shrink effects.

### Common Use Cases

- Pop-in titles
- Slow zoom emphasis
- Scale-matched transitions between scenes

### Tips

- Keep aspect behavior consistent across related cues.
- Check final pixel sharpness on target output, not only in workstation preview.


\newpage


## Rotation Effects

Rotation tweens control orientation in 2D and 3D contexts.

### Rotation Axes

WATCHOUT provides:

- **Rotation Z** (`roll`) for classic 2D spin
- **Rotation Y** (`yaw`) for horizontal 3D turn
- **Rotation X** (`pitch`) for vertical 3D tilt

Shortcuts:

- `Alt+Z` for Rotation Z
- `Alt+Y` for Rotation Y

### Practical Uses

- Badge or logo spins
- Card-flip style transitions
- Perspective movement enhancements

### Control Tips

- Keep pivot/anchor placement in mind before animating.
- Large 3D rotations often need complementary position/scale adjustment.


\newpage


## Opacity and Fades

Opacity and fade controls define visibility transitions for cues.

### Opacity Tween

Use **Opacity** tween (`Alt+O`) for fully custom transparency animation.

### Fade Helpers

WATCHOUT also supports dedicated fade actions:

- **Fade In** (`Shift+Alt+I`)
- **Fade Out** (`Shift+Alt+O`)
- **Cross Fade** (`Shift+Alt+X`)

These provide fast transition setup with reusable defaults.

### When to Use Which

- Use **fade helpers** for quick standard transitions.
- Use **opacity tween curves** for precise non-linear behavior.

### Common Mistakes

- Overlapping fades without checking final blend result.
- Fades that start/end before cue visibility windows.


\newpage


## Cropping

Crop tweens animate the visible bounds of a cue and are useful for reveals, wipes, and framing.

### Crop Types

- Crop Top
- Crop Bottom
- Crop Left
- Crop Right
- Crop All (all sides together)

Shortcut for crop-all toggle: `Alt+C`.

### Typical Use Cases

- Directional text/image reveals
- Safe-area adjustments without re-rendering assets
- Dynamic framing across multiple aspect ratios

### Workflow Tips

- Start with one side to define motion intent.
- Combine with opacity for softer reveals.
- Validate crop behavior on real output resolution.


\newpage


## Color Adjustments

Color tweens let you animate tonal and channel-level color properties directly on cues.

### Available Color Tweens

- Brightness
- Contrast
- Gamma
- Hue
- Saturation
- Invert
- Red/Green/Blue Gain
- Red/Green/Blue Offset

### Use Cases

- Scene mood transitions
- Day/night look shifts
- Corrective matching between mixed media sources

### Quality Notes

- Extreme values can clip highlights or crush shadows.
- Test color tweens on calibrated outputs when possible.
- For show-wide looks, prefer consistent per-scene strategy over ad hoc cue edits.


\newpage


## Blur Effects

WATCHOUT provides a **Gaussian Blur** tween for softening and defocusing content over time.

### Add Blur

- Use Effect menu blur action
- Shortcut: `Alt+B`

### Creative Uses

- Focus pulls between foreground/background layers
- Transition smoothing
- Stylized intro/outro looks

### Performance Guidance

Blur is GPU-intensive in large compositions. If performance drops:

- Reduce overlapping blurred cues
- Shorten blur-heavy sections
- Pre-render where possible for mission-critical playback


\newpage


## Audio Volume

Volume tweens automate cue loudness over time.

### Add Volume Automation

Use **Volume** tween actions or shortcut `Alt+V` on cues with audio content.

### Common Scenarios

- Music fade-ins and fade-outs
- Ducking under voice-over or announcements
- Layered ambience balancing

### Practical Workflow

1. Set initial cue gain.
2. Add volume tween points at scene boundaries.
3. Verify transitions on the target audio routing path.

### Notes for Complex Shows

If you use multiple output buses/channels, validate both cue-level volume and device/channel mapping so automation behaves as expected at the final output.


\newpage


# PLAYBACK

Learn how to preview your show, connect to display servers, and run your presentation live.



## Starting and Stopping

Playback is controlled per timeline (or composition timeline) using run, pause, and stop states.

### Primary Controls

| Action | Shortcut |
| --- | --- |
| Toggle play/pause | `Spacebar` |
| Run timeline | `Numpad 0` (or Numpad Insert) |
| Pause timeline | `Escape` |
| Jump to current/last start | `Numpad *` |

### UI Controls

Timeline windows provide explicit **Play / Pause / Stop** buttons. The active state is visually highlighted.

### Operational Behavior

- **Run** starts playback from current timeline time (or defined start behavior).
- **Pause** freezes at current position.
- **Stop** ends playback and resets active state.

### Good Practice

Before running live:

1. Move play cursor to known start point.
2. Confirm target timeline/composition is selected.
3. Check that connected nodes/services are healthy.


\newpage


## Preview Mode

Preview mode lets you validate timing, transitions, and composition flow directly in Producer before committing to full system output.

### What to Preview Locally

- Cue timing and transitions
- Tween behavior and motion paths
- Layer and composition logic
- Basic content framing

### Display Previews

WATCHOUT can fetch display preview images for subscribed displays while playback state updates, helping you verify remote output behavior from Producer.

### Preview Limits

Preview is excellent for structure and timing, but final quality checks should still happen on target hardware for:

- Color accuracy
- Brightness/contrast
- Frame pacing under full show load

### Recommended Process

- Use local preview during programming.
- Rehearse on the real network/output path before showtime.


\newpage


## Connecting to Display Servers

In WATCHOUT 7, display servers are discovered nodes running Runner/renderer services. Producer uses discovered node metadata to route displays and monitor service health.

### Discovery and Visibility

Nodes are discovered automatically over multicast and shown in the **Network** window with:

- Host alias
- Address
- Running services
- Version and status indicators

### Typical Connection Workflow

1. Open **Network** window.
2. Confirm target nodes are visible and not stale.
3. Assign display devices to correct host aliases.
4. Connect Producer to the intended Director.

### If a Node Is Missing

- Verify subnet/routing and multicast handling.
- Check local firewall policy.
- Confirm process-manager services are running on the node.
- Ensure host aliases are unique (except planned fallback scenarios).


\newpage


## Going Online

Operationally, going online means your show is actively controlled through a Director with reachable Runner and Asset Manager services.

### Online Readiness Checklist

- Producer is connected to the correct **Director**
- Required nodes are discovered and healthy
- Asset Manager is reachable
- Displays are routed to expected hosts/channels
- Show state is saved

### First Online Pass

Use a short verification pass:

1. Run a known test timeline.
2. Confirm visual outputs on all critical displays.
3. Confirm audio/device-trigger behavior.
4. Check for warnings in activity/log views.

### Common Online Risks

- Director/Runner mismatch (different loaded shows)
- Stale node aliases or duplicate names
- Asset transfer not complete before playback

> **Warning:** Never assume online readiness from a single green indicator. Verify end-to-end output behavior.


\newpage


## Running Your Show

Running a show reliably is mostly about repeatable procedure. Build a fixed preflight and execution rhythm.

### Preflight (Before Audience)

- Confirm show file/version
- Confirm Director and Asset Manager hosts
- Confirm display routing and test image pass
- Confirm timeline start points and cue logic
- Confirm critical external outputs (if used)

### Live Operation Pattern

1. Place play cursor at planned start.
2. Run timeline.
3. Monitor cue progression and node status.
4. Use pause/jump controls only at rehearsed decision points.

### During-Show Recovery Tactics

- If timing drifts: pause, reposition cursor, and re-run from cue-safe point.
- If one node fails: continue if design allows, then recover during a planned hold.
- If output commands fail: verify network route and cue target settings.

### Post-Show

- Save an archival copy of the final show state.
- Export diagnostics/logs if any incident occurred.
- Document timeline or routing changes made during operation.


\newpage


# NETWORK SETUP

Configure your network for optimal WATCHOUT performance. Proper network setup is essential for synchronized multi-display playback.



## Network Overview

WATCHOUT 7 is a distributed system where Producer coordinates Director, Runner, and Asset Manager services across the network.

### Core Service Groups

From the process-manager architecture:

- **Director group**: Director, Operative, Loki
- **Runner group**: Runner, Visual Renderer, Audio Renderer
- **Asset Manager group**: Asset services for media distribution

### Discovery Model

Nodes discover each other automatically over multicast.

Key details:

- Multicast group: `239.2.2.2`
- Discovery port: `3012/UDP`
- Nodes announce on startup and on service/show changes

### Network Design Recommendations

- Keep show-critical nodes on a stable wired network.
- Use predictable host aliases.
- Avoid duplicate host names unless implementing intentional fallback patterns.
- Keep network latency and jitter low for synchronized playback.


\newpage


## Display Servers

A display server node is typically a Runner system responsible for rendering and output.

### Runner Responsibilities

Runner-side services typically include:

- Visual rendering
- Audio rendering
- Runtime show execution received from Director

### Setup Checklist

1. Install WATCHOUT node software.
2. Confirm node appears in Network discovery.
3. Verify required services are running.
4. Route display devices to that node via host alias.

### Operational Notes

- If Director changes, runners can be reassigned by host reference.
- Keep one active show context per runner for predictable behavior.
- Mixed-show states between Director and Runner should be treated as warnings.
- Use host **Actions** for maintenance workflows such as startup action, sync mode, update, and restart.


\newpage


## Connecting Devices

In WATCHOUT, devices (displays, audio devices, capture sources) are bound to discovered node aliases.

### Connection Principles

- Device routing uses **host references/aliases** rather than fixed IP assumptions.
- Discovery updates dynamically as nodes appear/disappear.
- Producer can assign Director and Asset Manager roles to selected nodes.

### Best Practices

- Give each node a unique, descriptive alias.
- Keep aliases stable across rehearsals and show days.
- Reserve duplicate aliases only for intentional failover strategy.

### Validation Workflow

1. Confirm node visible in Network view.
2. Assign device host alias.
3. Verify service state on that node.
4. Run test cue and confirm physical output.


\newpage


## Firewall Configuration

WATCHOUT installer scripts create inbound firewall rules for required network behavior and executables.

### Important UDP Ports

| Port | Purpose |
| --- | --- |
| `123` | NTP time sync |
| `3011` | Multicast query channel |
| `3012` | Multicast/discovery channel |

### Service Port Reference

Protocol definitions include service ports such as:

- `3017` Process Manager
- `3018` Runner
- `3019` Operative External
- `3020` Operative Internal
- `3021` Director
- `3022` Loki
- `3023` Asset Server
- `8000` OSC

### Program-Based Rules

The installer also allows inbound traffic for core executables, including:

- `producer.exe`
- `director.exe`
- `runner.exe`
- `visualrenderer.exe`
- `audiorenderer.exe`
- `asset-server.exe`
- `ptp.exe`
- `mDNSResponder.exe`

### Deployment Advice

- Prefer installer-created rules first.
- If using strict enterprise policy, mirror both UDP port rules and program rules.
- Re-validate after upgrades or path changes.

> **Warning:** Partial firewall openings often cause intermittent discovery or sync failures that are hard to diagnose during live operation.


\newpage


## NDI Video Sources

WATCHOUT 7 supports NDI for both ingest and output workflows.

### NDI Input Workflow

- Add an NDI capture/source in Producer.
- Select the stream by discovered NDI source name.
- Use it like other media cues in timeline and stage workflows.

### NDI Output Workflow

Displays can use **NDI** as output type, enabling network video feeds to downstream systems.

### Calibration and Integration

Display properties include an **NDI calibration stream** field for specific calibration and workflow integrations.

### Reliability Tips

- Keep NDI traffic on robust switched infrastructure.
- Avoid saturated links on mixed control/media VLANs.
- Validate source frame format and timing before show-critical use.


\newpage


## Dante Audio

WATCHOUT supports Dante as an audio device type for networked professional audio routing.

### Dante Device Configuration

In audio device properties, choose:

- **Device Type**: `Dante`
- **Adapter**: selected Dante interface
- **Channel count**: based on design requirements
- **Sample format / latency** as needed

### Infrastructure Considerations

Dante workflows rely on stable timing and discovery services.

In WATCHOUT deployments, related components include:

- PTP service (`ptp.exe`)
- mDNS responder (`mDNSResponder.exe`)

### Recommended Practice

- Keep Dante on deterministic wired networking.
- Validate adapter/channel mapping during preflight.
- Perform full audio-path checks after any node or switch change.


\newpage


## Node Management and Maintenance

Node maintenance actions are available in host/device properties under **Network Actions**.

### Accessing Node Actions

1. Open **Window -> Devices**.
2. Select a host in the Network pane.
3. Open **Properties**.
4. Use the **Actions** section.

Some actions are restricted to single-node selection.

### Service and Startup Actions

Available workflows include:

- **Restart Services** (resets WATCHOUT services and returns to splash-ready state)
- **Startup Action** configuration
- Upload/remove local startup show entries

Startup action modes:

| Mode | Behavior |
| --- | --- |
| **No Show** | Node starts without loading a local show |
| **Last Show** | Node starts with the most recently active local show |
| **Specific Show** | Node starts with a selected uploaded show |

### Asset Cache Maintenance

Use **Local Asset Cache** to:

- Inspect cached local asset copies on a node
- Remove assets not used by the current show (**Remove Unused Local Assets**)

Use cleanup carefully in multi-show environments to avoid breaking other productions sharing the same node.

### Sync and Software Operations

Node actions also include:

- **Sync Settings** (WATCHOUT-managed vs user-managed sync mode)
- **Update Software** to match Producer version
- **Restart** / **Shutdown**
- **Switch to WATCHOUT 6** (where supported)

### Identity and Storage Actions

Maintenance tools include:

- **Rename** node alias
- **Change Working Directory**

Changing working directory can invalidate local asset availability until assets are redistributed.

### Recommended Maintenance Sequence

1. Confirm node identity and version.
2. Apply startup action and sync policy.
3. Clean cache only when safe for all shows on the node.
4. Perform updates/restarts during controlled downtime.
5. Re-check node status and show assignment after reboot.


\newpage


# KEYBOARD SHORTCUTS

Master these keyboard shortcuts to speed up your workflow.



## File Operations

These are the primary default shortcuts for show-file work.

| Shortcut | Action |
| --- | --- |
| `Ctrl+O` | Open show |
| `Ctrl+S` | Save |
| `Ctrl+Shift+S` | Save As |

### Notes

- Some file actions (for example **Save Copy**, **Open from Director**) are menu-only.
- On macOS builds, `Cmd` is used where `Ctrl` is shown.


\newpage


## Edit Commands

These shortcuts are context-sensitive and operate on the active edit target.

| Shortcut | Action |
| --- | --- |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Shift+Z` | Redo (alternate) |
| `Ctrl+X` | Cut |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `Delete` / `Backspace` | Delete selection |
| `Ctrl+A` | Select all |
| `Ctrl+E` | Select to end |
| `Ctrl+F` | Find |
| `Ctrl+M` | Move |
| `Ctrl+N` | Toggle snapping |
| `Enter` | Open/activate properties |

### Tip

If a shortcut appears to do nothing, check which window has focus and whether the current selection context allows that operation.


\newpage


## Stage Navigation

Use these shortcuts to frame, scale, and nudge content quickly in Stage workflows.

| Shortcut | Action |
| --- | --- |
| `Ctrl+Shift+D` | Frame all displays |
| `Ctrl+Shift+O` | Scroll stage to origin |
| `Ctrl+1` | Stage scale 16x |
| `Ctrl+2` | Stage scale 8x |
| `Ctrl+3` | Stage scale 4x |
| `Ctrl+4` | Stage scale 2x |
| `Ctrl+5` | Stage scale 1x |
| `Arrow keys` | Navigate selection/time context |
| `Home` | Navigate to beginning |
| `End` | Navigate to end |
| `Ctrl+Arrow` | Nudge 1 unit |
| `Ctrl+Shift+Arrow` | Nudge 10 units |

### Practical Use

Combine framing and scale shortcuts before precision edits so coordinate changes are easier to read.


\newpage


## Timeline Controls

These shortcuts are central to timeline operation and cue management.

| Shortcut | Action |
| --- | --- |
| `Spacebar` | Toggle play/pause |
| `Numpad 0` | Run timeline |
| `Numpad Insert` | Run timeline (alternate) |
| `Escape` | Pause timeline |
| `Numpad *` | Jump to current or last start |
| `Numpad +` | Zoom in timeline |
| `Numpad -` | Zoom out timeline |
| `Ctrl+T` | Toggle "Click Jumps to Time" |
| `Ctrl+I` | Insert layer |
| `Ctrl+Delete` | Delete active layer |
| `Ctrl+P` | Add play control cue |
| `Ctrl+Shift+P` | Add pause control cue |
| `Ctrl+Enter` | Add comment/marker cue |
| `Ctrl+G` | Group cues |
| `Ctrl+Shift+G` | Ungroup cues |

### Note

Several timeline actions require a valid active cue sequence and layer context.


\newpage


## Tween Shortcuts

Tween shortcuts toggle common animation/effect tracks on selected cues.

| Shortcut | Action |
| --- | --- |
| `Alt+P` | Position tween |
| `Alt+S` | Scale tween |
| `Alt+O` | Opacity tween |
| `Alt+C` | Crop all sides |
| `Alt+B` | Gaussian blur |
| `Alt+Z` | Rotation Z |
| `Alt+Y` | Rotation Y |
| `Alt+V` | Volume tween |
| `Shift+Alt+I` | Fade in |
| `Shift+Alt+O` | Fade out |
| `Shift+Alt+X` | Cross-fade |

### Note

Additional tween types (color, per-side crop, rotation X, etc.) are available via menus and properties even when no direct shortcut is assigned.


\newpage


## Window Management

These shortcuts help you move quickly between WATCHOUT windows and layout presets.

| Shortcut | Action |
| --- | --- |
| `Ctrl+F4` | Close focused window |
| `Ctrl+Tab` | Next window |
| `Ctrl+Shift+Tab` | Previous window |
| `Ctrl+F6` | Next window |
| `Ctrl+Shift+F6` | Previous window |
| `Alt+Left` | Previous window of same type |
| `Alt+Right` | Next window of same type |
| `Alt+0` | Reset layout |
| `Alt+1` ... `Alt+9` | Load layout preset 1-9 |
| `Ctrl+Alt+1` ... `Ctrl+Alt+9` | Save layout preset 1-9 |

### Workflow Tip

Use layout presets for role-based views (programming, calibration, playback), then switch instantly during rehearsal.


\newpage


# TROUBLESHOOTING

Solutions to common issues and tips for optimal performance.



## Common Issues

This section covers high-frequency problems seen during setup and rehearsal.

### Producer Opens but Show Actions Fail

Check:

- Director connection state
- Asset Manager connection state
- Whether a different show is currently active on the selected Director

### Cannot Open/Override Show on Director

- Verify you selected the intended host alias.
- Confirm team coordination before overriding a running Director show.
- Resolve unsaved local changes first if prompts are blocking action.

### Menus/Shortcuts Not Acting as Expected

- Confirm the intended window has focus.
- Check selection context (timeline, cue, layer, properties).
- Re-try command from menu to verify availability state.

### Startup Reliability Tips

- Keep node aliases stable.
- Avoid running unrelated heavy software on playback nodes.
- Reboot and validate nodes before show day if system state is uncertain.


\newpage


## Performance Tips

Performance issues are usually a combination of media complexity, output load, and node configuration.

### Media and Rendering

- Prefer playback-friendly codecs and resolutions appropriate for target outputs.
- Limit unnecessary overlapping high-resolution cues.
- Use blur/color-heavy effects carefully in dense sections.

### Node Health

- Keep playback nodes dedicated to WATCHOUT services.
- Watch CPU/GPU/memory indicators in activity views.
- Verify disk throughput for high-bandwidth media.

### Timeline Practices

- Group stable cue clusters to reduce editing overhead.
- Use stage tiers and layer organization to simplify active scenes.
- Avoid last-minute structural changes during live operation.

### Network and Sync

- Keep show traffic on reliable wired networking.
- Verify NTP/time sync behavior on Director/Runner systems.
- Resolve stale/offline node status before technical run-through.


\newpage


## Display Problems

When a display misbehaves, diagnose in this order: routing, output mode, geometry, then content.

### No Signal on a Display

Check:

1. Display is **enabled** and not locked to wrong settings.
2. Correct **host alias** and **output channel**.
3. Correct **output type** (GPU/SDI/NDI/Virtual).
4. Node services are online.

### Wrong Screen / Wrong Position

- Re-check stage placement and display naming.
- Use **Frame in Stage** and **Frame All Displays**.
- Validate channel mapping in device properties.

### Visible Seams or Warped Content

- Revisit warp geometry and mask edits.
- Verify soft-edge overlap quality.
- Re-run projector calibration where required.

### Interlaced/Color Artifacts

- Confirm interlaced setting is intentional.
- Verify color depth/color space settings per output path.
- Compare with known test pattern media.


\newpage


## Network Issues

Most network failures fall into discovery, firewall, or host-alias consistency problems.

### Nodes Not Appearing

- Verify nodes are on reachable network interfaces.
- Check multicast handling (`239.2.2.2:3012`).
- Confirm firewall allows WATCHOUT services and required UDP ports.

### Node Appears but Goes Stale/Offline

- Check switch stability and cable quality.
- Verify host is not sleeping/power-throttled.
- Confirm process-manager services are still running.

### Director/Runner Mismatch Warnings

- Ensure all nodes are attached to the intended Director.
- Clear stale show state on nodes if needed.
- Re-run a controlled startup sequence before rehearsal.

### NTP/Sync Instability

- Confirm Director and runners use consistent time strategy.
- Check NTP reachability and drift.
- Resolve time sync warnings before running synchronized playback.


\newpage


## Media Playback Issues

Playback errors usually come from media format compatibility, missing data, or timing/resource pressure.

### Media Imports but Will Not Play Correctly

Check:

- Asset exists and path/version are valid
- Codec/format is supported for your workflow
- Asset transfer to nodes completed

### Stutter or Frame Drops

- Reduce simultaneous heavy cues.
- Verify storage bandwidth on playback nodes.
- Test with simpler codec/resolution versions of the same content.

### Color or Alpha Looks Wrong

- Verify color space/transfer expectations.
- Confirm key/fill and alpha-capable codec choices.
- Compare against a trusted reference clip.

### NDI/Capture Irregularities

- Verify source stream stability and format.
- Check network bandwidth headroom.
- Confirm capture source dimensions/range settings match source.


\newpage


## Getting Help

When escalation is needed, gather diagnostics first so support can reproduce and resolve quickly.

### Built-In Support Tools

Use the Help menu to:

- **Create Feedback Report**
- **Open Log Directory**
- Review licensing/version information

### What to Collect

Before contacting support, capture:

- Exact WATCHOUT version/build in use
- Show file name/version
- Steps to reproduce
- Node aliases and roles (Director/Runner/Asset Manager)
- Relevant timestamps and screenshots/video

### Useful Runtime Context

Include whether the issue occurred:

- During local preview or live network playback
- With specific outputs (GPU/SDI/NDI)
- After recent network, driver, or hardware changes

### Team Handoff Tip

Document temporary workarounds in marker cues or operations notes so the next operator can keep the show stable while root-cause analysis continues.


\newpage

