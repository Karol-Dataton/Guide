---
title: "Running Your Show"
---


## Running Your Show

Running a show reliably is about establishing repeatable procedures that you follow before, during, and after every performance. WATCHOUT provides a range of tools for automating multi-timeline playback, coordinating complex sequences, and monitoring system health in real time. This article covers everything from pre-show preparation through live operation to post-show procedures, including the automation features — control cues, timeline triggers, and auto-run — that make complex shows manageable.

### Pre-Show Checklist

Before every performance, work through this checklist systematically. Skipping steps under time pressure is how shows fail.

1. **Verify system readiness.** Complete the full readiness checklist in [Going Online](04-going-online.md) — confirm Director connection, Asset Manager connection, all Runners visible, asset transfers complete, NTP sync healthy.

2. **Confirm the show file.** Check that the correct version of the show is loaded on the Director and all Runners. Save the show (**Ctrl+S** / **Cmd+S**) to ensure the latest version is committed.

3. **Verify display routing.** Confirm that each display is assigned to the correct Runner and that physical outputs are active and showing the expected content.

4. **Check timeline start positions.** Navigate the play cursor to the planned starting point on each timeline. For shows with multiple timelines, verify that all timelines are in their expected initial states (stopped, paused at a hold point, or ready to auto-run).

5. **Check cue logic.** If your show uses control cues to trigger other timelines, verify that the target references are correct by reviewing control cue properties.

6. **Test external outputs.** If your show sends Art-Net, OSC, or other protocol data, verify that target devices are responding to test commands.

7. **Review the message bell.** Click the message bell icon in the Producer menu bar and clear any outstanding errors or warnings. Investigate anything that could affect the performance.

8. **Confirm auto-run timelines.** If any timelines are set to Auto Run, verify that these are the ones you intend to start automatically. Disable Auto Run on any timelines that should wait for manual triggering.

9. **Run a verification pass.** Play the show (or critical sections of it) end-to-end and verify output on all physical displays. See [Going Online](04-going-online.md) for the verification procedure.

### Auto Run

When **Auto Run** is enabled on a timeline, that timeline automatically begins playing as soon as the show is loaded by the Director. This is configured per-timeline in the timeline properties.

Auto Run is essential for:

- **Unattended installations** — permanent installations where the show must start automatically when the system powers on, without an operator present
- **Background loops** — timelines that provide ambient content and should always be running
- **System startup sequences** — timelines that initialize lighting states, video backgrounds, or other persistent elements

:::tip
Auto Run timelines start when the Director loads the show, not when Producer connects. This means they work correctly even in installations where the Director runs on a dedicated machine that starts automatically. The show begins as soon as the Director service starts and loads the show file.
:::

To set Auto Run, select the timeline and enable **Auto Run** in the timeline properties panel.

### Control Cues

Control cues are special cues placed on a timeline that can start, stop, or pause other timelines. They are the primary mechanism for building complex, multi-timeline sequences that execute automatically as a timeline plays.

#### Adding Control Cues

- **Ctrl+P** / **Cmd+P** — add a Play control cue at the current play cursor position
- **Ctrl+Shift+P** / **Cmd+Shift+P** — add a Pause control cue at the current play cursor position
- Or use the **Timeline** menu: **Add Play Control Cue** or **Add Pause Control Cue**

#### Control Cue Properties

Each control cue has three key settings:

**State** — what the control cue does to its target timelines:
| State | Effect |
|---|---|
| **Play** | Starts the target timelines |
| **Pause** | Pauses the target timelines at their current position |
| **Stop** | Stops the target timelines and clears their active state |

**Jump** — where the target timeline's play cursor should go before the state change takes effect:
| Jump Mode | Behavior |
|---|---|
| **No Jump** | The target timeline's play cursor stays where it is; the state change applies at the current position |
| **To Time** | The target timeline's play cursor jumps to a specific time before the state change |
| **To Cue** | The target timeline's play cursor jumps to a named cue before the state change |
| **Backwards to Cue** | The target timeline's play cursor jumps backward to the nearest previous instance of a named cue |

