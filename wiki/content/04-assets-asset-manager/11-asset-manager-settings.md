---
title: "Asset Manager Settings"
---


## Asset Manager Settings

**The Asset Manager Settings dialog is the central control point for how assets are optimized, what codecs are used, and how transfers are throttled.** Changes here affect every future optimization — they determine the file size, visual quality, playback performance, and alpha channel support of every asset in your show. Open the dialog by right-clicking in the Assets window and choosing **Asset Manager Settings**.

<!-- screenshot: Asset Manager Settings dialog showing all sections -->

### When to Change Settings

Most shows work well with the default settings. Consider changing them when:

- **Your display servers have specific GPU capabilities** — e.g., hardware HEVC decode, where switching from HAP to HEVC reduces storage and transfer requirements.
- **You need to preserve alpha channels** — verify that the codec mapping routes alpha-carrying sources to an alpha-capable output (e.g., ProRes 4444 → NotchLC Alpha).
- **Storage or bandwidth is limited** — lower quality levels reduce file size; the bandwidth limiter prevents transfers from saturating a shared network.
- **Your content pipeline delivers in a specific format** — if all source material arrives as HAP, the pass-through mapping avoids unnecessary re-encoding.

### Bandwidth Limit

The **Bandwidth Limit** setting caps the data rate (in Mbit/s) used when transferring optimized assets to display servers (Runners).

| Setting | Behavior |
|---|---|
| **0** (default) | Unlimited — transfers use all available bandwidth |
| **Positive value** (e.g., 500) | Transfers are throttled to that rate |

Use a bandwidth limit when WATCHOUT shares the network with other traffic (lighting control, audio, show control, internet access). On a dedicated WATCHOUT network, leave it at 0 for the fastest possible transfers. See [Asset Transfer](10-asset-transfer.md) for more on optimizing transfer performance.

### Track Management

The **Track Management** section controls how the optimizer handles source files that contain both video and audio tracks (e.g., an `.mp4` with a stereo audio track). The **Composition Logic** dropdown provides four options:

| Mode | What Happens | When to Use |
|---|---|---|
| **Skip Audio** | Only the video track is optimized; audio is discarded | When audio is handled separately or not needed |
| **Skip Video** | Only the audio track is optimized; video is discarded | When you only need the audio from a video file |
| **Composition** | Both tracks are kept together as a single composition asset | When video and audio must remain in sync as one cue |
| **Individual Assets** | Video and audio are split into separate, independent assets | When you need independent control over video and audio on the timeline |

This setting applies globally to all newly imported assets. It does not retroactively change assets that have already been optimized.

:::note
When **Composition** mode is selected, the optimizer creates a composition folder in the Assets window containing separate video and audio sub-assets linked by a `composition.json` file. The composition appears on the timeline as a single asset, but its components can be inspected individually in the Assets window. See [Asset Types](02-asset-types.md) for more on compositions.
:::

### Output Properties (Quality Levels)

The **Output Properties** section lists codecs that support quality configuration. For each codec, you can set a **Quality Level** that controls the trade-off between visual fidelity and file size:

| Level | Visual Quality | Relative File Size | Typical Use |
|---|---|---|---|
| **Good** | Lower — visible compression artifacts in fine detail | Smallest | Rehearsal previews, storage-constrained environments |
| **Very Good** | Balanced — minor artifacts in demanding content | Moderate | General production content |
| **Excellent** | High — artifacts only visible under close inspection | Larger | Final production with important visual content |
| **Optimal** | Very high — negligible artifacts | Large | Hero content, close-up display screens |
| **Best** | Maximum — highest quality the codec supports | Largest | Final mastering, archival, when storage is not a concern |

Not all codecs expose a quality setting. Pass-through formats (HAP, NotchLC, Raw) produce a fixed output regardless of quality level — they appear in the list but without a dropdown.

:::tip
Quality differences are most visible in content with fine detail, subtle gradients, and saturated colors. Test with representative show content before finalizing — a quality level that looks identical on a white-field test may show visible differences on real media.
:::

### Codec Mapping

The **Codecs** section shows the input-to-output codec mapping — the rules that determine what the optimizer converts each source codec into. This is the most impactful setting in the dialog.

Each row maps a source codec (**In**) to the codec used for the optimized output (**Out**):

