---
title: "NDI Video Sources"
---


## NDI Video Sources

WATCHOUT 7 supports NDI for both ingest and output workflows.

### NDI Input Workflow

- Add an NDI capture/source in Producer.
- Select the stream by discovered NDI source name.
- Use it like other media cues in timeline and stage workflows.

### NDI Output Workflow

Displays can use **NDI** as output type, enabling network video feeds to downstream systems.

### Calibration and Integration

Display properties include an **NDI calibration stream** field for specific calibration and workflow integrations.

### Reliability Tips

- Keep NDI traffic on robust switched infrastructure.
- Avoid saturated links on mixed control/media VLANs.
- Validate source frame format and timing before show-critical use.
