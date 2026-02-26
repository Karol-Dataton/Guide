/**
 * WATCHOUT Infrastructure Planner
 * Node Type Definitions
 */

export const NodeTypes = {
    production: {
        title: 'Production Computer',
        icon: 'fa-desktop',
        width: 220,
        ports: [
            { id: 'net', label: 'Network', type: 'network' }
        ],
        data: { name: 'Prod-1', ip: '192.168.1.100' }
    },
    display: {
        title: 'Display Server',
        icon: 'fa-server',
        width: 220,
        ports: [
            { id: 'net', label: 'Network', type: 'network' },
            { id: 'out-1', label: 'Output 1', type: 'output' },
            { id: 'out-2', label: 'Output 2', type: 'output' },
            { id: 'out-3', label: 'Output 3', type: 'output' },
            { id: 'out-4', label: 'Output 4', type: 'output' }
        ],
        data: { name: 'Disp-1', ip: '192.168.1.101', outputs: 4, inputs: 1, inputTypes: ['Generic'] }
    },
    watchpax: {
        title: 'WATCHPAX',
        icon: 'fa-cube',
        width: 200,
        ports: [
            { id: 'net', label: 'Network', type: 'network' },
            { id: 'out-1', label: 'Output 1', type: 'output' },
            { id: 'out-2', label: 'Output 2', type: 'output' }
        ],
        data: { name: 'PAX-1', ip: '192.168.1.110', model: 'WATCHPAX 60' }
    },
    projector: {
        title: 'Projector',
        icon: 'fa-video',
        width: 180,
        ports: [
            { id: 'in', label: 'Input', type: 'input' },
            { id: 'net', label: 'Control', type: 'network' }
        ],
        data: { name: 'Proj-1', resolution: '1920x1080' }
    },
    led: {
        title: 'LED Processor',
        icon: 'fa-border-all',
        width: 200,
        ports: [
            { id: 'in', label: 'Input', type: 'input' },
            { id: 'net', label: 'Control', type: 'network' }
        ],
        data: { name: 'LED-1', pixels: '3840x2160' }
    },
    ndi: {
        title: 'NDI Source',
        icon: 'fa-podcast',
        width: 200,
        ports: [
            { id: 'net', label: 'Network', type: 'network' },
            { id: 'out', label: 'NDI Out', type: 'output' }
        ],
        data: { name: 'NDI-1', stream: 'Camera 1', resolution: '1920x1080' }
    },
    capture: {
        title: 'Capture Card',
        icon: 'fa-sd-card',
        width: 200,
        ports: [
            { id: 'in-sdi', label: 'SDI In', type: 'input' },
            { id: 'in-hdmi', label: 'HDMI In', type: 'input' },
            { id: 'out', label: 'To PC', type: 'output' }
        ],
        data: { name: 'Cap-1', model: 'Decklink', inputs: 2 }
    },
    dmx: {
        title: 'DMX / Art-Net',
        icon: 'fa-lightbulb',
        width: 200,
        ports: [
            { id: 'net', label: 'Network', type: 'network' },
            { id: 'dmx-out', label: 'DMX Out', type: 'output' }
        ],
        data: { name: 'DMX-1', universe: 1, protocol: 'Art-Net' }
    },
    audio: {
        title: 'Audio Device',
        icon: 'fa-volume-high',
        width: 180,
        ports: [
            { id: 'net', label: 'Dante/AES67', type: 'network' },
            { id: 'in', label: 'Audio In', type: 'input' },
            { id: 'out', label: 'Audio Out', type: 'output' }
        ],
        data: { name: 'Audio-1', channels: 8 }
    },
    control: {
        title: 'Control System',
        icon: 'fa-gamepad',
        width: 200,
        ports: [
            { id: 'net', label: 'Network', type: 'network' }
        ],
        data: { name: 'Ctrl-1', protocol: 'OSC', model: 'Stream Deck' }
    },
    mediaserver: {
        title: 'Media Server',
        icon: 'fa-film',
        width: 220,
        ports: [
            { id: 'net', label: 'Network', type: 'network' },
            { id: 'out-1', label: 'Output 1', type: 'output' },
            { id: 'out-2', label: 'Output 2', type: 'output' },
            { id: 'ndi-out', label: 'NDI Out', type: 'output' }
        ],
        data: { name: 'Media-1', ip: '192.168.1.120' }
    },
    matrix: {
        title: 'Matrix Switcher',
        icon: 'fa-arrows-turn-to-dots',
        width: 220,
        ports: [
            { id: 'in-1', label: 'In 1', type: 'input' },
            { id: 'in-2', label: 'In 2', type: 'input' },
            { id: 'in-3', label: 'In 3', type: 'input' },
            { id: 'in-4', label: 'In 4', type: 'input' },
            { id: 'out-1', label: 'Out 1', type: 'output' },
            { id: 'out-2', label: 'Out 2', type: 'output' },
            { id: 'out-3', label: 'Out 3', type: 'output' },
            { id: 'out-4', label: 'Out 4', type: 'output' },
            { id: 'net', label: 'Control', type: 'network' }
        ],
        data: { name: 'Matrix-1', model: '4x4 HDMI' }
    },
    switch: {
        title: 'Network Switch',
        icon: 'fa-network-wired',
        width: 180,
        ports: [
            { id: 'p1', label: 'Port 1', type: 'network' },
            { id: 'p2', label: 'Port 2', type: 'network' },
            { id: 'p3', label: 'Port 3', type: 'network' },
            { id: 'p4', label: 'Port 4', type: 'network' },
            { id: 'p5', label: 'Port 5', type: 'network' },
            { id: 'p6', label: 'Port 6', type: 'network' },
            { id: 'p7', label: 'Port 7', type: 'network' },
            { id: 'p8', label: 'Port 8', type: 'network' }
        ],
        data: { name: 'Switch-1', model: 'Generic' }
    }
};
