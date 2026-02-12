---
title: "Variables and Inputs"
---


## Variables and Inputs

Variables are the central mechanism through which all external control reaches WATCHOUT's rendering engine. Every external protocol — whether ArtNet, OSC, MIDI, HTTP, or any other — ultimately writes values to the same pool of show variables. These variables then drive tween expressions, conditional cues, and timeline triggers, making them the bridge between the outside world and what appears on screen.

### The Variables Window

The **Variables** window in Producer is where you manage all show variables. From here you can:

- **Add** new variables to the show.
- **Remove** variables that are no longer needed.
- **Edit live values** using sliders or direct numeric entry, allowing real-time preview of how a variable affects the show.
- **Save current values as defaults** so that when the show is loaded or variables are reset, they return to a known state.

Each variable in the list displays its current value, external key assignment, and configured range.

### Variable Properties

Each variable has the following properties:

- **Name** — The display name of the variable as it appears in the Variables window and in expression references. This is also the name used internally when matching render inputs.
- **External Key** — The identifier that external protocols use to address this variable. For example, an OSC message sent to `/brightness/0` would match a variable whose external key is `osc.addr(/brightness/0)`. Each protocol has its own key format (described in the individual protocol articles).
- **Minimum Value** — The lower bound of the variable's range. Incoming values below this are clamped.
- **Maximum Value** — The upper bound of the variable's range. Incoming values above this are clamped.
- **Default Value** — The value the variable takes when the show is first loaded or when variables are reset.
- **Interpolation Mode** — How the variable transitions between values (see below).

### External Keys and Learn Mode

The **external key** is what connects an incoming protocol message to a specific WATCHOUT variable. Different protocols generate keys in different formats:

- **OSC:** `osc.addr(/your/address/0)` — derived from the OSC address pattern and argument index.
- **ArtNet:** `artnet.net(0).subnet(0).uv(1).ch(10)` — specifies the DMX universe and channel.
- **MIDI:** `midi.ch(0).cc(7)` — specifies the MIDI channel and control change number.
- **PosiStageNet:** `psn.1.pos.x` — specifies the tracker ID and data field.

Rather than manually typing these key strings, WATCHOUT provides a **Learn** mode. When Learn mode is active, you select a variable in the Variables window and then send a signal from your external device (move a fader, send an OSC message, etc.). WATCHOUT captures the incoming key and automatically assigns it to the selected variable. This eliminates guesswork about key format and ensures the mapping is correct.

### Input Flow

When an external signal arrives at WATCHOUT, it goes through the following processing chain:

1. **Reception** — The protocol handler (in the Operative or a bridge service) receives the raw message.
2. **Key extraction** — The handler converts the protocol-specific address into an external key string.
3. **Matching** — The Director matches the external key against all variables defined in the current show.
4. **Clamping** — The incoming value is clamped to the variable's configured min/max range.
5. **Interpolation** — The value is interpolated over the configured interpolation window (typically 50ms) to produce a smooth transition.
6. **Distribution** — The interpolated value is broadcast to all Runners, where it becomes available to tween expressions, conditional cue evaluations, and other variable consumers.

This entire chain happens in real time with minimal latency, allowing responsive control of live visual content.

### Interpolation Modes

The interpolation mode determines how a variable transitions from its current value to a new incoming value:

**None** — The value jumps instantly to the new value with no transition. Use this for discrete state changes (e.g., switching between scenes, toggling visibility).

**Linear** — The value transitions linearly from the old value to the new value over the interpolation period. This is the most common mode and is suitable for most continuous parameters like opacity, position, and volume. A fader moving from 0 to 100 will produce a smooth, even ramp.

**Circular** — The value wraps around the min/max range, always taking the shortest path. This is designed for cyclic parameters like hue (0–360°) or rotation angles. For example, if a circular variable with range 0–360 transitions from 350 to 10, it will go forward through 360/0 (a 20-degree change) rather than backward through 180 (a 340-degree change).

:::tip
For most use cases, **Linear** interpolation is the best default. Use **None** only when you need instantaneous changes, and **Circular** specifically for angular or cyclic values.
:::

### Default Values

Each variable has a configurable default value. Defaults are applied in two situations:

- **Show load** — When a show file is opened, all variables start at their default values.
- **Variable reset** — When variables are explicitly reset (e.g., through a control command).

You can update defaults at any time by adjusting variables to the desired values in the Variables window and then saving the current values as the new defaults. This is useful for establishing a known starting state for a show — for example, setting all opacity variables to 100% and all position offsets to 0.

### Using Variables in the Show

Once a variable receives a value from an external source, that value can be referenced throughout the show:

- **Tween expressions** — Bind a cue's position, opacity, scale, rotation, or any other tweenable property to a variable. The property value updates in real time as the variable changes.
- **Conditional cues** — Set a cue's visibility condition to depend on a variable value (e.g., show a cue only when `brightness > 50`).
- **Variable cues** — Timeline-based automation that sets variable values at specific points during playback. See the Variable Cues section in Chapter 6 for details on driving variables from the timeline rather than from external input.
