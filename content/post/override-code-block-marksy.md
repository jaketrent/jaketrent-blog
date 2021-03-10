---
layout: post
title: "Override the Code Block Element in Marksy"
date: "2021-03-10"
image: "https://i.imgur.com/g4ucUu7.jpg"
description: "Change the default rendering of code blocks using marksy"
metaKeywords: "marksy, mdx alternative, markdown renderer, custom code block markup"
tags:
  - "markdown"
---

Here's how you can change the default rendering of code blocks using marksy.

<!--more-->

## An MDX Alternative

[MDX](https://github.com/mdx-js/mdx) is a popular superset of Markdown that allows rendering custom components from within the usual markdown formatting. [Marksy](https://www.npmjs.com/package/marksy) is a competing library. It does the same thing, and at least in my experience was even easier to set up.

## Compilation Configuration

Markdown must be compiled from its original format in order to be rendered as  HTML. 

My compilation function looks like this:

```javascript
import marksy from "marksy"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

function compileMarkdown(markdown) {
  const compile = marksy({
    createElement, 
    highlight,     // implemented elsewhere
    elements,      // implemented elsewhere
  })
  const result = compile(markdown, {})
  result.string = renderToStaticMarkup(result.tree)
  return result
}
```

Marksy allows setting your own `createElement` function. In my case, this is being provided by React. Final markup is also done by React.

## Customizing Highlighting

Code highlight can come from anywhere. I chose to use the [PrismJS](https://prismjs.com/) library. It's used on the server, so I'm using the Node API. The `highlight` function is as follows:

```javascript
import Prism from "prismjs"

const highlight = (language, code) => {
  return Prism.highlight(code, Prism.languages.javascript, language)
}
```

## Customizing Elements

Marksy allows for overrides to how the markdown is represented in HTML. This is provided in the `elements` property given to marksy.

I wanted to change the code block of my markdown. (You know, those triple backtick blocks?) I wanted to set a `tabIndex` on the `code` element. I did that like this:

```javascript
import { createElement } from "react"

const elements = {
  code({ language, code }) {
    return createElement(
      "pre",
      {},
      createElement("code", {
        dangerouslySetInnerHTML: { __html: highlight(language, code) },
        tabIndex: 0
      })
    )
  }
}
```

Note that I'm using React but not using JSX here. But if your environment constraints are different, you likely would use it. Because of the way marksy is composed, I also have to call my `highlight` method from within the `code` function.

Hook this set of functions into your markdown compilation pipeline, and you're set.

Do you have any suggestions for improvements on this method of overriding the code blocks in marksy?

