/* WATCHOUT Director Dashboard - Application Logic */

const BASE_URL = window.__API_BASE_URL__ || '/api';
const PANEL_LAYOUT_STORAGE_KEY = 'dashboard.panel.layout.v1';
const PANEL_LAYOUT_LOCK_STORAGE_KEY = 'dashboard.panel.layout.locked.v1';
const PANEL_COLUMNS = 12;
const PANEL_ROW_HEIGHT = 120;
const PANEL_MIN_W = 2;
const PANEL_MIN_H = 2;
const PANEL_DEFAULT_LAYOUT = {
    'clock-panel': { x: 1, y: 1, w: 12, h: 2, hidden: false },
    'system-panel': { x: 1, y: 3, w: 4, h: 2, hidden: false },
    'show-panel': { x: 5, y: 3, w: 4, h: 2, hidden: false },
    'playback-panel': { x: 9, y: 3, w: 4, h: 2, hidden: false },
    'timelines-panel': { x: 1, y: 5, w: 8, h: 4, hidden: false },
    'variables-panel': { x: 9, y: 5, w: 4, h: 3, hidden: false },
    'cue-groups-panel': { x: 9, y: 8, w: 4, h: 2, hidden: false },
    'sse-panel': { x: 1, y: 9, w: 12, h: 3, hidden: false }
};

const state = {
    connected: false,
    connectionStatus: 'connecting',
    sseLog: [],
    discoveredNodes: [],
    systemInfo: null,
    showData: null,
    showCueNameById: {},
    timelines: [],
    cuesByTimeline: {},
    playbackStates: null,
    inputs: null,
    cueGroupStates: null,
    cueVisibility: new Set(),
    countdowns: null,
    customTimerMs: 0,
    customTimerEndAt: null,
    customTimerRunning: false,
    clockSettings: {
        showLocal: true,
        normalFont: false,
        ampm: false,
        showTimer: false
    },
    panelLayout: null,
    panelLayoutLocked: false
};

const dom = {};

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    setupPanelManager();
    setConnectionStatus('connecting');
    renderNodes();
    fetchInitialData();
    connectSSE();
    startPlaybackClockTicker();
    loadClockSettings();
    setupSettingsModal();
    setupClockControls();
    startClockPanelTicker();
    setupTimelineToggles();
});

function cacheDom() {
    dom.statusDot = document.getElementById('status-dot');
    dom.statusText = document.getElementById('status-text');
    dom.systemBadge = document.getElementById('system-badge');
    dom.systemInfoBody = document.getElementById('system-info-body');
    dom.showInfoBody = document.getElementById('show-info-body');
    dom.playbackBody = document.getElementById('playback-body');
    dom.timelinesBody = document.getElementById('timelines-body');
    dom.variablesBody = document.getElementById('variables-body');
    dom.nodesBody = document.getElementById('nodes-body');
    dom.sseBody = document.getElementById('sse-body');
    dom.clockGrid = document.getElementById('clock-grid');
    dom.localClock = document.getElementById('local-clock');
    dom.localClockBlock = document.getElementById('local-clock-block');
    dom.timerClockBlock = document.getElementById('timer-clock-block');
    dom.customTimer = document.getElementById('custom-timer');
    dom.timerInput = document.getElementById('timer-input');
    dom.timerStart = document.getElementById('timer-start');
    dom.timerPause = document.getElementById('timer-pause');
    dom.timerReset = document.getElementById('timer-reset');
    dom.settingsBtn = document.getElementById('settings-btn');
    dom.settingsModal = document.getElementById('settings-modal');
    dom.settingsClose = document.getElementById('settings-close');
    dom.settingNormalFont = document.getElementById('setting-normal-font');
    dom.settingShowLocal = document.getElementById('setting-show-local');
    dom.settingAmpm = document.getElementById('setting-ampm');
    dom.settingShowTimer = document.getElementById('setting-show-timer');
    dom.dashboardGrid = document.querySelector('.dashboard-grid');
    dom.panelLayoutBtn = document.getElementById('panel-layout-btn');
    dom.panelLayoutModal = document.getElementById('panel-layout-modal');
    dom.panelLayoutClose = document.getElementById('panel-layout-close');
    dom.panelLayoutReset = document.getElementById('panel-layout-reset');
    dom.panelLayoutList = document.getElementById('panel-layout-list');
    dom.panelLayoutLock = document.getElementById('panel-layout-lock');
}

function setConnectionStatus(status) {
    const statusMap = {
        connected: 'Connected',
        disconnected: 'Disconnected',
        connecting: 'Connecting'
    };

    if (!dom.statusDot || !dom.statusText) return;

    state.connectionStatus = status;

    dom.statusDot.classList.remove('status-connected', 'status-disconnected', 'status-connecting');
    dom.statusDot.classList.add(`status-${status}`);
    dom.statusText.textContent = statusMap[status] || status;
    addSseLog('status', statusMap[status] || status);
}

async function fetchInitialData() {
    await Promise.allSettled([
        fetchSystemInfo(),
        fetchDiscoveredNodes(),
        fetchShowData(),
        fetchPlaybackState(),
        fetchInputs(),
        fetchCueGroups()
    ]);
}

async function fetchSystemInfo() {
    try {
        const data = await fetchJSON('/info');
        state.systemInfo = data;
        renderSystemInfo();
    } catch (err) {
        renderError(dom.systemInfoBody, 'System info unavailable');
    }
}

async function fetchShowData() {
    try {
        const [showData, timelines] = await Promise.all([
            fetchJSON('/v0/show'),
            fetchJSON('/v0/timelines')
        ]);

        state.showData = showData;
        state.showCueNameById = buildCueNameMap(showData);
        state.timelines = mergeTimelineMeta(
            normalizeTimelines(timelines),
            normalizeShowTimelines(showData)
        );
        renderShowInfo();
        renderTimelines();

        await fetchCuesForTimelines(state.timelines);
        renderShowInfo();
        renderTimelines();
    } catch (err) {
        renderError(dom.showInfoBody, 'Show data unavailable');
    }
}

async function fetchDiscoveredNodes() {
    try {
        const data = await fetchJSON('/v0/discovered');
        state.discoveredNodes = normalizeDiscoveredNodes(data);
        renderNodes();
    } catch (err) {
        state.discoveredNodes = [];
        renderNodes();
    }
}

async function fetchPlaybackState() {
    try {
        const data = await fetchJSON('/v0/state');
        state.playbackStates = data;
        renderPlayback();
    } catch (err) {
        try {
            const data = await fetchJSON('/state');
            state.playbackStates = data;
            renderPlayback();
        } catch (fallbackErr) {
            renderError(dom.playbackBody, 'Playback state unavailable');
        }
    }
}

