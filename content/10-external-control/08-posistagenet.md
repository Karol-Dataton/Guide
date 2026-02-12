---
title: "PosiStageNet"
---


## PosiStageNet

PosiStageNet (PSN) is an open protocol for transmitting real-time 3D position data from tracking systems over a network. WATCHOUT receives PSN data and maps tracker coordinates to show variables, enabling content that dynamically follows performers, objects, or other tracked elements on stage.

### Enabling PSN

PSN support is enabled or disabled from the **Network** window in Producer using the **PosiStageNet** toggle. When enabled, the Operative starts a PSN forwarder that listens for incoming tracking data.

### Network Details

PSN uses **UDP multicast** for data transmission. The WATCHOUT PSN forwarder listens on:

- **Multicast group:** `236.10.10.10`
- **Port:** `56565`

The forwarder joins the multicast group on all available network interfaces. Ensure your tracking system is sending PSN data to this standard multicast address and that multicast routing is properly configured on your network.

### Data Mapping

Each PSN tracker exposes multiple data fields as WATCHOUT variables. The external key format is:

`psn.{tracker_id}.{field}`

Where `{tracker_id}` is the numeric ID assigned to the tracker by the tracking system, and `{field}` is one of the following:

**Position:**
- `psn.{id}.pos.x` — X position
- `psn.{id}.pos.y` — Y position
- `psn.{id}.pos.z` — Z position

**Speed:**
- `psn.{id}.speed.x` — X velocity
- `psn.{id}.speed.y` — Y velocity
- `psn.{id}.speed.z` — Z velocity

**Orientation:**
- `psn.{id}.ori.x` — X rotation
- `psn.{id}.ori.y` — Y rotation
- `psn.{id}.ori.z` — Z rotation

**Acceleration:**
- `psn.{id}.accel.x` — X acceleration
- `psn.{id}.accel.y` — Y acceleration
- `psn.{id}.accel.z` — Z acceleration

**Target position:**
- `psn.{id}.trgtpos.x` — Target X position
- `psn.{id}.trgtpos.y` — Target Y position
- `psn.{id}.trgtpos.z` — Target Z position

**Status and timestamp:**
- `psn.{id}.status` — Tracker status value
- `psn.{id}.timestamp` — Frame timestamp

Not all fields are present in every PSN frame — the forwarder only forwards fields that the tracking system actually sends.

### How It Works

The PSN forwarder operates as follows:

1. **Packet reception** — UDP packets are received on the multicast address. PSN supports packet fragmentation for large frames; the forwarder automatically reassembles fragmented packets.
2. **Frame parsing** — DATA packets are parsed to extract tracker positions and other fields. INFO packets (containing system and tracker names) are received but not forwarded.
3. **Change detection** — The forwarder compares each tracker's current values against the previous frame. Only values that have actually changed are queued for transmission, reducing unnecessary network traffic to the Director.
4. **Batched forwarding** — Changed values are batched and sent to the Director's input endpoint with a **25ms interpolation window**. This shorter interpolation (compared to the 50ms default for other protocols) reflects the high update rate typical of tracking systems.

:::tip
Coordinate systems vary between tracking systems. You may need to use WATCHOUT's variable min/max range and tween expressions to remap PSN coordinates to your stage coordinate system.
:::

### Requirements

- A **tracking system** that outputs PosiStageNet data (e.g., BlackTrax, Mo-Sys, Augmenta, or custom PSN senders).
- **Network multicast support** between the tracking system and the WATCHOUT Operative. Both must be on the same network segment or have multicast routing configured.
- Variables defined in the show with external keys matching the PSN key format for the trackers you want to use.

### Use Cases

- **Performer tracking** — Content (spotlights, graphics, text) that follows performers as they move across the stage.
- **Interactive projection mapping** — Projected visuals that react to the position of physical objects.
- **Position-reactive show elements** — Trigger content changes or transitions based on where tracked elements are in the performance space.
- **Multi-axis control** — Use tracker orientation and speed data to drive rotation, scale, or animation speed of visual elements.
