---
title: "Adjusting Timing"
---


## Adjusting Timing

**Precise timing is central to show quality -- a single frame of misalignment between projectors or a late audio cue can break the audience's immersion.** WATCHOUT stores time at nanosecond precision internally and exposes direct-manipulation tools that let you position, trim, and tempo-shift cues with frame-accurate control. This article explains how the engine represents time, how each timing property works, and how to use snapping, looping, and fades to build tight, repeatable shows.

### How WATCHOUT Represents Time

Understanding the time pipeline helps when you encounter rounding questions or need to script precise offsets.

| Layer | Precision | Format |
|---|---|---|
| **Internal engine** | Nanosecond (`std::time::Duration`) | Used for all offset and loop calculations |
| **Serialized (save file / API)** | Millisecond (`u64`) | Stored as integer milliseconds in the show file |
| **Display (UI)** | `HH:MM:SS.mmm` | Shown in the timeline ruler, Properties panel, and transport bar |

Because calculations happen at nanosecond resolution and are only quantized to milliseconds on save, loop points and speed-scaled offsets remain accurate across long playback runs.

:::note
When scripting via the external API, all time values are sent and received as integer milliseconds. The engine up-converts to nanoseconds on ingest.
:::

### Core Timing Properties

Every cue on the timeline carries the following timing fields. Edit them in the **Properties** panel or by direct manipulation on the timeline.

| Property | Type | Default | Purpose |
|---|---|---|---|
| **start** | Time | Drop position | Position on the timeline where the cue begins playback |
| **duration** | Duration | Asset duration (video/audio) or 10 s (images) | How long the cue occupies the timeline |
| **in_time** | Duration | 0 | Offset into the source media -- the point within the asset where playback begins |
| **playback_speed** | Float | 1.0 | Rate multiplier applied to media playback (0.5 = half speed, 2.0 = double speed) |
| **preroll** | Duration | 0 | Time reserved before cue start for decoder warm-up or network pre-fetch |

:::tip
For image assets, the default duration is **10 seconds** (set by the show-level `image_duration` default). Video and audio assets default to their intrinsic asset duration. You can change the show default in **Show Settings**.
:::

### Moving Cues

Dragging a cue's body repositions it along the timeline, changing its **start** time without affecting duration or in_time.

