"use strict";

const decodeHtml = require("html-encoder-decoder").decode
    , showdown = require("showdown")
    , hljs = require("highlight.js")
    ;

module.exports = function showdownHighlight () {
    return [
        {
            type: "output"
          , filter (text, converter, options) {
                let left  = "<pre><code\\b[^>]*>"
                  , right = "</code></pre>"
                  , flags = "g"
                  , replacement = (wholeMatch, match, left, right) => {
                        match = decodeHtml(match);
                        let lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
                        left = left.slice(0, 18) + 'hljs ' + left.slice(18);
                        if (lang) {
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
