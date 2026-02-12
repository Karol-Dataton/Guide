---
title: "Blind Edit Mode"
---


## Blind Edit Mode

Blind Edit mode lets you make changes to a timeline's cues and properties **in isolation**, without those changes immediately affecting live playback. All modifications are staged in a temporary working copy and only applied to the live show when you explicitly commit ("Take") them. This allows you to prepare, adjust, and verify changes while the current scene continues to play undisturbed.

### How Blind Edit Works

When you enter Blind Edit on a timeline, WATCHOUT creates a temporary **composition** that is an exact copy of the timeline's current cue sequence (all cues, layers, and duration). A new Timeline window opens for this composition, and the Stage switches to composition mode to display its contents.

You edit the temporary copy freely — adding, removing, or modifying cues, changing tween data, adjusting timing. None of these changes affect the original timeline or the live output until you explicitly apply them.

Only **one blind edit session** can be active at a time across the entire show. If you attempt to start a second blind edit while one is already open, WATCHOUT will prompt you to apply or discard the existing one first.

### Entering Blind Edit Mode

There are two ways to enter Blind Edit:

- **From the Timeline window**: Click the blind edit button (eye-off icon) in the toolbar at the top-right of the timeline. If a blind edit already exists for this timeline, clicking the button navigates to the existing blind edit window instead of creating a new one.
- **From the Cue List window**: Right-click a cue and select **Blind Edit Timeline** to enter blind edit on that cue's timeline.

The Timeline window title appends **(Blind Edit)** to indicate you are working on a blind edit copy. The window's title bar changes to a distinct color (a warm highlight) to provide a clear visual cue that you are in blind edit mode.

### The Blind Edit Toolbar

When a blind edit is active, the Timeline window displays additional controls in the toolbar area:

#### Enter/Exit Button
The eye-off icon button on regular timelines starts a blind edit. On a blind edit composition, discarding the blind edit (closing the window) returns you to normal editing.

#### Follow
The **link icon** button synchronizes the blind edit's time position with the parent timeline's live playhead. When you click Follow:

- If the parent timeline is **running**, the blind edit jumps to the parent's current time and starts running in sync
- If the parent timeline is **paused**, the blind edit pauses and jumps to the parent's current time
- If the parent timeline is **stopped**, the blind edit stops

This is useful for previewing how your blind edits look at the same point in the show that is currently playing live.

#### Take
The **checkmark icon** button applies all staged changes to the original timeline, replacing its cues, layers, and duration with the contents of the blind edit composition. The blind edit is then closed.

:::warning
If the parent timeline is currently **playing or paused**, WATCHOUT shows a warning dialog: "Are you sure you want to edit a [playing/paused] Timeline? Applying changes to a [playing/paused] timeline can yield unexpected results." You must confirm before the changes are applied.
:::

The Take button is **disabled** when the parent timeline is locked, preventing accidental modification of locked content.

### Editing While in Blind Edit

All standard editing operations work within a blind edit session:

- Adding, removing, duplicating, and moving cues
- Modifying cue properties (position, duration, media source, etc.)
- Adding and editing tween effects and keyframes
- Adding and removing layers
- Changing the timeline duration

These changes are captured in the temporary composition and do not affect the live show output until you Take.

### Discarding a Blind Edit

To discard all changes and exit blind edit mode without applying anything, simply close the blind edit Timeline window. WATCHOUT removes the temporary composition and the original timeline remains unchanged.

You can also navigate away from the blind edit by activating a different timeline window. The blind edit remains open but inactive — you can return to it later by clicking the blind edit button on the original timeline.

### Visual Indicators

Several visual cues help you identify when blind edit is active:

- **Window title** includes "(Blind Edit)" suffix
- **Title bar color** changes to the blind edit highlight color (distinct from the normal active/locked/inert colors)
- **Stage window** shows the composition mode indicator (gantt chart icon) in the top bar
- **Stage border** uses the composition mode styling to distinguish blind edit content from live content

### Use Cases

**Live performance adjustments:** During a live show, you need to fix a cue's position or timing for the next scene. Enter blind edit, make the correction, verify it looks right, and Take when the current scene finishes.

**Preparing the next look:** While the current scene plays, open a blind edit on the upcoming timeline to set up or refine its content. Take the changes before the timeline is needed.

**Error correction without stopping the show:** If you notice a problem with a cue during playback, blind edit lets you fix it without interrupting the live output. The audience sees the current content uninterrupted while you work on corrections.

**Safe experimentation:** Use blind edit to try out changes without risk. If the experiment doesn't work, discard the blind edit and the original timeline is untouched.
