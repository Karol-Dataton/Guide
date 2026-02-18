---
title: "Timeline and Cues"
icon: "clock"
---

# TIMELINE AND CUES

**The timeline is where your show takes shape - it is the central workspace for arranging media, orchestrating playback, and synchronizing every visual and audio element across your displays.** Every piece of content in a WATCHOUT 7 show is placed, timed, and controlled through the timeline system. Timelines hold media cues (images, video, audio, compositions), control cues that manage playback state, output cues that send external messages, variable cues that automate show parameters, marker cues for navigation and operator reference, and ArtNet fixture cues for DMX lighting control.

### Start Here

The fundamentals of placing content and organizing your timeline.

- [Adding Media Cues](02-adding-media-cues.md) - placing assets on the timeline, initial cue values, media sources, and the full set of cue properties
- [Working with Layers](03-working-with-layers.md) - organizing cues vertically for compositing order and structural clarity
- [Adjusting Timing](04-adjusting-timing.md) - moving, trimming, snapping, looping, and fine-tuning cue timing with nanosecond precision

### Cue Types

The different cue types available on the timeline and what each one does.

- [Control Cues](05-control-cues.md) - Run, Pause, and Stop commands that orchestrate playback across timelines with optional jump positioning
- [Marker Cues](06-marker-cues.md) - point-in-time annotations for organization, operator reference, and as named jump targets
- [Output Cues](07-output-cues.md) - sending TCP, UDP, and HTTP messages to external systems synchronized with timeline playback
- [Variables and Variable Cues](08-variables-and-variable-cues.md) - numeric parameters driven by external inputs and timeline automation for reactive, interactive shows
- [ArtNet Fixture Cues](09-artnet-fixture-cues.md) - DMX/ArtNet lighting control from the timeline with fixture definitions, addressing, and tween-based channel automation

### Compositions and Organization

Tools for grouping, reusing, and managing complex timeline content.

- [Compositions](10-compositions.md) - nested timelines that group multiple cues into a single reusable entity with its own layers and timing
- [Cue Sets and Variants](11-cue-sets-and-variants.md) - named variant groups for runtime media source switching (multi-language, branding, day/night)
- [Media Snapshots](12-media-snapshots.md) - saving and recalling named presets of cue property states for quick comparison and configuration recall
- [Stacking Order](13-stacking-order.md) - controlling visual layering with By Layer and By Z compositing modes within and across timelines

### Automation and Advanced Workflows

Expression-driven automation, live editing, and bulk timeline operations.

- [Timeline Triggers and Expressions](14-timeline-triggers-and-expressions.md) - expression-based rules that automate play, pause, and stop in response to variable values
- [Conditional Cues](17-conditional-cues.md) - per-cue expression conditions that control whether media renders or control/output cues fire
- [Blind Edit Mode](15-blind-edit-mode.md) - making changes in isolation without affecting live output, then committing when ready
- [Insert and Delete Time](16-insert-delete-time.md) - bulk time shifting for inserting gaps or removing dead time across the timeline