**Target** — which timelines the control cue affects:
| Target Mode | Scope |
|---|---|
| **This** | The timeline that contains the control cue (useful for self-stopping or self-looping timelines) |
| **Specific timelines** | One or more named timelines |
| **All** | All timelines in the show (with optional exclusions) |
| **List** | A specified list of timelines and/or folders |

#### Common Control Cue Patterns

**Sequential scenes:** A master timeline with control cues that start each scene's timeline in sequence, with appropriate jump-to-time settings so each scene begins from its start.

**Self-looping timeline:** A timeline with a Play control cue at the end that targets "This" with "Jump to Time: 0," causing the timeline to restart from the beginning when it reaches the end.

**Coordinated stops:** A control cue that stops all timelines except the master, used to create a clean transition point between show sections.

**Cue-based navigation:** Control cues that jump other timelines to named cues, allowing a single master timeline to drive non-linear navigation through the show.

### Timeline Triggers

Timelines support three expression-based triggers that can automatically change their playback state based on show variables:

| Trigger | Effect |
|---|---|
| **Play Expression** | When this expression evaluates to true, the timeline starts playing |
| **Pause Expression** | When this expression evaluates to true, the timeline pauses |
| **Stop Expression** | When this expression evaluates to true, the timeline stops |

Expressions are mathematical formulas that reference show variables. Show variables can be set by external control protocols (OSC, Art-Net, etc.), by other parts of the show, or by custom logic. This makes timeline triggers the bridge between WATCHOUT and external control systems.

**Example use cases:**

- A play expression tied to an OSC variable that a lighting console sends when a particular lighting cue fires, synchronizing video playback with the lighting sequence
- A stop expression tied to a sensor variable, halting a timeline when motion is no longer detected
- A pause expression tied to a show variable that an operator toggles from a custom control panel

Configure triggers in the timeline properties panel under **Play Expression**, **Pause Expression**, and **Stop Expression**.

### Monitoring During the Show

During live operation, keep these monitoring tools active:

#### Menu Bar Indicators

The Producer menu bar provides real-time status at a glance:

- **FPS display** — the current rendering frame rate. A stable frame rate confirms that Producer is keeping up.
- **Director hostname** — confirms you are connected to the correct Director.
- **Asset Manager hostname** — confirms the Asset Manager connection is active.
- **Node activity badge** (clock icon) — appears when any node has active downloads or processing work. This should be clear during a show — if it appears mid-performance, an asset may be missing or re-downloading.
- **Message bell** — opens a notification dropdown showing errors and warnings from all connected nodes. Check this periodically during the show for early warning of problems.

#### Node Metrics Dashboard

The Node Metrics dashboard (**Nodes** window, metrics view) shows real-time charts for CPU, GPU, memory, network, drive activity, and render performance across all Runner nodes. During a show, watch for:

- **FPS drops** — a Runner's frame rate falling below the target indicates it is struggling with the current content load
- **High CPU or GPU usage** — sustained high usage suggests the machine is near its capacity
- **Dropped frames** — any dropped frames indicate that content is not being delivered smoothly to the display

#### Cue List Window

The Cue List window provides a timeline-independent view of all cues in the show, useful for monitoring which cues are active and verifying that cue sequencing is proceeding as expected.

### Auto-Save

WATCHOUT automatically saves the show at regular intervals during operation. Auto-save files are stored in a dedicated directory and can be accessed from **Help > Open Auto-Saves Directory**. The system keeps recent auto-save files and removes the oldest ones as new saves are made.

Auto-save is a safety net — it does not replace explicit saves before a show. Always save manually (**Ctrl+S** / **Cmd+S**) before a performance. Use **Save As** (**Ctrl+Shift+S** / **Cmd+Shift+S**) to create a named backup if you are making significant changes.

Additional save options:

- **Save Copy** — saves a copy of the show to a different location without changing the current file reference
- **Create Archive** — packages the show file with all referenced assets into a single archive for transport or backup

