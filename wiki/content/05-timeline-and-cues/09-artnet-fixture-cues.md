---
title: "ArtNet Fixture Cues"
---


## ArtNet Fixture Cues

**ArtNet fixture cues are WATCHOUT's mechanism for controlling DMX lighting fixtures directly from the timeline, combining fixture definitions with tween-based automation to output Art-Net DMX data at 44 frames per second.** Instead of requiring a separate lighting console, fixture cues let you embed DMX channel control alongside your visual and audio cues on the same timeline, keeping lighting changes precisely synchronized with media playback. Understanding how fixture definitions, addressing, channel resolutions, and recording interact is essential for any show that integrates DMX-controlled devices.

### What ArtNet Fixture Cues Are

An ArtNet fixture cue is a media cue whose `MediaOptions` include an `ArtNet` payload (`ArtNetOptions`). The cue references an Art-Net Fixture asset that defines the fixture's channel layout, and the cue's tween data drives the value of each channel over time. At playback, WATCHOUT evaluates the tween values for every active fixture channel and transmits them as Art-Net DMX packets on the network.

The key components are:

- **Fixture asset** -- defines the fixture type, its available modes, and the channels within each mode.
- **Cue addressing** -- specifies which Art-Net universe and start channel the fixture occupies.
- **Tween automation** -- each channel is controlled by a `TweenType::Artnet(ArtnetTweenType)` keyframe, using any of the standard 31 easing curves.
- **Optional recording** -- pre-captured DMX data can be layered on top of tween values for complex playback.

Together, these allow a single timeline cue to drive one fixture instance across its full channel range with frame-accurate automation.

### Fixture Definitions

Every ArtNet fixture cue is backed by an **ArtNetFixture** asset that describes the fixture's identity and capabilities.

The fixture model (`ArtNetFixture`) contains:

| Field | Purpose |
|---|---|
| **name** | Fixture name |
| **long_name** | Descriptive long name |
| **short_name** | Abbreviated name for compact UI display |
| **description** | Fixture description |
| **fixture_type_id** | UUID identifying the fixture type |
| **modes** | List of available fixture modes (`ArtNetFixtureMode`) |

Each **ArtNetFixtureMode** defines:

| Field | Purpose |
|---|---|
| **name** | Mode name (e.g., "Coarse (8bit)") |
| **description** | Mode description |
| **channels** | List of channels available in this mode |
| **relations** | Channel relations (master/follower bindings) |

#### Built-in Fixture Presets

WATCHOUT ships with two built-in fixture presets:

| Preset | Internal ID | Modes |
|---|---|---|
| **1ch Generic** | `GenericOneChannel` | Coarse (8bit), Fine (16bit), Ultra (24bit), Uber (32bit) |
| **10ch Generic** | `GenericTenChannel` | Coarse (8bit), Fine (16bit), Ultra (24bit), Uber (32bit) |

The 1-channel generic is useful for single-parameter devices such as dimmers or simple relay triggers. The 10-channel generic covers fixtures that need multiple independently controlled parameters. Both presets expose all four resolution modes, allowing you to select the precision appropriate for your device.

### Channel Resolutions

Each channel in a fixture mode has a **resolution** that determines its bit depth and how many consecutive DMX addresses it occupies. Channels are defined as a tagged enum (`ArtNetFixtureChannel`) by resolution:

| Resolution | Bit Depth | DMX Addresses | Value Type | Description |
|---|---|---|---|---|
| **Coarse** | 8-bit | 1 | u8 | Standard DMX precision; one address per channel |
| **Fine** | 16-bit | 2 | u16 | High precision; occupies two consecutive addresses |
| **Ultra** | 24-bit | 3 | u24 | Very high precision; occupies three consecutive addresses |
| **Uber** | 32-bit | 4 | u32 | Maximum precision; occupies four consecutive addresses |
| **Virtual** | -- | 0 | () | No physical DMX address; used for internal logic only |

Each channel (regardless of resolution) carries common properties through `ArtNetFixtureChannelInner`:

| Property | Purpose |
|---|---|
| **offset** | DMX address offset(s) within the fixture's footprint |
| **pretty_name** | Display name shown in the UI |
| **name** | Internal identifier |
| **default** | Default channel value |
| **highlight** | Highlight value (used for identification during setup) |
| **capabilities** | Channel capability descriptors |

:::tip
Choose the lowest resolution that meets your needs. Most conventional DMX fixtures only respond to 8-bit (Coarse) values. Use Fine or higher only when the receiving device explicitly supports 16-bit or wider channels -- unnecessary high resolution wastes DMX addresses without improving output quality.
:::

