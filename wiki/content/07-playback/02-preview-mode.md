---
title: "Preview Mode"
---


## Preview Mode

The Stage window in WATCHOUT is your primary tool for previewing show content before it reaches the audience. There is no separate "Preview" window — the Stage view itself serves as the real-time preview environment, showing you exactly how cues are composited, how transitions play out, and how content maps to your display layout. Whether you are programming a single display or orchestrating a multi-projector installation, the Stage window lets you validate timing, positioning, and visual flow directly within Producer without needing access to the physical output hardware.

Understanding what the Stage preview can and cannot tell you — and how to use its different viewing modes — helps you work efficiently during programming and catch problems before they become visible to the audience.

### The Stage Window as Preview

The Stage window renders a representation of your entire display layout, showing all active cues composited in real time. When you play a timeline, the Stage window updates live, letting you watch transitions, verify cue timing, and check that content appears on the correct displays.

To open the Stage window, use **Window > Stage** from the menu bar. The Stage window can be resized, undocked, or moved to a second monitor for a larger preview area.

The Stage view has two edit modes that affect how you interact with it:

- **Display Edit Mode** — for positioning and configuring displays, warp meshes, and masks. In this mode, clicking in the Stage selects and manipulates display objects.
- **Cue Edit Mode** — for positioning and adjusting cues on the stage. In this mode, clicking selects and manipulates cue objects.

During preview, you typically work in Cue Edit Mode so that you can interact with cues while watching playback.

### Camera Modes

The Stage window offers three camera modes that change how you view your display layout:

| Camera Mode | View | Best For |
|---|---|---|
| **Default (2D)** | A flat, front-on view of the entire stage layout | General programming, cue positioning, verifying content on all displays simultaneously |
| **First Person (3D)** | A navigable 3D perspective view where you can orbit, pan, and zoom freely around the stage | Reviewing spatial relationships between displays, checking 3D stage setups, understanding projector overlap from different angles |
| **Projector** | Views the stage from the exact position and angle of a specific projector | Verifying what a projector actually "sees," checking calibration alignment, reviewing warp and mask corrections from the projector's perspective |

The Default 2D view is the most commonly used during programming because it gives an immediate overview of all displays. Switch to First Person when you need to understand depth relationships, or to Projector view when fine-tuning alignment for a specific output.

### Stage Settings

The Stage window provides several settings that control its appearance:

**Background Pattern** — choose the backdrop behind your displays:
- **None** — transparent/black background
- **Checkerboard (Small / Medium / Large)** — a checkerboard pattern that makes it easy to see display boundaries and transparent areas in your content
- **Solid Color** — a configurable solid color background

**Tier Filters** — WATCHOUT supports display tiers for organizing outputs into groups. The Stage view can filter which tiers are visible, letting you focus on a subset of displays during preview. This is useful in large installations where showing all displays at once becomes cluttered.

### Display Preview Images

When your system is connected to Runner nodes (display servers), WATCHOUT can show live preview thumbnails of what each Runner is actually rendering. These preview images appear overlaid on the corresponding displays in the Stage window, giving you a direct comparison between what Producer thinks the output should look like and what the Runner is actually producing.

This feature is especially valuable for:

- **Verifying remote output** — confirming that Runners are receiving and rendering the correct content without physically walking to each display
- **Checking warp and mask results** — seeing how post-processing corrections appear on the actual output
- **Diagnosing discrepancies** — identifying differences between the Producer's composited preview and the Runner's actual render, which can reveal asset sync issues, resolution mismatches, or configuration problems

:::tip
Display preview images require an active connection to the Runner nodes. If no Runners are connected, only the Producer's local composited preview is shown.
:::

::: tabs
### What to Validate in Preview

The Stage preview is excellent for validating:

| Check | What to Look For |
|---|---|
| **Cue timing** | Do cues appear and disappear at the right moments? Are transitions the correct duration? |
| **Tween behavior** | Do motion paths, fades, and property animations follow the intended curves? |
| **Layer ordering** | Is content stacking correctly? Are foreground elements in front of background elements? |
| **Display assignment** | Does each cue appear on the correct display(s)? |
| **Content positioning** | Are cues placed correctly within their target displays? Are edges aligned? |
| **Transition flow** | Do crossfades, cuts, and animated transitions look smooth and intentional? |
| **Multi-timeline interaction** | When multiple timelines are running, do their outputs combine as expected? |
| **Text and data content** | Are dynamic text fields, clocks, or data-driven elements displaying correctly? |

### What Requires Target Hardware

While the Stage preview is a powerful programming tool, certain aspects of your show can only be fully validated on the actual output hardware:

| Aspect | Why Preview Is Insufficient |
|---|---|
| **Color accuracy** | Monitor calibration, projector color profiles, and LED panel color spaces differ from your Producer display. Final color must be judged on the target surface. |
| **Brightness and contrast** | Projector lumens, ambient light conditions, and display brightness levels cannot be simulated in the Stage window. |
| **Frame pacing under load** | The Producer preview renders at its own frame rate. Actual playback performance on Runner hardware under full show load may differ, especially with high-resolution or multi-layer compositions. |
| **Warp and blend precision** | While the Stage window shows warp mesh corrections, the final pixel-level accuracy of warp geometry and edge blending must be verified on the physical projection surface. |
| **Audio synchronization** | Audio timing relative to visual content should be verified on the actual output system. |
| **External protocol output** | DMX, Art-Net, OSC, and other protocol outputs cannot be previewed visually — they must be verified with their target devices. |
:::

### Recommended Preview Workflow

1. **Preview during programming.** As you build timelines and place cues, regularly play sections in the Stage window to check timing and positioning. This catches most errors early.

2. **Use the checkerboard background** when working with content that has transparency or when you need to clearly see display boundaries.

3. **Check multiple camera angles.** Switch between Default 2D view (for overall layout) and First Person 3D view (for spatial relationships) to verify your content from different perspectives.

4. **Run complete timeline passes.** After finishing a timeline, play it from beginning to end in the Stage window to verify the full sequence flow, not just individual sections.

5. **Preview multi-timeline interactions.** If your show uses multiple simultaneous timelines, run them together to verify that layering, transitions, and timing relationships work as intended.

6. **Compare with display previews.** Once Runners are connected, enable display preview images to confirm that remote rendering matches your expectations.

7. **Rehearse on target hardware.** Always schedule time to validate the complete show on the actual output system before the audience arrives. The Stage preview is a development tool, not a substitute for a full technical rehearsal.

:::note
The Stage window preview and the Runner output may show minor visual differences due to rendering pipeline differences, display calibration, and post-processing effects like warp and edge blending. Always treat the Runner output as the authoritative reference for final visual quality.
:::

### Relationship to Other Chapters

- For details on configuring displays and their output settings, see [Displays and Outputs](../03-displays-and-outputs/_index.md).
- For warp geometry and edge blending setup that affects what you see in preview, see [Warp Geometry](../03-displays-and-outputs/07-warp-geometry.md) and [Edge Blending](../03-displays-and-outputs/06-edge-blending.md).
- For connecting to Runner nodes to enable display preview images, see [Connecting to Display Servers](03-connecting-to-display-servers.md).
- For playback controls used during preview, see [Starting and Stopping](01-starting-and-stopping.md).
