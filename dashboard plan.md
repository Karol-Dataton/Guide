## Plan: WATCHOUT Director Dashboard

A read-only, real-time monitoring dashboard that connects to the local WATCHOUT Operative at `127.0.0.1:3019`, streams live state via SSE (`/v2/sse`), and presents show, playback, timeline, cue, variable, and system information — following the established vanilla JS / HTML / CSS module pattern.

**Steps**

1. **Create module folder** `dashboard/` with three files: `index.html`, `app.js`, `styles.css` — matching the `planner/`, `shortcuts/`, `test-patterns/` structure.

2. **Build `dashboard/index.html`** — standard HTML5 document loading Google Fonts Inter + Futura Now Headline, linking `styles.css` and `app.js (defer)`. Structure the page into:
   - **Header bar** — module title "Dashboard", connection status indicator (dot + label: Connected / Disconnected / Connecting), system info badge (WATCHOUT version from `/info`).
   - **Main content area** — CSS Grid layout with six card-style panels (see step 4).

3. **Build `dashboard/styles.css`** — use the shared CSS custom property design system (`--bg-primary`, `--accent-primary`, etc.) from the existing modules. Dark theme only. Define:
   - `.dashboard-grid` — responsive CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))`) for the six panels.
   - `.panel` — card component with `--bg-secondary` background, `--border-radius`, subtle border.
   - `.panel-header` — title + optional badge count.
   - `.status-dot` — green/red/amber animated indicator for connection state.
   - `.timeline-row`, `.cue-row`, `.variable-row` — list item styles with alternating subtle backgrounds.
   - `.progress-bar` — thin bar showing timeline position as percentage of duration.
   - `.badge` — small tag for playback state (Playing / Paused / Stopped / Idle).
   - Responsive breakpoints: stack to single column at `<800px`.

4. **Build `dashboard/app.js`** — vanilla JS, `DOMContentLoaded` wrapper, organized into these sections:

   **a. Constants & State**
   - `BASE_URL = 'http://127.0.0.1:3019'`
   - `state` object holding: `connected`, `showData`, `timelines`, `playbackStates`, `inputs`, `cueGroupStates`, `systemInfo`.

   **b. Initial Data Fetch** — on load, call these REST endpoints to populate the initial state:
   - `GET /info` → system version/build info → render **System Info** panel.
   - `GET /v0/show` → full show data (name, revision, timelines, cues, compositions, etc.) → render **Show Info** panel.
   - `GET /v0/timelines` → timeline list → render **Timelines** panel.
   - `GET /v0/state` → current playback positions → render **Playback State** panel.
   - `GET /v0/inputs` → all variables with specs and current values → render **Variables** panel.
   - `GET /v0/cue-group-state/by-name` → current cue set states → render **Cue Groups** panel.
   - For each timeline returned, `GET /v0/cues/{timeline_id}` → populate cue lists inside **Timelines** panel.

   **c. SSE Stream Connection** — open `EventSource` to `http://127.0.0.1:3019/v2/sse`:
   - On `open` → set `state.connected = true`, update status indicator to green.
   - On `error` → set `state.connected = false`, update status indicator to red, auto-reconnect (EventSource does this natively).
   - Parse incoming event types:
     - `PlaybackState` → update `state.playbackStates`, re-render playback badges and progress bars.
     - `Inputs` → update `state.inputs`, re-render variable values.
     - `ShowRevision` → re-fetch show data (`GET /v0/show`, `GET /v0/timelines`, cues) to pick up structural changes.
     - `TimelineCountdowns` → optionally display upcoming cue countdowns.
     - `CueVisibility` → highlight currently active cues in the timeline panel.
   - v2 SSE includes initial state on connect, so the first message seeds the dashboard even if REST calls haven't resolved yet.

   **d. Render Functions** — one per panel, operating on DOM elements by ID:
   - `renderSystemInfo()` — version, build string.
   - `renderShowInfo()` — show name, revision number, counts (timelines, cues by type, displays by type, assets).
   - `renderTimelines()` — list of timelines, each with name, duration, and nested cue list. Cues show name and time offset. Expandable/collapsible via click.
   - `renderPlayback()` — per-timeline: name, state badge (Playing/Paused/Stopped), position as `HH:MM:SS:FF`, progress bar (position / duration).
   - `renderVariables()` — table of variable name, current value, min/max range, default.
   - `renderCueGroups()` — list of cue groups with active variant highlighted.

   **e. Utilities**
   - `formatTime(ms)` → `HH:MM:SS:FF` string.
   - `fetchJSON(endpoint)` → wrapper around `fetch()` with error handling and connection status update.
   - `reconnectSSE()` → re-establish SSE if manually needed.

5. **Add dashboard link to wiki sidebar** — in `wiki/app.js`, add a `Dashboard` entry to the sidebar tool links alongside the existing Shortcuts, Planner, and Test Patterns links.

6. **Update root `index.html`** — no change needed (it redirects to wiki, and wiki will link to dashboard).

**Panel Layout Summary**

| Panel | Data Source | Updates Via |
|---|---|---|
| **Connection / System Info** | `GET /info` | Initial fetch only |
| **Show Info** | `GET /v0/show` | SSE `ShowRevision` triggers re-fetch |
| **Playback State** | `GET /v0/state` | SSE `PlaybackState` (real-time) |
| **Timelines & Cues** | `GET /v0/timelines` + `GET /v0/cues/{id}` | SSE `ShowRevision` + `CueVisibility` |
| **Variables** | `GET /v0/inputs` | SSE `Inputs` (real-time) |
| **Cue Groups** | `GET /v0/cue-group-state/by-name` | SSE `ShowRevision` triggers re-fetch |

**Verification**

- Open `dashboard/index.html` in a browser with a WATCHOUT director running locally — verify all six panels populate.
- Stop the WATCHOUT director — verify the status indicator turns red and panels show last-known state.
- Start a timeline in WATCHOUT — verify the Playback State panel updates in real-time (position, progress bar, badge changes to "Playing").
- Change a variable value externally — verify the Variables panel reflects the new value.
- Load a different show — verify Show Info and Timelines panels refresh after `ShowRevision` event.
- Resize browser window below 800px — verify panels stack to single column.

**Decisions**

- **Localhost only** — hardcoded `127.0.0.1:3019`, no connection configuration UI.
- **Read-only** — no play/pause/stop buttons or variable setters; purely monitoring.
- **SSE v2** — chosen over v1/polling for optimized diff-based updates and initial state on connect.
- **Dark theme only** — consistent with planner, shortcuts, and test-patterns modules (no multi-theme like wiki).
- **No build tools** — vanilla HTML/JS/CSS, no bundler, matching all existing modules.
- **CORS consideration** — since the dashboard is a local file or served from the same origin as the Operative, CORS should not be an issue. If it is, the Operative's built-in HTTP server likely allows local requests. This should be validated during verification.
