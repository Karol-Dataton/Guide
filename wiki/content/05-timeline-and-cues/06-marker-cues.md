---
title: "Marker Cues"
---


## Marker Cues

**Marker cues (also called comment cues) are point-in-time timeline annotations used for organization, operator guidance, and navigation.** Unlike media or control cues, marker cues produce no visual or audio output and do not affect playback state. They exist purely as human-readable signposts and, when named, as jump target anchors that other cues can reference. In complex multi-timeline shows with dozens of cues, markers are what keep operators oriented and give control cues something to aim at.

### What Marker Cues Are

A marker cue is a zero-duration point on the timeline. It has no start-to-end range — it marks a single moment. When the playhead passes through a marker cue during playback, nothing happens to the output. The marker is visible only in the timeline editor, where it serves two distinct roles:

- **Annotation** — a label, description, or timing reference that helps operators and programmers understand what is happening at that point in the show. Scene changes, technical reminders, and show-calling prompts are typical uses.
- **Jump target** — when a marker cue has a **name**, it is registered as a jump target. Control cues with "jump to cue" behavior can reference this name to navigate the playhead to the marker's position. This makes markers the preferred way to define reusable landing points for branching and recovery workflows.

Because markers carry no rendering or playback logic, they are safe to add, move, or remove at any time without affecting show output. They are a zero-risk organizational tool.

### Creating a Marker Cue

1. Position the playhead at the desired point on the timeline.
2. Open the **Timeline** menu and select **Add Comment/Marker Cue**, or use the keyboard shortcut **Ctrl+Enter**.
3. The new marker cue appears at the playhead position on the selected layer.
4. With the marker selected, use the **Cue Properties** panel to set a name, description, and optional countdown or count-up timer.

:::tip
Place marker cues on a dedicated layer reserved for annotations. This keeps markers visually separated from media and control cues and makes them easy to locate when scanning the timeline.
:::

### Marker Cue Properties

The following properties are available for every marker cue:

| Property | Purpose | Default |
|---|---|---|
| **Name** | A short identifier for the marker. When set, the marker becomes a named jump target that control cues can reference. | None (unnamed) |
| **Description** | A longer text field for operational notes, stage directions, or technical details. Visible in the cue properties panel. | None |
| **Countdown** | Attaches a countdown timer to the marker. The timer counts down from the specified duration, reaching zero at the marker's position. | None (no countdown) |
| **Count-Up** | Attaches a count-up timer to the marker. The timer starts at zero at the marker's position and counts upward for the specified duration. | None (no count-up) |

Both the **Name** and **Description** fields are optional free-text strings. A marker with no name and no description is still valid — it appears as an unnamed marker on the timeline and can be used purely for visual reference.

### Countdown and Count-Up Timers

Marker cues can carry a **countdown timer**, a **count-up timer**, or both. Each timer has a single configurable property: **duration** — the length of time the timer runs.

- **Countdown** — starts at the specified duration and counts down to zero, reaching zero at the marker's timeline position. This gives operators advance warning of an upcoming event. For example, a 10-second countdown on a marker placed at a scene change tells the operator "scene change in 10... 9... 8..."
- **Count-Up** — starts at zero at the marker's position and counts upward for the specified duration. This is useful for tracking elapsed time after an event, such as monitoring how long a hold or intermission has been running.

The duration field is optional. If no duration is set, the timer is not active.

:::note
Countdown and count-up timers are operator-facing timing references. They do not pause playback, trigger actions, or produce any output. They are purely informational overlays for the timeline editor and show-calling workflows.
:::

### Markers as Jump Targets

One of the most important roles of marker cues is serving as **named jump targets**. When a marker cue has a name, WATCHOUT registers it as a jump target alongside named control cues. Any control cue configured with "jump to cue" behavior can specify a target cue name, and the playhead will jump to the position of the matching marker.

This mechanism works as follows:

1. A marker cue is given a name (e.g., "SceneB_Start").
2. A [control cue](05-control-cues.md) is placed elsewhere on the timeline with jump behavior set to "jump to cue" and the target name set to "SceneB_Start".
3. When the playhead reaches the control cue during playback, it jumps to the position of the marker named "SceneB_Start".

Both named control cues and named marker cues can serve as jump targets. However, marker cues are generally preferred as jump targets because they carry no playback side effects — jumping to a marker moves the playhead without also triggering a play, pause, or stop action.

:::warning
Jump target names must be unique within the scope they are resolved in. If two cues share the same name, the jump target resolution may not select the one you intend. Use distinct, descriptive names for every named marker.
:::

### Use Cases

**Scene change notes.** Place a marker at each major scene transition with a name like "Scene 3 — Forest" and a description noting any technical requirements. Operators scanning the timeline can instantly see the show structure.

**Technical reminders.** Mark moments where specific technical actions are required — projector shutter changes, audio level adjustments, or lighting cue coordination. A description like "Check projector 4 focus after this transition" keeps institutional knowledge on the timeline rather than in separate documents.

**Operator prompts and show calling.** In live performance workflows, markers serve as the show caller's reference points. Names like "GO LX 42" or "GO SFX Thunder" align WATCHOUT's timeline with the show caller's cue sheet.

**Countdown references.** Attach a countdown timer to a marker placed at a critical moment — the start of a live segment, a pyrotechnic cue, or a performer entrance. The countdown gives operators a precise, visible warning as the moment approaches.

**Structured branching.** Name markers at the start of each content branch. Control cues elsewhere in the show can jump to these named markers based on operator input or external triggers, creating non-linear show flows without duplicating media cues. See [Control Cues](05-control-cues.md) for jump behavior configuration.

**Conditional workflows.** Marker cues can carry conditions just like any other cue type. A conditional marker combined with a jump target name allows control logic where the jump target itself is conditionally present. See [Conditional Cues](17-conditional-cues.md) for expression syntax.

### Best Practices

- **Use consistent naming conventions.** Establish a naming scheme before programming begins and document it for the whole team. Descriptive names like "Act2_Scene1_Start" are far more useful than "Marker 7" when debugging during tech rehearsals.

- **Apply department prefixes.** When coordinating with lighting, sound, and stage management teams, prefix marker names with department codes: `LX` for lighting, `SFX` for sound effects, `VFX` for video effects, `GO` for show-calling action points. This makes it immediately clear who needs to act at each marker.

- **Place markers ahead of critical moments.** Position markers slightly before the event they annotate — not exactly at it. This gives operators time to read the marker and prepare before the action is needed. A marker 2–5 seconds before a manual GO point is a common practice.

- **Keep marker text short and operational.** The name field should be a quick-read label, not a paragraph. Put detailed instructions in the description field, which operators can expand when they need more context.

- **Reserve a dedicated marker layer.** Keeping all markers on one or two layers prevents them from cluttering media and control layers. Name the layer something obvious like "Markers" or "Show Notes."

- **Name every marker that might be a jump target.** If there is any chance a marker will be referenced by a control cue, give it a name immediately. Retroactively naming markers and then updating all referencing control cues is error-prone.

- **Audit jump targets after edits.** When renaming or removing named markers, verify that no control cues still reference the old name. Orphaned jump target references will silently fail during playback.
