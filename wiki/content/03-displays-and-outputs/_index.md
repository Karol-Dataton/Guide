---
title: "Displays and Outputs"
icon: "monitor"
---

# DISPLAYS AND OUTPUTS

**Displays are the foundation of every WATCHOUT show -- they define where and how your content reaches the audience.** Each display combines a stage placement, an output route (GPU, SDI, NDI, or Virtual), and signal settings into a single configurable unit. Getting display setup right is the first step toward seamless multi-screen presentations.

### Start Here

Understand the basics of adding and configuring displays.

- [Adding Displays](01-adding-displays.md) -- the four output types (GPU, SDI, NDI, Virtual), creating your first display, and the relationship between stage placement and physical output
- [Display Properties](05-display-properties.md) -- the complete reference for all property groups: General, Placement, Presentation, Output, Signal, Warp/Mask, Calibration, and Test Pattern
- [Display Grid Setup](04-display-grid-setup.md) -- rapidly configuring uniform tiled arrays (LED walls, monitor matrices, projection grids) with consistent resolution and spacing

### Core Display Types

Different output scenarios require different display configurations.

- [Virtual Displays](02-virtual-displays.md) -- internal texture buffers for pixel mapping, content re-routing, and layered compositing workflows that do not drive a physical output
- [3D Mapping Projectors](03-3d-mapping-projectors.md) -- projector-based 3D mapping with Eye/Target/Roll placement, lens parameters, and calibration point workflows
- [SDI Output](09-sdi-output.md) -- professional video transport with Single, Dual, and Quad-Link configurations for broadcast and downstream equipment

### Geometry Correction and Blending

Tools for shaping output to fit real-world surfaces and multi-projector overlaps.

- [Edge Blending](06-edge-blending.md) -- complementary intensity gradients across projector overlap zones for seamless multi-projector images
- [Warp Geometry](07-warp-geometry.md) -- mesh-based geometry correction for curved screens, angled projectors, non-rectangular targets, and domes
- [Display Masks](08-display-masks.md) -- alpha-based mask overlays for hiding regions of rendered output, controlling light spill, and shaping non-rectangular boundaries

### Color, Calibration, and Diagnostics

Fine-tuning output quality and verifying display setup.

- [HDR and Color Management](10-hdr-and-color-management.md) -- the color-managed rendering pipeline from asset decode through 16-bit linear compositing to SDR/HDR output
- [Display Calibration](12-display-calibration.md) -- NDI calibration streams, projector calibration via 3D point correspondences, EDID management, and external API integration
- [Test Patterns](11-test-patterns.md) -- five built-in diagnostic modes and the Render Info overlay for verifying signal routing and alignment
