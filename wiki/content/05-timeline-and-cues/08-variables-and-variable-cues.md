---
title: "Variables and Variable Cues"
---


## Variables and Variable Cues

**Variables are the bridge between external inputs and show behavior in WATCHOUT.** They store numeric values that can be driven by external control protocols (HTTP, OSC, ArtNet, MIDI, LTC) or automated by variable cues on the timeline. Expressions, conditional cues, and timeline triggers all reference variables to make shows reactive, interactive, and data-driven. Without variables, a show can only follow a fixed timeline; with them, it can respond to sensors, operator input, lighting consoles, and automation systems in real time.

### What Variables Are

A variable is a named numeric container inside the show. Each variable holds a single floating-point value that can change at runtime. The value is accessible by name from any [expression](14-timeline-triggers-and-expressions.md), any [conditional cue](17-conditional-cues.md), and any variable cue tween.

Variables are defined in the producer and synchronized to the director during playback. External control systems address variables by their **key** — a protocol-specific identifier that maps incoming messages to the correct variable. When no external input is active, a variable holds its **default value**.

Variables serve two complementary roles in a show:

- **Reactive input** — an external system (lighting console, sensor network, custom app) pushes values into the variable via its key, and expressions or conditional cues respond immediately.
- **Timeline automation** — a variable cue on the timeline drives the variable through a tween curve over a defined duration, producing smooth automated changes without any external system.

Both mechanisms can coexist. A variable might be driven by an ArtNet channel during rehearsal and by a variable cue during the live show, or vice versa.

### Variable Properties

Every variable is described by the following properties. The **Default** column reflects the values assigned when creating a new variable through the UI.

| Setting | Purpose | Default |
|---|---|---|
| **Name** | Display name shown in the Variables window, expressions, and cue properties. Must be unique (case-insensitive). | Auto-generated: "Variable", "Variable 1", "Variable 2", etc. |
| **Key** | External protocol address used by HTTP, OSC, ArtNet, MIDI, or LTC to target this variable. | Empty |
| **Min Value** | Lower bound of the variable's value range. | 0.0 |
| **Max Value** | Upper bound of the variable's value range. | 1.0 |
| **Clamp Min** | When enabled, incoming values below Min Value are clamped to Min Value. | Enabled |
| **Clamp Max** | When enabled, incoming values above Max Value are clamped to Max Value. | Enabled |
| **Default Value** | The value the variable resets to when no external input or automation is active. | 0.5 |
| **Protected** | Prevents the variable from being removed or cut. | Disabled |
| **Interpolation Type** | Controls how incoming external values are smoothed over time. See Interpolation Types below. | Linear |

:::note
Disabling both Clamp Min and Clamp Max allows the variable to accept any floating-point value from external sources, regardless of the configured min/max range. The min/max values are still used by the UI slider, but the actual stored value is unbounded. Only disable clamping when your external system is trusted to send valid values.
:::

### Interpolation Types

The interpolation type determines how the variable transitions between its current value and a newly received external input value. The default interpolation time is **50 ms**.

| Type | Behavior | Typical Use |
|---|---|---|
| **None** | Value jumps instantly to the new input. No smoothing is applied. | Binary triggers, button presses, mode selectors |
| **Linear** | Value moves linearly from the current value to the new input over the interpolation period. This is the default and suits most control scenarios. | Faders, sliders, gradual parameter changes |
| **Circular** | Value interpolates along the shorter arc of a circular range. 359 to 1 travels through 0 rather than sweeping 358 degrees. | Rotational encoders, pan/compass angles, hue values |

Interpolation applies only to values received from external input protocols. Variable cues use their own tween curves and are not affected by the interpolation type setting.

### Creating and Managing Variables

Open **Window > Variables** to access the Variables window.

1. **Add a variable** — click the **Add** button. A new variable is created with auto-generated name and UI defaults (range 0.0--1.0, default 0.5, linear interpolation, clamping enabled).
2. **Edit properties** — select a variable and modify its name, key, range, default value, interpolation, and protection settings in the Properties panel.
3. **Adjust the live value** — use the slider in the Variables window to change the variable's current value during rehearsal or testing.
4. **Save as default** — use **Save As Default Value** to store the current live value as the variable's new default. This is the value used when no external input or automation is driving the variable.
5. **Copy/Paste** — variables can be copied and pasted within the Variables window.
6. **Remove** — select a variable and press Delete or use the Remove action. Protected variables and variables currently in use cannot be removed.

