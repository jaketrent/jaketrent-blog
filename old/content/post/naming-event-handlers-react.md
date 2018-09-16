---
categories:
- "Code"
comments: true
date: 2017-03-09T19:49:20-07:00
description: "Naming's a hard problem, right?  Here are a few of my naming conventions for React or event handling in general."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "event handler, pub sub, react, naming, naming convention"
tags:
- "js"
- "react"
title: "Event Handler Naming in React"
---

Naming's a hard problem, right?  Well, coming up with the names can be hard.  After that, it's just a simple matter of typing.  Here are a few of my naming conventions for React or even handling in general.

<!--more-->

## For props

When defining the prop names, I usually prefix with `on*`, as in `onClick`.  This matches the built-in event handler convention.  And by matching it, we declare that these props will house similarly-used event handler functions.

## For Function Names

For the function names, I follow the exact same pattern, but I replace `on` with `handle*`, as in `handleClick`.  Together, it'd look like:

```
<MyComponent onClick={handleClick} />
```

So `on` is describing what actual event this will be tied to.  `handle` is describing what will be called when that event fires.

Note that I use the same verb, `Click` above, as well.  This is instead of other options, such as what happens in business terms when a click happens.  If, say, an alert dialogue is dismissed when the click happens, some might want to call the function `handleDismiss` or something like that.  I keep the verb from the actual action.  I like the mapping of the name better that way.  Often the semantic action that occurs is identified some other way internal to the event handler.

## More Complicated Naming

More complicated naming here isn't nearly as complicated as [it could be](https://en.wikipedia.org/wiki/Spanish_naming_customs).  Just think of cases where there are more events and more handlers.

If there are alerts and a form, for instance, naming might come out as:

- `onAlertClick={handleAlertClick}`
- `onFormSubmit={handleFormSubmit}`

Word order-wise, I like to put the noun first (`Alert`), then the verb (`Click`).  Then, as other events pile up around that concept, they are grouped together nicely alphabetically, such as:

- `onAlertClick={handleAlertClick}`
- `onAlertHover={handleAlertHover}`

## Component Splitting

Where to split your components is a topic for much discussion and an art for each to find their way in.  Related to naming specifically, one more thought:  Just as with other things, if you are getting lots of event handler definitions in one module, it's likely you have missed your abstraction and could split it up to find better encapsulation.  For example, one file, `form.js`, with:

- `onRegistrationSubmit`
- `onLoginSubmit`

could split into two files with simpler names:

- `onSubmit` in `registration-form.js`
- `onSubmit` in `login-form.js`

## Using Built-in Handler Names

There are several event handlers built into React, such as `onClick` and `onSubmit` which will always fire when those events happen, say on a `button` or `form` as intended.

Take care when using these names, however, when passing event handlers to your custom components.  You don't want to inadvertanly have something be clickable.  An example of where I've gotten in trouble with this is in spreading the props onto an element in my component.  Something like this could turn out to be a problem, depending on usage:

```js
function MyComponent(props) {
  return <div {...props}>Stuff that might really need the onClick...</div>
}
```

If I pass an `onClick` prop to the component so it can be used somewhere internally, but I unpack all the props on anything else, I'll need to be more careful with the naming so-as to not make that `div` clickable where I didn't want it to be.

What other conventions do you find useful for your React event handlers?
