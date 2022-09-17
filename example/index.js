"use strict";

const showdown = require('showdown')
    , showdownHighlight = require("../lib")
    ;

// After requiring the module, use it as extension
let converter = new showdown.Converter({
    // That's it
    extensions: [showdownHighlight({
        // Whether to add the classes to the <pre> tag, default is false
        pre: true
        // Whether to use hljs' auto language detection, default is true
    ,   auto_detect: true
    })]
});

// Now you can Highlight code blocks
let html = converter.makeHtml(`
## Highlighting Code with Showdown

Below we have a piece of JavaScript code:

\`\`\`js
function sayHello (msg, who) {
    return \`\${who} says: msg\`;
}
sayHello("Hello World", "Johnny");
\`\`\`
`);

console.log(html);
// <h2 id="highlightingcodewithshowdown">Highlighting Code with Showdown</h2>
//
// <p>Below we have a piece of JavaScript code:</p>
//
// <pre><code class="js language-js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span> (<span class="hljs-params">msg, who</span>) </span>{
//     <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${who}</span> says: msg`</span>;
// }
// sayHello(<span class="hljs-string">"Hello World"</span>, <span class="hljs-string">"Johnny"</span>);
// </code></pre>
