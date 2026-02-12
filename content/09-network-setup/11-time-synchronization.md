---
title: "Time Synchronization"
---


## Time Synchronization

Frame-accurate multi-display playback is one of WATCHOUT's core capabilities, and it depends on all nodes sharing a precisely aligned clock. Without proper time synchronization, content on different Runner machines drifts apart — even a few milliseconds of offset can produce visible misalignment across adjacent displays.

WATCHOUT uses **NTP (Network Time Protocol)** to synchronize the system clocks of all nodes in the network. The Windows Time Service (`w32time`) on each machine handles the actual clock adjustment.

### Synchronization Modes

WATCHOUT offers two approaches to time sync management:

**WATCHOUT-managed (default):** WATCHOUT automatically configures the NTP settings on each node. One node acts as the NTP server (the time reference), and all other nodes are configured as NTP clients that synchronize to it. This is the simplest and recommended mode for most installations.

**User-managed (Advanced):** The operator manages NTP configuration externally, outside of WATCHOUT. In this mode, WATCHOUT does not modify the node's NTP settings. This is useful when the nodes are part of a larger infrastructure with its own time synchronization policy (e.g., a facility-wide NTP server).

:::warning
User-managed mode includes a warning about potential synchronization issues. If your external NTP configuration is incorrect or if nodes synchronize to different time sources, playback drift will occur. Only use this mode if you are confident in your NTP setup.
:::

### Configuring Sync Mode

To change the synchronization mode:

1. Open the **Nodes** window and select one or more nodes.
2. In **Node Properties**, look for the **Sync Settings** option.
3. The **Sync Settings** dialog presents two choices:
   - **WATCHOUT** — WATCHOUT controls time synchronization.
   - **User** — the operator controls time synchronization externally.
4. Confirm your selection.

Changing the sync mode may require a **service restart** on the affected nodes.

### NTP Server Configuration

In Node Properties, the **NTP Server** field allows you to specify which NTP server the node should synchronize to.

:::tip
Leave the NTP Server field blank to keep the node's current NTP server configuration unchanged. This is useful when you want WATCHOUT to manage the sync mode but not override an existing NTP server setting.
:::

### Designating a Time Server

In a WATCHOUT-managed setup, one node should act as the authoritative time reference. When a node is designated as the WATCHOUT time source, its NTP diff display shows **"N/A (is WATCHOUT time source)"** instead of a numeric offset — because it is the reference against which all other nodes are measured.

The time server node can itself synchronize to an external NTP source (such as `pool.ntp.org` or a facility GPS clock) for absolute time accuracy, or it can run as a free-running local clock.

### Monitoring NTP Status

Each node displays an **NTP Diff** indicator in its node information, showing the time offset (in seconds) between that node's clock and the NTP reference. This is visible in:

- The **Nodes** window overview (as a compact status indicator).
- The **Node Properties** panel under the **NTP** section, which also shows the configured NTP server address.

Under normal operation, the NTP diff should be very small (a few milliseconds or less). Larger offsets indicate synchronization problems.

### Automatic Resync

When the time offset on a node exceeds a safety threshold, WATCHOUT logs a warning: **"NTP offset is too high — resyncing."** The system then triggers an automatic resynchronization to bring the node's clock back in line with the reference.

This typically happens when a node has been offline for an extended period, when a network interruption delays NTP packets, or when the system clock has drifted due to hardware issues.

### Multiple Producer Warning

Running multiple Producer instances on the same machine can affect time synchronization. When this condition is detected, WATCHOUT displays a warning:

:::info
"Multiple Producer instances are running on this machine. This may affect time synchronization. For best results, run only one Producer per machine, or ensure all machines share the same NTP settings."
:::

The warning notes that delays may occur between time needle changes and updates when multiple instances compete for the same system clock.

### Troubleshooting Sync Issues

**Symptom:** Content on different displays appears offset by a consistent number of frames.

**Diagnostic steps:**

1. Open the **Nodes** window and check the **NTP Diff** value for each node. Values significantly above zero (e.g., more than 10ms) indicate a sync problem.
2. Verify that all nodes are configured to synchronize to the **same NTP server**.
3. Check that the NTP server node is reachable on **UDP port 123** from all client nodes.
4. Ensure the Windows Time Service (`w32time`) is running on all nodes.

**Resolutions:**

- If nodes show high NTP diff values, try restarting the Windows Time Service or triggering a manual resync.
- If using User-managed mode, verify your external NTP configuration is correct and that all nodes point to the same reference.
- Switch to WATCHOUT-managed mode for automatic configuration if your external NTP setup is unreliable.
- For hardware-level frame accuracy across multiple displays, consider using **NVIDIA Quadro Sync** (genlock/framelock) in addition to NTP synchronization.
