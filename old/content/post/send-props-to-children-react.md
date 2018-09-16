---
layout: post
title: "Send Props to Children in React"
date: "2014-08-12"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
description: Sometimes you'll want to pass properties from a parent component to children components.  Here's how to do it.
metaKeywords: js, react, components, render children, this.props.children, child props, child properties
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

In React, you're always making components.  Sometimes components are standalone.  Other times, you'll have components that can nest children components.  Sometimes you'll want to send properties to the children components from the parent as often as a doting parent wants to send packages to a child missionary.  It's possible, it's simple, and it's not documented super well.  Here's one method.

<!--more-->

*Updated: 29 Apr 2016 for React 15.x.*

## Children Components

When parent components are rendered, they have access to a special property, `this.props.children`.  It's like an Angular `ng-transclude` or an Ember `yield`.  Children components are generally rendered something like this:

```js
function Parent(props) {
  return (
    <div id="iAmParentHearMeRoar">
      {props.children}
    </div>
  )
}
```

The generic example above shows simply how to render children, `props` untouched, within a parent component.  Sometimes, however, a parent wants to bequeath its children with extra properties.  How will we make that happen?

## Setting Child Props

`props` are meant to be immutable.  But, in order for us to send `props` values to our children, we're going to essentially loop through our children and set props on them as a part of our parent `render` function.

Deep breath.  It's ok.  The children that we'll loop through aren't mounted component instances.  They are, instead, [descriptors](http://facebook.github.io/react/blog/2014/07/17/react-v0.11.html#descriptors).  These descriptors have all the `props` attributes that we've declared should be put on the components, but they haven't been rendered yet.  Because of this, we can change props, and it's ok.  We're not mutating what has rendered.  The data still hasn't flowed to the children.  We're still effectively still riffing on the logic of what the children components should really be when they're eventually mounted.

## Looping on Children Components

`this.props.children` is a funny property.  It's special in more ways than one.  The things that might trip us up in looping is that even though it sounds like a plural thing, meaning an array, sometimes it's a singular object.  To help avoid potential problems, React gives us a helper, `React.Children`.  It has a few functions for array iteration, such as `map` and `forEach` that help account for the potential forms of `this.props.children`.

## Functional Modifications

Immutable data is a big part of functional programming.  This means that when we 'mutate' the props, we want to mutate on a clone of the child component without affecting the original.  There's an input, there's an output, and the input is untouched.  Once we have our cloned children components as we want them, we'll render those instead.  React offers another great helper for cloning components and setting properties in a single function, `React.cloneElement`.

## Checking Child Type

It's a generally-useful thing to be able to tell what the React class type of a component object is.  It's an applicable skill in terms of looping through child components because we might not want to modify the properties of all types of children.  Each React component class has a `type` attribute accessible via `MyComponent.type`.  This attribute is also available on component descriptors.

## A Child CheckOption Example

To bring this all together and illustrate the concepts, let's say we created a `RadioGroup` component that could take one or many `RadioOption` child components.  In raw html, which is what our component will eventually render, `input`s with type `checkbox` need to all have the same `name` attribute value to work well as toggles within the group.  But this is something that React can help us not have to duplicate.  We'll instead put a `name` property on the parent `RadioGroup` and have it transfer it as a property on all its children.  The implementation might look like this:

```js
import React from 'react'

function RadioOption(props) {
  return (
    <label>
      <input type="radio" value={props.value} name={props.name} />
      {props.label}
    </label>
  )
}

function renderChildren(props) {
  return React.Children.map(props.children, child => {
    if (child.type === RadioOption)
      return React.cloneElement(child, {
        name: props.name
      })
    else
      return child
  })
}

function RadioGroup(props) {
  return (
    <div class="radio-group">
      {renderChildren(props)}
    </div>
  )
}

function WhereImUsingRadioGroups() {
  return (
    <RadioGroup name="blizzard-games">
      <RadioOption label="Warcraft 2" value="wc2" />
      <RadioOption label="Warcraft 3" value="wc3" />
      <RadioOption label="Starcraft 1" value="sc1" />
      <RadioOption label="Starcraft 2" value="sc2" />
    </RadioGroup>
  )
}
```

<a class="jsbin-embed" href="http://react.jsbin.com/jahekimigi/embed?js,output">Example on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>

In this example, where the parent `RadioGroup` has the `name` prop, it will be given to each of the children so their `name` prop will match and the radio group will work as expected.  Thus, the hearts of the children are turned toward their fathers.

Is there a better way to do this?  How have you been sending `props` to children?
