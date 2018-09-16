---
categories:
- "Code"
comments: true
date: 2017-10-03T06:39:29-06:00
description: "How to make React error boundaries work in event handlers."
draft: false
image: "https://i.imgur.com/qW9zqmA.jpg"
layout: post
metaKeywords: "react error boundary onclick, async error boundaries, react 16 error boundaries, catch errors in react event handler"
tags:
- "js"
- "react"
title: "React Error Boundaries in Event Handlers"
---

How to make React error boundaries work in event handlers.

<!--more-->

## React Error Boundaries

In React 16 there is a new feature called [error boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).

This feature allows you to wrap components in React components that act as `try-catch` blocks.  These boundary components have a new lifecycle method implemented called `componentDidCatch`.  

With this feature, you can create boundaries around problems that might happen while rendering your UI.  You could show some sort of message to your users, like "we're sorry, but..." or you could log errors caught to an error-reporting service.

## componentDidCatch Example

The simplest of error boundaries might just log the error.  That might look like:

```js
class LoggingBoundary extends React.Component {
  state = { err: null }
  componentDidCatch = (err, info) => {
    console.log('Logging error', err, info)
    this.setState({ err })
  }
  render() {
    return this.state.err ? 'Sorry, it is kaput' : this.props.children
  }
}
```

And then you could wrap some component usage in that error boundary component:

```js
<LoggingBoundary>
  <MyComponent />
</LoggingBoundary>
```

## Errors in Click Handlers

One of the places that interesting things (and thus errors) happen in React is in interactive event handlers.  Thus, you'd think that'd be a great place to be able to throw (and then later, catch) errors.

However, if you simply throw the error from within your event handler:

```js
class MyComponent extends React.Component {
  handleClick = () => {
    throw new Error('Some problem at event time')
  }
  // ...
}
```

That error will not trigger the error boundary that wraps the component.

## Async is the Problem

The basic problem is that event handlers are asynchronous in nature.  They don't happen in the same run of the event loop as the render code of the error boundary.  So trying to catch errors in that code is like doing this in plain JavaScript:

```js
try {
  setTimeout(_ => { throw new Error('Some problem in async land') }, 0)
} catch (err) {
  console.log('Logging error', err, info)
}
```

It won't work, and the `catch` will never be triggered by this particular async error.

## Synchronous Render

Essentially what we need is some data at render time, which is synchronous in React within a component `render` function.  And what causes React components to re-render?  Changes to `this.state` or `this.props` do.  

If, in an error situation within an event handler, we can record the existence of an error in `this.state`, that will trigger a new call to `render` and we can re-throw it there: 

```js
class MyComponent extends React.Component {
  state = { err: null }
  handleClick = () => {
    try {
      // something that produces an error
    } catch(err) {
      this.setState({ err })
    }
  }
  render() {
    if (this.state.err) throw this.state.err
    // ...
  }
}
```

The `try-catch` works _within_ the event handler, and we `this.setState` the error to save it for later.  This updates component state and thus kicks off a new render cycle.  During render, since `this.state.err` is non-null, we throw it within synchronous `render`, thus activating `<LoggingBoundary />` that surrounds this component.

## Remembering Lots of State

This works but is not ideal for the developer experience.  We have to remember and be very specific _everywhere_ that we want async code to have errors caught and handled in a parent boundary.  This means lots of new state tracking.  It'd be great if somehow (somehow!) errors, even those that are async, could be automatically caught and bubbled up the component tree.

How else do you accomplish passing errors to error boundaries in React that originate in event handlers?
