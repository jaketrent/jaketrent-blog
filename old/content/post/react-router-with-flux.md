---
layout: post
title: "React-Router with Flux"
date: "2015-01-15"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "react-router"
description: react-router routing and flux data display needs a bit of glue to work well together.
metaKeywords: react, react-router, transition, data change, store
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

react-router provides great route handling with route params and query params.  Flux provides a pattern for building React apps, including a pattern from providing data to your components.  Here's a straightforward way to make route changes trigger data changes in your components.

<!--more-->

Note: Code here reflects usage of react-router 0.11.x.

It is often the case that we'll need to trigger data changes in a react component in our Flux app because of a route transition.  A prime example of this would be on an object show page, where the details of a particular object are being shown.  In our example, let's say that we're showing the details of a book, such as title, author, and description.

The route to our book detail page is likely defined as:

```js
// ...
<Route name="book" path="/books/:id" handler={require('./books-show')} />
```

The handler is just a controller-component that defines the view.  It might look simply like:

```js
const React = require('react')
const {State} = require('react-router')

const BooksStore = require('./books-store')

module.exports = React.createClass({

  displayName: 'BooksShow',

  mixins: [ State ],

  getInitialState() {
    return this.getStateFromStores()
  },

  getStateFromStores() {
    return {
      book: BooksStore.find({ id: this.getParams().id })
    }
  },

  componentDidMount() {
    BooksStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    BooksStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState(this.getStateFromStores())
  },

  render() {
    return (
      <ul>
        <li>{this.state.book.title}</li>
        <li>{this.state.book.author}</li>
        <li>{this.state.book.description}</li>
      </ul>
    )
  }

})
```

Note that the view component references a `BooksStore` for getting its initial state.  The state of `book` will also be updated as the `BooksStore` emits that its data has changed and `this._onChange` is called.

Every time a route transitions, react-router has a `Router.run` callback that will also run in order to render the matching route.  This will also be a great place to put our action to signal to our Flux app that routes are transitioning and therefore other stuff like data in the display might need to change as well.

```js
Router.run(routes, (Handler, state) => {
  React.render(<Handler />, document.body)
  BooksAction.transition(state.params)
})
```

__Important note__: Make sure the transition action is called after `React.render` so that the change emission will be detected after render, otherwise you'll be one route transition behind.

The `BooksAction.transition` definition is something very simple -- something that can trigger events on the dispatcher:

```js
exports.transition = () => {
  AppDispatcher.handleViewAction({
    type: ActionTypes.TRANSITION
  })
}
```

The final connection is in the store, where the dispatched action can be listened for an then trigger the store event, updating the component views:

```js
var BooksStore = merge(EventEmitter.prototype, {
  find(filter) {
    // ...
  }
})

BooksStore.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action
  switch(action.type) {
    // ...

    case ActionTypes.TRANSITION:
      BooksStore.emitChange()
      break
  }
})

module.exports = BooksStore

```

At this point, all the route transitions should trigger data changes in views.  Visiting the url `/books/1` and then the url `/books/2` should display different data on screen according to which book id was in the route.  `Router.Link` should work correctly, usable instead of buttons with actions being triggered on click.

react-router and Flux make for a great combo in this way, right?  What adjustments would you make?
