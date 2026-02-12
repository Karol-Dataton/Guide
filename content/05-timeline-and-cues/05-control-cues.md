---
title: "Control Cues"
---


## Control Cues

Control cues affect playback state instead of rendering media.

### Main Control Cue Types

- **Play Control Cue**: starts target timeline/composition
- **Pause Control Cue**: pauses target timeline/composition
- **Output Cue**: sends external output data
- **Variable Cue**: automates show variable values

### Creating Control Cues

Use the Timeline menu or shortcuts:

- Add Play Cue: `Ctrl+P`
- Add Pause Cue: `Ctrl+Shift+P`

Output and variable cues are available from timeline actions and context menus.

### Targeting Behavior

Control cues can target:

- Enclosing timeline
- Explicit include/exclude lists
- Other timelines or all timelines depending on mode

Targeting modes are typically used as:

- **All**: broad control across active timeline set
- **Others**: affect all timelines except the enclosing timeline
- **List**: explicit include list (or exclude list depending on mode)
- **Enclosing**: local/self timeline control

### Jump Behavior

Control cues can also define jump behavior:

- No jump
- Jump to target time
- Jump to target cue (forward/search variants)

This is useful for structured branching and operator-assisted recovery paths.

### Variable Cue Note

Variable cues are part of control-oriented timeline workflows and are covered in detail in [Variables and Variable Cues](09-variables-and-variable-cues.md).

Use clear naming and color coding so operators can identify control intent quickly.
