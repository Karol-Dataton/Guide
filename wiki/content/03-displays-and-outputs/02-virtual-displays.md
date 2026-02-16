---
title: "Virtual Displays"
---


## Virtual Displays

A virtual display behaves like a normal display in Stage and Timeline workflows, but it does not drive a physical output connector. Think of it as an internal render target you can use for design, compositing, and previsualization.

Virtual displays are ideal when you want to build and test show logic before final hardware routing is available.

### What Makes a Display Virtual

A display is virtual when its output type is set to `Virtual`.

In practical terms:

- It is not tied to a physical GPU/SDI connector.
- It does not require a node alias to exist.
- It can still be placed, sized, and edited like other displays.
- It can be used as a media source in cue workflows.

### When to Use Virtual Displays

Use virtual displays when you need to:

- Design content before hardware is on site
- Build a stage map for client review
- Prepare layout/animation while waiting for final routing details
- Simulate a complete system on a laptop or single workstation

They are also useful for building layered workflows where one output is rendered internally first and then reused elsewhere.

### Add a Virtual Display

You can create virtual displays from multiple places:

- **Stage -> Add Virtual Display**
  - Adds at a default location.
- Right-click in **Stage** and add a virtual display
  - Adds at the clicked position.
- **Devices** pane context menu -> **Add Virtual Display**
  - Useful when managing device lists directly.

New virtual displays are named sequentially (for example `Virtual Display 1`, `Virtual Display 2`). Rename them early.

### Initial Configuration Checklist

After creating a virtual display, set:

- **Name** (operator-friendly and clearly virtual)
- **Resolution** (`width x height`) for the intended design raster
- **Stage placement** to match your conceptual layout
- **Stage tiers** if you use tier-based visibility

### How They Behave

Virtual displays support standard workflow operations:

- Cue placement and stacking
- Tween animation
- Timeline playback preview
- Grouping and composition work

You can treat them as reusable internal outputs during show construction, not just temporary placeholders.

### Transitioning to Physical Outputs

When hardware is available, convert virtual displays into routed outputs:

1. Change output type from `Virtual` to `GPU`, `SDI`, or `NDI`.
2. Assign the target **Node/Alias**.
3. Set output routing (channel where required) and final resolution.
4. Validate signal settings (color space/depth, interlaced, delay) as needed.
5. Verify with test patterns and then with a real test cue.

This keeps your stage geometry and cue design intact while moving from previsualization to production routing.

### Common Pitfalls

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Nothing appears on a physical screen | Display is still `Virtual` | Change output type and assign node/channel |
| Routing options seem incomplete | Virtual mode hides physical routing fields | Switch to `GPU`/`SDI`/`NDI` first |
| Operator confusion during setup | Names do not distinguish virtual vs physical | Use clear naming prefixes |

:::warning
A virtual display will never light a physical connector until it is converted to a physical output type and routed to a node.
:::

### Best Practice

Keep a naming convention that distinguishes virtual from physical targets, for example:

- `VIRT_MainWall`
- `VIRT_SideScreen_R`

This avoids routing mistakes during deployment and handoff.
