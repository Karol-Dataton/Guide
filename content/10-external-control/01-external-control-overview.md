---
title: "External Control Overview"
---


## External Control Overview

WATCHOUT can be controlled by a wide range of external devices and systems — lighting consoles, show controllers, tracking systems, MIDI devices, timecode generators, and custom software. This chapter covers the external control architecture, the protocols WATCHOUT supports, and how they all connect to the show through a unified variable system.

### Control Architecture

External control in WATCHOUT follows a layered architecture where signals from the outside world are received, converted into variable updates, and then distributed to all rendering nodes for real-time effect.

The **Operative** is the central receiving point for most external protocols. It runs on the same machine as the Director and listens for incoming ArtNet, OSC, PosiStageNet, HTTP, and WATCHOUT 6 protocol messages. When a message arrives, the Operative converts it into a standardized internal format and forwards it to the Director.

The **Director** is the authoritative coordinator. It receives variable updates from the Operative (and in some cases directly from bridge services like MIDI and LTC), validates values against variable definitions in the show, and broadcasts the updated state to all connected Runners via Server-Sent Events (SSE). Runners then apply the new values atomically to their rendering pipeline.

Some protocols bypass the Operative and communicate directly with the Director. The **MIDI Bridge** and **LTC Bridge** are standalone services that each have their own connection to the Director — MIDI for variable input and show control, and LTC for timeline synchronization.

### Variables as the Bridge

All external control ultimately maps to **WATCHOUT variables**. Variables are defined in the show file with properties like name, external key, value range, and interpolation mode. When an external signal arrives — whether it's a DMX channel value from ArtNet, an OSC float, or a position coordinate from a tracking system — it is matched to a variable by its **external key**, clamped to the variable's min/max range, and then made available for use throughout the show.

Variables feed into **tween expressions** (allowing external values to drive visual properties like position, opacity, and rotation), **conditional cues** (enabling or disabling cues based on variable values), and **timeline triggers** (starting or stopping timelines in response to variable changes).

This design means you don't need to learn different APIs for different protocols — every protocol writes to the same pool of variables, and you choose which protocol to use based on your production environment.

### Supported Protocols

WATCHOUT supports the following external control protocols:

- **ArtNet** — DMX-over-IP protocol for lighting console integration. Map DMX channel values from any ArtNet universe to WATCHOUT variables.
- **OSC (Open Sound Control)** — A flexible, address-based protocol commonly used in media servers and show controllers. Supports both variable input and timeline playback control.
- **HTTP REST API** — Programmatic control via standard HTTP requests. Includes endpoints for playback control, variable input, show management, hit testing, and real-time event streams (SSE).
- **MIDI Bridge** — A standalone service that receives MIDI Control Change, Note, and Pitch Wheel messages and forwards them as variable updates. Also handles MIDI Show Control (MSC) messages.
- **LTC Bridge** — A standalone service that decodes Linear Time Code from an audio input and synchronizes WATCHOUT timeline playback to the external timecode.
- **PosiStageNet (PSN)** — A position tracking protocol that receives 3D spatial data (position, speed, orientation, acceleration) from tracking systems and maps it to variables.
- **MIDI Show Control (MSC)** — An industry-standard protocol for show equipment control, supporting GO, STOP, GO OFF, and RESET commands for timeline management.
- **WATCHOUT 6 Protocol** — A backward-compatible TCP control interface that accepts commands in the WATCHOUT 6 format, allowing existing integrations to work without modification.

### Enabling and Disabling Protocols

Individual protocols can be enabled or disabled from the **Network** window in Producer. The available toggles include:

- **ArtNet** — Enables/disables the ArtNet listener on the Operative.
- **OSC** — Enables/disables the OSC listener (both UDP and TCP).
- **PosiStageNet** — Enables/disables the PSN forwarder.
- **Web UI** — Enables/disables the HTTP REST API and its built-in documentation interface.
- **WATCHOUT 7 Protocol** — Enables/disables the native HTTP API endpoints.
- **WATCHOUT 6 Protocol** — Enables/disables the backward-compatible TCP protocol.

The MIDI Bridge and LTC Bridge are managed separately as individual services — they can be started or stopped from the Network window's node management.

:::tip
Disable protocols you are not using to reduce network traffic and minimize the system's attack surface on public or shared networks.
:::

### Input Interpolation

To prevent visual glitches from sudden value changes, all external inputs pass through a **50-millisecond interpolation window** by default. This means that when a new value arrives, renderers smoothly transition from the old value to the new value over 50ms rather than jumping instantly.

This interpolation happens transparently for all protocols:

- **ArtNet and OSC** add the interpolation timestamp at the Operative before forwarding to the Director.
- **MIDI and other bridge services** rely on the Director to apply the default 50ms interpolation.
- **HTTP REST API** supports an optional `duration` parameter that lets you specify a custom interpolation time — from instant (0ms) to multi-second fades.

The 50ms default provides smooth transitions without noticeable latency, striking a good balance for real-time control scenarios like fader movements and tracking data.

### Choosing a Protocol

The best protocol depends on your production environment:

- **Lighting desk integration** → **ArtNet**. Lighting consoles natively speak DMX/ArtNet, making this the most natural choice for controlling WATCHOUT from a lighting desk.
- **Show controller or media server** → **OSC** or **HTTP REST API**. OSC is ideal for systems like QLab, TouchOSC, or other show controllers. HTTP is better for custom software, web-based control panels, and scripted automation.
- **External timecode synchronization** → **LTC Bridge**. When WATCHOUT playback must lock to an external SMPTE timecode source (audio/video playback, broadcast, multi-system sync), the LTC Bridge provides frame-accurate timeline synchronization.
- **Position tracking** → **PosiStageNet**. For content that follows performers or objects on stage, PSN receives real-time position data from tracking systems like BlackTrax.
- **Existing WATCHOUT 6 integration** → **WATCHOUT 6 Protocol**. If you have an existing Crestron, AMX, or other control system programmed for WATCHOUT 6, the backward-compatible TCP protocol lets it work with WATCHOUT 7 without changes.
- **Manual fader control** → **MIDI Bridge**. Physical MIDI controllers with faders and knobs provide tactile, hands-on control of WATCHOUT variables.
- **Theatrical cue triggering** → **MIDI Show Control**. MSC is the industry standard for triggering cues across multiple show control devices in theater and live event environments.
