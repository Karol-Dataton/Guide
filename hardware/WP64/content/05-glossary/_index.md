---
title: "Glossary"
icon: "bookOpen"
---

## Glossary

Definitions of technical terms and acronyms used throughout the WATCHPAX 64 documentation.

### Browse Terms

- Terms are listed alphabetically below.

### Dante

An audio-over-IP networking technology developed by Audinate. It transmits multi-channel, uncompressed digital audio over standard Ethernet with very low latency. The WATCHPAX 64 is Dante-ready — a license can be purchased and activated to enable Dante audio output. See [Dante License Activation](../02-installation-and-operation/07-dante-license-activation.md).

### EDID (Extended Display Identification Data)

A data structure that every display sends to the GPU over the video cable, describing its supported resolutions, refresh rates, color depth, and timing parameters. EDID emulation on the WATCHPAX 64 overrides native display data to ensure all outputs report identical capabilities. See [Setting Up EDID Emulation](../03-synchronization/02-setting-up-edid-emulation.md).

### GPU topology

Refers to the logical arrangement of GPU outputs and how they map to the physical display connectors on the WATCHPAX 64. The topology view in [WATCHPAX Config](../02-installation-and-operation/06-miscellaneous.md#watchpax-config) shows which GPU output drives each DisplayPort connector, and is the basis for configuring mosaic grids and display assignments.

### LPCM (Linear Pulse-Code Modulation)

An uncompressed digital audio format. The WATCHPAX 64 outputs up to 7.1-channel LPCM audio embedded in the DisplayPort and HDMI signals.

### NVIDIA Quadro Sync II

A dedicated synchronization add-in card that enables hardware frame-lock across multiple WATCHPAX 64 units. When installed in Slot A, it connects units via CAT6 cables (not standard network cables) and designates one output as the timing source that all others lock to. See [Hardware Sync](../03-synchronization/04-hardware-sync.md).

### SDI (Serial Digital Interface)

A family of standards for carrying uncompressed digital video over coaxial cable using BNC (or micro BNC) connectors. SDI is widely used in broadcast and live-event production. The WATCHPAX 64 supports up to 12G-SDI, which can carry a single uncompressed 4K signal on one cable.

### ST2110 (SMPTE ST 2110)

A suite of standards for transporting professional media (video, audio, and ancillary data) as separate IP streams over standard Ethernet networks. Unlike SDI, which uses dedicated coaxial cabling, ST2110 routes signals through existing IP infrastructure, making it well suited for large-scale or facility-wide installations.

### Wake-on-LAN (WOL)

A networking standard that allows a computer to be powered on remotely by sending a special network packet (a "magic packet") to its Ethernet adapter. The WATCHPAX 64 supports WOL as an alternative power-on method — see [Installation](../02-installation-and-operation/03-installation.md#power-on) for details.
