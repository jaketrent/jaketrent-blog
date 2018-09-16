---
layout: post
title: "Smart and Dumb Components in React"
date: "2016-02-17"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "redux"
description: Some thoughts on how to identify and split smart and dumb components in React.
metaKeywords: react, js, smart components, dumb components, presentational, container, design
draft: false
image: https://i.imgur.com/9VKyXtu.png
---

Dan Abramov coined the terms [Smart and Dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).  Later, he called them Container and Presentational components.  I still call them Smart and Dumb.  It's shorter and sits in my mind easier.  How do you identify them?  Why would you want a separation?  What might that separation look like?  Here are a few ideas.

<!--more-->

## Smart vs Dumb Components

So what sets these components apart?  Smart means "container" or "app-level".  Some have compared it to the "C" in MVC.  Dumb means "presentational" or "ui only", possibly comparable to the "V" in MVC.  Here's a breakdown of a few key characteristics:

### Smart Component Characteristics

- Describe *how things work*
- Provide no DOM markup or styles
- Provide application data, do data fetching
- Call Flux actions
- Named *Container by convention

### Dumb Component Characteristics

- Describe *how things look*
- Have no app dependencies
- Receive only props, providing data and callbacks
- Rarely have own state, when they do, it's just UI state
- Named anything that's a UI noun

Apparently you need each class of components because obviously your app has to smart to be interesting.  But if it's more dumb, it's more simple.  So split it.  You need both.

If you separate concerns, your app will be easier to reason about, complexity will be mostly localized around the Smart components, and you should be left with more simple components.  UI components will be more reusable.

## Where to Split Smart and Dumb Components?

If you keep all Smart characteristics on one side and the Dumb characteristics on the other, you will have made the separation and be following the guiding principles.  

But how should you make that split?  Here are a couple ideas.  These are observations of how I've found myself making the split and what it ends up looking like.

### Deep Split

"Deep" describes what I usually observe when I split components this way.  There's one Smart component that splits to one Dumb component.  There's a 1:1 relationship.  This seems simple, and it is in a way.  It probably works better if the components are small, because many of the smarts from the Smart component end up getting passed down to the Dumb component.  This makes for a lot of props on the Dumb component.  

If the Dumb component does anything interesting, it usually will fan out at that point and start farming `props` off to the child components that actually need them.  Thus, the hierarchy deepens before it actually ends up doing work.

![Deep component split](https://i.imgur.com/scfodt6.png)

### Broad Split

"Broad" describes the transition from Smart to Dumb happening sooner.  There is one Smart component that has many Dumb component children.  There aren't necessarily fewer interesting things here or props to pass, but they're scattered out, going straighter to the components that need them instead of going through some Monolith Proxy Dumb component (all the bad words together).

![Broad component split](https://i.imgur.com/hxusLJ2.png)

A highlight advantage here is that there is much readier access to the Smart component's smarts -- store data, event handlers, and actions.  You don't feel like you're passing props _through_ components only to get them to the components that really use them.  

A golden quote from Dan Abramov that highlights this is:

> When you notice that some components don’t use the props they receive but merely forward them down and you have to rewire all those intermediate components any time the children need more data, it’s a good time to introduce some container components.

## Nodes as props

In his quote, Dan recognizes the time to introduce container components.  In my mind, "container" means Smart.  Here, I don't think we necessarily require a Smart Container, because we usually like to get as Dumb as we can as fast as we can.  So, how about a Dumb component that just provides *containment*?

We can provide DOM markup, component grouping, layout, or other UI abstractions with components that take `props.children`.  These children are usually components, of type `React.PropTypes.node`.  Doubtless we've all realized by now that there's just one `props.children`.  But component can only wrap one thing, right?  Well, this is in the syntax of markup/JSX, but this isn't true _inside_ the Component.  We could have more attributes that pass `PropTypes.node` arguments.  This allows for _containing more_ nodes and having convenient handles on them within components.  

This thought was revelatory at the time it occurred to me.  Looking back, it seems obvious.  But for some reason, probably because I still think of it as HTML sometimes, it feels funny to write something like:

```js
<Dumb aProp={<AnotherDumb />} />
```

Then inside the Dumb component, we can display those attributes directly:

```js
function Dumb(props) {
  return (
    <div className={props.css.awesomeLayout}>
      {props.aProp}
    </div>
  )
}
```

## What to Pass as Props?

If we have a split we like, now we have to decide what `props` to send from the parent to the child components.

### Send Them All

```js
<Dumb {...this.props} />
```

Yes, you could just send all the parent's props to the child.  I would do this when the parent feels just like a wrapper.  It's a passthrough.  Perhaps it adds something small and targeted.  It's a higher-order component.

### Pass the Reducer/Selector

```js
<Dumb reducerName={this.props.reducer} />
```

You can pass the whole nested reducer state, sure.  Almost every time I feel myself wanting to do this, I think it's motivated by laziness.  It has a potential downside of tying the reducer format to the view in more places than required.  Of course, if you have custom selectors for everything anyway, you make your break from reducer format coupling there.

### Pass New Variables

```js
<Dumb newVar={this.props.var} />
```

This is most commonly what passing variables to children components looks like.  These values are usually primitives, but they can you can send down entire new object structures as well.  It has the advantages of being explicit and traceable.  It also avoids the coupling of passing entire nested reducers.  

## Rule of Thumb

In all design decisions, it's good to have some quick guidelines in mind when making decision.  So relative to splitting Smart and Dumb components, here's a rule of thumb.  

On many of my projects recently, I use two decorators that help identify Smart and Dumb components:

For Smart, the [redux-react-connect-by-name](https://www.npmjs.com/package/redux-react-connect-by-name) component facilitates data fetching from the redux store.  This is equivalent to using redux's vanilla `connect` with some built-in niceties.

For Dumb, the [react-styleable](http://npmjs.com/react-styleable) component allows passing CSS modules into React components.  This is how I like to give my components styling information.  

If one is for Smart and the other for Dumb, then I can usually identify a potential split if I ever see them _together_.  For example, this is what that antipattern might look like:

```js
import connect from 'redux-react-connect-by-name'
import styleable from 'react-styleable'
// ...

@connect([someSelector])
@styleable(someCss)
class MyComponent extends React.Component {
  // ...
}
```

Split that up!

## This Isn't Dogma

The idea of Smart vs. Dumb components is, itself, just a guideline -- a Pirates' Code-level of guideline.  Keep it and use it where it helps your project.  This is an art form.  No one has the best answer for how to organize your React views.  Do the best you can.  Then, next week, when you find a better way, advance to that.  

What are some other observations that you've made when splitting your views into Smart and Dumb components?

_Adapted from a meetup talk:_

<script async class="speakerdeck-embed" data-id="26cce4743e5540b48188a35f49de3c4d" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
