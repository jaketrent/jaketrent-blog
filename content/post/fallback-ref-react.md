---
categories:
  - "Code"
comments: true
description: "Make a component that can receive an external ref and ensure an internal ref."
image: "https://i.imgur.com/TYItPJO.jpg"
layout: post
metaKeywords: "react, ref, forwardRef, ref initial value, ensure ref, fallback ref"
draft: false
tags:
  - "js"
  - "react"
title: "Fallback Ref in React"
date: "2019-05-22"
---

Sometimes you want a React component that can receive a ref from `React.forwardRef` and also is guaranteed to have a ref if it's not forwarded.

<!--more-->

## Forward a Ref

In terms of React 16.x APIs, the only way for a custom component to receive a ref from the outside is via the `React.forwardRef` API.  This can be useful when some outside component needs access to a DOM node rendered inside the custom component.

From the outside, if one has a ref:

```js
const ref = React.createRef()
// later...
<Button ref={ref}>Focus Later</Button>
```

And has a custom component that can receive it with `forwardRef`:

```js
const Button = React.forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>
})
```

That `ref` parameter will be available to apply to the inner DOM node of `<button />`.  Now, something like `ref.current.focus()` is available from the outside.

## Fallback Ref

Then in addition, what if we wanted to make sure that the ref was *always* available internally to the custom component as well.  This could allow the button, for instance, to be autofocused.  But if a ref was not passed in to be forwarded, we need to ensure a ref to fall back to:

```js
const Button = React.forwardRef((props, ref) => {
  if (!ref) ref = React.useRef()

  React.useEffect(_ => {
    if (props.autofocus)
      ref.current.focus()
  })

  return <button ref={ref}>{props.children}</button>
})
```

The key line is:

```js
if (!ref) ref = React.useRef()
```

Simply check for the existence of a forwarded ref.  If there isn't one, create one.

I would have thought one might be able to use any potentially-forwarded ref as the `React.useRef(forwardedRef)` initial value, but that doesn't seem to work.

Now, `ref.current` from *inside* the component is always going to be defined.

How else do you handle this kind of need to always have an overrideable ref?


