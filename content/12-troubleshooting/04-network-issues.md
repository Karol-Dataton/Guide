---
title: "Network Issues"
---


## Network Issues

Most network failures fall into discovery, firewall, or host-alias consistency problems.

### Nodes Not Appearing

- Verify nodes are on reachable network interfaces.
- Check multicast handling (`239.2.2.2:3012`).
- Confirm firewall allows WATCHOUT services and required UDP ports.

### Node Appears but Goes Stale/Offline

- Check switch stability and cable quality.
- Verify host is not sleeping/power-throttled.
- Confirm process-manager services are still running.

### Director/Runner Mismatch Warnings

- Ensure all nodes are attached to the intended Director.
- Clear stale show state on nodes if needed.
- Re-run a controlled startup sequence before rehearsal.

### NTP/Sync Instability

- Confirm Director and runners use consistent time strategy.
- Check NTP reachability and drift.
- Resolve time sync warnings before running synchronized playback.
