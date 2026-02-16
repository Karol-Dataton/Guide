---
badge: Jacquie
badge: JME
badge: Karol
---

## Show Properties

Every show carries a set of properties that define how it behaves globally—settings that affect all timelines, all displays, and all output behavior. These properties establish the fundamental parameters under which your entire production operates.

### Accessing Show Properties

Show properties are accessible through the **Properties** panel when no specific element is selected. The properties panel displays all configurable settings organized into logical sections.

## General

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
- **Custom** – Specify any frame rate using frequency and clock divisor values

When selecting **Custom**, you can specify the exact frequency (numerator) and clock divisor (denominator). The clock divisor options are **1** (for integer frame rates) or **1.001** (for NTSC-compatible fractional rates).

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

### Genlock SDI

The **Genlock SDI** option enables hardware synchronization for outputs using SDI (Serial Digital Interface) connections. When enabled, WATCHOUT locks video output timing to an external reference signal.

| State | Use Case |
|-------|----------|
| **Enabled** | Synchronized multi-display setups with SDI infrastructure |
| **Disabled** | Standard software-timed output |

Genlock ensures frame-accurate synchronization across multiple displays, eliminating tearing or timing drift. This requires compatible SDI hardware with genlock input capability.

## Hardware Sync Groups

**Hardware Sync Groups** coordinate playback timing across multiple display servers. By grouping nodes together, you ensure their timelines run in lockstep, which is essential for seamless multi-display presentations.

### Managing Sync Groups

To create a new sync group:
1. Click **Add Group**
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

## Audio Bus

The **Audio Bus** section lets you configure the number and names of audio buses used in the show.

- **Count** – Set the number of audio buses available for routing audio output.
- **Bus Names** – Each bus is listed and can be renamed by clicking on it. The default buses are **Left** and **Right**.

## Default

The **Default** section controls the default behavior applied to newly created cues.

### Image Duration

Sets the default duration for image cues when they are added to a timeline.

### Use Last Fade

When **Use Last Fade** is enabled, newly created cues inherit the fade-in and fade-out settings from the most recently created cue. When disabled, the explicit fade-in and fade-out values below are used.

### Fade In / Fade Out

Configures the default fade-in and fade-out duration and transition curve for new cues. These fields are disabled when **Use Last Fade** is enabled.

### Default Anchor

The **Default Anchor** determines the reference point for newly created media cues. When you add a media cue to a timeline, this anchor point defines which part of the media aligns with the specified position.

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

## Warp

The **Warp** section controls defaults for warp geometry editing.

- **New Warp Handles Should Have Fixed Length** – When enabled, new warp control handles are created with a fixed pixel length rather than being free-form. You can specify the handle length in pixels.
- **New Warp Points Should be Smooth** – When enabled, new warp points are created with smooth (continuous) tangent handles.

## NDI®

The **NDI®** section manages NDI network discovery configuration.

### NDI® Extra IPs

A list of additional IP addresses for NDI source discovery. This is useful when NDI sources are on different subnets that are not automatically discovered via mDNS.

You can add, edit, or remove IP addresses from the list using the corresponding buttons.

## Show Info

The **Show Info** section provides a read-only overview of the current show, including:

- **Statistics** – Total cue counts broken down by type (media, control, output, variable, comment), timeline details with per-timeline cue counts and durations, composition count, and display counts by type (GPU, NDI, SDI, virtual).
- **Assets** – Total asset count broken down by type (image, video, audio, composition, display data, model, EDID, ArtNet fixture, ArtNet recording, font, SVG).
- **Technical Details** – Show name, creation date, file path, file size, and last modified date.

If a property change becomes necessary during a live show, pause playback to a safe state before making adjustments. The brief transition is preferable to unexpected disruptions during active content playback.

