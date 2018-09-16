---
categories:
- "Code"
comments: true
date: 2017-07-01T06:46:13-06:00
description: "JSX looks like markup in your JavaScript.  It's not, and here's how the transform works."
draft: false
image: "https://i.imgur.com/UWueuSX.jpg"
layout: post
metaKeywords: "jsx transform, markup in js, react jsx, react without jsx"
tags:
- "js"
- "react"
title: "How the JSX Transform Works"
---

JSX looks like markup in your JavaScript.  It's not, and here's how the transform works.

<!--more-->

## JSX Output

JSX is a superset of JS that allows you to write what looks like markup in your JavaScript code.  It's often used for UI coding, because it looks like you can define HTML UIs, such as in React:

```js
import React from 'react'
const SomeUi = _ =>
  <div>
    <h1>Yay, JSX!</h1>
  </div>
```

## Not HTML

But JSX is not runnable inside today's browsers.  It must be compiled into JavaScript that the browser understands.  And that's great, because JSX was never intended to be HTML.  It just has the familiar look of markup for creating UIs.

In React's case, the library uses a virtual DOM to create an in-memory representation of the DOM, or what the document will look like in the browser.  To create these virtual DOM elements, react has a [`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement) function that it calls.

## JSX Transformation

You can use many tools to compile your JavaScript.  A popular choice is [Babel](http://babeljs.io/).  There is a transform in Babel, called [`babel-plugin-transform-react-jsx`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx) that does the JSX transform.

#### Tag Name and Strings

When run it on JSX code, it'll transform this:

```js
<h1>Yay!</h1>
```

Into this:

```js
React.createElement('h1', null, 'Yay!')
```

JSX turns into plain JavaScript function calls.

#### Attributes

Markup attributes are also turned into props objects, from this:

```js
<h1 className="wowzers">Yay!</h1>
```

Into this:

```js
React.createElement('h1', { className: 'wowzers' }, 'Yay!')
```

#### Nested Tags

And nested children are turned from this:

```js
<div>
  <h1>Yay!</h1>
</div>
```

Into this:

```js
React.createElement('div', null,
  React.createElement('h1', null, 'Yay!')
)
```

These are the functions that React uses to build up the virtual DOM.

## JSX Pragma

How does the plugin know what to transform the JSX into?  It needs a *pragma*, or directive on how the compiler should treat the file.  The default pragma for this babel plugin is `React.createElement`, which means that all JSX will turn into calls to this function.  

This is why, if you forget to `import React from 'react'`, you'll get something like:

```
Uncaught ReferenceError: React is not defined
```

## Custom Pragma

If you're not using React, but you'd still like a JSX transform on your source files, you can use your own pragma.  Let's say instead of React, you were using a UI library called Wakt, and it had a `createElement` function.  You would need to pass an option to engage this custom behavior to the babel plugin via your `.babelrc` file:

```json
{
  "plugins": [
    ["transform-react-jsx", { "pragma": "wakt.createElement" }]
  ]
}
```

Now, when compiled, this (imports included for clarity):

```js
import wakt from 'wakt'

<h1>Yay!</h1>
```

Will be transformed into this:

```js
import wakt from 'wakt'

wakt.createElement('h1', null, 'Yay!')
```

What are some other cool facts about the JSX transform that you've learned?  Or what other applications for it have you found for it?
