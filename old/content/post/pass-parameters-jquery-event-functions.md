---
layout: post
title: "Pass Parameters to Jquery Event Functions"
date: "2009-09-08"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "souit"
description: Jquery has some awesome event-handling abilities.  The elusive ability to pass parameters into these event callbacks seems way harder than it should be.  Ne
metaKeywords: javascript, jquery, souit
draft: false
---

Jquery has some awesome event-handling abilities.  The elusive ability to pass parameters into these event callbacks seems way harder than it should be.  Nevertheless, I have found *a* solution.  I really doubt it's the best one.  I really hope it isn't.  

<!--more-->

The need to pass parameters is made clear when you have a callback that functions differently depending on what particular element triggers the event.  For example,  I'm doing a simple voting mechanism for every item in a list.  When an up or down arrow in front of the item is pressed, I want to make an ajax call that will record the vote on the server and then update the UI.  Therefore, I need to know what item I'm recording the vote for.  In the code below, the id will tell me what row I'm on.  This is the most important part.  The second parameter is the direction of the vote (up or down).  This is less important, in this case, because the same thing could have been accomplished by creating a separate callback for up and down.

```js
$(document).ready(function() {
   $(".voter-up,.voter-down").click(function() {
     var id = parseInt($(this).attr("id").substring(12));
     var direction = $(this).attr("class").substring(6);
     vote(id, direction);
   });
});
```

So what's the key?  Embed the data that you want in id, class, or just any attribute of any element that has a per-item/row presence.  That explains the substring() calls.  My attributes look like this:

```html
<a class="voter-up" id="link-hymn-u-{{ h.id }}" href="#">...something...</a>
```

The {{ curlies }} are for django templates, which are awesome, btw.

  
