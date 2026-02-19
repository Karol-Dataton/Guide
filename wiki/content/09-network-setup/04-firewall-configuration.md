---
title: "Firewall Configuration"
---


## Firewall Configuration

WATCHOUT nodes communicate over the network using a combination of UDP and TCP protocols for discovery, playback synchronization, media distribution, time synchronization, and external control. If any of these network paths are blocked by a firewall, WATCHOUT will not function correctly — nodes may fail to discover each other, playback may lose synchronization, or media may not transfer to display servers.

The WATCHOUT installer automatically creates Windows Firewall rules for all required ports and executables. In most environments, the installer-created rules are sufficient and no manual configuration is needed. This article covers what those rules do and how to configure firewalls manually in restricted network environments.

### Installer-Created Rules

During installation, WATCHOUT registers both **port-based** and **program-based** inbound firewall rules on Windows:

- **Port-based rules** open specific UDP and TCP ports that WATCHOUT services listen on.
- **Program-based rules** allow inbound traffic for each WATCHOUT executable regardless of port, which covers any dynamic or ancillary connections.

Both types of rules are created as **inbound allow** rules in the Windows Firewall. Outbound traffic is typically unrestricted by default on Windows.

### Required UDP Ports

These UDP ports must be open for WATCHOUT's core network functions:

| Port | Protocol | Purpose |
|---|---|---|
| 123 | UDP | NTP time synchronization — used by the Windows Time Service to keep all nodes' clocks aligned |
| 3011 | UDP | Multicast query channel — used during the discovery process |
| 3012 | UDP | Multicast discovery — nodes announce their presence and discover other nodes on this port |
| 8000 | UDP | OSC (Open Sound Control) — receives external control commands via UDP |
| 56565 | UDP | PosiStageNet — receives positional tracking data (multicast) |

### Required TCP Ports

These TCP ports are used for service-to-service communication:

| Port | Protocol | Purpose |
|---|---|---|
| 3017 | TCP | Node management — service lifecycle, status reporting, remote file access, software updates |
| 3018 | TCP | Runner — playback state updates from Director, status reporting |
| 3019 | TCP | External control API — HTTP-based external control interface for third-party integrations |
| 3020 | TCP | Internal control — localhost-only communication between services on the same machine |
| 3021 | TCP | Director — receives show data from Producer, coordinates Runner playback |
| 3022 | TCP | Logging service — centralized log collection from all services on the node |
| 3023 | TCP | Asset Manager — media file distribution to Runner nodes |
| 8001 | TCP | OSC over TCP — receives external control commands via TCP |

### Program-Based Rules

In addition to port rules, the installer creates program-based firewall exceptions for each WATCHOUT executable. This ensures that even if a service uses an ephemeral or dynamically assigned port, traffic is still allowed. The executables include:

- Producer
- Director
- Runner
- Visual Renderer
- Audio Renderer
- Asset Server
- NTP/PTP service
- mDNS Responder

### Manual Configuration for Restricted Environments

In enterprise environments with strict Group Policy-managed firewalls, the installer-created rules may be overridden or removed. In this case, you need to recreate them manually:

1. **Start with port rules.** Create inbound allow rules for each port listed in the tables above. This covers all known fixed-port communication.
2. **Add program rules** for each WATCHOUT executable in the installation directory. This is a safety net for any communication not covered by the port rules.
3. **Enable multicast.** Ensure the firewall does not block UDP multicast traffic on the discovery addresses. Some enterprise firewalls strip multicast by default.
4. **Allow ICMP** if your network relies on ping for diagnostics (optional but helpful for troubleshooting).

:::warning
Partial firewall openings are a common source of hard-to-diagnose problems. A firewall that blocks only discovery (UDP 3012) will prevent nodes from finding each other, but all other services will work fine in isolation — leading to confusing symptoms where nodes appear to be connected but cannot coordinate. Always verify **all** required ports when troubleshooting network issues.
:::

### Verifying Firewall Rules

After configuring firewall rules, verify that WATCHOUT communication is working:

1. **Check discovery.** Open the **Nodes** window in Producer and verify that all expected nodes appear. If nodes are missing, the discovery ports (UDP 3011, 3012) are likely blocked.
2. **Check Director connection.** Assign a Director and verify that Runner nodes connect successfully. If Runners appear in the Nodes window but do not receive playback commands, TCP 3021 (Director) or 3018 (Runner) may be blocked.
3. **Check asset transfer.** Start a show and verify that assets download to Runner nodes. If downloads fail, TCP 3023 (Asset Manager) may be blocked.
4. **Check time sync.** Verify that NTP Diff values in the Nodes window are near zero. If values are high or missing, UDP 123 may be blocked.
5. **Check external control.** If using OSC or HTTP API control, test from the external device. If commands are not received, the corresponding external control ports may be blocked.

### Additional Protocols

If your installation uses video-over-IP or networked audio, additional firewall considerations apply:

- **NDI** — NDI uses its own discovery and transport protocols. NDI discovery uses mDNS, and NDI streams use dynamically assigned TCP ports. The mDNS Responder program-based rule covers NDI discovery. For NDI transport, the program-based rules for the Visual Renderer and Runner executables are needed. See [NDI Video Sources](05-ndi-video-sources.md).
- **Dante** — Dante audio uses its own set of ports managed by the Dante Application Library. The PTP service and mDNS Responder program-based rules are essential for Dante clock synchronization and device discovery. See [Dante Audio](06-dante-audio.md).
- **ArtNet** — ArtNet uses UDP on its standard ports. If ArtNet is enabled, ensure the corresponding UDP ports are open.

### Network Switch and Infrastructure Considerations

Firewalls are not the only potential barrier to WATCHOUT communication:

- **Managed switches** with default security profiles may block multicast traffic. Ensure IGMP snooping is configured correctly or that multicast forwarding is enabled for WATCHOUT's discovery addresses.
- **VLANs** that isolate WATCHOUT nodes from each other will prevent discovery. All WATCHOUT nodes must be able to reach each other on the required ports.
- **VPN connections** may not forward multicast traffic, preventing discovery between nodes on different VPN segments.
- **Network address translation (NAT)** between nodes is not supported. All WATCHOUT nodes must communicate using direct IP addresses.

### Relationship to Other Articles

- [Network Overview](01-network-overview.md) — the overall communication architecture
- [Time Synchronization](11-time-synchronization.md) — NTP port requirements and sync configuration
- [NDI Video Sources](05-ndi-video-sources.md) — NDI-specific network requirements
- [Dante Audio](06-dante-audio.md) — Dante-specific network requirements
