---
layout: post
title: "Update Body Class in React"
date: "2015-09-23"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "css"
description: React Components are self contained.  How can I reach out and modify the body tag from a React app.
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

React gives us a great component abstraction.  Each of these components represents a node in the DOM.  Each component is self contained, doesn't talk up the component hierarchy directly and passes explicit data and code down the hierarchy.  But what about when you have a React app that wants to reach out and modify something it doesn't control?

<!--more-->

## A Couple Use Cases

There are potentially a few use cases for this.  For instance, modals that need to render outside your application's potentially `position: relative` containers.  Or, as we'll see below, your app wants to modify the `body` tag in your html document.

The most common reason I've found for messing with the body tag is to provide some style attribute.  It's not uncommon to have full-page style differences between pages in our apps.  If you have a "single page" js app in the browser, you need to be able to modify the body tag in code.

Let's use an example where on some pages in your app, the theme is "dark", where the body background color should be black.  On other pages, the entire body background color should be the default white.  We'll make a component that lives high in the hierarchy and takes an `isDark` property to determine if the rendered page is dark or light.

## Body is Outside Your React App

You can't mount your React app directly on `document.body`, at least without warnings.  This is considered bad practice, because other scripts or browser plugins often modify the document body directly.  So you'll have to reach *out* of your React app and modify the body directly.

## Tie Into the React Lifecycle

First, you just need a point in time in your app's lifecycle where you know you want to modify the `body` class.  React has a bunch of [lifecycle hooks](https://facebook.github.io/react/docs/component-specs.html) that will come in handy.  A great early-lifecycle hook for modifying the DOM is `componentDidMount`.  Usually, we would be accessing DOM nodes that are children of our Component.  Again, in this case, we're reaching out beyond where a React component usually should.  The usual `React.findDOMNode` functions will not be needed, because React isn't managing the body node.  Instead, we'll just use the `document.body` api directly.

## Use JavaScript to Modify the Class

If you have some utility for modifying class names, use it.  If not, it's small and simple enough in [plain old JavaScript](http://jaketrent.com/post/addremove-classes-raw-javascript/).

With these two bits in hand, you have the pieces necessary for your body-modifying component:

```js
import React from 'react'

class BodyColor extends React.Component {
  static propTypes = {
    isDark: React.PropTypes.bool
  }
  static defaultProps = {
    isDark: false
  }
  componentDidMount() {
    document.body.classList.toggle('darkClass', this.props.isDark)
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('darkClass', nextProps.isDark)
  }
  componentWillUnmount() {
    document.body.classList.remove('darkClass')
  }
  render() {
    return this.props.children
  }
}
```

To use, pass an `isDark` attribute to activate the `darkClass` class on the body tag:

```html
<BodyColor isDark={true}>
  <h1>A Very Dark App</h1>
</BodyColor>
```

Are there any other ways you've found to reach out of React and modify the DOM directly.  What have been your use cases?
