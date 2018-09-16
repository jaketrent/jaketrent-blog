---
categories:
- "Code"
comments: true
date: 2017-11-10T07:37:48-07:00
description: "How to change parent style when a child element is focused."
draft: false
image: "https://i.imgur.com/YUi6zHr.jpg"
layout: post
metaKeywords: "parent selector, child focus, change parent, traverse parent, react, javascript, css"
tags:
- "js"
- "css"
- "react"
title: "Change Parent Upon Child Focus in React"
---

Here's how to change a parent element's style when a child element is focused.

<!--more-->

## Parent Selector

It would be awesome if we could do this in CSS.  Alas, there is no parent selector in CSS today.  Maybe someday. 

In CSS, we can style the element itself when it's focused: 

```css
.element:focus { color: 'thatfocusedcolor'; }
```

And we can style _children_ when a _parent_ is focused:

```css
.some-parent:focus .some-child { color: 'thatfocusedcolor'; }
```

But we _can't_ traverse _upward_ in pure CSS.  But we can accomplish this with some extra state and event handlers in JavaScript.

## Capturing Focus in React

There are two easily-understood event handlers for knowing if something is focused in React: `onFocus` and `onBlur` (for unfocusing).

We attach them to the child element we're checking to see is focused or not:

```js
<button className="some-child" 
     onFocus={someFunction}
     onBlur={someOtherFunction}>Some child!</button>
```

Now we need to implement the functions that will be called for the `onFocus` and `onBlur` events.

## Styling a Parent in React

These functions will most effectively be implemented in the parent component.  This is because it is the parent that needs to know whether the child is focused or not.  So the parent will store some internal `isFocused` state:

```js
class SomeParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isFocused: false }
  }
  // ...
}
```

`isFocused` will start `false`, but it'll change as focus events fire on the child.  When focused, it should switch to `true` and back to `false` on blur.  Let's expand the parent code:

```js
class SomeParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isFocused: false }
  }
  render() {
    return (
      <div className={this.state.isFocused ? 'box focused' : 'box'}>
        {React.cloneElement(this.props.children, {
          onFocus: _ => this.setState({ isFocused: true }),
          onBlur: _ => this.setState({ isFocused: false })
        })}
      </div>
    ) 
  }
}
```

We are using `React.cloneElement` to allow the [parent to set `onFocus` and `onBlur` props](/post/send-props-to-children-react/) on the child without having to define them on the child outside of the `SomeParent` component.  Usage of the component would look like:

```html
<SomeParent>
  <button>Some child!</button>
</SomeParent>
```

Now we are left to implement the special `.focused` css selector that's being toggled on and off to see the style change. Try out [this example on jsbin](http://react.jsbin.com/kimujusoqu/1/edit?css,js,output) to see it in action.  Click in the "Output" pane and press the tab key to change focus.

It might also be worth noting that the child must be focusable in order to fire the focus/blur events.  In this case, we're using a natively-focusable element, `button`.  But you can [make other things focusable](/post/accessibility-potential-tab-index-values/) as well.

How do you control parent elements' style when child elements get focus?