### Handling Problems During a Show

Even with thorough preparation, issues can arise during live performance. Here are common scenarios and recovery approaches:

| Problem | Symptoms | Recovery |
|---|---|---|
| **Timing drift** | Content on different displays falls out of sync | Pause the timeline, reposition the play cursor to a known sync point, and restart. If drift recurs, check NTP synchronization on all nodes. |
| **Missing content** | A display shows black or placeholder media where content should be | Check the node activity badge — the asset may be re-downloading. If not, verify that the asset exists on the Asset Manager and that the Runner can reach it. |
| **Runner failure** | One display goes dark or freezes | Check the Nodes window for the affected Runner's status. If the Runner has disconnected, the show continues on all other outputs. Recover the node during a planned hold or scene transition. |
| **Frame drops** | Stuttering or jerky playback on one or more displays | Check the Node Metrics dashboard for the affected Runner. Reduce content load if possible (disable non-essential layers or effects). |
| **Wrong content on display** | A display shows content meant for a different output | Verify display-to-host assignments in display properties. This likely indicates a routing configuration error — correct it and the fix takes effect immediately. |
| **Control cue not firing** | A timeline that should be triggered by a control cue does not start | Check that the target timeline name in the control cue matches the actual timeline name. Also check if the target timeline is in Hands Off mode, which prevents it from responding to playback commands. |
| **External trigger not working** | A timeline with a play expression does not start when expected | Verify that the external system is sending the expected variable value. Check the expression syntax in the timeline properties. |

:::warning
Avoid editing running timelines during a live show unless absolutely necessary. The blind edit warning exists for a reason — changes to cues on a running timeline can produce unexpected visual results. If you must make a correction, prefer stopping or pausing the timeline first, making the change, and then restarting.
:::

### Live Operation Best Practices

- **Follow a fixed procedure.** Establish a pre-show, show, and post-show routine and follow it every time. Consistency prevents errors.
- **Use control cues for automation.** The more your show runs on control cues and triggers rather than manual button presses, the more repeatable and reliable it becomes.
- **Keep one timeline as the master.** In multi-timeline shows, designate one timeline as the master that drives the overall show progression. Other timelines should be started and stopped by control cues on the master.
- **Use Hands Off mode during performance.** Set timelines to Hands Off that should not be interrupted, especially background loops or always-on content timelines.
- **Monitor the message bell.** Errors and warnings from Runners appear here before they become visible to the audience. Early detection means you can address problems before they are noticeable.
- **Save before every show.** Make an explicit save before the house opens. After the show, save again if any changes were made during the performance.
- **Know your recovery points.** Identify points in the show timeline where you can safely pause, jump to, and restart. Practice recovering from these points during rehearsal.

### Post-Show Procedures

After the performance:

1. **Save the show.** If any changes were made during the performance (even minor cursor position adjustments), save the show to preserve the current state.

2. **Save an archival copy.** Use **Save Copy** or **Create Archive** to create a timestamped backup of the show as performed. This is invaluable for troubleshooting, future references, or recreating the show at another venue.

3. **Review the message log.** Check the message bell for any errors or warnings that occurred during the performance. Even if nothing was visibly wrong, warnings may indicate developing problems that could affect future performances.

4. **Document any changes.** If you modified timelines, display routing, or any other configuration during the show, record what was changed and why. This information helps the next operator and prevents confusion at the next performance.

5. **Check Runner performance logs.** Review the Node Metrics dashboard or individual node detail views for any concerning trends — rising CPU/GPU usage, intermittent frame drops, or memory pressure that could indicate a problem developing over time.

### Relationship to Other Articles

- For playback controls (run, pause, stop, keyboard shortcuts), see [Starting and Stopping](01-starting-and-stopping.md).
- For previewing content before going live, see [Preview Mode](02-preview-mode.md).
- For setting up and verifying network connections, see [Connecting to Display Servers](03-connecting-to-display-servers.md).
- For the full system readiness checklist, see [Going Online](04-going-online.md).
