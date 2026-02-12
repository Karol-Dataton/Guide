---
title: "Media Playback Issues"
---


## Media Playback Issues

Playback errors usually come from media format compatibility, missing data, or timing/resource pressure.

### Media Imports but Will Not Play Correctly

Check:

- Asset exists and path/version are valid
- Codec/format is supported for your workflow
- Asset transfer to nodes completed

### Stutter or Frame Drops

- Reduce simultaneous heavy cues.
- Verify storage bandwidth on playback nodes.
- Test with simpler codec/resolution versions of the same content.

### Color or Alpha Looks Wrong

- Verify color space/transfer expectations.
- Confirm key/fill and alpha-capable codec choices.
- Compare against a trusted reference clip.

### NDI/Capture Irregularities

- Verify source stream stability and format.
- Check network bandwidth headroom.
- Confirm capture source dimensions/range settings match source.
