---
title: "WATCHOUT 6 Protocol"
---


## WATCHOUT 6 Protocol

WATCHOUT 7 includes a backward-compatible WATCHOUT 6 command interface. It is intended for existing integrations (Crestron, AMX, Extron, custom scripts) that already speak WO6 command syntax.

This page documents behavior as implemented in the current WO6 compatibility source code.

### Transport and Framing

- **Ports:** `3040` (WATCHMAKER) and `3039` (WATCHPOINT)
- **Protocols:** TCP and UDP listeners are started on both ports
- **Frame delimiter:** `\r\n` (CRLF)
- **Max incoming frame size:** 4096 bytes
- **Text format:** command-oriented text protocol, one command per frame

Use CRLF in clients even if some line-ending variants may be tolerated.

### Request IDs (`[id]` Prefix)

Commands may be prefixed with an ID tag: `[my-id]ping`

- TCP replies echo this prefix: `[my-id]Ready ...`
- For commands that return an empty success payload, the response is just the tag plus CRLF: `[my-id]\r\n`
- For subscription commands with IDs, the first tagged response is empty acknowledgement; streamed updates then arrive untagged

### Main Timeline Behavior

Commands that omit a timeline name target a timeline named exactly `Main Timeline`.

If that timeline does not exist, those commands fail with runtime error responses.

### Syntax Rules

- Command names are case-sensitive (`getStatus`, not `getstatus`)
- Boolean arguments are `true` or `false`
- Names containing spaces must be quoted
- Extra unexpected tokens cause parse/runtime errors
- Time values accept:
  - milliseconds: `5000`
  - timestamp: `HH:MM:SS.FFF`
  - Medialon style: `HH:MM:SS/FFF`

### Response Formats

| Type | Wire format | Used by |
|---|---|---|
| `Ready` | `Ready "&lt;version&gt;" "WATCHMAKER" "&lt;OS&gt;" &lt;bool&gt;` | `ping`, `authenticate`, final phase of `load` |
| `Status` (old style) | `Reply ...` | `getStatus` (no args) |
| `Status` (new style) | `Status "" ...` | `getStatus 1/2` (general) |
| `Timeline status` | `Status "TaskList:mItemList:mItems:TimelineTask \"&lt;name&gt;\"" &lt;state&gt; &lt;pos&gt; &lt;world_clock&gt;` | timeline variant of `getStatus` |
| `Busy` | `Busy "Open" "" 0` | first phase of `load` |
| `Reply JSON` | `Reply { ... }` | `getInputs`, `getAuxTimelines`, `getControlCues` |
| `Empty` | empty payload (blank line) | most action commands on success |
| `Error` | `Error &lt;code 1-8&gt; 0 "&lt;message&gt;"` | parse/runtime/auth/unsupported failures |

### getStatus Modes

`getStatus` is one command with multiple modes (including timeline status and subscriptions).

| Request | Behavior | Response |
|---|---|---|
| `getStatus` | old WO6 polling style | one `Reply ...` |
| `getStatus 2` | one-shot general status | one `Status "" ...` |
| `getStatus 1` | subscribe general status | status stream (`Status "" ...`) |
| `getStatus 0` | unsubscribe general status | empty |
| `getStatus 2 "TaskList:mItemList:mItems:TimelineTask \"Timeline 1\""` | one-shot timeline status | one timeline `Status ...` |
| `getStatus 1 "TaskList:mItemList:mItems:TimelineTask \"Timeline 1\""` | subscribe timeline status | timeline status stream |
| `getStatus 0 "TaskList:mItemList:mItems:TimelineTask \"Timeline 1\""` | unsubscribe timeline status | empty |

Timeline state values in timeline-status responses are:

- `0` = stopped
- `1` = paused
- `2` = running

### Implemented Commands

