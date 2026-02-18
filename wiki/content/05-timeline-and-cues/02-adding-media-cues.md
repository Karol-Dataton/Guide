---
title: "Adding Media Cues"
---


## Adding Media Cues

**A media cue is the primary visual or audible element on a WATCHOUT timeline -- it is what the audience actually sees and hears.** Every image, video, audio clip, composition, NDI capture, and virtual display playback on stage originates from a media cue. Understanding how media cues are created, what default values they receive, and what properties control their behavior is essential for building any show, because nearly every other timeline feature -- tweens, fades, stacking, conditional logic -- operates on or modifies a media cue.

### What Is a Media Cue

A media cue is an instance of `CueData::Media` wrapped in a `CueWithLayer` container. The wrapper positions the cue in time and on a layer; the inner data describes what media to play and how to play it.

The **CueWithLayer** wrapper carries timeline-level information:

- **Start time** -- where on the timeline the cue begins.
- **Layer** -- which layer the cue occupies (see [Working with Layers](03-working-with-layers.md)).
- **Locked state** -- whether the cue is protected from accidental edits.
- **Color label** -- an optional visual tag for organizational purposes.
- **Condition** -- whether the cue is Enabled, Disabled, or governed by an expression (see [Conditional Cues](17-conditional-cues.md)).

The **CueData::Media** payload carries everything about the media itself -- source, duration, position, orientation, fades, blend mode, playback speed, looping, and more. Together, these two structures define the complete state of a media cue.

### Media Sources

Every media cue has a **MediaSource** that determines where its content comes from. The source is set automatically when you place an asset on the timeline, but you can change it in the Properties panel.

| Source Type | Description | Typical Use |
|---|---|---|
| **Asset** | Links to an asset in the Asset Manager by ID | Most common -- images, videos, audio files, SVG shapes, 3D models |
| **Composition** | Plays a composition (nested timeline with synchronized tracks) | Multi-track video+audio content; see [Compositions](10-compositions.md) |
| **Virtual Display** | Captures the rendered output of a virtual display | Re-compositing display outputs within the show |
| **NDI / Capture** | References a capture source (NDI, webcam, or other live input) | Live camera feeds, external application capture |
| **None** | No media source assigned | Placeholder cues or cues that have had their source removed |

:::note
The "NDI" source type is the internal name, but it actually covers all capture input types -- not only NDI streams. Any capture source configured in the show can be referenced through this type.
:::

### Adding a Media Cue to the Timeline

The standard workflow for placing a media cue:

