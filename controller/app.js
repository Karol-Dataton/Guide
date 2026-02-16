/* WATCHOUT Controller - Application Logic */

const CONNECTION_STORAGE_KEY = 'controller.connection.v1';
const PROXY_BASE = '/api';

const state = {
    connected: false,
    connectionStatus: 'disconnected',
    directorIp: '',
    directorPort: '3019',
    directUrl: '',
    useProxy: true,
    systemInfo: null,
    showData: null,
    timelines: [],
    cuesByTimeline: {},
    playbackStates: null,
    playbackSyncedAt: 0,
    playbackAnimationHandle: null,
    hasPlaybackSse: false,
    inputs: null,
    cueGroupStates: null,
    eventSource: null
};

const dom = {};

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    setupConnectModal();
    setupGlobalControls();

    const saved = loadConnectionSettings();
    if (saved) {
        state.directorIp = saved.ip;
        state.directorPort = saved.port;
        connectToDirector(saved.ip, saved.port);
    } else {
        showConnectModal();
    }
});

/* ================================================================== *
 *  DOM Cache                                                          *
 * ================================================================== */

function cacheDom() {
    dom.statusDot = document.getElementById('status-dot');
    dom.statusText = document.getElementById('status-text');
    dom.ipBadge = document.getElementById('ip-badge');
    dom.systemBadge = document.getElementById('system-badge');
    dom.timelinesBody = document.getElementById('timelines-body');
    dom.variablesBody = document.getElementById('variables-body');
    dom.cueSetsBody = document.getElementById('cue-sets-body');
    dom.variablesCount = document.getElementById('variables-count');
    dom.cueSetsCount = document.getElementById('cue-sets-count');
    dom.connectModal = document.getElementById('connect-modal');
    dom.connectClose = document.getElementById('connect-close');
    dom.connectIp = document.getElementById('connect-ip');
    dom.connectPort = document.getElementById('connect-port');
    dom.connectBtn = document.getElementById('connect-btn');
    dom.connectError = document.getElementById('connect-error');
    dom.toastContainer = document.getElementById('toast-container');
    dom.globalRun = document.getElementById('global-run');
    dom.globalPause = document.getElementById('global-pause');
    dom.globalKill = document.getElementById('global-kill');
}

/* ================================================================== *
 *  Connection                                                         *
 * ================================================================== */

function showConnectModal() {
    if (!dom.connectModal) return;
    dom.connectIp.value = state.directorIp || '127.0.0.1';
    dom.connectPort.value = state.directorPort || '3019';
    dom.connectError.hidden = true;
    dom.connectModal.hidden = false;
    dom.connectIp.focus();
}

function hideConnectModal() {
    if (dom.connectModal) dom.connectModal.hidden = true;
}

function setupConnectModal() {
    if (dom.connectBtn) {
        dom.connectBtn.addEventListener('click', onConnectClick);
    }

    if (dom.connectClose) {
        dom.connectClose.addEventListener('click', () => {
            if (state.connected) hideConnectModal();
        });
    }

    if (dom.connectModal) {
        dom.connectModal.addEventListener('click', (event) => {
            if (event.target === dom.connectModal && state.connected) hideConnectModal();
        });
    }

    [dom.connectIp, dom.connectPort].forEach(input => {
        if (input) {
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') onConnectClick();
            });
        }
    });

    if (dom.ipBadge) {
        dom.ipBadge.addEventListener('click', showConnectModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dom.connectModal && !dom.connectModal.hidden && state.connected) {
            hideConnectModal();
        }
    });
}

function onConnectClick() {
    const ip = (dom.connectIp.value || '').trim() || '127.0.0.1';
    const port = (dom.connectPort.value || '').trim() || '3019';
    dom.connectError.hidden = true;
    connectToDirector(ip, port);
}

async function connectToDirector(ip, port) {
    setConnectionStatus('connecting');
    state.directorIp = ip;
    state.directorPort = port;
    state.directUrl = `http://${ip}:${port}`;

    updateIpBadge();
    closeSSE();

    try {
        await fetchJSON('/info');
        state.connected = true;
        setConnectionStatus('connected');
        saveConnectionSettings(ip, port);
        hideConnectModal();
        fetchInitialData();
        connectSSE();
    } catch (err) {
        state.connected = false;
        setConnectionStatus('disconnected');
        showConnectError(`Could not connect to ${ip}:${port} — ${err.message}`);
    }
}

