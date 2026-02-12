---
title: "Show Properties"
---


## Show Properties

Every show carries a set of properties that define how it behaves globally—settings that affect all timelines, all displays, and all network interactions. These properties establish the fundamental parameters under which your entire production operates.

### Accessing Show Properties

Show properties are accessible through the **Properties** panel when no specific element is selected. Alternatively, you can access them via the **Show > Show Properties** menu option. The properties panel displays all configurable settings organized into logical sections.

## General Properties

### Frame Rate

The **Frame Rate** determines the temporal resolution for all timeline operations throughout your show. This setting affects how precisely you can position cues in time and how smoothly animations play back.

**Available Presets:**
- **23.98 FPS** – Standard film rate (24000/1001)
- **24 FPS** – Film rate
- **25 FPS** – PAL/SECAM broadcast standard
- **29.97 FPS** – NTSC broadcast standard (30000/1001)
- **30 FPS** – Standard video rate
- **48 FPS** – High frame rate film
- **50 FPS** – PAL high frame rate
- **59.94 FPS** – NTSC high frame rate (60000/1001)
- **60 FPS** – High frame rate video
- **120 FPS** – Ultra high frame rate
- **Custom** – Specify any frame rate using numerator and denominator values

When selecting **Custom**, you can specify the exact numerator and denominator. The denominator options are **1** (for integer frame rates) or **1.001** (for NTSC-compatible fractional rates).

:::info
**Note:** Frame rate changes affect how timeline positions are calculated. Changing this setting mid-production may shift the timing of existing cues.
:::

### Eye Point

The **Eye Point** defines the default viewer position in 3D space, used for perspective calculations across displays. This setting consists of three coordinates:

- **X** – Horizontal position of the viewer
- **Y** – Vertical position (height) of the viewer  
- **Z** – Distance from the stage/display plane

The eye point is particularly important for:
- 3D projection mapping scenarios
- Multi-display perspective corrections
- Virtual camera positioning

### Auto Update Assets

When enabled, the **Auto Update Assets** option automatically refreshes media files when changes are detected on the Asset Manager. This is useful during content development when source files are being actively modified.

| State | Behavior |
|-------|----------|
| **Enabled** | WATCHOUT monitors source files and updates cues when files change |
| **Disabled** | Assets remain static until manually refreshed |

:::info
**Caution:** Enable this setting during content development, but consider disabling it for live shows to prevent unexpected visual changes.
:::

### SDI Genlock

The **SDI Genlock** option enables hardware synchronization for outputs using SDI (Serial Digital Interface) connections. When enabled, WATCHOUT locks video output timing to an external reference signal.

| State | Use Case |
|-------|----------|
| **Enabled** | Synchronized multi-display setups with SDI infrastructure |
| **Disabled** | Standard software-timed output |

Genlock ensures frame-accurate synchronization across multiple displays, eliminating tearing or timing drift. This requires compatible SDI hardware with genlock input capability.

### Default Anchor Position

The **Default Anchor Position** determines the reference point for newly created media cues. When you add a media cue to a timeline, this anchor point defines which part of the media aligns with the specified position.

**Available Options:**

| Position | Description |
|----------|-------------|
| **Top Left** | Upper-left corner as reference |
| **Top** | Center of top edge |
| **Top Right** | Upper-right corner |
| **Left** | Center of left edge |
| **Center** | Center of the media (default) |
| **Right** | Center of right edge |
| **Bottom Left** | Lower-left corner |
| **Bottom** | Center of bottom edge |
| **Bottom Right** | Lower-right corner |

The anchor position is represented visually using a 3×3 grid selector in the Properties panel.

## Sync Groups

**Sync Groups** coordinate playback timing across multiple display servers. By grouping nodes together, you ensure their timelines run in lockstep, which is essential for seamless multi-display presentations.

### Managing Sync Groups

To create a new sync group:
1. Click **Add Sync Group**
2. Enter a name for the group
3. Add member nodes by typing or selecting from available devices

Each sync group displays its member nodes, which can be added or removed using the multi-select chip interface. Nodes are identified by their host reference names as they appear on the network.

### When to Use Sync Groups

- **Multi-server installations** – When content spans multiple playback machines
- **Edge-blended displays** – Where precise frame alignment prevents visible seams
- **Redundant systems** – To keep backup servers synchronized with primary units

:::info
**Note:** Nodes must be network-accessible to participate in sync group coordination. Verify network connectivity before adding nodes to sync groups.
:::

## Host Configuration

Host settings define the network infrastructure supporting your show. These properties are typically configured during initial setup and bind the show to specific servers.

### Director

The **Director** host coordinates overall show playback. This is the central server that:
- Manages timeline execution
- Coordinates commands across all nodes
- Maintains master timing for the production

The Director hostname appears in the menu bar during active connections.

### Asset Manager

The **Asset Manager** host stores and distributes media files to display nodes. This server:
- Maintains the central asset library
- Handles file distribution to playback nodes
- Manages asset versioning and updates

The Asset Manager connection status enables or disables asset-related operations throughout the application.

### Time Server

The optional **Time Server** provides network time synchronization for the show. This ensures all nodes reference the same clock source for coordinated playback.

### Log Server

The optional **Log Server** receives logging output from all nodes in the production. Centralizing logs simplifies troubleshooting and provides a unified view of system activity.

## Best Practices

### During Pre-Production

Establish your show properties early in the production process:
- Set the frame rate to match your content and output requirements
- Configure host addresses for your network environment
- Define sync groups based on your display topology

### During Technical Rehearsals

Technical rehearsals often reveal issues related to show properties:
- Verify sync group membership matches physical node connections
- Confirm frame rate compatibility with content and displays
- Test genlock settings if using synchronized SDI outputs

### During Live Shows

Maintain stability during live operation:
- Avoid changing frame rate or host configuration
- Consider disabling auto-update assets to prevent surprises
- Document your property settings for quick recovery if needed

If a property change becomes necessary during a live show, pause playback to a safe state before making adjustments. The brief transition is preferable to unexpected disruptions during active content playback.

