---
layout: post
title: "D3 Class Operations"
date: "2014-12-24"
comments: true
categories:
  - "Code"
tags:
  - "d3"
  - "js"
  - "svg"
description: D3 has class operations like addClass, hasClass, removeClass, and toggleClass.
metaKeywords: d3, js, svg, addClass, removeClass, hasClass, toggleClass, jquery
draft: false
image: https://i.imgur.com/94JQ8N8.jpg
---

D3 has operations for class name manipulation that you're used to from jQuery.  These include addClass, removeClass, hasClass, and toggleClass.  They just go by different names.

<!--more-->

## selection.classed

The magic all comes in the form of the `selection.classed` method from d3.  It is going to be the api that is used to accomplish all the operations listed below.  From the [docs](https://github.com/mbostock/d3/wiki/Selections#classed):

> This operator is a convenience routine for setting the "class" attribute; it understands that the "class" attribute is a set of tokens separated by spaces. Under the hood, it will use the classList if available, for convenient adding, removing and toggling of CSS classes.

It knows how to handle one or many classes on an element, and it will be performant.

Also note that this method is only available on a selection.

## d3 addClass

To add a class, the second parameter to `classed` must be true, as in this code:

```js
d3.selectAll(".bar")
 .classed("my-selector", true);
```

## d3 removeClass

To remove a class, the second parameter to `classed` must be false.

```js
d3.selectAll(".bar")
  .classed("my-selector", false);
```

## d3 hasClass

To check for the existence of a class, just leave off the second parameter and pass the class name you're querying for.  This will return true if it exists, false if it does not.

```js
d3.selectAll(".bar")
 .classed("my-selector");
```

This will return true if any element in the selection has the class.  Use `d3.select` for single element selection.

## d3 toggleClass

To flip a class to the opposite state  -- remove it if it exists already, add it if it does not yet exist -- you can do one of the following.

For a single element, the code might look like this:

```js
var oneBar = d3.select(".bar")
oneBar.classed("my-selector", !oneBar.classed("my-selector"));
```

For multiple elements, one will want to pass in a callback.  The callback function takes as parameters `d`, the datum, `i`, the index in the selection, and `this` is the current DOM element.

It's also important to note that the [docs](https://github.com/mbostock/d3/wiki/Selections#classed) inform us that:

> The function's return value is then used to assign or unassign the specified class on each element.

The code for toggling multiple elements in a selection at once might look like this:

```js
d3.selectAll("bar")
  .classed("my-selector", function (d, i) {
    return !d3.select(this).classed("my-selector");
  });
```

Here's a [jsbin](http://jsbin.com/qeyawa/1/edit?html,js,output) that provides some toggle functionality.  Ees for fun.

<a class="jsbin-embed" href="http://jsbin.com/qeyawa/1/embed?output">d3 toggleClass</a><script src="http://static.jsbin.com/js/embed.js"></script>

## Bonus: A note on single active classes

Here's a fun tip for that oft-encountered situation where you want a single element in a selection to have a class, like an `active` class, and the rest of the selection should not:

Make sure that you detect the active class in the selection previous to the clearing of the active classes.

A sample of what that might look like could be:

```js
d3.selectAll(".bar").on("click", function () {
  var activeClass = "active";
  var alreadyIsActive = d3.select(this).classed(activeClass);
  svg.selectAll(".reports-chart__bar")
    .classed(activeClass, false);
  d3.select(this).classed(activeClass, !alreadyIsActive);
});
```

Now, unleash the power of your creativity!  Kazaam!
