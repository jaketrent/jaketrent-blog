---
categories:
- "Code"
comments: true
date: 2020-10-01T07:34:25-06:00
description: "How to respond to the OS dark theme within JavaScript"
draft: false
image: "https://i.imgur.com/GV6rPO8.jpg"
layout: post
metaKeywords: "dark mode, prefers-color-scheme, operating system colors, javascript, dark mode in css"
tags:
- "css"
- "js"
title: "Respect OS Dark Mode in JavaScript"
---

Here are a couple methods to the OS dark theme within JavaScript. 

<!--more-->

Respecting the user's OS theme color is something that more websites should do. It's magical when it works. 

How many of you sit for hours looking at a dark terminal window while the bright white browser window blazes next to it, burning a white spot into your vision? What if they both matched based on the OS preference!

![macos color preference](https://i.imgur.com/fl4i44S.jpg)

## CSS Dark Mode

CSS supports color mode changing through [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).  It's accomplished as a media query. For instance, here's how you'd default to a light theme background and then support a dark theme as well:

```css
:root {
  --bg: #F0F3F5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #181C20;
  }
}

body {
  background-color: var(--bg);
}
```

## prefers-color-scheme in JavaScript

Now, how might we get that in vanilla JavaScript?  Since [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) exists for querying media queries, we can do a similar query:

```js
import { canUseDOM } from 'exenv'

if (canUseDOM) {
  const prefersDark =
    window.matchMedia('(prefers-color-scheme: dark)').matches

  document.body.style.background = prefersDark ? '#181C20' : '#F0F3F5'
}
```

We only do a `canUseDOM` check so that our JS remains server-renderable. It might be overkill for this example.

## prefers-color-scheme in React

We could do this in React as well with something like a Theme provider.

```js
import { canUseDOM } from 'exenv'
import * as React from 'react'
import { render } from 'react-dom'

const prefersDark =
  canUseDOM && window.matchMedia('(prefers-color-scheme: dark)').matches
const ThemeContext = React.createContext({ name: prefersDark ? 'dark' : 'light' })

function Parent() {
  <ThemeContext.Provider>
    <Child />
  </ThemeContext.Provider>
}

function Child() {
  const theme = React.useContext(ThemeContext)

  return <div style={{
    backgroundColor: theme.name === 'dark' ? '#181C20' : '#F0F3F5'
  }}></div>
}

render(<Parent />, document.getElementById('app'))
```

How else have you respected this value in JavaScript?  
