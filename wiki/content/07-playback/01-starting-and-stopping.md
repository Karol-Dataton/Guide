---
title: "Starting and Stopping"
---


## Starting and Stopping

Playback in WATCHOUT is controlled independently per timeline. Each timeline in your show has its own playback state — Run, Pause, or Stop — and each can be started, paused, or stopped without affecting the others. This per-timeline model is fundamental to how WATCHOUT manages complex shows: you can have one timeline playing a background loop, another paused at a specific frame for a static look, and a third stopped and waiting for its cue, all at the same time. Understanding how these states work, how to control them from the keyboard and the interface, and how they interact with features like lock modes and free-running cues is essential for both programming and live operation.

### Playback States

Every timeline exists in one of three playback states at any given moment:

| State | Behavior | Output |
|---|---|---|
| **Run** | The timeline plays forward from its current position. The play cursor advances in real time and all cues are evaluated as it passes over them. | Active — cues render to their assigned displays |
| **Pause** | The timeline freezes at its current position. The play cursor stops advancing, but all cues that were active at the pause point remain visible in their current state. | Active — output holds at the paused frame |
| **Stop** | The timeline is inactive. The play cursor returns to the beginning (or remains at its current position depending on context), and the timeline's active state is cleared. | Inactive — cues from this timeline are removed from output |

The distinction between Pause and Stop is important for live operation. Pausing a timeline keeps its visual output on screen — the audience sees a frozen frame. Stopping a timeline removes its output entirely. Use Pause when you need to hold a look, and Stop when you need to clear the stage.

### Keyboard Shortcuts

WATCHOUT provides dedicated keyboard shortcuts for playback control. These operate on the currently selected timeline:

| Shortcut | Action |
|---|---|
| **Space** | Toggle between Run and Pause on the current timeline |
| **Numpad 0** (or Numpad Insert) | Run the current timeline |
| **Escape** | Pause the current timeline |
| **Numpad *** | Jump to the current time marker or the last starting time |
| **Home** | Navigate the play cursor to the beginning of the timeline |
| **End** | Navigate the play cursor to the end of the timeline |

:::tip
The **Space** shortcut toggles play and pause on the currently selected timeline. If you are working with multiple timelines, make sure the correct one is selected before pressing Space.
:::

#### Legacy Mode

WATCHOUT includes a **Legacy Mode** option (found under **Playback Shortcuts** in Preferences) that changes the Space bar behavior to match WATCHOUT 6. In Legacy Mode, Space toggles play and pause on the last active timeline rather than the currently selected one. This can be useful if you are accustomed to the older workflow, but be aware that it changes which timeline responds to your keyboard commands.

### Timeline Play Controls

Each timeline in the Timelines window displays its own set of **Play**, **Pause**, and **Stop** buttons. These buttons provide direct, per-timeline control without needing to select the timeline first. The currently active state is visually highlighted on the buttons, so you can see at a glance which timelines are running, paused, or stopped.

When working with many timelines, the per-timeline buttons are often more reliable than keyboard shortcuts because they eliminate any ambiguity about which timeline will respond.

### The Play Cursor

The play cursor is the vertical line in the timeline editor that indicates the current playback position. Its appearance changes based on the current mode:

- **Normal mode** — the play cursor appears as a dotted vertical line
- **Click Jumps to Time mode** — the play cursor appears as a solid vertical line

During playback, the play cursor advances in real time. The timeline view automatically scrolls to keep the cursor visible, so you can always see which cues are currently active.

#### Click Jumps to Time

When **Click Jumps to Time** is enabled, clicking anywhere in the timeline area instantly moves the play cursor to that position. This is the default behavior and is the most intuitive way to navigate within a timeline during programming.

Toggle this mode with **Ctrl+T** (Windows) or **Cmd+T** (macOS), or from the **Timeline** menu. When disabled, clicking in the timeline area selects cues rather than repositioning the cursor.

### Navigation Shortcuts

Beyond basic playback control, WATCHOUT provides shortcuts for navigating and zooming within timelines:

| Shortcut | Action |
|---|---|
| **Ctrl/Cmd+T** | Toggle Click Jumps to Time |
| **Numpad +** | Zoom in on the timeline |
| **Numpad -** | Zoom out on the timeline |
| **Ctrl/Cmd+0** | Zoom to fit (show entire timeline) |
| **Home** | Jump to beginning |
| **End** | Jump to end |

### Timeline Lock States

