---
layout: post
title: "AngularJs Find Element in Context"
date: "2013-02-21"
comments: true
categories:
  - "Code"
tags:
  - "angularjs"
  - "js"
description: In jQuery finding an element within a given context.  Is there an "Angular way" to do the same thing?  Here's one.
metaKeywords: angularjs, js, find element, sizzle, element in context, jquery
draft: false
image: https://i.imgur.com/wVBKD.png
---

Finding an element in context means that I can select a node from the dom within a certain range -- specifically either a node or any of its children nodes.  Is there an "Angular way" to do this?

<!--more-->

## Angular's Element() API

Angular provides jqLite for doing basic CSS selections.  As far as I can tell, it does not give you the ability to specify a context node.  Sure, you can specify a more specific selector, but you can't pass a context programmatically.  The best you could do would look something like:

```js
angular.element('.my-preknown-context .element-to-find')
```

If that's sufficient for your use case, this would be the most "Angular way" to make an element selection.

## jQuery's API

If you need to make CSS selections within a given context, you'll need to use jQuery.  jQuery's selector will be used in place of jqLite if it is loaded previous to the `DOMContentLoaded` event firing.  In other words, import jQuery in the `head` tag.

With jQuery, you can do things like this:

```js
$('.element-to-find', $('.my-preknown-context'))
```

But we could already do that with the above `angular.element` function.  If a constraint of our use case is that we don't yet know the selector of the context, then we need to  use this same jQuery API to do what we couldn't before.  For instance, if we want to find a child element of an element that was clicked, the inside of the click handler might look like this:

```js
$('.element-to-find', $(event.currentTarget))
```

We could also write it like this:

```js
$(event.currentTarget).find('.element-to-find')
```

Well, why not use `angular.element().find()`?  Because it is limited to querying children by tagName only.  Oh boy.  That's not all that useful.  Interesting/weird constraint.  Oh well, maybe someday.

## jQuery, Meet Angular

So, using full jQuery is probably not the most "Angular way".  So, what's the best you can do?  Use Angular to get the context reference.  In a click handler, use the `$event` service which references the event object:

```js
$('.element-to-find', $event.currentTarget)
```

In a controller, use the `$element` service which references the dom node the controller is attached to:

```js
$('.element-to-find', $element)
```

This method uses jQuery to fill in for something it seems Angular can't do yet.  And it uses Angular where possible, since it has access to these dom references already.

What do you think?  Is there a more "Angular way" to do this?
