---
categories:
- "Code"
comments: true
date: 2017-06-27T07:00:43-06:00
description: "Learn the syntax to export in these two styles in Node.js."
draft: false
image: "https://i.imgur.com/1arT8Ho.jpg"
layout: post
metaKeywords: "module.exports mixed with exports, multiple export types, node, nodejs"
tags:
- "js"
- "nodejs"
title: "Mixing module.exports with exports"
---

Learn the syntax to export in these two styles in Node.js.

<!--more-->

## Single Export

`module.exports` is the export style for a single export in a module.  If you want to be able to require, alias, and use a single thing from a module, you would use this style.  You would have `a-module.js` like:

```js
module.exports = () => { /* ... */ }
```

Which would be usable like:

```js
const aModule = require('./a-module')
aModule()
```

This style is nice because you can immediately invoke the function by the variable name that you've assigned it to on import.

## Multiple Named Exports

For multiple, named exports, the `exports` style is usable.  In `a-module.js`, you would export like:

```js
exports.aName = () => { /* ... */ }
exports.anotherName = () => { /* ... */ }
```

And use like:

```js
const aModule = require('./a-module')
aModule.aName()
aModule.anotherName()
```

You could also destructure your import with:

```js
const { aName, anotherName } = require('./a-module')
aName()
anotherName()
```

This style of export is nice because you can provide multiple things in a single module, each identified by some name in that collection.

## Export Multiple with an Object

To get multiple exports another way, you could group them together in a single object and export that.  To export a single thing, we're using `module.exports` again:

```js
module.exports = { 
  aName: () => { /* ... */ }
  anotherName: () => { /* ... */ }
}
```

In commonjs, this is used just as the multiple named exports above:

```js
const { aName, anotherName } = require('./a-module')
aName()
anotherName()
```

## Mix of Export Styles

Finally, if you would like to have something exported in a single export style and then have multiple, named exports dangling off it, you might define that module like this:


```js
module.exports = () => {}
module.exports.aName = () => {}
```

Which would then be usable like this:

```js
const aModule = require('./a-module')
aModule()
aModule.aName()
```

This style allows you to mix both export styles together in a single module.

Those mixtures all form quite the brew, eh?  What other strange mixture of exports do you find useful?
