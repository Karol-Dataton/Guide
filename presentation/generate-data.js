#!/usr/bin/env node
/**
 * generate-data.js
 * Exports the full git graph of this repository as a JSON snapshot.
 * Run from anywhere inside the repo:
 *   node presentation/generate-data.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(__dirname, 'git-data.json');

const SEP = '||';

function git(cmd) {
    return execSync(`git ${cmd}`, { cwd: REPO_ROOT, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }).trim();
}

// ── Commits ──────────────────────────────────────────────────────────

const logFormat = ['%h', '%p', '%an', '%ad', '%s', '%D'].join(SEP);
const rawLog = git(`log --all --topo-order --date=short --format="${logFormat}"`);

const commits = rawLog.split('\n').filter(Boolean).map(line => {
    const [hash, parentStr, author, date, message, refStr] = line.split(SEP);
    const parents = parentStr ? parentStr.split(' ').filter(Boolean) : [];
    const refs = refStr
        ? refStr.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    return { hash, parents, author, date, message, refs };
});

// ── Branches ─────────────────────────────────────────────────────────

const branchLines = git('branch -a --format="%(refname:short) %(objectname:short)"');
const branches = branchLines.split('\n').filter(Boolean).map(line => {
    const parts = line.split(' ');
    const tip = parts.pop();
    const name = parts.join(' ');
    const remote = name.startsWith('origin/');
    return { name, tip, remote };
});

// ── Tags ─────────────────────────────────────────────────────────────

let tags = [];
try {
    const tagLines = git('tag -l --format="%(refname:short) %(objectname:short)"');
    if (tagLines) {
        tags = tagLines.split('\n').filter(Boolean).map(line => {
            const parts = line.split(' ');
            const tip = parts.pop();
            const name = parts.join(' ');
            return { name, tip };
        });
    }
} catch (e) {
    // no tags is fine
}

// ── Write ────────────────────────────────────────────────────────────

const data = {
    commits,
    branches,
    tags,
    generated: new Date().toISOString(),
    repoName: path.basename(REPO_ROOT)
};

fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Wrote ${commits.length} commits, ${branches.length} branches, ${tags.length} tags`);
console.log(`  -> ${OUT_FILE}`);
