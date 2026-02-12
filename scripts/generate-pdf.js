#!/usr/bin/env node
/**
 * WATCHOUT Wiki PDF Generator
 * 
 * Combines all markdown files from /content into a single PDF document
 * using Pandoc.
 * 
 * Prerequisites:
 *   - pandoc (brew install pandoc)
 *   - basictex or mactex (brew install --cask basictex)
 * 
 * Usage: node scripts/generate-pdf.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const OUTPUT_DIR = path.join(__dirname, '..');
const COMBINED_MD = path.join(OUTPUT_DIR, 'combined-guide.md');
const OUTPUT_PDF = path.join(OUTPUT_DIR, 'WATCHOUT-7-User-Guide.pdf');

/**
 * Get all markdown files in order
 */
function getMarkdownFiles(dir) {
    const files = [];

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Sort entries by name to maintain order
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively get files from subdirectories
            files.push(...getMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Process frontmatter and clean up markdown
 */
function processMarkdown(content, filePath) {
    // Remove YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (frontmatterMatch) {
        content = content.slice(frontmatterMatch[0].length);
    }

    // Convert custom info/warning boxes to blockquotes (using text for LaTeX compatibility)
    content = content.replace(/:::info\n([\s\S]*?)\n:::/g, '> **Note:** $1');
    content = content.replace(/:::warning\n([\s\S]*?)\n:::/g, '> **Warning:** $1');
    content = content.replace(/:::tip\n([\s\S]*?)\n:::/g, '> **Tip:** $1');

    // Replace special characters not supported by Helvetica
    content = content.replace(/→/g, '->');
    content = content.replace(/←/g, '<-');
    content = content.replace(/★/g, '*');
    content = content.replace(/☆/g, 'o');
    content = content.replace(/✓/g, '[x]');
    content = content.replace(/✗/g, '[ ]');

    // Fix image paths (make them relative to wiki directory)
    content = content.replace(/!\[(.*?)\]\((?!http)(.*?)\)/g, (match, alt, src) => {
        // Adjust path relative to content directory
        const relativePath = path.relative(
            CONTENT_DIR,
            path.resolve(path.dirname(filePath), src)
        );
        return `![${alt}](content/${relativePath})`;
    });

    return content;
}

/**
 * Get chapter title from directory name
 */
function getChapterTitle(dirName) {
    // Remove number prefix (e.g., "01-getting-started" -> "Getting Started")
    return dirName
        .replace(/^\d+-/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Main function
 */
function generatePDF() {
    console.log('WATCHOUT Wiki PDF Generator');
    console.log('===========================\n');

    // Check if pandoc is available
    try {
        execSync('pandoc --version', { stdio: 'pipe' });
    } catch (e) {
        console.error('Error: pandoc is not installed.');
        console.error('Install it with: brew install pandoc');
        process.exit(1);
    }

    // Check if pdflatex is available
    try {
        execSync('which pdflatex', { stdio: 'pipe' });
    } catch (e) {
        console.error('Error: pdflatex is not installed.');
        console.error('Install it with: brew install --cask basictex');
        console.error('Then restart your terminal or run: eval "$(/usr/libexec/path_helper)"');
        process.exit(1);
    }

    console.log('Collecting markdown files...');

    // Get all markdown files
    const mdFiles = getMarkdownFiles(CONTENT_DIR);
    console.log(`Found ${mdFiles.length} markdown files\n`);

    // Combine all markdown files
    let combinedContent = '';
    let currentChapter = '';

    // Add title page
    combinedContent += `---
title: "WATCHOUT 7 User Guide"
subtitle: "Complete Documentation for Dataton WATCHOUT"
author: "Dataton"
date: "${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}"
titlepage: true
titlepage-color: "1a1a2e"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "00d4ff"
toc: true
toc-title: "Table of Contents"
toc-depth: 3
numbersections: true
geometry: margin=1in
fontsize: 11pt
linestretch: 1.25
links-as-notes: true
---

\\newpage

`;

    for (const filePath of mdFiles) {
        const relativePath = path.relative(CONTENT_DIR, filePath);
        const dirName = path.dirname(relativePath);
        const fileName = path.basename(filePath);

        // Check if we're entering a new chapter
        const chapterDir = relativePath.split(path.sep)[0];
        if (chapterDir !== currentChapter && chapterDir !== '.') {
            currentChapter = chapterDir;
            const chapterTitle = getChapterTitle(chapterDir);
            console.log(`  Chapter: ${chapterTitle}`);
        }

        // Skip _index.md files or incorporate them as chapter intros
        if (fileName === '_index.md') {
            const content = fs.readFileSync(filePath, 'utf-8');
            const processed = processMarkdown(content, filePath);
            if (processed.trim()) {
                combinedContent += processed + '\n\n';
            }
            continue;
        }

        // Read and process the file
        const content = fs.readFileSync(filePath, 'utf-8');
        const processed = processMarkdown(content, filePath);

        combinedContent += processed + '\n\n\\newpage\n\n';

        console.log(`    - ${fileName}`);
    }

    // Write combined markdown
    fs.writeFileSync(COMBINED_MD, combinedContent);
    console.log(`\nCombined markdown written to: ${path.basename(COMBINED_MD)}`);

    // Generate PDF using Pandoc
    console.log('\nGenerating PDF with Pandoc...');

    try {
        const pandocCmd = `pandoc "${COMBINED_MD}" -o "${OUTPUT_PDF}" --pdf-engine=xelatex --toc --toc-depth=3 -V geometry:margin=1in -V fontsize=11pt -V documentclass=report -V mainfont="Futura Now Text"`;

        execSync(pandocCmd, {
            cwd: OUTPUT_DIR,
            stdio: 'inherit',
            env: {
                ...process.env,
                PATH: `/Library/TeX/texbin:${process.env.PATH}`
            }
        });

        console.log(`\n✅ PDF generated successfully: ${path.basename(OUTPUT_PDF)}`);
        console.log(`   Location: ${OUTPUT_PDF}`);

        // Get file size
        const stats = fs.statSync(OUTPUT_PDF);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`   Size: ${sizeMB} MB`);

    } catch (e) {
        console.error('\n❌ Error generating PDF:', e.message);
        console.error('\nThe combined markdown file has been saved.');
        console.error('You can try running pandoc manually:');
        console.error(`  cd ${OUTPUT_DIR}`);
        console.error(`  pandoc combined-guide.md -o output.pdf --pdf-engine=xelatex`);
        process.exit(1);
    }

    // Optionally clean up combined markdown
    // fs.unlinkSync(COMBINED_MD);

    console.log('\nDone!');
}

// Run the generator
generatePDF();
