---
title: "Control Cues"
---


## Control Cues

**Control cues are the mechanism for orchestrating timeline playback states across a WATCHOUT show.** While media cues place visual and audio content on the timeline, control cues change *what timelines are doing* — starting them, pausing them, stopping them, and jumping to specific points in time. Any show that uses more than one timeline needs control cues to coordinate playback between them.

### What Control Cues Are

A control cue is a **point-in-time instruction** placed on a timeline. When the playhead reaches a control cue, it fires once and changes the playback state of one or more target timelines. Control cues have no duration — they execute at their start time and do not occupy a range on the timeline.

Each control cue specifies:

- A **state** to apply to the target (Run, Pause, or Stop)
- A **target** defining which timelines are affected
- An optional **jump** that repositions the target's playhead
- An optional **start delay** before execution

Control cues are one of several specialized cue types in WATCHOUT. They are distinct from [Output Cues](07-output-cues.md), which send external messages (HTTP, TCP, UDP, OSC), and from [Variable Cues](08-variables-and-variable-cues.md), which automate show variable values. Output and Variable cues are separate cue types-they are not subtypes of control cues.

### Control Cue States

The state property determines what happens to the target timeline when the control cue fires:

| State | Effect | Description |
|-------|--------|-------------|
| **Run** | Starts or resumes playback | The target timeline begins playing from its current position. If already running, the cue has no additional effect. This is the default state. |
| **Pause** | Freezes playback | The target timeline holds at its current position. Media on the timeline remains visible at the frozen frame. |
| **Stop** | Halts and resets playback | The target timeline stops completely. All media on the timeline ceases rendering. |

