---
title: "MIDI Show Control"
---


## MIDI Show Control

MIDI Show Control (MSC) is an industry-standard protocol for controlling show equipment using a defined set of commands within the MIDI System Exclusive (SysEx) specification. It is widely used in theatrical productions, theme parks, and live events to coordinate cue triggering across multiple devices from different vendors.

WATCHOUT receives MSC messages through the **MIDI Bridge** and translates them into timeline playback commands.

### How MSC Reaches WATCHOUT

MSC messages are received by the **MIDI Bridge** service alongside regular MIDI Control Change messages. When the MIDI Bridge detects an MSC SysEx message on the connected MIDI input, it:

1. Parses the MSC message fields (device ID, command, Q-number, list number).
2. Checks whether the message's device ID matches the configured **MSC Device ID** (or the all-call ID `127`).
3. Forwards matching messages to the Operative's MSC endpoint, which executes the corresponding timeline command.

The MSC Device ID is configured in the MIDI Bridge settings dialog. This allows multiple WATCHOUT systems on the same MIDI network to respond to different MSC messages.

### Supported Commands

WATCHOUT supports the following MSC commands:

**GO** — Starts playback of a timeline. If a Q-number is provided, playback jumps to the cue matching that name and begins playing. If a list number is provided, it identifies the target timeline by name.

**STOP** — Pauses the timeline at its current position. If a Q-number is provided, the timeline jumps to that cue's position and pauses.

**GO OFF** — Stops the timeline and resets it to the beginning. If a Q-number is provided, the timeline jumps to that cue's position and stops.

**RESET** — Stops all timelines in the show and resets them to their beginning positions. This command takes no Q-number or list number parameters.

### Q-Number and List Number Mapping

MSC commands can include optional Q-number and list number fields that determine which cue and timeline are targeted:

- **Q-number** — Matched against **cue names** in the show. WATCHOUT searches for the first cue whose name matches the Q-number string and uses that cue's timeline position as the target time.
- **List number** — Matched against **timeline names** in the show. If provided, the command targets the timeline with the matching name.
- **No list number** — When the list number is omitted, the command targets the timeline with the lowest ID (typically the first timeline in the show).

:::tip
To issue a play or pause command that uses the timeline's current position (without jumping to a cue), send Q-number `0`. This is a special bypass value inherited from WATCHOUT 6 behavior.
:::

### MSC Message Format

For reference, WATCHOUT processes standard MSC SysEx messages with the following structure:

`F0 7F {device_id} 02 {command_format} {command} {data} F7`

- `F0` — SysEx start byte
- `7F` — Universal System Exclusive (real-time)
- `{device_id}` — 0–126 for specific devices, 127 (`0x7F`) for all-call (broadcast to all devices)
- `02` — MSC sub-ID
- `{command_format}` — Specifies the device type being controlled
- `{command}` — `0x01` (GO), `0x02` (STOP), `0x03` (GO OFF), `0x04` (RESET)
- `{data}` — Optional Q-number, list number, and path fields, separated by `0x00` delimiter bytes
- `F7` — SysEx end byte

### Configuration

To receive MSC messages in WATCHOUT:

1. Start the **MIDI Bridge** on a node with a MIDI input device.
2. Select the MIDI input port that receives MSC messages.
3. Set the **MSC Device ID** in the MIDI Bridge settings to match the device ID your show control system sends to (or leave it at `0` and ensure your controller sends to device `0` or all-call `127`).

### Use Cases

- **Theatrical show control** — Trigger WATCHOUT cues from a stage manager's MSC-capable console (e.g., QLab, SFX, Medialon, Dataton PICKUP).
- **Multi-vendor coordination** — Synchronize WATCHOUT with lighting, sound, and automation systems that all listen to the same MSC cue stream.
- **Theme park automation** — Integrate WATCHOUT playback into complex ride and attraction control systems that use MSC for sequencing.
