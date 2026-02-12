---
title: "Test Patterns"
---


## Test Patterns

Test patterns are built-in diagnostic output modes rendered directly by the Runner on a per-display basis. They are independent of show content and timeline playback, making them essential tools for verifying display setup, signal routing, geometry correction, and color calibration before or during a production.

### Accessing Test Patterns

Test pattern controls are found in **Device Properties → Test Pattern** for any selected display. The section provides a set of output mode buttons and an additional toggle for the render info overlay.

To activate a test pattern, select the desired mode from the button group. To return to normal show output, select **None**.

### Output Modes

WATCHOUT provides five display output modes, controlled from the Test Pattern section:

- **None** — normal operation. The display renders show content from the timeline as usual. This is the default mode.
- **Muted** — the display output is suppressed (black). Show content continues to play on the timeline but is not rendered to this display's output. Use this to temporarily black out a display without stopping playback or modifying the show.
- **White** — the display renders a solid white field at full brightness. This is useful for checking projector alignment, verifying that the signal path is active, and assessing display uniformity. Because this mode ignores the warp and mask pipeline, the white field fills the entire raw output area.
- **Masked** — the display renders a solid white field with the current warp geometry and mask applied. This shows exactly which pixels are visible after all geometry correction and masking. Use it to verify that warp and mask settings are producing the expected output shape and to check for gaps or overlaps in a multi-display blended setup.
- **Pattern** — the display renders a built-in test pattern (typically a grid or alignment chart) through the full rendering pipeline including warp and mask. This is the primary diagnostic mode for verifying geometric accuracy, resolution, aspect ratio, and pixel alignment.

### Render Info Overlay

The **Render Info** toggle (available alongside the output mode buttons) enables a heads-up diagnostic overlay on the display output. When active, the Runner renders technical information directly onto the display, such as the display name, resolution, frame rate, and other runtime diagnostics.

This overlay is drawn on top of whatever output mode is currently active — whether normal show content, a test pattern, or a white field. It is useful for quickly identifying which physical output corresponds to which display in the WATCHOUT configuration, especially in large multi-display systems where it can be difficult to tell outputs apart by visual content alone.

### Common Use Cases

**Verifying signal routing:** After configuring displays and assigning output channels, switch each display to **White** mode one at a time. This confirms that the correct physical output activates for each display in the WATCHOUT configuration. If the wrong screen lights up, the channel assignment or host address needs to be corrected.

**Checking warp and mask geometry:** Use **Masked** mode to see the exact output boundary after warp correction and masking. The white field makes it easy to spot misalignment, gaps between adjacent displays, or mask edges that don't follow the physical surface. Follow up with **Pattern** mode to check for geometric distortion using the grid lines.

**Display alignment in multi-projector setups:** Switch all overlapping projectors to **Pattern** mode simultaneously. The grid patterns from adjacent displays should align at the overlap boundaries. Misalignment indicates that warp geometry or projector placement needs adjustment.

**Color uniformity checks:** Use **White** mode across all displays to compare brightness and color temperature. Differences are immediately visible and can be corrected using the per-display White Point sliders.

**Isolating content issues:** If a display appears incorrect during playback, switch it to **Muted** and then back to **None** to determine whether the issue is in the content, the display configuration, or the signal path.

### Interaction with Show Playback

Test pattern modes operate at the output stage of the rendering pipeline. When a non-default mode is active:

- The timeline continues to run and cues continue to be evaluated, but the rendered show content is replaced (not overlaid) by the selected test pattern or solid color.
- Switching back to **None** immediately resumes normal show output without interrupting playback.
- Test pattern modes are **not saved** as part of the show file. They are runtime-only display states that reset to **None** when the Runner restarts or the show is reloaded.

This means you can safely use test patterns during setup and rehearsal without affecting the show data or worrying about accidentally leaving a display in test mode for the performance.

:::tip
During technical rehearsal, use the **Render Info** overlay on all displays to keep track of which output is which, then disable it before the audience enters.
:::
