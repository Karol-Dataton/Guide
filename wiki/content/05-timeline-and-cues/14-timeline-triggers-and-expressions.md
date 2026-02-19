---
title: "Timeline Triggers and Expressions"
---


## Timeline Triggers and Expressions

**Timeline triggers are expression-based rules that automate playback state changes, allowing timelines to start, pause, or stop in response to show variable values without requiring manual operator intervention or control cues.** Instead of relying on a cue at a fixed point in time, a trigger expression is evaluated continuously against the current state of show variables — when the expression becomes true, the corresponding playback action fires. This makes triggers the primary mechanism for building reactive, data-driven show logic at the timeline level.

### What Timeline Triggers Are

Every timeline in WATCHOUT can have up to three trigger expressions attached to it:

- **Play expression** — when this expression evaluates to true, the timeline starts playing (or resumes if paused).
- **Pause expression** — when this expression evaluates to true, the timeline pauses at its current position.
- **Stop expression** — when this expression evaluates to true, the timeline stops and resets.

Triggers are properties of the timeline itself, not cues placed on the timeline. They are always active while the show is running and are evaluated against the current values of [show variables](08-variables-and-variable-cues.md). This makes them fundamentally different from [Control Cues](05-control-cues.md), which fire at specific points in time on a timeline.

An empty trigger expression has no effect — it does not evaluate to true or false and does not change the timeline's playback state. Only expressions that produce a numeric result participate in trigger evaluation.

### How Expressions Work

WATCHOUT uses a built-in expression engine to parse and evaluate all expressions at runtime. The evaluation follows these rules:

1. **Case-insensitive** — all expressions are lowercased before parsing. `MyVariable`, `myvariable`, and `MYVARIABLE` all reference the same variable.
2. **Numeric result** — every expression produces a floating-point number.
3. **Truth rule** — a result greater than 0.0 is **true**. A result of 0.0 or less, or any evaluation error, is **false**.
4. **Unknown variables resolve to 0.0** — referencing a variable name that does not exist in the show returns 0.0, which evaluates to false.

:::note
Because unknown variables silently resolve to 0.0 rather than producing an error at runtime, a misspelled variable name will not cause a visible failure — the trigger will simply never fire. Use expression validation (described below) to catch these issues at edit time.
:::

### Expression Syntax

Expressions follow standard mathematical syntax. The supported operators are:

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - 5` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / 2` |
| `^` | Exponentiation | `a ^ 2` |
| `()` | Grouping | `(a + b) * c` |
| `>` | Greater than | `score > 100` |
| `<` | Less than | `temperature < 0` |
| `==` | Equal to | `mode == 3` |
| `>=` | Greater than or equal | `level >= 50` |
| `<=` | Less than or equal | `count <= 10` |
| `!=` | Not equal | `state != 0` |

Comparison operators return 1.0 for true and 0.0 for false, which integrates naturally with the truth rule.

**Variable references** are bare names — write the variable name directly in the expression without any prefix or delimiter. For example, if you have a show variable named "SceneSelect", the expression `SceneSelect == 2` references that variable.

#### Expression Examples

| Expression | Evaluates to True When |
|------------|----------------------|
| `GoSignal` | The variable "GoSignal" is greater than 0 |
| `SceneMode == 3` | The variable "SceneMode" equals exactly 3 |
| `Temperature > 25` | The variable "Temperature" exceeds 25 |
| `ButtonA * ButtonB` | Both "ButtonA" and "ButtonB" are greater than 0 (logical AND) |
| `SensorA + SensorB` | At least one sensor is positive and their sum is positive |
| `Emergency != 0` | The variable "Emergency" is anything other than 0 |

:::tip
To create a logical AND condition, multiply the variables together: `A * B` is only greater than 0 when both A and B are greater than 0. To create a logical OR, use addition: `A + B` is greater than 0 when either is positive. Be mindful that negative values can produce unexpected results with addition — prefer explicit comparisons like `(A > 0) + (B > 0)` for reliable OR logic.
:::

### Configuring Triggers

Triggers are configured in the timeline properties, not on the timeline itself:

1. Open the **Timelines** window.
2. Select the timeline you want to add triggers to.
3. Open **Properties** for the selected timeline.
4. Navigate to the **Triggers** section.
5. Enter expressions in the appropriate fields:
   - **Play Expression** — triggers timeline playback
   - **Pause Expression** — triggers timeline pause
   - **Stop Expression** — triggers timeline stop
6. The expression is validated in real time as you type. Correct any validation errors before closing the properties panel.

You can set any combination of the three triggers on a single timeline. For example, a timeline might have a play trigger on one variable and a stop trigger on another, with no pause trigger at all.

