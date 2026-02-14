const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = Number(process.env.PORT) || 8080;
const TARGET = process.env.API_TARGET || 'http://127.0.0.1:3019';
const DISCOVERY_TARGET = process.env.DISCOVERY_API_TARGET || 'http://127.0.0.1:3017';
const ROOT_DIR = __dirname;

app.use('/api', createProxyMiddleware({
    target: TARGET,
    router(req) {
        if (
            req.path === '/v0/discovered' ||
            req.path === '/v0/discovery-sse' ||
            req.path === '/v0/discovery-ping'
        ) {
            return DISCOVERY_TARGET;
        }
        return TARGET;
    },
    changeOrigin: true,
    ws: false,
    pathRewrite: { '^/api': '' },
    onError(err, req, res) {
        if (res.headersSent) return;
        res.status(502).json({
            error: 'Upstream unavailable',
            target: req.path === '/v0/discovered' || req.path === '/v0/discovery-sse' || req.path === '/v0/discovery-ping'
                ? DISCOVERY_TARGET
                : TARGET,
            path: req.originalUrl,
            details: err.message
        });
    }
}));

app.use(express.static(ROOT_DIR));

app.get('*', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Dashboard available at http://localhost:${PORT}`);
    console.log(`Proxying /api/* to ${TARGET}`);
    console.log(`Proxying discovery endpoints to ${DISCOVERY_TARGET}`);
});
