---
categories:
  - "Code"
comments: true
description: "How to mock the fetch function in a jest test"
image: "https://i.imgur.com/XEZUK03.jpg"
layout: post
metaKeywords: "jest, mock, stub, fetch, avoid network, unit test, mock fetch"
draft: false
tags:
  - "unit-testing"
title: "Mock Fetch in a Jest Test"
date: 2020-07-29T07:29:40-06:00
---

This is a way to mock the `fetch` function in a Jest test.

<!--more-->

## Why Mock Fetch

We are probably using [test fakes](/post/sinon-spies-vs-stubs/) to avoid testing dependencies.  In the case of `fetch`, we want to avoid the dependency of the network and whatever endpoints we might be making requests to.

Avoiding the network will make our test [less real-life](/post/tests-that-really-test/) and provide [less ROI](/post/testing-pyramid-shows-roi/) in general. It'll also make our test easier to control, allow a precise assertion, avoid testing the world, and make it faster to run.

## Set up a Fetch Stub

To use a more precise term than "mock", we will set up a `fetch` "stub" implementation. This is the fake version of `fetch` that we'll use instead of the real deal:

```javascript
function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      })
    })
  }
}
```

This `fetchStub` will always return a json response of the data that we set it up to return.

## Mock Global Fetch

`fetch` exists on the `global` object, usually `window` in the browser. Before the test, we want to replace the real `fetch` with the fake/stub one:

```javascript
jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))
```

Then at the end of the test, we want to make sure we undo that action so that any other test that may need to real/native `fetch` implementation in tact, has it to use.

```javascript
global.fetch.mockClear()
```

There is the potential that those functions won't work as described.  You may get an error like:

```
Cannot spy the fetch property because it is not a function; undefined given instead
```

You'd get this if your test environment's `global` object doesn't have `fetch` defined on it. Since you're not running Jest in a browser, it's using a [jsdom](https://github.com/jsdom/jsdom) implementation that may not have it.

In this case, as an alternative, you can run setup with:

```javascript
global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
```

And cleanup with:

```javascript
global.fetch.mockClear()
delete global.fetch
```

## A Jest Test with Fetch

All together, that Jest test that stubs out `fetch` might look like:

```javascript
it('doesnt really fetch', async () => {
  const fakeData = { fake: 'data' }
  jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))

  const res = await fetch('anyUrl')
  const json = await res.json()
  expect(json).toEqual({ data: fakeData })

  global.fetch.mockClear()
})
```

Do you have a better way to accomplish the same job here?
