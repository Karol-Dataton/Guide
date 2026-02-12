---
title: "Insert and Delete Time"
---


## Insert and Delete Time

The **Insert/Delete Time** operation shifts cues in bulk by inserting or removing a time range at a specific point on a timeline. This is a powerful tool for restructuring timeline content — adding gaps for new sections, removing dead time, or shifting content to accommodate schedule changes — without needing to manually reposition every cue.

### Accessing the Dialog

To open the Insert/Delete Time dialog:

1. Select the target timeline (ensure the Timeline window is active)
2. Go to **Timeline → Insert/Delete Time**

The operation is not available if the timeline is locked.

### Parameters

The dialog presents three controls:

#### Time
The amount of time to insert or delete. Enter a **positive value** to insert time (push cues forward), or a **negative value** to delete time (pull cues backward). The value uses the show's standard time expression format.

The operation is applied at the **current playhead position** on the timeline.

#### Adjust Duration of Cues
When enabled, cues that **span the insertion/deletion point** (i.e. start before it and end after it) will have their durations adjusted to account for the time change. Without this option, only the start times of cues after the insertion point are shifted, and spanning cues keep their original duration.

#### Adjust Position of Tween Points
When enabled and cue durations are adjusted, tween keyframe positions (effect points, position keyframes, etc.) within affected cues are shifted to maintain their relative timing within the modified cue. Tween points that fall after the insertion point are moved proportionally.

### Insertion Behavior (Positive Time)

When you insert time:

- **Cues starting after the insertion point** are shifted forward by the specified amount
- **Cues spanning the insertion point** (start before, end after) have their duration extended by the amount if "Adjust Duration of Cues" is enabled
- **Cues ending before the insertion point** are not affected
- **Tween points** after the insertion point within adjusted cues are shifted forward if "Adjust Position of Tween Points" is enabled

The result is a gap at the insertion point, with all subsequent content pushed later in the timeline.

### Deletion Behavior (Negative Time)

When you delete time:

- **Cues entirely within the deleted range** (both start and end fall within the deletion window) are **removed** from the timeline
- **Cues starting after the deleted range** are shifted backward. If shifting would place a cue before the deletion point, the cue is pinned to the deletion point and its duration is shortened accordingly
- **Cues spanning the deletion point** (start before, end after) have their duration reduced if "Adjust Duration of Cues" is enabled. The duration shrinks but the cue's end time is pulled inward, clamped so it does not go below the deletion point
- **Tween points** within affected cues that fall after the deletion point are shifted backward. Tween points that would be shifted to before the deletion point are removed

:::warning
Deletion can **remove cues** that fall entirely within the deleted range. This operation is undoable, but you should verify the result carefully.
:::

### Effect on Tween Points

When "Adjust Position of Tween Points" is enabled, the operation iterates through all tween types on affected cues — generic tweens (opacity, color corrections, etc.), scale tweens, position tweens, and Art-Net tweens. Each tween point's time is recalculated relative to the new cue start and duration.

Fade placeholder tweens are not affected by the time shift, as they are derived from the cue's fade-in and fade-out settings rather than having independent time positions.

### Use Cases

**Adding a new section mid-show:** Position the playhead where the new section should begin, insert the desired amount of time, and then add new cues into the created gap.

**Removing dead time:** If a section of the timeline has an unnecessary pause, position the playhead at the start of the dead time and delete the exact amount of empty time to pull subsequent content closer.

**Accommodating schedule changes:** If a speaker segment is extended or shortened, insert or delete time at the transition point to shift all downstream content without manually moving each cue.

**Global timeline restructuring:** Use insert/delete time in combination with the duration adjustment option to smoothly reshape the timing of a complex timeline while maintaining the relative structure of effects and animations.

:::tip
After performing an insert or delete operation, preview the affected region of the timeline to verify that cue overlaps, gaps, and tween animations look correct. While the operation handles most cases automatically, complex arrangements with overlapping cues or tightly timed cross-fades may benefit from manual fine-tuning.
:::
