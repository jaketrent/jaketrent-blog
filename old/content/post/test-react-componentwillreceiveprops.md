---
layout: post
title: "Test React componentWillReceiveProps"
date: "2015-02-26"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "unit-testing"
description: Testing the componentWillReceiveProps of a React component will take some setup.
metaKeywords: react, unit testing, testing, nextprops, test setup, componentWillReceiveProps, lifecycle
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

Testing React Components has been easier and more enjoyable than any previous UI unit testing I've done in the past.  Components that have interesting things happen in lifecycle methods have a little more setup to get tested.  Components that use the `componentWillReceiveProps` method are in this category.

<!--more-->

## React Test Setup

Not all lifecycle methods require as much setup in a test as `componentWillReceiveProps`.  This is because:

- This method is concerned with ***changing*** props.
- Changing props directly on a React Component (even under test) is against the React code of conduct

So, we need something that is legal to change... `state`!  We need to not modify our subject under test and simply pass it new `props`.

My solution is to create a React Component specifically for the test.  This Component will be a parent to the subject under test, on which we can set `state`.  We'll design it so that this state is transferred to the child Component under test.

## React Component using `componentWillReceiveProps`

You might have a React Component to test that looks like this:

```js
var ComponentToTest = React.createClass({
  getInitialProps() {
    return {
      myProp: "blank"
    };
  },
  getInitialState() {
    return {
      modified: "still blank"
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      modified: nextProps.myProp + "IsSoModified"
    });
  },
  render() {
    return <div class="displayed">{this.state.modified}</div>
  }
});
```

There is nothing particularly interesting about this subject beyond the fact that it uses `componentWillReceiveProps`.  When new props are received, internal state is modified.  In real life, more interesting things like data fetching or complex calculations might be done here and then stored in state.  We simply are matching the scenario of needing to verify something when `componentWillReceiveProps` is called.

## A Parent Test Component

The test to exercise `componentWillReceiveProps` on the above Component might look like this:

```js
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

it("displays a modified state upon changing props", function () {
  var TestParent = React.createFactory(React.createClass({
    getInitialState() {
      return { testState: "init" };
    },
    render() {
      return <ComponentToTest ref="sot" myProp={this.state.testState} />
    }
  }));

  var parent = TestUtils.renderIntoDocument(TestParent());
  parent.refs.sot.props.myProp.should.eql("init");

  parent.setState({
    testState: "somethingElse"
  });

  parent.refs.sot.props.myProp.should.eql("somethingElse");
  parent.refs.sot.state.modified.should.eql("somethingElseIsSoModified"); // assert #1
  var child = TestUtils.scryRenderedDOMComponentsWithClass(parent, "displayed")[0];
  child.getDOMNode().innerText.should.eql("somethingElseIsSoModified");  // assert #2
});
```

The `TestParent` component is created specifically for this test.  It renders the Component under test.  It sets a `ref` attribute to it for easy access.  Once we render the parent, the initial state was sent as the prop to the child Component.  As soon as we `setState` on the parent, a new prop is sent to the child, triggering `componentWillReceiveProps`.

Finally, I've included two assertion styles.  Again, there are going to be more interesting things that you're asserting here in real life.  In this case I'm verifying that state that renders directly to the UI is set in our lifecycle method.  I can interrogate the state directly.  Here, we reach into the child Component state for assertion method #1.  That may sound bad, but remember that `TestParent` was created only in the context of this test anyway, so the level we're reaching through to grab child state is just test code.  Assertion method #2 is to go to the DOM to verify final output from the state change.

There is definitely more setup here to make this happen.  I feel like usually testing a React Component doesn't require this much test code.

## `componentWillReceiveProps` in Action

Here is a Component that uses `componentWillReceiveProps` to make a simple display change:

<a class="jsbin-embed" href="http://jsbin.com/munaxuguta/12/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

You can also check out this [slightly modified jsbin](http://jsbin.com/buwoqod/22/edit?js,output) which does the test assertion.

What methods have you used to test Components that use either `componentWillReceiveProps` or other interesting lifecycle methods?
