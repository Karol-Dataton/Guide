---
title: "Software Updates"
---


## Software Updates

WATCHOUT provides a built-in mechanism for pushing software updates from Producer to remote nodes over the network. This ensures all nodes in a production run the same software version, which is essential for protocol compatibility and consistent behavior across the system.

### Why Version Alignment Matters

All WATCHOUT nodes (Runners, Director, Operative, Asset Manager) communicate using internal protocols that evolve with each software release. When nodes run different versions, protocol mismatches can cause communication failures, missing features, or unexpected behavior. Keeping all nodes at the same version eliminates these risks.

### Version Mismatch Indicators

WATCHOUT displays a visual warning indicator on any node in the **Nodes** window that is running a different software version than your Producer. The tooltip reads: "Warning: Not the same software version as your Producer." This makes it easy to identify nodes that need updating at a glance.

Each node's current version is reported in its **Node Properties** panel under the **Info** section.

### Initiating an Update

To push an update to one or more nodes:

1. Open the **Nodes** window.
2. Select the target node(s) you want to update.
3. Click **Update Software** in the Node Properties panel (or use the corresponding action in the node context menu).
4. A confirmation dialog appears asking: "Would you like to update the WATCHOUT version of the selected nodes?"
5. Confirm to begin the update.

:::warning
The node will **restart** after a successful installation. During the restart, the node is temporarily inaccessible and any active playback on that node will be interrupted. Additionally, manual actions may be required to start WATCHOUT Manager on the node after the update.
:::

### Update Process

When you confirm the update, the following occurs:

1. **File transfer** — Producer transfers the update package to the target node over the network.
2. **Installation** — the update is installed on the target node, replacing the existing WATCHOUT software.
3. **Automatic restart** — the node restarts its services (or the entire machine, depending on the update).
4. **Reconnection** — after the restart, the node reappears in the Nodes window. Verify that it now reports the same version as your Producer.

### Switching to WATCHOUT 6

For installations that need to revert to WATCHOUT 6 operation, WATCHOUT provides a **Switch to WATCHOUT 6** option:

1. Select the target node(s) in the Nodes window.
2. Click **Switch to WATCHOUT 6** in the Node Properties actions.
3. Confirm the dialog: "Do you want to switch the selected nodes to use WATCHOUT 6? This will restart the machine(s)."
4. The node will reconfigure its NTP settings and perform a **full machine restart** to activate WATCHOUT 6.

:::note
Switching to WATCHOUT 6 is a machine-level operation that triggers a full reboot, not just a service restart. The machine must have WATCHOUT 6 software already installed.
:::

### Best Practices

- **Update during controlled downtime** — never update nodes during a live show. Schedule updates for maintenance windows when playback interruption is acceptable.
- **Update all nodes at once** — select all nodes that need updating and push the update simultaneously to minimize the window of version mismatch.
- **Verify after update** — after all nodes restart, check the Nodes window to confirm every node reports the same version and no version mismatch warnings remain.
- **Keep a backup installer** — retain a copy of the previous version's installer in case you need to roll back.