async function fetchInputs() {
    try {
        const data = await fetchJSON('/v0/inputs');
        state.inputs = data;
        renderVariablesPanel();
    } catch (err) {
        renderError(dom.variablesBody, 'Variables unavailable');
    }
}

async function fetchCueGroups() {
    try {
        const data = await fetchJSON('/v0/cue-group-state/by-name');
        state.cueGroupStates = data;
        renderVariablesPanel();
    } catch (err) {
        state.cueGroupStates = null;
        renderVariablesPanel();
    }
}

async function fetchCuesForTimelines(timelines) {
    if (!Array.isArray(timelines) || timelines.length === 0) return;

    const tasks = timelines
        .filter(timeline => timeline.id !== null && timeline.id !== undefined)
        .map(async timeline => {
            try {
                const cues = await fetchJSON(`/v0/cues/${encodeURIComponent(timeline.id)}`);
                state.cuesByTimeline[timeline.id] = normalizeCues(cues);
            } catch (err) {
                state.cuesByTimeline[timeline.id] = [];
            }
        });

    await Promise.allSettled(tasks);
}

function connectSSE() {
    const url = `${BASE_URL}/v1/sse`;
    let eventSource;

    try {
        eventSource = new EventSource(url);
    } catch (err) {
        setConnectionStatus('disconnected');
        addSseLog('error', err.message || 'EventSource initialization failed');
        return;
    }

    eventSource.addEventListener('open', () => {
        state.connected = true;
        setConnectionStatus('connected');
    });

    eventSource.addEventListener('error', () => {
        state.connected = false;
        setConnectionStatus('disconnected');
        addSseLog('error', 'Connection error');
    });

    const register = (type) => {
        eventSource.addEventListener(type, (event) => {
            addSseLog(type, event.data);
            handleSsePayload(type, parsePayload(event.data));
        });
    };

    register('PlaybackState');
    register('playbackState');
    register('Inputs');
    register('ShowRevision');
    register('TimelineCountdowns');
    register('CueVisibility');

    eventSource.addEventListener('message', (event) => {
        addSseLog('message', event.data);
        const payload = parsePayload(event.data);
        if (payload && typeof payload === 'object') {
            const eventType = payload.type || payload.kind;
            if (eventType) {
                handleSsePayload(eventType, payload.data ?? payload.payload ?? payload.value ?? payload);
            }
        }
    });
}

function handleSsePayload(type, payload) {
    const normalizedType = String(type || '').toLowerCase();
    switch (normalizedType) {
        case 'playbackstate':
        case 'PlaybackState':
            state.playbackStates = payload;
            renderPlayback();
            break;
        case 'inputs':
        case 'Inputs':
            state.inputs = payload;
            renderVariablesPanel();
            break;
        case 'showrevision':
        case 'ShowRevision':
            refreshShowStructure();
            break;
        case 'timelinecountdowns':
        case 'TimelineCountdowns':
            state.countdowns = normalizeTimelineCountdowns(payload);
            renderPlayback();
            break;
        case 'cuevisibility':
        case 'CueVisibility':
            updateCueVisibility(payload);
            renderShowInfo();
            renderTimelines();
            break;
        default:
            break;
    }
}

async function refreshShowStructure() {
    await Promise.allSettled([fetchShowData(), fetchCueGroups()]);
}

function updateCueVisibility(payload) {
    const visible = new Set();
    if (Array.isArray(payload)) {
        payload.forEach(item => visible.add(item));
    } else if (payload && typeof payload === 'object') {
        const list = payload.cues || payload.activeCues || payload.visibleCues || payload.activeCueIds;
        if (Array.isArray(list)) {
            list.forEach(item => visible.add(item));
        }
    }
    state.cueVisibility = visible;
}

function parsePayload(data) {
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
}

async function fetchJSON(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}

function renderSystemInfo() {
    if (!dom.systemInfoBody) return;
    if (!state.systemInfo) {
        renderEmpty(dom.systemInfoBody, 'No system info available');
        renderNodes();
        return;
    }

    const info = state.systemInfo;
    const entries = [
        ['Product', info.product || info.name || info.title],
        ['Version', info.version || info.release || info.softwareVersion],
        ['Build', info.build || info.buildNumber || info.buildDate],
        ['Host', info.host || info.hostname || info.machine],
        ['Uptime', info.uptime || info.uptimeSeconds || info.uptimeMs]
    ].filter(([, value]) => value !== undefined && value !== null && value !== '');

    dom.systemBadge.textContent = `System: ${entries.find(entry => entry[0] === 'Version')?.[1] || '—'}`;

    dom.systemInfoBody.innerHTML = renderDataList(entries, formatSystemValue);
    renderNodes();
}

function renderShowInfo() {
    if (!dom.showInfoBody) return;
    if (!state.showData) {
        renderEmpty(dom.showInfoBody, 'No show loaded');
        return;
    }

    const show = state.showData;
    const timelineCount = state.timelines.length || getCount(show.timelines);
    const cuesFromTimelines = Object.values(state.cuesByTimeline || {}).reduce((total, cues) => {
        return total + (Array.isArray(cues) ? cues.length : 0);
    }, 0);
    const cueCount = getCount(show.cues) || getCount(show.cueList) || show.totalCues || cuesFromTimelines;
    const displayCount = getCount(show.displays) || getCount(show.outputs);
    const compositionCount = getCount(show.compositions);
    const assetCount = getCount(show.assets) || getCount(show.media);
    const activeCueCount = state.cueVisibility.size;

    const entries = [
        ['Name', show.name || show.title || 'Untitled Show'],
        ['Timelines', timelineCount],
        ['Cues', cueCount],
        ['Active Cues', activeCueCount],
        ['Compositions', compositionCount],
        ['Displays', displayCount],
        ['Assets', assetCount]
    ].filter(([, value]) => value !== undefined && value !== null && value !== '');

    dom.showInfoBody.innerHTML = renderDataList(entries);
}