1. **Import or locate the asset** in the Assets window. If the asset has not been added yet, drag the source file into the Assets window or use the import function. Wait for optimization to complete -- assets in the `Optimizing` or `Fail` state cannot be reliably placed. See [Asset Types](../04-assets-asset-manager/02-asset-types.md) for supported formats.
2. **Open the target timeline.** Navigate to the main timeline or a composition timeline where the cue should appear.
3. **Drag the asset** from the Assets window toward the timeline area.
4. **Position the cue** by hovering over the desired start time and layer. WATCHOUT shows a preview of where the cue will land. Snapping guides appear when the cue aligns with nearby cue edges or the playhead (see [Snapping During Placement](#snapping-during-placement) below).
5. **Drop the cue** to commit the placement. The cue is created with default values derived from the asset type and show defaults.
6. **Adjust as needed.** Move, trim, or edit properties. Add tweens for motion and effects. See [Adjusting Timing](04-adjusting-timing.md) for timing operations.

:::tip
Hold **Shift** while dragging to disable snapping temporarily. This gives you free placement when snap targets would otherwise pull the cue to an unwanted position.
:::

### Initial Cue Values

When a new media cue is created, WATCHOUT applies defaults from the show configuration and the asset itself:

| Property | Default Value | Source |
|---|---|---|
| **Duration** | Asset duration (video/audio) or `show.defaults.image_duration` (images, default 10s) | Asset metadata or show defaults |
| **Position** | Center of the media resolution | Computed from asset dimensions |
| **Anchor** | Determined by show's AnchorPosition setting (9 positions; Center is default) | Show configuration |
| **Fade In** | 1s with Linear curve (if `auto_fade` is enabled) | `show.defaults.fade_in_duration`, `show.defaults.fade_in_curve` |
| **Fade Out** | 1s with Linear curve (if `auto_fade` is enabled) | `show.defaults.fade_out_duration`, `show.defaults.fade_out_curve` |
| **Playback Speed** | 1.0 | Fixed default |
| **Hardware Acceleration** | Enabled | Fixed default |
| **Orientation** | [0, 0, 0] (roll, pitch, yaw) | Fixed default |
| **Blend Mode** | Normal | Fixed default |
| **Condition** | Enabled | Fixed default |
| **Locked** | false | Fixed default |

:::note
The show defaults for auto-fade, image duration, and fade curves apply to all newly created cues. Changing these defaults does not retroactively modify existing cues. Configure them early in your show build via the show settings to avoid repetitive manual edits.
:::

### Media Cue Properties

The following table documents every field available on a media cue. Properties are split between the CueWithLayer wrapper (timeline-level) and the CueData::Media payload (media-level).

#### Timeline Properties (CueWithLayer)

| Setting | Purpose | Default |
|---|---|---|
| **Start** | Start position on the timeline | Set by drop position |
| **Layer** | Layer assignment; determines vertical position and stacking | Set by drop target; see [Working with Layers](03-working-with-layers.md) |
| **Locked** | Prevents the cue from being moved, trimmed, or deleted | `false` |
| **Color** | Optional color label for visual organization | None |
| **Condition** | Enables, disables, or conditionally enables the cue via an expression | Enabled; see [Conditional Cues](17-conditional-cues.md) |

#### Media Properties (CueData::Media)

| Setting | Purpose | Default |
|---|---|---|
| **Media Source** | The content source (Asset, Composition, Virtual Display, Capture, or None) | Set by the placed asset |
| **Asset Version** | Version reference for dynamic assets | Current version at time of placement |
| **Duration** | How long the cue plays | Asset duration or `image_duration` (10s fallback) |
| **Preroll** | Lead time before playback begins; allows decoders to prepare | 0 |
| **In Time** | Offset into the source media where playback starts | 0 |
| **Playback Speed** | Rate multiplier for media playback (1.0 = normal) | 1.0 |
| **Auto-Adjust Duration** | Whether duration tracks asset length or speed changes | None |
| **Free Running** | Media continues playing from a fixed start point regardless of timeline transport state | `false` |
| **Hardware Acceleration** | Use GPU-accelerated decoding | `true` |
| **Looping** | Optional loop region with start and end points | None (no looping) |
| **Position** | XYZ position in stage coordinates | Center of media resolution |
| **Orientation** | Roll, pitch, yaw in degrees | [0, 0, 0] |
| **Anchor** | Anchor/pivot point for transforms | Show's AnchorPosition setting |
| **Tween Data** | Fade in/out settings and animation data | From show defaults (auto_fade) |
| **Size Info** | Width/height/scale information | From asset dimensions |
| **Model ID** | 3D model reference (for model assets) | None |
| **Mesh Info** | Mesh data for 3D model rendering | None |
| **Routes** | Audio routing configuration | Default audio bus |
| **Media Options** | Blend mode, keying, depth, tiers, chroma key, and more (see below) | See Media Options table |
| **Media Mapping** | Variant mapping for cue sets | None; see [Cue Sets and Variants](11-cue-sets-and-variants.md) |

### Media Options

Media Options control rendering behavior that goes beyond basic geometry and timing. These are flattened into the cue data and accessible in the Properties panel.

| Setting | Purpose | Default |
|---|---|---|
| **Blend Mode** | How the cue composites with layers below it | Normal |
| **Key and Fill** | Key/fill compositing mode for external keyers | None |
| **Key Channels** | Which channels carry key data | 0x01 |
| **Culling** | Face culling for 3D geometry (None, Front, Back) | None |
| **Depth Check** | Z-sorting method: `true` = By Z, `false` = By Layer, `None` = default | None (By Layer); see [Stacking Order](13-stacking-order.md) |
| **Tiers Mask** | Bitmask selecting which of the 31 tiers (0--30) the cue renders to | ALL_TIERS (0x7FFFFFFF -- all 31 tiers enabled) |
| **Frame Blend** | Interpolates between frames for smoother slow-motion | `false` |
| **SDR Whitepoint** | White luminance level in nits for SDR content on HDR displays | 200 nits (range 80--10000) |
| **Chroma Key** | Chroma keying configuration (see [Chroma Key](#chroma-key) below) | None (disabled) |
| **Art-Net** | Art-Net/DMX options for fixture cues | None |
| **SVG** | SVG-specific rendering options | None |
| **Route List** | Audio route list for multi-channel routing | Default |

### Blend Modes

WATCHOUT supports seven blend modes that control how a cue's pixels combine with the content below it in the compositing stack.

| Blend Mode | Effect |
|---|---|
| **Normal** | Standard alpha compositing -- cue replaces or blends over content below based on its opacity |
| **Add** | Pixel values are added together; brightens the image, useful for light effects and glows |
| **Multiply** | Pixel values are multiplied; darkens the image, useful for shadow overlays |
| **Screen** | Inverse of Multiply; lightens the image as if projecting two slides onto the same surface |
| **Lighten** | Takes the brighter of the two pixel values at each channel |
| **Darken** | Takes the darker of the two pixel values at each channel |
| **Linear Burn** | Adds pixel values and subtracts white; produces a strong darkening effect |

:::tip
Use **Add** blend mode for particle effects, light beams, and lens flares where you want bright areas to accumulate. Use **Multiply** for shadow and vignette overlays where you want to darken underlying content without fully obscuring it.
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

Fades control how a media cue appears and disappears. Each cue can have an independent **fade in** and **fade out**, configured through the TweenData structure.

#### How Fades Work

- **Fade In** ramps a property (typically opacity or volume) from zero to full over a specified duration at the start of the cue.
- **Fade Out** ramps the same property from full to zero over a specified duration at the end of the cue.
- Each fade has a **type** (Opacity, Volume, or Generic), a **transition curve** (easing), and a **span** that can be either a fixed Duration or an Overlap for cross-fades.

#### Show Defaults for Fades

When `show.defaults.auto_fade` is `true` (the default), every new media cue receives:

- Fade in: 1 second, Linear curve
- Fade out: 1 second, Linear curve

These defaults are controlled by `fade_in_duration`, `fade_in_curve`, `fade_out_duration`, and `fade_out_curve` in the show defaults. Set `auto_fade` to `false` if you prefer cues to appear with hard cuts by default.

#### Easing Curves

WATCHOUT provides **31 easing curves** (TweenTransition) that control the acceleration profile of any fade or tween:

| Index | Curve | Variants |
|---|---|---|
| 0 | **Linear** | -- (default) |
| 1--3 | **Quadratic** | In, Out, InOut |
| 4--6 | **Cubic** | In, Out, InOut |
| 7--9 | **Quartic** | In, Out, InOut |
| 10--12 | **Quintic** | In, Out, InOut |
| 13--15 | **Sinusoidal** | In, Out, InOut |
| 16--18 | **Exponential** | In, Out, InOut |
| 19--21 | **Circular** | In, Out, InOut |
| 22--24 | **Bounce** | In, Out, InOut |
| 25--27 | **Elastic** | In, Out, InOut |
| 28--30 | **Back** | In, Out, InOut |

**In** variants start slow and accelerate. **Out** variants start fast and decelerate. **InOut** variants do both, creating an S-curve.

### Free-Running Mode

When **Free Running** is enabled on a media cue, the media offset is calculated as `clock_time - free_running_start` instead of being driven by the timeline transport. This means the media continues playing at its natural rate even when the timeline is stopped, paused, or scrubbed to a different position.

Use free-running mode for:

- **Live clocks and timers** that must advance in real time regardless of timeline state.
- **Ambient background loops** that should not jump or restart when an operator pauses the timeline.
- **Synchronized external content** where the media must track wall-clock time rather than show time.

:::warning
Free-running cues ignore timeline stop and pause commands. If you stop the timeline during rehearsal, free-running cues will continue advancing. This is intentional but can be surprising during debugging. Disable free-running on a cue if you need it to respond to transport controls normally.
:::

### Looping

Looping allows a media cue to repeat a region of its source media indefinitely (or for the cue's duration). The loop is defined by **LoopPoints** with a **start** and **end** Duration:

- **Loop Start** -- the offset into the source media where the loop begins.
- **Loop End** -- the offset where the loop resets back to Loop Start.

When looping is active, playback proceeds normally from the cue's In Time until it reaches the Loop End point, then jumps back to Loop Start and repeats. The loop continues for as long as the cue is active on the timeline.

If no loop points are set (the default), the cue plays through its source media once and holds on the last frame (for video/image) or ends (for audio).

### Chroma Key

Chroma keying removes a specific color from the media, making those pixels transparent. This is commonly used to remove green-screen or blue-screen backgrounds from video content.

| Setting | Purpose | Default |
|---|---|---|
| **Enabled** | Activates chroma keying on this cue | `false` |
| **Color** | The target key color to remove | RGB(0, 177, 64) -- a standard green |
| **Min Tolerance** | Minimum color distance threshold; pixels closer than this to the key color are fully transparent | 0.4 |
| **Max Tolerance** | Maximum color distance threshold; pixels beyond this are fully opaque; the range between min and max creates a soft edge | 0.5 |
| **Spill Removal** | Reduces color spill (reflected key color) on foreground edges | 0.5 |
| **Show Alpha Mask** | Displays the transparency mask instead of the final image, useful for tuning tolerance values | `false` |

:::tip
Enable **Show Alpha Mask** while adjusting tolerance values. The mask view makes it much easier to see whether the key is cutting cleanly around the subject or leaving artifacts. Switch back to normal view once the key looks correct.
:::

### Snapping During Placement

When dragging a cue onto the timeline, WATCHOUT snaps the cue edges to nearby reference points to help with precise alignment.

- **Snap threshold:** 6 pixels -- the cue edge must be within 6 pixels of a snap target to engage.
- **Snap targets:** start and end edges of other cues on the same layer or adjacent layers (one layer above or below), and the current playhead position.
- **Disabling snap:** hold **Shift** during the drag to suppress all snapping. Snapping also respects the global `settings.useEditSnapping` preference.

Snapping is especially useful when aligning cues for seamless transitions or when placing cues to start exactly at the playhead position.

### Tweens and Effects

Media cues support **48 tween types** that animate properties over time. Tweens are added as keyframes on a cue and interpolated using any of the 31 easing curves.

The tween categories include:

| Category | Tween Types |
|---|---|
| **Opacity** | Opacity |
| **Crop** | Crop Left, Crop Right, Crop Top, Crop Bottom |
| **Blur** | Blur |
| **Rotation** | Rotation X (Roll), Rotation Y (Pitch), Rotation Z (Yaw) |
| **Scale** | Scale X, Scale Y |
| **Position** | Position |
| **Volume** | Volume |
| **Key** | 7 key-related tweens |
| **Wipe** | 4 wipe transition types |
| **Color Correction** | 6 color adjustment tweens |
| **Gain RGB** | Gain Red, Gain Green, Gain Blue |
| **Offset RGB** | Offset Red, Offset Green, Offset Blue |
| **Gamma** | Gamma |
| **Corner Pin** | 8 corner pin points (4 corners x 2 axes) |
| **Special** | Variable (linked to an input variable), Art-Net (DMX-driven) |

Each tween keyframe specifies a value and a transition curve. WATCHOUT interpolates between keyframes using the selected easing to produce smooth animations.

### Best Practices

- **Set show defaults early.** Configure `image_duration`, `auto_fade`, and fade durations in the show settings before building your timeline. This avoids tedious per-cue adjustments later.

- **Use Auto-Adjust Duration = Asset for content that may be re-delivered.** If your content provider is likely to deliver revised cuts at different lengths, Asset mode keeps your cue durations in sync automatically.

- **Keep preroll values consistent.** If you notice frame drops at the start of high-bitrate video cues, increase the preroll to give the decoder more preparation time. A preroll of 1--2 seconds is sufficient for most codecs.

- **Label cues with colors.** Use the color label on CueWithLayer to visually distinguish content categories (e.g., backgrounds, foreground graphics, audio). This makes large timelines easier to navigate.

- **Lock finished cues.** Once a cue's timing and properties are finalized, lock it to prevent accidental changes during later editing sessions.

- **Use blend modes intentionally.** Blend modes other than Normal alter the compositing math and can produce unexpected results when combined with opacity tweens or stacking. Test blend mode choices with representative content before committing. See [Stacking Order](13-stacking-order.md) for how layer order affects compositing.

- **Verify tier assignments.** If a cue appears on some displays but not others, check its Tiers Mask against the displays' tier visibility settings. Tier mismatches are one of the most common causes of "missing" content.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Cue placed but nothing visible on stage | Media source is None or asset is in Fail state | Check the cue's media source in Properties; verify the asset state in the Assets window |
| Image cue disappears after 10 seconds | Default image duration is 10s | Increase the cue's duration or change `show.defaults.image_duration` |
| Video starts from the wrong point | In Time is set to a non-zero value | Reset In Time to 0 or the desired offset |
| Fade appears too abrupt or too slow | Show defaults for fade duration do not match expectations | Adjust fade_in/fade_out duration on the cue, or change show defaults for future cues |
| Cue snaps to wrong position when dragging | Snapping to an unintended nearby cue edge | Hold **Shift** while dragging to disable snapping |
| Content plays at wrong speed | Playback Speed is not 1.0, or Auto-Adjust Duration is Proportional | Check and reset Playback Speed; verify Auto-Adjust Duration mode |
| Cue does not respond to timeline stop | Free Running is enabled | Disable Free Running on the cue |
| Green-screen background still visible | Chroma Key tolerance values are too tight | Increase Max Tolerance; use Show Alpha Mask to tune |
| Cue visible on some displays but not others | Tiers Mask does not include the tiers assigned to those displays | Edit the cue's Tiers Mask to include the required tiers |
| Content appears with wrong blend/brightness | Blend mode set to Add, Screen, or another non-Normal mode | Change Blend Mode to Normal unless the effect is intentional |
| Cue cannot be moved or edited | Cue is locked | Unlock the cue in the Properties panel or timeline context menu |
| Audio plays but video does not (or vice versa) | Source is a composition with mismatched sub-asset states | Check both sub-assets in the composition folder for Fail states; see [Compositions](10-compositions.md) |
