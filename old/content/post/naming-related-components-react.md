---
categories:
- "Code"
comments: true
date: 2017-09-21T07:33:09-06:00
description: "How I like to name related subcomponents in React."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "react, js, javascript, subcomponents, organizing subcomponents, companion components"
tags:
- "js"
- "react"
title: "Naming Related Components in React"
---

This is an example of how I like to name related subcomponents in React.

<!--more-->

## Meaning of Related

Related components are those that are used together to perform some greater task.  They work together.  

A related component might define its relationship as a subcomponent, used as a child of a parent component.  

To make one useful, you want the other.  They compose together.  

## A Naming Example

An example of related components might appear in a tab list UI, where the clickable labels in a row across the top, when clicked, switch between UI panels below.

A tab list might be represented by a few pieces, each a component itself:

```js
export default {
  List,
  ListItem,
  Panel
}
```

- The `List` is the container for the tabs
- The `ListItem` is an individual tab label
- The `Panel` is the wrapper for content that is hidden or shown

There's nothing revelatory about this naming individually.  But this is designed so that the usage seems to make a lot of naming sense.

In a client application, one might use this as:

```js
import Tab from './tab'

<Tab.List>
  <Tab.ListItem id="menu1">Menu Item 1</Tab.ListItem>
  <Tab.ListItem id="menu2">Menu Item 2</Tab.ListItem>
  <Tab.ListItem id="menu3">Menu Item 3</Tab.ListItem>
</Tab.List>
<Tab.Panel labelledBy="menu1"><div>Content stuff 1</div></Tab.Panel>
<Tab.Panel labelledBy="menu2"><div>Content stuff 2</div></Tab.Panel>
<Tab.Panel labelledBy="menu2"><div>Content stuff 3</div></Tab.Panel>
```

The naming makes this work well at usage time:

- The `import` statement can be something with a clear alias of the UI element imported: that is, `Tab`
- The composition of components, between `<Tab.List />`, `<Tab.ListItem />`, and `<Tab.Panel />`, clearly associates them all to the `Tab` experience via the prefix.
- The `.` clearly separates the prefix or namespace.  This can be a convention for this sort of required composition in a component or set of components. Otherwise, sometimes prefixes that are similar in a module are similar just because components in the same module are related to the same problem domain.
- Here we can see the value of why we named the individual subcomponents as they are -- `List`, `ListItem`, and `Panel` -- because they work well with the `Tab` prefix.

I like this naming strategy.  Do you?  What other strategies in naming do you use when trying to associate components?
