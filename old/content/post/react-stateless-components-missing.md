---
layout: post
title: "What React Stateless Components are Missing"
date: "2016-01-04"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
description: Statless components, new to React 0.14, don't have a few things that you might be used to by now.
metaKeywords: js, react, stateless components, statless functions, ref, backing instance, lifecycle
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

Stateless React components got a new syntax in React 0.14.  It's much simpler.  It's just a function call.  Besides it just looking simpler, there are some major differences in what is available in a stateless component written this way.  There are some things missing -- purposefully not included -- that you may be used to.  Let's look at a few things.

<!--more-->

Stateless components are now specifically not just components where you don't use `this.state`.  They're componets that are written in the form of a function:

```js
function Chips(props) {
  return <div>In the secret {props.place}</div>
}
```

The observations made in this article will not apply to components that are created using the `class Chips extends React.Component` or `React.createClass` syntax, whether they use state or not.

## No Backing Instance

A React component's backing instance is the object in memory that represents the node in the view.  This backing instance is the place where state is usually stored (using React's `this.state`).  Well now there's no `this` in stateless components.  Thus, there's not going to be a place for `this.state`.  Stateless, remember?  Data just passes through the pure function and into the resulting view.

## No Lifecycle Methods

Because there's no backing instance as a place to put hooks for your code in the component lifecycle, you can not use any of the lifecycle methods from `React.Component`.  Methods such as `componentDidMount` and `componentWillReceiveProps` are out.  And since the stateless component is a pure function that just reproduces its view state on `props` change, why would you need lifecycle methods anyway?

## No Reference to the Component

Often when testing, it's useful to get a reference to the component itself.  In the case of stateless components, they're just fired and forgotten, rendered into the view without the ability to get a handle on them.  They're just UI at this point, just in the DOM.  You can go to the DOM to do your testing.  

Depending on your test environment setup, you may want to wrap your stateless components in a `class`-based component you *can* get a reference to.

Note that for stateless components, `ReactDOM.render` and `TestUtils.renderIntoDocument` will return `null`.

## No refs

Stateless components can't be the target of a `ref`.  There's no backing instance.  You can't have `refs` internally to children either.  Remember, `this` and `this.refs` aren't around.  If your stateless component has a child that is a `class`-based component, *it* may have `refs`.  [The docs](https://facebook.github.io/react/docs/more-about-refs.html) are another good reference on `refs`.

## Updated: Null Returns

As of [react@15.0.0](https://facebook.github.io/react/blog/2016/04/07/react-v15.html#functional-components-can-now-return-null-too), now stateless component functions *can* return null.  

~~A `class`-based component may return `null` as its value in the view.  But a stateless component may not.  To get around this, return `<noscript></noscript>`.  This will be fully invisible in the view.~~

So what else have you found that is unavailable in stateless functions?  
