const path = require('path');
const { app, BrowserWindow } = require('electron');
const { startServer } = require('../../dashboard/proxy-server');

const SERVER_PORT = Number(process.env.ELECTRON_PORT || process.env.PORT || 8088);
const WORKSPACE_ROOT = path.resolve(__dirname, '../..');

let mainWindow;
let localServer;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 900,
        minWidth: 1024,
        minHeight: 720,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    mainWindow.loadURL(`http://127.0.0.1:${SERVER_PORT}/desktop/electron/shell.html`);

    if (process.env.ELECTRON_DEVTOOLS === '1') {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function startLocalServer() {
    localServer = startServer({
        port: SERVER_PORT,
        rootDir: WORKSPACE_ROOT,
        staticMounts: [{ route: '/', dir: WORKSPACE_ROOT }],
        fallbackFile: path.join(WORKSPACE_ROOT, 'index.html'),
        logLabel: 'WATCHOUT Tools'
    });
}

function stopLocalServer() {
    if (!localServer) return;

    const server = localServer;
    localServer = null;
    server.close();
}

app.whenReady().then(() => {
    startLocalServer();
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    stopLocalServer();
});
