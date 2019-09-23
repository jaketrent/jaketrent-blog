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

## Connect Refs with useImperativeHandle

Then in addition, what if we wanted to make sure that the ref was *always* available internally to the custom component as well?  This could allow the button, for instance, to be autofocused.  This needs to be available independent of `React.forwardRef` forwarding anything while also being compatible with it when it does.  

The [React docs recommend using `React.useImperativeHandle`](https://reactjs.org/docs/hooks-reference.html#useimperativehandle).  This is an odd API that allows you to define an internal ref and then expose certain aspects of it, imperatively, to the outside ref.  Per the docs, it "customizes the [ref] value that is exposed to the parent components when using ref" and "should be used with forwardRef".  Okey dokey, that might look like:

```js
const Button = React.forwardRef((props, ref) => {
  const innerRef = React.useRef()

  React.useImperativeHandle(ref, _ => ({
    focus: _ => {
      innerRef.current.focus()
    }
  })

  React.useEffect(_ => {
    if (props.autofocus)
      innerRef.current.focus()
  })

  return <button ref={innerRef}>{props.children}</button>
})
```

This ensures the `innerRef` is always available because we define it internally (for use in autofocus).  But we have to do this lame mapping to the outside world, telling the outside `ref` that it can now `focus()` properly.  This is lame mostly because we have to do this *for every function* we might want to call on it: `focus()`, `blur()`, and any of the other properties of methods of [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) we might need.

The problem is that we need to *anticipate* those needs.  It forces the component to anticipate beforehand that which is either a bloated list of needs, up to and including *all* properties or an insufficient list, not anticipating the *correct* needs.  This might be ok for an app developer who owns both the component and the consuming app.  It's a bigger problem for anyone making reusable components. It's not like there's a Ruby-like `method_missing` that we can implement to forward properties and methods to the `innerRef`.

## Conditional useRef

But maybe there's an alternate solution.  If a ref is not forwarded, we can simply create one at that point.  That might look like:

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

This seems much simpler and avoid the `React.useImperativeHandle` mapping. The key line is:

```js
if (!ref) ref = React.useRef()
```

Simply check for the existence of a forwarded ref.  If there isn't one, create one.

I would have thought one might be able to use any potentially-forwarded ref as the `React.useRef(forwardedRef)` initial value, but that doesn't seem to work.  That seems to be the next logical step in `useRef` becoming better.

Now at least `ref.current` from *inside* the component is always going to be defined.

But this might make you a bit uneasy.  It has the potential to break the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html), specifically: "Don’t call Hooks inside loops, conditions, or nested functions."

Or, if you use eslint, [it'll cry at you](https://www.npmjs.com/package/eslint-plugin-react-hooks).  Just tell it to go cry in a corner with `eslint-disable-line react-hooks/rules-of-hooks`.

If you're willing to guarantee that:

- A ref, once given, will always be given
- And, if a ref is not given on first render, it will never be given

Then you're safe.  Then the hooks will be called in the exact same order every render cycle.  And in practice, with the way refs are used, these guarantees will be normal to keep.  

This seems to be a good enough solution for now.  I've got to think that better options will be baked into future React versions.  `React.useRef(forwardedRef)` is currently my favorite.  Let it handle the ref merging.  Or perhaps I'm look at this in the totally wrong way.  How do you, personally, solve this problem?

## Update: An Even Simpler Solution?

Perhaps there's an even simpler solution. If there is, this post can get simplified dramatically.


How about this:

```
const Button = React.forwardRef((props, forwardedRef) => {
  const ref = React.useRef()
  React.useImperativeHandle(forwardedRef, () => ref.current)

  // ...
})
```

Is this a proper use of `React.useImperativeHandle`?  

Does it do what I hope it does: Allow the internal ref to be exposed externally, forwarding all external references and operations?  (Because this'd be way nicer than having to map everything manually (as in the autofocus example above).

