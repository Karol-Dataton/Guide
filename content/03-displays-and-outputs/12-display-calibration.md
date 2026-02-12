---
title: "Display Calibration"
---


## Display Calibration

Calibration is the process of aligning WATCHOUT's rendered output to the physical reality of the display surface. This encompasses projector alignment for 3D mapping, camera-based calibration via NDI streams, EDID management for display identification, and external calibration integration through the HTTP API.

### NDI Calibration Stream

For camera-based calibration workflows, each GPU display can be assigned an **NDI Calibration Stream** in the **Calibration** section of Device Properties. This setting specifies the name of an NDI video stream that carries a live camera feed of the display surface.

When configured, the Runner can receive the NDI stream and use it as a reference input for alignment. This is typically used in automated or semi-automated calibration systems where a camera observes the projected output and provides feedback for geometric correction.

To set up an NDI calibration stream:

1. Select the display in Device Properties.
2. Open the **Calibration** section.
3. Enter the NDI stream name in the **Calibration Stream** field.

The stream name should match the NDI source name exactly as it appears on the network. The calibration system uses this stream to compare the expected output pattern with the observed result on the physical surface.

### Projector Calibration (3D Mapping)

For 3D projector displays, WATCHOUT provides a dedicated calibration system that uses point correspondences to compute the projector's position, orientation, and lens parameters. This is essential for accurate projection mapping where content must align precisely to a physical 3D model.

#### Virtual Points and Reality Points

The calibration process works with two sets of points:

- **Virtual points** are placed on the 3D model in the Stage view. They represent known locations on the surface where you want the projected image to land. Virtual points are defined in world coordinates (X, Y, Z).
- **Reality points** are the corresponding positions on the projector's 2D output where those virtual-point locations actually appear when projected. Reality points are defined in normalized screen coordinates.

The calibration algorithm uses these point pairs to solve for the projector's intrinsic parameters (focal length, lens shift) and extrinsic parameters (position, orientation) using a camera calibration model.

#### Calibration Workflow

1. **Switch to Calibration mode** — in the Stage toolbar, switch the projector view from **View** mode to **Calibration** mode. This enables the calibration point editing tools.

2. **Place virtual points** — using the point tools in the Stage view, add virtual points on the 3D model at clearly identifiable surface locations (corners, edges, landmarks). You can add, move, and remove points using the toolbar actions.

3. **Place at least six points** — the calibration algorithm requires a minimum of six virtual points before you can edit reality points. This minimum ensures the system has enough constraints to solve for all projector parameters.

:::warning
You need to create at least six virtual points to edit the reality points.
:::

4. **Edit reality points** — once six or more virtual points exist, switch to reality-point editing. For each virtual point, adjust the corresponding reality point to match where that location actually appears on the projector's output. The Stage view shows both sets of points for comparison.

5. **Calibrate** — trigger the calibration computation. The system solves for the projector parameters that best align the virtual and reality point pairs.

#### Continuous vs. Manual Calibration

The calibration toolbar provides two calibration behaviors:

- **Continuous calibration** — the system recalculates the projector parameters automatically every time you move a point. This provides real-time feedback as you adjust reality points, making it easier to converge on an accurate alignment.
- **Manual calibration** — the system only recalculates when you explicitly press the Calibrate button. Use this when you want to adjust multiple points before triggering a recalculation, or when continuous recalculation is distracting.

#### Calibration Accuracy

After calibration, WATCHOUT displays an **accuracy indicator** that shows how well the computed projector model aligns the virtual and reality points. A low error value (reprojection error) indicates good alignment. An error above 100 indicates a significant problem — typically caused by incorrect point placement, insufficient point count, or a physical setup that doesn't match the model.

If the accuracy is poor, review the point placements and check for:

- Points that are nearly coplanar (insufficient 3D variation)
- Incorrectly matched virtual/reality pairs
- Physical obstructions or distortions not captured in the model

#### Reposition Action

The **Reposition** action moves all reality points to sit directly on top of their corresponding virtual points in the current projector view. This is useful as a reset or starting point before manual fine-tuning — it gives you a clean baseline where both point sets overlap, and you can then adjust individual reality points to account for real-world discrepancies.

#### Projector Parameter Locking

During calibration, you can lock specific projector parameters to prevent the calibration algorithm from changing them:

- **Lock Lens Shift** — prevents the calibration from adjusting the horizontal and vertical lens shift values. Use this when you know the lens shift setting from the projector's specification sheet and want to preserve it.
- **Lock Width / Distance Ratio** — prevents the calibration from adjusting the throw ratio. Use this when the throw ratio is precisely known from the lens data.

Locking parameters reduces the degrees of freedom in the calibration solve, which can improve accuracy when the locked values are known to be correct, but can also degrade results if the locked values are wrong.

### EDID Capture

EDID (Extended Display Identification Data) is a data block that displays transmit to describe their capabilities — supported resolutions, timing modes, color depth, and manufacturer information. WATCHOUT can capture and save a display's EDID data as an asset in the show.

To capture EDID:

1. Select the GPU display in Device Properties.
2. In the **Output** section, locate the EDID row.
3. Click **Save EDID**.

The captured EDID is stored as an asset that you can reference later for troubleshooting or for applying to other displays. You can also select a previously captured EDID asset from the dropdown to apply it to the display, or choose **Current Monitor** to use the live EDID from the connected display hardware, or **Keep** to not send any EDID override.

:::note
The display must be **enabled** to capture its EDID. If the display is disabled, the Save EDID button will be inactive.
:::

EDID capture is particularly useful in rental and staging environments where you need to document the exact display capabilities at each venue, or when troubleshooting resolution and timing issues where the display is not advertising the expected modes.

### External Calibration Triggers

WATCHOUT supports an external calibration trigger mechanism that allows third-party calibration systems to put displays into calibration mode via the HTTP API. This is used in automated calibration workflows where an external system (such as VIOSO or other camera-based alignment tools) needs WATCHOUT to display calibration patterns while the external system captures and processes the result.

The trigger works through the Operative's HTTP input endpoint:

- **Endpoint:** `POST /v0/inputs` on the Operative's external port
- **Input key:** `displaycalibration`
- **Value:** `1.0` to enter calibration mode, `0.0` to exit

A typical automated calibration sequence:

1. The external system sends `displaycalibration = 1.0` to put WATCHOUT displays into calibration mode.
2. The external system runs its calibration process (projecting patterns, capturing camera images, computing corrections).
3. The external system copies the resulting calibration data (e.g., MPCDI files) to the expected location.
4. The external system sends `displaycalibration = 0.0` to return WATCHOUT to normal operation.

This integration supports hardware trigger devices (such as Elgato Stream Deck) for operator-initiated recalibration in permanent installations.

### Best Practices

For the best calibration results, follow this recommended order of operations:

1. **Physical alignment** — mount and aim projectors/displays as accurately as possible before any software correction. The less the software needs to compensate, the better the final image quality.
2. **Coarse warp** — apply initial warp geometry correction to get the output roughly aligned to the surface.
3. **Calibration** — run the projector calibration (for 3D mapping) or external calibration workflow to compute precise alignment parameters.
4. **Fine adjustment** — refine warp junction points and handles for any remaining geometric errors.
5. **Mask** — add masks to shape the visible output boundary, cut spill, and define blend zones.
6. **Content verification** — play representative show content at final brightness and verify that alignment, color, and blending are correct across all displays.

:::tip
Save a snapshot of the show file after successful calibration so you can revert if subsequent edits introduce problems. Treat calibration state as critical show data.
:::