function renderPlayback() {
    if (!dom.playbackBody) return;
    const playback = withAllTimelines(
        mergePlaybackWithCountdowns(
            normalizePlaybackStates(state.playbackStates),
            state.countdowns
        )
    );

    if (!playback.length) {
        renderEmpty(dom.playbackBody, 'No playback data available');
        return;
    }

    const html = playback.map(item => {
        const timelineMeta = getTimelineMeta(item.id, item.name);
        const duration = pickDuration(item.duration, timelineMeta.duration);
        const livePosition = getLiveTimelinePosition(item);
        const position = duration > 0 ? Math.min(livePosition, duration) : livePosition;
        const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;
        const badgeClass = normalizePlaybackBadge(item.state);
        const stateLabel = formatPlaybackStateLabel(item.state);
        const timelineName = item.name || timelineMeta.name || 'Timeline';

        return `
            <div class="playback-row">
                <div class="playback-header">
                    <div>
                        <div class="timeline-name">${escapeHtml(timelineName)}</div>
                        <div class="timeline-meta-text">${formatTime(position, item.fps)} / ${formatTime(duration, item.fps)}</div>
                    </div>
                    <span class="badge ${badgeClass}">${escapeHtml(stateLabel)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${progress.toFixed(1)}%;"></div>
                </div>
            </div>
        `;
    }).join('');

    dom.playbackBody.innerHTML = html;
}

function renderTimelines() {
    if (!dom.timelinesBody) return;
    const timelines = normalizeTimelines(state.timelines);

    if (!timelines.length) {
        renderEmpty(dom.timelinesBody, 'No timelines found');
        return;
    }

    const html = timelines.map(timeline => {
        const cues = state.cuesByTimeline[timeline.id] || [];
        const cueCount = cues.length;
        const duration = timeline.duration ?? 0;
        const cueHtml = cues.length ? cues.map(cue => {
            const isActive = cue.id && state.cueVisibility.has(cue.id) || cue.name && state.cueVisibility.has(cue.name);
            const cueName = resolveCueName(cue);
            return `
                <div class="cue-row ${isActive ? 'active' : ''}">
                    <div>
                        <div class="cue-name">${escapeHtml(cueName)}</div>
                        <div class="cue-meta">${escapeHtml(cue.type || 'Cue')}</div>
                    </div>
                    <div class="cue-meta">${formatTime(cue.time, cue.fps)}</div>
                </div>
            `;
        }).join('') : `<div class="cue-row"><div class="cue-name">No cues</div><div class="cue-meta">—</div></div>`;

        return `
            <div class="timeline-card collapsed" data-timeline-id="${escapeHtml(String(timeline.id))}">
                <button class="timeline-header" type="button">
                    <div>
                        <div class="timeline-title">${escapeHtml(timeline.name)}</div>
                        <div class="timeline-meta">${cueCount} cues • ${formatTime(duration)}</div>
                    </div>
                    <span class="timeline-toggle">▾</span>
                </button>
                <div class="timeline-cues">
                    ${cueHtml}
                </div>
            </div>
        `;
    }).join('');

    dom.timelinesBody.innerHTML = html;
}

function renderVariablesPanel() {
    if (!dom.variablesBody) return;
    const variables = normalizeInputs(state.inputs);
    const groups = normalizeCueGroups(state.cueGroupStates);

    const variablesHtml = variables.length
        ? variables.map(variable => {
            const min = variable.min ?? variable.minimum ?? variable.rangeMin;
            const max = variable.max ?? variable.maximum ?? variable.rangeMax;
            const def = variable.default ?? variable.defaultValue;
            const metaParts = [];

            if (min !== undefined || max !== undefined) {
                metaParts.push(`${min ?? '—'} – ${max ?? '—'}`);
            }
            if (def !== undefined) {
                metaParts.push(`default ${def}`);
            }

            return `
                <div class="variable-row">
                    <div>
                        <div class="variable-name">${escapeHtml(variable.name)}</div>
                        <div class="variable-meta">${escapeHtml(variable.unit || variable.type || '')}</div>
                    </div>
                    <div class="variable-value">${escapeHtml(formatValue(variable.value))}</div>
                    <div class="variable-meta">${escapeHtml(metaParts.join(' • ') || '—')}</div>
                </div>
            `;
        }).join('')
        : `<p class="empty-state">No variables available</p>`;

    const groupsHtml = groups.length
        ? groups.map(group => `
            <div class="cue-group-row">
                <div class="cue-name">${escapeHtml(group.name)}</div>
                <div class="cue-group-active">${escapeHtml(group.active || '—')}</div>
            </div>
        `).join('')
        : `<p class="empty-state">No cue groups available</p>`;

    dom.variablesBody.innerHTML = `
        <div class="split-section">
            <div class="split-section-title">Variables</div>
            <div class="split-section-content">
                ${variablesHtml}
            </div>
        </div>
        <div class="split-section">
            <div class="split-section-title">Cue Groups</div>
            <div class="split-section-content">
                ${groupsHtml}
            </div>
        </div>
    `;
}

function renderNodes() {
    if (!dom.nodesBody) return;
    const nodes = state.discoveredNodes.length
        ? state.discoveredNodes
        : normalizeDiscoveredNodes(state.systemInfo && state.systemInfo.nodes);

    if (nodes.length) {
        const rows = nodes.map((node, index) => `
            <div class="cue-group-row">
                <div class="cue-name">${escapeHtml(node.name || node.host || `Node ${index + 1}`)}</div>
                <div class="service-badges">
                    ${node.services && node.services.length
                        ? node.services.map(service => `<span class="service-badge">${escapeHtml(service)}</span>`).join('')
                        : `<span class="cue-group-active">${escapeHtml(node.status || node.state || node.ip || 'online')}</span>`}
                </div>
            </div>
        `).join('');
        dom.nodesBody.innerHTML = rows;
        return;
    }
    renderEmpty(dom.nodesBody, 'No node data available');
}

function normalizeDiscoveredNodes(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw)
        ? raw
        : raw.nodes || raw.items || raw.data || raw.discovered || [];

    return list.map((item, index) => {
        const about = item.about && typeof item.about === 'object' ? item.about : {};
        const hostRef = about.host_ref || item.host_ref || item.name || item.alias || item.host || item.hostname;
        const services = Array.isArray(about.services)
            ? about.services
            : Array.isArray(item.services)
                ? item.services
                : [];

        return {
            name: hostRef || `Node ${index + 1}`,
            host: item.host || item.hostname || item.name,
            ip: item.ip || item.address || item.addr || item.address,
            status: item.status || item.state || (item.online === false ? 'offline' : 'online'),
            services: services.map(service => String(service))
        };
    });
}

function addSseLog(type, payload) {
    const now = new Date();
    const timestamp = now.toTimeString().slice(0, 8);
    let text;
    if (typeof payload === 'string') {
        text = payload;
    } else {
        try {
            text = JSON.stringify(payload);
        } catch (err) {
            text = String(payload);
        }
    }

    state.sseLog.push({
        timestamp,
        type: String(type || 'event'),
        payload: text || ''
    });

    if (state.sseLog.length > 200) {
        state.sseLog = state.sseLog.slice(-200);
    }

    renderSseLog();
}

