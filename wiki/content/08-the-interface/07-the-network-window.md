---
title: "The Nodes Window"
---


## The Nodes Window

The Nodes window is where you discover, monitor, and manage the WATCHOUT computers on your network. Every machine running WATCHOUT services — whether it serves as a Director, Asset Manager, display node, or any combination — appears here. From this window you can assign roles (designate a Director or Asset Manager), add output devices to specific nodes, monitor hardware performance in real time, track asset transfer progress, and perform system-level operations such as renaming, restarting, or updating software.

Open the Nodes window from **Window > Nodes**.

[[WIDGET:nodes-window]]

### Window Layout

The Nodes window is split into two resizable panes by a vertical splitter:

- **Left pane** — the node list, showing all discovered WATCHOUT nodes on the network
- **Right pane** — the detail panel, showing either detailed information for a single selected node (Node Info) or a multi-node performance dashboard (Node Metrics) when zero or multiple nodes are selected

Drag the splitter to adjust the relative sizes of the two panes. Each pane has a minimum width of 200 pixels.

### Node List

The left pane displays all discovered nodes with the following information for each:

- **Host name** — the machine's network hostname
- **IP addresses** — up to two IP addresses are shown
- **Service icons** — small icons indicating which WATCHOUT services are running on that node
- **Download progress** — when asset transfers are in progress, a progress bar with estimated time remaining appears
- **Version mismatch warning** — if the node's software version does not match the Producer's version, a warning is displayed
- **Multi-show warning** — if the node is serving more than one show simultaneously, an indicator appears

The local machine (the one running Producer) is highlighted with a distinct background color for quick identification.

Nodes that are referenced in the show but are not currently responding are shown with a red left border and red background, making offline nodes immediately visible.

#### Service Icons

The following service icons may appear on each node:

| Icon | Service |
|---|---|
| Database | Asset Manager |
| Earth/Globe | Director |
| Run/Play | Runner (display rendering service) |
| Folder with eye | Asset Watcher |
| MIDI port | MIDI Bridge |
| Timer | LTC Bridge |

#### Filters

A filter dropdown at the top of the node list lets you narrow the displayed nodes:

| Filter | Shows |
|---|---|
| **All** | Every discovered node on the network |
| **Active in Show** | Only nodes currently assigned to and participating in the show |
| **Referred by Show** | Nodes referenced in the show configuration, whether online or not |

#### Refresh

Click the **Refresh** button next to the filter dropdown to trigger an immediate connectivity check. Recently refreshed nodes briefly highlight in green (for about 10 seconds) to confirm they responded.

#### Selection

- **Click** a node to select it and view its details in the right pane
- **Ctrl+Click** to toggle individual nodes in and out of the selection
- **Shift+Click** to select a range of nodes
- **Ctrl+A** to select all nodes

When a single node is selected, the right pane shows Node Info (detailed information). When zero or multiple nodes are selected, it shows Node Metrics (performance dashboard).

### Node Info (Single Node Selected)

When you select a single node, the right pane displays comprehensive information organized into sections:

#### System

General node information:

- **Host name** and license status
- **Software version** and list of running services
- **Last seen** timestamp
- **Director show** — which show the Director on this node is running (if applicable)
- **Runner show** — which show the Runner on this node is rendering (if applicable)
- **Machine ID** — unique identifier
- **WHEA events** — hardware error count (if any)
- **Pixel usage** — total pixels being rendered

Additional system sub-sections:
- **NTP** — time synchronization status, offset from server, and NTP server address
- **Protocols** — toggles for enabling/disabling ArtNet, OSC, PSN, Web UI, WO6, and WO7 protocols on this node
- **Addresses** — all network interfaces and their IP addresses
- **Download Progress** — current asset download state

#### Actions

Buttons for common operations, grouped by function:

**System:**
- **Rename** — change the node's hostname
- **Restart Services** — restart all WATCHOUT services on this node
- **Shut Down** — shut down the machine
- **Restart** — restart the machine
- **Working Directory** — view or change the working directory
- **Sync Settings** — configure NTP synchronization
- **Network Interfaces** — view and configure network adapters

**Director:**
- **Use Director** — designate this node as the show's Director
- **Close Director** — release the Director role from this node
- **Startup Action** — configure what the Director does on startup (Director Settings)

**Asset Manager:**
- **Use Asset Manager** — designate this node as the show's Asset Manager
- **Close Asset Manager** — release the Asset Manager role
- **Asset Watcher** — configure the Asset Watcher service on this node

**Runner:**
- **Local Cache** — configure the local asset cache on this node
- **Splash Screen On / Off** — show or hide the WATCHOUT splash screen on the node's outputs

