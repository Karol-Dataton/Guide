---
title: "WATCHOUT 6 Protocol"
---


## WATCHOUT 6 Protocol

WATCHOUT 7 includes a backward-compatible TCP control interface that accepts commands in the WATCHOUT 6 protocol format. This allows existing integrations — Crestron modules, AMX programs, Extron scripts, and other control system code written for WATCHOUT 6 — to work with WATCHOUT 7 without modification.

### Enabling the WO6 Protocol

The WATCHOUT 6 protocol is enabled or disabled from the **Network** window in Producer using the **WATCHOUT 6 Protocol** toggle. This toggle is independent of the **WATCHOUT 7 Protocol** toggle — you can run both simultaneously, only one, or neither.

When enabled, the Operative starts a TCP server that accepts connections in the WATCHOUT 6 text-based command format.

### Connection Details

The WO6 compatibility layer listens on:

- **TCP port 3040** — The production control port (equivalent to the WATCHOUT 6 "watchmaker" port).
- **TCP port 3039** — The display computer port (equivalent to the WATCHOUT 6 "watchpoint" port).

Connections use the same text-based, newline-delimited command/response protocol as WATCHOUT 6. Commands are sent as ASCII text terminated by a newline, and responses follow the same format.

### The Main Timeline

Several WO6 commands operate on the "main timeline" by default. In WATCHOUT 7, this requires a timeline named **"Main Timeline"** to exist in the show. Commands that reference no specific timeline (like `run`, `halt`, and `getStatus`) will target this timeline.

:::note
If your show does not have a timeline named "Main Timeline", commands that default to the main timeline will fail. Either create a timeline with this name or use commands that explicitly specify a timeline name.
:::

### Supported Commands

The following WATCHOUT 6 commands are supported in the compatibility layer:

**Authentication and status:**
- **authenticate** — Authenticates the connection. WATCHOUT 7 always accepts authentication (license check is not enforced at this level).
- **ping** — Returns the system's ready status and version string.
- **getStatus** — Returns the current show status (loaded show name, busy state, timeline information).

**Timeline playback:**
- **run** — Starts playback of the main timeline or a named auxiliary timeline.
- **halt** — Pauses the main timeline or a named auxiliary timeline.
- **kill** — Stops a named timeline (resets to beginning).
- **gotoTime** — Jumps to a specific time position on the main timeline or a named timeline. Maintains the current play/pause state.
- **gotoControlCue** — Jumps to a named control cue, searching forward from the current position (or backward if not found ahead). Maintains the current play/pause state.
- **reset** — Stops all auxiliary timelines and resets the main timeline to the beginning in a paused state.

**Timeline information:**
- **getAuxTimelines** / **getAuxTimelinesTree** — Returns a list of all auxiliary timelines with names and durations.
- **getTimelineStatus** — Returns the current playback status for a named timeline.
- **subscribeStatus** / **unsubscribeStatus** — Subscribe to or unsubscribe from real-time status updates for the show.
- **subscribeTimelineStatus** / **unsubscribeTimelineStatus** — Subscribe to or unsubscribe from real-time status updates for a specific timeline.
- **getControlCues** — Returns a list of control cues for a timeline.

**Variable/input control:**
- **getInputs** — Returns the current value of one or all input variables.
- **setInput** — Sets a single input variable to a value, optionally with a transition rate for smooth fading.
- **setInputs** — Sets multiple input variables simultaneously with a shared transition rate. When a transition rate is specified, values are smoothly interpolated at the show's frame rate.

**Show management:**
- **loadShow** — Loads a show file by path. Relative paths are resolved against the configured show directory.
- **online** — Accepted but has no effect (WATCHOUT 7 is always "online").

**Not supported:**
- **hitTest** — Returns an "unimplemented" error. Use the HTTP REST API's `/v0/hittest` endpoint instead for hit testing.

### Differences from WATCHOUT 6

While the compatibility layer aims to be transparent, there are some behavioral differences:

- WATCHOUT 7 is always online — the `online` command is accepted but ignored.
- Timeline identification uses names rather than numeric indices. Ensure timeline names match what your control system expects.
- The main timeline must be explicitly named "Main Timeline".
- Input variable fading (via `setInput` with a transition rate) is implemented by streaming interpolated values at the show's frame rate, which closely mimics WO6 behavior.

### Migration Guidance

The WO6 protocol is ideal for maintaining compatibility with existing control system integrations during a transition to WATCHOUT 7. However, for new integrations, consider using:

- **HTTP REST API** — For the most complete feature set, including cue set management, hit testing, show upload, and real-time event streams.
- **OSC** — For show controllers and creative applications that natively support OSC.

The WO6 protocol does not expose WATCHOUT 7-specific features like cue sets, SSE event streams, or the extended input API with custom interpolation durations.

### Use Cases

- **Crestron / AMX / Extron integration** — Existing control system programs written for WATCHOUT 6 continue to work without reprogramming.
- **Legacy show control** — Third-party show control systems that have WATCHOUT 6 drivers or modules can control WATCHOUT 7 without updates.
- **Gradual migration** — Run the WO6 and WO7 protocols simultaneously while transitioning control systems to the newer HTTP API.
