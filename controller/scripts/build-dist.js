const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'dist');
const assets = ['index.html', 'app.js', 'styles.css', 'FuturaNowHeadline-Rg.otf'];

const targets = [
    {
        label: 'macos-x64',
        pkgTarget: 'node18-macos-x64',
        outputDir: path.join(distRoot, 'macos'),
        binaryName: 'watchout-controller'
    },
    {
        label: 'win-x64',
        pkgTarget: 'node18-win-x64',
        outputDir: path.join(distRoot, 'windows'),
        binaryName: 'watchout-controller.exe'
    }
];

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function copyAssets(destDir) {
    assets.forEach((name) => {
        const src = path.join(projectRoot, name);
        const dest = path.join(destDir, name);
        fs.copyFileSync(src, dest);
    });
}

function runPkg(target) {
    ensureDir(target.outputDir);
    const outputPath = path.join(target.outputDir, target.binaryName);
    const args = [
        'proxy-server.js',
        '--targets',
        target.pkgTarget,
        '--output',
        outputPath
    ];
    const result = spawnSync('npx', ['pkg', ...args], {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32'
    });
    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
    copyAssets(target.outputDir);
}

ensureDir(distRoot);
targets.forEach(runPkg);

console.log('Dist build complete.');
targets.forEach((target) => {
    console.log(`- ${target.label}: ${target.outputDir}`);
});
