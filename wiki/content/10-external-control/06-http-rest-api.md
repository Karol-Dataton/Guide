---
title: "HTTP REST API"
---

## HTTP REST API

WATCHOUT exposes an HTTP API for programmatic show control, monitoring, and integration with third-party systems. This page is organized as a practical reference with one complete endpoint table and focused examples.

### Base URLs and Ports

- **Operative API (main external control API):** `http://{host}:3019`
- **Node Management API (per Runner node):** `http://{node_host}:3017`
- **Asset Manager event stream (internal tooling/UI):** `http://{asset_manager_host}:3023`

Replace `{host}` with the IP address or hostname of the machine running the relevant service. For local testing, use `localhost` or `127.0.0.1`.

### Enable/Disable

The HTTP API is controlled from the **Network** window. Use the **WATCHOUT 7 Protocol** and **Web UI** toggles to expose or hide HTTP-facing features.

### Interactive API Docs

- Interactive docs (RapiDoc): `http://{host}:3019/test`
- OpenAPI spec: `http://{host}:3019/api-docs/openapi.json`

### Complete Endpoint Table

The table below lists all documented HTTP endpoints in WATCHOUT.

| Scope | Port | Method | Endpoint | Purpose | Notes |
|---|---:|---|---|---|---|
| System | 3019 | `GET` | `/info` | Get build/version info | Operative |
| Docs | 3019 | `GET` | `/test` | Interactive API documentation UI | Operative |
| Docs | 3019 | `GET` | `/api-docs/openapi.json` | OpenAPI schema | Operative |
| Playback | 3019 | `GET` | `/v0/state` | Get playback state for all timelines | Operative |
| Playback | 3019 | `POST` | `/v0/play` | Play all timelines | Legacy-compatible endpoint |
| Playback | 3019 | `POST` | `/v0/play/{timeline_id}` | Play one timeline | `timeline_id` is numeric |
| Playback | 3019 | `POST` | `/v0/pause/{timeline_id}` | Pause one timeline | `timeline_id` is numeric |
| Playback | 3019 | `POST` | `/v0/stop/{timeline_id}` | Stop one timeline and reset to start | `timeline_id` is numeric |
| Playback | 3019 | `POST` | `/v0/jump-to-time/{timeline_id}` | Jump timeline to time | Query: `time` (ms), optional `state` (`play` or `pause`, default `pause`) |
| Playback | 3019 | `POST` | `/v0/jump-to-cue/{timeline_id}/{cue_id}` | Jump timeline to cue start | Query: optional `state` (`play` or `pause`, default `pause`) |
| Show | 3019 | `GET` | `/v0/show` | Get full current show JSON | Operative |
| Show | 3019 | `POST` | `/v0/show` | Load/replace show from JSON | Body: show JSON |
| Show | 3019 | `POST` | `/v0/showfile` | Load/replace show from binary `.watch` data | Body: binary |
| Show | 3019 | `POST` | `/v0/showfile?showName={name}` | Load `.watch` and set show name | Optional query variant |
| Show | 3019 | `GET` | `/v0/timelines` | List timelines | Includes IDs and names |
| Show | 3019 | `GET` | `/v0/cues/{timeline_id}` | List cues for timeline | Includes IDs and names |
| Inputs | 3019 | `GET` | `/v0/inputs` | Get all input variable specs | Includes keys and ranges |
| Inputs | 3019 | `POST` | `/v0/inputs` | Set multiple inputs (batch) | Body: JSON array of input updates |
| Inputs | 3019 | `POST` | `/v0/input/{key}` | Set one input | Query: `value`, optional `duration` (ms) |
| Cue Sets | 3019 | `GET` | `/v0/cue-group-state/by-id` | Get cue set states by IDs | Operative |
| Cue Sets | 3019 | `POST` | `/v0/cue-group-state/by-id` | Set multiple cue set states by IDs | Body: JSON map (`groupId` -> `variantId`) |
| Cue Sets | 3019 | `POST` | `/v0/cue-group-state/by-id/{group_id}/{variant_id}` | Set one cue set by IDs | Path params |
| Cue Sets | 3019 | `GET` | `/v0/cue-group-state/by-name` | Get cue set states by names | Operative |
| Cue Sets | 3019 | `POST` | `/v0/cue-group-state/by-name` | Set multiple cue set states by names | Body: JSON map (`groupName` -> `variantName`) |
| Cue Sets | 3019 | `POST` | `/v0/cue-group-state/by-name/{group_name}/{variant_name}` | Set one cue set by names | Path params |
| Interaction | 3019 | `POST` | `/v0/hittest` | Hit-test stage coordinates against cues | Body includes `cues`, `x`, `y` |
| MSC | 3019 | `POST` | `/v0/msc` | Send MIDI Show Control command(s) | Body: JSON array |
| Stream (SSE) | 3019 | `GET` | `/v0/sse` | Legacy SSE stream | Real-time updates |
| Stream (SSE) | 3019 | `GET` | `/v1/sse` | SSE stream with initial state | Real-time updates |
| Stream (SSE) | 3019 | `GET` | `/v2/sse` | Optimized SSE stream (diff-based playback updates) | Real-time updates |
| Stream (NDJSON) | 3019 | `GET` | `/v0/ndjson` | Legacy NDJSON stream | Same event model as `/v0/sse` |
| Stream (NDJSON) | 3019 | `GET` | `/v1/ndjson` | NDJSON stream with initial state | Same event model as `/v1/sse` |
| Stream (NDJSON) | 3019 | `GET` | `/v2/ndjson` | Optimized NDJSON stream | Same event model as `/v2/sse` |
| Node Mgmt | 3017 | `POST` | `/v0/shutdown` | Shut down target node OS | Sent to a specific node |
| Node Mgmt | 3017 | `POST` | `/v0/reboot` | Reboot target node OS | Sent to a specific node |
| Node Mgmt | 3017 | `POST` | `/v0/services/restart` | Restart WATCHOUT services on target node | Sent to a specific node |
| Asset Manager | 3023 | `GET` | `/sse` | Asset-state event stream used by tooling/UI | Not part of main Operative control API |

