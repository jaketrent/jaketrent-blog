---
layout: post
title: "Using JavaScript's Function Bind"
date: "2015-06-26"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "bind"
  - "react"
description: JavaScript's Function.prototype.bind is a great tool to give you control over the this keyword.
metaKeywords: js, function, bind, function.prototype.bind, partial function application, context, react
draft: false
image: https://i.imgur.com/4huM3Xb.jpg
---

JavaScript's Function object has a very helpful method, `bind`.  It is a great tool to give you control of the ever-squirrely `this` keyword.  Have you ever had trouble predicting what `this` will be or making equate to what you want?  `bind` will help you do that with more power and consistency.  It can also help you with partial function application.

<!--more-->

## The `this` Keyword

In JavaScript, what the `this` keyword refers to changes often.  This can be useful but also unexpected.  Generally `this`, used within a function, will refer to the context in which that function was called. That calling context might be the global context of `window` if an event callback is being called in a browser.  That calling context might be an object that contains the function.  For more specific cases, MDN has some [great docs on the variety of contexts referred to by `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

## Controlling `this` with `bind`

When writing code, I often am thinking of `this` in the context in which I'm writing.  In other words, if I'm writing an object and use the keyword `this` in a function, I would normally expect `this` to refer to the object in which I *declared* the function.  But, again, it is actually the *calling* context that actually determines the value of `this`.
 
To change this default behavior, I can pre-bind the function's value of `this` to a value of my choosing.  This will happen at the time of *declaration*, which is what I more naturally would expect.

For example, in [React](http://facebook.github.io/react/) we write UI components.  In interesting UIs, we're often handling events like those that occur with user interaction.  Normally events in the browser are attached to the DOM and are executed in the context of the `window`.  This being the case, it'll be hard for us to create an event handler function in our React Component that can refer back to anything of use in the React Component itself.  

As a simple example, we'll write a `handleClick` function that wants to call the Component's `doLog` function for interesting logging:

```js
class MyComponent extends React.Component {
  doLog() {
    console.log('Yay, you clicked!')
  }
  handleClick() {
    console.log('this is window?', 
                this == window)
    console.log('this is component?',
               this.constructor.name == 'MyComponent')
    this.doLog()
  }
  render() {
    return (
      <div>
        <h1>Time to start clicking</h1>
        <button onClick={this.handleClick}>So, click</button>
      </div>
    )
  }
}

React.render(<MyComponent />, document.getElementById('app'))
```

[jsbin of broken state](http://jsbin.com/lixayanoso/edit?js,console,output)

If you click the button, `this.doLog` is not available as a function.  How could it be?  `doLog` is defined in `MyComponent`, not the `window`, which is the original context in which the event callback is executed.  

To fix this, one need only pre-bind the `handleClick` function.  By changing one line, we can fix this:

```js
<button onClick={this.handleClick.bind(this)}>So, click</button>
```

When this line is executed, it's in the `MyComponent#render` function, thus the `MyComponent` context.  So `this`, at that moment, is `MyComponent`.
 
The other detail that makes this work is that `bind` returns a *brand new function*.  That's how the pre-binding works.  So, the `onClick` prop that gets given to the `button` is a new function where we have said we want to permanently control the value of `this` to be whatever we bound it to.

[jsbin of fixed state](http://jsbin.com/luwoxegopu/edit?js,console,output)

## Passing Specific Arguments with `bind`

Another great reason to use `bind` is to pass specific arguments to a function.  Just as `bind` can create new functions where the value of `this` is pre-determined (bound), `bind` can pre-fill (ie, partially apply) function arguments on the newly-created function.

It may not be immediately intuitive why one would want to create a function with parameters just to turn around and permanently make it so an argument to the function equals a specific value.  It almost feels like hard-coding a wart-ridden value on something that was previously dynamic and beautiful.  Perhaps an example will help.

Again, to the world of React...  As in the previous example, we'll pass an event handler for a click event.  Notice, just as above, that we're passing the function itself (`this.handleClick` above) instead of the return value of the function (which would look like `this.handleClick()`).  In this example, we'll have several click handlers, each on a list item, where the button will function as a remove button:

```js
class Item extends React.Component {
  render() {
    return (
      <li>
        {this.props.text}
        <button onClick={this.props.onRemove}>Rm</button>
      </li>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: this.props.initalItems }
  }
  handleClickRemove(index) {
    var clonedItems = this.state.items.slice()
    clonedItems.splice(index, 1)
    this.setState({ items: clonedItems })
  }
  render() {
    return (
      <ul>
        {this.state.items.map((item, i) => {
          return <Item text={item} onRemove={this.handleClickRemove.bind(this, i)} key={item} />
        })}
      </ul>
    )
  }
}

React.render(<List initalItems={['Do', 'More', 'Reakt']} />, document.getElementById('app'))
```

[A working jsbin](http://jsbin.com/cinovebasu/edit?js,console,output)

In `List`, we have the event handler, the `handleClickRemove` function, that takes an `index` parameter.  In order to make this function work as defined, we are using `bind` on this line:

```js
return <Item text={item} onRemove={this.handleClickRemove.bind(this, i)} key={item} />
```

This `bind` call is doing a few things for us:

1. Pre-binding `handleClickRemove` to the `List` Component so that `this.setState` works inside the callback.
2. Creating a new function that always has `i` as its first parameter.  Since this line is executed in a loop, `i` changes.  It will be `0` for the first item, `1`, then `2`.  This is perfect, as we want the first remove button to remove the first item, and so on.

Isn't that awesome and useful?

So `bind` can help make `this` more predictable for you.  It will help you send new functions with pre-filled parameters.  What else have you used `bind` for?    
