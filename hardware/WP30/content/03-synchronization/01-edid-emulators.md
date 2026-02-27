---
title: "EDID Emulators"
---

## EDID Emulators

**Extended Display Identification Data (EDID) is a standardized data format for a display, such as a projector, screen or monitor, to describe its performance capability to a video source.** The information exchanged in an EDID handshake includes the resolution, refresh rates and timings available in the display. The WATCHPAX 30 ships with four EDID emulators -- one for each HDMI output.

### Installation

Plug the emulator directly to the HDMI outputs on the back of the WATCHPAX 30. Connect the display's cable to the emulator. The emulator will be in default mode.

:::info
If you change the resolution to one supported by the emulator, but not by the display, the display will not work.
:::

### Backup Mode

Disconnect the cable between the display and the emulator. The emulator will turn on backup mode and its LED will start flashing. When backup mode is turned on, two different modes can be selected:

* **Copy display EDID** -- while the LED is flashing, connect the display to the emulator. The emulator will copy the EDID data. The data will be permanently stored in the emulator, even when it is removed from the video source.
* **Reset to default settings** -- while the LED is flashing, do not connect anything to the emulator. The LED will stop flashing after 10 seconds, and the emulator will recover to the default factory settings.

:::warning
When the emulator is connected to the running WATCHPAX 30, do not unplug the connected monitor cable, otherwise the stored EDID data can be erased.
:::

### Supported Resolutions and Timings

#### VESA Block Established Timings I

| Resolution | Standard |
|---|---|
| 720 x 400 @ 70Hz | IBM, VGA |
| 640 x 480 @ 60Hz | IBM, VGA |
| 640 x 480 @ 67Hz | Apple, Mac II |
| 640 x 480 @ 72Hz | VESA |
| 640 x 480 @ 75Hz | VESA |
| 800 x 600 @ 56Hz | VESA |
| 800 x 600 @ 60Hz | VESA |

#### VESA Block Established Timings II

| Resolution | Standard |
|---|---|
| 800 x 600 @ 72Hz | VESA |
| 800 x 600 @ 75Hz | VESA |
| 832 x 624 @ 75Hz | Apple, Mac II |
| 1024 x 768 @ 60Hz | VESA |
| 1024 x 768 @ 70Hz | VESA |
| 1024 x 768 @ 75Hz | VESA |
| 1280 x 1024 @ 75Hz | VESA |

#### VESA Block Manufacturer's Timings

| Resolution | Standard |
|---|---|
| 1152 x 870 @ 75Hz | Apple, Mac II |

#### VESA Block Standard Timings

| Resolution | Aspect Ratio |
|---|---|
| 1152 x 864 @ 75 Hz | 4:3 |
| 1280 x 1024 @ 60 Hz | 5:4 |
| 1280 x 960 @ 60 Hz | 4:3 |
| 1440 x 900 @ 60 Hz | 16:10 |
| 1600 x 1200 @ 60 Hz | 4:3 |
| 1680 x 1050 @ 60 Hz | 16:10 |
| 1920 x 1080 @ 60 Hz | 16:9 |
| 1920 x 1200 @ 60 Hz | 16:10 |

#### VESA Block Detailed Timings

| Resolution | Notes |
|---|---|
| 1920 x 1080 @ 60Hz | |
| 3840 x 2160 @ 30Hz | |
| 2560 x 1600 @ 60Hz | |

#### CEA Block

| Resolution | Format |
|---|---|
| 3840 x 2160p @ 60Hz | |
| 3840 x 2160 @ 24Hz | 16:9 |
| 1920 x 1080p @ 59.94/60Hz | HDTV (16:9, 1:1) |
| 1920 x 1080i @ 59.94/60Hz | HDTV (16:9, 1:1) |
| 1280 x 720p @ 59.94/60Hz | HDTV (16:9, 1:1) |
| 720 x 480p @ 59.94/60Hz | EDTV (16:9, 32:27) |
| 720 x 480p @ 59.94/60Hz | EDTV (4:3, 8:9) |
| 640 x 480p @ 59.94/60Hz | EDTV (4:3, 1:1) |
| 720 x 576p @ 50Hz | EDTV (4:3, 16:15) |
| 720 x 576p @ 50Hz | EDTV (16:9, 64:45) |
| 1280 x 720p @ 50Hz | HDTV (16:9, 1:1) |
| 1920 x 1080i @ 50Hz | HDTV (16:9, 1:1) |
| 1920 x 1080p @ 50Hz | HDTV (16:9, 1:1) |
| 1440 x 480p @ 59.94/60Hz | 4:3, 4:9, 8:9 |
| 1440 x 480p @ 59.94/60Hz | 16:9, 16:27, 32:27 |
| 1440 x 576p @ 50Hz | 4:3, 8:45, 16:15 |
| 1440 x 576p @ 50Hz | 16:9, 32:45, 64:45 |
| 720 (1440) x 480i @ 59.94/60Hz | SDTV (4:3, 8:9) |
| 720 (1440) x 480i @ 59.94/60Hz | SDTV (16:9, 32:27) |
| 720 (1440) x 576i @ 50Hz | SDTV (4:3, 16:15) |
| 720 (1440) x 576i @ 50Hz | SDTV (16:9, 64:45) |
| 2560 x 1440 @ 60Hz | 16:9 |
| 1920 x 1200 @ 60Hz | 16:9 |
| 1920 x 1080 @ 60Hz | 16:9 |
