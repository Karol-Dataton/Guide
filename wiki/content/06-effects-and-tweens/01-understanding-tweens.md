---
title: "Understanding Tweens"
---


## Understanding Tweens

Tweens are time-based value changes attached to cues. Every visual and audio property of a cue that can change over time — position, scale, opacity, color, crop, rotation, blur, volume, and more — is driven by a tween. A tween defines a curve of values across the duration of a cue, controlling exactly how a property transitions from one state to another. Whether you are fading content in, sliding it across Stage, applying a color shift, or animating a crop reveal, the underlying mechanism is always a tween.

WATCHOUT provides over 40 tween types organized into logical groups. Some tweens control a single value (such as Opacity or Brightness), while others involve multiple coordinated channels (such as Position, which has X, Y, and Z axes, or Corners, which has eight channels for the four corner points). Every tween type has its own default value, permitted range, and unit, and these are enforced in the editor to keep values within meaningful bounds.

### How Tweens Work

A tween is a sequence of **tween points** (keyframes) spread across the duration of a cue. Each tween point defines a specific value at a specific time. Between tween points, WATCHOUT interpolates smoothly according to the selected **transition type** (easing curve), producing continuous animation from one value to the next.

The simplest tween has two points: a start value and an end value. For example, an Opacity tween might start at 0% at the beginning of a cue and reach 100% halfway through, producing a fade-in over the first half of the cue's duration. More complex animations use additional tween points to create multi-stage transitions — a value that rises, holds, then falls, or that follows a specific rhythm synchronized to other show elements.

Every tween point has three core properties:

- **Time from Start of Cue** — when this point occurs, measured from the beginning of the cue.
- **Value** — the property value at this moment. The label, unit, and permitted range depend on the tween type (for example, "Percentage" for crop tweens, "Position X / Y / Z" for position tweens, or "X Value / Y Value" for scale tweens).
- **Transition Type** — the easing curve used to interpolate from the previous point to this one.

### Tween Groups

Tweens are organized into groups in the tween area beneath each cue. These groups correspond to functional categories and match the submenus in the **Effect** menu:

| Group | Tweens Included |
|---|---|
| **Transform** | Position, Scale, Rotation X, Rotation Y, Rotation Z |
| **General** | Opacity, Gaussian Blur, Volume |
| **Crop** | Crop Top, Crop Bottom, Crop Left, Crop Right |
| **Color** | Brightness, Contrast, Exposure, Temperature, Gamma, Hue, Saturation, Invert, Red Gain, Green Gain, Blue Gain, Red Offset, Green Offset, Blue Offset |
| **Corners** | Corner Top Left X/Y, Corner Top Right X/Y, Corner Bottom Left X/Y, Corner Bottom Right X/Y |
| **Linear Wipe** | Angle, Location, Feather, Completion |
| **ArtNet** | ArtNet fixture channels (when ArtNet tweens are present) |

You can expand or collapse tween groups using the **Show Tweens** / **Hide Tweens** controls in the tween group header.

### Adding Tweens to a Cue

To add a tween to a cue:

1. Select one or more cues in the Timeline.
2. Open the **Effect** menu and click the desired tween type. The menu items act as toggles — clicking a tween type adds it if not already present, or removes it if it is.
3. The tween appears in the tween area beneath the cue, within its corresponding group.

Many tween types have keyboard shortcuts for quick access:

| Shortcut | Tween |
|---|---|
| **Alt+P** | Position |
| **Alt+S** | Scale |
| **Alt+X** | Rotation X |
| **Alt+Y** | Rotation Y |
| **Alt+Z** | Rotation Z |
| **Alt+O** | Opacity |
| **Alt+B** | Gaussian Blur |
| **Alt+V** | Volume |
| **Alt+C** | Crop (all four sides) |
| **Alt+N** | Corners (all eight channels) |

Some tweens are added as a complete group. For example, selecting **Corners** from the Effect menu adds all eight corner channels at once, and selecting **Linear Wipe** adds all four wipe channels together. Individual crop sides can also be added separately through the **Effect > Crop** submenu, or all four at once with **Alt+C**.

### Editing Tween Points

Once a tween is added, you work with it by adding, moving, and adjusting tween points:

- **Adding a point** — place the time needle at the desired moment and add a tween point using the context menu or by double-clicking on the tween curve in the tween area.
- **Selecting a point** — click a tween point to select it. Its properties appear in the Properties panel.
- **Adjusting the value** — edit the value directly in the Properties panel. For position tweens, you also see **Position X**, **Position Y**, and **Position Z** fields. For scale tweens, you see **X Value** and **Y Value** along with their computed **X Pixel Value** and **Y Pixel Value**.
- **Moving in time** — drag a tween point horizontally in the tween area, or edit the **Time from Start of Cue** field in the Properties panel.

### Transition Types (Easing Curves)

The **Transition Type** property on each tween point controls how the value interpolates from the previous point to the current one. WATCHOUT provides 31 easing curves organized into 11 families:

| Family | Variants | Character |
|---|---|---|
| **Linear** | Linear | Constant speed, no acceleration or deceleration |
| **Quadratic** | In, Out, InOut | Gentle acceleration/deceleration |
| **Cubic** | In, Out, InOut | Moderate acceleration/deceleration |
| **Quartic** | In, Out, InOut | Strong acceleration/deceleration |
| **Quintic** | In, Out, InOut | Very strong acceleration/deceleration |
| **Sinusoidal** | In, Out, InOut | Smooth, sine-wave-based easing |
| **Exponential** | In, Out, InOut | Dramatic speed changes |
| **Circular** | In, Out, InOut | Quarter-circle acceleration profile |
| **Bounce** | In, Out, InOut | Simulates a bouncing motion at start/end |
| **Elastic** | In, Out, InOut | Overshoots and springs back, like a rubber band |
| **Back** | In, Out, InOut | Pulls back slightly before moving forward (or overshoots at the end) |

