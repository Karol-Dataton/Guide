#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceContent = path.join(root, 'content');
const polishContent = path.join(root, 'content-pl');
const polishRoot = path.join(root, 'pl');

const args = new Set(process.argv.slice(2));
const prepareOnly = args.has('--prepare');
const syncOnly = args.has('--sync');

function ensurePolishContent() {
    if (fs.existsSync(polishContent)) {
        console.log('content-pl already exists.');
        return;
    }

    if (!fs.existsSync(sourceContent)) {
        throw new Error('Source content directory is missing: content/');
    }

    fs.cpSync(sourceContent, polishContent, { recursive: true });
    console.log('Created content-pl from content as translation baseline.');
}

function copyRecursive(source, target) {
    if (!fs.existsSync(source)) return;
    fs.cpSync(source, target, { recursive: true, force: true });
}

function syncPolishAssets() {
    fs.mkdirSync(polishRoot, { recursive: true });

    const filesToCopy = [
        'app.js',
        'config.js',
        'styles.css',
        'styles-badges.css',
        'cie_1931_chromaticity_diagram.png'
    ];

    filesToCopy.forEach((file) => {
        const src = path.join(root, file);
        const dst = path.join(polishRoot, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dst);
        }
    });

    // Copy Jost font for Polish locale and patch styles.css to use it
    const jostSrc = path.join(root, 'Jost-VariableFont_wght.ttf');
    if (fs.existsSync(jostSrc)) {
        const plFontsDir = path.join(polishRoot, 'fonts');
        fs.mkdirSync(plFontsDir, { recursive: true });
        fs.copyFileSync(jostSrc, path.join(plFontsDir, 'Jost-VariableFont_wght.ttf'));
        console.log('Copied Jost font to pl/fonts/');

        // Patch pl/styles.css to use Jost instead of Futura Now Headline
        const plStylesPath = path.join(polishRoot, 'styles.css');
        if (fs.existsSync(plStylesPath)) {
            let css = fs.readFileSync(plStylesPath, 'utf8');
            css = css.replace(
                /@font-face\s*\{[^}]*font-family:\s*'Futura Now Headline'[^}]*\}/,
                `@font-face {\n    font-family: 'Jost';\n    src: url('fonts/Jost-VariableFont_wght.ttf') format('truetype');\n    font-weight: 100 900;\n    font-style: normal;\n}`
            );
            css = css.replace(/'Futura Now Headline'/g, "'Jost'");
            fs.writeFileSync(plStylesPath, css);
            console.log('Patched pl/styles.css to use Jost font.');
        }
    } else {
        console.warn('Jost font not found at root, skipping font patch for Polish locale.');
    }

    copyRecursive(path.join(root, 'media'), path.join(polishRoot, 'media'));
    copyRecursive(path.join(root, 'widgets'), path.join(polishRoot, 'widgets'));

    const enIndexPath = path.join(root, 'index.html');
    const plIndexPath = path.join(polishRoot, 'index.html');
    if (!fs.existsSync(enIndexPath)) {
        console.warn('Skipping pl/index.html generation, source index.html not found.');
        return;
    }

    let html = fs.readFileSync(enIndexPath, 'utf8');

    html = html.replace('<html lang="en">', '<html lang="pl">');
    html = html.replace(/WATCHPAX 64 User Guide/g, 'Przewodnik użytkownika WATCHPAX 64');
    html = html.replace(/Complete documentation for Dataton WATCHPAX 64 media server\.?/g, 'Dokumentacja serwera multimedialnego Dataton WATCHPAX 64.');
    html = html.replace('Search documentation...', 'Szukaj w dokumentacji...');
    html = html.replace('<span class="breadcrumb-item">Home</span>', '<span class="breadcrumb-item">Strona główna</span>');
    html = html.replace('<h1>Przewodnik użytkownika WATCHPAX 64</h1>', '<h1>Przewodnik użytkownika WATCHPAX 64</h1>');
    html = html.replace('<h2>All Sections</h2>', '<h2>Wszystkie sekcje</h2>');

    const footerDate = new Date().toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
    html = html.replace(
        /<p>(WATCHPAX 64 User Guide|Przewodnik użytkownika WATCHPAX 64|Przewodnik uzytkownika WATCHPAX 64) • (Dataton Documentation|Dokumentacja Dataton) • (Generated|Wygenerowano) .*?<\/p>/,
        `<p>Przewodnik użytkownika WATCHPAX 64 • Dokumentacja Dataton • Wygenerowano ${footerDate}</p>`
    );

    html = html.replace('href="pl/index.html" title="Switch language">PL</a>', 'href="../index.html" title="Przełącz język">EN</a>');

    fs.writeFileSync(plIndexPath, html);
    console.log('Generated pl/index.html and synced locale assets.');
}

function run() {
    if (syncOnly) {
        syncPolishAssets();
        return;
    }

    if (prepareOnly) {
        ensurePolishContent();
        return;
    }

    ensurePolishContent();
    syncPolishAssets();
}

run();
