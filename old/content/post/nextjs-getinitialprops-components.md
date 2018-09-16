---
categories:
- ""
comments: true
date: 2017-09-08T06:09:08-06:00
description: "Make getInitialProps available to child components in Next.js"
draft: false
image: "https://i.imgur.com/kunBnHL.jpg"
layout: post
metaKeywords: "getInitialProps in child components, pathname in child components"
tags:
- "nextjs"
- "react"
- "server-rendering"
title: "Next.js getInitialProps in All Components"
---

Make getInitialProps available to child components in Next.js

<!--more-->

## What is getInitialProps

[Next.js](https://github.com/zeit/next.js/) adds a great little function to top-level (page) components.  It gives access to a number of properties, such as the request and response objects and url information such as the `pathname`.  For the full list, see the [readme](https://github.com/zeit/next.js/).

This data is useful in more than just the top-level page components.

## For All Pages

To get all pages to have the `getInitialProps` data available, we could implement this function on every page.  Or we could create a shared component that implements `getInitialProps` in one place.

This component doesn't have any UI per se, so we also don't want to render any DOM.  One way to accomplish this is to write a higher-order component that wraps the top level component of each page.

Such a component, `with-server-props.js`, might look like this:

```js
export default WrappedComponent => 
  class extends React.Component {
    static async getInitialProps({ pathname }) {
      return { pathname }
    }
    render() {
      return <WrappedComponent pathname={this.props.pathname} />
    }
  }
```

This will make the `pathname` prop available to each page.

## For All Child Components

But what if we want to make `pathname` or other bits of data that `getInitialProps` can provide available to any other component?

We have a couple of options.  We could:

1) Drill props for `pathname`, etc. all the way down to where they're needed.
2) Our server component wrapper could be modified to push this data into a shared data structure, a la redux store.  
3) We could avoid drilling or another library and put `pathname`, etc into [React context](https://facebook.github.io/react/docs/context.html).

Any one of these or other options would probably work fine depending on your use case and preference.  

Let's share this data with React context. To start, we modify our page component wrapper.  The component transfers `pathname` from props to context via the `getChildContext` function:

```js
import PropTypes from 'prop-types'

export default WrappedComponent => {
  class WithServerProps extends React.Component {
    static async getInitialProps({ pathname }) {
      return { pathname }
    }
    getChildContext() {
      return { pathname: this.props.pathname }
    }
    render() {
      return <WrappedComponent />
    }
  }
  WithServerProps.childContextTypes = {
    pathname: PropTypes.string.isRequired
  }

  return WithServerProps
}
```

We would wrap a page, such as `pages/index.js`, with our component:

```js
import withServerProps from '../ui/with-server-props'
import ChildComponent from '../ui/child-component'

export default withServerProps(_ => 
  <div> 
    etc
    <ChildComponent />
  </div>
)
```

Then `ChildComponent` or any similar non-root node component can get the `pathname` from context:

```js
class ChildComponent extends React.Component {
  render() { return <div>{this.context.pathname}</div> }
}
ChildComponent.contextTypes = {
  pathname: PropTypes.string
}
export default ChildComponent
```

Now `getInitialProps` is effectively available everywhere.  Just adjust `contextTypes` in the child component to determine what you want to pull out of context.

How does this approach strike you?  Are there better options?  How do you make `getInitialProps` data available to your components in Next.js?

