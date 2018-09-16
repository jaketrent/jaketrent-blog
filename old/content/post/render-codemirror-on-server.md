---
categories:
- "Code"
comments: true
date: 2017-08-15T07:12:44-06:00
description: "CodeMirror is a great in-browser editor that needs some help when rendered server-side."
draft: false
image: "https://i.imgur.com/jsRqEMr.jpg"
layout: post
metaKeywords: "codemirror, server-side code mirror, navigator is not defined, dynamic import"
tags:
- "react"
- "js"
title: "Render CodeMirror on the Server"
---

CodeMirror is a great in-browser editor that needs some help when rendered server-side.

<!--more-->

## In-browser Code Editor

CodeMirror is a library that provides code and a UI for creating a coding environment inside your browser.  There's an editable text area where you can type code, and as you write it, it's syntax highlighted just like your editor at home.  It's a cool tool for creating some cool products.

![codemirror example](https://i.imgur.com/A7YbMp3.jpg)

This user interaction happens in the browser, but if your code goes through a server render process, you're going to need a little help.

## Navigator is Not Defined

Because CodeMirror runs in the browser, it is written to rely on certain browser APIs. One such API it relies on is [navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator).

If you just `import` and use `CodeMirror` in certain ways in a Node environment, you'll see something like this:

```
[0]
[0] ERROR in ReferenceError: navigator is not defined
[0]     at evalmachine.<anonymous>:8017:17
[0]     at userAgent (evalmachine.<anonymous>:8010:27)
```

## Conditionally Import Modes

To get around this, you want to conditionally import your "mode".  In CodeMirror, a "mode" is the syntax mode that you're highlighting -- eg, js or css.  

In my code, I'm using [`react-codemirror`](https://github.com/JedWatson/react-codemirror) to render the editor, and users are writing JavaScript in this editor window.  

It turns out `react-codemirror` is fine on the server side, but the JavaScript codemirror *mode* is not.  So I can es6 static import the `react-codemirror` bits, but I'm going to conditionally load the mode.

(Note that if you're not using `react-codemirror` but raw `codemirror` for the editor code, you'll need to conditionally import it as well, for the same reasons.)

Anyway, the example:

```js
import 'codemirror/lib/codemirror.css'
import './codemirror-theme-monokai-sublime.css'
import CodeMirror from 'react-codemirror'
import React from 'react'

let modeLoaded = false
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript')
  modeLoaded = true
}

export default props => {
  const options = {
    theme: 'monokai-sublime'
  }
  if (modeLoaded) options.mode = 'javascript'

  return (
    <CodeMirror
      className={props.css.root}
      value={props.children}
      options={options}
    />
  )
}
```

Do you see how `modeLoaded` is protecting CodeMirror from engaging its syntax highlighting on the server?

What other strategies do you use to make CodeMirror work better in a server-rendered environment?

