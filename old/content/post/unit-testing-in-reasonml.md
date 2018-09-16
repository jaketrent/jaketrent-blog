---
categories:
- "Code"
comments: true
date: 2017-07-17T11:17:49-06:00
description: "How to create and run automated unit tests within the ReasonML ecosystem."
draft: false
image: "https://i.imgur.com/gGrGCxt.jpg"
layout: post
metaKeywords: "reason, reasonml, unit test, tdd, unit test reason"
tags:
- "reasonml"
title: "Unit Testing in ReasonML"
---

Here's a way to create and run automated unit tests within the ReasonML ecosystem.

<!--more-->

## Young Ecosystem

Reason is a language based on OCaml, which is not young.  Reason compiles to JavaScript via Bucklescript.  That's not confusing. :)  The Reason/JS/Bucklescript thing is particularly young, which seems obvious once you try to figure out the testing story.

There is no testing section in the [Reason guides documentation](https://reasonml.github.io/guide/). I eventually googled my way to a [Bucklescript FAQ](https://github.com/BuckleTypes/wiki) that mentions to state of unit testing: to paraphrase, we're working on Jest bindings and OUnit is a good OCaml testing tool.  But its [docs](http://ounit.forge.ocamlcore.org/) are missing or broken.

So I checked out the work-in-progress Jest bindings.

## Install bs-jest

[bs-jest](https://github.com/BuckleTypes/bs-jest) seems to be the most Reason/JavaScript-oriented testing tool currently available. 

In its current form, it's listed as "very very" experimental (which is apparently less experimental than before).  It's not 100% complete, but basic APIs seem to be there.  Lacking a better option, cowabunga!

In your project, simply:

```bash
npm install bs-jest --save-dev
```

And update your `bs-config.json`

```json
{
  "bs-dev-dependencies": [
    "bs-jest"
  ]
}
```

## Writing A Test

You can then author your test in Reason:

```ocaml
open Jest;

open MyModule;

let () =
  describe "#myFunction"
    ExpectJs.(fun () => {
      test "some behavior" (fun () => 
        expect(MyModule.doSomething "withArgs") |> toEqual "expectedOutput"
      );
      (* more tests here... *)
    })
```

Not too bad.  Nice and to the point.  The `Jest` module is making the [Jest functions](https://facebook.github.io/jest/docs/expect.html) you know and love available.

Obviously, the test stub here is relying on the existence of `MyModule.doSomething` function existing in source code in the `./src` directory.

## Test Directory

The bs-jest docs tell you to put all your tests under a `./__tests__` directory in your project.  This is so that when Bucklescript compiles the tests, they'll be put inside of the `./lib/__tests__` directory of your project, ready to be picked up by the jest runner. This is great. 

Also remember to adjust your `bsconfig.json` to look for these test files, or they won't be found:

```json
{
  "sources": [
    "src",
    "__tests__"
  ]
}
```

## Build your Reason

To build your code, compiling your source and your tests from Reason to JavaScript, you're going to need some Bucklescript goodness:

```bash
npm install -g bs-platform
```

And then in your project root, build via:

```bash
bsb -make-world
```

Now in the `./lib` directory you have your source and your tests.  Something like this:

```txt
lib
├── bs
│   ├── __tests__
│   │   ├── my_module_test.cmi
│   │   ├── my_module_test.cmj
│   │   ├── my_module_test.cmt
│   │   ├── my_module_test.mlast
│   │   └── my_module_test.mlast.d
│   ├── build.ninja
│   └── src
│       ├── my_module.cmi
│       ├── my_module.cmj
│       ├── my_module.cmt
│       ├── my_module.mlast
│       └── my_module.mlast.d
└── js
    ├── __tests__
    │   └── my_module_test.js
    └── src
        └── my_module.js
```

Lots and lots of files.

## Run Tests With Jest

Now you have generated JavaScript.  Feed it to Jest like you usually would by running:

```bash
jest
```

To wrap all this up in an npm-script, you might adjust your `package.json` to include:

```json
{
  "scripts": {
    "build": "bsb -make-world",
    "test": "npm run build && jest"
  }
}
```

Now to build and run all your Reason unit tests:

```bash
npm test
```

You'll get some output like:

```bash
 PASS  lib/js/__tests__/my_module_test.js
  #myFunction
    ✓ some behavior (5ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.582s, estimated 1s
Ran all test suites.
```

Yippee!  What else do you do to make your Reason unit tests rock?

If you're ready to use this setup, try [TDDing a ReasonML function](/post/tdd-reasonml-function/).