The available edit operations in the Variables window include adding, editing, renaming, setting keys and interpolation, adjusting numeric fields, removing, saving as default, and cut/copy/paste.

### Naming Rules

Variable names must follow these rules:

- **Unique** — no two variables may share the same name. Comparison is **case-insensitive**, so "MyVar" and "myvar" are considered identical.
- **Reserved names** — the following names are reserved for internal use and cannot be assigned to variables: `tweenValue`, `cueVolume`, `masterVolume`. The check is case-insensitive.
- **In-use restriction** — a variable that is referenced by an expression or targeted by a variable cue tween cannot be renamed or removed. Remove the references first.

:::warning
If you rename a variable that is referenced in expressions or conditional cues elsewhere in the show, those references will break and evaluate as 0. Always search for usages before renaming.
:::

### Protection

The **Protected** flag prevents a variable from being accidentally removed or cut. Protected variables can still be edited (name, key, range, etc.) and their values can still change at runtime. Protection only guards against deletion operations.

Use protection for mission-critical variables — for example, an "Emergency" variable that drives safety messaging across the show, or a "ShowMode" variable that controls rehearsal-versus-performance content switching.

### Default Values at Runtime

The default value serves as the variable's baseline state. When the show starts, every variable is initialized to its default value. If an external input connection is lost or a variable cue finishes, the variable retains its last-set value rather than automatically reverting to the default — the default is only applied at show load time.

To establish a predictable starting state:

1. Set each variable to the value you want at show start.
2. Use **Save As Default Value** for each variable.
3. Reload the show to verify all variables initialize correctly.

### External Key and Learn Mode

The **Key** field determines how external control protocols address the variable. Each protocol uses a specific key format. A variable without a key cannot receive external input — it can only be changed manually via the Variables window slider or automated by a variable cue.

#### Supported Protocols and Key Formats

| Protocol | Key Format Example | Notes |
|---|---|---|
| **HTTP** | Any string key | `POST /v0/inputs` (bulk) or `POST /v0/input/{key}` (single). Bulk endpoint accepts a JSON object mapping keys to values. |
| **OSC** | `osc.addr(/path/index)` | Maps an OSC address pattern and argument index to the variable. The index specifies which argument in the OSC message to read. |
| **ArtNet** | `artnet.net(0).subnet(0).uv(1).ch(5)` | Can append `.normalize()` to map the 0--255 DMX range to the variable's min/max range. Without `.normalize()`, the raw DMX value (0--255) is used directly. |
| **MIDI** | Protocol-specific key | Maps MIDI CC, note, or other message types to the variable. |
| **LTC** | Protocol-specific key | Maps Linear Timecode values to the variable. |

#### Learn Mode Workflow

Instead of manually typing a key, use **Learn** mode to capture the key from an incoming external signal:

1. Select the variable in the Variables window.
2. Enable **Learn** mode in the variable properties.
3. Send the external control signal (move a fader, send an OSC message, transmit an ArtNet channel, etc.). The system captures the first received key and stores it.
4. The captured key is assigned to the variable automatically. Confirm the assignment and disable Learn mode.

:::tip
Learn mode is the fastest way to map physical controllers to variables. It eliminates manual key formatting and reduces configuration errors, especially for ArtNet and OSC addresses where the key syntax must match exactly.
:::

#### HTTP Bulk Input Example

The HTTP bulk endpoint allows setting multiple variables in a single request:

```
POST /v0/inputs
Content-Type: application/json

{
  "brightness": 0.8,
  "color_temp": 6500,
  "emergency": 0
}
```

Each key in the JSON object is matched against variable keys. Variables without matching keys are unaffected.

### Input Interpolation

When a variable receives a new value from an external source, it does not jump instantly unless the interpolation type is **None**. Instead, the value transitions smoothly over a default period of **50 ms** using the configured interpolation type (Linear or Circular).

This smoothing prevents visible jumps when control surfaces send rapid discrete steps. If your use case requires instant response (e.g., a binary trigger or a button press), set the interpolation type to **None**.

