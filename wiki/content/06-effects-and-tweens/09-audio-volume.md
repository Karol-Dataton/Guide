---
title: "Audio Volume"
---


## Audio Volume

The Volume tween automates the loudness of cues that contain audio content. Whether you need music fade-ins, voice-over ducking, ambience balancing, or precisely timed silence points, the Volume tween provides keyframe-level control over audio levels within each cue's timeline.

### Volume Tween

The Volume tween controls the playback volume of a cue's audio:

- **Range:** 0 to 100
- **Default:** 100 (full volume)
- **Unit:** percentage

A value of 100% plays the audio at its original level. A value of 0% silences the audio completely. Intermediate values attenuate the audio proportionally. The range is hard-limited — you cannot amplify audio beyond 100% (the original source level). To increase perceived loudness, the source media itself must be louder.

### Adding a Volume Tween

To add volume automation to a cue:

1. Select one or more cues that contain audio in the Timeline.
2. Open the **Effect** menu and click **Volume**, or press **Alt+V**.
3. The Volume tween appears in the tween area beneath the cue, within the **General** group.

The tween starts at its default value of 100% (full volume). Add tween points at different times with different volume levels to shape the audio level over the cue's duration.

:::note
The Volume tween only affects cues that have audio content. Adding a volume tween to a purely visual cue (such as an image or video without an audio track) has no effect.
:::

### Common Use Cases

- **Music fade-in** — start at 0% and ramp to 100% over the desired duration. Use **Cubic Out** or **Sinusoidal Out** easing for a natural-sounding fade-in that reaches full volume gradually.
- **Music fade-out** — ramp from 100% to 0% at the end of the cue. **Cubic In** or **Sinusoidal In** easing produces a gradual, natural decay. Avoid **Linear** for audio fades — it tends to sound abrupt because human perception of loudness is logarithmic.
- **Voice-over ducking** — when a narration cue starts, reduce the background music cue's volume to 20–30% using a quick tween transition (0.3–0.5 seconds), hold at the reduced level for the duration of the voice-over, then ramp back to 100% when the narration ends.
- **Layered ambience balancing** — when multiple audio cues overlap (for example, music, ambient sound effects, and narration), use volume tweens on each cue to set the relative levels. This creates a mix without requiring an external audio mixer.
- **Silence points** — drop volume to 0% at a specific moment (for example, during a dramatic pause) and restore it afterward.
- **Gradual ambience transitions** — in long ambient soundscapes, slowly cross-fade between two audio cues by ramping one down from 100% to 0% while ramping another up from 0% to 100%.

### Volume Tween vs. Fades

The Volume tween and the [fade system](05-opacity-and-fades.md) both affect audio, but they work differently:

| | Volume Tween | Fade System |
|---|---|---|
| **Scope** | Audio only | Both opacity and volume (for compositions; opacity only for standard cues) |
| **Control** | Full keyframe control over the entire cue duration | Fixed ramp at start and/or end |
| **Precision** | Unlimited tween points with individual easing curves | Single duration and curve per fade |
| **Best for** | Complex volume automation, ducking, mid-cue level changes | Quick standard fade-in/out transitions |

When you apply a **Fade-in** or **Fade-out** to a [Composition](../05-timeline-and-cues/10-compositions.md), the fade affects both the visual opacity and the audio volume of all cues inside the composition simultaneously. For standard media cues, fades affect only opacity — use the Volume tween for audio control.

If both a Volume tween and a composition-level fade are active, their effects combine (multiply). A volume tween at 50% during a composition fade at 50% results in 25% effective volume.

### Shaping Audio Transitions

Easing curve selection is particularly important for volume tweens because human hearing perceives loudness on a logarithmic scale. The same easing curve that looks smooth visually may sound abrupt for audio:

- **For fade-ins:** Use **Out** curves (Cubic Out, Sinusoidal Out, Quadratic Out). These start fast and slow down toward the end, which matches how we perceive a natural volume increase.
- **For fade-outs:** Use **In** curves (Cubic In, Sinusoidal In, Quadratic In). These start slowly and accelerate toward silence, producing a smooth perceptual decay.
- **Avoid Linear easing** for audio fades in most cases. A linearly decreasing volume level sounds like it drops quickly at first and then lingers at low levels, because our ears are more sensitive to changes in quiet sounds than loud sounds.
- **For sharp cuts:** Use Linear with a very short transition time (under 0.1 seconds) for a clean, intentional cut rather than a fade.

:::tip
If an audio fade does not sound smooth, try switching from Linear to Cubic In (for fade-outs) or Cubic Out (for fade-ins). The difference is subtle visually but significant audibly.
:::

### Working with Multiple Audio Cues

In shows with multiple overlapping audio sources, the Volume tween on each cue controls only that cue's contribution to the audio mix. All active audio cues are mixed together at the output stage. There is no master volume tween — the combined output level is the sum of all playing audio cues at their respective volume levels.

To manage the overall mix:

- Use Volume tweens on individual cues to set relative levels.
- Keep the total number of simultaneous full-volume audio cues reasonable to avoid output clipping.
- If total output is too loud, reduce the volume of the loudest contributor rather than trying to attenuate everything equally.

### Combining with Other Effects

Volume tweens can be coordinated with visual effects for cohesive transitions:

- **Opacity + Volume** — fade both visual and audio together for a complete scene fade. Add matching Opacity and Volume tweens with similar timing and easing to a cue for a unified fade-in or fade-out.
- **Position + Volume** — reduce volume as content moves off-screen and increase it as content enters, creating a spatial audio effect.
- **Blur + Volume** — blur and quiet content simultaneously for a "fading into the background" effect that works on both visual and auditory levels.

### Practical Tips

- Always preview audio transitions through the actual output routing path. Headphones and workstation speakers have different characteristics than the show's speaker system.
- For voice-over ducking, 20–30% background music volume is a common starting point. Adjust based on the relative loudness of the narration source and the music content.
- Keep fade-in and fade-out durations at least 0.1 seconds to avoid audible clicks or pops from abrupt level changes. Even "instant" cuts benefit from a very brief ramp.
- If your show uses [Tween Expressions](16-tween-expressions.md), you can drive volume from a variable for real-time level control during live operation — for example, linking a variable to an external fader via ArtNet or OSC.
- Volume at 0% silences the audio but does not stop playback. The audio source continues to decode in the background, so restoring volume at a later point resumes from the correct position in the audio timeline.
