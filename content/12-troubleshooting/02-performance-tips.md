---
title: "Performance Tips"
---


## Performance Tips

Performance issues are usually a combination of media complexity, output load, and node configuration.

### Media and Rendering

- Prefer playback-friendly codecs and resolutions appropriate for target outputs.
- Limit unnecessary overlapping high-resolution cues.
- Use blur/color-heavy effects carefully in dense sections.

### Node Health

- Keep playback nodes dedicated to WATCHOUT services.
- Watch CPU/GPU/memory indicators in activity views.
- Verify disk throughput for high-bandwidth media.

### Timeline Practices

- Group stable cue clusters to reduce editing overhead.
- Use stage tiers and layer organization to simplify active scenes.
- Avoid last-minute structural changes during live operation.

### Network and Sync

- Keep show traffic on reliable wired networking.
- Verify NTP/time sync behavior on Director/Runner systems.
- Resolve stale/offline node status before technical run-through.
