"use strict";

const tester = require("tester")
    , showdownHighlight = require("..")
    , showdown = require('showdown')
    ;

tester.describe("showdown-highlight", t => {
    const CODEBLOCK_WITH_LANGUAGE = `
\`\`\`js
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");

\`\`\``
    const CODEBLOCK_WITHOUT_LANGUAGE = `
\`\`\`
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\``

    // After requiring the module, use it as extension
    const converter = new showdown.Converter({
        extensions: [showdownHighlight]
    });

    t.should("A Showdown extension for highlight the code blocks.", () => {
        // Now you can Highlight code blocks
        let html = converter.makeHtml(CODEBLOCK_WITH_LANGUAGE);

        t.expect(html.includes('class="hljs js language-js"')).toEqual(true);
        t.expect(html.includes("hljs-string")).toEqual(true);
    });

    t.should("work without code block language", () => {
        // Now you can Highlight code blocks
        let html = converter.makeHtml(CODEBLOCK_WITHOUT_LANGUAGE);

        t.expect(html.includes('class="hljs"')).toEqual(true);
    });

    const converter_auto_disabled = new showdown.Converter({
        extensions: [showdownHighlight({
            auto_detection: false
        })]
    })
    const converter_auto_disabled_with_pre = new showdown.Converter({
        extensions: [showdownHighlight({
                auto_detection: false
            ,   pre: true
        })]
    })

    t.should("process code block with language, when auto_detect disabled", () => {
        t.expect(converter_auto_disabled
            .makeHtml(CODEBLOCK_WITH_LANGUAGE)
            .includes('class="hljs js language-js"'))
            .toEqual(true);
        t.expect(converter_auto_disabled_with_pre
            .makeHtml(CODEBLOCK_WITH_LANGUAGE)
            .includes('class="hljs js language-js"'))
            .toEqual(true);
    })

    t.should("not process code block with no language, when auto_detect disabled", () => {
        t.expect(converter_auto_disabled
            .makeHtml(CODEBLOCK_WITHOUT_LANGUAGE)
            .includes('hljs'))
            .toEqual(false)
        t.expect(converter_auto_disabled_with_pre
            .makeHtml(CODEBLOCK_WITHOUT_LANGUAGE)
            .includes('hljs'))
            .toEqual(false)
    })
});
