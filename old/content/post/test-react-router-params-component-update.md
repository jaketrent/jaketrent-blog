---
layout: post
title: "Test React-Router Previous Params for Component Update"
date: "2015-02-09"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "react-router"
description: To examine react-router's current and next url in your component, you'll have to store some state.
metaKeywords: react, react-router, previous params, previous state, params
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

Once upon a time, react-router transferred params and query params from the url via props into components.  It doesn't happen this way any more.  So, let's say you have a need in your component like overriding `shouldComponentUpdate` in your component which only has access to `this.props` and `this.state`.   How can you use the url data to affect the component re-render or not?

<!--more-->

## Why control rendering with the url?

There are two instances that come to mind when considering the scenarios that it might be needful to control the update of your component based on the url:

1. __Avoid re-render__: Of course, if the component we're talking about is a page-level component, you'll most likely always be wanting to re-render as the url changes.  But, if you're a little widget component that cares about the url, you might not need to always re-render on url change.

2. __Trigger re-render when it might not otherwise happen__: For whatever reason, you may have already needed to implement `shouldComponentUpdate` in your component.  This function returns true or false to flag a "should" or "should not" re-render.  You'll need to access url state and likely previous url state in this method to make re-renders happen that otherwise wouldn't if you had no logic in this function for it.

Of course, beyond these re-render scenarios, there are many other situations in which knowing previous and current states in the url could come in handy.

## React-Router in shouldComponentUpdate

`shouldComponentUpdate` determines if component should re-render.  It's called whenever `this.props` or `this.state` changes.  It has access to incoming props and state via the function parameters.

React-router gives your component access to params and query params by requiring you to mix in the `State` param from react-router.  Then you have access to new functions, `this.getParams()` and `this.getQuery()`.  If you only need to know current url state, this is enough.  If you want to compare current url state to previous url state, you'll have to save the parts that you care about.  We'll do that in `this.state`.

Let's say that we want to trigger a redraw on changes to a `range` query parameter.  The component might, in part, look like this:

```
var { State } = require('react-router')

module.exports = React.createClass({

  mixins: [ State ],

  getInitialState() {
    range: nul
  },

  componentWillReceiveProps() {
    this.setState({
      range: this.getQuery().range
    })
  },

  componentWillMount() {
    this.setState({
      range: this.getQuery().range
    })
  }

  shouldComponentUpdate() {
    return this.state.range !== nextState.range
  }

  // ...

})
```

When the url params change, `componentWillReceiveProps` is called.  But this is not called on the first render, thus we implement `componentWillMount`.  Both these functions save the `range` from the url to the component state.  Now, as `shouldComponentUpdate` is called on future `this.props` and `this.state` changes, current and next `range` values can be compared and used in "should re-render" calculation.

What other ways have you found to accomplish this tracking of previous state in the url?
