---
title: "Node Management and Maintenance"
---


## Node Management and Maintenance

Once your WATCHOUT network is running, the **Nodes** window in Producer serves as your central control point for managing and maintaining every node in the system. From here you can restart services, rename nodes, configure startup behavior, manage cached assets, adjust time synchronization settings, control which network protocols are active, and perform software updates — all remotely, without needing physical access to each machine.

This article covers the full set of management and maintenance operations available for WATCHOUT nodes.

### Accessing Node Actions

All node management actions are available through the **Nodes** window:

1. Open **Window > Nodes** in Producer.
2. Select one or more nodes in the node list.
3. The **Node Properties** panel on the right displays information and actions for the selected node(s).
4. Actions are grouped into sections: **System**, **Director**, **Asset Manager**, **Runner**, and **Software**.

Some actions can be applied to multiple nodes simultaneously (select several nodes and apply at once), while others require a single node to be selected.

### System Actions

These actions affect the node at the system level:

| Action | Description |
|---|---|
| **Rename** | Change the node's host alias. This is the name that other nodes and device assignments use to identify this machine. Renaming a node will break any device Host assignments that reference the old name — update those assignments after renaming. |
| **Restart Services** | Restarts all WATCHOUT services on the node without rebooting the machine. The node returns to its initial state (splash screen). Use this to recover from unexpected service behavior. |
| **Shutdown** | Shuts down the remote machine. The node will go offline and must be physically powered on again. |
| **Restart** | Reboots the remote machine. The node will go offline briefly and then reappear after the reboot completes. |
| **Working Directory** | Opens the Change Working Directory dialog to redirect where the node stores cached assets and show data. See [Working Directory Management](09-working-directory-management.md). |
| **Sync Settings** | Opens the Sync Settings dialog to choose between WATCHOUT-managed and User-managed time synchronization. See [Time Synchronization](11-time-synchronization.md). |
| **Network Interfaces** | Opens the Network Interfaces dialog where you can enable or disable specific network adapters for WATCHOUT discovery. At least one interface must remain enabled. Disabling an interface prevents WATCHOUT from using it for node discovery, which is useful when a machine has multiple adapters and you want to control which network WATCHOUT communicates on. |

### Director Actions

These actions are available when the selected node has Director capabilities:

| Action | Description |
|---|---|
| **Use as Director** | Designates this node as the Director for the current show. The Director coordinates playback across all Runners. |
| **Close Director** | Releases this node from the Director role. |
| **Startup Action** | Configures what the node does when it boots or when services restart — see below. |

#### Startup Action Configuration

The Startup Action determines what happens automatically when a node starts:

| Mode | Behavior |
|---|---|
| **No Show** | The node starts without loading any show. It waits for a Director to assign work. |
| **Last Show** | The node automatically loads the most recently active show from local storage. |
| **Specific Show** | The node loads a particular show file that has been uploaded to its local storage. |

To configure a Startup Action:

1. Select the node and click **Startup Action** in the Director section.
2. Choose the desired mode.
3. For "Specific Show" mode, use the **Upload** button to push a show file to the node's local storage, then select it from the list.
4. Use **Remove** to delete uploaded show files that are no longer needed.

Startup Action is essential for unattended installations where machines must begin playback automatically after a power cycle.

### Asset Manager Actions

| Action | Description |
|---|---|
| **Use as Asset Manager** | Designates this node as the Asset Manager for the current show. The Asset Manager stores and distributes media files to Runner nodes. |
| **Close Asset Manager** | Releases this node from the Asset Manager role. |
| **Asset Watcher** | Opens the Asset Watcher configuration dialog — see below. |

#### Asset Watcher

The Asset Watcher monitors folders on a node's disk for new or changed files and automatically uploads them to the Asset Manager. This is useful for workflows where media files are delivered to a specific folder (for example, from a render farm or content creation workstation) and should be automatically imported into the show.

To configure the Asset Watcher:

1. Select the node and click **Asset Watcher** in the Asset Manager section.
2. **Enable** or **disable** the watcher using the toggle.
3. Select the **Target Asset Manager** — the node running the Asset Manager service that should receive the uploaded files.
4. In the **Watched Folders** table, add folder mappings:
   - **Disk Path** — the folder on the node's disk to monitor (browse using the remote file browser).
   - **Asset Path** — the corresponding path in the Asset Manager where imported files will be placed.
