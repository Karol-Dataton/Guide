---
title: "Connecting to Display Servers"
---


## Connecting to Display Servers

A WATCHOUT system becomes a multi-machine installation when Producer connects to one or more display servers (Runners) through a Director. The Nodes window is your central interface for discovering machines on the network, verifying their services, assigning roles, and monitoring system health. Before you can run a show across multiple outputs, you need to confirm that all nodes are visible, that the correct services are running on each machine, and that your display assignments match the physical hardware. This article covers the complete process from network discovery through to a fully connected, verified system.

### System Architecture Overview

WATCHOUT's networked playback involves three key services that run on machines across your network:

| Service | Role | Typical Location |
|---|---|---|
| **Director** | The central coordinator that manages the authoritative show state, controls playback timing, and distributes playback commands to all connected Runners | Usually runs on a dedicated machine, or on the same machine as Producer for smaller setups |
| **Runner** | The media playback engine that receives playback state from the Director, renders content, and outputs to connected displays | Runs on each display server — one Runner per machine |
| **Asset Manager** | Manages asset distribution across the network, ensuring that all Runners have the media files they need before playback begins | Usually runs on one machine (often the same as the Director) |

Producer is the authoring application where you build and control your show. It connects to both the Director (for playback control) and the Asset Manager (for asset management). The Director then broadcasts playback state to all Runners in real time.

### The Nodes Window

The Nodes window is your primary interface for managing the machines in your WATCHOUT system. Open it from **Window > Nodes**.

The window is divided into two areas:

- **Node list (left side)** — shows all discovered machines with their names, IP addresses, service icons, and status indicators
- **Detail panel (right side)** — shows detailed information about the selected node, either as a single-node info view or a multi-node metrics dashboard

#### Node List Filters

The node list supports three filter modes to help you focus on relevant machines:

| Filter | Shows |
|---|---|
| **All** | Every node discovered on the network, regardless of whether it is part of your current show |
| **Active in Show** | Only nodes that are currently running services (Director, Runner, Asset Manager) for the loaded show |
| **Referred by Show** | Nodes that are referenced in the show configuration, whether or not they are currently online |

Use **Active in Show** during operation to focus on the machines that matter. Switch to **All** when troubleshooting to see if a missing machine is visible on the network but not yet assigned to your show.

#### Node Information Display

Each node in the list shows:

- **Host name** — the machine's assigned name in WATCHOUT (also called the host reference)
- **IP addresses** — the network addresses where the node can be reached
- **Service icons** — visual indicators showing which services are running on that node (Director, Runner, Asset Manager, and others)
- **Version** — the WATCHOUT software version running on the node
- **Download progress** — when assets are being transferred, a progress bar shows the download status

#### Status Warnings

The Nodes window displays visual warnings for common problems:

| Warning | Meaning | Resolution |
|---|---|---|
| **Version mismatch** | The node is running a different version of WATCHOUT than Producer | Update all machines to the same WATCHOUT version to avoid compatibility issues |
| **Multi-show warning** | The Director and a Runner have different shows loaded | Ensure all nodes are running the same show — use the Director to load the correct show on all Runners |

### Node Discovery

WATCHOUT automatically discovers nodes on the network using UDP multicast. When a machine running WATCHOUT services is on the same network as Producer, it should appear in the Nodes window within a few seconds.

Discovery requires that:

- All machines are on the same network subnet (or that multicast routing is configured between subnets)
- Firewalls allow WATCHOUT's multicast traffic
- The WATCHOUT process manager is running on each machine

:::note
Automatic discovery relies on multicast networking. If your network infrastructure blocks multicast (some managed switches, VLANs without multicast routing, or cloud/virtual networks), nodes will not appear automatically. Consult your network administrator to ensure multicast is enabled on the relevant network segments.
:::

### Assigning Services to Nodes

Once nodes are visible in the Nodes window, you need to assign the Director and Asset Manager roles to specific machines. Runners are typically configured at the node level and do not need to be explicitly assigned from Producer.

#### Setting Up the Director

Right-click a node in the Nodes window and choose **Use Director** to designate that machine as the Director for your show. The show configuration stores this assignment, so it persists across sessions.

You can also connect to a Director from the **File > Open Show from Director** menu, which lets you choose a Director to connect to and load its currently active show.

To disconnect from a Director, right-click the Director node and choose **Close Director**.

#### Setting Up the Asset Manager

Right-click a node and choose **Use Asset Manager** to designate it as the asset distribution point for your show. Runners automatically connect to the Asset Manager to download any media files they need.

To disconnect, right-click and choose **Close Asset Manager**.

#### Display Assignment

Each display in your show must be assigned to a specific host — the machine whose Runner will render and output that display. This assignment is made in the display's properties (see [Display Outputs](../03-displays-and-outputs/02-display-outputs.md)). The host reference in the display properties must match the host name of the intended Runner node.

### Node Detail View

Selecting a node in the list opens its detail view in the right panel. This view provides comprehensive information about the machine:

**General Information:**
- Machine name, license status, software version
- Running services
- Last seen timestamp
- Currently loaded show (for both Director and Runner roles)
- Machine identifier

