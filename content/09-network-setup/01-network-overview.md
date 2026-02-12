---
title: "Network Overview"
---


## Network Overview

WATCHOUT 7 is a distributed system where Producer coordinates Director, Runner, and Asset Manager services across the network.

### Core Service Groups

From the process-manager architecture:

- **Director group**: Director, Operative, Loki
- **Runner group**: Runner, Visual Renderer, Audio Renderer
- **Asset Manager group**: Asset services for media distribution

### Discovery Model

Nodes discover each other automatically over multicast.

Key details:

- Multicast group: `239.2.2.2`
- Discovery port: `3012/UDP`
- Nodes announce on startup and on service/show changes

### Network Design Recommendations

- Keep show-critical nodes on a stable wired network.
- Use predictable host aliases.
- Avoid duplicate host names unless implementing intentional fallback patterns.
- Keep network latency and jitter low for synchronized playback.