function disconnect() {
    closeSSE();
    stopPlaybackAnimationLoop();
    state.connected = false;
    setConnectionStatus('disconnected');
    state.systemInfo = null;
    state.showData = null;
    state.timelines = [];
    state.cuesByTimeline = {};
    state.playbackStates = null;
    state.inputs = null;
    state.cueGroupStates = null;
    renderAll();
}

function showConnectError(message) {
    if (!dom.connectError) return;
    dom.connectError.textContent = message;
    dom.connectError.hidden = false;
}

function updateIpBadge() {
    if (!dom.ipBadge) return;
    if (state.directorIp) {
        dom.ipBadge.textContent = `${state.directorIp}:${state.directorPort}`;
    } else {
        dom.ipBadge.textContent = 'No Director';
    }
}

function setConnectionStatus(status) {
    const labels = { connected: 'Connected', disconnected: 'Disconnected', connecting: 'Connecting…' };
    state.connectionStatus = status;

    if (dom.statusDot) {
        dom.statusDot.classList.remove('status-connected', 'status-disconnected', 'status-connecting');
        dom.statusDot.classList.add(`status-${status}`);
    }
    if (dom.statusText) {
        dom.statusText.textContent = labels[status] || status;
    }
}

/* ================================================================== *
 *  Persistence                                                        *
 * ================================================================== */

function loadConnectionSettings() {
    try {
        const raw = localStorage.getItem(CONNECTION_STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (data && data.ip) return data;
    } catch (err) { /* ignore */ }
    return null;
}

function saveConnectionSettings(ip, port) {
    try {
        localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify({ ip, port }));
    } catch (err) { /* ignore */ }
}

/* ================================================================== *
 *  Data Fetching                                                      *
 * ================================================================== */

