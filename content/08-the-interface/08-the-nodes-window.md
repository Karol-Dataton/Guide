---
title: "The Nodes Window"
---


## The Nodes Window

The **Nodes** window (also known as the Devices & Network window) provides a unified view of your show's output devices and the WATCHOUT nodes available on your network. It consists of two panes that work together to help you configure and monitor your display system.

### Window Layout

The Nodes window is split into two resizable panes:

| Pane | Purpose |
| --- | --- |
| **Devices** (left) | Output devices assigned to your show |
| **Network** (right) | WATCHOUT nodes discovered on the network |

Drag the splitter between panes to adjust their relative sizes.

## Devices Pane

The **Devices** pane lists all output devices configured in your show, including displays, audio devices, and capture sources.

### Device Table

| Column | Description |
| --- | --- |
| **Name** | Device name with type icon and optional warning indicators |
| **Host** | The network node hosting this device, or "Virtual" for virtual displays |

### Device Types

Each device displays an icon indicating its type:

| Icon | Type | Description |
| --- | --- | --- |
| Monitor | Display | Physical video output |
| Monitor (shimmer) | Virtual Display | Software-rendered output for compositions |
| Volume | Audio | Audio output device |
| Cast | Capture | Video input source |

### Filtering Devices

Use the dropdown filter to narrow the device list:

| Filter | Shows |
| --- | --- |
| **All** | Every device in the show |
| **Display** | Physical display outputs only |
| **Virtual** | Virtual displays only |
| **Capture** | Video capture sources |
| **Audio** | Audio output devices |

### Device Status Indicators

Devices may display warning icons for issues such as:

*   Missing host assignment
*   Offline host
*   Configuration errors
*   Resolution mismatches

Hover over warning icons to see details.

### Color Coding

Display devices show a colored left border matching their assigned color, making it easy to identify displays across the Stage and Devices views.

### Host Grouping

When sorted by Host, devices on the same node display a connecting bracket in the left margin, visually grouping outputs by their rendering machine.

### Context Menu Actions

Right-click devices to access:

*   **Enable/Disable Device** – Toggle device output
*   **Edit Warp** – Open warp correction editor
*   **Edit Mask** – Open mask editor
*   **Cut/Copy/Paste/Delete** – Standard editing operations
*   **Add Capture** – Create a new capture source
*   **Add Virtual Display** – Create a new virtual display

### Adding Devices

Create new devices using:

*   **Right-click menu** in the Devices pane
*   **Stage menu → Add Display/Projector**
*   **Right-click a node** in the Network pane

### Editing Devices

*   **Double-click** a device to open its properties
*   **Drag** devices to reorder (when enabled)
*   Select multiple devices with `Shift+Click` or `Ctrl+Click`

## Network Pane

The **Network** pane displays all WATCHOUT nodes discovered on your local network. For detailed information, see [The Network Window](06-the-network-window.md).

### Quick Overview

The Network pane shows:

*   **Node name** – Hostname or identifier
*   **Services** – Available WATCHOUT services (Director, Runner, Asset Manager)
*   **Address** – IP address

### Assigning Devices to Nodes

1. Select a node in the Network pane
2. Right-click and choose **Add Display** or **Add Audio Device**
3. The new device is automatically assigned to that node

### Monitoring Node Status

Nodes display real-time status:

*   Normal text – Online and responsive
*   Dimmed text – Offline or not responding recently

## Workflow Tips

### Efficient Device Management

1. **Filter by type** when working with many devices
2. **Sort by Host** to see device groupings per node
3. **Use color coding** to match devices between Stage and Devices views

### Multi-Selection

Select multiple devices to:

*   Enable or disable as a group
*   Move to a different host
*   Delete in bulk

### Drag and Drop

Drag devices from the Devices pane to the Stage to reposition displays visually.

