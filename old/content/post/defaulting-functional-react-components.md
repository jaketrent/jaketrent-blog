---
categories:
- "Code"
comments: true
date: 2017-09-26T07:04:43-06:00
description: "Here are a few reasons why I prefer and default to stateless functional React components."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "react, stateless functions, react component functions, react component state"
tags:
- "js"
- "react"
title: "Defaulting to Functional React Components"
---

Here are a few reasons why I prefer and default to stateless functional React components.

<!--more-->

## Two Flavors

There are two syntaxes available to write your React components.  One, class style:

```js
import React from 'react'
class MyComponent extends React.Component {
  render() {
    return <div>My component!</div>
  }
}
```

The other, function style:

```js
import React from 'react'
const MyComponent = _ => <div>My component!</div>
```

When I can, I prefer the latter, function style.

## Simpler

The function style is a simpler construct.  I avoid building up a class structure with an inner render function.  I just return the React elements I want to render from a function.

There's less typing.  There's less code to grok.  There is less ceremony around it.  I see the essence of what my component does more quickly.  I can write the function without a return statement using an [arrow function](/post/javascript-arrow-function-return-rules/).

I like the mental model of "always functions".

## This 

When I write a class-style component, I'm in a `React.Component` class.  I now have a backing instance that is tracked in memory.  Now I have to deal with the context of `this` within my code.  

`this` can create code that's harder to understand, because the meaning of `this` can be changed depending on how our class functions are invoked.  This can be a source of bugs that's harder to get right than just relying on local function arguments.

`this` also poses some challenges to function re-use.  Your functions can be tied up inside your class and again rely on that context for access to instance members such as `this.props` or `this.state`.

## State

I end up moving from a function-style component to a class-style component when I need `this.state`.  Functional components do not have this feature.  Though you can store this kind of state outside React too and still use functional components.

So I go about refactoring/rewriting my component to move to this different class syntax (and to some extent a different abstraction) when I need state.  

Wouldn't it be cool if there was one abstraction and one syntax (functions) to match?  This is what I think is cool about [jlongster](https://twitter.com/jlongster)'s [lively](https://github.com/jlongster/lively) demo, where he creates a functional component _with_ state.

## Performance

Another reason I end up rewriting a functional component into a component class is to gain a performance benefit.  In the function style, I don't have access to any of the component lifecycle events.  

But in the class style, I can implement lifecycle hooks such as `shouldComponentUpdate`, which allows control over whether that component and its subtree of components should be repainted or not.

I wish that there were more performance benefits for stateless functional components.  You'd think they'd potentially have less overhead.  We have gotten teased since the release of [React 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components) that they might get some _future_ performance boost:

> In the future, we’ll also be able to make performance optimizations specific to these components by avoiding unnecessary checks and memory allocations.

## I'll Rewrite For Now

So, yes, there are moments when I have to rewrite a functional component into a class component.  For now, I think it's worth it, though sometimes a pain.  The benefits of simplicity, avoidance of this, and a hope in future performance gains keeps me going.  Perhaps I'll start sporting my own lively.

What do you think?  Why do you default to one or the other style?  What can we do to make the default experience we choose even better?
