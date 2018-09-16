---
categories:
- "Code"
comments: true
date: 2017-08-01T07:06:03-06:00
description: "An easy, consistent way to override CSS modules in React components."
draft: false
image: "https://i.imgur.com/wj9nBGj.jpg"
layout: post
metaKeywords: "css modules, customize css modules, overriding css modules, react-styleable"
tags:
- "css-modules"
- "css"
- "react"
title: "Override CSS Modules with react-styleable"
---

An easy, consistent way to override CSS modules in React components.

<!--more-->

## CSS Modules 

[CSS modules](https://github.com/css-modules/css-modules) are fantastic because they scope your CSS.  No longer does everything have to live in the global namespace.

A natural boundary to scope CSS to is within a web component.  A React component can have a corresponding `*.css` file to accompany it with all the related styles, and it feels very natural.

## Overriding Styles

Of course, as soon as you have boxed-up some functionality -- in this case some markup and styles inside a component with accompanying css -- you're going to have occasion to open the box and customize it.

Because the scoping of CSS module selectors happens by hashing them at build time, this can be challenging to predictably override.

If you use your CSS module like this in this theoretical `List` component:

```js
import css from './list.css'

export default props => 
  <ul className={css.list}>
    <li className={css.listItem}>item!</li>
  </ul>
```

You're going to be hard-pressed to override this from the outside, or client side, of this module.  This is because you've coupled your component directly to this `css` module-scoped variable without any way to override it from the outside.

## React-Styleable

[react-styleable](https://www.npmjs.com/package/react-styleable) aims to improve this by providing an easy, consistent way to override CSS modules.

Instead of using the `css` variable directly, you would pass it to the higher-order component provided by `react-styleable` and then access the css selectors via `props.css`:

```js
import styleable from 'react-styleable'

import css from './list.css'

export default styleable(css)(props => 
  <ul className={props.css.list}>
    <li className={props.css.listItem}>item!</li>
  </ul>
)
```

## Overriding Styles

Because you are now accessing the CSS via the props (`props.css`), you have an opportunity to change the CSS via props.  Props, after all, are React's way of passing parameters into your component.

The `styleable` higher-order component will merge the `props.css` object with overriding styles as needed.

Let's say that you created a custom stylesheet, where the list was originally white now should be a darker color.

The original stylesheet snippet (`list.css`) looks like:

```css
.list {
  background: #fff;
}
```

And the overriding stylesheet snippet (`list-dark.css`) looks like:

```css
.list {
  background: #555555;
}
```

![overriding list style](https://i.imgur.com/w0exenI.jpg)

When you want to use the `List` component but override the styles, you could pass your new stylesheet:

```js
import css from './list-dark.css'
import List from './list'

<List css={css} />
```

In this usage of `List`, this `.list` selector would get the dark background.  

Note that if there were other selectors in the overriding css file that they too would be overridden since this is a _full_ override of the stylesheet.  

For a partial override, we could be more precise, only overriding the `.list` selector specifically:

```js
import css from './list-dark.css'
import List from './list'

<List css={{ list: css.list }} />
```

Imagine if we had an app or a component ecosystem where all components were consistent in their usage of such a mechanism.  It'd be easier to override styles -- we'd have a set of more flexible components that could handle the custom styling scenarios that we always seem to run into. 

There are also other methods for overriding CSS modules or component styles.  What are some of the ways that have worked best for you?
