---
title: "Variables and Variable Cues"
---


## Variables and Variable Cues

WATCHOUT variables let you drive timeline behavior and runtime values with explicit numeric controls.

### Variables Window Workflow

Open **Window → Variables** to manage show variables.

Core actions:

- Add/remove variables
- Edit live values with sliders
- Save current values as new defaults

Each variable can define:

- Name
- External key
- Min/max/default value
- Interpolation mode

### Learning External Keys

Variable properties include a **Learn** mode for capturing an external key assignment.

Typical workflow:

1. Select a variable.
2. Enable **Learn**.
3. Send the external control signal.
4. Confirm key assignment and disable learning.

### Adding Variable Cues on the Timeline

Variable automation can be added in timeline context by using variables as drag sources.

Supported interactions:

- Drag variables to a layer area to create a **Variable Cue**
- Drop variables on an existing cue to add variable-related tween data

### Good Practice

- Keep variable names stable and descriptive.
- Set realistic min/max bounds before building automation.
- Save known-safe defaults before rehearsals and show runs.
- Use marker/comment cues to document operator-sensitive variable changes.