### Creating Fixture Assets

Before you can add a fixture cue to the timeline, you need a fixture asset in the Asset Manager.

1. Open the **Assets** window.
2. Right-click in the asset list and select **Add ArtNet Fixture...** from the context menu.
3. Select a fixture preset from the available options (1ch Generic or 10ch Generic).
4. The fixture asset appears in the Assets window and is ready to use.

Fixture assets do not require optimization -- they are definition files, not media. They appear under the **Art-Net Fixture** type in the asset list. See [Asset Types](../04-assets-asset-manager/02-asset-types.md) for details on how Art-Net assets are classified.

### Adding Fixture Cues to the Timeline

The workflow for placing a fixture cue follows the same pattern as other media cues (see [Adding Media Cues](02-adding-media-cues.md)), with fixture-specific configuration afterward:

1. **Locate the fixture asset** in the Assets window.
2. **Drag the fixture asset** onto the target timeline at the desired start time and layer.
3. **Drop the cue** to commit placement. The cue is created with default fixture settings.
4. **Open the Properties panel** for the new cue. A **Fixture** section appears because the cue references an Art-Net Fixture asset.
5. **Set the universe and start channel** to match your DMX infrastructure.
6. **Select the fixture mode** that matches the physical fixture's operating mode.
7. **Add tween keyframes** to automate channel values over time. Each fixture channel appears as an available `Artnet` tween type.
8. **Optionally attach a recording** to layer pre-captured DMX data onto the tween automation.

:::warning
ArtNet fixture cues are **not supported inside compositions**. If a fixture cue is placed on a composition timeline, WATCHOUT logs an error and skips the cue during playback. Always place fixture cues on the main timeline.
:::

### Fixture Cue Properties

When a cue references an Art-Net Fixture asset, the `ArtNetOptions` payload provides the following settings:

