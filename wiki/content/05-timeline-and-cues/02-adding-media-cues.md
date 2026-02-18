---
badge: Karol
---


## Adding Media Cues

**A media cue is the primary visual or audible element on a WATCHOUT timeline-it is what the audience actually sees and hears.** Every image, video, audio clip, composition, NDI capture, and virtual display playback on stage originates from a media cue. Understanding how media cues are created, what default values they receive, and what properties control their behavior is essential for building any show, because nearly every other timeline feature-tweens, fades, stacking, conditional logic-operates on or modifies a media cue.

### What Is a Media Cue

A media cue combines two sets of information: **timeline-level properties** that position the cue in time and on a layer, and **media-level properties** that describe what content to play and how to play it.

The **timeline-level properties** include:

- **Start time**-where on the timeline the cue begins.
- **Layer**-which layer the cue occupies (see [Working with Layers](03-working-with-layers.md)).
- **Locked state**-whether the cue is protected from accidental edits.
- **Color label**-an optional visual tag for organizational purposes.
- **Condition**-whether the cue is Enabled, Disabled, or governed by an expression (see [Conditional Cues](17-conditional-cues.md)).

The **media-level properties** carry everything about the content itself-source, duration, position, orientation, fades, blend mode, playback speed, looping, and more. Together, these two groups of properties define the complete state of a media cue.

### Media Sources

Every media cue has a **MediaSource** that determines where its content comes from. The source is set automatically when you place an asset on the timeline, but you can change it in the Properties panel.

| Source Type | Description | Typical Use |
|---|---|---|
| **Asset** | Links to an asset in the Asset Manager by ID | Most common-images, videos, audio files, SVG shapes, 3D models |
| **Composition** | Plays a composition (nested timeline with synchronized tracks) | Multi-track video+audio content; see [Compositions](10-compositions.md) |
| **Virtual Display** | Captures the rendered output of a virtual display | Re-compositing display outputs within the show |
| **NDI / Capture** | References a capture source (NDI, webcam, or other live input) | Live camera feeds, external application capture |
| **None** | No media source assigned | Placeholder cues or cues that have had their source removed |

:::note
The "NDI" source type is the internal name, but it actually covers all capture input types-not only NDI streams. Any capture source configured in the show can be referenced through this type.
:::

### Adding a Media Cue to the Timeline

The standard workflow for placing a media cue:

1. **Import or locate the asset** in the Assets window. If the asset has not been added yet, drag the source file into the Assets window or use the import function. Wait for optimization to complete-assets in the `Optimizing` or `Fail` state cannot be reliably placed. See [Asset Types](../04-assets-asset-manager/02-asset-types.md) for supported formats.
2. **Open the target timeline.** Navigate to the main timeline or a composition timeline where the cue should appear.
3. **Drag the asset** from the Assets window toward the timeline area.
4. **Position the cue** by hovering over the desired start time and layer. WATCHOUT shows a preview of where the cue will land. Snapping guides appear when the cue aligns with nearby cue edges or the playhead (see [Snapping During Placement](#snapping-during-placement) below).
5. **Drop the cue** to commit the placement. The cue is created with default values derived from the asset type and show defaults.
6. **Adjust as needed.** Move, trim, or edit properties. Add tweens for motion and effects. See [Adjusting Timing](04-adjusting-timing.md) for timing operations.

:::tip
Hold **Shift** while dragging to disable snapping temporarily. This gives you free placement when snap targets would otherwise pull the cue to an unwanted position.
:::

:::note
The show defaults for auto-fade, image duration, and fade curves apply to all newly created cues. Changing these defaults does not retroactively modify existing cues. Configure them early in your show build via the show settings to avoid repetitive manual edits.
:::

### Auto-Adjust Duration

The Auto-Adjust Duration setting controls whether a cue's duration updates automatically when related properties change.

| Mode | Behavior |
|---|---|
| **None** | Duration is fixed. Changing playback speed or replacing the asset does not alter the cue's duration. This is the default. |
| **Asset** | Duration matches the asset's intrinsic duration. If the source asset is replaced with one of a different length, the cue duration updates to match. |
| **Proportional** | Duration adjusts proportionally when playback speed changes. Doubling the speed halves the duration, keeping the same amount of source media visible. |

:::warning
When Auto-Adjust Duration is set to **Asset** or **Proportional**, editing the playback speed or swapping the asset can shift the end point of the cue, potentially overlapping with subsequent cues. Verify your timeline layout after making speed or asset changes on cues with auto-adjust enabled.
:::

### Fades and Transitions

Fades control how a media cue appears and disappears. Each cue can have an independent **fade in** and **fade out**, configured through the cue's tween settings.

#### How Fades Work

- **Fade In** ramps a property (typically opacity or volume) from zero to full over a specified duration at the start of the cue.
- **Fade Out** ramps the same property from full to zero over a specified duration at the end of the cue.
- Each fade has a **type** (Opacity, Volume, or Generic), a **transition curve** (easing), and a **span** that can be either a fixed duration or an overlap for cross-fades.

#### Show Defaults for Fades

When **auto-fade** is enabled in Show Settings (the default), every new media cue receives:

- Fade in: 1 second, Linear curve
- Fade out: 1 second, Linear curve

These defaults are controlled by the **Fade In Duration**, **Fade In Curve**, **Fade Out Duration**, and **Fade Out Curve** settings in **Show Settings**. Disable auto-fade if you prefer cues to appear with hard cuts by default.

### Free-Running Mode

When **Free Running** is enabled on a media cue, the media playback position is based on the system clock rather than the timeline transport. This means the media continues playing at its natural rate even when the timeline is stopped, paused, or scrubbed to a different position.

Use free-running mode for:

- **Live clocks and timers** that must advance in real time regardless of timeline state.
- **Ambient background loops** that should not jump or restart when an operator pauses the timeline.
- **Synchronized external content** where the media must track wall-clock time rather than show time.

:::warning
Free-running cues ignore timeline stop and pause commands. If you stop the timeline during rehearsal, free-running cues will continue advancing. This is intentional but can be surprising during debugging. Disable free-running on a cue if you need it to respond to transport controls normally.
:::

### Looping

Looping allows a media cue to repeat a region of its source media indefinitely (or for the cue's duration). The loop is defined by a **start** and **end** point within the source media:

- **Loop Start**-the offset into the source media where the loop begins.
- **Loop End**-the offset where the loop resets back to Loop Start.

When looping is active, playback proceeds normally from the cue's In Time until it reaches the Loop End point, then jumps back to Loop Start and repeats. The loop continues for as long as the cue is active on the timeline.

If no loop points are set (the default), the cue plays through its source media once and holds on the last frame (for video/image) or ends (for audio).

### Snapping During Placement

When dragging a cue onto the timeline, WATCHOUT snaps the cue edges to nearby reference points to help with precise alignment.

- **Snap threshold:** 6 pixels-the cue edge must be within 6 pixels of a snap target to engage.
- **Snap targets:** start and end edges of other cues on the same layer or adjacent layers (one layer above or below), and the current playhead position.
- **Disabling snap:** hold **Shift** during the drag to suppress all snapping. Snapping also respects the global **Edit Snapping** preference.

Snapping is especially useful when aligning cues for seamless transitions or when placing cues to start exactly at the playhead position.