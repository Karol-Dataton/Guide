---
title: "Firewall Configuration"
---


## Firewall Configuration

WATCHOUT installer scripts create inbound firewall rules for required network behavior and executables.

### Important UDP Ports

| Port | Purpose |
| --- | --- |
| `123` | NTP time sync |
| `3011` | Multicast query channel |
| `3012` | Multicast/discovery channel |

### Service Port Reference

Protocol definitions include service ports such as:

- `3017` Process Manager
- `3018` Runner
- `3019` Operative External
- `3020` Operative Internal
- `3021` Director
- `3022` Loki
- `3023` Asset Server
- `8000` OSC

### Program-Based Rules

The installer also allows inbound traffic for core executables, including:

- `producer.exe`
- `director.exe`
- `runner.exe`
- `visualrenderer.exe`
- `audiorenderer.exe`
- `asset-server.exe`
- `ptp.exe`
- `mDNSResponder.exe`

### Deployment Advice

- Prefer installer-created rules first.
- If using strict enterprise policy, mirror both UDP port rules and program rules.
- Re-validate after upgrades or path changes.

:::warning
Partial firewall openings often cause intermittent discovery or sync failures that are hard to diagnose during live operation.
:::
