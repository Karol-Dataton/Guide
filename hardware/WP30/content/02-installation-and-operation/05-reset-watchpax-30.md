---
title: "Reset WATCHPAX 30"
---

## Reset WATCHPAX 30

**There are occasions when you may want to reset a WATCHPAX 30**, for example, if the unit has been corrupted, or if it is a rental unit and user-specific info has to be removed between rentals.

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

The reset menu is hidden by design in order to avoid accidental resets or misuse. To reset your WATCHPAX 30 device, follow the steps below.

::: carousel

### Power Off the WATCHPAX 30

Shut down the WATCHPAX 30 by pressing the power button or unplugging the power cord. Wait until the unit has fully powered down before proceeding. This ensures the operating system has fully shut down and no files are being written to disk.

### Disconnect USB Devices

Remove all USB devices currently connected to the WATCHPAX 30, including mice, flash drives, dongles, and any other peripherals. External USB devices can interfere with the reset process or cause unexpected behavior during system reconfiguration.

### Connect a Keyboard

Connect a USB keyboard to one of the USB ports on the WATCHPAX 30. You will need the keyboard to interact with the reset menu during the boot sequence. Any standard wired USB keyboard will work. A wireless keyboard with a USB receiver is also acceptable. Make sure the keyboard is securely connected before powering on.

### Connect a Display

Connect at least one display device to one of the HDMI outputs on the WATCHPAX 30. The display is required so you can see the boot countdown and the reset menu. If you have multiple displays available, connecting just one is sufficient for the reset process. The display must be powered on and set to the correct input source.

### Power On the WATCHPAX 30

Power on the WATCHPAX 30 by inserting the power cord or using the on/off switch. The unit will begin its startup sequence and a five-second countdown will appear in the top-left corner of the connected display. You need to act quickly during this window, so keep your hand on the keyboard and be ready to press **Esc** as soon as the countdown appears.

### Press Esc During the Countdown

A five-second countdown appears in the top-left corner of the display. **Press the Esc key on the keyboard before the countdown reaches zero** to enter the reset menu.

![Reset Countdown](../media/wp30/installationscreens_01.jpg)

:::info
If you don't see a counter, it means the display device is slow to lock to the output signal. In that case, press Esc repeatedly right after power-on. The key presses will be registered even if the display has not yet shown the countdown, and the reset menu will appear once the display locks.
:::

### Select a Reset Option

Once you have entered the reset menu, you will see the available reset options listed on screen. Use the **arrow keys** on the keyboard to highlight the desired option, then **press Enter** to confirm:

* **Reset and keep user data** -- resets system settings but retains your shows, media, and WATCHOUT configuration.
* **Reset to factory settings** -- erases everything and restores the unit to its original factory state.

:::warning
There will be no confirmation prompt -- the reset process starts immediately after you press Enter! Double-check that you have selected the correct option before confirming.
:::

![Reset Menu](../media/wp30/installationscreens_02.jpg)

### Reset in Progress

The reset process begins immediately after your selection, and progress indicators will be shown on the connected display. Depending on the reset level you chose, this process may take several minutes as the system partitions are rewritten. Do not press any keys, disconnect the power cable, or unplug the display while the reset is in progress.

![Reset in Progress](../media/wp30/installation_04.jpg)

### System Reconfiguration

After the initial reset completes, the WATCHPAX 30 will automatically restart several times in order to reconfigure the operating system and hardware settings. This is normal behavior -- each restart configures a different component of the system. The number of restarts may vary, but typically the unit will restart two to three times.

![Reset Restarting](../media/wp30/installation_05.jpg)

:::warning
Do not power off the unit during the configuration process! Interrupting the reconfiguration can leave the system in an incomplete state and may require you to repeat the entire reset procedure.
:::

### Reset Complete

WATCHOUT will start automatically when the entire reset and reconfiguration process is complete. You will see the standard WATCHOUT display output with the system image version number shown after the serial number -- this confirms the reset was successful. You can now disconnect the keyboard, reconnect your USB devices, and resume normal operation.

![Reset Complete](../media/wp30/installation_06.jpg)

:::
