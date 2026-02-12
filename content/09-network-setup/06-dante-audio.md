---
title: "Dante Audio"
---


## Dante Audio

WATCHOUT supports Dante as an audio device type for networked professional audio routing.

### Dante Device Configuration

In audio device properties, choose:

- **Device Type**: `Dante`
- **Adapter**: selected Dante interface
- **Channel count**: based on design requirements
- **Sample format / latency** as needed

### Infrastructure Considerations

Dante workflows rely on stable timing and discovery services.

In WATCHOUT deployments, related components include:

- PTP service (`ptp.exe`)
- mDNS responder (`mDNSResponder.exe`)

### Recommended Practice

- Keep Dante on deterministic wired networking.
- Validate adapter/channel mapping during preflight.
- Perform full audio-path checks after any node or switch change.