**NTP Synchronization:**
- Time synchronization status — all machines in a WATCHOUT system should be NTP-synchronized for accurate playback timing across multiple outputs

**Protocol Status:**
- Active protocol toggles showing which communication protocols are enabled on the node (Art-Net, OSC, PSN, WebUI, and others)

**Network:**
- All network addresses associated with the node

**Asset Transfer:**
- Download progress for asset transfers
- Active transfer and asset processing queues

**Performance Metrics:**
- CPU usage
- GPU usage
- Memory usage
- Drive activity
- Network throughput

**Render Information:**
- Current rendering frame rate (FPS)
- Dropped frames count — a key indicator of whether the Runner is keeping up with the demanded output rate

**Media Sources:**
- Active capture sources (cameras, capture cards)
- Audio VU meters

### Node Metrics Dashboard

When multiple nodes are selected (or when switching to the metrics view), the right panel shows a multi-node dashboard with comparative charts for:

- CPU usage across nodes
- Memory usage across nodes
- GPU usage across nodes
- Network throughput across nodes
- Drive activity across nodes
- Render information (FPS, dropped frames) across nodes

This dashboard is invaluable during rehearsal and show operation for identifying which machines are under stress and whether any Runner is struggling to maintain frame rate.

### Node Context Menu Operations

Right-clicking a node provides access to several categories of operations:

**Director Operations:**
- **Use Director** — assign this node as the Director
- **Close Director** — disconnect from this Director

**Asset Manager Operations:**
- **Use Asset Manager** — assign this node as the Asset Manager
- **Close Asset Manager** — disconnect from this Asset Manager

**Runner Operations:**
- **Cache** — manage the Runner's local media cache
- **Splash** — control the Runner's splash/startup screen

**System Operations:**
- **Rename** — change the node's host name
- **Restart** — restart the WATCHOUT services on the node
- **Shutdown** — shut down the machine remotely

### Connection Verification Workflow

After setting up your nodes, follow this process to verify that the system is fully connected and ready:

1. **Open the Nodes window** and set the filter to **Referred by Show** to see all machines your show expects.

2. **Verify all nodes are visible.** Every machine referenced in your show should appear in the list. If any are missing, see the troubleshooting section below.

3. **Check service icons.** Confirm that the Director is running on the intended machine, the Asset Manager is running where expected, and Runners are active on all display server machines.

4. **Check for version warnings.** All nodes should be running the same WATCHOUT version.

5. **Check for multi-show warnings.** All nodes should have the same show loaded.

6. **Verify asset transfer status.** If assets are still being transferred, wait for all downloads to complete before beginning playback. Incomplete asset transfers will cause missing media during playback.

7. **Check display assignments.** Confirm that each display in your show is assigned to the correct Runner node by reviewing the host references in display properties.

8. **Review NTP sync status.** Open the detail view for each node and verify that time synchronization is healthy. Poor time sync causes playback drift between displays.

### Troubleshooting Missing Nodes

If a node does not appear in the Nodes window:

| Check | Action |
|---|---|
| **Network connectivity** | Verify that the machine is powered on, connected to the network, and reachable (try pinging its IP address) |
| **Same subnet** | Confirm all machines are on the same network subnet, or that multicast routing is configured between subnets |
| **Firewall** | Check that the machine's firewall allows WATCHOUT's network traffic. Temporarily disabling the firewall can help isolate this as the cause |
| **WATCHOUT services** | Verify that the WATCHOUT process manager is running on the node. The services must be active for the machine to announce itself on the network |
| **Unique host names** | Ensure each machine has a unique host name. Duplicate names can cause discovery conflicts and unpredictable behavior |
| **Multicast support** | Confirm that your network switches and routers support and allow multicast traffic. Some enterprise switches require explicit multicast configuration |

:::warning
Duplicate host names are a common source of connection problems. If two machines share the same host name, the system cannot reliably distinguish between them, which can cause displays to connect to the wrong Runner or control commands to reach the wrong node. Always ensure every machine in your WATCHOUT network has a unique name.
:::

### Menu Bar Status Indicators

The Producer menu bar provides at-a-glance status information about your network connections:

- **FPS display** — shows the current rendering frame rate
- **Director hostname** — shows which Director Producer is connected to (if any)
- **Asset Manager hostname** — shows which Asset Manager Producer is connected to (if any)
- **Node activity badge** — a clock icon that appears when nodes have active download jobs or asset processing work
- **Message bell** — a notification icon that opens a dropdown showing persistent errors and warnings from across the system, with color-coded severity (information, warning, error), timestamps, and source information

Monitor these indicators during setup and operation. The message bell in particular can surface problems that are not immediately visible in the Nodes window, such as network timeouts, asset transfer failures, or Runner errors.

### Relationship to Other Articles

- For details on display configuration and host assignment, see [Display Outputs](../03-displays-and-outputs/02-display-outputs.md).
- For preparing the full system for live operation, see [Going Online](04-going-online.md).
- For previewing content locally before connecting to Runners, see [Preview Mode](02-preview-mode.md).
- For operational procedures once everything is connected, see [Running Your Show](05-running-your-show.md).