async function fetchInitialData() {
    await Promise.allSettled([
        fetchSystemInfo(),
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
        renderEmpty(dom.timelinesBody, 'System info unavailable');
    }
}

async function fetchShowData() {
    try {
        const [showData, timelines] = await Promise.all([
            fetchJSON('/v0/show'),
            fetchJSON('/v0/timelines')
        ]);

        state.showData = showData;
        state.timelines = mergeTimelineMeta(
            normalizeTimelines(timelines),
            normalizeShowTimelines(showData)
        );
        renderTimelines();

        await fetchCuesForTimelines(state.timelines);
        renderTimelines();
    } catch (err) {
        renderEmpty(dom.timelinesBody, 'Show data unavailable');
    }
}

async function fetchPlaybackState() {
    try {
        const data = await fetchJSON('/v0/state');
        setPlaybackStates(data);
        renderTimelines();
    } catch (err) {
        try {
            const data = await fetchJSON('/state');
            setPlaybackStates(data);
            renderTimelines();
        } catch (fallbackErr) {
            setPlaybackStates(null);
            renderTimelines();
        }
    }
}

async function fetchInputs() {
    try {
        const data = await fetchJSON('/v0/inputs');
        state.inputs = data;
        renderVariables();
    } catch (err) {
        renderEmpty(dom.variablesBody, 'Variables unavailable');
    }
}

async function fetchCueGroups() {
    try {
        const data = await fetchJSON('/v0/cue-group-state/by-name');
        state.cueGroupStates = data;
        renderCueSets();
    } catch (err) {
        state.cueGroupStates = null;
        renderCueSets();
    }
}

async function fetchCuesForTimelines(timelines) {
    if (!Array.isArray(timelines) || timelines.length === 0) return;
    const tasks = timelines
        .filter(t => t.id !== null && t.id !== undefined)
        .map(async t => {
            try {
                const cues = await fetchJSON(`/v0/cues/${encodeURIComponent(t.id)}`);
                state.cuesByTimeline[t.id] = normalizeCues(cues);
            } catch (err) {
                state.cuesByTimeline[t.id] = [];
            }
        });
    await Promise.allSettled(tasks);
}

/* ================================================================== *
 *  SSE                                                                *
 * ================================================================== */

function connectSSE() {
    closeSSE();
    const base = `${getBaseUrl()}/v0/sse`;
    const url = state.useProxy && state.directUrl
        ? `${base}?target=${encodeURIComponent(state.directUrl)}`
        : base;
    let es;
    try {
        es = new EventSource(url);
    } catch (err) {
        return;
    }

    state.eventSource = es;

    es.addEventListener('open', () => {
        state.connected = true;
        setConnectionStatus('connected');
    });

    es.addEventListener('error', () => {
        state.connected = false;
        setConnectionStatus('disconnected');
    });

    const register = (type) => {
        es.addEventListener(type, (event) => {
            handleSsePayload(type, parsePayload(event.data));
        });
    };

    register('PlaybackState');
    register('playbackState');
    register('Inputs');
    register('ShowRevision');
    register('TimelineCountdowns');
    register('CueVisibility');

    es.addEventListener('message', (event) => {
        const payload = parsePayload(event.data);
        if (payload && typeof payload === 'object') {
            const eventType = payload.type || payload.kind;
            if (eventType) {
                handleSsePayload(eventType, payload.data ?? payload.payload ?? payload.value ?? payload);
            }
        }
    });
}

function closeSSE() {
    if (state.eventSource) {
        try { state.eventSource.close(); } catch (err) { /* ignore */ }
        state.eventSource = null;
    }
}

function handleSsePayload(type, payload) {
    const n = String(type || '').toLowerCase();
    switch (n) {
        case 'playbackstate':
            setPlaybackStates(payload, true);
            renderTimelines();
            break;
        case 'inputs':
            state.inputs = payload;
            renderVariables();
            break;
        case 'showrevision':
            refreshShowStructure();
            break;
        case 'timelinecountdowns':
            break;
        case 'cuevisibility':
            break;
        default:
            break;
    }
}

async function refreshShowStructure() {
    await Promise.allSettled([fetchShowData(), fetchCueGroups()]);
}

/* ================================================================== *
 *  Control Actions                                                    *
 * ================================================================== */

async function runTimeline(id) {
    try {
        await controlTimeline(id, 'run');
        toast('Timeline started', 'success');
    } catch (err) {
        toast(`Run failed: ${err.message}`, 'error');
    }
}

async function pauseTimeline(id) {
    try {
        await controlTimeline(id, 'pause');
        toast('Timeline paused', 'success');
    } catch (err) {
        toast(`Pause failed: ${err.message}`, 'error');
    }
}

async function killTimeline(id) {
    try {
        await controlTimeline(id, 'kill');
        toast('Timeline stopped', 'success');
    } catch (err) {
        toast(`Kill failed: ${err.message}`, 'error');
    }
}

async function resetTimeline(id) {
    try {
        await controlTimeline(id, 'reset');
        toast('Timeline reset', 'success');
    } catch (err) {
        toast(`Reset failed: ${err.message}`, 'error');
    }
}

async function controlTimeline(id, action) {
    const timelineId = encodeURIComponent(id);
    const legacyAction = encodeURIComponent(action);
    const endpointsByAction = {
        run: [`/v0/play/${timelineId}`, `/v0/timelines/${timelineId}/${legacyAction}`],
        pause: [`/v0/pause/${timelineId}`, `/v0/timelines/${timelineId}/${legacyAction}`],
        kill: [`/v0/stop/${timelineId}`, `/v0/timelines/${timelineId}/${legacyAction}`],
        reset: [`/v0/stop/${timelineId}`, `/v0/timelines/${timelineId}/${legacyAction}`]
    };
    const endpoints = endpointsByAction[action] || [`/v0/timelines/${timelineId}/${legacyAction}`];
    return requestWithMethodFallback(endpoints);
}

async function setVariable(name, value) {
    try {
        const key = encodeURIComponent(name);
        const qValue = encodeURIComponent(value);
        await requestWithMethodFallback([
            `/v0/input/${key}?value=${qValue}`,
            `/v0/inputs/${key}`
        ], { value });
        toast(`${name} → ${value}`, 'success');
    } catch (err) {
        toast(`Set variable failed: ${err.message}`, 'error');
    }
}

async function activateCueVariant(groupName, variantName) {
    try {
        const group = encodeURIComponent(groupName);
        const variant = encodeURIComponent(variantName);
        await requestWithMethodFallback([
            `/v0/cue-group-state/by-name/${group}/${variant}`,
            `/v0/cue-group/${group}/activate`
        ], { variant: variantName });
        toast(`${groupName} → ${variantName}`, 'success');
    } catch (err) {
        toast(`Activate variant failed: ${err.message}`, 'error');
    }
}

/* ================================================================== *
 *  Global Controls                                                    *
 * ================================================================== */

function setupGlobalControls() {
    if (dom.globalRun) {
        dom.globalRun.addEventListener('click', () => {
            state.timelines.forEach(t => runTimeline(t.id));
        });
    }
    if (dom.globalPause) {
        dom.globalPause.addEventListener('click', () => {
            state.timelines.forEach(t => pauseTimeline(t.id));
        });
    }
    if (dom.globalKill) {
        dom.globalKill.addEventListener('click', () => {
            state.timelines.forEach(t => killTimeline(t.id));
        });
    }
}

/* ================================================================== *
 *  Render                                                             *
 * ================================================================== */

function renderAll() {
    renderSystemInfo();
    renderTimelines();
    renderVariables();
    renderCueSets();
}

function renderSystemInfo() {
    if (!dom.systemBadge) return;
    if (!state.systemInfo) {
        dom.systemBadge.textContent = 'System: —';
        return;
    }
    const version = state.systemInfo.version || state.systemInfo.release || state.systemInfo.softwareVersion || '—';
    dom.systemBadge.textContent = `System: ${version}`;
}

function renderTimelines() {
    if (!dom.timelinesBody) return;
    const timelines = state.timelines;

    if (!timelines.length) {
        renderEmpty(dom.timelinesBody, 'No timelines found');
        return;
    }

    const playbackMap = buildPlaybackMap();
    syncPlaybackAnimationLoop(playbackMap);

    if (canPatchTimelineRows(timelines)) {
        patchTimelineRows(timelines, playbackMap);
        return;
    }

    const html = timelines.map(timeline => {
        const model = buildTimelineViewModel(timeline, playbackMap);

        return `
            <div class="timeline-row" data-timeline-id="${escapeAttr(model.id)}">
                <div class="timeline-info">
                    <div class="timeline-head">
                        <div class="timeline-text">
                            <div class="timeline-name">${escapeHtml(model.name)}</div>
                            <div class="timeline-meta"><span class="timeline-cues">${model.cuesLabel}</span> • <span class="timeline-position">${model.positionLabel}</span> • <span class="timeline-duration">${model.durationLabel}</span></div>
                        </div>
                        <span class="badge ${model.badgeClass}">${escapeHtml(model.stateLabel)}</span>
                    </div>
                    <div class="progress-bar"><div class="progress-bar-fill" style="width: ${model.progress.toFixed(1)}%;"></div></div>
                </div>
                <div class="timeline-controls">
                    <button class="control-btn run" type="button" data-action="run" data-id="${escapeAttr(model.id)}" title="Run" ${isTimelineActionDisabled('run', model.badgeClass) ? 'disabled' : ''}>▶</button>
                    <button class="control-btn pause" type="button" data-action="pause" data-id="${escapeAttr(model.id)}" title="Pause" ${isTimelineActionDisabled('pause', model.badgeClass) ? 'disabled' : ''}>⏸</button>
                    <button class="control-btn kill" type="button" data-action="kill" data-id="${escapeAttr(model.id)}" title="Kill" ${isTimelineActionDisabled('kill', model.badgeClass) ? 'disabled' : ''}>⏹</button>
                    <button class="control-btn reset" type="button" data-action="reset" data-id="${escapeAttr(model.id)}" title="Reset" ${isTimelineActionDisabled('reset', model.badgeClass) ? 'disabled' : ''}>⏮</button>
                </div>
            </div>
        `;
    }).join('');

    dom.timelinesBody.innerHTML = html;

    dom.timelinesBody.querySelectorAll('.control-btn[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            if (action === 'run') runTimeline(id);
            else if (action === 'pause') pauseTimeline(id);
            else if (action === 'kill') killTimeline(id);
            else if (action === 'reset') resetTimeline(id);
        });
    });
}

