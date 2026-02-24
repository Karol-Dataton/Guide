---
title: "Accessing WATCHPAX Config"
---

## Accessing WATCHPAX Config

**Start by finding the IP address of the WATCHPAX 64.** It should show on the WATCHOUT splash screen, but if that is unavailable, the IP address can also be found in the *Nodes* window in the Producer software on the production computer. The WATCHPAX name will be displayed, with its IP address right below it.

![WATCHPAX Config - Nodes Window](../media/wp64/synchronization_01.jpg)

Open up a web browser and visit the server address with port 3024. The WATCHPAX 64 and the production computer both need to be on the same network for WATCHPAX Config to be accessed.

![WATCHPAX Config - Browser](../media/wp64/synchronization_02.jpg)

A user interface will be displayed, showing information about all connected outputs.

![WATCHPAX Config - User Interface](../media/wp64/synchronization_03.jpg)

All channels should show a display connected under the 'Channel' label, as well as the current resolution and refresh rate.

![WATCHPAX Config - Channel Status](../media/wp64/synchronization_04.jpg)

:::info
In the case of using mosaic clusters with several WATCHPAX units, each server must be set up separately.
:::

:::warning
Hardware synchronization functions will only work if the system is set up in the correct sequence, as below.
1. EDID emulation needs to be handled first.
2. Mosaic grid should follow.
3. Hardware sync is the last one to be enabled.
:::
