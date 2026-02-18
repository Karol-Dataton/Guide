---
title: "External Control"
icon: "radio"
---

# EXTERNAL CONTROL

**WATCHOUT 7 can be controlled by a wide range of external devices and systems -- lighting consoles, show controllers, tracking systems, MIDI devices, timecode generators, and custom software.** All external input flows through the variable system, which maps incoming protocol messages to numeric parameters that drive timeline playback, cue properties, and expression-based automation. This chapter covers every supported control protocol and integration method.

### Foundations

How external control reaches the WATCHOUT engine.

- [External Control Overview](01-external-control-overview.md) -- the architecture of external control: protocols, bridge services, the Director API, and how incoming messages become variable updates
- [Variables and Inputs](02-variables-and-inputs.md) -- the variable system that maps all external input to numeric parameters, including input specs, clamping, defaults, and reserved names

### Primary Protocols

The most commonly used control integrations.

- [HTTP REST API](06-http-rest-api.md) -- the comprehensive REST API for programmatic control from show controllers, web interfaces, and custom applications
- [OSC Protocol](03-osc-protocol.md) -- Open Sound Control integration for message-based control from media servers, show controllers, and creative tools
- [ArtNet Input](07-artnet-input.md) -- receiving ArtNet DMX data over the network and mapping channel values to show variables

### Specialized Protocols

Bridge services and protocol adapters for specific control scenarios.

- [MIDI Bridge](04-midi-bridge.md) -- a standalone service that receives MIDI messages and forwards them as variable updates to the Director
- [LTC Bridge](05-ltc-bridge.md) -- decoding Linear Time Code from an audio input to synchronize timeline playback with an external timecode source
- [PosiStageNet](08-posistagenet.md) -- receiving real-time 3D position data from tracking systems for spatial automation
- [MIDI Show Control](09-midi-show-control.md) -- industry-standard MSC commands for transport control from show control systems
- [WATCHOUT 6 Protocol](10-watchout-6-protocol.md) -- backward-compatible TCP control interface for systems still using WATCHOUT 6 command syntax