1. Select one or more cues.
2. Click and drag the cue body left or right.
3. Release at the desired position. Snapping guides appear when the cue aligns with nearby targets (see [Snapping](#snapping)).

To move a cue to an exact time, select it and type the desired start value in the **Properties** panel.

:::tip
Hold **Shift** while dragging to temporarily disable snapping for fine free-placement.
:::

### Trimming Duration

Drag the left or right edge of a cue to change its duration. How the edges behave depends on which side you drag:

- **Right edge (fade-out side):** changes duration directly. The cue's start time and in_time remain fixed.
- **Left edge (fade-in side):** changes start, duration, and in_time together so the visible playback region shifts without moving the cue's right boundary.

#### Trim and Reset Commands

For precise operations, use the timeline context menu or keyboard shortcuts:

| Command | Effect |
|---|---|
| **Trim Start** | Moves the cue start to the current playhead position, adjusting in_time and duration accordingly |
| **Trim End** | Moves the cue end to the current playhead position, adjusting duration |
| **Reset Duration** | Restores the cue to its original asset duration (or show default for images) |
| **Reset In-Time** | Sets in_time back to 0, so playback begins at the start of the asset |

These commands are especially useful after rehearsal changes when multiple cues need to be normalized quickly.

### In-Time (Media Start Offset)

**In-time defines where inside the source asset playback begins.** A cue with an in_time of 5 seconds skips the first five seconds of the media file and starts playing from that point.

Common uses:

- Trimming a countdown leader from the head of a video.
- Creating multiple cues from different sections of the same long-form asset.
- Adjusting after a director requests "start from the third verse."

To change in_time directly, select the cue and edit the **In-Time** field in the Properties panel, or drag the cue's left edge on the timeline.

### Playback Speed

The **playback_speed** property is a floating-point multiplier applied to media playback rate.

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

The **AutoAdjustDuration** setting controls whether the cue duration updates automatically when related values change.

| Mode | Behavior | When to use |
|---|---|---|
| **None** | Duration stays fixed regardless of asset or speed changes | Manual timing control; duration is entirely your responsibility |
| **Asset** | Duration matches the asset's intrinsic duration | Keep a video cue exactly as long as its source file |
| **Proportional** | Duration scales proportionally when playback speed changes | Maintain full asset coverage when adjusting speed (e.g., halving speed doubles duration) |

The default mode is **None**. Set the mode per cue in the Properties panel.

### Offset Calculation

Understanding how the engine computes the current playback frame helps when debugging timing mismatches or building complex loop structures.

For a standard cue, the **media offset** at any point during playback is:

```
offset = timeline_time - cue_start + in_time
```

This offset is the position within the source asset that the engine decodes and renders at the current timeline time. The formula means:

1. Take the current timeline position.
2. Subtract the cue's start to get how far into the cue you are.
3. Add in_time to skip into the asset.

For **looping cues**, the offset wraps:

```
offset = (offset - loop_start) % (loop_end - loop_start) + loop_start
```

The modulo operation uses nanosecond-precision `try_rem` to avoid drift over long loops.

For **free-running cues**, the offset is based on wall-clock time rather than the timeline:

```
offset = clock_time - free_running_start
```

This means the media continues advancing even when the timeline is paused. See [Understanding the Timeline](01-understanding-the-timeline.md) for more on free-running mode.

### Snapping

**Snapping aligns cue edges and positions to meaningful reference points, preventing small timing gaps that are invisible in the editor but audible or visible during playback.**

#### How Snapping Works

The timeline uses a **6-pixel threshold** -- when a dragged point comes within 6 pixels of a snap target (at the current zoom level), the cue locks to that target.

#### Snap Targets

| Target | Description |
|---|---|
| **Start/end of other cues** | Cues on the same layer or one layer above/below (+/- 1 layer) |
| **Playhead position** | The current play cursor (when `clickJumpsToTime` is disabled) |

#### Snappable Points by Operation

| Operation | Points that snap |
|---|---|
| **Move** (drag cue body) | Cue start and cue end |
| **Resize fade-in** (drag left edge) | Cue start only |
| **Resize fade-out** (drag right edge) | Cue end only |

#### Disabling Snapping

- Hold **Shift** while dragging to temporarily bypass snapping.
- Disable snapping globally via the **useEditSnapping** setting in preferences.

### Looping

Cues can loop a portion of their source media using **LoopPoints**.

| Property | Description |
|---|---|
| **loop_start** | The offset within the asset where the loop region begins |
| **loop_end** | The offset within the asset where the loop region ends |

When the playback offset reaches `loop_end`, it wraps back to `loop_start`. The wrap calculation uses nanosecond-precision modulo arithmetic:

```
loop_offset = (offset - loop_start) % (loop_end - loop_start) + loop_start
```

This ensures seamless looping without cumulative drift, even for loops running across extended show durations.

:::tip
Set the cue duration longer than the loop region to let the loop repeat multiple times. The loop cycle length is `loop_end - loop_start`; the cue will loop as many full cycles as fit within its duration.
:::

### Free-Running Mode

In free-running mode, a cue's playback offset is derived from the system clock rather than the timeline position. This means the media keeps advancing even when the timeline is stopped or scrubbed.

Free-running is useful for always-on background content such as live clocks, ambient video loops, or generative feeds that should not reset when an operator pauses the show.

The offset formula is:

```
offset = clock_time - free_running_start
```

For more detail, see [Understanding the Timeline](01-understanding-the-timeline.md).

### Fades and Cross-Fades

Fades control how a cue's opacity, volume, or generic value ramps at its start and end.

#### Fade Structure

Each cue has optional **fade_in** and **fade_out** properties. A fade consists of:

| Field | Description |
|---|---|
| **fade_type** | What the fade controls: `Opacity`, `Volume`, or `Generic` |
| **transition** | The easing curve (tween transition) applied to the fade |
| **span** | How long the fade lasts -- either a fixed duration or an overlap link |

#### Fade Span Types

| Span Type | Behavior |
|---|---|
| **Duration** | A fixed time value (e.g., 1 second). The fade ramps over this fixed period. |
| **Overlap** | Linked to another cue by ID. The fade duration is dynamically calculated from the overlap region between the two cues, creating a cross-fade. |

The **Overlap** span type is what makes cross-fades work: when two cues overlap on the same layer, linking their fade spans synchronizes the outgoing fade-out with the incoming fade-in.

#### Show Defaults for Fades

| Default | Value |
|---|---|
| **auto_fade** | Enabled |
| **fade_in_duration** | 1 second |
| **fade_out_duration** | 1 second |
| **curve** | Linear (0) |

When auto_fade is enabled, newly placed cues automatically receive fade-in and fade-out with the show default durations and curve. Adjust these defaults in **Show Settings** to match your project's style.

### Best Practices

- **Set show defaults early.** Configure `image_duration`, `fade_in_duration`, and `fade_out_duration` in Show Settings before building the timeline. This avoids repetitive per-cue adjustments later.

- **Use Auto-Adjust Duration for video cues.** Setting the mode to **Asset** ensures video cues always match their source length, even after asset replacement.

- **Zoom in for frame-accurate edits.** At low zoom levels, a single pixel can represent many frames. Zoom to your target frame rate's resolution before trimming.

- **Rely on snapping for back-to-back cues.** Snapping eliminates single-frame black flashes between sequential cues on the same layer. Verify alignment visually if you override snapping with Shift.

- **Test loops over their full runtime.** Nanosecond-precision modulo prevents drift in theory, but codec seek behavior can introduce a visible glitch at the loop point. Preview the full expected loop count before committing.

- **Use preroll for network-heavy shows.** If cues trigger media served from remote Runners, set a preroll value to give the decoder time to buffer before the cue's visible start.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Cue starts mid-way through the video | Non-zero **in_time** | Select the cue and use **Reset In-Time** |
| Video plays at wrong speed | **playback_speed** is not 1.0 | Check and reset the speed value in Properties |
| Cue duration does not match asset length | **AutoAdjustDuration** set to None | Change to **Asset** mode, or manually reset duration |
| Tiny gap visible between back-to-back cues | Cue edges are not snapped | Zoom in, enable snapping, and drag the cue end to snap to the next cue's start |
| Loop stutters at wrap point | Loop points do not fall on clean decode boundaries | Adjust loop_start and loop_end to align with keyframe intervals in the source asset |
| Fade appears abrupt or too slow | Default fade duration does not suit content | Edit the fade span in the cue's Properties panel, or change show-level fade defaults |
| Cue ignores timeline stop (keeps playing) | Cue is in **free-running** mode | Disable free-running in the cue's Properties panel |
| Snapping not working | **useEditSnapping** is disabled or Shift is held | Check preferences and release Shift |
| Time values shift after save/reload | Millisecond quantization on save | Avoid relying on sub-millisecond precision for critical loop points |

### Related Articles

- [Adding Media Cues](02-adding-media-cues.md) -- placing assets on the timeline
- [Working with Layers](03-working-with-layers.md) -- layer stacking and snap target scope
- [Insert and Delete Time](16-insert-delete-time.md) -- shifting cue positions in bulk