function renderSseLog() {
    if (!dom.sseBody) return;
    if (!state.sseLog.length) {
        renderEmpty(dom.sseBody, 'Waiting for SSE events...');
        return;
    }

    const rows = state.sseLog.map(entry => `
        <div class="sse-log-row">
            <div class="sse-log-time">${escapeHtml(entry.timestamp)}</div>
            <div class="sse-log-type">${escapeHtml(entry.type)}</div>
            <div class="sse-log-payload">${escapeHtml(entry.payload)}</div>
        </div>
    `).join('');

    dom.sseBody.innerHTML = `<div class="sse-log">${rows}</div>`;
    const container = dom.sseBody.querySelector('.sse-log');
    if (container) {
        requestAnimationFrame(() => {
            container.scrollTo({ top: container.scrollHeight, behavior: 'auto' });
        });
    }
}

function renderDataList(entries, formatter) {
    const rows = entries.map(([label, value]) => `
        <div class="data-row">
            <div class="label">${escapeHtml(label)}</div>
            <div class="value">${escapeHtml(formatter ? formatter(value) : formatValue(value))}</div>
        </div>
    `).join('');

    return `<div class="data-list">${rows}</div>`;
}

function renderEmpty(container, message) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
}

function renderError(container, message) {
    renderEmpty(container, message);
}

function normalizeTimelines(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : raw.timelines || raw.items || [];
    return list.map((item, index) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? index,
        name: item.name || item.title || `Timeline ${index + 1}`,
        duration: item.duration ?? item.length ?? item.durationMs ?? item.duration_ms ?? 0
    }));
}

function normalizeShowTimelines(show) {
    if (!show || typeof show !== 'object') return [];
    const showRoot = show.show && typeof show.show === 'object' ? show.show : show;
    const timelinesRaw = showRoot.timelines;

    const source = Array.isArray(timelinesRaw)
        ? timelinesRaw
        : timelinesRaw && typeof timelinesRaw === 'object'
            ? Object.entries(timelinesRaw).map(([id, value]) => {
                if (value && typeof value === 'object') {
                    return { ...value, id: value.id ?? value.timelineId ?? value.uuid ?? id };
                }
                return { id, name: String(value ?? '') };
            })
            : [];

    return source.map((item, index) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? index,
        name: item.name || item.title || item.timelineName || `Timeline ${index + 1}`,
        duration: item.duration
            ?? item.length
            ?? item.durationMs
            ?? item.duration_ms
            ?? item.cueSequence?.duration
            ?? item.cue_sequence?.duration
            ?? 0
    }));
}

function mergeTimelineMeta(primary, fallback) {
    const safePrimary = Array.isArray(primary) ? primary : [];
    const safeFallback = Array.isArray(fallback) ? fallback : [];

    const fallbackById = new Map();
    const fallbackByName = new Map();
    safeFallback.forEach((item) => {
        if (item && item.id !== undefined && item.id !== null) fallbackById.set(String(item.id), item);
        if (item && item.name) fallbackByName.set(String(item.name), item);
    });

    const merged = safePrimary.map((item) => {
        const match = fallbackById.get(String(item.id)) || fallbackByName.get(String(item.name || ''));
        if (!match) return item;
        return {
            ...item,
            name: item.name || match.name,
            duration: pickDuration(item.duration, match.duration)
        };
    });

    const existingIds = new Set(merged.map(item => String(item.id)));
    safeFallback.forEach((item) => {
        if (!item || item.id === undefined || item.id === null) return;
        if (!existingIds.has(String(item.id))) {
            merged.push(item);
        }
    });

    return merged;
}

function normalizeCues(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : raw.cues || raw.items || raw.data || [];
    return list.map((item, index) => ({
        id: item.id ?? item.cueId ?? item.uuid ?? item.name ?? index,
        name: item.name || item.title || item.label,
        type: item.type || item.kind || item.command,
        time: item.time ?? item.position ?? item.offset ?? item.start ?? item.at ?? 0,
        fps: item.fps
    }));
}

function buildCueNameMap(show) {
    if (!show || typeof show !== 'object') return {};
    const map = {};
    const cues = Array.isArray(show.cues)
        ? show.cues
        : Array.isArray(show.cueList)
            ? show.cueList
            : show.cues && typeof show.cues === 'object'
                ? Object.values(show.cues)
                : [];

    cues.forEach((cue) => {
        if (!cue || typeof cue !== 'object') return;
        const id = cue.id ?? cue.cueId ?? cue.uuid;
        const name = cue.name || cue.title || cue.label;
        if (id !== undefined && id !== null && name) {
            map[String(id)] = String(name);
        }
    });

    return map;
}

function resolveCueName(cue) {
    if (cue && cue.name) {
        return cue.name;
    }
    if (cue && cue.id !== undefined && cue.id !== null) {
        const fromShow = state.showCueNameById[String(cue.id)];
        if (fromShow) return fromShow;
        return `Cue ${cue.id}`;
    }
    return 'Cue';
}

function normalizePlaybackStates(raw) {
    if (!raw) return [];
    if (raw && typeof raw === 'object' && raw.value && typeof raw.value === 'object') {
        return normalizePlaybackStates(raw.value);
    }

    const sourceClockTime = raw && typeof raw === 'object'
        ? (raw.clockTime ?? raw.serverTime ?? raw.timestamp)
        : undefined;

    let list = [];
    if (Array.isArray(raw)) {
        list = raw;
    } else if (Array.isArray(raw.timelines)) {
        list = raw.timelines;
    } else if (Array.isArray(raw.states)) {
        list = raw.states;
    } else if (raw && typeof raw === 'object' && raw.playback && typeof raw.playback === 'object') {
        list = Object.entries(raw.playback).map(([id, value]) => ({ ...value, id }));
    } else if (raw && typeof raw === 'object') {
        list = Object.entries(raw).map(([id, value]) => {
            if (value && typeof value === 'object') {
                return { ...value, id: value.id ?? value.timelineId ?? id };
            }
            return { id, state: value };
        });
    }

    return list.map((item, index) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? index,
        name: item.name || item.title || item.timelineName,
        state: item.state || item.playbackState || item.playbackStatus || item.status || item.mode || item.phase || inferPlaybackState(item),
        position: item.position ?? item.timelineTime ?? item.time ?? item.currentTime ?? item.playhead ?? 0,
        duration: item.duration ?? item.length ?? item.totalDuration ?? item.durationMs,
        clockTime: item.clockTime ?? sourceClockTime,
        startDelay: item.startDelay ?? item.delay ?? 0,
        fps: item.fps
    }));
}

