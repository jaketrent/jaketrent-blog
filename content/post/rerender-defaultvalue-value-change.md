---
categories:
  - "Code"
comments: true
description: "How to rerender a React input when its defaultValue changes"
image: "https://i.imgur.com/4d2P5cJ.jpg"
layout: post
metaKeywords: "react, uncontrolled components, defaultvalue, rerender, force update, force render"
draft: false
tags:
  - "react"
title: "Re-render DefaultValue when Value Changes in React"
date: "2020-11-12"
---

Here's a method to re-render a React input when its defaultValue prop changes.

<!--more-->

## Why Update defaultValue 

`defaultValue` is meant to be uncontrolled. So, why would you want to control it? 

`defaultValue` is supposed to allow an `input` to receive some starting data but then React usually will forget that it was ever set. Why reset it?

The best case I have found is in making custom input widgets -- most recently a combobox. Instead of using a native `select` tag, which would be great too, I'm using `button`, `label` and `div`.  But I also want my custom widget to be backed by an `input` tag as well. This will allow it to be submittable in a regular 'ol form. And in this case, I want my combobox to be controlled, but I essentially just want data to flow into the `input` field. I would just use `value`, but then React complains that there's a `value` prop without a corresponding `onChange` prop. So, I'm trying to get around that.

## Tell React to Update

React will never update the `input` tag if the value passed to `defaultValue` changes. It was meant to be a default/starting value only, after all.

To force it to update, we'll surround the `input` with a containing tag -- a generic `div`.  We'll give that `div` a `key` prop and set its value to the same value as we passed to `defaultValue`.  

(Make sure that the `key` goes on the parent/container element, not on the `input` itself. If the `key` goes on the `input`, you'll get React rendering a new `input` for each value.)

Now, when the key updates, React will re-render the container and its descendant child, the `input`.  Voila!

Some potential sample code:

```
const [value, setValue] = useState('someValue')
// setValue is called elsewhere in the custom component

return (
  <div key={value}>
    <input defaultValue={value} />
  </div>
)
```

Any other ways you've approached this?
