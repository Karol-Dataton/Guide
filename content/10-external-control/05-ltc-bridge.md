---
title: "LTC Bridge"
---


## LTC Bridge

The LTC Bridge is a standalone service that decodes Linear Time Code (LTC) from an audio input and uses it to synchronize WATCHOUT timeline playback to an external timecode source. This enables frame-accurate synchronization with external audio/video systems, broadcast workflows, and multi-system show environments.

### What Is LTC?

Linear Time Code is a SMPTE timecode format encoded as an audio signal. It carries hours, minutes, seconds, and frames (HH:MM:SS:FF) information in a continuous audio stream, typically on a dedicated audio channel. LTC is widely used in broadcast, film, and live event production to synchronize multiple systems to a common time reference.

### Enabling the LTC Bridge

The LTC Bridge is managed as a service from the **Network** window in Producer. It can be started and stopped on any node that has an audio input device available. When started, it opens a configuration window.

### Configuration

The LTC Bridge configuration window provides the following settings:

**Audio Host** — Select the audio driver type:
- **ASIO** — Low-latency professional audio driver. Recommended for best performance.
- **WASAPI** — Windows Audio Session API (shared mode).
- **WASAPI Exclusive** — WASAPI in exclusive mode for lower latency.

**Audio Device** — Select the audio input device from the list of available devices for the chosen host type.

**Channel** — Select which audio input channel carries the LTC signal. Most setups dedicate a specific channel (e.g., channel 1 or 2) to timecode.

**Director IP** — The IP address of the Director to send synchronization commands to. Defaults to localhost.

**Timeline Selection** — Select one or more timelines that should be synchronized to the incoming LTC. The bridge fetches the available timelines from the Director and presents them in a list. You can select multiple timelines to drive them all from the same timecode source.

### How It Works

The LTC Bridge continuously decodes the audio stream from the selected input channel. When valid timecode frames are detected:

1. **Timeline playback control** — The bridge sends play/pause commands to the Director to start or stop the selected timelines. When the LTC signal is present and running, timelines play. When the signal stops or becomes invalid for more than 100ms, timelines are paused.
2. **Continuous synchronization** — Every second, the bridge sends a timeline sync message to the Director containing the current timecode position and the time dilation (speed relationship between the LTC source and WATCHOUT's internal clock). This keeps WATCHOUT's playback position locked to the external timecode even if clocks drift slightly.
3. **State change detection** — The bridge detects LTC state changes (new sequences, pauses, stops) and responds appropriately — starting playback when timecode begins, pausing when it stops, and resyncing when a new sequence is detected.

The configuration window displays real-time feedback:

- **Timecode display** — Shows the current decoded timecode in HH:MM:SS.FF format.
- **FPS indicator** — Shows the detected frame rate (e.g., 24, 25, 29.97, 30 fps).
- **Drop frame flag** — Indicates whether drop-frame timecode is detected.
- **Volume meter** — Shows the audio input level, helping you verify that the LTC signal is reaching the decoder at an adequate level.
- **Valid indicator** — Shows whether the decoder is currently receiving valid LTC frames.

:::warning
If the volume meter shows no signal or very low levels, the LTC decoder will not be able to extract timecode. Ensure the audio input is correctly routed and the signal level is adequate.
:::

### Multiple Instances

You can run multiple LTC Bridge instances with different instance names, each listening to a different audio input and driving different timelines. This is useful in complex setups where different parts of a show are synchronized to different timecode sources.

### Use Cases

- **Broadcast synchronization** — Lock WATCHOUT playback to the master timecode from a broadcast facility's timecode generator.
- **Multi-system synchronization** — Synchronize WATCHOUT with other media servers, lighting consoles, or audio systems that all share a common SMPTE timecode source.
- **Pre-recorded show playback** — Play back a show in sync with a pre-recorded audio track that carries LTC on one channel.
- **Film and video post-production** — Synchronize visual content with video editing systems using timecode.

### Troubleshooting

**No timecode detected:**
- Verify the correct audio device and channel are selected.
- Check the volume meter — ensure the LTC signal is present and at an adequate level.
- Try switching between ASIO and WASAPI if one driver type doesn't detect the signal.

**Timecode detected but playback doesn't start:**
- Ensure at least one timeline is selected in the Timeline Selection list.
- Verify the Director IP is correct and the Director is running.

**Playback drifts over time:**
- This is usually caused by clock differences. The bridge compensates with periodic sync messages, but very large drift may indicate an unreliable audio clock. Using ASIO drivers typically provides the most stable timing.
