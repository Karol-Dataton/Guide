
const assert = require('assert');

function testMarkdownToHtml(markdown) {
    let html = markdown;
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+?)(\s*\[.*\])?$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    return html;
}

function testParseIndexGroups(line) {
    const headingMatch = line.match(/^###\s+(.+)$/);
    if (headingMatch) {
        let groupName = headingMatch[1].trim();
        const overrideMatch = groupName.match(/^(.+?)\s*\[(.+)\]$/);
        if (overrideMatch) {
            return overrideMatch[2].trim();
        }
        return groupName;
    }
    return null;
}

console.log('Testing markdownToHtml regex...');
assert.strictEqual(testMarkdownToHtml('### Title [Override]'), '<h3>Title</h3>');
assert.strictEqual(testMarkdownToHtml('### Title'), '<h3>Title</h3>');
assert.strictEqual(testMarkdownToHtml('### Title with [brackets] inside'), '<h3>Title with [brackets] inside</h3>');
console.log('markdownToHtml regex passed.');

console.log('Testing parseIndexGroups logic...');
assert.strictEqual(testParseIndexGroups('### Title [Override]'), 'Override');
assert.strictEqual(testParseIndexGroups('### Title'), 'Title');
assert.strictEqual(testParseIndexGroups('### Title with [brackets] inside'), 'Title with [brackets] inside');
console.log('parseIndexGroups logic passed.');
