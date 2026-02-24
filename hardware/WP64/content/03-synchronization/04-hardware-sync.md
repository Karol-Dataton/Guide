---
title: "Hardware Sync"
---

## Hardware Sync

**Configure hardware synchronization between multiple WATCHPAX 64 units using the NVIDIA Quadro Sync II card.**

Hardware sync ensures that all GPU outputs across multiple WATCHPAX 64 units refresh at exactly the same time, eliminating visible tearing or frame offset between displays. This is essential in multi-server video wall setups where content spans across outputs driven by different machines -- without hardware sync, each GPU runs on its own internal clock and frames will drift apart over time, causing noticeable visual seams. The NVIDIA Quadro Sync II card connects the units via dedicated sync cables and designates one output as the timing source that all others lock to.

### Physical Setup

Before configuring the sync settings, make sure the servers are correctly connected together.

* Use CAT6 or better ethernet cables.
* Status LEDs on Quadro Sync cards should be active (either orange or green color).
* Cable length should be short and of high signal integrity.
* Do not make signal loops. This is a linear chain.
* It is possible to use either of the two ethernet ports on the card when connecting the units with a cable.

The sync signal should be structured in the following manner, with the signal source in the middle of the cluster:

![Sync Signal Structure](../media/wp64/synchronization_13.jpg)

This way, the distance that the signal needs to travel is cut down, which provides a more stable signal.

### Configuring Sync Settings

Follow the steps below to configure hardware synchronization across your WATCHPAX 64 cluster. Start with the unit that will serve as the timing source, then repeat the client steps on all remaining units.

::: carousel

### Open the Setup Sync Menu

In WATCHPAX Config, select the **Setup Sync** option from the toolbar. This opens the Configure Hardware Sync window where you can assign timing roles to each display output. You must configure sync settings on each WATCHPAX 64 unit individually -- start with the unit that will act as the timing source before moving to the client units.

<div style="text-align: center; margin: 24px 0;">
  <span style="display: inline-block; padding: 8px 16px; border: 2px solid #5c6bc0; border-radius: 4px; color: #5c6bc0; font-weight: 600; font-size: 1.1em; letter-spacing: 1px; user-select: none;">SETUP SYNC</span>
</div>

:::info
Set up the machine that includes the timing server first. Only one output on one server can become the timing source -- all other outputs across all units should be set up as clients.
:::

![Configure Hardware Sync Window](../media/wp64/synchronization_15.jpg)

### Select the Timing Source

On the server that will serve as the signal source, select the display output that will act as the **timing source**. This output generates the synchronization signal that all other displays will follow. Only one display on one server in the entire cluster can be the timing source. If you are configuring a client unit (not the source), skip this step and proceed to the next slide.

### Set Remaining Displays as Clients

Select all remaining display outputs and set them as **clients**. Client displays receive and lock to the timing signal from the source. This applies to every output on the source server that is not the timing source, as well as every output on all other servers in the cluster. Make sure no display is left unconfigured -- any output without a sync role may drift out of alignment.

### Apply Sync and Confirm

Click **Apply Sync** to write the synchronization configuration to the hardware. Wait for a confirmation message to appear indicating that the settings were applied successfully. If the confirmation does not appear, verify that the physical cabling is correct and that the Quadro Sync card LEDs are active. Repeat the configuration process on each remaining WATCHPAX 64 unit in the cluster, setting all their outputs as clients.

![Apply Sync Confirmation](../media/wp64/synchronization_16.jpg)

### Verify the Configuration

After all units have been configured, you can verify the sync status. The diagram below shows a typical setup for a 4-server cluster. The current sync configuration for each unit can be viewed in the **Hardware Synchronization** section of WATCHPAX Config. Confirm that one output shows as the timing source and all others show as clients with a locked status.

![Typical 4-Server Setup](../media/wp64/synchronization_17.jpg)

![Hardware Synchronization Status](../media/wp64/synchronization_18.jpg)

:::
