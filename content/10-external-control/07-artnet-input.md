---
title: "ArtNet Input"
---


## ArtNet Input

WATCHOUT can receive ArtNet DMX data over the network and map incoming DMX channel values to show variables. This allows lighting consoles, DMX controllers, and other ArtNet-capable devices to directly control media server parameters like opacity, position, color, and any other variable-driven property.

### Enabling ArtNet

ArtNet input is enabled or disabled from the **Network** window in Producer using the **ArtNet** toggle. When enabled, the Operative listens for ArtNet packets on the standard ArtNet port.

### External Key Format

ArtNet variables use a structured external key format that specifies the DMX universe and channel address:

`artnet.net({net}).subnet({subnet}).uv({universe}).ch({channels})`

**Universe addressing** can be specified in two ways:

- **Full address:** `artnet.net(1).subnet(2).uv(3).ch(10)` — Specifies the ArtNet net, subnet, and universe individually.
- **Absolute universe:** `artnet.uv(5).ch(10)` — When only `uv` is specified (without `net` and `subnet`), it is treated as an absolute universe number. Universe 0 maps to net 0, subnet 0, universe 0; universe 18 (= 1×16 + 2) maps to net 0, subnet 1, universe 2; and so on.

### Channel Resolutions

WATCHOUT supports multiple DMX channel resolutions for different precision requirements:

**Coarse (8-bit)** — A single DMX channel. Range: 0–255.

`artnet.uv(0).ch(1)`

**Fine (16-bit)** — Two DMX channels combined for higher precision. Range: 0–65,535.

`artnet.uv(0).ch(1, 2)`

**Ultra (24-bit)** — Three DMX channels. Range: 0–16,777,215.

`artnet.uv(0).ch(1, 2, 3)`

**Uber (32-bit)** — Four DMX channels for maximum precision. Range: 0–4,294,967,295.

`artnet.uv(0).ch(1, 2, 3, 4)`

For multi-channel resolutions, channels are listed in order from most significant (coarse) to least significant. The values are combined in big-endian byte order.

:::note
DMX channels are 1-indexed in the key format — channel 1 corresponds to the first channel in the DMX universe.
:::

### Normalization

Append `.normalize()` to the key to receive normalized values (0.0–1.0) instead of raw DMX values:

`artnet.uv(0).ch(1).normalize()`

Normalization divides the raw value by the maximum for the channel resolution (255 for 8-bit, 65535 for 16-bit, etc.). This is useful when your variable range is 0–1 or when you want consistent scaling regardless of resolution.

### Update Frequency and Interpolation

ArtNet typically operates at approximately **44 Hz** (roughly every 22ms). Each incoming ArtNet packet is timestamped with a **50ms interpolation window** by the Operative before forwarding to the Director. This provides smooth transitions between DMX value updates.

The Operative subscribes only to the ArtNet universes that are actually referenced by variables in the current show. If no variables reference a particular universe, that universe's traffic is ignored, keeping processing efficient.

### ArtNet Fixtures and Output

In addition to receiving ArtNet input, WATCHOUT supports ArtNet output through **fixture cues** on timelines. Fixture cues allow you to drive external DMX devices (lights, fog machines, motors, etc.) from the WATCHOUT timeline with keyframed values. ArtNet output runs at 44 FPS.

Fixture cues support:
- Multiple channel resolutions (8-bit through 32-bit).
- Channel relationships (multiply and override) for master/slave dimmer configurations.
- ArtNet recording — recording incoming ArtNet data for later playback as timeline content.

See the ArtNet Fixture Cues section in Chapter 6 for details on fixture configuration and output.

### Use Cases

- **Lighting desk integration** — Control WATCHOUT opacity, position, and blend parameters from a grandMA, ETC Eos, or any ArtNet-capable lighting console.
- **DMX show control** — Use a DMX-based automation system to drive WATCHOUT variables alongside lighting and mechanical effects.
- **Recording and playback** — Record incoming ArtNet data from a lighting desk rehearsal and play it back as part of the show, ensuring consistent lighting-to-video synchronization.