function canPatchTimelineRows(timelines) {
    const rows = dom.timelinesBody.querySelectorAll('.timeline-row[data-timeline-id]');
    if (rows.length !== timelines.length) return false;
    return timelines.every((timeline, index) => rows[index].dataset.timelineId === String(timeline.id));
}

function patchTimelineRows(timelines, playbackMap) {
    const rows = dom.timelinesBody.querySelectorAll('.timeline-row[data-timeline-id]');
    timelines.forEach((timeline, index) => {
        const row = rows[index];
        if (!row) return;
        const model = buildTimelineViewModel(timeline, playbackMap);
        const nameEl = row.querySelector('.timeline-name');
        const cuesEl = row.querySelector('.timeline-cues');
        const positionEl = row.querySelector('.timeline-position');
        const durationEl = row.querySelector('.timeline-duration');
        const badgeEl = row.querySelector('.badge');
        const progressFill = row.querySelector('.progress-bar-fill');

        if (nameEl) nameEl.textContent = model.name;
        if (cuesEl) cuesEl.textContent = model.cuesLabel;
        if (positionEl) positionEl.textContent = model.positionLabel;
        if (durationEl) durationEl.textContent = model.durationLabel;
        if (badgeEl) {
            badgeEl.className = `badge ${model.badgeClass}`;
            badgeEl.textContent = model.stateLabel;
        }
        if (progressFill) {
            progressFill.style.width = `${model.progress.toFixed(1)}%`;
        }

        row.querySelectorAll('.control-btn[data-action]').forEach(btn => {
            btn.disabled = isTimelineActionDisabled(btn.dataset.action, model.badgeClass);
        });
    });
}

