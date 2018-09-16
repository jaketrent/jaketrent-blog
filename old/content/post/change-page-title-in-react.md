---
categories:
- "Code"
comments: true
date: 2017-08-10T07:20:47-06:00
description: "Change the page title when the user routes to a new page."
draft: false
image: "https://i.imgur.com/GwF1N2L.jpg"
layout: post
metaKeywords: "react, page title, change title when route, change title per component, react-helmet changes page title"
tags:
- "js"
- "react"
title: "Change Page Title in React"
---

Change the page title when the user routes to a new page.

<!--more-->

## A Great Tool

There are many ways to get the page title to change and some great tools to assist you.  There is a particularly great tool that will do that and a bit more.  It's called [react-helmet](https://github.com/nfl/react-helmet).

It can set anything that occurs in the `<head />` of the document.  

It has a great declarative API because it's exposed as just another component.  

## Using react-helmet

To use this feat of software engineering, we'll install it:

```
npm install react-helmet
```

And then use it inside of one or more of our components.  

Let's say that we have a home page and an about page.  We might have a top-level component as the entry point for each page.  We would put a call to `react-helmet` in each of these components, assigning the respective titles:

```
import { Helmet } from 'react-helmet'

const Home = _ => 
  <div>
    <Helmet>
      <title>Muffins R Us</title>
    </Helmet>
    Welcome to muffin land.  It's breakfast time!
  </div>
  
const About = _ => 
  <div>
    <Helmet>
      <title>About | Muffins R Us</title>
    </Helmet>
    How we got into muffins.
  </div>
```

No when your router changes components from `Home` to `About` or vice versa, the Helmet will engage and change your site's title.  

Depending on your site design, you could change the site title even when the URL hasn't changed.  Since the title is set when a component is rendered, all you'd need to do is render a component with a different `<Helmet><title /></Helmet>` declaration inside it, and the site title would change.

How else do you handle updating the page title in a React app? 

Or have you found other interesting uses for `react-helmet`?

