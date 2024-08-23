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
 *
 * If you want to disable language [auto detection](https://highlightjs.org/usage/)
 * feature of hljs, change `auto_detection` flag as `false`. With this option
 * turned off, `showdown-highlight` will not process any codeblocks with no
 * language specified.
 *
 * ```js
 * let converter = new showdown.Converter({
 *     extensions: [showdownHighlight({ auto_detection: false })]
 * })
 * ```
 *
 * @name showdownHighlight
 * @function
 */
module.exports = function showdownHighlight({ pre = false, auto_detection = true } = {}) {
    const filter = (text, converter, options) => {
        const params = {
            left: "<pre><code\\b[^>]*>"
          , right: "</code></pre>"
          , flags: "g"
        }

        const replacement = (wholeMatch, match, left, right) => {
            match = decodeHtml(match)

            let lang = (left.match(/class=\"([^ \"]+)/) || [])[1]

            if (!lang && !auto_detection) {
                return wholeMatch
            } else if (lang && lang.indexOf(',') > 0) {
                // ensure to strip any code block annotation after language
                const langNoAnnotation = lang.slice(0, lang.indexOf(','));
                left = left.replace(new RegExp(lang, 'g'), langNoAnnotation);
                lang = langNoAnnotation;
            }

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
