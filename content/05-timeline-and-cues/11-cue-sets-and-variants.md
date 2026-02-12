---
title: "Cue Sets and Variants"
---


## Cue Sets and Variants

Cue Sets allow you to create multiple named **variants** of media content for the same cue, and switch between them at runtime or during show preparation. This is the core mechanism for building shows that need to display different content depending on context — different languages, different clients, day versus night versions, or rehearsal versus performance configurations.

### What Cue Sets Are

A **Cue Set** is a named group containing one or more **variants**. Each variant is a named slot that can hold a different media source for any cue assigned to that set. When a cue belongs to a cue set, its displayed content is determined by the currently **active variant** of that set rather than by a fixed media source.

For example, a cue set called "Language" might have variants named "English", "German", and "French". A title card cue assigned to this set would display different image files depending on which language variant is active.

Every cue set has a **default variant** — the variant that is automatically activated when no other variant has been explicitly selected. The active variant selection is **transient state**, meaning it is not part of the undo/redo history and behaves like a runtime variable.

### The Cue Sets Panel

The **Cue Sets** window is the central hub for managing cue sets and variants. It displays:

- Each cue set as an expandable section with its name
- Variant columns across the top, with the **active** variant highlighted and the **default** variant marked with a star icon
- A table of all cues assigned to each set, showing the timeline name, layer number, start time, and a thumbnail of the assigned asset for each variant

Clicking a variant header **activates** that variant, immediately switching all assigned cues to display the media mapped to that variant.

Clicking a cue row navigates to that cue's timeline and scrolls the Timeline window to its position.

### Creating a Cue Set

To create a new cue set:

1. Open the **Cue Sets** window
2. Click the window menu and select **New Cue Set**
3. Enter a **group name** (e.g. "Language") and a **variant name** for the initial default variant (e.g. "English")

The new set appears in the panel with one variant. You can then add more variants and assign cues to the set.

### Managing Variants

Right-click a cue set header or a variant column to access variant management options:

- **New Variant** — adds a new empty variant to the set
- **Duplicate Variant** — creates a copy of an existing variant, inheriting all its media mappings across all assigned cues. This is useful for creating a variant that starts as a clone of an existing one and then diverges.
- **Rename Variant** — changes the variant's display name
- **Set Default Variant** — designates the variant as the default (shown with a star icon). The default variant is used as the initial active variant.
- **Delete Variant** — removes the variant. You cannot delete the default variant or the currently active variant.

Variants are displayed sorted alphabetically by name.

### Assigning Cues to Cue Sets

To assign a cue to a cue set:

1. Select one or more media cues
2. In the **Cue Properties** panel, find the **Cue Set** field
3. Select the desired cue set from the dropdown

When you assign a cue to a set, WATCHOUT creates a **media mapping** for that cue — an internal lookup table that maps each variant to a media source. Initially, all variants point to the cue's current media source. You can then change individual variant mappings by dragging different assets onto the cue while a specific variant is active.

To remove a cue from a cue set, set the Cue Set field back to **None**.

:::warning
Art-Net fixture cues cannot be assigned to cue sets. The assignment will be rejected with an error message.
:::

### Switching the Active Variant

You can switch the active variant in several ways:

- **Click the variant header** in the Cue Sets panel to activate it immediately
- **Use the HTTP API** to select a variant programmatically at runtime (e.g. from an external control system)

When you switch the active variant, all cues assigned to that cue set immediately update their rendered content to display the media source mapped to the new variant. This switch is atomic — all affected cues change simultaneously.

The active variant state is treated as transient data (like show variables), meaning variant switches are not recorded in the undo history.

### Cue Set Column in the Cue List

The **Cue List** window includes a **Cue Set** column that displays the name of the cue set each cue belongs to. This provides a quick way to identify which cues are variant-controlled. You can also filter the Cue List by cue sets to show only cues belonging to specific sets.

### Interaction with Asset Deletion

Assets that are referenced by any variant mapping in any cue set **cannot be deleted** from the Asset Manager. WATCHOUT protects against accidental deletion of assets that are in use by the variant system. The deletion dialog will inform you that assets used in cue sets are protected.

### Use Cases

**Multi-language shows:** Create a "Language" cue set with variants for each language. Assign all text-bearing cues (title cards, subtitle overlays, informational graphics) to this set. Switch languages with a single variant activation.

**Day/night versions:** Create a "Time of Day" set with "Day" and "Night" variants. Map bright, high-contrast assets to the Day variant and darker, muted versions to the Night variant.

**Client-specific branding:** For touring productions that rebrand per venue or sponsor, create a "Branding" set with variants for each client. Swap logos, color schemes, and sponsor graphics without restructuring the timeline.

**Rehearsal vs. performance:** Use a variant to swap placeholder or low-resolution assets during rehearsal with final production assets for the live show.
