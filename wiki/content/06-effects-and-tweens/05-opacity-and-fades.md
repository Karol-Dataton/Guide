---
title: "Opacity and Fades"
---


## Opacity and Fades

Opacity controls how transparent or visible a cue is on Stage. WATCHOUT provides two distinct mechanisms for controlling visibility over time: the **Opacity tween**, which gives you full keyframe control over transparency, and the **fade system** (Fade-in, Fade-out, and Cross-fade), which provides quick, standardized visibility transitions as cue properties. Understanding when to use each — and how they interact — is key to smooth, professional show transitions.

### Opacity Tween

The Opacity tween animates transparency as a percentage from **0%** (fully transparent) to **100%** (fully visible). The default value is 100%. Unlike fades, the Opacity tween gives you complete control over the transparency curve — you can create any shape of fade, hold at partial transparency, create pulsing effects, or build complex multi-stage visibility changes.

To add an Opacity tween:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click **Opacity**, or press **Alt+O**.
3. The Opacity tween appears in the tween area beneath the cue, within the **General** group.

Add tween points at different times with different opacity values to create the desired transparency animation. The **Transition Type** on each point controls the easing curve between values.

**Common Opacity tween patterns:**

- **Custom fade-in** — start at 0% and ramp to 100% over your chosen duration and easing curve.
- **Partial transparency** — hold at 50% or another intermediate value for a semi-transparent overlay effect.
- **Pulsing** — alternate between two opacity values (for example, 30% and 100%) with Sinusoidal easing for a breathing or pulsing look.
- **Multi-stage visibility** — fade in, hold, dim to 50%, hold again, then fade out — all within a single cue using multiple tween points.

### The Fade System

Fades are a separate, simplified system for adding standard visibility transitions to cues. They are not tweens — they are cue-level properties that automatically generate smooth opacity transitions at the beginning and/or end of a cue. Fades are designed for speed and consistency: you can add them in one click, and they use configurable defaults so that all fades in your show have a uniform look.

WATCHOUT provides three fade actions in the **Effect** menu:

| Action | Shortcut | Effect |
|---|---|---|
| **Fade-in** | **Shift+Alt+I** | Adds a smooth opacity ramp from 0% to 100% at the start of the cue |
| **Fade-out** | **Shift+Alt+O** | Adds a smooth opacity ramp from 100% to 0% at the end of the cue |
| **Cross-fade** | **Shift+Alt+X** | Creates an overlap-based transition between two adjacent cues, fading one out as the other fades in |

These actions are toggles — clicking them adds the fade if not present, or removes it if already applied.

### Fade Properties

When a fade is enabled on a cue, its properties appear in the cue Properties panel under **Fade In/Out**:

- **Enable Fade-in** — toggles the fade-in on or off.
- **Duration** — how long the fade lasts (for timed fades). This is the time from the start of the cue to the point where it reaches full visibility.
- **Enable Fade-out** — toggles the fade-out on or off.
- **Duration** — how long the fade-out lasts. This is the time before the end of the cue when the fade begins.

Each fade also has a **transition type** (easing curve) that controls the shape of the fade. The default is **Linear** (constant-speed fade), but you can change it to any of the 31 available easing curves for a more shaped transition.

For Cross-fades, the fade duration is defined by the overlap region between two cues rather than a fixed time value. The Properties panel shows the overlap reference as **(Overlap with cue)** alongside the linked cue.

### Auto-Fade Defaults

WATCHOUT maintains default fade settings that are applied whenever you add a new fade. These defaults are configured in **Show Settings** under the fade preferences:

- **Use Last Fade** — when enabled, new fades use the duration and curve from the most recently configured fade in your session.
- **Fade in** — the default fade-in duration.
- **Fade out** — the default fade-out duration.

These defaults apply only when creating new fades. Existing fades retain their individual settings.

### Opacity Tween vs. Fade System

| | Opacity Tween | Fade System |
|---|---|---|
| **Control** | Full keyframe control with unlimited tween points | Start/end transitions with a single duration and curve |
| **Complexity** | Any transparency shape over time | Simple in/out ramps |
| **Setup speed** | Requires manual keyframe placement | One-click to add |
| **Cross-fades** | Must be coordinated manually between two cues | Built-in cross-fade mode handles overlap automatically |
| **Consistency** | Each tween is independent | Auto-fade defaults ensure uniform transitions |
| **Best for** | Complex transparency animations, partial transparency holds, pulsing effects | Standard scene transitions, quick fade-in/out |

:::tip
Use the fade system for standard transitions where you want speed and consistency. Use the Opacity tween when you need precise control over the transparency curve, need to hold at partial transparency, or need more than a simple in/out ramp.
:::

### Interaction Between Opacity Tween and Fades

A cue can have both an Opacity tween and fades applied simultaneously. When both are present, the effects multiply: the fade opacity value and the tween opacity value are combined. For example, if the fade is at 50% and the tween is at 80%, the resulting opacity is 40% (0.5 x 0.8).

[[WIDGET:opacity-fade-multiplier]]

In most workflows, you use one or the other — not both. If you need custom fade shapes, use the Opacity tween directly and skip the fade system. If you need quick standard transitions, use fades and skip the Opacity tween.

### Applying Fades to Compositions

When applying fades to a [Composition](../05-timeline-and-cues/10-compositions.md), the fade affects both the visual opacity and the audio volume of the composition's contents simultaneously. This provides a convenient way to fade an entire multi-cue scene in or out without adding individual fades to every cue inside the composition.

### Common Use Cases

- **Scene transitions** — add Fade-in to incoming content and Fade-out to outgoing content for clean, professional transitions between scenes.
- **Cross-dissolves** — overlap two cues on the timeline and use Cross-fade for a smooth dissolve from one image to the next.
- **Overlay graphics** — use an Opacity tween to hold a title or lower third at partial transparency over background content.
- **Attention pulses** — animate opacity between 0% and 100% several times in quick succession for a flashing or pulsing alert effect.
- **Layered transparency** — hold multiple cues at different partial opacity values to create layered, semi-transparent compositions.

### Practical Tips

- For most show transitions, the fade system is faster and more consistent than manually building Opacity tweens. Reserve the tween for situations that genuinely need custom curves.
- When using Cross-fade, ensure the two cues overlap on the timeline by the desired transition duration. The cross-fade automatically uses the overlap region as the fade duration.
- If a fade appears to have no effect, check that the cue is not also being controlled by an Opacity tween that overrides the intended behavior. Remove one or the other to avoid unexpected results.
- Test fades on the actual display output. Very short fades (under 0.5 seconds) can appear as pops rather than smooth transitions on some display hardware due to frame timing.
