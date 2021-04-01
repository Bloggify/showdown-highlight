"use strict";

const decodeHtml = require("html-encoder-decoder").decode
  , showdown = require("showdown")
  , hljs = require("highlight.js")
  , classAttr = 'class="'
  ;

module.exports = function showdownHighlight({ pre = false }) {
  return [
    {
      type: "output"
      , filter(text, converter, options) {
        let left = "<pre><code\\b[^>]*>"
          , right = "</code></pre>"
          , flags = "g"
          , replacement = (wholeMatch, match, left, right) => {
            match = decodeHtml(match);
            let lang = (left.match(/class=\"([^ \"]+)/) || [])[1];

            if (left.includes(classAttr)) {
              let attrIndex = left.indexOf(classAttr) + classAttr.length;
              left = left.slice(0, attrIndex) + 'hljs ' + left.slice(attrIndex);
            } else {
              left = left.slice(0, -1) + ' class="hljs">';
            }

            if (pre && lang) {
              left = left.replace('<pre>', `<pre class="${lang} language-${lang}">`);
            }

            if (lang && hljs.getLanguage(lang)) {
              return left + hljs.highlight(lang, match).value + right;
            } else {
              return left + hljs.highlightAuto(match).value + right;
            }
          }
          ;

        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
};