function inferPlaybackState(item) {
    if (!item || typeof item !== 'object') return undefined;
    if (item.running === true || item.isRunning === true) return 'run';
    if (item.running === false || item.isRunning === false) return 'pause';
    if (item.playing === true || item.isPlaying === true) return 'playing';
    if (item.paused === true || item.isPaused === true) return 'paused';
    if (item.stopped === true || item.isStopped === true) return 'stopped';
    if (typeof item.active === 'boolean') return item.active ? 'playing' : 'stopped';
    return undefined;
}

function normalizeTimelineCountdowns(raw) {
    if (!raw) return [];
    let list = [];
    if (Array.isArray(raw)) {
        list = raw;
    } else if (Array.isArray(raw.timelines)) {
        list = raw.timelines;
    } else if (Array.isArray(raw.countdowns)) {
        list = raw.countdowns;
    } else if (raw && typeof raw === 'object') {
        list = Object.values(raw);
    }

    return list.map((item, index) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? index,
        name: item.name || item.title || item.timelineName,
        position: item.position ?? item.time ?? item.currentTime ?? item.playhead,
        duration: item.duration ?? item.length ?? item.totalDuration ?? item.durationMs,
        remaining: item.remaining ?? item.timeLeft ?? item.left,
        progress: item.progress ?? item.percent
    }));
}

function mergePlaybackWithCountdowns(playback, countdowns) {
    if (!Array.isArray(playback) || !playback.length) return [];
    if (!Array.isArray(countdowns) || !countdowns.length) return playback;

    const byId = new Map();
    const byName = new Map();
    countdowns.forEach((item) => {
        if (item.id !== undefined && item.id !== null) byId.set(String(item.id), item);
        if (item.name) byName.set(String(item.name), item);
    });

    return playback.map((item) => {
        const match = byId.get(String(item.id)) || byName.get(String(item.name || ''));
        if (!match) return item;

        let position = item.position;
        if (match.position !== undefined && match.position !== null) {
            position = match.position;
        } else if (
            match.remaining !== undefined &&
            match.remaining !== null &&
            item.duration !== undefined &&
            item.duration !== null
        ) {
            position = Math.max(0, Number(item.duration) - Number(match.remaining));
        }

        let duration = item.duration;
        if (match.duration !== undefined && match.duration !== null) {
            duration = match.duration;
        }

        if (
            (position === undefined || position === null) &&
            duration !== undefined &&
            duration !== null &&
            match.progress !== undefined &&
            match.progress !== null
        ) {
            const progressNumber = Number(match.progress);
            const normalizedProgress = progressNumber > 1 ? progressNumber / 100 : progressNumber;
            if (Number.isFinite(normalizedProgress)) {
                position = Number(duration) * normalizedProgress;
            }
        }

        return {
            ...item,
            position,
            duration
        };
    });
}

function withAllTimelines(playback) {
    const base = Array.isArray(playback) ? playback : [];
    if (!Array.isArray(state.timelines) || !state.timelines.length) return base;

    const byId = new Map();
    base.forEach((item) => {
        if (item && item.id !== undefined && item.id !== null) {
            byId.set(String(item.id), item);
        }
    });

    const merged = [...base];
    state.timelines.forEach((timeline) => {
        const idKey = String(timeline.id);
        if (byId.has(idKey)) return;
        merged.push({
            id: timeline.id,
            name: timeline.name,
            state: 'stopped',
            position: 0,
            duration: timeline.duration,
            startDelay: 0
        });
    });

    return merged;
}

function getLiveTimelinePosition(item) {
    const base = Number(item?.position ?? 0);
    if (!Number.isFinite(base)) return 0;

    const badge = normalizePlaybackBadge(item?.state);
    if (badge !== 'playing') return Math.max(0, base);

    const clockTime = Number(item?.clockTime);
    if (!Number.isFinite(clockTime) || clockTime <= 0) return Math.max(0, base);

    const elapsed = Date.now() - clockTime;
    if (!Number.isFinite(elapsed) || elapsed <= 0) return Math.max(0, base);

    const startDelay = Number(item?.startDelay ?? 0);
    const effectiveElapsed = Math.max(0, elapsed - (Number.isFinite(startDelay) ? startDelay : 0));
    return Math.max(0, base + effectiveElapsed);
}

function startPlaybackClockTicker() {
    window.setInterval(() => {
        if (!dom.playbackBody) return;
        const playback = mergePlaybackWithCountdowns(
            normalizePlaybackStates(state.playbackStates),
            state.countdowns
        );
        const hasRunning = playback.some(item => normalizePlaybackBadge(item.state) === 'playing');
        if (hasRunning) {
            renderPlayback();
        }
    }, 50);
}

function startClockPanelTicker() {
    renderClockPanel();
    window.setInterval(() => {
        if (state.customTimerRunning && Number.isFinite(state.customTimerEndAt)) {
            state.customTimerMs = Math.max(0, state.customTimerEndAt - Date.now());
            if (state.customTimerMs <= 0) {
                state.customTimerRunning = false;
                state.customTimerEndAt = null;
            }
        }
        renderClockPanel();
    }, 200);
}

function setupClockControls() {
    if (!dom.timerStart || !dom.timerPause || !dom.timerReset || !dom.timerInput) return;

    dom.timerStart.addEventListener('click', () => {
        const parsed = parseTimerInput(dom.timerInput.value);
        if (!state.customTimerRunning && parsed > 0) {
            state.customTimerMs = parsed;
        }
        if (state.customTimerMs <= 0) return;
        state.customTimerRunning = true;
        state.customTimerEndAt = Date.now() + state.customTimerMs;
        renderClockPanel();
    });

    dom.timerPause.addEventListener('click', () => {
        if (!state.customTimerRunning) return;
        state.customTimerMs = Math.max(0, state.customTimerEndAt - Date.now());
        state.customTimerRunning = false;
        state.customTimerEndAt = null;
        renderClockPanel();
    });

    dom.timerReset.addEventListener('click', () => {
        const parsed = parseTimerInput(dom.timerInput.value);
        state.customTimerRunning = false;
        state.customTimerEndAt = null;
        state.customTimerMs = parsed;
        renderClockPanel();
    });
}

function setupPanelManager() {
    if (!dom.dashboardGrid) return;
    state.panelLayout = loadPanelLayout();
    state.panelLayoutLocked = loadPanelLayoutLock();

    Object.keys(PANEL_DEFAULT_LAYOUT).forEach((panelId) => {
        const panel = document.getElementById(panelId);
        if (!panel) return;
        let handle = panel.querySelector('.panel-resize-handle');
        if (!handle) {
            handle = document.createElement('div');
            handle.className = 'panel-resize-handle';
            handle.setAttribute('aria-hidden', 'true');
            panel.appendChild(handle);
        }
        setupPanelDrag(panelId, panel);
        setupPanelResize(panelId, panel, handle);
    });

    setupPanelLayoutModal();
    resolvePanelOverlaps();
    applyPanelLayout();

    window.addEventListener('resize', () => {
        applyPanelLayout();
    });
}