Each family (except Linear) has three variants:

- **In** — the effect is applied at the start of the transition (slow start, fast end).
- **Out** — the effect is applied at the end of the transition (fast start, slow end).
- **InOut** — the effect is applied at both ends (slow start, slow end, fast middle).

The default transition type is **Linear**, which produces constant-speed interpolation. For natural-looking motion, **Quadratic InOut** or **Cubic InOut** are common choices. For attention-grabbing effects, **Bounce Out** or **Elastic Out** add playful character.

:::tip
Choose easing curves that match the emotional tone of the moment. Gentle curves like Sinusoidal InOut suit elegant transitions. Snappy curves like Cubic In suit energetic reveals. Keep easing consistent within a scene for a cohesive feel.
:::

### Tween Value Reference

Every tween type has a defined range, default value, and unit. The following table lists all standard tween types:

| Tween | Range | Default | Unit | Notes |
|---|---|---|---|---|
| **Opacity** | 0–100 | 100 | % | 100% = fully visible |
| **Position** | unlimited | 0 | — | Stage coordinates (X, Y, Z) |
| **Scale (X / Y)** | 0–100+ | 100 | % | 100% = original size, values above 100 are permitted |
| **Rotation Z** | unlimited | 0 | degrees | 2D spin (roll) |
| **Rotation Y** | unlimited | 0 | degrees | Horizontal 3D turn (yaw) |
| **Rotation X** | unlimited | 0 | degrees | Vertical 3D tilt (pitch) |
| **Gaussian Blur** | 0.5–64 | 0.5 | — | 0.5 = no visible blur |
| **Volume** | 0–100 | 100 | % | 100% = full volume |
| **Crop Top / Bottom / Left / Right** | 0–100 | 0 | % | 0% = no crop |
| **Brightness** | -100 to 100 | 0 | % | 0 = unchanged |
| **Contrast** | -100 to 100 | 0 | % | 0 = unchanged |
| **Exposure** | -20 to 20 | 0 | EV | 0 = unchanged |
| **Temperature** | -100 to 100 | 0 | % | 0 = unchanged |
| **Gamma** | 0.01–10.0 | 1.0 | — | 1.0 = unchanged |
| **Hue** | unlimited | 0 | degrees | 0 = unchanged |
| **Saturation** | 0–100 | 100 | % | 100% = full color |
| **Invert** | 0–100 | 0 | % | 0 = normal, 100 = fully inverted |
| **Red / Green / Blue Gain** | 0–100 | 100 | % | 100% = unchanged |
| **Red / Green / Blue Offset** | -100 to 100 | 0 | % | 0 = unchanged |
| **Corner (all 8 channels)** | unlimited | 100 | — | 100 = natural corner position |
| **Wipe Angle** | unlimited | 0 | degrees | Edge direction |
| **Wipe Location** | 0–100 | 100 | % | Edge position |
| **Wipe Feather** | 0–100 | 0 | % | Edge softness |
| **Wipe Completion** | 0–100 | 0 | % | 0 = hidden, 100 = visible |

Some tweens enforce hard limits (you cannot enter values outside the range), while others allow values beyond the listed range for creative flexibility. Position, Rotation, Hue, and Corner tweens all accept values outside their default display range.

### Tween Expressions

Any tween can optionally be driven by a mathematical **expression** instead of (or in addition to) its keyframe points. When an expression is set, the tween value is computed dynamically at playback time based on variables, time functions, ArtNet input, or other parameters.

For single-value tweens, the Properties panel shows an **Expression** field. For multi-axis tweens like Scale, you see **X Expression** and **Y Expression**. For Position, you see **X Expression**, **Y Expression**, and **Z Expression**.

Expressions are a powerful tool for interactive shows, data-driven animation, and external control. For full details, see [Tween Expressions](16-tween-expressions.md).

### Practical Advice

- **Start simple.** A two-point tween (start value and end value) is often all you need. Add intermediate points only when you need the value to change direction or hold at a specific level.
- **Match easing to intent.** Use Linear for mechanical or technical motion. Use InOut curves for natural movement. Use Bounce or Elastic sparingly, for moments that benefit from playful emphasis.
- **Keep tween density low.** Many closely spaced tween points are hard to edit and rarely produce better results than fewer well-placed points with appropriate easing curves.
- **Preview on target output.** The Stage view gives a good approximation, but always verify tween behavior on the actual display hardware, especially for subtle effects like color shifts or blur.
- **Use the Effect menu toggles.** Remember that the Effect menu items are toggles — clicking a tween type on a cue that already has it will remove it. This is the quickest way to clean up unused tweens.

### Related Topics

- [Position and Movement](02-position-and-movement.md) — animating cue placement on Stage
- [Scale and Size](03-scale-and-size.md) — growth, shrink, and zoom effects
- [Rotation Effects](04-rotation-effects.md) — 2D spin and 3D rotation
- [Opacity and Fades](05-opacity-and-fades.md) — transparency animation and the dedicated fade system
- [Color Adjustments](07-color-adjustments.md) — brightness, contrast, hue, and per-channel corrections
- [Tween Expressions](16-tween-expressions.md) — driving tweens with mathematical expressions
