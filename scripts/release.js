const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function getCurrentVersion() {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
}

function updatePackageJson(newVersion) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
    console.log(`Updated package.json to version ${newVersion}`);
}

function updateChangelog(newVersion) {
    const date = new Date().toISOString().split('T')[0];
    const header = `## [${newVersion}] - ${date}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n`;

    let content = '';
    if (fs.existsSync(changelogPath)) {
        content = fs.readFileSync(changelogPath, 'utf8');
    }

    fs.writeFileSync(changelogPath, header + content);
    console.log(`Updated CHANGELOG.md for version ${newVersion}`);
}

async function run() {
    console.log('--- WATCHOUT Wiki Release Script ---');

    // Ensure clean working directory
    try {
        const status = execSync('git status --porcelain').toString();
        if (status.trim() !== '') {
            console.error('Error: Git working directory is not clean. Please commit or stash changes.');
            process.exit(1);
        }
    } catch (e) {
        console.error('Error checking git status:', e.message);
        process.exit(1);
    }

    const currentVersion = getCurrentVersion();
    console.log(`Current version: ${currentVersion}`);

    const [major, minor, patch] = currentVersion.split('.').map(Number);

    console.log('Select release type:');
    console.log(`1. Patch (${major}.${minor}.${patch + 1})`);
    console.log(`2. Minor (${major}.${minor + 1}.0)`);
    console.log(`3. Major (${major + 1}.0.0)`);

    const choice = await askQuestion('Enter choice (1-3): ');

    let newVersion;
    if (choice === '1') newVersion = `${major}.${minor}.${patch + 1}`;
    else if (choice === '2') newVersion = `${major}.${minor + 1}.0`;
    else if (choice === '3') newVersion = `${major + 1}.0.0`;
    else {
        console.error('Invalid choice');
        rl.close();
        process.exit(1);
    }

    console.log(`\nPreparing release ${newVersion}...`);

    // confirm
    const confirm = await askQuestion(`Are you sure you want to release ${newVersion}? (y/n): `);
    if (confirm.toLowerCase() !== 'y') {
        console.log('Aborted.');
        rl.close();
        process.exit(0);
    }

    // 1. Update package.json
    updatePackageJson(newVersion);

    // 2. Update CHANGELOG.md
    updateChangelog(newVersion);

    console.log('\nPlease update CHANGELOG.md with release details now.');
    await askQuestion('Press Enter when changelog is updated...');

    // 3. Commit and Tag
    try {
        console.log('Committing changes...');
        execSync(`git add package.json CHANGELOG.md`);
        execSync(`git commit -m "chore(release): ${newVersion}"`);

        console.log('Creating tag...');
        execSync(`git tag -a v${newVersion} -m "Release ${newVersion}"`);

        console.log('\nRelease created successfully!');
        console.log(`Don't forget to push changes: git push && git push origin v${newVersion}`);
    } catch (e) {
        console.error('Error during git operations:', e.message);
        process.exit(1);
    }

    rl.close();
}

run();
