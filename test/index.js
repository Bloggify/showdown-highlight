"use strict";

const tester = require("tester")
    , showdownHighlight = require("..")
    , showdown = require('showdown')
    ;

tester.describe("showdown-highlight", t => {
    t.should("A Showdown extension for highlight the code blocks.", () => {
        // After requiring the module, use it as extension
        let converter = new showdown.Converter({
            extensions: [showdownHighlight]
        });

        // Now you can Highlight code blocks
        let html = converter.makeHtml(`
\`\`\`js
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\`
        `);

        t.expect(html.includes("hljs-string")).toEqual(true);
    });
});
