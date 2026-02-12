---
title: "The Network Window"
---


## The Network Window

The **Network** window shows all WATCHOUT devices on your network and their status. It provides centralized management of display servers, directors, asset managers, and other network services.

### Device Discovery

WATCHOUT uses **automatic discovery** to find devices on your local network. All WATCHOUT 7 services running on the same subnet automatically appear in the Network window without manual configuration.

The device list refreshes periodically (every few seconds) to reflect current status.

### Device Table

The Network window displays devices in a table with the following columns:

| Column | Description |
| --- | --- |
| **Name** | Device hostname or identifier |
| **Services** | Icons indicating available services (Director, Display, Asset Manager) |
| **Address** | IP address of the device |
| **Version** | WATCHOUT software version (shown in toolbar) |

### Device Status

Devices show visual status indicators:

*   **Online** – Device is connected and responsive
*   **Active in Show** – Device is assigned to the current show
*   **Offline** – Device is not responding

The text styling changes based on status:

*   Normal text – Online and ready
*   Dimmed text – Offline or unavailable

### Service Icons

Each device displays icons for its available services:

| Icon | Service | Description |
| --- | --- | --- |
| Director | Playback control and synchronization master |
| Display | Video rendering and output |
| Asset Manager | Media file management and optimization |
| Audio | Audio output device |
| Capture | Video input/capture device |

### Filtering Devices

Use the filter dropdown to narrow the device list:

| Filter | Shows |
| --- | --- |
| **All** | Every discovered device |
| **Active in Show** | Only devices currently assigned to the show |
| **Referred by Show** | Devices referenced in show configuration |

### Context Menu Actions

Right-click a device or use the window menu button to access:

#### Device Management

*   **Add Display** – Create a new display output on this device
*   **Add 3D Projector** – Add a 3D mapping projector
*   **Add Audio Device** – Configure audio output
*   **Add Capture** – Set up video input

#### Director Configuration

*   **Use as Director** – Set the selected device as the show's Director
*   **Clear Show from Director** – Remove show data from the Director

#### Asset Manager Configuration

*   **Use as Asset Manager** – Set the selected device for asset management
*   **Close Asset Manager** – Disconnect from current Asset Manager

#### Monitoring

*   **Performance** – Open hardware performance monitor for the device

### Multi-Show Indication

When a device is serving multiple shows simultaneously, a special indicator appears. This helps identify shared resources in multi-show environments.

### Properties

Select a device and view detailed information in the **Properties** panel:

*   **Device Name** – Hostname and identifier
*   **IP Address** – Network address
*   **Services** – List of available services
*   **Version** – Software version information
*   **Status** – Connection and activity state

### Assigning Displays

To assign a display to a device:

1. Create a display on the Stage
2. Open the display's Properties
3. Select the target device from the **Host** dropdown

Or right-click the device in the Network window and choose **Add Display**.

### Refresh

Click the refresh button to manually update the device list. This triggers an immediate network scan for WATCHOUT devices.

