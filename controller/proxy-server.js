const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const ROOT_DIR = process.pkg ? path.dirname(process.execPath) : __dirname;

function createProxyApp(options = {}) {
    const app = express();
    const defaultTarget = options.defaultTarget || process.env.API_TARGET || 'http://127.0.0.1:3019';
    const rootDir = options.rootDir || ROOT_DIR;

    /* ------------------------------------------------------------------ *
     *  Dynamic target proxy                                               *
     *                                                                     *
     *  The frontend sends requests to /api/* with an optional header      *
     *  "X-Director-Target" set to the director's base URL. If the header  *
     *  is absent the proxy falls back to DEFAULT_TARGET.                  *
     * ------------------------------------------------------------------ */
    app.use('/api', createProxyMiddleware({
        target: defaultTarget,
        router(req) {
            const header = req.headers['x-director-target'];
            if (header && /^https?:\/\//.test(header)) {
                return header;
            }
            const queryTarget = req.query && typeof req.query.target === 'string'
                ? req.query.target
                : null;
            if (queryTarget && /^https?:\/\//.test(queryTarget)) {
                return queryTarget;
            }
            return defaultTarget;
        },
        changeOrigin: true,
        ws: false,
        pathRewrite: { '^/api': '' },
        onError(err, req, res) {
            if (res.headersSent) return;
            res.status(502).json({
                error: 'Upstream unavailable',
                target: req.headers['x-director-target'] || defaultTarget,
                path: req.originalUrl,
                details: err.message
            });
        }
    }));

    app.use(express.static(rootDir));

    app.get('*', (req, res) => {
        res.sendFile(path.join(rootDir, 'index.html'));
    });

    return app;
}

function startProxyServer(options = {}) {
    const app = createProxyApp(options);
    const port = Number(options.port ?? process.env.PORT) || 8081;
    const defaultTarget = options.defaultTarget || process.env.API_TARGET || 'http://127.0.0.1:3019';

    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            const address = server.address();
            const resolvedPort = address && typeof address === 'object' ? address.port : port;
            resolve({ app, server, port: resolvedPort, defaultTarget });
        });
        server.on('error', reject);
    });
}

if (require.main === module) {
    startProxyServer().then(({ port, defaultTarget }) => {
        console.log(`Controller available at http://localhost:${port}`);
        console.log(`Default proxy target: ${defaultTarget}`);
        console.log('Override with X-Director-Target header per request');
    }).catch((err) => {
        console.error('Failed to start proxy server:', err.message);
        process.exit(1);
    });
}

module.exports = {
    createProxyApp,
    startProxyServer
};
