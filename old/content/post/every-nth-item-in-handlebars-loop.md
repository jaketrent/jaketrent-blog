---
layout: post
title: "Every nth Item in Handlebars Loop"
date: "2012-10-03"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "handlebars"
image: http://blog.teamtreehouse.com/wp-content/uploads/2011/03/handlebars.png
---

Have you ever wanted to do something special every nth time through a Handlebars loop?  The built-in `{{#each}}` will loop through your items just fine.  It lacks a few features.  For one, you don't have access to the loop index, though you can [find it](http://rockycode.com/blog/handlebars-loop-index/).  Without the index and simple comparisons like modulus, length of the array, and equals, you'll be creating your own Handlebars helpers.  Here's an example of one.

<!--more-->

## Extend the context

Inside a block helper in Handlebars, when you call `options.fn`, you pass the context to the first block.  We can extend what attributes are available in that context.  The `everyNth` helper below extends this context with variables that are useful for doing "every nth" operations:

1. isModZero
2. isModZeroNotFirst
3. isLast

The code in full looks like this:

```js
Handlebars.registerHelper('everyNth', function(context, every, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});
```

Note: This implementation uses [underscore `_.extend()`](http://underscorejs.org/#extend).

## Scenario: Print rows

Here's a scenario where this is useful:  In twitter bootstrap, each "span" div is inside of a "row-fluid" div (if using bootstrap responsive.css).  So, if I want three things, let's say videos, per row printed in the markup, you can't just use `{{#each}}` because all it does is iterate through the videos.  You could print the "span4"s but you wouldn't know when to print the "row-fluid".  Hence, we need our helper.

```html
{{#everyNth myArray theNumberN}}
{{/everyNth}}
```

Our new helper `everyNth` allows us to write code like this:

```html
{{#everyNth vids 3}}
  {{#if isModZeroNotFirst}}
    </div>
  {{/if}}
  {{#if isModZero}}
    <div class="row-fluid">
  {{/if}}
  <div class="span4">
    <div class="thumb">
      <a href="{{ linkUrl }}"><img src="{{ image }}" /></a>
    </div>
  </div>
  {{#if isLast}}
    </div>
  {{/if}}
{{/everyNth}}
```

To clarify the need and usage of these new variables:

1. **isModZero** - in this example, every 3 videos should be on a row.  When mod 3 is 0, create a row.
2. **isModZeroNotFirst** - when I create a row (mod 3 is 0), I also need to end the row, except before the first row.
3. **isLast** - if the length of the video array is not divisible by 3, the last row needs to close anyway.

The helper is simple, essentially just a copy of `#each` with a few new variables in context.  That's the beauty of Handlebars helpers.  With this little baby you can determine where you are in your iterations through your array.

What are some of the things you use Handlebars helpers for?