Each timeline supports a lock state that controls how it responds to editing and playback commands. There are three lock levels:

| Lock State | Editing | Playback Commands | Use Case |
|---|---|---|---|
| **Unlocked** | Allowed | Responds normally | Normal programming and operation |
| **Locked** | Restricted | Responds normally | Protect a finished timeline from accidental edits while still allowing playback |
| **Hands Off** | Restricted | Ignored — the timeline will not respond to run, pause, or stop commands | Completely isolate a timeline during complex multi-timeline work so it cannot be accidentally started or stopped |

When a timeline is in **Hands Off** mode, its play controls appear dimmed in the interface, and the play cursor displays a "Hands Off" indicator. This mode is particularly useful during rehearsals when you want to ensure that a critical timeline (such as a background loop or architectural lighting state) cannot be accidentally disrupted by playback commands intended for other timelines.

### Multi-Timeline Playback

Because each timeline has independent playback state, WATCHOUT naturally supports running multiple timelines simultaneously. Common patterns include:

- **Layered shows** — a background timeline running continuously with foreground timelines triggered for specific scenes or segments
- **Independent zones** — separate timelines controlling different display groups or rooms in a multi-zone installation
- **Cue-driven sequences** — a master timeline that uses control cues to start and stop other timelines at precise moments (see [Running Your Show](05-running-your-show.md) for details on control cues)

There is no limit to the number of timelines that can be running simultaneously. Each timeline's output is composited according to its cues' display assignments and layer order.

### Free-Running Cues

Individual cues can be set to **Free Running** mode. When a cue is free-running, its media continues to play even when the parent timeline is paused. This affects only media playback — tween animations on the cue still pause with the timeline.

Free Running is useful for:

- **Video loops** that should continue playing seamlessly even when the operator pauses the timeline to hold a look
- **Live input sources** that should always show real-time content regardless of timeline state
- **Clock or data-driven content** that must remain current

You enable Free Running per cue in the cue's properties. See [Cue Properties](../05-media-and-cues/02-cue-properties.md) for details.

### Cue-Level Looping

Media cues support looping with configurable **Start Point** and **End Point**. When looping is enabled, the cue's media plays from the start point to the end point and then jumps back to the start point, repeating continuously. This is configured per cue in the cue properties — there is no timeline-level loop or region playback.

Looping works in combination with Free Running: a looping video cue set to Free Running will continue its loop cycle even when the timeline is paused.

### Blind Edit Warning

If you attempt to edit a timeline that is currently in the Run or Pause state, WATCHOUT displays a warning dialog: **"Are you sure you want to edit a [state] Timeline?"** This alert exists because modifying cues on a timeline that is actively rendering can produce unexpected visual results — changes may take effect immediately and disrupt the current output.

:::warning
Editing a running or paused timeline can cause visible glitches in live output. If you need to make changes during a show, consider stopping the timeline first, or make your edits on a duplicate timeline and switch to it at a planned transition point.
:::

### Relationship to Other Playback Features

Starting and stopping timelines is only the first layer of WATCHOUT's playback system:

- **Control cues** allow timelines to start, stop, and pause other timelines at specific moments, enabling complex automated sequences. See [Running Your Show](05-running-your-show.md).
- **Timeline triggers** (play, pause, and stop expressions) can automatically change playback state based on show variables, enabling external control and conditional logic. See [Running Your Show](05-running-your-show.md).
- **Auto Run** causes a timeline to begin playing automatically when the show is loaded by the Director, which is essential for unattended installations. See [Running Your Show](05-running-your-show.md).
- **Preview in the Stage window** lets you validate timing and transitions before going live. See [Preview Mode](02-preview-mode.md).

### Recommended Workflow

1. **Set your starting position.** Use Home to jump to the beginning, or click in the timeline (with Click Jumps to Time enabled) to place the cursor at your desired start point.
2. **Confirm the correct timeline is selected.** Check that the timeline you intend to control is highlighted in the Timelines window, especially when using keyboard shortcuts.
3. **Start playback.** Press Space or Numpad 0, or click the Play button on the timeline.
4. **Monitor the play cursor.** Watch the cursor advance through your cues to verify timing and transitions.
5. **Pause or stop as needed.** Use Escape to pause (holding the current frame on screen) or Stop to clear the timeline's output.
6. **Use Hands Off mode** to protect timelines that should not be affected during rehearsal or multi-timeline programming sessions.