function isPanelLayoutEnabled() {
    return window.innerWidth > 900;
}

function loadPanelLayout() {
    const layout = JSON.parse(JSON.stringify(PANEL_DEFAULT_LAYOUT));
    try {
        const raw = window.localStorage.getItem(PANEL_LAYOUT_STORAGE_KEY);
        if (!raw) return layout;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return layout;

        Object.keys(PANEL_DEFAULT_LAYOUT).forEach((panelId) => {
            const saved = parsed[panelId];
            if (!saved || typeof saved !== 'object') return;
            layout[panelId] = sanitizePanelLayout(panelId, {
                ...layout[panelId],
                ...saved
            });
        });
    } catch (err) {
        return layout;
    }
    return layout;
}

function savePanelLayout() {
    try {
        window.localStorage.setItem(PANEL_LAYOUT_STORAGE_KEY, JSON.stringify(state.panelLayout));
    } catch (err) {
        // ignore storage errors
    }
}

function loadPanelLayoutLock() {
    try {
        return window.localStorage.getItem(PANEL_LAYOUT_LOCK_STORAGE_KEY) === 'true';
    } catch (err) {
        return false;
    }
}

function savePanelLayoutLock() {
    try {
        window.localStorage.setItem(PANEL_LAYOUT_LOCK_STORAGE_KEY, state.panelLayoutLocked ? 'true' : 'false');
    } catch (err) {
        // ignore storage errors
    }
}

function sanitizePanelLayout(panelId, item) {
    const fallback = PANEL_DEFAULT_LAYOUT[panelId];
    const w = clamp(Math.round(Number(item.w ?? fallback.w)), PANEL_MIN_W, PANEL_COLUMNS);
    const h = clamp(Math.round(Number(item.h ?? fallback.h)), PANEL_MIN_H, 12);
    const x = clamp(Math.round(Number(item.x ?? fallback.x)), 1, PANEL_COLUMNS - w + 1);
    const y = Math.max(1, Math.round(Number(item.y ?? fallback.y)));
    return {
        x,
        y,
        w,
        h,
        hidden: Boolean(item.hidden)
    };
}

function applyPanelLayout() {
    if (!dom.dashboardGrid || !state.panelLayout) return;
    const managed = isPanelLayoutEnabled();
    dom.dashboardGrid.classList.toggle('layout-managed', managed);
    dom.dashboardGrid.classList.toggle('layout-locked', managed && state.panelLayoutLocked);

    Object.keys(PANEL_DEFAULT_LAYOUT).forEach((panelId) => {
        const panel = document.getElementById(panelId);
        if (!panel) return;
        const cfg = sanitizePanelLayout(panelId, state.panelLayout[panelId] || PANEL_DEFAULT_LAYOUT[panelId]);
        state.panelLayout[panelId] = cfg;

        panel.hidden = cfg.hidden;
        if (managed) {
            panel.style.gridColumn = `${cfg.x} / span ${cfg.w}`;
            panel.style.gridRow = `${cfg.y} / span ${cfg.h}`;
        } else {
            panel.style.gridColumn = '';
            panel.style.gridRow = '';
        }
    });
}

function setupPanelLayoutModal() {
    if (!dom.panelLayoutBtn || !dom.panelLayoutModal) return;

    const close = () => {
        dom.panelLayoutModal.hidden = true;
    };

    dom.panelLayoutBtn.addEventListener('click', () => {
        renderPanelLayoutList();
        if (dom.panelLayoutLock) {
            dom.panelLayoutLock.checked = state.panelLayoutLocked;
        }
        dom.panelLayoutModal.hidden = false;
    });

    if (dom.panelLayoutClose) {
        dom.panelLayoutClose.addEventListener('click', close);
    }

    dom.panelLayoutModal.addEventListener('click', (event) => {
        if (event.target === dom.panelLayoutModal) close();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dom.panelLayoutModal && !dom.panelLayoutModal.hidden) {
            close();
        }
    });

    if (dom.panelLayoutReset) {
        dom.panelLayoutReset.addEventListener('click', () => {
            state.panelLayout = JSON.parse(JSON.stringify(PANEL_DEFAULT_LAYOUT));
            resolvePanelOverlaps();
            savePanelLayout();
            applyPanelLayout();
            renderPanelLayoutList();
        });
    }

    if (dom.panelLayoutLock) {
        dom.panelLayoutLock.addEventListener('change', () => {
            state.panelLayoutLocked = dom.panelLayoutLock.checked;
            savePanelLayoutLock();
            applyPanelLayout();
        });
    }
}

function renderPanelLayoutList() {
    if (!dom.panelLayoutList) return;
    const rows = Object.keys(PANEL_DEFAULT_LAYOUT).map((panelId) => {
        const panel = document.getElementById(panelId);
        const label = panel?.querySelector('.panel-header h2')?.textContent?.trim() || panelId;
        const checked = !(state.panelLayout?.[panelId]?.hidden);
        return `
            <label class="setting-row">
                <input type="checkbox" data-panel-visibility="${escapeHtml(panelId)}" ${checked ? 'checked' : ''} />
                <span>${escapeHtml(label)}</span>
            </label>
        `;
    }).join('');

    dom.panelLayoutList.innerHTML = rows;
    dom.panelLayoutList.querySelectorAll('input[data-panel-visibility]').forEach((input) => {
        input.addEventListener('change', () => {
            const panelId = input.getAttribute('data-panel-visibility');
            if (!panelId || !state.panelLayout[panelId]) return;
            state.panelLayout[panelId].hidden = !input.checked;
            resolvePanelOverlaps();
            savePanelLayout();
            applyPanelLayout();
        });
    });
}

function setupPanelDrag(panelId, panel) {
    const header = panel.querySelector('.panel-header');
    if (!header) return;

    header.addEventListener('pointerdown', (event) => {
        if (!isPanelLayoutEnabled()) return;
        if (state.panelLayoutLocked) return;
        if (event.button !== 0) return;
        if (event.target.closest('button, input, label, a, .panel-resize-handle')) return;
        if (!state.panelLayout || !state.panelLayout[panelId] || state.panelLayout[panelId].hidden) return;

        event.preventDefault();
        panel.classList.add('dragging');
        const startX = event.clientX;
        const startY = event.clientY;
        const start = { ...state.panelLayout[panelId] };
        const metrics = getGridMetrics();

        const onMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const dx = Math.round(deltaX / metrics.colStep);
            const dy = Math.round(deltaY / metrics.rowStep);
            const w = state.panelLayout[panelId].w;
            state.panelLayout[panelId].x = clamp(start.x + dx, 1, PANEL_COLUMNS - w + 1);
            state.panelLayout[panelId].y = Math.max(1, start.y + dy);
            resolvePanelOverlaps(panelId);
            applyPanelLayout();
        };

        const onUp = () => {
            panel.classList.remove('dragging');
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            resolvePanelOverlaps(panelId);
            savePanelLayout();
            applyPanelLayout();
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    });
}

