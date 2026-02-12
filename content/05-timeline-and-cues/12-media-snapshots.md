---
title: "Media Snapshots"
---


## Media Snapshots

Media Snapshots allow you to save the current property state of selected cues as a named preset, and later recall that state to quickly restore or switch between cue configurations. Think of them as "bookmarks" for how your cues are set up at a particular moment — you can save multiple snapshots and toggle between them to compare different looks or instantly recall a known-good configuration.

### What Media Snapshots Are

A media snapshot captures the current property values of one or more selected cues and stores them under a name. When you apply a snapshot, the stored property values are restored to those cues, overriding their current settings. This is different from cue sets (which swap media sources) — media snapshots save and restore the **property state** of cues, including position, effects, timing parameters, and other configured values.

Snapshots are stored as part of the show and persist across save/load cycles.

### Creating a Snapshot

To create a new media snapshot:

1. Select one or more cues on the timeline
2. Open the **Media Snapshot** menu (accessible from the toolbar or context menu)
3. Select **New...** and enter a name for the snapshot

The snapshot captures the current property values of all selected cues. You must have at least one cue selected to create a snapshot.

### Applying a Snapshot

To apply a saved snapshot, select it from the **Media Snapshot** menu. The cues that were included in the snapshot will have their properties restored to the values captured when the snapshot was created.

If a snapshot references cues that are no longer present in the show, those entries are skipped.

### Updating a Snapshot

To update an existing snapshot with the current state of the selected cues:

1. Select the cues you want to update
2. Open the **Media Snapshot** menu
3. Select **Update...** and choose the snapshot to overwrite

The selected snapshot is replaced with the current property values of the selected cues.

### Deleting Snapshots

From the **Media Snapshot** menu:

- **Delete** — removes a specific snapshot
- **Delete All** — removes all snapshots from the show

### Visual Indicators

When a media snapshot is applied to a cue, the cue displays a chip or badge indicator showing the snapshot name. If multiple snapshots overlap on the same cue, the indicator reflects all applied snapshots.

The top bar of the interface also shows chip indicators for each currently applied snapshot, providing a global overview of which snapshots are active.

:::note
If a cue has multiple media snapshots applied, a tooltip on the indicator lists all applied snapshot names.
:::

### The "All" Toggle

The **All** toggle in the Media Snapshot menu allows you to apply or remove all snapshots at once. This is useful for quickly returning to a clean state or activating a complete set of saved configurations simultaneously.

### Use Cases

**Preset looks for different show segments:** Save a snapshot for the "opening" look and another for the "finale" look. Switch between them during rehearsal to compare configurations.

**Quick reset to a known-good state:** Before experimenting with cue properties, save a snapshot. If the experiment doesn't work out, apply the snapshot to instantly restore the original settings.

**A/B comparison:** Save two snapshots with different visual configurations (e.g. different color corrections, positions, or crop settings) and toggle between them to compare the results side by side.

**Show calling reference:** Save snapshots at key cue points so that operators can quickly verify or restore the intended look at specific moments during the show.
