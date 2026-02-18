---
title: "Working with Layers"
---


## Working with Layers

**Layers are the primary organizational and compositing structure within a WATCHOUT timeline.** Every media cue, control cue, and effect lives on a layer, and the arrangement of layers determines the visual draw order of your content — which elements appear in front of others on screen. A well-structured layer setup is the difference between a manageable production and one that becomes chaotic under pressure.

### What Layers Are

A layer is a horizontal track in the Timeline window that holds cues. Internally, each timeline stores its layers as a collection keyed by unique layer identifiers (53-bit integer IDs). Each layer carries its own properties — name, order position, visibility state, lock state, and optional key-and-fill settings — independent of the cues it contains.

Layers serve two distinct purposes:

- **Compositing order** — when cues use the default **By Layer** stacking mode, the layer's position determines which content renders in front. Layer 1 (topmost in the UI) renders in front of all other layers; higher-numbered layers render progressively further behind. See [Stacking Order](13-stacking-order.md) for the full compositing model.
- **Organization** — layers group related cues together so you can name, collapse, lock, and manage them as logical units. A typical show might use separate layers for backgrounds, video playback, titles, and effects.

### Layer Properties

Every layer exposes the following properties:

| Setting | Purpose | Default |
|---|---|---|
| **Name** | A descriptive label displayed in the Timeline window. When not set, the layer displays its automatic name based on its position (e.g., "Layer 1", "Layer 2"). | Auto-generated from position |
| **Order** | The layer's vertical position in the timeline. Lower order values appear higher in the UI and render in front. | Assigned on creation |
| **Enabled** | Controls whether the layer's cues are rendered in the output. Disabling a layer hides all of its content without deleting anything. | Enabled |
| **Expanded** | Controls whether the layer's cue details are expanded or collapsed in the Timeline window. | Collapsed |
| **Locked** | Prevents editing of cues on this layer. Locked layers cannot have cues added, moved, or modified. | Unlocked |
| **Key and Fill** | Enables key-and-fill compositing for the layer, with mode and channel settings. | Disabled |

### Default Layer Setup

WATCHOUT creates a predefined number of layers depending on the context:

- **New timelines** start with **10 layers**, providing a comfortable working space for most productions without requiring manual layer creation.
- **New compositions** start with a **minimum of 3 layers**, or more if the composition's content requires additional layers.

You can add or remove layers at any time after creation. There is no hardcoded upper limit on layer count.

:::note
Starting with a generous number of layers is intentional — it is faster to rename and use existing layers than to repeatedly add new ones during programming. Delete unused layers at the end of the production process if you want a cleaner file.
:::

### Adding and Removing Layers

#### Adding Layers

There are two methods for adding layers:

1. **Append Layer** — adds a new layer at the bottom of the timeline (after the highest existing layer). Use this when you need additional space below your current layer stack.
2. **Insert Layer** — adds a new layer directly below the currently selected layer. The new layer is placed at the next order position after the selected layer, pushing subsequent layers down.

#### Removing Layers

Deleting a layer removes it and **all cues on that layer**. This is a cascading deletion — every cue that lives on the deleted layer is permanently removed from the timeline.

:::warning
Deleting a layer cannot be undone if the cues it contained are not backed up elsewhere. Always verify that a layer is empty or that its cues are expendable before deleting. WATCHOUT enforces a minimum of one layer per timeline — you cannot delete the last remaining layer.
:::

**To add or remove layers:**

1. Select the target layer in the Timeline window (or any cue on it).
2. Use the timeline menu or right-click context menu to choose **Append Layer**, **Insert Layer**, or **Delete Layer**.
3. If deleting, confirm the operation when prompted — all cues on the layer will be removed.

### Naming Layers

When a layer has no custom name assigned, WATCHOUT displays a default name based on its position: **"Layer 1"**, **"Layer 2"**, and so on. These names update automatically if layers are reordered.

Descriptive names are strongly recommended for any production beyond a simple test. Clear names allow operators to find the right layer instantly during live programming and reduce the risk of placing cues on the wrong layer.

**To rename a layer:**

1. Double-click the layer name in the Timeline window.
2. Type the new name and press **Enter**.

Common naming conventions include functional labels (`BG`, `Video`, `Titles`, `FX`, `Overlays`) or scene-based labels (`Scene1_BG`, `Scene1_FX`). Choose a convention and apply it consistently across all timelines.

### Layer Visibility and Locking

Three properties control how a layer behaves during editing and playback:

| Property | Effect When Active |
|---|---|
| **Enabled** | When disabled, all cues on the layer are hidden from the rendered output. The cues remain on the timeline and can be re-enabled at any time. Use this to temporarily suppress content without deleting it. |
| **Expanded** | When expanded, the layer shows additional detail for its cues in the Timeline window (e.g., waveforms, thumbnails). Collapsing layers saves vertical space when you have many layers. |
| **Locked** | When locked, the layer's cues cannot be selected, moved, resized, or edited. This protects finalized content from accidental changes during live programming or collaborative editing. |

:::tip
Lock layers progressively as sections of the show are finalized. This prevents accidental edits to approved content while you continue working on other layers. Unlock temporarily if adjustments are needed.
:::

