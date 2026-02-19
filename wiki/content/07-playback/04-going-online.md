---
title: "Going Online"
---


## Going Online

WATCHOUT 7 is designed as an always-connected system. Unlike earlier versions of WATCHOUT that had distinct "offline" and "online" modes, WATCHOUT 7 maintains continuous connections between Producer, the Director, and all Runner nodes whenever they are on the same network. There is no "go online" button or mode switch — when Producer connects to a Director and Runners are discovered, the system is live.

This means that "going online" in WATCHOUT 7 is not a single action but a verification process: confirming that all the pieces of your system are connected, synchronized, and ready to deliver reliable output to the audience. This article covers the complete readiness verification process, from confirming service connections through validating asset distribution to performing a final output check.

### What "Always Online" Means in Practice

In WATCHOUT 7, the moment Producer connects to a Director, any playback commands you issue are broadcast to all connected Runners in real time. There is no staging step or mode transition between editing and live output. This has several practical implications:

- **Changes take effect immediately.** When you modify a cue or timeline property while connected to a Director, the change is visible on Runner outputs as soon as the Director processes it.
- **Playback commands are always live.** Pressing Play in Producer starts playback on all connected Runners — there is no "safe" editing mode that prevents output.
- **The system is ready when the connections are ready.** Your focus should be on verifying that all connections are healthy and all assets are in place, rather than looking for a mode switch.

:::tip
If you are migrating from WATCHOUT 6, the key mental shift is this: there is no offline editing mode. When Producer is connected to a Director, you are always live. Use the [Blind Edit Warning](01-starting-and-stopping.md) and timeline lock states (especially Hands Off mode) to protect running timelines from accidental changes.
:::