| Setting | Purpose | Notes |
|---|---|---|
| **Name** | Fixture instance name | Identifies this specific fixture cue |
| **Start Universe** | Absolute universe number (0--32767) | u15 value; see [Universe Addressing](#universe-addressing) for decomposition |
| **Start Channel** | Channel within universe (0--511) | u9 value; first DMX address for this fixture |
| **Selected Mode** | Index into the fixture's modes array | Determines which channel layout is active |
| **Relations** | Channel relation overrides | Master/follower bindings; see [Channel Relations](#channel-relations) |
| **Recording Source** | Reference to an Art-Net Recording asset | Links pre-captured DMX data to the cue |

### Universe Addressing

WATCHOUT uses an **absolute universe number** (u15, range 0--32767) for Art-Net addressing. This single value is decomposed into the standard Art-Net hierarchy of Net, Sub-Net, and Universe:

```
uv     = absolute_universe % 16
subnet = (absolute_universe / 16) % 16
net    = absolute_universe / 256
```

| Component | Range | Derivation |
|---|---|---|
| **Universe (uv)** | 0--15 | `value % 16` |
| **Sub-Net** | 0--15 | `(value / 16) % 16` |
| **Net** | 0--127 | `value / 256` |

For example, absolute universe **289** decomposes to: uv = 289 % 16 = **1**, subnet = (289 / 16) % 16 = **2**, net = 289 / 256 = **1**. This corresponds to Net 1, Sub-Net 2, Universe 1.

:::note
If a fixture's channels span beyond address 511 within a universe, WATCHOUT wraps the remaining channels into the next universe automatically. Plan your addressing to avoid unintentional overlap with other fixtures on adjacent universes.
:::

### Channel Relations

Channel relations define dependencies between channels within a fixture mode. Each `ArtnetChannelRelation` specifies:

| Field | Purpose |
|---|---|
| **master** | Name of the master channel |
| **follower** | Name of the follower channel |
| **kind** | Relation type: **Override** or **Multiply** |

The two relation types behave differently:

- **Override** -- the master channel's value replaces the follower channel's value entirely. When the master is active, the follower's own tween value is ignored.
- **Multiply** -- the master channel's value is multiplied with the follower channel's value. This is commonly used for master dimmer relationships where a global intensity channel scales individual channel outputs.

Relations are defined in the fixture mode and can be overridden per-cue through the `ArtNetOptions` relations field.

### ArtNet Recording

ArtNet Recording assets capture live DMX data for playback on the timeline. This is useful for replaying complex lighting sequences that were programmed on an external console, or for capturing live performance data.

#### Recording Format

Recordings are stored in **JSONL format** (one JSON object per line):

- **Line 1 (header)** -- metadata describing the recording session.
- **Subsequent lines (frames)** -- one line per captured frame, each with a **microsecond timestamp** (u64) and the channel values for that frame.

During optimization, the raw recording is parsed into a `frames.json` file for efficient playback.

#### How Recorded Values Combine with Tweens

Recorded values do not replace tween automation -- they **multiply** with it. The output formula is:

```
output = cue_tween_value * recorded_value / 255
```

This means:

- A tween value of **255** (full) passes the recorded value through unchanged.
- A tween value of **128** (half) halves the recorded value.
- A tween value of **0** suppresses the recorded value entirely, regardless of what was captured.

This multiplicative relationship lets you use tween keyframes as a master intensity control over recorded data.

:::tip
To play back a recording at its original captured levels, set all tween channel values to their maximum (255 for 8-bit). To fade a recording in or out, animate the tween values from 0 to maximum or vice versa.
:::

### Output Behavior

WATCHOUT transmits Art-Net DMX data at a fixed rate of **44 frames per second** (`ARTNET_FPS = 44`). This rate applies to all fixture cues uniformly and is not configurable per-cue.

At each output frame, WATCHOUT:

1. Evaluates every active fixture cue's tween values at the current timeline position.
2. Applies any recording data multiplication.
3. Packs the channel values into Art-Net DMX packets addressed to the configured universe and channel.
4. Transmits the packets on the network.

All standard tween easing curves are available for fixture channels, providing smooth transitions between values. The `TweenType::Artnet(ArtnetTweenType)` tween type is dedicated to fixture channel automation and behaves identically to other tween types in terms of keyframe interpolation and curve selection.

### Limitations

- **Not supported inside compositions.** Placing an ArtNet fixture cue on a composition timeline results in an error log and the cue is skipped at playback. Fixture cues must be placed on the main timeline only.
- **Channels can span universe boundaries.** If a fixture's channel footprint extends beyond DMX address 511, WATCHOUT wraps into the next universe. This is handled automatically but can cause unexpected address conflicts if adjacent universes are already in use.
- **Fixed output rate.** The 44 FPS Art-Net output rate cannot be changed. For most lighting fixtures this is well within acceptable refresh rates, but it is a fixed system parameter.

### Best Practices

- **Lock addressing early.** Agree on universe and channel assignments with your lighting team before building fixture cues. Changing addresses after cues are built requires updating every affected cue individually.

- **Use the lowest sufficient resolution.** Most DMX fixtures operate at 8-bit (Coarse). Selecting Fine, Ultra, or Uber modes on fixtures that do not support high-resolution channels wastes DMX addresses and adds no benefit.

- **Name fixture instances descriptively.** Use the fixture cue's Name field to identify the physical device (e.g., "House Dimmer Rack A" or "Spot USL"). This makes large shows with many fixture cues navigable.

- **Validate on the production network.** Art-Net packets are transmitted over the network. Always test fixture output on the same network infrastructure used in production to catch routing, firewall, or subnet issues before the show.

- **Use recordings for complex sequences.** If a lighting look was programmed on an external console, record it and attach the recording to a fixture cue rather than manually recreating it with tween keyframes. This preserves the original timing and nuance.

- **Control recordings with tweens.** Because recorded values multiply with tween values, you can use a simple tween fade to bring a recording in and out without editing the recording data itself.

- **Document non-default universe assignments.** Record which universe and channel ranges are assigned to which fixtures in your show documentation. This is critical for troubleshooting and show handoff.

### Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Fixture cue has no effect on stage | Universe or start channel does not match the physical fixture's patch | Verify addressing in the cue's Properties panel against the fixture's DMX patch sheet |
| Fixture cue ignored during playback | Cue is placed inside a composition timeline | Move the fixture cue to the main timeline; fixture cues inside compositions are not supported |
| Channels controlling the wrong parameters | Selected mode does not match the fixture's operating mode | Change the Selected Mode in cue properties to match the fixture's current DMX mode |
| Unexpected values on adjacent universes | Fixture's channel footprint wraps past address 511 | Adjust the start channel so all channels fit within a single universe, or account for the wrap in your addressing plan |
| Recording plays at wrong intensity | Tween values are not at maximum | Set tween channel values to 255 (full) to pass recorded values through unscaled |
| Sudden jumps in channel output | Missing tween keyframes between cue regions | Add intermediate keyframes with appropriate easing curves to smooth transitions |
| No Art-Net packets on network | Network configuration or routing issue | Verify the WATCHOUT machine's network adapter is on the correct subnet for Art-Net (typically 2.x.x.x or 10.x.x.x); check firewall rules |
| Channel values appear scaled down | Channel relation set to Multiply with a master channel below full | Check channel relations and verify the master channel's tween value |
