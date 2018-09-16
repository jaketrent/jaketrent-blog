---
categories:
- "Code"
comments: true
date: 2017-04-08T23:22:18-06:00
description: "Sometimes it might be better to write test descriptions that are less like an English sentence and more like code."
draft: false
image: "https://i.imgur.com/NjnyWWS.jpg"
layout: post
metaKeywords: "testing, specs, test descriptions"
tags:
- "tdd"
- "testing"
- "naming"
title: "More Code-like, Not English Spec Descriptions"
---

Sometimes it might be better to write test descriptions that are less like an English sentence and more like code.

<!--more-->

## English So Hard It Is

We often try very hard to make our test descriptions full English sentences.  This is supposed to make it more clear and more accessible to the test reader.  Sometimes, however, it's actually harder to read.  It's usually longer as a sentence.  It can be more ambiguous because it uses conversational words to describe code.  We often have ceremonial cruft in our sentences simply in order to complete "proper" English grammar (eg, "it should" at the beginning of each description).

## Code-like Clarity

If we write test descriptions using more code-like languages, we can be a little more meaningful and specialized with fewer words.  We can keep our test descriptions in the language of our code, and we can keep our coding brain engaged.  We can reuse variable and function names and data structures straight from the code under test instead of trying to come up with additional names for our sentence and going through the effort of making sure they map well.  

Imagine having code under test that mentions `config.planRoles`. Wouldn't it be grand if you put the specific variable name in the test description:

"Empty config.planRoles"

Instead of going for something more conversational:

"When the configuration's plan roles attribute is empty"

## Leave More to the Test Itself

We can simply put fewer words in our descriptions, leaving more to the reader to read in the actual assertions done inside the test body.  We may, in removing English sentences for the layperson, decrease some of the test meaning discoverability for a person new to the codebase.  However once the style of test descriptions is learned, just like code, the test reader can become more quick and adept at reading and navigating the specs.

Isn't it less redundant and more scannable to write a test:

```
it('empty config.planRoles', () => {
  expect(subject.enableWithRoles(config.planRoles)).toBe(false)
})
```

Rather than:

```
it('should return false when config.planRoles empty', () => {
  expect(subject.enableWithRoles(config.planRoles)).toBe(false)
})
```

## Power in Permutations

This kind of test naming can be especially helpful in showing permutations between tests.  We can spot the diff easier and thus more quickly narrow in on what that particular test is actually useful for.  TDDed unit tests often are a series of 0, 1, many permutations on the same operation.

Imagine navigating through many tests described like this and trying to spot the permutations:

- "It should display false if currentNavGroup is admin-tools, has the supported claim, but no supported plan roles for currentPlanId"
- "It should display false if currentNavGroup is library, has the supported claim, but no supported plan roles for currentPlanId"
- "It should display false if currentNavGroup is library, has the supported claim, but supported plan roles are empty for currentPlanId"

Compared to:

- "currentNavGroup admin-tools, claim supported, plan roles unsupported"
- "currentNavGroup library, claim supported, plan roles unsupported"
- "currentNavGroup library, claim unsupported, plan roles empty"

We identify the 3 main tumblers that can move and affect the permutations of this test: `currentNavGroup`, `claim`, and `planRoles`.  We don't put them in English sentences but essentially define variable states for our test one after the other. We're consistent in our naming and grouping test to test.  We leave outcome descriptions for the assertions happening inside the test itself.

I don't think this naming strategy is always appropriate or even helpful, but I have felt it sometimes is.  What do you think?  Do we put too much "that's the way it's always been" furvor into making our test descriptions English sentences?  And what other great things have come from the English sentence descriptions that I'm missing here?