5. Use **Add** to add new folder mappings and **Remove** to delete existing ones.

When the watcher is active, any file added to or modified in a watched folder is automatically uploaded to the Asset Manager at the specified asset path.

### Runner Actions

| Action | Description |
|---|---|
| **Cache** | Opens the Local Asset Cache dialog to inspect and clean cached assets on the node — see below. |
| **Splash On / Splash Off** | Toggles the splash screen on the Runner's display outputs. Splash On shows the WATCHOUT splash screen; Splash Off clears it to black. |

#### Local Asset Cache

Each Runner node caches downloaded media assets locally for playback. The Cache dialog lets you:

- **View cached assets** — see which assets are currently stored on the node.
- **Refresh** the list to update the display.
- **Remove Unused Local Assets** — deletes cached assets that are not referenced by the current show. This frees disk space but means those assets will need to be re-downloaded if the show changes back to needing them.

:::warning
In multi-show environments where a node may be used for different shows at different times, removing unused assets for one show may delete assets needed by another. Only clean the cache when you are certain the node will not need those assets again.
:::

### Protocol Toggles

The **Protocols** section in Node Properties shows toggle switches for external protocols on the node:

| Protocol | Description |
|---|---|
| **ArtNet** | DMX over Ethernet protocol for lighting control integration |
| **OSC** | Open Sound Control for external show control |
| **PSN** | PosiStageNet for positional tracking data |
| **WebUI** | Web-based user interface for remote control |
| **WO7** | WATCHOUT 7 protocol communication |
| **WO6** | WATCHOUT 6 compatibility protocol |

Each toggle enables or disables that protocol on the selected node. Protocol states are persisted and survive service restarts.

### Other Actions

| Action | Description |
|---|---|
| **MIDI Bridge** | Opens the MIDI Bridge configuration dialog for MIDI control integration on the node. |
| **LTC Bridge** | Opens the LTC Bridge configuration dialog for timecode synchronization on the node. |

### Software Actions

| Action | Description |
|---|---|
| **Update Software** | Pushes a software update from Producer to the selected node(s). See [Software Updates](10-software-updates.md). |
| **Switch to WATCHOUT 6** | Reconfigures the node to run WATCHOUT 6 instead of WATCHOUT 7. Requires a full machine reboot. See [Software Updates](10-software-updates.md). |

### Node Status Information

In addition to actions, Node Properties displays comprehensive status information:

- **System** — node alias, license type, software version, available services, last seen timestamp, machine ID, hardware errors, and pixel usage.
- **NTP** — synchronization mode, NTP diff (time offset), and configured NTP server.
- **Addresses** — the network addresses where the node is reachable.
- **Downloads** — current asset transfer progress.
- **Performance Metrics** — CPU utilization, drive space, network throughput, memory usage, GPU usage, render performance, capture status, and audio status.

### Recommended Maintenance Workflow

For routine maintenance of a WATCHOUT installation:

1. **Check software versions.** Scan the Nodes window for version mismatch warnings and update any nodes that are not running the same version as Producer.
2. **Verify time synchronization.** Check NTP Diff values for all nodes — they should be near zero. Investigate any nodes showing elevated offsets.
3. **Review disk space.** Check drive utilization in the node metrics. Clean the asset cache on nodes with limited space.
4. **Configure startup actions.** For permanent installations, ensure all nodes have appropriate startup actions so the show recovers automatically after power interruptions.
5. **Test restart recovery.** Periodically restart a node to verify that it reconnects, downloads any needed assets, and resumes playback correctly.

### Relationship to Other Articles

- [The Nodes Window](../08-the-interface/07-the-network-window.md) — the interface layout and controls of the Nodes window
- [Working Directory Management](09-working-directory-management.md) — changing where a node stores its data
- [Software Updates](10-software-updates.md) — the update and version management process
- [Time Synchronization](11-time-synchronization.md) — NTP sync configuration
- [Remote File Access](08-remote-file-access.md) — browsing files on remote nodes
