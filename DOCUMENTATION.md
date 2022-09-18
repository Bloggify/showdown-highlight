## Documentation

You can see below the API reference of this module.

### `showdownHighlight()`
Highlight the code in the showdown input.

Examples:

```js
let converter = new showdown.Converter({
    extensions: [showdownHighlight]
})
```

Enable the classes in the `<pre>` element:

```js
let converter = new showdown.Converter({
    extensions: [showdownHighlight({ pre: true })]
})
```

If you want to disable language [auto detection](https://highlightjs.org/usage/)
feature of hljs, change `auto_detection` flag as `false`. With this option
turned off, `showdown-highlight` will not process any codeblocks with no
language specified.

```js
let converter = new showdown.Converter({
    extensions: [showdownHighlight({ auto_detection: false })]
})
```

