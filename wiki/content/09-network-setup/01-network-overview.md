---
title: "Network Overview"
---


## Network Overview

WATCHOUT 7 is a distributed system. Rather than running everything on a single computer, WATCHOUT spreads its workload across multiple machines — called **nodes** — that communicate over a shared network. One machine runs the Producer application where you design and program your show. Other machines act as playback engines that render content to displays and audio devices. A centralized media distribution service ensures every node has the files it needs. And a coordination service keeps all nodes synchronized and executing the same show in lockstep. This architecture allows WATCHOUT to scale from a single laptop running everything locally to large installations with dozens of dedicated playback machines driving hundreds of display outputs.

Understanding how these pieces fit together on the network is the foundation for building reliable WATCHOUT systems.

### The Four Core Services

Every WATCHOUT installation involves four core services. These services can all run on the same machine, or they can be distributed across separate machines depending on the scale of the installation:

| Service | Role |
|---|---|
| **Producer** | The authoring application where you design your show — arrange cues on timelines, configure displays, manage assets, and control playback. Producer is the only component with a full graphical interface for show design. |
| **Director** | The playback coordinator. Director holds the authoritative copy of the running show, broadcasts playback state to all Runners, and ensures every node is executing the same content at the same time. |
| **Runner** | The rendering engine. Each Runner receives playback instructions from the Director and renders content to its assigned display and audio outputs. A system with four display outputs might have four Runners, each driving one output. |
| **Asset Manager** | The media distribution hub. Asset Manager stores the master copy of all show assets (images, videos, audio files) and distributes them to Runner nodes as needed. When you add media to your show, it flows through the Asset Manager to reach every machine that needs it. |

In a typical multi-machine setup, Producer runs on the operator's workstation, Director and Asset Manager run either on the same machine as Producer or on a dedicated server, and each playback machine runs a Runner.

For smaller setups or programming sessions, all four services can run on a single machine. WATCHOUT handles the internal communication transparently — the same show file works whether services are local or distributed.

### How Nodes Discover Each Other

WATCHOUT nodes find each other automatically over the local network using multicast discovery. When a node starts, it announces its presence on the network. Other nodes receive this announcement and add it to their list of available machines. This process is continuous — nodes periodically re-announce themselves, and the system detects when nodes appear or disappear.

Discovery is name-based: each node is identified by its **host alias** (a human-readable name) rather than by IP address. This means that if a machine's IP address changes (for example, when moving between DHCP networks or switching network interfaces), other WATCHOUT nodes will find it again automatically as long as the alias stays the same.

You can see all discovered nodes in the **Nodes** window in Producer. Each node shows its alias, running services, software version, and connection status. Nodes that have not announced themselves recently appear as stale and can be dismissed from the list.

:::tip
For discovery to work, all WATCHOUT nodes must be on the same network subnet or connected through infrastructure that supports multicast forwarding. See [Firewall Configuration](04-firewall-configuration.md) for the specific network requirements.
:::

### Network Communication Model

Once nodes have discovered each other, WATCHOUT services communicate using standard network protocols over TCP. The key communication paths are:

- **Producer to Director** — Producer sends show data and playback commands to the Director.
- **Director to Runners** — Director broadcasts real-time playback state to all connected Runners. This is the most time-critical path in the system, as it determines whether all displays stay in sync.
- **Asset Manager to Runners** — Runners download media files from the Asset Manager as needed. This can involve large file transfers depending on the size of your asset library.
- **Producer to all nodes** — Producer communicates with the management service on each node for operations like software updates, renaming, restart commands, and status monitoring.

All of these connections are established automatically once discovery has identified the available nodes and you have assigned roles (Director, Asset Manager) to specific machines.

### Assigning Roles

In a multi-machine setup, you must tell WATCHOUT which node should run the Director service and which should run the Asset Manager service. You do this from the **Nodes** window in Producer:

1. Open **Window > Nodes** to see all discovered nodes.
2. Select the node you want to act as the Director.
3. In the node's properties, click **Use as Director**.
4. Select the node you want to act as the Asset Manager (this can be the same machine or a different one).
5. Click **Use as Asset Manager**.

Runner roles do not need explicit assignment. Any node that has the Runner service available will automatically participate in playback when the Director assigns it work based on the show's display-to-host mappings.

### Node Failover with Duplicate Aliases

WATCHOUT's name-based discovery enables a simple failover pattern. If two physical machines share the same host alias, WATCHOUT will use whichever one it discovers first. If the active machine goes offline, the system automatically switches to the backup machine within seconds. This provides basic redundancy without requiring any special configuration beyond giving both machines the same alias.

:::warning
Use duplicate aliases only for intentional failover. Accidental name collisions between machines will cause unpredictable behavior as WATCHOUT arbitrarily picks one.
:::

### Network Design Recommendations

A well-designed WATCHOUT network is the foundation for stable, synchronized playback. Follow these guidelines:

- **Use wired Ethernet for all show-critical nodes.** Wireless connections introduce latency variability and packet loss that can cause playback synchronization issues and unreliable media distribution.
- **Keep WATCHOUT nodes on a dedicated network or VLAN.** Isolating show traffic from general office or internet traffic prevents bandwidth contention and reduces the risk of discovery interference from other devices.
- **Use a managed Gigabit switch (or faster).** Media distribution can generate significant traffic when assets are being transferred to multiple Runner nodes simultaneously.
- **Give each node a unique, descriptive alias.** Names like "Stage-Left-1" or "LED-Wall-A" make it easy to identify machines in the Nodes window and in error messages. Keep aliases consistent across rehearsals and performances.
- **Minimize network hops between Director and Runners.** The Director-to-Runner path is latency-sensitive. Ideally, all playback nodes should be on the same switch or within one switch hop.
- **Plan for asset transfer time.** The first time a show is loaded on a Runner, all required assets must be downloaded from the Asset Manager. For large shows with many gigabytes of media, this initial transfer can take considerable time. Schedule this for setup, not showtime.
- **Avoid overlapping subnets.** If a machine has multiple network interfaces with overlapping address ranges, WATCHOUT will warn you about the configuration conflict. Resolve these warnings to ensure reliable discovery and communication.

### Single-Machine vs. Multi-Machine

| Aspect | Single Machine | Multi-Machine |
|---|---|---|
| **Setup complexity** | Minimal — all services start automatically | Requires network configuration, role assignment, and firewall verification |
| **Display scaling** | Limited by the GPU outputs on one machine | Scales to dozens or hundreds of outputs across many machines |
| **Fault isolation** | A single failure affects everything | Individual Runners can fail without affecting other outputs |
| **Asset distribution** | Instant — all files are local | Requires network transfer to each Runner node |
| **Use case** | Programming, previewing, small single-output shows | Live production, multi-display installations, permanent installations |

Most workflows involve both: you program and preview on a single machine, then deploy to a multi-machine setup for the actual show.

### Relationship to Other Chapters

- [Display Servers](02-display-servers.md) — details on what Runner nodes do and how to set them up
- [Connecting Devices](03-connecting-devices.md) — how to bind displays and audio devices to specific nodes
- [Firewall Configuration](04-firewall-configuration.md) — network ports and firewall rules required for WATCHOUT communication
- [Time Synchronization](11-time-synchronization.md) — how all nodes maintain a shared clock for frame-accurate playback
- [The Nodes Window](../08-the-interface/07-the-network-window.md) — the Producer interface for viewing and managing nodes
