---
title: "HTTP REST API"
---


## HTTP REST API

WATCHOUT exposes a comprehensive HTTP REST API for programmatic control from external systems. The API provides endpoints for timeline playback control, variable input, show management, hit testing, cue set state management, and real-time event streams. It is the most feature-complete external control interface available in WATCHOUT.

### Base URL and Port

The API is served by the Operative on **port 3019**. The base URL is:

`http://{host}:3019`

Replace `{host}` with the IP address or hostname of the machine running the Operative. For local access, use `localhost` or `127.0.0.1`.

The API is enabled or disabled from the **Network** window using the **WATCHOUT 7 Protocol** and **Web UI** toggles.

### Interactive API Documentation

WATCHOUT includes built-in interactive API documentation powered by RapiDoc. Access it at:

`http://{host}:3019/test`

This page provides a browsable interface for all endpoints, including request/response schemas, example payloads, and the ability to send test requests directly from the browser. The underlying OpenAPI specification is available at `/api-docs/openapi.json`.

### Playback Control

**Play a timeline:**
`POST /v0/play/{timeline_id}`

**Pause a timeline:**
`POST /v0/pause/{timeline_id}`

**Stop a timeline** (resets to beginning):
`POST /v0/stop/{timeline_id}`

**Jump to a specific time:**
`POST /v0/jump-to-time/{timeline_id}?time={ms}&state={play|pause}`

The `time` parameter is in milliseconds. The optional `state` parameter controls whether the timeline plays or pauses after jumping (default: `pause`).

**Jump to a specific cue:**
`POST /v0/jump-to-cue/{timeline_id}/{cue_id}?state={play|pause}`

Jumps to the start time of the specified cue. The optional `state` parameter works the same as jump-to-time.

**Get playback state:**
`GET /v0/state`

Returns the current playback state for all timelines, including positions and play/pause status.

### Variable Input

**Set multiple variables (batch):**
`POST /v0/inputs`

Request body is a JSON array of input objects:

```json path=null start=null
[
  {"key": "brightness", "value": 100.0, "duration": 2000},
  {"key": "volume", "value": 0.5}
]
```

Each object has:
- `key` (string, required) — The external key matching a WATCHOUT variable.
- `value` (number, required) — The numeric value to set.
- `duration` (number, optional) — Interpolation duration in milliseconds. If omitted, the default 50ms interpolation is used.

**Set a single variable:**
`POST /v0/input/{key}?value={number}&duration={ms}`

A simpler endpoint for setting one variable at a time via URL parameters.

**Get all variables:**
`GET /v0/inputs`

Returns a map of all input variable specifications including their external keys, value ranges, and defaults.

### Show Management

**Get current show:**
`GET /v0/show`

Returns the complete show data including timelines, cues, inputs, and revision information.

**Upload show (JSON):**
`POST /v0/show`

Upload a new show in JSON format. Replaces the currently loaded show.

**Upload show (binary):**
`POST /v0/showfile`

Upload a complete show file in WATCHOUT binary format.

**Get timelines:**
`GET /v0/timelines`

Returns all timelines with their names and IDs.

**Get cues for a timeline:**
`GET /v0/cues/{timeline_id}`

Returns all cues for a specific timeline including names and IDs.

### Cue Set State Management

Cue sets (also called cue groups) can be switched via the API:

**By ID:**
- `POST /v0/cue-group-state/by-id/{group_id}/{variant_id}` — Set a single group.
- `POST /v0/cue-group-state/by-id` — Set multiple groups (JSON body mapping group IDs to variant IDs).
- `GET /v0/cue-group-state/by-id` — Get current states.

**By name:**
- `POST /v0/cue-group-state/by-name/{group_name}/{variant_name}` — Set a single group.
- `POST /v0/cue-group-state/by-name` — Set multiple groups (JSON body mapping group names to variant names).
- `GET /v0/cue-group-state/by-name` — Get current states.

### Hit Testing

`POST /v0/hittest`

Tests whether a coordinate point hits any of the specified cues. This is useful for interactive installations where user input (touch, pointer, etc.) needs to determine which visual element was selected.

Request body:

```json path=null start=null
{
  "cues": ["1/42", "1/43"],
  "x": 960.0,
  "y": 540.0
}
```

The response lists which cues contain the point. Hit testing evaluates all tweens (position, scale, rotation, corner pinning) at the current playback time for accurate results with animated content.

:::note
Hit testing only supports visual media cues on timelines. Audio, control, output, variable, and comment cues are not supported. Cues with conditional rendering are also rejected.
:::

### Real-Time Event Streams

WATCHOUT provides Server-Sent Events (SSE) and Newline-Delimited JSON (NDJSON) streams for receiving real-time updates:

**SSE endpoints:**
- `/v0/sse` — Legacy event stream.
- `/v1/sse` — Includes initial state on connect, excludes countdown and diff events.
- `/v2/sse` — Optimized stream with diff-based playback updates and interpolated variable values.

**NDJSON endpoints:**
- `/v0/ndjson`, `/v1/ndjson`, `/v2/ndjson` — Same event data as their SSE counterparts, delivered as newline-delimited JSON.

The event streams emit the following event types:
- **PlaybackState** — Current playback state for all timelines.
- **Inputs** — Variable value changes.
- **ShowRevision** — Notifications when the show is updated.
- **TimelineCountdowns** — Countdown information for upcoming cues.
- **CueVisibility** — Cue enter/exit events.

The v1 and v2 streams include the initial show state when a client connects, making them suitable for dashboards and monitoring applications.

### System Information

`GET /info`

Returns build information about the WATCHOUT system.

### Authentication

The HTTP API does not require authentication by default. All endpoints are accessible to any client that can reach the Operative's port. If the API is exposed on an untrusted network, consider using firewall rules to restrict access.

### Use Cases

- **Web-based control panels** — Build browser-based dashboards that monitor and control WATCHOUT playback using the REST API and SSE streams.
- **Custom automation scripts** — Use `curl`, Python `requests`, or any HTTP client to script show control sequences.
- **Interactive installations** — Combine hit testing with variable input to create touch-reactive or pointer-reactive experiences.
- **Third-party integration** — Connect show control systems, building management systems, or IoT platforms that speak HTTP/JSON.
