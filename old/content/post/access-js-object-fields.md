---
layout: post
title: "Access JS object fields"
date: "2009-12-18"
comments: true
categories:
  - "Code"
tags:
  - "js"
description: Sometimes it is useful to be able to iterate through the fields in a javascript object and use the values kept therein for something spectacular.  I've foun
metaKeywords: javascript
draft: false
---

Sometimes it is useful to be able to iterate through the fields in a javascript object and use the values kept therein for something spectacular.  I've found this to be the case for POJSOs (+S = 'Script') that I pass down to the client with new-found data from the backend.

<!--more-->

For instance, often these models have data that needs to be shown onscreen to update the ui.  The fields are simple there -- whoa, available!  So much easier than Java -- to iterate through:

```javascript
for (field in obj) { /* ... */ }
```

Once we can iterate through the fields, then we can throw them out onto the page.  One way that I like to do this is by careful naming of page elements to correspond to field names in the object.  

So, here's a full-length demo (using jquery):

```javascript

var pojso = {
  id: 3,
  name: 'Call me Ishmael!'
};

function updateUI(obj) {
  for (field in obj) {
    $('#ui-' + field).html(obj[field]);
  }
}

// normally, put this in an event handler
updateUI(pojso);
```

```html
<!-- the islands to be updated -->

<div id="ui-id"></div>
<div id="ui-name"></div>

```

Now can I have my Christmas anagrams and go home?

<h3>Update</h3>
Now, while this post is still young and tender, I want to make a final point of recording how to execute a function within an object.  Let's say that pojso became a little less plain and simple:

```javascript
var nijso = {
  id: 3,
  name: 'New and improved',
  action: function () { 
    alert('Souit action!');
  }
}
```

Now, in order to execute the new action function with the name (this would probably come in handy if you only had the name in some sort of programmatic instance, like executing all/a set of functions on the object in a loop, try this:

```javascript
nijso['action'](); // this would get you an alert
```

  