### Trigger Properties

| Property | Expression Type | Default | Purpose |
|----------|----------------|---------|---------|
| **Play Expression** | Trigger Expression | Empty (no trigger) | When the expression evaluates to true, the timeline begins or resumes playback |
| **Pause Expression** | Trigger Expression | Empty (no trigger) | When the expression evaluates to true, the timeline pauses at its current position |
| **Stop Expression** | Trigger Expression | Empty (no trigger) | When the expression evaluates to true, the timeline stops and resets |

An empty expression means no trigger is active for that action — the timeline's playback state is not affected by that trigger slot.

### Expression Validation

WATCHOUT validates trigger expressions in real time as you edit them. The validation checks include:

- **Syntax validation** — malformed expressions (unmatched parentheses, invalid operators, incomplete terms) are rejected immediately.
- **Variable reference validation** — expressions that reference variable names not defined in the show are flagged as errors. This prevents silent failures caused by typos or deleted variables.
- **Autocomplete hints** — the expression editor provides suggestions based on the current token, helping you reference available variables correctly.

:::warning
Validation rejects references to non-existent variable names at edit time. If you rename or delete a show variable, any trigger expression referencing that variable will fail validation the next time it is edited. Review all trigger expressions after modifying the variable list.
:::

### Expression Types in WATCHOUT

Timeline triggers use one of several expression types that share the same expression engine but serve different purposes across the application:

| Expression Type | Default Variable | Usage Context |
|-----------------|-----------------|---------------|
| **Tween Expression** | `tweenValue` | Tween curves — the expression receives the current tween value as input |
| **Trigger Expression** | None | Timeline play/pause/stop triggers — evaluated against show variables |
| **Audio Cue Route Expression** | `cueVolume` | Audio cue routing — expression receives the cue's volume level |
| **Audio Device Route Expression** | `masterVolume` | Audio device routing — expression receives the master volume level |
| **Cue Expression** | None | Per-cue conditions — determines whether a cue renders or fires (see [Conditional Cues](17-conditional-cues.md)) |

All five types use identical syntax and the same truth rule (result > 0.0 = true). The difference is the context in which they are evaluated and whether a default variable is injected into the expression namespace.

For Cue Expressions specifically, an **empty expression evaluates to true** (the cue is always active), which differs from Trigger Expressions where an empty expression has no effect.

### Reserved Variable Names

The following names are reserved by the expression system and **cannot be used as show variable names**:

| Reserved Name | Used By |
|---------------|---------|
| `tweenValue` | Tween Expression — represents the current tween interpolation value |
| `cueVolume` | Audio Cue Route Expression — represents the cue's audio volume |
| `masterVolume` | Audio Device Route Expression — represents the master audio volume |

The reservation check is **case-insensitive** — you cannot create a show variable named "TweenValue", "tweenvalue", or "TWEENVALUE". Attempting to do so will be rejected by the variable name validator.

### Auto-Run vs. Triggers

Timelines have an **Auto Run** property (disabled by default) that is separate from trigger expressions. Understanding the difference is important:

| Mechanism | When It Activates | Behavior | Continuous? |
|-----------|-------------------|----------|-------------|
| **Auto-run** | On show load | Starts the timeline automatically when the show is loaded or opened | No — fires once at load time |
| **Trigger expressions** | During show runtime | Starts, pauses, or stops the timeline whenever the expression evaluates to true | Yes — evaluated continuously |

Auto-run and triggers are independent and can be used together. A timeline with **Auto Run** enabled will start on show load. If the same timeline also has trigger expressions, those triggers continue to evaluate during playback and can pause or stop the timeline based on variable state.

:::note
Auto-run is a one-time event at show load. If a timeline is stopped by a trigger or control cue after auto-run starts it, auto-run does not re-fire. Only the play trigger expression (or a control cue) can restart it.
:::

### Trigger Priority and Interaction

When multiple trigger expressions on the same timeline evaluate to true simultaneously, the system must resolve the conflict. The priority order follows the same convention as [Control Cues](05-control-cues.md):

**Stop > Pause > Play**

If the stop trigger and play trigger both evaluate to true at the same moment, the timeline stops. If the pause and play triggers are both true, the timeline pauses.

In practice, design your expressions so that conflicting triggers do not evaluate to true simultaneously. Use mutually exclusive variable ranges or distinct variables for each trigger to keep behavior predictable.

### Scope

Trigger expressions are a **timeline-only feature**. They are not available for compositions. When editing a composition's properties, the triggers section is not shown.

