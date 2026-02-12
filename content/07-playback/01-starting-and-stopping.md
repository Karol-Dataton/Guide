---
title: "Starting and Stopping"
---


## Starting and Stopping

Playback is controlled per timeline (or composition timeline) using run, pause, and stop states.

### Primary Controls

| Action | Shortcut |
| --- | --- |
| Toggle play/pause | `Spacebar` |
| Run timeline | `Numpad 0` (or Numpad Insert) |
| Pause timeline | `Escape` |
| Jump to current/last start | `Numpad *` |

### UI Controls

Timeline windows provide explicit **Play / Pause / Stop** buttons. The active state is visually highlighted.

### Operational Behavior

- **Run** starts playback from current timeline time (or defined start behavior).
- **Pause** freezes at current position.
- **Stop** ends playback and resets active state.

### Good Practice

Before running live:

1. Move play cursor to known start point.
2. Confirm target timeline/composition is selected.
3. Check that connected nodes/services are healthy.
