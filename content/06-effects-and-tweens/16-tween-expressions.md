---
title: "Tween Expressions"
---


## Tween Expressions

Tween expressions allow any tween property — position, opacity, scale, color adjustments, and more — to be driven dynamically by a mathematical expression instead of relying solely on static keyframe values. Expressions are evaluated at runtime on every frame, making tween values responsive to show variables, external inputs, and mathematical functions.

This is one of the most powerful features in WATCHOUT for creating interactive, data-driven, and externally controllable presentations.

### How Expressions Work

Every tween in WATCHOUT has an **expression field** alongside its keyframe data. At runtime, the system first interpolates the keyframe curve at the current time to produce a base value called `tweenValue`. This value is then passed into the expression, which can transform, replace, or augment it.

The expression language is a mathematical formula evaluator (powered by the [fasteval](https://crates.io/crates/fasteval) library) that supports standard arithmetic, mathematical functions, and variable references. The expression must resolve to a single numeric value, which becomes the final tween output for that frame.

### Setting an Expression

To add an expression to a tween:

1. Select a cue that has the desired tween applied.
2. In the **Properties** panel, expand the tween's properties.
3. Locate the **Expression** field.

The expression field varies depending on the tween type:

- **Single-value tweens** (Opacity, Blur, Crop, Color adjustments, Volume, etc.) have one **Expression** field.
- **Scale tweens** have separate **X Expression** and **Y Expression** fields.
- **Position tweens** have separate **X Expression**, **Y Expression**, and **Z Expression** fields.

Leave the expression field at its default value (`tweenValue`) to pass the keyframe-interpolated value through unmodified.

### The `tweenValue` Variable

The built-in variable `tweenValue` represents the keyframe-interpolated value at the current point in time. This is the default expression for all tweens — when the expression field contains `tweenValue` (or is empty), the tween behaves as if no expression is set, outputting the pure keyframe value.

You can use `tweenValue` in more complex expressions to modify the keyframed animation:

- `tweenValue * 2` — doubles the keyframed value
- `tweenValue + 10` — offsets the keyframed value by 10
- `tweenValue * myVariable / 100` — scales the keyframed value by an external variable

For position tweens, the same concept applies per axis: the X expression receives the X component of the interpolated position as `tweenValue`, the Y expression receives the Y component, and so on.

### Expression Syntax

Expressions support standard mathematical syntax:

**Arithmetic operators:** `+`, `-`, `*`, `/`, `%` (modulo), `^` (power)

**Comparison and logic:** `<`, `>`, `<=`, `>=`, `==`, `!=`, `and`, `or`, `not`

**Built-in math functions:** `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, `sqrt()`, `abs()`, `log()`, `log10()`, `ceil()`, `floor()`, `round()`, `min()`, `max()`

**Constants:** `pi`, `e`

**Conditional expressions:** `if(condition, then_value, else_value)`

:::note
Expression evaluation is case-insensitive. `TweenValue`, `tweenvalue`, and `TWEENVALUE` all refer to the same variable.
:::

### Variable References

Expressions can reference **show variables** (defined in the Variables panel) by name. This is what makes expressions truly powerful: you can bind any tween property to an external input.

For example, if you have a show variable called `faderLevel` that is controlled by an OSC input, you could write:

- **Opacity expression:** `faderLevel` — directly maps the fader to opacity
- **Position X expression:** `tweenValue + trackerX` — offsets the keyframed position by a tracking variable
- **Scale X expression:** `max(tweenValue, minScale)` — clamps the scale to never go below a variable-defined minimum

When a variable referenced in an expression changes (because an external system sent a new value via OSC, ArtNet, MIDI, etc.), the tween output updates immediately on the next frame. This enables real-time interactive control without modifying the show's timeline.

:::warning
All variables referenced in an expression must exist in the show's Variables panel. If an expression references an unknown variable, it will produce an error. WATCHOUT validates expressions when they are entered and reports any unknown references.
:::

### Interaction with Keyframes

Expressions and keyframes are not mutually exclusive — they work together:

- The keyframe curve is evaluated first to produce `tweenValue`.
- The expression is then evaluated with `tweenValue` available as a variable.
- The expression's result becomes the final output.

This means you can use keyframes to define the base animation and an expression to modulate it. For instance, keyframes might define a smooth opacity fade from 0 to 100, while the expression `tweenValue * masterDim / 100` allows an external dimmer to scale the entire animation.

If you want the expression to completely replace the keyframe value, simply write an expression that doesn't reference `tweenValue` (e.g., just `myVariable`). In this case, the keyframe curve is still computed but its value is ignored.

### Practical Examples

**Externally controlled opacity:**
Set the Opacity tween expression to `oscFader1` where `oscFader1` is a show variable mapped to an OSC input. A lighting console or control surface can now directly control the cue's opacity in real time.

**Position tracking:**
Set the Position X expression to `trackerX` and Y expression to `trackerY`, where these variables come from a tracking system (via OSC or similar protocol). The cue follows the tracked object in real time.

**Scaled animation:**
Keyframe a position animation along a path, then set the expression to `tweenValue * intensity / 100` where `intensity` is a variable. The animation plays its keyframed path but the displacement is scaled by the external value.

### Relationship to Timeline Expressions

Tween expressions and **timeline trigger expressions** are different features that serve different purposes:

- **Tween expressions** (this article) control the **value** of a tween property. They are evaluated continuously on every frame and produce a numeric result that drives a visual property (position, opacity, color, etc.).
- **Timeline trigger expressions** (covered in the Timeline Triggers and Expressions article) control the **playback state** of a timeline. They are evaluated as boolean conditions that trigger play, pause, or stop actions on timelines.

Both systems use the same expression language and can reference the same show variables, but they operate at different levels of the system.