function setupPanelResize(panelId, panel, handle) {
    handle.addEventListener('pointerdown', (event) => {
        if (!isPanelLayoutEnabled()) return;
        if (state.panelLayoutLocked) return;
        if (event.button !== 0) return;
        if (!state.panelLayout || !state.panelLayout[panelId] || state.panelLayout[panelId].hidden) return;

        event.preventDefault();
        panel.classList.add('dragging');
        const startX = event.clientX;
        const startY = event.clientY;
        const start = { ...state.panelLayout[panelId] };
        const metrics = getGridMetrics();

        const onMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const dw = Math.round(deltaX / metrics.colStep);
            const dh = Math.round(deltaY / metrics.rowStep);

            const maxW = PANEL_COLUMNS - start.x + 1;
            const w = clamp(start.w + dw, PANEL_MIN_W, maxW);
            const h = clamp(start.h + dh, PANEL_MIN_H, 12);
            state.panelLayout[panelId].w = w;
            state.panelLayout[panelId].h = h;
            resolvePanelOverlaps(panelId);
            applyPanelLayout();
        };

        const onUp = () => {
            panel.classList.remove('dragging');
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            resolvePanelOverlaps(panelId);
            savePanelLayout();
            applyPanelLayout();
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    });
}

function resolvePanelOverlaps(anchorPanelId) {
    if (!state.panelLayout) return;
    let changed = true;
    let iterations = 0;
    const visibleCount = Object.keys(PANEL_DEFAULT_LAYOUT).filter((id) => !state.panelLayout[id].hidden).length;
    const maxIterations = visibleCount * visibleCount * 4;

    while (changed && iterations < maxIterations) {
        changed = false;
        iterations += 1;

        const visibleIds = Object.keys(PANEL_DEFAULT_LAYOUT).filter((id) => !state.panelLayout[id].hidden);
        const sorted = visibleIds.sort((a, b) => {
            const first = state.panelLayout[a];
            const second = state.panelLayout[b];
            return first.y - second.y || first.x - second.x;
        });

        const panelIds = anchorPanelId && sorted.includes(anchorPanelId)
            ? [anchorPanelId, ...sorted.filter((id) => id !== anchorPanelId)]
            : sorted;

        for (let i = 0; i < panelIds.length; i += 1) {
            const aId = panelIds[i];
            const a = state.panelLayout[aId];
            for (let j = i + 1; j < panelIds.length; j += 1) {
                const bId = panelIds[j];
                const b = state.panelLayout[bId];
                if (!panelsOverlap(a, b)) continue;
                const nextY = a.y + a.h;
                if (b.y !== nextY) {
                    b.y = nextY;
                    changed = true;
                }
            }
        }
    }
}

