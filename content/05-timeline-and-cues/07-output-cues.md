---
title: "Output Cues"
---


## Output Cues

Output cues transmit external control data during timeline playback.

### Output Cue Fields

Typical output cue properties include:

- **Protocol**
- **Address**
- **Port**
- **Data payload**

These let you trigger external systems in sync with timeline events.

### Typical Use Cases

- Triggering automation systems
- Sending commands to control middleware
- Driving external effects synchronized with visuals

### Reliability Tips

- Keep payloads deterministic and documented.
- Test cue timing with full show playback speed.
- Validate routing on the same network architecture used in production.

:::warning
If external systems are safety-critical, include operator confirmation and fallback procedures outside timeline automation.
:::
