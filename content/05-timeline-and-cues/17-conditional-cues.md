---
title: "Conditional Cues"
---


## Conditional Cues

Any cue in WATCHOUT can have a **condition** attached that controls whether it is active during playback. For media cues, this is called **Conditional Render** — the cue only renders when the condition is true. For control and output cues, this is called **Conditional Trigger** — the cue only fires when the condition is true. This system enables interactive, data-driven shows where content appears, disappears, or triggers based on external inputs and show variables.

### Condition States

Every cue has a condition property that can be in one of three states:

- **Enabled** (default) — the cue always renders/triggers normally. No condition is evaluated.
- **Disabled** — the cue never renders/triggers, regardless of playback position. This is a simple way to mute a cue without deleting it.
- **Expression** — the cue renders/triggers only when the specified expression evaluates to true.

### Setting a Condition

To add a condition to a cue:

1. Select one or more cues
2. In the **Cue Properties** panel, find the condition section. The label adapts based on the cue types in your selection:
   - **Conditional Render** — for media cues
   - **Conditional Trigger** — for control and output cues
   - **Conditional Render/Trigger** — for mixed selections containing both media and control/output cues
3. Change the condition state from **Enabled** to **Expression** (or **Disabled** to simply mute the cue)
4. If you selected Expression, enter the condition expression in the **Expression** field

### Condition Expressions

A condition expression is a mathematical expression that is evaluated against the show's current **variable values** (inputs). The expression follows standard mathematical syntax and can reference any show variable by name.

The expression evaluates to a boolean using a simple rule: **if the result is greater than zero, the condition is true**. If the result is zero or negative, or if the expression contains an error, the condition is false.

Examples:

- `MyVariable` — true when the variable "MyVariable" is greater than 0
- `Language` — true when the "Language" variable is greater than 0
- `Temperature > 25` — true when the "Temperature" variable exceeds 25
- `ButtonA * ButtonB` — true only when both "ButtonA" and "ButtonB" are greater than 0
- `Mode == 2` — true when "Mode" equals 2 (evaluates to 1.0 which is > 0)

:::note
Variable names in expressions are **case-insensitive**. The expression `myVar` and `MYVAR` reference the same variable. Variables that are not defined in the show evaluate to 0.
:::

### Runtime Behavior

Conditions are evaluated **continuously** during playback, not just at the cue's start time. This means:

- A media cue with a conditional render will appear and disappear dynamically as the expression toggles between true and false during the cue's active time range
- A control cue with a conditional trigger will only execute its action (play, pause, stop, jump, etc.) when the condition is true at the moment the playhead reaches the cue's activation time
- An output cue with a conditional trigger will only send its output message (HTTP, TCP, UDP, OSC) when the condition is true at the activation time

If a media cue's condition becomes false while it is actively rendering, it stops rendering immediately. If the condition becomes true again while the playhead is still within the cue's time range, rendering resumes.

### Interaction with Variables

Condition expressions are most powerful when combined with **show variables** controlled by external inputs. Variables can be driven by:

- **OSC** (Open Sound Control) — from lighting consoles, custom apps, or sensor systems
- **MIDI** — from MIDI controllers or sequencers
- **Art-Net** — from DMX/Art-Net lighting systems
- **LTC** (Linear Timecode) — from timecode generators
- **HTTP API** — from custom control systems, web interfaces, or automation platforms

For example, a variable called "EmergencyMode" could be set to 1 via an HTTP API call when an emergency occurs. All cues conditioned on `EmergencyMode` would immediately start rendering emergency messaging across all displays.

### Use Cases

**Show branching based on audience interaction:** Use sensor data (via OSC or MIDI) to set a variable that controls which content path the show follows. Cues on one branch are conditioned on the variable being 1, while cues on the alternative branch are conditioned on it being 0.

**Time-of-day content switching:** An external system sets a "TimeOfDay" variable (e.g. 1 for morning, 2 for afternoon, 3 for evening). Media cues conditioned on `TimeOfDay == 1`, `TimeOfDay == 2`, or `TimeOfDay == 3` display appropriate content automatically.

**Emergency messaging:** A dedicated "Emergency" variable is normally 0. When triggered via the HTTP API, it becomes 1, causing conditioned emergency messaging cues to render on all displays instantly. Clearing the variable back to 0 removes the messaging.

**Interactive installations:** In museum or exhibition contexts, proximity sensors or touch interfaces can drive variables that show or hide content as visitors approach or interact with displays.

**Rehearsal/performance mode:** A "ShowMode" variable switches between rehearsal (showing stage directions, timing markers, and debug overlays) and performance mode (clean output only). Cues for each mode are conditioned on the appropriate variable value.
