
function markdownToHtml(markdown) {
    let html = markdown;

    // Bold and italic
    // Bold *** -> <strong><em>
    html = html.replace(/\*\*\*([\s\S]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold ** -> <strong>
    html = html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
    // For italics
    html = html.replace(/(?<!\*)\*([^\*\n]+?)\*(?!\*)/g, '<em>$1</em>');

    return html;
}

const input = `**Zoom Controls.** The bottom bar provides zoom in, zoom out, and zoom-to-fit buttons. You can also use **Numpad +** and **Numpad −** to zoom in and out, or **Numpad *** to zoom to fit the entire timeline in the visible area. The zoom level is remembered independently for each timeline.`;
const input2 = `- **Numpad *** — zoom to fit the entire timeline in the visible area`;

console.log("Input 1 result:");
console.log(markdownToHtml(input));
console.log("\nInput 2 result:");
console.log(markdownToHtml(input2));
