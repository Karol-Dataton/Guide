---
title: "Introduction to WATCHPAX 64"
---

## Introduction to WATCHPAX 64

**WATCHPAX 64 is a dedicated media server for use with Dataton WATCHOUT.** Each unit ships with a built-in WATCHOUT 7 license, a locked-down operating system, and a high-performance NVIDIA GPU driving four DisplayPort 1.4 outputs. In addition, the WATCHPAX 64 offers configuration options on three slots for ST2110, SDI, and HDMI capture, as well as optional sync and SSD size on order.

The WATCHPAX 64 gives you all the advantages of Dataton's range of dedicated locked-down media servers with the benefits of a configurable unit. Designed to make your WATCHOUT shows shine, the WATCHPAX 64 is a stylish and robust aluminium unit manufactured to a high quality specification. You choose the slot configuration on order, tailoring the unit to your needs. And if those needs change further down the line, there's also the possibility of revising those options.

![WATCHPAX 64](../media/wp64/introduction_01.jpg)
Size reference.

### Key Specifications

| Category | Specification |
|---|---|
| Display outputs | 4 x DisplayPort 1.4 (HDMI 2.0b via included adapters) |
| GPU synchronization | Optional NVIDIA Quadro Sync II card (frame lock across multiple units) |
| Networking | 2 x 10 GbE RJ45 Ethernet |
| USB | 2 x USB 2.0, 2 x USB 3.0 |
| Audio | Multi-channel 7.1 LPCM embedded via DisplayPort/HDMI; Dante-ready (license sold separately) |
| Power | IEC 60320 C14 inlet, 100–240V AC 50/60Hz, max 500 W |
| Dimensions | 446 x 88 x 336 mm (W x H x D) |
| Weight | Approx. 10 kg (22 lbs) |
| Operating temperature | 0°C to +35°C (optimal 21°C–23°C) |
| Software | WATCHOUT 7 (built-in license, not compatible with WATCHOUT 6) |

### Configurable I/O Slots

The rear panel has three configurable I/O slots (labeled B, C, and D) plus an optional sync card slot (A). Each configurable slot can be fitted with one of the following at order time:

- **Dual HDMI capture** — two HDMI input channels per slot.
- **Bi-directional SDI** — configurable as 2 x 12G SDI, 8 x 3G SDI, or 1 x 12G SDI + 4 x 3G SDI (micro BNC connectors).
- **Bi-directional ST2110** — IP-based video capture and output over 10 GbE.

Slot A can house an **NVIDIA Quadro Sync II** card for hardware frame-lock synchronization across a cluster of WATCHPAX 64 units. See [Connectors](08-connectors.md) for the full connector reference and [Hardware Sync](../03-synchronization/04-hardware-sync.md) for configuration instructions.

:::info
Connector availability on the rear panel depends on the I/O configuration selected when the unit is ordered. Slots that are not populated will not have the related connectors present.
:::

### GPU and Display Pipeline

The WATCHPAX 64 uses an NVIDIA professional GPU to drive its four DisplayPort 1.4 outputs. The GPU supports:

- **NVIDIA Mosaic** — combine multiple physical outputs into a single unified canvas (e.g., four HD outputs merged into one 4K surface). See [Enabling Mosaic](../03-synchronization/03-enabling-mosaic.md).
- **EDID emulation** — override native display identification data to ensure all outputs report identical capabilities. See [Setting Up EDID Emulation](../03-synchronization/02-setting-up-edid-emulation.md).
- **Hardware-accelerated decoding** — GPU-accelerated playback of supported codecs for smooth, high-resolution media output.

GPU topology and display configuration are managed through [WATCHPAX Config](../02-installation-and-operation/06-miscellaneous.md#watchpax-config), a browser-based interface accessible on the same network.

For definitions of technical terms used on this page and throughout the documentation, see the [Glossary](../05-glossary/01-glossary.md).