function buildTimelineViewModel(timeline, playbackMap) {
    const cues = state.cuesByTimeline[timeline.id] || [];
    const duration = Number(timeline.duration ?? 0);
    const pb = playbackMap.get(String(timeline.id)) || {};
    const badgeClass = normalizePlaybackBadge(pb.state);
    const stateLabel = pb.state ? formatPlaybackStateLabel(pb.state) : 'Stopped';
    const position = Number(pb.position ?? 0);
    const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;

    return {
        id: timeline.id,
        name: timeline.name,
        cuesLabel: `${cues.length} cues`,
        positionLabel: formatTime(position),
        durationLabel: formatTime(duration),
        stateLabel,
        badgeClass,
        progress
    };
}

function isTimelineActionDisabled(action, badgeClass) {
    if (action === 'run') return badgeClass === 'playing';
    if (action === 'pause') return badgeClass === 'paused' || badgeClass === 'stopped' || badgeClass === 'idle';
    if (action === 'kill') return badgeClass === 'stopped' || badgeClass === 'idle';
    return false;
}

function renderVariables() {
    if (!dom.variablesBody) return;
    const variables = normalizeInputs(state.inputs);

    if (dom.variablesCount) {
        dom.variablesCount.textContent = variables.length ? variables.length : '';
    }

    if (!variables.length) {
        renderEmpty(dom.variablesBody, 'No variables available');
        return;
    }

    const html = variables.map(v => {
        const min = v.min ?? v.minimum ?? v.rangeMin;
        const max = v.max ?? v.maximum ?? v.rangeMax;
        const rangeParts = [];
        if (min !== undefined || max !== undefined) {
            rangeParts.push(`${min ?? '—'} – ${max ?? '—'}`);
        }
        const def = v.default ?? v.defaultValue;
        if (def !== undefined) rangeParts.push(`default ${def}`);

        return `
            <div class="variable-row">
                <div>
                    <div class="variable-name">${escapeHtml(v.name)}</div>
                    <div class="variable-meta">${escapeHtml(v.unit || v.type || '')}</div>
                </div>
                <input class="variable-input" type="text" data-var-name="${escapeAttr(v.name)}" value="${escapeAttr(formatValue(v.value))}" autocomplete="off" spellcheck="false">
                <div class="variable-range">${escapeHtml(rangeParts.join(' • ') || '—')}</div>
            </div>
        `;
    }).join('');

    dom.variablesBody.innerHTML = html;

    dom.variablesBody.querySelectorAll('.variable-input').forEach(input => {
        let originalValue = input.value;

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (commitVariable(input, originalValue)) {
                    originalValue = input.value.trim();
                }
                input.blur();
            }
            if (event.key === 'Escape') {
                input.value = originalValue;
                input.blur();
            }
        });

        input.addEventListener('blur', () => {
            if (commitVariable(input, originalValue)) {
                originalValue = input.value.trim();
            }
        });
    });
}

function commitVariable(input, originalValue) {
    const name = input.dataset.varName;
    const newValue = input.value.trim();
    if (newValue === originalValue) return false;

    const numeric = Number(newValue);
    const value = Number.isFinite(numeric) ? numeric : newValue;
    setVariable(name, value);
    return true;
}

