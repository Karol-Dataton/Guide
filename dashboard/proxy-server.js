const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const DEFAULT_PORT = 8080;
const DEFAULT_TARGET = 'http://127.0.0.1:3019';
const DEFAULT_DISCOVERY_TARGET = 'http://127.0.0.1:3017';

function isDiscoveryPath(pathname) {
    return pathname === '/v0/discovered'
        || pathname === '/v0/discovery-sse'
        || pathname === '/v0/discovery-ping';
}

function createProxyApp(options = {}) {
    const target = options.target || process.env.API_TARGET || DEFAULT_TARGET;
    const discoveryTarget = options.discoveryTarget || process.env.DISCOVERY_API_TARGET || DEFAULT_DISCOVERY_TARGET;
    const rootDir = options.rootDir || __dirname;

    const staticMounts = Array.isArray(options.staticMounts) && options.staticMounts.length > 0
        ? options.staticMounts
        : [{ route: '/', dir: rootDir }];

    const fallbackFile = options.fallbackFile || path.join(rootDir, 'index.html');
    const enableFallback = options.enableFallback !== false;

    const app = express();

    app.use('/api', createProxyMiddleware({
        target,
        router(req) {
            if (isDiscoveryPath(req.path)) {
                return discoveryTarget;
            }
            return target;
        },
        changeOrigin: true,
        ws: false,
        pathRewrite: { '^/api': '' },
        onError(err, req, res) {
            if (res.headersSent) return;
            res.status(502).json({
                error: 'Upstream unavailable',
                target: isDiscoveryPath(req.path) ? discoveryTarget : target,
                path: req.originalUrl,
                details: err.message
            });
        }
    }));

    staticMounts.forEach(({ route, dir }) => {
        if (!route || route === '/') {
            app.use(express.static(dir));
            return;
        }
        app.use(route, express.static(dir));
    });

    if (enableFallback) {
        app.get('*', (req, res) => {
            res.sendFile(fallbackFile);
        });
    }

    return {
        app,
        target,
        discoveryTarget
    };
}

function startServer(options = {}) {
    const port = Number(options.port || process.env.PORT || DEFAULT_PORT);
    const logLabel = options.logLabel || 'Dashboard';
    const { app, target, discoveryTarget } = createProxyApp(options);

    const server = app.listen(port, () => {
        console.log(`${logLabel} available at http://localhost:${port}`);
        console.log(`Proxying /api/* to ${target}`);
        console.log(`Proxying discovery endpoints to ${discoveryTarget}`);
    });

    return server;
}

if (require.main === module) {
    startServer();
}

module.exports = {
    createProxyApp,
    startServer,
    isDiscoveryPath
};
