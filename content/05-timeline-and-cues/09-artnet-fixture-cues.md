---
title: "ArtNet Fixture Cues"
---


## ArtNet Fixture Cues

WATCHOUT includes an ArtNet fixture workflow spanning Assets and Cue Properties.

### Create Fixture Assets

In the **Assets** window context menu, use **Add ArtNet Fixture...** and choose a preset.

This creates fixture-oriented assets that can be used in timeline cues.

### Add Fixture Cues to a Timeline

Add the fixture asset to a timeline as a media cue, then open **Cue Properties**.

When a cue is ArtNet-based, a **Fixture** section is available for addressing and mode selection.

### Fixture Address and Mode

Fixture properties include:

- Universe addressing fields (net/sub-net/universe and absolute universe)
- Start channel
- Fixture mode selection (from available fixture modes)

Use consistent addressing conventions across your control/network team to avoid collisions.

### Recording Source and Channel Mapping

If a fixture cue uses ArtNet recording data, cue properties include mapping tools to route recorded channels to fixture output channels.

Typical operations:

- Choose fixture and recording asset versions
- Map recorded channels to fixture channels
- Clear mappings where needed
- Discard recording linkage when reworking the cue

### Operational Tips

1. Lock addressing decisions early in rehearsal.
2. Version fixture assets deliberately; avoid last-minute mode swaps.
3. Validate channel mapping on the real output network before show operation.
