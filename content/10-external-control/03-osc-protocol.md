---
title: "OSC Protocol"
---


## OSC Protocol

Open Sound Control (OSC) is a flexible, message-based protocol widely used in media servers, show controllers, and creative applications. WATCHOUT's OSC integration allows you to send variable values and timeline playback commands from any OSC-capable device or software.

### Enabling OSC

OSC support is enabled or disabled from the **Network** window in Producer using the **OSC** toggle. When enabled, the Operative listens for incoming OSC messages on both UDP and TCP.

### Connection Details

WATCHOUT listens for OSC on two ports simultaneously:

- **UDP port 8000** — Standard OSC over UDP. Most OSC controllers use this transport by default.
- **TCP port 8001** — OSC over TCP with length-prefixed framing. Useful for reliable delivery over congested or lossy networks.

Both ports bind to all network interfaces (`0.0.0.0`), so the Operative accepts OSC messages from any reachable device on the network.

### Variable Input via OSC

Any OSC message that does not match a playback control pattern (described below) is treated as a variable input. The OSC address and argument index are combined to form the external key that maps to a WATCHOUT variable.

The key format is:

`osc.addr({address}/{argument_index})`

For example, sending an OSC message to address `/stage/brightness` with a single float argument produces the key:

`osc.addr(/stage/brightness/0)`

If the message carries multiple arguments, each argument gets its own key with an incrementing index:

- Argument 0: `osc.addr(/stage/color/0)`
- Argument 1: `osc.addr(/stage/color/1)`
- Argument 2: `osc.addr(/stage/color/2)`

### Supported Value Types

WATCHOUT accepts the following OSC argument types:

- **Float** (`f`) — Used directly as the variable value.
- **Int** (`i`) — Converted to a floating-point value.

Other OSC types (string, blob, etc.) are not supported and will produce an error if received.

### Playback Control via OSC

In addition to variable input, WATCHOUT supports timeline playback control through OSC messages with the `/wo/` address prefix. The supported patterns are:

- `/wo/play/{timeline_id}` — Start playback of the specified timeline.
- `/wo/run/{timeline_id}` — Same as play.
- `/wo/pause/{timeline_id}` — Pause the specified timeline.
- `/wo/stop/{timeline_id}` — Stop the specified timeline and reset to the beginning.

The `timeline_id` is a numeric identifier (e.g., `1`, `2`).

**Jumping to a cue:** Add a cue ID as an additional path segment:

`/wo/play/{timeline_id}/{cue_id}`

This starts playback from the specified cue's position.

**Jumping to a time:** Instead of a cue ID, you can include a time position as an OSC argument:

- **Float argument** — Interpreted as seconds (e.g., `10.5` = 10 seconds 500 milliseconds).
- **Int argument** — Interpreted as milliseconds (e.g., `10500` = 10 seconds 500 milliseconds).

For example, sending `/wo/play/1` with a float argument of `5.0` starts timeline 1 at the 5-second mark.

:::note
OSC Bundles are not currently supported. Each message must be sent as an individual OSC message.
:::

### Interpolation

All OSC variable inputs are interpolated with the default **50ms interpolation window**. The Operative timestamps each incoming OSC message and includes a 50ms interpolation deadline when forwarding it to the Director. This ensures smooth, glitch-free transitions even when OSC messages arrive at irregular intervals.

### Testing OSC

During development, you can test WATCHOUT's OSC input using tools such as:

- **TouchOSC** — A mobile app for building custom OSC control surfaces.
- **Protokol** — A monitoring tool that can also send OSC messages.
- **oscsend** (command line) — A simple command-line utility for sending test messages.
- Any programming language with an OSC library (Python's `python-osc`, Node.js's `osc-js`, etc.).

### Use Cases

- **QLab integration** — Send OSC cues from QLab to control WATCHOUT variables and trigger timeline playback.
- **TouchOSC / Lemur** — Build custom tablet-based control interfaces with faders, buttons, and XY pads mapped to WATCHOUT variables.
- **Show control systems** — Integrate with Medialon, Pharos, or other automation systems that output OSC.
- **Custom software** — Control WATCHOUT from any application using standard OSC libraries.
