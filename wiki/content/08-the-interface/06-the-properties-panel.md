---
title: "The Properties Panel"
---


## The Properties Panel

The Properties panel is a context-sensitive inspector that displays settings for whatever is currently selected in the application. Select a cue, and it shows cue properties. Select a display, and it shows display configuration. Select nothing, and it shows the show-level preferences. This single window adapts to every selection type in the application, making it the central place for viewing and editing the details of any object in your show.

The Properties panel is always available from **Window > Properties**. It updates automatically whenever the selection changes in the Stage, Timeline, Cue List, Assets, Devices, or any other window.

[[WIDGET:properties-panel]]

### What the Properties Panel Shows

The content of the Properties panel depends entirely on what is selected:

| Selection | Properties Shown |
|---|---|
| **Nothing selected** | Show Preferences (frame rate, defaults, warp settings, NDI, audio buses, show information) |
| **Cue** | Cue properties (general, placement, playback, fade, effects, presentation, conditions) |
| **Layer** | Layer properties (name, key and fill mode) |
| **Timeline** | Timeline properties (name, color, duration, stacking order, auto-run, trigger expressions) |
| **Tween curve** | Tween properties |
| **Tween point** | Individual keyframe values |
| **Asset** | Asset properties (file information, media specifications, codec settings) |
| **Display** | Display properties (name, node, placement, output type, resolution, warp, mask, calibration) |
| **Audio device** | Audio device properties (type, device selection, channels, format, latency) |
| **Capture device** | Capture properties (name, dimensions, sources) |
| **Stage background** | Stage properties (tier visibility filters, background pattern and color) |
| **Warp junction** | Warp point properties (position offset, Bezier handles, smooth toggle) |
| **Mask layer** | Mask layer properties |
| **Mask junction** | Mask point properties |
| **Variable/Input** | Variable properties |

### Cue Properties

When a media cue is selected, the Properties panel organizes its settings into collapsible sections:

#### General

- **Name** — custom cue name
- **Start** — start time in the timeline
- **Duration** — cue length
- **Pre-roll** — time before the cue becomes visible during which media begins loading
- **Cue Group** — assign the cue to a cue set for variant management
- **Media Asset** — the source asset for this cue
- **Color** — optional color tag for visual identification in the Timeline

#### Placement

- **Position** — X, Y (and Z for 3D) coordinates on the Stage
- **Anchor Point** — the reference point for positioning and rotation

#### SVG Render Size

For SVG assets, controls the rendered resolution of the vector graphic.

#### Playback

- **Free Running** — when enabled, the cue plays independently of the timeline transport
- **Looping** — repeats the media when it reaches the end
- **In-Time** — offset into the media file where playback begins
- **Speed** — playback rate multiplier
- **Auto-Adjust Duration** — automatically match the cue duration to the media length

#### Fade In / Fade Out

- **Enable** — toggle fade on or off
- **Transition** — fade curve type
- **Duration** — fade length

#### Control

For control cues (play, pause, stop):
- **Target Timelines** — which timelines the control affects
- **Jump** — time position to jump to
- **State** — the playback state to trigger

#### Surface / Size

For 3D model cues, controls the geometry surface and scaling.

#### Channel Mapping

Audio channel routing configuration.

#### Output

For output cues, configures the external communication:
- **Protocol** — TCP, UDP, or HTTP
- **Address** — destination host
- **Port** — destination port
- **Data** — the payload to send

#### Presentation

- **Frame Blend** — smooth motion by blending frames
- **HW Acceleration** — enable GPU-accelerated decoding
- **Blend Mode** — compositing blend mode
- **Face Culling** — for 3D content, controls which faces are rendered
- **Stacking** — layer stacking behavior
- **Tiers** — stage tier assignment

#### ArtNet Fixture / ArtNet Recording

For ArtNet fixture cues, controls DMX addressing and recording.

#### Asset

- **SDR White Point** — white point mapping for standard dynamic range content

#### Marker

For comment/marker cues:
- **Description** — text note displayed in the Timeline
- **Countdown** — enable live countdown display to this marker
- **Countup** — enable countup display from this marker

#### Chroma Key / Key and Fill

Keying configuration for compositing effects.

#### Conditions

- **Enabled/Disabled** — toggle the cue on or off
- **Expression** — a conditional expression that controls whether the cue is active

### Display Properties

When a display is selected on the Stage, the Properties panel shows:

#### General

- **Name** — display identifier
- **Node** — the network node assigned to render this display
- **Enable/Disable** — toggle the display output
- **Color** — color tag for identification across the Stage and Devices windows

#### Placement

For flat displays:
- **Position** — X, Y coordinates on the Stage

For 3D projectors:
- **Eye Position** — projector location in 3D space
- **Target** — where the projector is aimed
- **Roll** — rotational roll angle
- **Lens Shift** — horizontal and vertical lens offset

#### Presentation

- **Tiers** — which stage tiers this display renders

#### Output

- **Type** — GPU, SDI, NDI, or Virtual
- **Resolution** — output width and height
- **Color Depth** — bits per channel
- **Color Space** — output color space
- **Interlaced** — interlaced output toggle
- **Max Quality** — quality ceiling setting
- **Delay** — output delay in frames
- **EDID** — display identification data

#### Warp / Mask

- **Warp** — enable and edit warp geometry corrections. See [Warp Geometry](../03-displays-and-outputs/07-warp-geometry.md).
- **Mask** — soft edge and custom mask configuration. See [Display Masks](../03-displays-and-outputs/08-display-masks.md).

#### Calibration / White Point / Test Pattern

Projector calibration settings, white point adjustment, and test pattern mode.

### Audio Device Properties

- **Type** — WASAPI, WASAPI Exclusive, Dante, or ASIO
- **Device** — specific audio output device selection
- **Channels** — channel count
- **Format** — audio format and sample rate
- **Latency** — output latency configuration

### Timeline Properties

- **Name** — timeline name
- **Color** — optional color (clearable)
- **Duration** — timeline length
- **Stacking Order** — Timeline Order or Always on Top
- **Auto Run** — start playback automatically when the show loads
- **Triggers** (collapsed by default) — Play Expression, Pause Expression, Stop Expression

### Layer Properties

- **Name** — custom layer name
- **Key and Fill** — mode selection (Luma, Alpha, Luma Inverted, Alpha Inverted) and associated fill layer

### Show Preferences

When nothing is selected, the Properties panel shows global show settings. For a summary of all preference sections, see [Main Window Overview](01-main-window-overview.md).

### Editing Values

Property values can be edited using various input types depending on the data:

| Input Type | Usage |
|---|---|
| **Text fields** | Type values directly; press Enter to confirm |
| **Number fields** | Type a value or use increment/decrement buttons; drag to scrub |
| **Sliders** | Drag for continuous adjustment |
| **Color pickers** | Click the color swatch to open the color selector |
| **Dropdowns** | Click to select from available options |
| **Toggles** | Click to enable or disable |

Changes apply immediately when values are modified. There is no separate "apply" step.

### Navigation and Focus

- **Tab** cycles through editable fields within the Properties panel
- The panel finds the first editable field automatically when it receives focus
- **Scroll position memory** — the Properties panel remembers your scroll position for each type of property page, so switching between similar selections (e.g., between two cues) maintains your viewing position

### Collapsible Sections

Properties are organized into collapsible sections with headers. Click a section header to expand or collapse it. This lets you focus on the settings you need and hide the rest, which is especially useful for property pages with many sections (such as Cue Properties).