function panelsOverlap(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function getGridMetrics() {
    const styles = window.getComputedStyle(dom.dashboardGrid);
    const gapX = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const gapY = Number.parseFloat(styles.rowGap || styles.gap || '0') || 0;
    const width = dom.dashboardGrid.clientWidth;
    const colWidth = (width - gapX * (PANEL_COLUMNS - 1)) / PANEL_COLUMNS;
    return {
        colStep: colWidth + gapX,
        rowStep: PANEL_ROW_HEIGHT + gapY
    };
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function loadClockSettings() {
    try {
        const raw = window.localStorage.getItem('dashboard.clock.settings');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return;
        state.clockSettings = {
            ...state.clockSettings,
            showLocal: parsed.showLocal !== false,
            normalFont: Boolean(parsed.normalFont),
            ampm: Boolean(parsed.ampm),
            showTimer: Boolean(parsed.showTimer)
        };
    } catch (err) {
        // ignore storage errors
    }
}

function saveClockSettings() {
    try {
        window.localStorage.setItem('dashboard.clock.settings', JSON.stringify(state.clockSettings));
    } catch (err) {
        // ignore storage errors
    }
}

function setupSettingsModal() {
    if (!dom.settingsBtn || !dom.settingsModal || !dom.settingsClose) return;

    const syncInputs = () => {
        if (dom.settingNormalFont) dom.settingNormalFont.checked = state.clockSettings.normalFont;
        if (dom.settingShowLocal) dom.settingShowLocal.checked = state.clockSettings.showLocal;
        if (dom.settingAmpm) dom.settingAmpm.checked = state.clockSettings.ampm;
        if (dom.settingShowTimer) dom.settingShowTimer.checked = state.clockSettings.showTimer;
    };

    const closeModal = () => {
        dom.settingsModal.hidden = true;
    };

    dom.settingsBtn.addEventListener('click', () => {
        syncInputs();
        dom.settingsModal.hidden = false;
    });

    dom.settingsClose.addEventListener('click', closeModal);
    dom.settingsModal.addEventListener('click', (event) => {
        if (event.target === dom.settingsModal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !dom.settingsModal.hidden) {
            closeModal();
        }
    });

    const bindToggle = (input, key) => {
        if (!input) return;
        input.addEventListener('change', () => {
            state.clockSettings[key] = input.checked;
            saveClockSettings();
            renderClockPanel();
        });
    };

    bindToggle(dom.settingNormalFont, 'normalFont');
    bindToggle(dom.settingShowLocal, 'showLocal');
    bindToggle(dom.settingAmpm, 'ampm');
    bindToggle(dom.settingShowTimer, 'showTimer');
}

function parseTimerInput(value) {
    const text = String(value || '').trim();
    if (!text) return 0;
    if (/^\d+$/.test(text)) {
        return Number(text) * 1000;
    }
    const parts = text.split(':').map((x) => Number(x));
    if (parts.some((n) => !Number.isFinite(n) || n < 0)) return 0;
    let totalSeconds = 0;
    if (parts.length === 2) {
        totalSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
        return 0;
    }
    return totalSeconds * 1000;
}

function renderClockPanel() {
    if (dom.localClock) {
        const now = new Date();
        const text = formatLocalClock(now, state.clockSettings.ampm);
        if (state.clockSettings.normalFont) {
            dom.localClock.textContent = text;
            dom.localClock.classList.add('digital-clock-text');
        } else {
            dom.localClock.innerHTML = renderSegmentClock(text);
            dom.localClock.classList.remove('digital-clock-text');
        }
    }

    if (dom.localClockBlock) {
        dom.localClockBlock.hidden = !state.clockSettings.showLocal;
    }

    if (dom.timerClockBlock) {
        dom.timerClockBlock.hidden = !state.clockSettings.showTimer;
    }
    if (dom.clockGrid) {
        dom.clockGrid.classList.toggle('dual', Boolean(state.clockSettings.showTimer));
    }
    if (dom.customTimer) {
        const timerText = formatTimer(state.customTimerMs);
        if (state.clockSettings.normalFont) {
            dom.customTimer.textContent = timerText;
            dom.customTimer.classList.add('digital-clock-text');
        } else {
            dom.customTimer.innerHTML = renderSegmentClock(timerText);
            dom.customTimer.classList.remove('digital-clock-text');
        }
    }
    if (dom.timerPause) {
        dom.timerPause.textContent = state.customTimerRunning ? 'Pause' : 'Paused';
    }
}

function formatLocalClock(now, ampm) {
    if (!ampm) {
        return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    const suffix = now.getHours() >= 12 ? 'PM' : 'AM';
    const hour = now.getHours() % 12 || 12;
    return `${pad(hour)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${suffix}`;
}

function renderSegmentClock(text) {
    const chars = String(text || '').split('');
    return chars.map((char) => {
        if (char === ':') {
            return '<span class="seg-colon" aria-hidden="true"><i></i><i></i></span>';
        }
        if (char === ' ') {
            return '<span class="seg-space" aria-hidden="true"></span>';
        }
        if (char === 'A' || char === 'P' || char === 'M') {
            return `<span class="seg-suffix">${char}</span>`;
        }
        return `<span class="seg-digit">${renderSegmentDigit(char)}</span>`;
    }).join('');
}

function renderSegmentDigit(char) {
    const map = {
        '0': ['a', 'b', 'c', 'd', 'e', 'f'],
        '1': ['b', 'c'],
        '2': ['a', 'b', 'g', 'e', 'd'],
        '3': ['a', 'b', 'g', 'c', 'd'],
        '4': ['f', 'g', 'b', 'c'],
        '5': ['a', 'f', 'g', 'c', 'd'],
        '6': ['a', 'f', 'g', 'e', 'c', 'd'],
        '7': ['a', 'b', 'c'],
        '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '9': ['a', 'b', 'c', 'd', 'f', 'g']
    };

    const active = new Set(map[char] || []);
    const segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    return segments
        .map((segment) => `<i class="seg seg-${segment}${active.has(segment) ? ' on' : ''}"></i>`)
        .join('');
}

function formatTimer(ms) {
    const totalSeconds = Math.max(0, Math.floor(Number(ms || 0) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
}

function normalizeInputs(raw) {
    if (!raw) return [];
    let list = [];
    if (Array.isArray(raw)) {
        list = raw;
    } else if (Array.isArray(raw.inputs)) {
        list = raw.inputs;
    } else if (raw && typeof raw === 'object') {
        list = Object.values(raw);
    }

    return list.map((item, index) => ({
        name: item.name || item.id || item.key || `Variable ${index + 1}`,
        value: item.value ?? item.current ?? item.currentValue,
        min: item.min ?? item.minimum ?? item.rangeMin ?? item.spec?.min,
        max: item.max ?? item.maximum ?? item.rangeMax ?? item.spec?.max,
        default: item.default ?? item.defaultValue ?? item.spec?.default,
        type: item.type ?? item.spec?.type,
        unit: item.unit ?? item.spec?.unit
    }));
}

function normalizeCueGroups(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) {
        return raw.map((item, index) => ({
            name: item.name || item.group || `Group ${index + 1}`,
            active: item.active || item.activeVariant || item.current || item.value
        }));
    }
    if (typeof raw === 'object') {
        return Object.entries(raw).map(([name, value]) => {
            if (typeof value === 'string') {
                return { name, active: value };
            }
            if (value && typeof value === 'object') {
                return {
                    name,
                    active: value.active || value.activeVariant || value.current || value.value
                };
            }
            return { name, active: String(value ?? '—') };
        });
    }
    return [];
}

function getTimelineMeta(id, name) {
    const idKey = id !== undefined && id !== null ? String(id) : null;
    const timeline = state.timelines.find(item => {
        if (idKey !== null && String(item.id) === idKey) return true;
        if (name && item.name === name) return true;
        return false;
    });
    if (!timeline) return { name: undefined, duration: 0 };
    return { name: timeline.name, duration: timeline.duration ?? 0 };
}

function pickDuration(primary, fallback) {
    const first = Number(primary);
    if (Number.isFinite(first) && first > 0) return first;
    const second = Number(fallback);
    if (Number.isFinite(second) && second > 0) return second;
    return 0;
}

function normalizePlaybackBadge(stateValue) {
    const value = String(stateValue || '').toLowerCase();
    if (value.includes('play') || value === 'run' || value === 'running') return 'playing';
    if (value.includes('pause')) return 'paused';
    if (value.includes('stop')) return 'stopped';
    return 'idle';
}

function formatPlaybackStateLabel(stateValue) {
    if (stateValue === undefined || stateValue === null || stateValue === '') {
        return 'Unknown';
    }
    return String(stateValue);
}

function formatTime(value, fps = 30) {
    if (value === undefined || value === null || value === '') return '—';
    if (typeof value === 'string') return value;
    if (Number.isNaN(value)) return '—';

    const totalMs = Number(value);
    if (!Number.isFinite(totalMs)) return '—';

    const totalSeconds = totalMs / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function formatValue(value) {
    if (value === undefined || value === null) return '—';
    if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '—';
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch (err) {
            return '—';
        }
    }
    return String(value);
}

function formatSystemValue(value) {
    if (typeof value === 'number') {
        if (value > 1000 && value < 1000 * 60 * 60 * 24) {
            const seconds = Math.floor(value / 1000);
            const mins = Math.floor(seconds / 60);
            const hrs = Math.floor(mins / 60);
            return `${hrs}h ${mins % 60}m`;
        }
    }
    return formatValue(value);
}

function getCount(value) {
    if (Array.isArray(value)) return value.length;
    if (value && typeof value === 'object') return Object.keys(value).length;
    if (typeof value === 'number') return value;
    return undefined;
}

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function setupTimelineToggles() {
    if (!dom.timelinesBody) return;
    dom.timelinesBody.addEventListener('click', (event) => {
        const header = event.target.closest('.timeline-header');
        if (!header) return;
        const card = header.closest('.timeline-card');
        if (!card) return;
        card.classList.toggle('collapsed');
    });
}