States are ranked in priority order: **Stop > Pause > Run**. This ordering matters for [conflict resolution](#conflict-resolution) when multiple control cues fire simultaneously.

### Creating a Control Cue

1. Position the playhead at the desired time on the timeline.
2. Open the **Timeline** menu or right-click the timeline to open the context menu.
3. Select the control cue action for the desired state (Run, Pause, or Stop).
4. The control cue appears on the timeline at the playhead position.
5. With the cue selected, use the **Cue Properties** panel to configure targeting, jump behavior, and other options.

:::tip
Give control cues descriptive names — especially cues that serve as jump targets. A cue named "Loop Point A" is far easier to work with than an unnamed cue at an arbitrary timecode. Named control cues and named [Marker Cues](06-marker-cues.md) both appear in jump-target lists.
:::

### Targeting

The target property (labeled **"Timeline"** in the Properties panel) determines which timelines a control cue affects. There are three targeting modes.

#### Legacy Mode

Legacy mode targets a single timeline and is the default behavior. It uses one of three values:

| Value | Behavior |
|-------|----------|
| **This** (default) | Targets the timeline that contains the control cue. |
| **Id** | Targets a specific timeline by its unique identifier. |
| **Name** | Targets a timeline by its display name. |

Legacy mode is the simplest option and is appropriate when a control cue needs to affect exactly one timeline.

#### List Mode

List mode targets an explicit set of timelines and/or folders:

| Field | Type | Description |
|-------|------|-------------|
| **timelines** | Set of timeline IDs | The specific timelines to target. |
| **folders** | Set of folder IDs | All timelines within these folders are targeted. |
| **Skip Self** | Boolean | When enabled, the timeline containing the control cue is excluded from the target set even if it appears in the lists. |

Use List mode when you need to start, pause, or stop a known group of timelines — for example, running all timelines in a "Scene 2" folder.

#### All Mode

All mode targets every timeline in the show, with optional exclusions:

| Field | Type | Description |
|-------|------|-------------|
| **exclude_timelines** | Set of timeline IDs | Timelines to exclude from the "all" set. |
| **exclude_folders** | Set of folder IDs | Timelines within these folders are excluded. |
| **Skip Self** | Boolean | When enabled, the timeline containing the control cue is excluded. |

All mode is useful for global operations like stopping all timelines at the end of a show or pausing everything except a background loop.

#### Targeting Mode Summary

| Mode | Targets | Use Case |
|------|---------|----------|
| **Legacy** | A single timeline (self, by ID, or by name) | Simple one-to-one control between timelines |
| **List** | Explicit sets of timelines and folders | Controlling a known group (e.g., all timelines in a scene folder) |
| **All** | Every timeline, minus exclusions | Global operations (e.g., stop-all, pause-all except background) |

:::warning
When using **All** mode or **List** mode with **Skip Self** disabled, a Run cue on a timeline can re-trigger itself. This is usually unintentional. Enable **Skip Self** unless you specifically need the cue's own timeline in the target set.
:::

### Jump Behavior

Control cues can optionally reposition the target timeline's playhead before the state change takes effect. The jump property has three modes:

| Jump Mode | Behavior |
|-----------|----------|
| **False** (default) | No jump. The state change applies at the target's current playhead position. |
| **ToTime** | Jumps the target's playhead to the absolute time specified in **Target Time**, then applies the state change. |
| **ToCue** | Searches for a named cue matching **Target Cue Name** on the target timeline, jumps to that cue's position, then applies the state change. |

#### Search Direction for Jump-to-Cue

When jump is set to **ToCue**, the **Search Direction** property controls which direction the system searches for the named cue:

- **Forward search** (the default) — searches strictly after the current playhead time. If no matching cue is found ahead, the search wraps around to the beginning of the timeline and returns the last matching target found.
- **Reverse search** — searches strictly before the current playhead time. If no matching cue is found before the current position, the search fails and returns an error. Reverse search does **not** wrap.

:::note
The asymmetry between forward and reverse search is intentional. Forward wrapping enables looping constructs (jump to "Loop Start" from any position). Reverse non-wrapping prevents unexpected backward jumps past the beginning of the timeline.
:::

### Jump Targets

When a control cue uses **ToCue** jump mode, it searches the target timeline for cues with a matching name. Two types of cues can serve as jump targets:

- **Named control cues** — any control cue with a non-empty name
- **Named marker (comment) cues** — any [Marker Cue](06-marker-cues.md) with a name

Both types are indexed together as potential jump destinations, so they are interchangeable as targets. This means you can use lightweight marker cues purely as labeled positions for control cue jumps, without needing to place a control cue at every potential destination.

:::tip
Use [Marker Cues](06-marker-cues.md) as jump targets when the destination is simply a labeled position in the timeline. Reserve named control cues as jump targets when the destination also needs to perform its own state change or jump.
:::

### Conflict Resolution

When multiple control cues fire at the same time on the same target timeline, the system must determine which one takes precedence. WATCHOUT resolves this deterministically:

1. All control cues targeting the same timeline at the same instant are collected.
2. Because states are ranked **Stop > Pause > Run**, the most restrictive state wins.

In practice, this means the most restrictive state wins. If one cue says "Run" and another says "Stop" at the same instant on the same target, the target stops.

### Start Delay

The **Start Delay** property adds a waiting period between the playhead reaching the control cue and the cue actually executing. The delay is specified as a duration.

Start delays are useful for staggering a sequence of state changes — for example, placing several control cues at the same timeline position but giving each a different delay so that target timelines start in sequence rather than simultaneously.

### Blind Edit Mode and Control Cues

When a timeline is opened in [Blind Edit Mode](15-blind-edit-mode.md), it is isolated from the live show. WATCHOUT automatically prevents control cues in blind-edited compositions from affecting other timelines during editing. This ensures that making changes to a composition offline does not inadvertently start, stop, or jump timelines in the running show.

### Best Practices

- **Name every control cue that serves as a jump target.** Unnamed cues cannot be found by jump-to-cue searches. Use clear, descriptive names like "Scene 3 Start" or "Loop Return Point".

- **Prefer List or All mode over hardcoded IDs for multi-target control.** Timeline IDs change if a timeline is deleted and recreated. Folder-based targeting survives timeline reorganization better.

- **Enable Skip Self as a default.** Unless a control cue specifically needs to affect its own timeline, enabling Skip Self prevents accidental self-triggering, especially with All or List targeting.

- **Avoid circular jump chains.** A control cue that jumps to a position containing another control cue that jumps back creates an infinite loop. If you need looping behavior, use a single forward-jumping cue at the end of the loop region that targets a marker at the beginning.

- **Use marker cues as jump landmarks.** Placing [Marker Cues](06-marker-cues.md) at key positions (scene starts, loop points, recovery positions) keeps the timeline readable and provides jump targets without adding extra state-change logic.

- **Combine with [Conditional Cues](17-conditional-cues.md) for interactive branching.** Attach condition expressions to control cues so they only fire when a variable meets a threshold — enabling operator-driven or sensor-driven show branching.

- **Test targeting carefully in multi-timeline shows.** A control cue with All mode and no exclusions will stop *every* timeline, including background loops and utility timelines. Always verify the exclude lists.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Control cue does not fire | Cue has a conditional trigger expression that evaluates to false | Check the condition in Cue Properties; verify the referenced variable value. See [Conditional Cues](17-conditional-cues.md). |
| Target timeline does not respond | Targeting is set to Legacy (This) but the intended target is a different timeline | Change the target mode to Legacy (Name or Id) or use List mode with the correct timeline selected. |
| ToCue jump does nothing | No cue with the specified name exists on the target timeline | Verify the **Target Cue Name** matches exactly (case-sensitive). Ensure the target cue is a named control cue or named marker cue. |
| ToCue reverse jump fails | No matching cue exists before the current playhead position, and reverse search does not wrap | Place the named target cue earlier on the timeline, or switch to forward search which wraps to the beginning. |
| Multiple control cues conflict | Several cues fire at the same time with different states | The highest-priority state wins (Stop > Pause > Run). If this is unintended, stagger the cues with different start delays or adjust targeting. |
| Control cue affects unintended timelines | All mode is active without proper exclusions | Add timelines or folders to the exclude lists, or switch to List mode with explicit targets. |
| Control cue in blind-edited composition triggers live timelines | Unexpected — blind edit mode should isolate control cues | Verify the composition is opened in [Blind Edit Mode](15-blind-edit-mode.md). The isolation mechanism should prevent this. |
| Jump creates an infinite loop | Two or more control cues jump to each other's positions | Break the cycle by removing one jump, or use a conditional trigger to gate one of the cues. |

### See Also

- [Marker Cues](06-marker-cues.md) — named markers serve as jump targets for control cues
- [Output Cues](07-output-cues.md) — separate cue type for sending external messages
- [Variables and Variable Cues](08-variables-and-variable-cues.md) — separate cue type for automating show variables
- [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md) — external triggers that can start timelines
- [Conditional Cues](17-conditional-cues.md) — attaching conditions to control cues for interactive branching
- [Blind Edit Mode](15-blind-edit-mode.md) — how control cues are isolated during offline editing