This reflects the architectural distinction in WATCHOUT: timelines are top-level playback containers that can be independently started and stopped, while compositions are reusable content blocks that are embedded within timelines and inherit their parent timeline's playback state.

If you need conditional behavior within a composition, use [Conditional Cues](17-conditional-cues.md) on individual cues inside the composition.

### Use Cases

**External start signal:** A lighting console sends an OSC message that sets a "GoTimeline3" variable to 1. The timeline's play trigger expression is `GoTimeline3`, and it begins playing immediately when the variable goes positive.

**Sensor-driven pause:** A proximity sensor feeds a "VisitorPresent" variable. A media timeline uses `VisitorPresent == 0` as its pause trigger — when no visitor is detected, playback pauses. A play trigger of `VisitorPresent > 0` resumes playback when a visitor returns.

**Emergency stop across multiple timelines:** An "EmergencyStop" variable is connected to a physical kill switch via the HTTP API. Every content timeline has `EmergencyStop` as its stop trigger expression. When the variable goes to 1, all triggered timelines stop simultaneously.

**Scene selection:** A "CurrentScene" variable is set by an external show controller. Timeline A has a play trigger of `CurrentScene == 1`, Timeline B has `CurrentScene == 2`, and so on. Each timeline also has a stop trigger of its inverse — Timeline A stops when `CurrentScene != 1`. Changing the variable seamlessly transitions between scenes.

**Time-gated playback:** A "ShowHour" variable is updated by an external clock system. A daytime content timeline uses `ShowHour >= 9 * (ShowHour <= 17)` as its play trigger and `ShowHour > 17` as its stop trigger, creating time-windowed playback.

### Best Practices

- **Keep expressions simple and readable.** Complex nested expressions are hard to debug. If the logic requires more than two or three operators, consider breaking it into multiple variables controlled externally.

- **Use explicit comparison operators.** Write `Mode == 1` instead of relying on `Mode` alone, unless you specifically want "any positive value" behavior. Explicit comparisons make the intent clear.

- **Test triggers in rehearsal with controlled variable changes.** Use the Variables window to manually adjust variable values and verify that each trigger fires as expected before relying on external input sources.

- **Document trigger logic.** Record which variables drive which timeline triggers, especially in shows with many timelines. This is critical for show handoff and troubleshooting during live events.

- **Avoid overlapping true conditions on conflicting triggers.** If a timeline's play and stop triggers can both be true at the same time, the stop trigger always wins — but this creates confusing behavior. Design variable ranges so only one trigger is active at a time.

- **Version and review trigger expressions.** Treat trigger expressions as show logic. After major variable or timeline edits, review all trigger expressions to ensure they still reference valid variables and produce the intended behavior.

- **Prefer triggers over polling control cues for variable-driven logic.** If a timeline should start or stop based on a variable value, a trigger expression is more direct and reliable than a looping timeline with conditional control cues.

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Trigger never fires | Expression references a variable name that does not exist; unknown variables resolve to 0.0 | Check variable name spelling in the expression. Use the validation hints during editing. |
| Trigger fires unexpectedly | Expression evaluates to true due to an unexpected variable value | Use the Variables window to inspect current variable values. Add explicit comparison operators to narrow the condition. |
| Timeline starts but immediately stops | Both play and stop trigger expressions are true; stop takes priority | Ensure the stop trigger expression is false when the play trigger is true. Use mutually exclusive variable ranges. |
| Expression validation rejects a valid-looking expression | Referenced variable was renamed or deleted from the show | Re-add the variable or update the expression to reference the current variable name. |
| Cannot find trigger settings | Looking at a composition instead of a timeline | Triggers are timeline-only. Open the parent timeline's properties instead. See [Compositions](10-compositions.md). |
| Timeline does not auto-start on show load | Auto Run is not enabled; trigger expressions only evaluate during runtime | Enable the **Auto Run** property in timeline properties if the timeline should start at show load. |
| Variable name rejected when creating a variable | Name conflicts with a reserved expression variable | Choose a different name. Reserved names are: tweenValue, cueVolume, masterVolume (case-insensitive). |
| Expression works in one trigger but not another | Expression is correct but the wrong trigger field was populated | Verify the expression is entered in the correct field (play, pause, or stop). |

### See Also

- [Variables and Variable Cues](08-variables-and-variable-cues.md) — show variables that drive trigger expressions
- [Conditional Cues](17-conditional-cues.md) — per-cue condition expressions for conditional rendering and triggering
- [Control Cues](05-control-cues.md) — cue-based alternative for controlling timeline playback state
- [Compositions](10-compositions.md) — reusable content blocks (triggers are not available for compositions)
