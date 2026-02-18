---
title: "Network Setup"
icon: "globe"
---

# NETWORK SETUP

**WATCHOUT 7 is a distributed system where Producer, Director, Runner, and Asset Manager services communicate over a dedicated network to deliver synchronized multi-display playback.** Correct network configuration is the foundation for reliable show operation - from initial device discovery through media distribution to frame-accurate synchronization. This chapter covers every aspect of getting your WATCHOUT network running and maintaining it over time.

### Architecture and Basics

Understand how the network components fit together.

- [Network Overview](01-network-overview.md) - the distributed architecture of Producer, Director, Runner, and Asset Manager services and how they coordinate across the network
- [Display Servers](02-display-servers.md) - Runner nodes responsible for rendering and output, their hardware role, and how they connect to the production network
- [Connecting Devices](03-connecting-devices.md) - binding displays, audio devices, and capture sources to discovered node aliases in your show

### Protocols and Services

Network services and media transport protocols used by WATCHOUT.

- [Firewall Configuration](04-firewall-configuration.md) - required ports, installer-created firewall rules, and manual configuration for restrictive network environments
- [NDI Video Sources](05-ndi-video-sources.md) - NDI ingest and output workflows for video-over-IP integration with cameras, switchers, and other NDI-enabled devices
- [Dante Audio](06-dante-audio.md) - networked professional audio routing using Dante as an audio device type within WATCHOUT
- [Time Synchronization](11-time-synchronization.md) - how all nodes share a precisely aligned clock for frame-accurate multi-display playback

### Maintenance and Management

Day-to-day operations for keeping your WATCHOUT network healthy.

- [Node Management and Maintenance](07-node-management-and-maintenance.md) - network actions for restarting services, rebooting nodes, and managing node health
- [Remote File Access](08-remote-file-access.md) - browsing, uploading, and managing files on remote nodes from Producer over the network
- [Working Directory Management](09-working-directory-management.md) - the per-node working directory where cached media, show files, and internal state are stored
- [Software Updates](10-software-updates.md) - pushing software updates from Producer to remote nodes using the built-in update mechanism