function renderCueSets() {
    if (!dom.cueSetsBody) return;
    const groups = normalizeCueGroups(state.cueGroupStates);

    if (dom.cueSetsCount) {
        dom.cueSetsCount.textContent = groups.length ? groups.length : '';
    }

    if (!groups.length) {
        renderEmpty(dom.cueSetsBody, 'No cue sets available');
        return;
    }

    const html = groups.map(group => {
        const variants = group.variants || [];
        const hasVariants = variants.length > 0;

        const selectHtml = hasVariants
            ? `<select class="cue-variant-select" data-group="${escapeAttr(group.name)}">
                ${variants.map(v => `<option value="${escapeAttr(v)}" ${v === group.active ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('')}
               </select>`
            : `<span class="badge idle">${escapeHtml(group.active || '—')}</span>`;

        return `
            <div class="cue-set-row">
                <div>
                    <div class="cue-set-name">${escapeHtml(group.name)}</div>
                    <div class="cue-set-active">Active: ${escapeHtml(group.active || '—')}</div>
                </div>
                ${selectHtml}
            </div>
        `;
    }).join('');

    dom.cueSetsBody.innerHTML = html;

    dom.cueSetsBody.querySelectorAll('.cue-variant-select').forEach(select => {
        select.addEventListener('change', () => {
            const groupName = select.dataset.group;
            const variantName = select.value;
            activateCueVariant(groupName, variantName);
        });
    });
}

/* ================================================================== *
 *  Toast Notifications                                                *
 * ================================================================== */

function toast(message, type) {
    if (!dom.toastContainer) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type || 'info'}`;
    el.textContent = message;
    dom.toastContainer.appendChild(el);

    setTimeout(() => {
        el.classList.add('toast-out');
        el.addEventListener('animationend', () => el.remove());
    }, 2500);
}

/* ================================================================== *
 *  Normalizers                                                        *
 * ================================================================== */

function normalizeTimelines(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : raw.timelines || raw.items || [];
    return list.map((item, i) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? i,
        name: item.name || item.title || `Timeline ${i + 1}`,
        duration: item.duration ?? item.length ?? item.durationMs ?? item.duration_ms ?? 0
    }));
}

function normalizeShowTimelines(show) {
    if (!show || typeof show !== 'object') return [];
    const root = show.show && typeof show.show === 'object' ? show.show : show;
    const raw = root.timelines;

    const source = Array.isArray(raw) ? raw
        : raw && typeof raw === 'object'
            ? Object.entries(raw).map(([id, value]) => {
                if (value && typeof value === 'object') return { ...value, id: value.id ?? id };
                return { id, name: String(value ?? '') };
            }) : [];

    return source.map((item, i) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? i,
        name: item.name || item.title || item.timelineName || `Timeline ${i + 1}`,
        duration: item.duration ?? item.length ?? item.durationMs ?? item.duration_ms
            ?? item.cueSequence?.duration ?? item.cue_sequence?.duration ?? 0
    }));
}

function mergeTimelineMeta(primary, fallback) {
    const p = Array.isArray(primary) ? primary : [];
    const f = Array.isArray(fallback) ? fallback : [];
    const fbById = new Map();
    const fbByName = new Map();
    f.forEach(item => {
        if (item && item.id != null) fbById.set(String(item.id), item);
        if (item && item.name) fbByName.set(String(item.name), item);
    });

    const merged = p.map(item => {
        const match = fbById.get(String(item.id)) || fbByName.get(String(item.name || ''));
        if (!match) return item;
        return { ...item, name: item.name || match.name, duration: pickDuration(item.duration, match.duration) };
    });

    const existingIds = new Set(merged.map(item => String(item.id)));
    f.forEach(item => {
        if (!item || item.id == null) return;
        if (!existingIds.has(String(item.id))) merged.push(item);
    });

    return merged;
}

function normalizeCues(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : raw.cues || raw.items || raw.data || [];
    return list.map((item, i) => ({
        id: item.id ?? item.cueId ?? item.uuid ?? item.name ?? i,
        name: item.name || item.title || item.label,
        type: item.type || item.kind || item.command,
        time: item.time ?? item.position ?? item.offset ?? item.start ?? item.at ?? 0
    }));
}