### Key and Fill

Each layer has an optional **Key and Fill** system that controls how the layer's content is used in compositing. This is relevant for broadcast-style workflows where a separate key (matte) signal controls the transparency of a fill (content) signal.

#### Key and Fill Settings

| Setting | Options | Default |
|---|---|---|
| **Enabled** | On / Off | Off |
| **Mode** | Luma, Luma Inverted, Alpha, Alpha Inverted | Luma |
| **Channels** | Channel bitmask | Channel 1 (0x01) |

#### Key and Fill Modes

| Mode | Behavior |
|---|---|
| **Luma** | Bright areas of the key layer are opaque; dark areas are transparent. |
| **Luma Inverted** | Dark areas of the key layer are opaque; bright areas are transparent. |
| **Alpha** | The alpha channel of the key layer controls transparency directly. |
| **Alpha Inverted** | The inverted alpha channel of the key layer controls transparency. |

Key and fill is typically used when integrating WATCHOUT with broadcast graphics systems or when building advanced compositing setups where one layer's luminance or alpha drives the visibility of another layer's content.

### Layer Rendering Order

The vertical position of layers in the Timeline window directly determines the visual compositing order for cues using the default **By Layer** stacking mode:

- **Layer 1** (topmost in the UI) renders **in front of** all other layers.
- **Layer 2** renders behind Layer 1 but in front of Layer 3.
- Higher-numbered layers render progressively further behind.

This follows standard compositing convention — what you see at the top of the timeline is what appears at the front of the screen.

When a cue's stacking mode is set to **By Z** instead of By Layer, the layer position is ignored for that cue and its Z-axis position determines depth ordering. See [Stacking Order](13-stacking-order.md) for details on how these modes interact.

:::note
The layer order applies within a single timeline. When multiple timelines overlap on the same display area, the inter-timeline stacking order (controlled by timeline panel position and the Always on Top setting) takes precedence. See [Stacking Order](13-stacking-order.md) for the full compositing hierarchy.
:::

### Layer Operations Reference

| Operation | Description |
|---|---|
| **Append Layer** | Adds a new layer at the bottom of the timeline (highest order + 1). |
| **Insert Layer** | Inserts a new layer directly below the selected layer. |
| **Delete Layer** | Removes the selected layer and all cues on it. Minimum one layer must remain. |
| **Set Layer Name** | Assigns or changes the layer's display name. |
| **Set Key and Fill Enabled** | Toggles key-and-fill compositing for the layer. |
| **Set Key and Fill Mode** | Changes the key-and-fill mode (Luma, Luma Inverted, Alpha, Alpha Inverted). |
| **Set Key and Fill Channels** | Configures which output channels the key-and-fill setting applies to. |

### Best Practices

- **Name layers immediately.** As soon as you establish a layer's purpose, give it a descriptive name. Default names like "Layer 4" convey no meaning during a live show.

- **Establish a layer convention early.** Decide on a consistent top-to-bottom ordering before programming begins — for example, overlays and titles on top layers, primary video in the middle, backgrounds at the bottom. Changing layer structure mid-production forces you to move cues between layers.

- **Separate control cues from media.** Place [control cues](05-control-cues.md) on dedicated layers rather than mixing them with media cues. This makes it easier to lock media layers while still editing control logic, and keeps the timeline readable.

- **Use visibility toggling for A/B testing.** Disable a layer to quickly compare your show with and without a particular content element, instead of deleting and re-adding cues.

- **Keep layer count manageable.** Although there is no hard limit on layer count, timelines with dozens of layers become difficult to navigate. If you need many independent content streams, consider splitting them across [compositions](10-compositions.md) or separate timelines.

- **Lock finalized layers.** Once a layer's content is approved, lock it. This is especially important in multi-operator environments where another programmer might accidentally modify completed work.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Cue not visible on stage | Layer is disabled | Enable the layer in the Timeline window |
| Cannot select or move a cue | Layer is locked | Unlock the layer, make your edit, then re-lock |
| Cannot delete a layer | It is the only remaining layer on the timeline | Add a new layer first, then delete the unwanted one |
| Cue appears behind expected position | Layer order is lower than intended (higher number = further back) | Move the cue to a higher layer (lower number) or reorder layers |
| Default layer names reappear after reorder | Layer has no custom name — auto-name reflects current position | Assign a custom name to the layer |
| Key and fill has no visible effect | Key and fill is not enabled on the layer | Enable key and fill in the layer properties and set the appropriate mode |
| Deleting a layer removed cues unexpectedly | Layer deletion cascades to all cues on that layer | Use undo immediately if available; otherwise, restore from a saved version |
| New composition has fewer layers than expected | Compositions start with a minimum of 3 layers | Add more layers manually as needed using Append Layer or Insert Layer |

### Related Articles

- [Adding Media Cues](02-adding-media-cues.md) — how to place content onto layers
- [Stacking Order](13-stacking-order.md) — the full compositing model for By Layer and By Z modes
- [Compositions](10-compositions.md) — nested timelines with their own independent layer stacks