The default smoothing window is short enough to feel responsive for interactive control but long enough to smooth out the step artifacts common in 7-bit MIDI or 8-bit ArtNet inputs.

### Variable Cues

**Variable cues automate a variable's value over time on the timeline.** They are a type of [control cue](05-control-cues.md) that uses tween data to drive a specific variable through a defined animation curve over a set duration.

#### Variable Cue Fields

A variable cue contains the following data:

| Field | Purpose |
|---|---|
| **Duration** | The time span over which the tween animation runs. |
| **Name** | Optional display name for the cue on the timeline. |
| **Tween Data** | The animation curve that defines how the variable's value changes over the cue's duration. Uses the same tween system as [media cue](02-adding-media-cues.md) property animations. |
| **Target Variable** | The specific variable that this cue drives. Selected from the list of defined show variables. |

#### Creating Variable Cues

To create a variable cue, drag a variable from the Variables window onto a timeline layer area. You can also drop a variable onto an existing cue to add variable-related tween data. The tween curve editor allows you to shape the automation — linear ramps, ease-in/out, step functions, or complex multi-point curves.

### Variable Cue Behavior

During playback, a variable cue evaluates its tween curve and emits updated values at approximately **35 updates per second**. The variable's value is set to the tween output at the current playhead position within the cue's duration.

Variable cues are duration-based: they start when the playhead enters the cue and stop when it exits. Unlike media cues, variable cues do not render visual content — they only update the numeric value of their target variable.

The approximately 35 updates per second rate is sufficient for smooth visual transitions driven by expressions, but keep it in mind when designing precision timing — variable-driven animations have an inherent granularity of roughly one frame at 30 fps.

:::tip
For the smoothest results, design variable cue tweens with gradual curves rather than abrupt steps. The update rate can make sharp tween transitions appear stepped when driving visual properties through expressions.
:::

### Conflict Resolution

When multiple variable cues target the same variable simultaneously, WATCHOUT applies deterministic resolution rules:

| Scenario | Resolution Rule |
|---|---|
| **Multiple variable cues on the same timeline** targeting the same variable | The cue that starts later in time wins. If the playhead is within the overlapping region, the later-starting cue's tween value takes precedence. |
| **Variable cues on different timelines** targeting the same variable | The cue on the **topmost timeline** (by draw order) wins. |

:::note
When designing shows with overlapping variable automation, keep the conflict resolution rules in mind. Placing competing variable cues on the same timeline with overlapping time ranges can produce unexpected results when the playhead is in the overlap zone. Use separate timelines with clear priority ordering when you need deterministic layered control.
:::

### Limitations

Variable cues have the following restrictions:

- **Cannot be placed inside compositions.** Variable cues are only supported on regular timelines. If you need variable automation within a composition-like workflow, place the variable cues on the parent timeline that contains the composition cue.
- **Target variable must exist.** If the target variable is deleted while a variable cue references it, the cue becomes orphaned and has no effect. WATCHOUT prevents deletion of variables that are in use, but this can occur if the show file is edited externally or if the variable is removed before the cue.
- **No nested tween references.** A variable cue's tween drives exactly one variable. To automate multiple variables simultaneously, create separate variable cues on the same or different layers.

### Expressions and Variables

Variables are the primary data source for the WATCHOUT expression system. Expressions in [timeline triggers](14-timeline-triggers-and-expressions.md) and [conditional cues](17-conditional-cues.md) can reference any variable by name.

Key rules:

- Variable names in expressions are **case-insensitive** — `MyVar`, `myvar`, and `MYVAR` all resolve to the same variable.
- A reference to an **undefined variable** evaluates to **0.0** — no error is raised. This is a common source of silent bugs when variable names are misspelled.
- Expression results are floating-point. For boolean logic (conditions), any value greater than zero is treated as true.

Examples of variable usage in expressions:

| Expression | Meaning |
|---|---|
| `Brightness` | Evaluates to the current value of the "Brightness" variable |
| `Brightness > 0.5` | True (1.0) when Brightness exceeds 0.5, false (0.0) otherwise |
| `Mode == 2` | True when Mode equals 2 |
| `SensorA * SensorB` | True only when both SensorA and SensorB are greater than 0 |
| `Volume * masterVolume` | Not valid as a variable name for "masterVolume" (reserved), but valid as an expression if "Volume" is a defined variable and "masterVolume" resolves to the internal master volume value |

