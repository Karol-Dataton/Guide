---
title: "SDI Output"
---


## SDI Output

SDI (Serial Digital Interface) is a professional video transport standard used widely in broadcast, live event, and AV installation environments. In WATCHOUT, SDI is one of the four display output types alongside GPU, NDI, and Virtual. Choosing SDI routes the rendered display output through a dedicated SDI capture/output card installed in the Runner node, delivering an uncompressed digital video signal over coaxial BNC cabling.

SDI is the right choice when your downstream equipment — video switchers, LED processors, recording systems, or broadcast infrastructure — expects a baseband SDI signal rather than a direct GPU output or network-based stream.

### Configuring an SDI Display

To set up a display for SDI output:

1. Select the display in the Stage or Device list.
2. In **Device Properties → Output**, set the **Output Type** to **SDI**.
3. Assign the **Channel** number corresponding to the physical SDI output connector on the installed card.
4. Set the **Resolution** to match the expected downstream signal format.
5. Choose the appropriate **SDI Link Type** for the target resolution and bandwidth.

### SDI Link Types

The link type determines how many physical SDI connections are used to transport a single display's output. Higher resolutions and frame rates require more bandwidth than a single SDI link can carry, so multiple links are bonded together:

- **Single-Link** — uses one SDI connection. Supports resolutions up to HD (1920×1080) at standard frame rates on 3G-SDI, or SD formats on HD-SDI. This is the default and most common configuration.
- **Dual-Link** — uses two SDI connections bonded together, doubling the available bandwidth. Required for resolutions or color depths that exceed single-link capacity, such as 1080p at higher frame rates or some 2K formats with extended bit depth.
- **Quad-Link Interleaved** — uses four SDI connections with the image samples interleaved across the links. This supports UHD/4K resolutions (3840×2160) by distributing alternating pixel data across all four cables.
- **Quad-Link Quadrant** — uses four SDI connections where each link carries one spatial quadrant of the full image. This is an alternative 4K transport method where each cable transmits a distinct quarter of the frame. Some downstream equipment prefers one quad-link method over the other, so check your receiver's specifications.

### Channel Assignment

The **Channel** property identifies which physical output port on the SDI card is used for this display. Channel numbering starts at 1 and maps directly to the hardware connectors. If your Runner node has a card with four SDI outputs, channels 1–4 correspond to those four BNC connectors.

When using dual-link or quad-link modes, the channel number refers to the first connector in the group — the card automatically bonds the required number of adjacent outputs.

### Color and Signal Settings

SDI output in WATCHOUT uses the following signal characteristics:

- **Color Depth** — SDI outputs currently operate at 8 bits per component. The system converts the internally rendered imagery to 8-bpc YCbCr for SDI transport using the UYVY packed format.
- **Color Space** — the SDI rendering pipeline uses Rec. 709 color primaries with an SDR transfer function for the YCbCr conversion. This matches the standard color encoding expected by most professional SDI equipment.
- **Interlaced** — enable this toggle when the downstream equipment requires an interlaced signal (e.g., 1080i for broadcast contribution). When disabled, the output is progressive.

### Max Quality Mode

The **Render with maximum quality** toggle selects a higher-precision intermediate rendering format. When enabled, the internal render buffer uses 16-bit floating-point (RGBA16F) instead of the default 11/11/10-bit packed float (R11F_G11F_B10F). This can reduce banding artifacts in gradients and subtle color transitions, at the cost of slightly higher GPU memory usage. Enable this when the content demands it — particularly for HDR-mastered material or content with extensive color grading.

### Genlock

In multi-display SDI environments, frame-accurate synchronization is critical to prevent tearing or timing mismatches between outputs. WATCHOUT supports **SDI Genlock**, which locks the frame output timing of SDI displays to an external reference signal (typically blackburst or tri-level sync).

Genlock is controlled as a **show-level property** (not per-display). When enabled, all SDI outputs across the system synchronize their frame delivery to the reference signal provided to the SDI card's genlock input.

To enable SDI genlock:

1. Open **Show Properties** (Preferences).
2. Enable the **SDI Genlock** toggle.
3. Ensure the SDI card's reference input is connected to a valid sync source.

Genlock ensures that all Runner nodes with SDI outputs deliver frames at precisely the same time, which is essential for seamless multi-projector arrays, LED wall setups, and broadcast environments where downstream equipment expects time-aligned signals.

### Frame Delay

The **Delay Frames** setting (0–10 frames) adds a configurable output delay to the display. Each frame of delay adds one additional frame buffer to the rendering pipeline before the pixels are sent to the SDI output.

This is useful for compensating processing latency in downstream equipment. For example, if an LED processor introduces a fixed two-frame delay, you can add a matching delay to other displays in the system so that all outputs appear synchronized to the viewer.

The delay buffer is allocated at initialization — the SDI output always maintains (delay + 1) render target buffers in a ring, presenting the oldest completed frame while rendering into the newest.

### Hardware Requirements

SDI output in WATCHOUT requires a **Deltacast** SDI capture/output card installed in the Runner node. The system uses both the Deltacast SDK for stream management and the Deltacast GPU SDK for zero-copy texture transfer between the GPU render pipeline and the SDI output.

Key requirements:

- **Deltacast SDI card** with output capability (e.g., Deltacast DELTA-12G series or equivalent)
- **Deltacast drivers and SDK libraries** installed and accessible on the Runner machine
- **GPU with OpenGL compute shader support** for the UYVY conversion and warp/blend compositing

If the required Deltacast libraries are not loaded, the Runner will log an error and the SDI display will not initialize. Verify that the Deltacast drivers are correctly installed and that the card is recognized by the operating system before configuring SDI outputs.

:::tip
When troubleshooting SDI output, check the Runner's log for messages about stream creation and texture attachment. The log reports the channel number, resolution, and any initialization failures with specific error codes from the Deltacast SDK.
:::