**Other:**
- **MIDI Bridge** — configure MIDI input/output bridging on this node
- **LTC Bridge** — configure LTC (Linear Timecode) input bridging

**Software:**
- **Update Software** — push a software update to this node
- **Switch to WATCHOUT 6** — revert the node to WATCHOUT 6 mode

#### Transfer Jobs

Lists all active file transfer jobs on the node, with per-job details:

- Current state (pending, in progress, completed)
- Retry countdown (if a transfer failed and is being retried)
- Progress percentage
- File counts (skipped, cached, downloaded)
- Error details
- List of currently transferring files
- Cancel button

#### Asset Jobs

Lists import and export jobs running on the Asset Manager:

- Job state and destination
- Progress percentage and estimated time remaining
- Data transferred and file counts
- Error details

#### Hardware Monitoring

The following sections provide real-time performance charts:

| Section | Metrics |
|---|---|
| **CPU Info** | Per-CPU name, manufacturer, and usage chart |
| **Drive Info** | Per-drive used space, read rate chart, write rate chart |
| **Network Info** | Per-interface send rate and receive rate charts |
| **Memory Info** | Memory usage chart |
| **GPU Info** | Per-GPU name, manufacturer, usage chart, memory chart, temperature chart, video encoder chart, video decoder chart |
| **Render Info** | FPS chart, dropped media frames chart, dropped capture frames chart |
| **Capture Info** | Capture device status and statistics |
| **Audio Info** | VU meters for audio output |

### Node Metrics (Multi-Node Dashboard)

When zero or multiple nodes are selected, the right pane switches to a dashboard view showing performance charts across all active nodes. Charts are arranged in a responsive grid and are grouped by category:

- **CPUs** — usage charts for all CPUs across all nodes
- **Memory** — memory usage per node
- **GPUs** — GPU usage, GPU memory, and GPU temperature charts
- **Networks** — upload and download rate charts per interface
- **Drive Reads / Drive Writes** — storage I/O charts per drive
- **Render Info** — FPS, dropped media frames, and dropped capture frames per node
- **Audio** — VU meters per node

#### Pinning Charts

In the dashboard view, you can pin specific charts so they remain visible regardless of selection changes:

1. Hold **Ctrl** and click to enter edit mode
2. Click charts to pin or unpin them
3. Pinned charts persist across selection changes

Click the **Reset** button to clear all pinned charts.

Each chart also supports a fullscreen mode for detailed inspection.

### Context Menu

Right-click a node in the node list to access a comprehensive set of operations:

#### Device Management

- **Add Display** — create a new display output on this node
- **Add 3D Projector** — create a 3D projector output on this node
- **Add Audio Device** — add an audio output device
- **Add Capture Device** — add a capture input source

:::note
Some device management options are only available when a single node is selected.
:::

#### Director

- **Use Director** — designate this node as the Director
- **Close Director** — release the Director role
- **Startup Action** — configure Director startup behavior

#### Asset Manager

- **Use Asset Manager** — designate this node as the Asset Manager
- **Close Asset Manager** — release the Asset Manager role
- **Asset Watcher** — configure the Asset Watcher service

#### Runner

- **Local Asset Cache** — manage the node's local asset cache
- **Splash Screen On / Off** — control the splash screen display

#### Other

- **MIDI Bridge** — configure MIDI bridging
- **LTC Bridge** — configure LTC bridging

#### System

- **Rename** — change the node's hostname
- **Restart Services** — restart WATCHOUT services
- **Sync (NTP)** — configure time synchronization
- **Shut Down** — shut down the machine
- **Restart** — restart the machine
- **Working Directory** — view or change the working directory
- **Network Interfaces** — configure network adapters
- **Update Software** — push a software update
- **Switch to WATCHOUT 6** — revert to WATCHOUT 6

### Empty State

When no nodes are discovered on the network, the Nodes window displays the message "No Nodes. Is Manager running?" to help troubleshoot connectivity issues.

### Relationship to Other Windows

- **Devices** — output devices created from the Nodes window appear in the Devices window for further configuration. See [The Devices Window](08-the-nodes-window.md).
- **Stage** — displays assigned to nodes are shown on the Stage canvas. See [The Stage Window](02-the-stage-window.md).
- **Properties** — selecting a node and using the Actions section provides access to the same settings available through the Properties panel for devices. See [The Properties Panel](06-the-properties-panel.md).
- **Menu Bar** — the Director and Asset Manager indicators in the menu bar reflect the assignments made from the Nodes window. See [Main Window Overview](01-main-window-overview.md).
