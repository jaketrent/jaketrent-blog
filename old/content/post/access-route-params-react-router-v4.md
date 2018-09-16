---
categories:
- "Code"
comments: true
date: 2017-04-05T07:01:12-06:00
description: "React Router v4 has a new API.  Accessing the route params is very straightforward."
draft: false
image: "https://i.imgur.com/QQSiHdG.jpg"
layout: post
metaKeywords: ""
tags:
- "js"
- "react"
- "react-router"
title: "Access Route Params in React Router v4"
---

[React Router v4](https://github.com/ReactTraining/react-router) has a new API that's pretty cool.  The method for accessing the route params is different, and it's very straightforward.

<!--more-->

First, get React Router in your web project by installing:

```
npm install react-router-dom --save
```

## Wrap in Router

Now, somewhere near the top of your component tree, you'll place a parent `Router` element:

```js
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Topic from '../topic'

export default function App() {
  return (
    <Router>
      <div>
        <Route path="/topics/:name" component={Topic} />
      </div>
    </Router>
  );
}
```

Beneath `Router`, we could have many `Route`s, but I've written only one here: the `/topics/:name` route that goes to the `Topic` component.  When this route is matched, we want to get the `name` parameter inside the component.

## Access Route Params in the Component

The `topic.js` module wants to display the name of the chosen topic.  This can be retrieved from off of the URL.  To access it, we use the extra prop, `match` that React Router sends down to the route component:

```js
import React from 'react'

export default function Topic(props) {
  return <h1>{props.match.params.name}</h1>
}
```

The `match` prop has a `params` object that contains the `name` param we've been looking for.  Other param values, if they existed, would be keyed off of that object as well (eg, `props.match.params.otherParam`). 

## More Route Data

`match` actually contains a number of interesting route-related bits that you might find useful as well:

```js
console.log(props.match) 

{
  isExact: true,
  params: {
    name: 'the-topic-name'
  },
  path: '/topics/:name',
  url: '/topics/the-topic-name'
}
```

Pretty straightforward, right?  Are there any other interesting bits that you find helpful to glean off a matched route?
