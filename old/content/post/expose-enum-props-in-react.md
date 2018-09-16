---
categories:
- "Code"
comments: true
date: 2017-11-06T06:37:27-07:00
description: "Define and expose your enum props to make it better for developers."
draft: false
image: "https://i.imgur.com/Mo57OZT.jpg"
layout: post
metaKeywords: "js, react, enum, oneOf, propTypes, static analysis, import, export, enum props"
tags:
- "js"
- "react"
title: "Expose Enum Props in React"
---

Define and expose your enum props to make it better for developers.

<!--more-->

## React Component Public APIs

When you write a component these days, it's usually in a file that acts as a module boundary.  You usually end up exporting one thing: the component itself.  

This might look like:

```js
import React from 'react'

const MyComponent = props => <div>Component stuff</div>

export default MyComponent
```

But are there other public APIs you can document?  What if you have a [PropTypes.oneOf](/post/react-oneof-vs-oneoftype/) prop?  This is where a user of your component can pass it one of n literal value options.  Those values -- that enum -- is a part of your public API, because they are the only supported arguments to that prop and must therefore be known to the world outside your module.  If you don't expose them, your users are left guessing what the allowed values are, relying on PropTypes warning messages at runtime.

## Define Enums to Be Referenced

To make this better, we first define our enums so that the enum variable can be referenced instead of using the magic strings or numbers that your enum consists of.  

If your component takes a `PropTypes.oneOf` prop, that might look like:

```js
import PropTypes from 'prop-types'
import React from 'React'

const Button = props => /* the component body */

Button.propTypes = {
  appearance: PropTypes.oneOf(['primary', 'stroke', 'flat'])
}

export default Button
```

To define that `appearance` enum, we might write something like:

```js
const appearances = {
  primary: 'primary',
  stroke: 'stroke',
  flat: 'flat'
}
```

Now instead of a user invoking this:

```js
<Button appearance="stroke">Click me</Button>
```

They might write:

```js
<Button appearance={appearances.stroke}>Click me</Button>
```

This has a couple benefits.  It removes the magic string, making it clear where the value and its meaning comes from.  It allows for static analysis of where the `appearances` is used.  It enables better tooling, allowing code complete.  It enables better refactoring, since you can more easily find your usages of this enum.

We can also DRY up the values in this enum by reference the enum in the PropTypes definition:

```js
const appearances = {
  primary: 'primary',
  stroke: 'stroke',
  flat: 'flat'
}

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(appearances))
}
```

## Exposing for Ease

But we took a mental shortcut in the previous section.  We didn't actually expose the `appearances` for users to reference.  Let's do that now.

I like to expose this as a static member on the component function for easy reference, since users of the component will have access to that function already via the default export. 

That export might look like:

```js
// ...

const appearances = {
  primary: 'primary',
  stroke: 'stroke',
  flat: 'flat'
}

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(appearances))
}

Button.appearances = appearances

export default Button
```

And usage might look like:

```js
import Button from './button'

<Button appearance={Button.appearances.stroke}>Click me</Button>
```

## Exposing for Perf

That previous method provides a great developer experience.  But does it treat your bundle size nicely?  Maybe.  Maybe not.  

There are some cases where you want to might want to reference and use the enum but not the component.  In this case, you want to import exactly what you need and nothing else.  That is, we want to export the `appearances` separate from the component.

That export might look like:

```js
// ...

export const appearances = {
  primary: 'primary',
  stroke: 'stroke',
  flat: 'flat'
}

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(appearances))
}

export default Button
```

And usage might look like:

```js
import { appearances } from './button'

console.log('All appearance options', appearances)
```

Why not both? In a current project, I want to support both use cases and thus export the enum in both methods for most components.  The first method allows for quick, easy dev work.  The second method allows for efficient tree shaking in the case of only exporting and using the enum.  If you use both export styles in a component you get most of the best of both worlds, depending on the user's use case.

How do you expose, document, or make more simple the use of your enum props in React?
