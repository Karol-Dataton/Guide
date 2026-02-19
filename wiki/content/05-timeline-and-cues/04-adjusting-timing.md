---
badge: Karol
---


## Adjusting Timing

**Precise timing is central to show quality — a single frame of misalignment between projectors or a late audio cue can break the audience's immersion.** WATCHOUT provides high-precision internal timing and exposes direct-manipulation tools that let you position, trim, and tempo-shift cues with frame-accurate control. This article explains how the timing properties work and how to use snapping, looping, and fades to build tight, repeatable shows.

### How WATCHOUT Represents Time

WATCHOUT uses high-precision internal timing for all calculations, and stores time values as milliseconds in the show file. The timeline UI displays time in `HH:MM:SS.mmm` format (hours, minutes, seconds, and milliseconds).

Because internal calculations use higher precision than the saved millisecond values, loop points and speed-scaled offsets remain accurate across long playback runs without accumulating drift.

:::note
When scripting via the external API, all time values are sent and received as integer milliseconds.
:::

:::tip
For image assets, the default duration is **10 seconds** (set by the show-level image duration default). Video and audio assets default to their intrinsic asset duration. You can change the show default in **Show Settings**.
:::

### Moving Cues

Dragging a cue's body repositions it along the timeline, changing its **start** time without affecting duration or **In Time**.

1. Select one or more cues.
2. Click and drag the cue body left or right.
3. Release at the desired position. Snapping guides appear when the cue aligns with nearby targets (see [Snapping](#snapping)).

To move a cue to an exact time, select it and type the desired start value in the **Properties** panel.

:::tip
Hold **Shift** while dragging to temporarily disable snapping for fine free-placement.
:::

### Trimming Duration

Drag the left or right edge of a cue to change its duration. How the edges behave depends on which side you drag:

- **Right edge (fade-out side):** changes duration directly. The cue's start time and **In Time** remain fixed.
- **Left edge (fade-in side):** changes start, duration, and **In Time** together so the visible playback region shifts without moving the cue's right boundary.

#### Trim and Reset Commands

For precise operations, use the timeline context menu or keyboard shortcuts:

| Command | Effect |
|---|---|
| **Trim Start** | Moves the cue start to the current playhead position, adjusting **In Time** and duration accordingly |
| **Trim End** | Moves the cue end to the current playhead position, adjusting duration |
| **Reset Duration** | Restores the cue to its original asset duration (or show default for images) |
| **Reset In-Time** | Sets **In Time** back to 0, so playback begins at the start of the asset |

These commands are especially useful after rehearsal changes when multiple cues need to be normalized quickly.

### In-Time (Media Start Offset)

**In Time defines where inside the source asset playback begins.** A cue with an **In Time** of 5 seconds skips the first five seconds of the media file and starts playing from that point.

Common uses:

- Trimming a countdown leader from the head of a video.
- Creating multiple cues from different sections of the same long-form asset.
- Adjusting after a director requests "start from the third verse."

To change **In Time** directly, select the cue and edit the **In-Time** field in the Properties panel, or drag the cue's left edge on the timeline.

### Playback Speed

The **Playback Speed** property is a multiplier applied to media playback rate.

| Speed value | Effect |
|---|---|
| **1.0** | Normal speed |
| **0.5** | Half speed (slow motion) |
| **2.0** | Double speed (fast forward) |
| **-1.0** | Reverse playback at normal speed |

Speed interacts with duration through the **Auto-Adjust Duration** setting (see below). When auto-adjust is set to **Proportional**, changing speed automatically scales the cue duration so the same portion of the asset plays.

:::warning
Extreme speed values (above 4x or below 0.25x) may cause dropped frames on complex compositions or high-resolution assets. Test performance at your target frame rate before committing to non-standard speeds in a live show.
:::

### Auto-Adjust Duration

The **Auto-Adjust Duration** setting controls whether the cue duration updates automatically when related values change.

| Mode | Behavior | When to use |
|---|---|---|
| **None** | Duration stays fixed regardless of asset or speed changes | Manual timing control; duration is entirely your responsibility |
| **Asset** | Duration matches the asset's intrinsic duration | Keep a video cue exactly as long as its source file |
| **Proportional** | Duration scales proportionally when playback speed changes | Maintain full asset coverage when adjusting speed (e.g., halving speed doubles duration) |

The default mode is **None**. Set the mode per cue in the Properties panel.

### How Playback Position Is Calculated

Understanding how WATCHOUT determines the current playback frame helps when debugging timing mismatches or building complex loop structures.

For a standard cue, the **media playback position** at any point during playback is determined by:

1. Taking the current timeline position.
2. Subtracting the cue's start time to get how far into the cue you are.
3. Adding the **In Time** to skip into the asset.

For example, if the timeline is at 15 seconds, the cue starts at 10 seconds, and **In Time** is 3 seconds, then WATCHOUT plays from the 8-second mark in the source media (15 - 10 + 3 = 8).

For **looping cues**, the playback position wraps around: once it reaches the loop end point, it resets to the loop start point and repeats. WATCHOUT performs this wrap with high precision to avoid drift over long loops.

For **free-running cues**, the playback position is based on wall-clock time rather than the timeline position. This means the media continues advancing even when the timeline is paused. See [Understanding the Timeline](01-understanding-the-timeline.md) for more on free-running mode.

### Snapping

**Snapping aligns cue edges and positions to meaningful reference points, preventing small timing gaps that are invisible in the editor but audible or visible during playback.**

#### How Snapping Works

The timeline uses a **6-pixel threshold**-when a dragged point comes within 6 pixels of a snap target (at the current zoom level), the cue locks to that target.

#### Disabling Snapping

- Hold **Shift** while dragging to temporarily bypass snapping.
- Disable snapping globally via the **Edit Snapping** setting in preferences.

### Looping

Cues can loop a portion of their source media using **loop points**.

When the playback position reaches the Loop End point, it wraps back to Loop Start. WATCHOUT uses high-precision arithmetic for this wrap, ensuring seamless looping without cumulative drift, even for loops running across extended show durations.

:::tip
Set the cue duration longer than the loop region to let the loop repeat multiple times. The loop cycle length is the difference between Loop End and Loop Start; the cue will loop as many full cycles as fit within its duration.
:::

### Free-Running Mode

In free-running mode, a cue's playback offset is derived from the system clock rather than the timeline position. This means the media keeps advancing even when the timeline is stopped or scrubbed.

Free-running is useful for always-on background content such as live clocks, ambient video loops, or generative feeds that should not reset when an operator pauses the show.

The playback position is derived from the system clock:

```
playback position = current clock time - free-running start time
```

For more detail, see [Understanding the Timeline](01-understanding-the-timeline.md).

### Fades and Cross-Fades

Fades control how a cue's opacity, volume, or generic value ramps at its start and end.

#### Fade Structure

Each cue has optional **fade in** and **fade out** properties. A fade consists of:

When auto-fade is enabled, newly placed cues automatically receive fade-in and fade-out with the show default durations and curve. Adjust these defaults in **Show Settings** to match your project's style.