### Request Body Formats

**Batch input update (`POST /v0/inputs`)**

```json
[
  {"key": "brightness", "value": 100.0, "duration": 2000},
  {"key": "volume", "value": 0.5}
]
```

- `key` (string, required): external key mapped to a WATCHOUT variable
- `value` (number, required): numeric value to apply
- `duration` (number, optional): interpolation duration in milliseconds

**Single input update (`POST /v0/input/{key}`)**

Use query parameters instead of JSON body:

`/v0/input/brightness?value=100&duration=2000`

**Cue set batch update by name (`POST /v0/cue-group-state/by-name`)**

```json
{
  "Language": "English",
  "Sponsor": "BrandB"
}
```

Send `{}` to reset all cue sets to default variants.

**Hit test (`POST /v0/hittest`)**

```json
{
  "cues": ["1/42", "1/43"],
  "x": 960.0,
  "y": 540.0
}
```

Response includes `hit_cues` with IDs that contain the given point.

```json
{
  "hit_cues": ["1/42"]
}
```

**MIDI Show Control (`POST /v0/msc`)**

```json
[
  {"command": {"go": {}}}
]
```

### Event Streams

WATCHOUT provides SSE and NDJSON endpoints for real-time updates.

| Stream | Endpoint | Typical events |
|---|---|---|
| SSE v0 | `/v0/sse` | `PlaybackState`, `CueVisibility` |
| SSE v1 | `/v1/sse` | `PlaybackState`, `Inputs`, `ShowRevision`, `CueVisibility` |
| SSE v2 | `/v2/sse` | `PlaybackState` (diff), `TimelineCountdowns`, `Inputs`, `ShowRevision`, `CueVisibility` |
| NDJSON v0 | `/v0/ndjson` | Same as SSE v0 |
| NDJSON v1 | `/v1/ndjson` | Same as SSE v1 |
| NDJSON v2 | `/v2/ndjson` | Same as SSE v2 |

### Timeline and Cue IDs

Many endpoints require numeric `timeline_id` and `cue_id` values. Use **Copy ID** from timeline/cue context menus in Producer to retrieve stable IDs.

### curl Examples

**Get system info**

```bash
curl http://localhost:3019/info
```

**Play a timeline**

```bash
curl -X POST http://localhost:3019/v0/play/0
```

**Jump timeline and continue playing**

```bash
curl -X POST "http://localhost:3019/v0/jump-to-time/0?time=6000&state=play"
```

**Set one input**

```bash
curl -X POST "http://localhost:3019/v0/input/Brightness?value=0.8&duration=500"
```

**Set multiple inputs**

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:3019/v0/inputs --data '[{"key":"Brightness","value":0.8},{"key":"Volume","value":0.5}]'
```

**Read cue set states by name**

```bash
curl http://localhost:3019/v0/cue-group-state/by-name
```

**Switch one cue set by name**

```bash
curl -X POST http://localhost:3019/v0/cue-group-state/by-name/Language/English
```

**Read v2 SSE stream**

```bash
curl http://localhost:3019/v2/sse
```

**Node reboot (target node API on port 3017)**

```bash
curl -X POST http://192.168.1.12:3017/v0/reboot
```

### Security and Access

By default, the HTTP API does not require authentication. Any client that can reach the service port can call endpoints.

- Keep control ports on a trusted network.
- Use firewall rules to restrict access.
- Avoid exposing ports 3019/3017 directly to untrusted networks.

### Notes

- Inbound control endpoints are documented as `GET` and `POST`.
- `PUT`/`DELETE` are not part of the documented inbound control API.
- HTTP Output cues can send outbound `GET`/`POST`/`PUT` requests to external systems, which is separate from the inbound REST API described here.
