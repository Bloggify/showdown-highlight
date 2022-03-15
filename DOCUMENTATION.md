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

