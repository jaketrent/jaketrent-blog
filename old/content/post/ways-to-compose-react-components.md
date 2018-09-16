---
categories:
- "Code"
comments: true
date: 2017-05-09T07:12:18-06:00
description: "React favors composition over inheritance.  There are several useful ways to compose components in React."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "js, react, composition, inherit, super class, children, wrap, higher-order component"
tags:
- "js"
- "react"
- "composition"
title: "Ways to Compose React Components"
---

React favors composition over inheritance.  There are several useful ways to compose components in React.

<!--more-->

Composition is a way to get polymorphic behavior in a way that's often more flexible and easy to work with than is inheritance.  If we want a component to behave differently but want to reuse some common component code we've already created, composition can be a good way to do that.  There are many ways to get multiple React components to compose together.  These are some of my favorites.

## Wrap Children

There is a special prop in React called `props.children`.  This refers to any elements that are surrounded by the parent element.  This jsx shows that relationship:

```html
<Parent>
  <Child />
  <Child />
</Parent>
```

There is an opening and closing `<Parent />` tag, and the children are contained between them.  Usually when using `props.children`, the only relationship between parent and child is a UI hierarchical or stylistic one.  There is a visual relationship because of the UI element nesting.  Thus this fits a loose definition of composition.  But they do work together to a greater whole, with the parent getting common reuse.

## Special Children

We can compose children by coupling the parent to expect special children to be passed.  These special children could be child elements that work especially well in conjunction with the parent element.  Examples could be elements that work well together, such as a table container and table cells.  Knowing what to expect in these special children, the parent can pass things like props to those children:

```js
import React from 'react'

const SpecialChild = props => <div>{props.specialness}</div>

const Parent = props => 
  <div>
    {React.Children.map(props.children, child =>
      child.type === SpecialChild 
        ? React.cloneElement(child, { specialness: 'somethingFromParent' })
        : child
    )}
  </div>
```

For more details, see this [Send Props to Children in React](/post/send-props-to-children-react/) article.

## Values as Props

One simple way to make a component perform differently is to change it via `props`.  Passing a value, such as a primitive like a number or string, is so common we usually don't consider it composition.  It's accomplished by passing attributes to the jsx:

```js
const GiveMeValues = props =>
  <div>{props.orGiveMe}</div>
  
<GiveMeValues orGiveMe="death" />
```

## Components as Props

Instead of primitive values, we can also pass renderable React compoonents as `props`.  This acts just as `props.children` does.  The biggest advantage gained here is that we can pass more than one component.  The `props` can also be assigned semantic names. For example:

```js
const Title = _ => <h1>Composition!</h1>
const SubTitle = _ => <div>Over Inheritance -- Literally</div>
const Header = props =>
  <header>
    {props.title}
    {props.subtitle}
  </header>
  
<Header title={<Title />} subtitle={<SubTitle />} />
```

And all the display logic for the display of the passed component is encapsulated within the passed component.  Here specifically, the `Header` component decides the layout of props within the header, but the `Title` component itself decides which level of heading to use.

## Override Methods

Inheriting from a superclass gives the classic opportunity to override methods in the subclass.  We can do this in React as well, even without the existence of pure component inheritance.  In the common/super component, we can provide the default method implementation.  If there is a specific/sub component that wants to reuse most of the common component but override some of the methods, it can do so:

```js
import React from 'react'

const defaultHandleClick = _ => alert('common clicked')
const Common = props =>
  <button onClick={props.handleClick ? props.handleClick : defaultHandleClick}>Click me</button>

const overrideHandleClick = _ => alert('specific click')
const Specific = _ =>
  <Common handleClick={overrideHandleClick} />
```

This wrapping common components inside a specific component is a method of composition for more than just function overrides.  The same can be done with values or components. 

## Higher-order Component

A higher order component is function that takes a React component and returns a new component, augmented with new functionality.  It wraps the component in place, giving you a component that has had more useful functionality composed right into it.

Writing a higher-order component is easy.  Just return a React Component from a function.  Usually the trickier part to think about is how the higher-order component will get the data or functionality it needs to be interesting.  

To receive this data, a higher order component is often a function that returns a function that returns a new component.  This is because that first function is used to pass in the data needed for the cool new functionality.  The second function is used to pass in the original component being wrapped.  (ie, the signature is: `data -> original component -> new component`).  

Here's a quick snippet on a higher-order component that overrides styles of the original component being wrapped.

```js
import React from 'react'

const OriginalComponent = props => <div style={props.style}>Style me</div>

const HigherOrder = newStyle =>
  originalComponent =>
    props => originalComponent({ 
      ...props, 
      style: { ...props.style, ...newStyle } 
    })
    
// wrapped
const AlwaysRed = HigherOrder({ color: 'red' })(OriginalComponent)

// then used as a new component
<AlwaysRed />
```

There are many super-useful React components that take this approach, such as [`react-redux`'s `connect`](https://github.com/reactjs/react-redux) and [`react-styleable`](https://github.com/pluralsight/react-styleable).

This is a handful of common, useful methods of composition in React components.  What else have you used to compose components that you find useful?
