---
categories:
  - "Code"
comments: true
description: "Make buttons controllable via the keyboard within test."
image: "https://i.imgur.com/2aj8D6j.jpg"
layout: post
metaKeywords: "react, testing-library, keyboard accessibility, enter to click button"
draft: false
tags:
  - "testing"
  - "react"
title: "Keyboard Control of Buttons in Testing Library"
date: "2020-11-30"
---

Make buttons controllable via the keyboard within test using testing-library.

<!--more-->

## Test is Different than Browser

In the browser, we can focus a button and press enter, and the `onClick` handler is triggered, and all is good.  

In the test environment, it's a different story.  Here, we'll look at tests written for a React UI using [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/).

## Testing-library Peculiarities

Testing-library is awesome. But it has some duplicate functionality for keyboard events that makes using it confusing. There are many threads describing what works for people, and the answers are all different.  Well, this is another one: here's what worked for me; maybe it'll help.

[`@testing-library/user-events`](https://github.com/testing-library/user-event) is preferred when possible because it more-closely models how the user interacts with your UI in the browser. In this case, however, its use is ill advised -- it doesn't work. To be clear: don't use `userEvent.type(el, '{enter}')`. Instead, use `fireEvent` from [`@testing-library/dom`](https://github.com/testing-library/dom-testing-library). Specifically, use `fireEvent.keyDown(el, { key: 'Enter', code: 'Enter' })`.

## Single Handler, Multiple Events

To get the "enter" keyboarding to work in the test environment, you'll need to add an `onKeyDown` listener in addition to your usual `onClick`. Then point both listeners to the same handler (assuming you want both actions to do the same thing.). Then inside the handler, detect whether it's a click or the kind of key you're expecting before you run the logic for the handler.

```js
function handleButtonEvent(evt) {
  if (
    evt.type === 'click' || 
    (evt.type === 'keydown' && evt.key === 'Enter')
  ) {
    // ...handle it the same way
  }
}

return <button onClick={handleButtonEvent} onKeyDown={handleButtonEvent}>Clicky</button>
```

## Testing Keyboard Handler in Test

Testing-library will allow you to query the elements in the DOM and interact with them. They [prefer](https://testing-library.com/docs/guide-which-query/) using `getByRole`.
You can learn what the [accessibility roles are](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles) and the usage of `getByRole` will return the options for you upon a test failure.  It's pretty great.

Let's also make sure to focus it first, *then* press enter. Only then will we actuate the button and call the handler.

For this button:

```javascript
function MyButton(props) {
  return <button onClick={props.onClick} onKeyDown={props.onClick}>Clicky</button>
}
```

The test might look like:

```javascript
import { fireEvent, screen } from '@testing-library/dom'

it('calls the handler', () => {
  const handler = jest.fn()

  render(<MyButton onClick={handler} />)
  const button = screen.getbyRole('button', { name: /Clicky/ })
  button.focus()
  fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
  expect(handler).toHaveBeenCalled()
})
```

"calls the handler" isn't a very strong assertion, but you get the idea. Assertions on your logic or the DOM state will be better.

Well, that should do it. 

What are the other ways that you've found to actuate a button in test with the enter key?
