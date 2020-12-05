---
layout: post
title: "Set State in Callbacks in React"
date: "2014-06-23"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "superagent"
description: Help your React components set state safely in callbacks
metaKeywords: js, react, components, setState, componentWillUnmount, componentDidMount, unmounted
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

In React, you can setup components that fetch their own data and set their own state with that data.  Because of the async nature of data fetching, you’ll have to make sure to keep things cleaned up to avoid the error of trying to set state in an unmounted component.

<!--more-->

**Updated** for React 0.13.  See below

## React Components setState

If a React component fetches its own data, it will usually do so in the `componentDidMount` method.  In the data request callback, it will set its own state via the `this.setState` method.  (`this.state` should be treated as immutable.)  State should only be set on mounted components, or those components that are inserted into the dom.

If you attempt to set state on an unmounted component, you'll get an error that looks like this:

```
Uncaught Error: Invariant Violation: replaceState(...): Can only update a mounted or mounting component.
```

Others have reported this variation:

```
Invariant Violation: replaceState(...): Cannot update while unmounting component. This usually means you called setState() on an unmounted component.
```

Both indicate that you're setting state on a component that is not mounted.  How should one avoid this?  In my case, `setState` was being called in a callback that was firing after the component that initially started the request had already been unmounted from the dom.  Here are the two ways I addressed the problem...

## Assure Component isMounted

If the component is mounted, `setState` is a safe bet.  If it's not mounted, never do it.  If it's not mounted, you probably don't about the state at that point either.  So wrap your state setting in `this.isMounted()`:

```js
React.createClass({
  componentDidMount: function () {
    MyModel.find(function (err, data) {
      if (this.isMounted()) {
        this.setState({
          goodiesFrom: data
        })
      }
    }.bind(this))
  }
  // ...
})
```

It feels a bit like a hack, but it makes the code safe.  Another option...

## Abort the Request

My asynchronous action is a network request that, when finished, will call the callback function.  When the component unmounts, I can just throw away the request so the callback is never invoked.  To do this, we'll take advantage of another React lifecycle hook, `componentWillUnmount`:

```js
React.createClass({
  componentDidMount: function () {
    this.req = MyModel.find(function (err, data) {
      this.setState({})
    }.bind(this))
  },
  componentWillUnmount: function () {
    this.req.abort()
  }
  // ...
})
```

In my model, I'm using the [superagent](https://github.com/visionmedia/superagent) library for network requests which provides an [abort](https://visionmedia.github.io/superagent/#aborting-requests) method.

```js
var request = require(‘superagent')
MyModel.prototype.find = function (done) {
  return request(‘modelUrl’)
    .end(function (err, data) {
      if (data) {
        done(err, data.body)
      }
    })
}
```

Also note that in my `end` function callback, I'm checking for the existence of data.  This is because when a request is aborted, data will come back as undefined.

My favored method for solving the problem is the latter request abort method.  It feels cleaner that we're relying on the lifecycle functions of the component to deal with cleanup, much like we would for [events](https://facebook.github.io/react/tips/dom-event-listeners.html).  How have you dealt with this problem?

## Update: "Using"

With React 0.13, you can define your components using the ES6 `class` definition.  These classes conspicuously change behavior from the old style of `React.createClass` in several ways.  Here are a couple that are relevant here:

- There is no `isMounted()` method any more
- There is no `getDOMNode()` method any more

`isMounted` is gone, awol, as far as I can tell, and `getDOMNode` has been moved to a utility function.

So, in order to get the DOM Node, you'd call it like this:

```js
React.getDOMNode(this) // `this` would be my component
```

It functions as before.

In order to check `isMounted`, you're on your own.  My basic implementation can be seen in the following [jsbin](https://jsbin.com/telopegaya/2/edit?js,output).  Frankly, it feels dirty.  `React.findDOMNode` will throw an exception if the component isn't mounted, so we are using exceptions for flow control.  Egh:

```js
var isMounted = (component) => {
  // exceptions for flow control :(
  try {
    React.findDOMNode(component);
    return true;
  } catch (e) {
    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
    return false;
  }
};
```

How it might still be used:

<a class="jsbin-embed" href="https://jsbin.com/telopegaya/2/embed?js,output">JS Bin</a><script src="https://static.jsbin.com/js/embed.js"></script>

This leaves me with the question of why `isMounted` was removed if it helps solve a potential problem.  Do we solve it in another way?  Does the core library do more for you?  You can verify for yourself in the jsbin above that if you remove the `isMounted` check, the old invariant error message is still logged.

Does anyone have a *good* `isMounted` solution?
