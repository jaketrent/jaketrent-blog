---
categories:
- "Code"
comments: true
date: 2017-06-10T06:54:54-06:00
description: "Styling children elements in styled-jsx is not ideal.  Here's one way."
draft: false
image: "https://i.imgur.com/Tidhkd9.jpg"
layout: post
metaKeywords: "styled-jsx, nextjs, style children, style children elements, zeit"
tags:
- "css"
- "nextjs"
- "react"
title: "Style Children in styled-jsx"
---

Styling children elements in styled-jsx doesn't have an ideal solution.  Here's one way.

<!--more-->

## What is styled-jsx?

[styled-jsx](https://github.com/zeit/styled-jsx) is a library to support CSS-in-JS.  It was developed by [Zeit](https://zeit.co) for use in their awesome [Next.js](https://github.com/zeit/next.js/) (React) apps.

One of its great benefits is that it provides isolation of styles between UI components.

## How it works

When a Next.js app renders, React elements are rendered to the DOM with a data attribute identifying it.  For example:

```html
<div class="merry" data-jsx="1075344175"></div>
```

The selector `.merry` for that component is defined next to the compoent markup:

```js
export default props =>
  <div className="merry">
    <style>{`
      .merry { color: red; background: green; }
    `}</style>
  </div>
```

That `data-jsx` identifier is then built into the resulting CSS output so that when it is rendered on the served html page it looks like:

```css
.merry[data-jsx="1075344175"] {
  color: red; background: green;
}
```

These styles are isolated and internal to the component.  It's great... until you want to override it from a parent component.

## Allow Overriding className

One easy method for overriding a `className` is to allow passing it in on `props`.  A `parent.js` component might look like this:

```js
import Merry from './merry'

export default props =>
  <div>
    <Merry className="merry--override" />
    <style>{`
      .merry--override { color: yellow; }
    `}</style>
  </div>
```

And that might be handled simply in the `merry.js` component with:

```js
<div className={`${props.className ? props.className + ' ' : ''}merry`}>
```

## Problem with Passing styled-jsx

But now the strength of styled-jsx is a weakness that we have to work around.  Remember that each of these selectors, including the `parent.js` style, is getting namespaced with the markup's data attribute identifier.  Thus we might be setting the `class` attribute on the `merry.js` output ok:

```html
<div class="merry--override merry" data-jsx="1075344175"></div>
```

But the output CSS is something like this:

```
.merry[data-jsx="1075344175"] {
  color: red; background: green;
}
.merry--override[data-jsx="9483212348"] {
  color: yellow;
}
```

Given this output, the selector that should override to the color of `yellow` won't be applied because of the `[data-jsx="9483212348"]` isolation.  This is the weakness with coupling the CSS selector to the markup structure.  Hashing the selector itself wouldn't have this problem.

You can remove this isolation by making a selector global.  In `parent.js`, we can define the style like this:

```js
:global(.merry--override) { color: yellow; }
```

That will drop the data attribute from the output CSS:

```css
.merry[data-jsx="1075344175"] {
  color: red; background: green;
}
.merry--override {
  color: yellow;
}
```

A problem still remains, however, and that is the problem of CSS specificity rules.  Both selectors now apply to the `.merry` element, but the selector with the data attribute is a more specific selector.  Thus, the original selector wins and the color remains `red`.

## The Solution is to Make it All Global

Global variables are the best, right?  Only good things can happen here.  Eghhh...

Anyway, if you want this to work, you can make both selector definitions `:global()` -- both `.merry {}` in `merry.js` and `.merry--override {}` in `parent.js`.  This will output two CSS selectors without isolation:

```css
.merry {
  color: red; background: green;
}
.merry--override {
  color: yellow;
}
```

The override is now just as specific and will work just fine.

But now you've lost the foremost benefit of using styled-jsx: isolation!  As far as I [can](https://github.com/zeit/styled-jsx/issues/197) [tell](https://github.com/zeit/styled-jsx/issues/121), this is the current best solution so far, and it's not a great one.  This seems like a mainstream usecase, so I'm surprised this is what we're left with.

## Vacation from My Problems

Of course, there is another solution, and that's to avoid the problem.  If you have reusable components, don't attempt to override them.  Treat them as a black box.  Of course, this means that you may have to handle more styling in the outside/parent components.  

In the example above, you could define `.merry { color: inherit; }` and then *always* include `<Merry />` on the page within a wrapper that would define the color.  `wrapper.js` might look like:

```js
import Merry from './merry'

export default props =>
  <div className="wrapper">
    <Merry />
    <style>{`
      .wrapper { color: red; }
    `}</style>
  </div>
```

In this example, every wrapper would define a color as the original `red` or an overriding `yellow` or whatever.  It works in this case.  It may be more difficult, depending on your use case, to avoid this.

Have you run into this same problem when styling children using styled-jsx?  How have you found your way around it?
