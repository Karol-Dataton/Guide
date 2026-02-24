---
title: "Hardware Sync"
---

## Hardware Sync

**Configure hardware synchronization between multiple WATCHPAX 64 units using the NVIDIA Quadro Sync II card.**

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

1. Use the *SETUP SYNC* option to create the hardware sync settings.

![Setup Sync Option](../media/wp64/synchronization_14.jpg)

:::info
Set up the machine that includes the *timing server* first. Only one output on one server can become the timing source, all other outputs should be set up as *clients*.
:::

![Configure Hardware Sync Window](../media/wp64/synchronization_15.jpg)
Example of the Configure Hardware Sync window.

2. On the server that will serve as the signal source, select the timing source display. Skip this step on the rest of the servers.

3. Select all remaining displays as clients.

4. Click *Apply sync* and wait for a confirmation message.

![Apply Sync Confirmation](../media/wp64/synchronization_16.jpg)

Typical setup for 4 display servers:

![Typical 4-Server Setup](../media/wp64/synchronization_17.jpg)

Current sync configuration can be viewed in the Hardware Synchronization section:

![Hardware Synchronization Status](../media/wp64/synchronization_18.jpg)
