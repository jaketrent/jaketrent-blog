---
categories:
- "Code"
comments: true
date: 2017-03-06T06:06:18-07:00
description: "Things happening too fast?  Want an offset?  Pause your saga in redux-saga."
draft: false
image: "https://i.imgur.com/lXOETiM.jpg"
layout: post
metaKeywords: "js, redux, redux-saga, setTimeout, timeout, pause"
tags:
- "js"
- "redux"
- "redux-saga"
title: "Pause in Redux Saga"
---

Your code running too fast?  Do you just want a timing offset for some reason?  If you have a long-running, complicated action that you're running already, it's likely you're using the fantastic [redux-saga](https://github.com/redux-saga/redux-saga).  Here's a way to pause execution with a redux-saga-managed action.

<!--more-->

## Write the Pause Function

First let's write the pause function.  This function has to do nothing more than hang out for a while.  The easiest way to do nothing is to call `setTimeout`.  Let's do that.  To make our async function work well in the context of redux-saga, we'll return a `Promise` that takes a moment to resolve:

```js
export default function pause(delay) {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve()
    }, delay.millis)
  })
}
```

This function now acts like any other async function that your saga might call, such as an api call.

## Calling Pause

For a quick scenario, let's say that we have an action around alerting, where we want to dismiss all alert dialogs from our UI.  Each alert will animate out when it is dismissed.  We want a timing offset between each that will make them look staggered as they animate off-screen.  To accomplish this, we'll pause for increasingly-long amounts of time before dismissing each one:

```js
import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import pause from '../common/pause'

const pauseStepDefault = 700

export function* dismissAll(alerts, pauseStep = pauseStepDefault) {
  const ids = alerts.map(a => a.id)
  for (let i = 0; i < ids.length; ++i) {
    yield call(pause, { millis: pauseStep * (i + 1) })
    yield put(actions.dismissAlert(ids[i]))
  }
}
```

Note that the `pause` function that we wrote is simply called with the `call` effects helper that we're used to using in redux-saga.  The `actions.dismissAlert` function is implemented elsewhere and not necessarily germane to this pattern.  This implementation requires your alerts to have an `id` property.  Also note the use of the `for` statement as opposed to a `forEach` with anonymous function.  This is done to simply and avoid nesting generator functions.

Pretty cool, right?  Who knew pausing to take it all in could be so rewarding? #slowdown

What are some other cool async actions that you've implemented with redux or redux-saga beyond regular 'ol api calls?
