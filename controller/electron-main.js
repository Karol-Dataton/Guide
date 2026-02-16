const { app, BrowserWindow, dialog, shell } = require('electron');
const { startProxyServer } = require('./proxy-server');

let mainWindow = null;
let proxyServer = null;
let serverPort = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1320,
        height: 860,
        minWidth: 980,
        minHeight: 680,
        backgroundColor: '#0a0a0f',
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.loadURL(`http://127.0.0.1:${serverPort}`);
}

async function bootstrap() {
    try {
        const started = await startProxyServer({ port: 0 });
        proxyServer = started.server;
        serverPort = started.port;
        createWindow();
    } catch (err) {
        dialog.showErrorBox('Failed to start WATCHOUT Controller', err.message);
        app.quit();
    }
}

app.whenReady().then(bootstrap);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0 && serverPort) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    if (proxyServer) {
        proxyServer.close();
        proxyServer = null;
    }
});
