---
categories:
- "Code"
comments: true
date: 2017-05-04T20:15:51-06:00
description: ""
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "js, react, server render, universal react, lifecycle, componentdidmount, componentwillmount"
tags:
- "js"
- "react"
title: "React componentDidMount Not Called in Server Render"
---

You have access to some great component lifecycle hooks in React.  `componentDidMount` is one of the most useful, but it's not going to be available when rendering on the server.

<!--more-->

You may have been stumped when you wrote a React component and were trying to get some code to run in the `componentDidMount`.  But try as you might, `console.log` as you might, that function was just never called.  You double-checked your spelling and remained baffled.  

## Server Difference

Then you remembered you were rendering React on the server.  The server has a key difference in comparison the browser.  The server environment has no DOM.  The browser provides the DOM.  [Mounting in React](/post/what-does-mount-mean-in-react/) is synonmous with DOM insertion.

Even the library API tries to give you a strong indication that things are going to be different on the server.  You import differently:

```js
import ReactDOMServer from 'react-dom/server'
```

You render differently:

```js
// if rendering to match with a React client
ReactDOMServer.renderToString(reactElements)
// if rendering for static html
ReactDOMServer.renderToStaticMarkup(reactElements)
```

## Your Only Hope

So things are different.  But there's always hope.  Components are built on hope.  You can add code to your component inside the `constructor` and `componentWillMount`.  That is all:

```js
class OobiDoobBenooby extends React.Component {
  componentWillMount() {
    console.log('Will be called on the server...')
  }
}
```

And it makes sense.  You won't be inserting into a DOM.  Mount will never happen.  You're simply outputting a string of HTML.

Besides the situation of rendering on the server, have there been other times `componentDidMount` didn't seem to work for you?

And what other interesting differences have you found while server-rendering React versus the browser experience?
