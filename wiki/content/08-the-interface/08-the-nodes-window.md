---
title: "The Devices Window"
---


## The Devices Window

The Devices window manages the output devices in your show — displays, virtual displays, audio devices, and capture sources. While the Nodes window focuses on the physical machines running WATCHOUT services, the Devices window focuses on the logical output devices configured within your show. It provides a filtered, sortable list of all devices, with quick access to enable/disable, warp editing, mask editing, and device properties.

Open the Devices window from **Window > Devices** or press **Ctrl+Alt+D**.

[[WIDGET:devices-window]]

### Device List

The Devices window displays all output devices in a table with two columns:

| Column | Description |
|---|---|
| **Name** | The device name, preceded by a type icon. Warning indicators appear next to the name when issues are detected (such as an offline host or configuration problem). |
| **Host** | The network node hosting this device. Virtual displays show "Virtual" instead of a node name. |

### Device Type Icons

Each device displays an icon indicating its type:

| Icon | Device Type |
|---|---|
| Monitor | Display (physical video output) |
| Monitor (shimmer) | Virtual Display (software-rendered for compositions) |
| Volume/Speaker | Audio device |
| Cast/Capture | Capture source (video input) |

### Filtering

A dropdown filter at the top of the window lets you narrow the device list:

| Filter | Shows |
|---|---|
| **All** | Every device in the show |
| **Display** | Physical display outputs only |
| **Virtual** | Virtual displays only |
| **Capture** | Capture sources only |
| **Audio** | Audio devices only |

An additional **tier filter** is available to show only devices assigned to specific stage tiers.

### Color Coding

Display devices show a colored left border matching their assigned display color. This color is the same one visible on the Stage canvas, making it easy to visually match devices between the Devices window and the Stage view. Assign or change a display's color in its properties.

### Host Grouping

When the device list is sorted by Host, devices assigned to the same node display a connecting bracket in the left margin. This visual grouping makes it easy to see which outputs are rendered by the same machine — useful when planning hardware load distribution or troubleshooting node-specific issues.

### Selection

- **Click** a device to select it
- **Shift+Click** to select a range
- **Ctrl+Click** to toggle individual devices

Selecting a device updates the Properties panel with that device's settings, and highlights the corresponding display on the Stage.

### Context Menu

Right-click a device (or the window background) to access:

| Action | Description |
|---|---|
| **Enable / Disable** | Toggle the device's output on or off |
| **Edit Warp** | Open the warp geometry editor for this display. See [Warp Geometry](../03-displays-and-outputs/07-warp-geometry.md). |
| **Edit Mask** | Open the mask editor for this display. See [Display Masks](../03-displays-and-outputs/08-display-masks.md). |
| **Cut / Copy / Paste / Delete** | Standard clipboard operations for devices |
| **Add Capture** | Create a new capture source |
| **Add Virtual Display** | Create a new virtual display |

### Adding Devices

New devices can be created from several places in the application:

- **Devices window context menu** — right-click and choose Add Capture or Add Virtual Display
- **Stage menu** — Add Display, Add Virtual Display, Add 3D Projector, Create Display Grid
- **Nodes window context menu** — right-click a node and choose Add Display, Add 3D Projector, Add Audio Device, or Add Capture Device. The new device is automatically assigned to that node.

### Editing Devices

- **Double-click** a device to open its properties in the Properties panel
- **Select** a device and view/edit its properties in the Properties panel

Device properties vary by type. For a full reference of display, audio, and capture properties, see [The Properties Panel](06-the-properties-panel.md).

### Drag and Drop

The Devices window supports drag-and-drop interactions:

- **Drag devices** from the Devices window to the Timeline or Cue List to create cues that source from those devices (useful for virtual displays and capture sources)
- **Reorder** devices by dragging them within the list

### Relationship to Other Windows

- **Stage** — displays listed in the Devices window correspond to displays shown on the Stage canvas. Selecting a device here highlights it on the Stage, and vice versa. See [The Stage Window](02-the-stage-window.md).
- **Nodes** — the Host column shows which node each device is assigned to. Create new devices from the Nodes window to automatically assign them to a node. See [The Nodes Window](07-the-network-window.md).
- **Properties** — selecting a device loads its full property set (placement, output configuration, warp, mask, calibration) in the Properties panel. See [The Properties Panel](06-the-properties-panel.md).
- **Timeline** — virtual displays and capture sources can be dragged from Devices to the Timeline to create media cues. See [The Timeline Window](03-the-timeline-window.md).