| Command | Syntax | Success response | Notes |
|---|---|---|---|
| `authenticate` | `authenticate &lt;level&gt;` | `Ready ...` | level is accepted; current implementation always returns ready |
| `ping` | `ping` | `Ready ...` | keepalive/version check |
| `run` | `run [timeline_name]` | empty | no name = `Main Timeline` |
| `halt` | `halt [timeline_name]` | empty | no name = `Main Timeline` |
| `kill` | `kill &lt;timeline_name&gt;` | empty | timeline name required |
| `reset` | `reset` | empty | stops aux timelines, sets main timeline to paused at time 0 |
| `getStatus` | see mode table above | `Reply ...` / `Status ...` / stream / empty | replaces separate legacy status commands |
| `gotoTime` | `gotoTime &lt;time&gt; [timeline_name]` | empty | preserves run/pause state; stopped timelines are resumed as paused after jump |
| `gotoControlCue` | `gotoControlCue &lt;cue_name&gt; [reverse_only] [timeline_name]` | empty | default search is forward then backward fallback |
| `setInput` | `setInput &lt;input_name&gt; &lt;value_or_delta&gt; [transition_ms]` | empty | `+x`/`-x` are relative changes |
| `setInputs` | `setInputs &lt;transition_ms&gt; &lt;input_name&gt; &lt;value_or_delta&gt; ...` | empty | transition is required; use `0` for immediate |
| `getInputs` | `getInputs [input_name]` | `Reply {"Inputs":...}` | returns one or all mapped inputs |
| `getAuxTimelines` | `getAuxTimelines [tree]` | `Reply { ... }` | `tree` selects tree-shaped reply payload |
| `getControlCues` | `getControlCues &lt;filter 0-7&gt; [timeline_name]` | `Reply {"Layers":...}` | filter bitmask: 1 no-op, 2 cross-timeline target, 4 unnamed |
| `load` | `load &lt;path&gt; [condition] [go_online]` | `Busy ...` then `Ready ...` | `condition`/`go_online` are parsed for compatibility; relative paths resolve via configured show directory |
| `online` | `online &lt;bool&gt;` | empty | accepted for compatibility; currently no-op |

`setInput` and `setInputs` value syntax:

- absolute: `1.0`
- relative increase: `+0.5`
- relative decrease: `-0.5`

### Parsed but Not Implemented

These commands are parsed, but currently return runtime unimplemented errors (`Error 7 0 "Request ... is not implemented in WATCHOUT 7 yet."`) on TCP:

- `hitTest &lt;x&gt; &lt;y&gt;`
- `list &lt;magic_path&gt; [depth]`
- `getStage`
- `standBy &lt;bool&gt; [transition_ms]`
- `setRate &lt;float&gt;`
- `timecodeMode &lt;option&gt; [offset]`
- `powerDown`
- `setLogoString &lt;string&gt;`
- `getFile [look_in_shows] &lt;magic_path&gt;`
- `serialPort &lt;open&gt; &lt;name&gt; [protocol] [baud] [data_bits] [stop_bits] [parity]`
- `enableLayerCond &lt;condition&gt;`
- `wait`

### Discover Compatibility Command

`discover &lt;digits&gt;` is accepted for legacy compatibility traffic.

- TCP: returns empty response
- UDP: ignored (no response)

### UDP Behavior

UDP support is fire-and-forget: no responses are sent.

- Side-effect commands (for example `run`, `halt`, `gotoTime`, `setInput`) are executed
- Response-oriented commands are ignored on UDP, including `getStatus`, `getInputs`, `getAuxTimelines`, `getControlCues`, `list`, `getStage`, `getFile`, and `hitTest`

### Differences from Older WO6 Integrations

- `getTimelineStatus`, `subscribeStatus`, and related timeline-subscribe commands are represented through `getStatus` mode variants
- `loadShow` is `load`
- `online` is accepted but does not change runtime behavior
- Main-timeline defaults require a timeline named `Main Timeline`
- `hitTest` is not implemented in this protocol path

### Migration Guidance

Use WO6 protocol compatibility to keep existing control systems running, but prefer newer interfaces for new development:

- [HTTP REST API](06-http-rest-api.md) for complete control surface and modern integrations
- [OSC Protocol](03-osc-protocol.md) for OSC-native show control systems

The WO6 layer is a compatibility bridge, not a full feature surface for WATCHOUT 7-specific workflows.
