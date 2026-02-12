---
title: "MIDI Bridge"
---


## MIDI Bridge

The MIDI Bridge is a standalone service that receives MIDI messages from a connected MIDI device and forwards them as variable updates to the WATCHOUT Director. It provides a straightforward way to use physical MIDI controllers — faders, knobs, buttons, and pitch wheels — for real-time control of show parameters.

### Enabling the MIDI Bridge

The MIDI Bridge is managed as a service from the **Network** window in Producer. It can be started and stopped on any node that has MIDI input hardware (or a virtual MIDI driver) available.

When the MIDI Bridge starts, it opens a configuration window where you can select the MIDI device, configure the Director target, and adjust settings.

### Configuration

The MIDI Bridge configuration window provides the following settings:

- **MIDI Device** — A dropdown listing all available MIDI input ports on the machine. Select the device you want to receive messages from. The selected device is saved in the bridge's settings file and restored automatically on restart.
- **Director IP** — The IP address of the Director to send variable updates to. Defaults to `127.0.0.1` (localhost) for single-machine setups. Change this when the Director runs on a different machine.
- **Normalize** — When enabled, MIDI values are normalized to a 0.0–1.0 range. When disabled, raw MIDI values are forwarded (e.g., 0–127 for Control Change, 0–16383 for Pitch Wheel). Normalization is convenient when your variables use a 0–1 range.
- **MSC Device ID** — The MIDI Show Control Device ID used to filter incoming MSC messages. Only messages matching this Device ID (or the all-call ID `127`) are processed. See the MIDI Show Control article for details.

### Supported Message Types

The MIDI Bridge handles the following MIDI message types:

**Control Change (CC)** — The most common type for faders and knobs. Each CC message generates a variable key in the format:

`midi.ch({channel}).cc({control_number})`

For example, moving CC #7 on MIDI channel 0 produces the key `midi.ch(0).cc(7)`.

**Note On** — Key presses on a MIDI keyboard or button pad. The velocity value is used as the variable value. Key format:

`midi.ch({channel}).note({note_number})`

**Note Off** — Key releases. These produce a value of `0` for the same key as the corresponding Note On.

**Pitch Wheel** — The pitch bend wheel. A 14-bit value (0–16383) is generated with the key:

`midi.ch({channel}).pitch`

**MIDI Show Control (MSC)** — SysEx messages conforming to the MSC specification are parsed and forwarded as show control commands (GO, STOP, GO OFF, RESET) rather than variable values. See the MIDI Show Control article for details.

:::note
Other MIDI message types (Program Change, Aftertouch, System Exclusive other than MSC) are not processed by the MIDI Bridge.
:::

### How It Works

The MIDI Bridge operates independently from the Operative. When a MIDI message is received:

1. The message is parsed and converted into the appropriate key/value format.
2. For **Control Change, Note, and Pitch Wheel** messages: The bridge posts the values directly to the Director's `/v0/inputs` endpoint as JSON. The Director applies the default 50ms interpolation for smooth transitions.
3. For **MSC messages**: The bridge posts the parsed MSC command to the Operative's `/v0/msc` endpoint, which handles timeline control.

Messages are batched and sent at a maximum rate of approximately 100 updates per second (10ms interval) to avoid overwhelming the Director with rapid MIDI changes.

### Hardware Requirements

The machine running the MIDI Bridge must have:

- A **MIDI input device** connected (USB MIDI interface, MIDI controller, or MIDI keyboard).
- Alternatively, a **virtual MIDI driver** (such as loopMIDI or IAC Driver) for receiving MIDI from software applications.

The MIDI Bridge lists all available MIDI input ports on the system. If no ports appear, check that your MIDI device drivers are correctly installed.

### Use Cases

- **Fader-based control** — Map physical faders on a MIDI controller to opacity, volume, or position variables for hands-on show control.
- **Button-triggered scenes** — Use MIDI note buttons to switch between variable presets or trigger timeline actions.
- **DJ controller integration** — Repurpose DJ MIDI controllers with their knobs, faders, and jog wheels to control visual parameters in real time.
- **Show control via MSC** — Receive GO/STOP/RESET commands from a theatrical show control system that outputs MSC.