function normalizePlaybackStates(raw) {
    if (!raw) return [];
    if (raw && typeof raw === 'object' && raw.value && typeof raw.value === 'object') {
        return normalizePlaybackStates(raw.value);
    }

    let list = [];
    if (Array.isArray(raw)) list = raw;
    else if (Array.isArray(raw.timelines)) list = raw.timelines;
    else if (Array.isArray(raw.states)) list = raw.states;
    else if (raw && typeof raw === 'object' && raw.playback && typeof raw.playback === 'object') {
        list = Object.entries(raw.playback).map(([id, value]) => ({ ...value, id }));
    } else if (raw && typeof raw === 'object') {
        list = Object.entries(raw).map(([id, value]) => {
            if (value && typeof value === 'object') return { ...value, id: value.id ?? value.timelineId ?? id };
            return { id, state: value };
        });
    }

    return list.map((item, i) => ({
        id: item.id ?? item.timelineId ?? item.uuid ?? item.name ?? i,
        name: item.name || item.title || item.timelineName,
        state: item.state || item.playbackState || item.playbackStatus || item.status || item.mode || item.phase || inferPlaybackState(item),
        position: item.position ?? item.timelineTime ?? item.time ?? item.currentTime ?? item.playhead ?? 0,
        duration: item.duration ?? item.length ?? item.totalDuration ?? item.durationMs
    }));
}

function inferPlaybackState(item) {
    if (!item || typeof item !== 'object') return undefined;
    if (item.running === true || item.isRunning === true) return 'run';
    if (item.running === false || item.isRunning === false) return 'pause';
    if (item.playing === true || item.isPlaying === true) return 'playing';
    if (item.paused === true || item.isPaused === true) return 'paused';
    if (item.stopped === true || item.isStopped === true) return 'stopped';
    return undefined;
}

