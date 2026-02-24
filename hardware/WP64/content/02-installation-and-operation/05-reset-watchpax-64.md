---
title: "Reset WATCHPAX 64"
---

## Reset WATCHPAX 64

**There are occasions when you may want to reset a WATCHPAX 64**, for example, if the unit has been corrupted, or if it is a rental unit and user-specific info has to be removed between rentals.

There are two levels of reset:

* **Reset and keep user data.** This resets the operating system, display, GPU and capture settings but retains user data, such as shows and media.
* **Reset to factory settings.** This takes the unit all the way back to the original factory settings and you lose all user data.

:::warning
A reset, regardless of level, is an advanced measure. Make sure you are fully aware of what data you lose when you reset!
:::

### Reset and Keep User Data

This option resets the system partitions but keeps all user data such as:

* Shows
* Media
* WATCHOUT settings
* Startup script
  - Network settings
  - Timecode settings

Driver-related settings will be reset to default factory settings such as:

* Display settings
  - Display mode

### Reset to Factory Settings

This resets all partitions to factory settings and all user data will be lost. This level of reset is suitable when you want to remove all settings between projects.

### Reset Procedure

The reset menu is hidden by design in order to avoid accidental resets or misuse. To reset your WATCHPAX 64 device, follow these steps:

1. Power off the WATCHPAX 64.
2. Disconnect any USB devices.
3. Now connect a keyboard to one of the USB ports.
4. Connect at least one display device to a DisplayPort output.
5. Power on the WATCHPAX 64.
6. During startup, you will see a five-second countdown in the top left corner of the display. Press Esc during this countdown.

![Reset Countdown](../media/wp64/installationscreens_01.jpg)

:::info
If you don't see a counter, it means the display device is slow to lock to the output. In that case, press Esc repeatedly after power-on to move to the menu below.
:::

7. Select the desired reset option in the menu that appears, and press Enter.

:::warning
There will be no confirmation -- the reset process starts immediately!
:::

![Reset Menu](../media/wp64/installationscreens_02.jpg)

8. As noted above, the reset process starts immediately, providing some visual feedback.

![Reset in Progress](../media/wp64/installation_04.jpg)

9. The WATCHPAX 64 will restart several times in order to configure the operating system and hardware.

![Reset Restarting](../media/wp64/installation_05.jpg)

:::warning
Do not power off the unit during the configuration process!
:::

10. WATCHOUT will start when the process is complete. The system image version will be appended after the serial number.

![Reset Complete](../media/wp64/installation_06.jpg)
