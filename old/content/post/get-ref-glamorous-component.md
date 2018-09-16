---
categories:
- "Code"
comments: true
date: 2017-09-05T07:35:50-06:00
description: "Accessing a glamorous component's ref is a bit different."
draft: false
image: "https://i.imgur.com/eSnz3C4.jpg"
layout: post
metaKeywords: ""
tags:
- "css-in-js"
- "css"
- "glamorous"
title: "Get ref for Glamorous Component"
---

Accessing a glamorous component's `ref` is a bit different.

<!--more-->

## Normal ref Access

In React, the [`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html) is an attribute on a component that allows you to access the actual DOM element that the component is bound to.  This is important for anything that requires direct DOM access, such as focus control.

The `ref` prop takes a callback function whose parameter is the DOM element.  So to save a reference to the DOM element, one might write:

```js
class MyComponent extends React.Component {
  componentDidMount() {
    console.log(this.el)
  }
  render() { 
    return <div ref={el => (this.el = el)}>some ui</div>
  }
}

// outputs <div /> DOM node
```

## Glamorous Difference

[Glamorous](https://glamorous.rocks/) is different, however.  If you create a Glamorous component and then put a `ref` prop on it, you get something different:

```js
import glamorous from 'glamorous'

const SomeUi = glamorous.div({ some: 'styles' })

class MyComponent extends React.Component {
  componentDidMount() {
    console.log(this.el)
  }
  render() { 
    return <SomeUi ref={el => (this.el = el)}>some ui</SomeUi>
  }
}

// outputs ThemedComponent (glamorous) backing instance
```

This is somewhat unexpected.  Instead, glamorous gives you a new prop to use: [`innerRef`](https://glamorous.rocks/advanced#innerref).

Adjusting the example above, we can make this all better by using `innerRef`:

```js
return <SomeUi innerRef={el => (this.el = el)}>some ui</SomeUi>
```

## Wrapping the New API

From the outside, however, I don't want clients of my component to care if I use glamorous internally for styling or not.  I also want them to be able to send in `ref` normally if they need to access the DOM element.

To accomplish this we always wrap a glamorous component with another non-glamorous React component so we can make the translation:

```js
import glamorous from 'glamorous'

const SomeUi = glamorous.div({ some: 'styles' })

class MyComponent extends React.Component {
  componentDidMount() {
    console.log(this.el)
  }
  render() { 
    return <SomeUi innerRef={this.props.ref}>some ui</SomeUi>
  }
}
```

So that when I use this component, I can use `ref` as I'd normally expect:

```js
<MyComponent ref={el => (this.childEl = el)} />
```

What do you think?  Is this a good idea?  How would you make `ref` usage predictable in this case?

