---
categories:
- "Code"
comments: true
date: 2017-07-10T07:44:37-06:00
description: "Dispatched action types must be unique.  Namespacing can help."
draft: false
image: "https://i.imgur.com/yJI8sI6.jpg"
layout: post
metaKeywords: "redux, redux-types, redux actions, unique redux action names"
tags:
- "redux"
title: "Namespace Redux Action Types"
---

Dispatched action types must be unique.  Namespacing can help.

<!--more-->

## Redux Actions

Redux actions represent the important things that your app can do.  "Important" might consist of things that need to be saved or things that the app as a whole might want to know about.  Actions are represented as plain old JavaScript objects that have a `type` property and arbitrary other properties.  These actions are all sent through a central dispatcher to be dispersed to other interested parts of the app.

## Redux Action Types

The actions are just plain old objects, so the specialized `type` property helps set them apart.  The existence of `type` identifies the object as a Redux action.  The value of `type` distinguishes this action compared to others actions so you know which is which.

## Similar Actions

Often, you have similar-sounding actions across different domains in your app.  For instance, on a blog, you would have `users` and `posts`.  You might have a page listing the users and another page listing the posts.  To get these resource lists, you're probably doing something like an API fetch for each.  But we would have a problem if we wrote `users/actions.js` with:

```js
export const fetch = _ => ({ type: 'FETCH' })
```

And `posts/actions.js` with:

```js
export const fetch = _ => ({ type: 'FETCH' })
```

The `type` is exactly the same, and these, like other actions, are all dispatched through the central store and will be indistinguishable from one another.

## Namespacing Action Types

Namespacing your actions is an easy solution to this issue.  Just prepend some pattern to the front of each of these `'FETCH'` types to make them unique in the whole app.  It makes the most sense to me to namespace acccording to the domain (ie, `users` or `posts`).

We can simply add the string prefix ourselves or we can be a little more automatic with a helper library, [redux-types](https://www.npmjs.com/package/redux-types).  To use it, install with:

```bash
npm install redux-types --save-dev
```

Then in `users/actions.js`, you can write:

```js
import types from 'redux-types'

export const TYPES = types('users', 'FETCH')

export const fetch = _ => ({ type: TYPES.FETCH })
```

We'd write the similar thing in `posts/actions.js`.

This will create actions that have `type`s that look something like:

```json
{ "type": "users/FETCH" }
```

And we're set.

What other tactics do you take to keep your action types unique?
