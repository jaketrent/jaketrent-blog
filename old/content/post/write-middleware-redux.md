---
categories:
- "Code"
comments: true
date: 2017-04-19T07:22:09-06:00
description: "Writing middleware for Redux that gets executed on every action is easy.  Here's a method."
draft: false
image: "https://i.imgur.com/vsKdQVh.jpg"
layout: post
metaKeywords: "js, react, redux, middleware, redux middleware, every action"
tags:
- "js"
- "react"
- "redux"
title: "How to Write Middleware for Redux"
---

Writing middleware for Redux that gets executed on every action is easy.  Here's a method.

<!--more-->

## Execute on Every Action

Redux middleware is great for a case where you'd like to do something every time an action is dispatched to Redux.  The scenario we'll look at is alert dismissal.  It's common to have alerts pop up in the UI as different things happen in an app.  In this case, we're going to look at automatic alert dismissal.

In this app, any action payload can contain an `alerts` array.  For those alerts that have no real user call to action -- for instance, "this action succeeeded" types of alerts -- we'll let the system auto dismiss those.  We'll accomplish this via a Redux middleware.

## Structure of Middleware

A Redux middleware is a function that returns a function that returns a function.  The first function gives you access to the redux `store`, the 2nd gives you access to the `next` function which you'll need to call in order to continue the middleware chain, and finally the last function gives you access to the current `action`.  This structure can be written like:

```js
const alertDismissal = store => next => action => {
  // alert dismissal things here...

  return next(action)
}
```

## Dismissing Alerts

Now to do the real work of dismissing the alerts.  We won't cover the reducer implementation here; just know that alerts can be added to or deleted from a collection of alerts in the store.  If any action has an `alerts` array, it'll be *added* to the alerts collection.  If any of those alerts are of type `SUCCESS`, we'll queue up a new action (`dismissAlert`) that will eventually delete that specific alert.  Because there may be multiple alerts, we'll also stagger their dismissal so they can be animated to fly off-screen in rapid sequence.  That setup might look like:

```js
import * as actions from './actions'

const delay = 1000

const alertDismissal = store => next => action => {
  if (Array.isArray(action.alerts)) {
    action.alerts
      .filter(alert => alert.level === 'SUCCESS')
      .forEach((alert, i) => {
        setTimeout(_ => {
          store.dispatch(actions.dismissAlert(alert.id))
        }, delay * (i + 1))
      })
  }

  return next(action)
}

export default alertDismissal
```

Then we make sure to export this function in preparation for the next step.

## Add Middleware to Store

To add a Redux middleware to the Redux store, in the Redux store initialization we use the `applyMiddleware` function from `redux`.  That might look like:

```js
import { applyMiddleware, combineReducers, createStore } from 'redux'

import alertDismissal from '../../alerts/middleware/alert-dismissal'
import * as reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  alertDismissal
)(createStore)

const rootReducer = combineReducers(reducers)

const store = createStoreWithMiddleware(rootReducer)

export default store
```

There's a fair amount of tying it all together in there, but the `applyMiddleware` call is the most interesting to this exercise.

Now the next time you dispatch any action payload that has an `alerts` array, you'll be on your way to auto dismissal via Redux middleware.