| UI Element | Description |
|---|---|
| **In** column | The source codec detected in the imported file (read-only) |
| **Out** dropdown | The output codec the optimizer will produce (configurable) |
| **Arrow indicator** | Colored when the mapping differs from the default; grey when default |
| **Restore icon** | Hover over a non-default row's arrow to reveal a restore button that reverts that single row |
| **Reset All button** | Reverts every row to the system default mapping |

#### Default Codec Mappings

The system default maps each source to a GPU-friendly output:

| Source Codec (In) | Default Output (Out) | Rationale |
|---|---|---|
| H.264 / AVC 4:2:0 | HEVC 4:2:0 | CPU → GPU decode; smaller than HAP |
| MPEG-2 | HEVC 4:2:0 | Legacy → modern GPU decode |
| ProRes 422 / LT / HQ | NotchLC Opaque | High-quality intermediate → GPU codec |
| ProRes 4444 (alpha) | NotchLC Alpha | Preserves alpha; GPU decode |
| ProRes 4444 XQ | NotchLC (Opaque or Alpha) | Highest ProRes quality → GPU codec |
| HAP / HAP Q / HAP Alpha | Pass-through | Already GPU-optimized |
| NotchLC | Pass-through | Already GPU-optimized |
| Raw RGB / RGBA 8-bit | Pass-through | Already raw texture |
| RGB 16-bit | RGB 10-bit (R10G10B10A2) | Downsampled to 10-bit GPU texture |

See [Formats & Codecs](04-formats-codecs.md) for a full comparison of all codec options, including file size, decode method, and alpha support.

:::warning
Codec mapping changes take effect only for **future** optimizations. Assets already optimized are not re-processed automatically. To re-optimize an existing asset with new settings, delete it and re-add the source file, or use the re-optimize command if available.
:::

### How Settings Interact

The three main settings — bandwidth limit, track management, and codec mapping — operate independently but can have combined effects:

1. **Codec mapping** determines the output format and file size.
2. **Quality level** fine-tunes the file size within that codec.
3. **Track management** determines whether multi-track sources produce one or two assets.
4. **Bandwidth limit** controls how fast the (potentially larger or smaller) output is transferred.

For example: switching the HAP codec mapping from "Good" to "Best" quality produces larger files, which take longer to transfer — if you also have a bandwidth limit enabled, the transfer time increases proportionally.

### Saving Changes

Click **Save** to apply the current settings. The **Save** button is only enabled when changes have been made. Click **Cancel** to discard changes and close the dialog.

### Best Practices

- **Set codec mappings before importing content.** Once assets are optimized, changing the mapping does not retroactively update them. Set the desired mappings before your first import to avoid re-processing.

- **Use "Very Good" quality for most content.** The difference between "Very Good" and "Best" is often invisible in show conditions (audience distance, ambient light, motion content), but the file size difference can be 2–3×.

- **Keep a per-show settings record.** Document your codec mappings, quality levels, and bandwidth settings for each show. This is critical when reproducing a show on different hardware or handing off to another operator.

- **Test on actual display hardware.** GPU decode capabilities vary between GPU generations. Before committing to HEVC as your output codec, verify that every Runner in the system supports hardware HEVC decode at the required resolution and frame rate.

- **Use "Composition" mode for sync-critical content.** When video and audio must be frame-accurately synchronized, keep them as a composition. Splitting into individual assets introduces the possibility of independent timeline edits that break sync.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Quality dropdown is missing for a codec | That codec does not support configurable quality (pass-through or fixed-output codec) | Expected behavior — no action needed |
| Changed codec mapping but existing assets are unchanged | Mapping changes only affect future optimizations | Delete and re-add the asset, or trigger re-optimization |
| Output files are larger than expected | Quality set to "Best" or mapping routes to a large codec (HAP) | Lower the quality level or switch to a more compact codec (NotchLC, HEVC) |
| Composition assets appear instead of individual video/audio | Track management set to "Composition" | Change to "Individual Assets" and re-import the source file |
| Video imported but audio is missing | Track management set to "Skip Audio" | Change to "Composition" or "Individual Assets" and re-import |
| Non-default mapping arrow shown but output looks correct | A previous operator customized the mapping | If the output is correct for your needs, keep it. Otherwise, use the restore icon or Reset All |
