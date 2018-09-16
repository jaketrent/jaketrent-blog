---
categories:
- "Code"
comments: true
date: 2017-10-06T07:34:25-06:00
description: "How to type props for a child component that has props cloned onto it."
draft: false
image: "https://i.imgur.com/VFvDg1d.jpg"
layout: post
metaKeywords: "flowtype props, flowtype cloneElement, flow props passed to children"
tags:
- "js"
- "flowtype"
- "react"
title: "Flowtype Props Passed to Children in React"
---

Here's how to type props for a child component that has props cloned onto it.

<!--more-->

This is for you, @nguyenmanh1507! :)

## React Clone Props onto Children

In React, you can [send props to children](/post/send-props-to-children-react/).  This is a way for a parent component to provide a child component with data it didn't already have.  

Many times this is because a parent and a child component work in tandem to create some larger UI.

## A Radio Button Example

An example of this is a radio button group that has many radio buttons.  They are tied together by a `name` field, which allows the browser to know which radios belong to the group in order to cycle through them.

That code might look something like this:

```js
import React from 'react'

const RadioOption = props =>
  <label>
    <input type="radio" value={props.value} name={props.name} />
    {props.label}
  </label>

const RadioGroup = props =>
  <div class="radio-group">
    {React.Children.map(props.children, child =>
      child.type === RadioOption 
        ? React.cloneElement(child, {
            name: props.name
          })
        : child
    )}
  </div>

const WhereImUsingRadioGroups = _ => 
  <RadioGroup name="blizzard-games">
    <RadioOption label="Warcraft 2" value="wc2" />
    <RadioOption label="Warcraft 3" value="wc3" />
    <RadioOption label="Starcraft 1" value="sc1" />
    <RadioOption label="Starcraft 2" value="sc2" />
  </RadioGroup>
```

## Flow Can't Infer the Cloned Prop

We can start type-checking this code with [Flowtype](https://flow.org) by adding a comment to the top of the file:

```js
// @flow
```

Flow immediately points out a problem to us:

```txt
9: <input type="radio" value={props.value} name={props.name} />
                                                       ^ property `name`. Property not found in
9: <input type="radio" value={props.value} name={props.name} />
                                                 ^ props of React element `RadioOption`
```

Flow can apparently infer that `label` and `value` are strings and passed in when `<RadioOption />` is used.  But it is confused about `name`, which is cloned onto the `<RadioOption />` children inside `RadioGroup`.

## Adding Types to RadioOption

We can provide some help to Flow by adding types to the `props` passed to `RadioOption`.

We can define them as:

```js
type Props = {
  label: string,
  name?: string,
  value: string
}
```

And adjust the `RadioOption` signature to read:

```js
const RadioOption = (props: Props) =>
  // ...
```

Now we have [no Flow errors](https://flow.org/try/#0PQKgBAAgZgNg9gdzCYAoVBLAtgBzgJwBcwAlAUwEMBjYqfOLMAcn0pqfUIE8cywAFejgDOYALxgA3qjBgYFAEZkYALjDDC+DADsA5gBoZYbRSxkA-Go1a9h2QDcKMAK5krmnbtQBfdFGfaNBhw2qQUACbBAPI4hMHaABQ4QsJqgnAiAJRSRqyEzvihCUayADzySjAAfCWyYKU6OM7E3LxiAET4EcHtYI4uZGKSyRnCAHT9rt7GpoPDKWMmZtPANXV186NjFcq+66XAO9VGmT5+AUEhYZFwAOL0zjhJKdnSsnkFRbWlkfZgVPJhMIOl0bgBaXQPHDtNbrKTkaiEMYAYQAFhgYOFWNoxlgKE8RiIxlR0Zjsfp-qTwuJYXDKRjwmNWnwxKzrtFYvEwLU6eZSGwkQCQmQAKIwMhmbSEBIkhkUt50xVLNxgQnjZU8xXeU6KupqWWYzWZPZ1A6-WGnXyofyBOJXADqqLIrAAklgAKrCTwkbp3KHCBKvXJkfKFMDFfY+m73OCPGZmDoKGAYABeKYo+HCENmwhhmtKUY5dtCRw69ozVC6UGIACZepNBu0EFQ62BVvnC3AYsW5IplGWK1XiABmetOVwdZujtu002d7tc0vtADKhEHFGrYAAjGOBh1hFQdzOO76F1cl6v15vWw39y3eu39sBOzHHhazkA)!

The `name` prop type is specified as `name?` to indicate it's an _optional_ object property. This is required, or we reverse our problem, confusing Flow as to why the `name` is not included when `<RadioOption label="Starcraft 2" value="sc2" />` is called initially.

Are there other ways that you would handle typing cloned props in this case?
