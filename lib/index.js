"use strict"

const decodeHtml = require("html-encoder-decoder").decode
    , showdown = require("showdown")
    , hljs = require("highlight.js")
    , classAttr = 'class="'

/**
 * showdownHighlight
 * Highlight the code in the showdown input.
 *
 * Examples:
 *
 * ```js
 * let converter = new showdown.Converter({
 *     extensions: [showdownHighlight]
 * })
 * ```
 *
 * Enable the classes in the `<pre>` element:
 *
 * ```js
 * let converter = new showdown.Converter({
 *     extensions: [showdownHighlight({ pre: true })]
 * })
 * ```
 *
 * @name showdownHighlight
 * @function
 */
module.exports = function showdownHighlight({ pre = false } = {}) {
    const filter = (text, converter, options) => {
        const params = {
            left: "<pre><code\\b[^>]*>"
          , right: "</code></pre>"
          , flags: "g"
        }

        const replacement = (wholeMatch, match, left, right) => {
            match = decodeHtml(match)

            const lang = (left.match(/class=\"([^ \"]+)/) || [])[1]

            if (left.includes(classAttr)) {
                const attrIndex = left.indexOf(classAttr) + classAttr.length
                left = left.slice(0, attrIndex) + 'hljs ' + left.slice(attrIndex)
            } else {
                left = left.slice(0, -1) + ' class="hljs">'
            }

            if (pre && lang) {
                left = left.replace('<pre>', `<pre class="${lang} language-${lang}">`)
            }

            if (lang && hljs.getLanguage(lang)) {
                return left + hljs.highlight(match, { language: lang }).value + right
            }

            return left + hljs.highlightAuto(match).value + right
        }

        return showdown.helper.replaceRecursiveRegExp(
            text,
            replacement,
            params.left,
            params.right,
            params.flags
        )
    }

    return [
        {
            type: "output"
          , filter
        }
    ]
}
