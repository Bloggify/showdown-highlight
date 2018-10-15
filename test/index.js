"use strict";

const tester = require("tester")
    , showdownHighlight = require("..")
    , showdown = require('showdown')
    ;

tester.describe("showdown-highlight", t => {
    // After requiring the module, use it as extension
    let converter = new showdown.Converter({
        extensions: [showdownHighlight]
    });

    t.should("A Showdown extension for highlight the code blocks.", () => {
        // Now you can Highlight code blocks
        let html = converter.makeHtml(`
\`\`\`js
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\`
        `);

        t.expect(html.includes('class="hljs js language-js"')).toEqual(true);
        t.expect(html.includes("hljs-string")).toEqual(true);
    });

    t.should("work without code block language", () => {
        // Now you can Highlight code blocks
        let html = converter.makeHtml(`
\`\`\`
function sayHello (msg, who) {
  return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\`
        `);

        t.expect(html.includes('class="hljs"')).toEqual(true);
    });
});
