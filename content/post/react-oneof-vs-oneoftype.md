---
categories:
- "Code"
comments: true
date: 2017-10-27T07:11:33-06:00
description: "The difference between React PropTypes.oneOf and PropTypes.oneOfType"
draft: false
image: "https://i.imgur.com/kkdFjqv.jpg"
layout: post
metaKeywords: "prop-types, PropTypes.oneOf, PropTypes.oneOfType, difference, enum, types"
tags:
- "js"
- "react"
title: react oneof vs oneoftype
---

Here's the difference between React `PropTypes.oneOf` and `PropTypes.oneOfType`.

<!--more-->

## Why PropTypes

PropTypes are a way for you to indicate how you want your React Components used.  By defining PropTypes, React will warn developers when they're passing the wrong props to your component, preventing bugs and giving a better developer experience.

There are two PropTypes that have similar names and uses that we can contrast and define for clearer use in the future.

## PropTypes.oneOf

`PropTypes.oneOf` is a simple enum of literal values.  It means that if you're going to pass a value to this component, it better be one of these exact values.

You pass this PropType function an array of these values, and React will take care of the rest.

For instance, if you have a `Button` component that only allows 3 distinct `appearance` prop values, then you could define the PropTypes something like:

```js
import PropTypes from 'prop-types'
import React from 'React'

const Button = props => /* the component body */

Button.propTypes = {
  appearance: PropTypes.oneOf(['primary', 'stroke', 'flat'])
}
```

## PropTypes.oneOfType

`PropTypes.oneOfType` is different in that your not enumerating _literal values_.  Instead, your enumerating the _types_ of values that your component can accept.  This PropType casts a wider net by allowing more potential values of those types.

For instance, if you have a `TimeSince` component that allows a `time` prop to be sent as a number in milliseconds or a `Date` object because it handles either type internally, you might define its PropTypes as:

```js
import PropTypes from 'prop-types'
import React from 'React'

const TimeSince = props => /* the component body */

TimeSince.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ])
}
```

Again, the types are passed to to the `oneOfType` function as an array.

Both of these PropType functions are good for defining acceptable enumerations of things -- one for values, one for types of things.

How do you keep these two PropTypes functions straight?  What are some other PropTypes that you mix up?