For complete expression syntax and operator reference, see [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md).

### Variables and Conditional Cues

Variables are the primary mechanism for enabling [conditional cues](17-conditional-cues.md). A conditional cue evaluates an expression against current variable values to decide whether to render (media cues) or trigger (control/output cues). This creates a feedback loop:

1. An external system or variable cue sets a variable value.
2. A conditional cue evaluates an expression referencing that variable.
3. The cue renders or fires only when the expression is true (result > 0).

This pattern enables interactive installations, show branching, emergency overrides, and any scenario where content must appear or disappear based on runtime state. See [Conditional Cues](17-conditional-cues.md) for detailed syntax and use cases.

### Best Practices

- **Use descriptive, stable names.** Variable names appear in expressions, conditional cues, and the Variables window. Choose clear names early and avoid renaming once expressions reference them.

- **Set realistic min/max bounds before building automation.** Changing the range after creating variable cues or expression thresholds requires updating all dependent references. A range of 0.0--1.0 works well for normalized parameters; use domain-specific ranges (e.g., 0--360 for angles, 0--100 for percentages) when the variable represents a physical quantity.

- **Enable clamping for external inputs.** Clamp Min and Clamp Max prevent out-of-range values from external sources causing unexpected behavior. Leave both enabled unless you have a specific reason to allow unbounded values.

- **Save defaults before rehearsals and shows.** Use Save As Default Value to capture a known-good state. If external inputs fail or disconnect, the variable reverts to its default. This provides a safe fallback during live performance.

- **Protect mission-critical variables.** Enable the Protected flag on variables that must never be accidentally deleted — emergency overrides, system mode selectors, and similar.

- **Use Learn mode for physical controllers.** Typing ArtNet or OSC key strings manually is error-prone. Learn mode captures the exact key format from the incoming signal.

- **Use the ArtNet `.normalize()` suffix.** When mapping DMX channels to variables, append `.normalize()` to the ArtNet key so the 0--255 DMX range maps to the variable's min/max range automatically, rather than requiring manual scaling in expressions.

- **Document variable usage with marker cues.** Place [marker cues](06-marker-cues.md) near variable cues on the timeline so operators can identify what each automation segment controls.

- **Keep variable counts manageable.** Every variable is evaluated at runtime. While the system handles large variable sets efficiently, a disciplined variable inventory makes debugging and operator handoff much easier.

- **Test with the Variables window slider.** Before connecting external controllers, verify that changing a variable's value in the Variables window produces the expected results in expressions, conditional cues, and variable cue behavior. This isolates show logic issues from protocol configuration issues.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Variable does not respond to external input | Key field is empty or incorrect | Use Learn mode to capture the correct key from the external source |
| Variable value jumps instead of transitioning smoothly | Interpolation type set to None | Change interpolation type to Linear or Circular |
| Variable value seems stuck at min or max | Clamping is enabled and incoming values are outside the configured range | Widen the min/max range, or adjust the external source to send values within range |
| Cannot delete a variable | Variable is protected or in use by an expression/variable cue | Remove the Protected flag, or delete referencing expressions and variable cues first |
| Cannot rename a variable | Variable is referenced by an expression or variable cue tween | Remove references before renaming |
| Expression evaluates to 0 unexpectedly | Variable name in expression does not match any defined variable (case-insensitive) | Check spelling; undefined variables silently evaluate to 0.0 |
| Variable cue has no visible effect | Target variable is overridden by another cue (conflict resolution) or the variable is not referenced in any expression or condition | Check for overlapping variable cues; verify the variable is used in expressions or conditions |
| Variable cue cannot be added inside a composition | Variable cues are not supported in compositions | Move the variable cue to a regular timeline |
| Reserved name error when creating a variable | Name conflicts with `tweenValue`, `cueVolume`, or `masterVolume` | Choose a different name; these are reserved for internal use |
| ArtNet variable receives raw 0--255 values instead of normalized range | Key is missing the `.normalize()` suffix | Append `.normalize()` to the ArtNet key to map DMX values to the variable's min/max range |
