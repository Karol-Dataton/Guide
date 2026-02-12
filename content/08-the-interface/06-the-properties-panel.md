---
title: "The Properties Panel"
---


## The Properties Panel

The **Properties** panel is a context-sensitive inspector that displays settings for whatever is currently selected—displays, cues, layers, tweens, assets, or application preferences.

### Dynamic Content

The Properties panel automatically adapts to show relevant settings based on your current selection:

| Selection | Properties Shown |
| --- | --- |
| **No selection** | Application Preferences |
| **Cue** | Cue properties (position, timing, effects) |
| **Layer** | Layer settings (name, key and fill options) |
| **Tween** | Tween curve properties |
| **Tween Point** | Individual keyframe values |
| **Asset** | Media file information |
| **Display** | Display configuration |
| **Device** | Network device settings |
| **Stage (background)** | Stage display settings |

### Accessing Properties

*   **Automatic** – Select any item and its properties appear
*   **Double-click** – Double-click items in Stage or Timeline to focus the Properties panel
*   **Keyboard** – Press `Enter` with selection to shift focus to Properties
*   **Menu** – **Window → Properties** or `Ctrl+P`

### Property Categories

Properties are organized into collapsible categories for easier navigation. Each category can be expanded or collapsed by clicking its header.

#### Cue Properties

When a media cue is selected:

*   **Transform**
    *   Position (X, Y, Z)
    *   Scale (Width, Height, or unified)
    *   Rotation (Roll, Pitch, Yaw)
    *   Anchor Point

*   **Appearance**
    *   Opacity
    *   Crop (Top, Bottom, Left, Right)
    *   Blur

*   **Color**
    *   Brightness
    *   Contrast
    *   Gamma
    *   Hue
    *   Saturation
    *   Invert
    *   RGB Offset and Gain

*   **Timing**
    *   Start Time
    *   Duration
    *   In Point (media offset)
    *   Play Rate

*   **Audio**
    *   Volume
    *   Pan
    *   Mute

#### Layer Properties

When a layer is selected:

*   **Name** – Custom layer identifier
*   **Key and Fill** – Enable external keying mode
    *   Mode: Luma, Alpha, Luma Inverted, Alpha Inverted
    *   Associated fill layer selection

#### Timeline Properties

When a timeline is selected (via layer):

*   **Timeline Name**
*   **Duration**
*   **Frame Rate**

#### Asset Properties

When an asset is selected:

*   **File Information** – Path, size, format
*   **Media Specifications** – Resolution, duration, codec
*   **Optimization** – Target format settings

#### Display Properties

When a display is selected on the Stage:

*   **Name** – Display identifier
*   **Resolution** – Output dimensions
*   **Position** – Location on the Stage canvas
*   **Rotation** – Display orientation
*   **Host Assignment** – Which display server renders this output
*   **Edge Blending** – Overlap and blend settings
*   **Masking** – Output mask configuration

### Input Fields

Property values can be edited using various input types:

*   **Text Fields** – Type values directly; press `Enter` to confirm
*   **Number Fields** – Type or use increment buttons; drag to scrub values
*   **Sliders** – Drag for continuous adjustment
*   **Color Pickers** – Click the swatch to open the color selector
*   **Dropdowns** – Click to select from available options
*   **Toggles** – Click to enable/disable boolean settings

### Scroll Position Memory

The Properties panel remembers scroll position for each property page type, so switching between different selections maintains your viewing position within similar content.

### Focus Behavior

When the Properties panel receives focus:

*   Tab navigation cycles through editable fields
*   Press `Enter` to return focus to the previous window
*   Changes apply immediately when values are modified