function normalizeInputs(raw) {
    if (!raw) return [];
    let list = [];
    if (Array.isArray(raw)) list = raw;
    else if (Array.isArray(raw.inputs)) list = raw.inputs;
    else if (raw && typeof raw === 'object') list = Object.values(raw);

    return list.map((item, i) => ({
        name: item.name || item.id || item.key || `Variable ${i + 1}`,
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
        return raw.map((item, i) => ({
            name: item.name || item.group || `Group ${i + 1}`,
            active: item.active || item.activeVariant || item.current || item.value,
            variants: item.variants || item.options || []
        }));
    }
    if (typeof raw === 'object') {
        return Object.entries(raw).map(([name, value]) => {
            if (typeof value === 'string') return { name, active: value, variants: [] };
            if (value && typeof value === 'object') {
                return {
                    name,
                    active: value.active || value.activeVariant || value.current || value.value,
                    variants: value.variants || value.options || []
                };
            }
            return { name, active: String(value ?? '—'), variants: [] };
        });
    }
    return [];
}

function buildPlaybackMap() {
    const map = new Map();
    const list = normalizePlaybackStates(state.playbackStates);
    const elapsed = Math.max(0, Date.now() - (state.playbackSyncedAt || Date.now()));
    list.forEach(item => {
        if (item.id == null) return;
        const normalized = { ...item };
        const basePosition = Number(normalized.position);
        const duration = Number(normalized.duration);
        let position = Number.isFinite(basePosition) ? basePosition : 0;

        if (isPlaybackStateRunning(normalized.state)) {
            position += elapsed;
        }

        if (Number.isFinite(duration) && duration > 0) {
            position = Math.min(position, duration);
        }

        normalized.position = position;
        map.set(String(normalized.id), normalized);
    });
    return map;
}

function setPlaybackStates(payload, fromSse) {
    state.playbackStates = payload;
    state.playbackSyncedAt = Date.now();
    if (fromSse) state.hasPlaybackSse = true;
}

function isPlaybackStateRunning(stateValue) {
    const v = String(stateValue || '').toLowerCase();
    return v.includes('play') || v === 'run' || v === 'running';
}

function syncPlaybackAnimationLoop(playbackMap) {
    const hasRunning = Array.from(playbackMap.values()).some(item => isPlaybackStateRunning(item.state));
    if (hasRunning) startPlaybackAnimationLoop();
    else stopPlaybackAnimationLoop();
}

function startPlaybackAnimationLoop() {
    if (state.playbackAnimationHandle) return;
    state.playbackAnimationHandle = window.setInterval(() => {
        renderTimelines();
    }, 200);
}

function stopPlaybackAnimationLoop() {
    if (!state.playbackAnimationHandle) return;
    window.clearInterval(state.playbackAnimationHandle);
    state.playbackAnimationHandle = null;
}

/* ================================================================== *
 *  Network Helpers                                                    *
 * ================================================================== */

function getBaseUrl() {
    if (state.useProxy) return PROXY_BASE;
    return state.directUrl || PROXY_BASE;
}

async function fetchJSON(endpoint) {
    const url = `${getBaseUrl()}${endpoint}`;
    const headers = { 'Accept': 'application/json' };
    if (state.useProxy && state.directUrl) {
        headers['X-Director-Target'] = state.directUrl;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) throw await createHttpError(response);
    return response.json();
}

async function putJSON(endpoint, body) {
    const url = `${getBaseUrl()}${endpoint}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (state.useProxy && state.directUrl) {
        headers['X-Director-Target'] = state.directUrl;
    }
    const options = { method: 'PUT', headers };
    if (body !== undefined) options.body = JSON.stringify(body);
    const response = await fetch(url, options);
    if (!response.ok) throw await createHttpError(response);
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch (err) { return text; }
}

async function postJSON(endpoint, body) {
    const url = `${getBaseUrl()}${endpoint}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (state.useProxy && state.directUrl) {
        headers['X-Director-Target'] = state.directUrl;
    }
    const options = { method: 'POST', headers };
    if (body !== undefined) options.body = JSON.stringify(body);
    const response = await fetch(url, options);
    if (!response.ok) throw await createHttpError(response);
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch (err) { return text; }
}

async function requestWithMethodFallback(endpoints, body) {
    const list = Array.isArray(endpoints) ? endpoints : [endpoints];
    let lastErr;

    for (const endpoint of list) {
        try {
            return await postJSON(endpoint, body);
        } catch (postErr) {
            lastErr = postErr;
            if (!isRetryableMethodMismatch(postErr)) {
                if (!isNotFound(postErr)) throw postErr;
            }
        }

        try {
            return await putJSON(endpoint, body);
        } catch (putErr) {
            lastErr = putErr;
            if (!isRetryableMethodMismatch(putErr) && !isNotFound(putErr)) {
                throw putErr;
            }
        }
    }

    throw lastErr || new Error('Request failed');
}

function isRetryableMethodMismatch(err) {
    return !!err && (err.status === 405 || err.status === 501);
}

function isNotFound(err) {
    return !!err && err.status === 404;
}

async function createHttpError(response) {
    let details = '';
    try {
        const text = await response.text();
        if (text) details = `: ${text}`;
    } catch (err) { /* ignore */ }
    const err = new Error(`${response.status} ${response.statusText}${details}`.trim());
    err.status = response.status;
    return err;
}

function parsePayload(data) {
    if (!data) return null;
    try { return JSON.parse(data); } catch (err) { return data; }
}

/* ================================================================== *
 *  Formatting Utilities                                               *
 * ================================================================== */

function normalizePlaybackBadge(stateValue) {
    const v = String(stateValue || '').toLowerCase();
    if (v.includes('play') || v === 'run' || v === 'running') return 'playing';
    if (v.includes('pause')) return 'paused';
    if (v.includes('stop')) return 'stopped';
    return 'idle';
}

function formatPlaybackStateLabel(stateValue) {
    if (stateValue === undefined || stateValue === null || stateValue === '') return 'Unknown';
    return String(stateValue);
}

function formatTime(value) {
    if (value === undefined || value === null || value === '') return '—';
    if (typeof value === 'string') return value;
    const totalMs = Number(value);
    if (!Number.isFinite(totalMs)) return '—';
    const totalSeconds = totalMs / 1000;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function pad(v) { return String(v).padStart(2, '0'); }

function formatValue(value) {
    if (value === undefined || value === null) return '—';
    if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '—';
    if (typeof value === 'object') {
        try { return JSON.stringify(value); } catch (err) { return '—'; }
    }
    return String(value);
}

function pickDuration(primary, fallback) {
    const a = Number(primary);
    if (Number.isFinite(a) && a > 0) return a;
    const b = Number(fallback);
    if (Number.isFinite(b) && b > 0) return b;
    return 0;
}

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;');
}

function renderEmpty(container, message) {
    if (!container) return;
    container.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
}
