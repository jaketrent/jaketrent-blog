---
categories:
- "Code"
comments: true
date: 2017-07-21T07:16:03-06:00
description: "Let's test-drive some ReasonML code together."
draft: false
image: "https://i.imgur.com/gGrGCxt.jpg"
layout: post
metaKeywords: "tdd, reasonml, javascript, tdd reason, bs-jest, jest"
tags:
- "reasonml"
- "tdd"
title: "TDD a ReasonML Function"
---

Let's test-drive some ReasonML code together.

<!--more-->

## The Goal

Our goal will be to recreate a simple [List.map](https://en.wikipedia.org/wiki/Map_(higher-order_function)) from the [stdlib](https://reasonml.github.io/api/List.html).  Ours will be called `Listy.map`.

<div class="video-container">
<iframe width="1280" height="720" src="https://www.youtube.com/embed/nivVNJPj2z8?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

To get started, download [the exercise on github](https://github.com/jaketrent/reason-kata-map):

```bash
git clone git@github.com:jaketrent/reason-kata-map.git
```

And setup the project for development:

```bash
cd reason-kata-map
npm install
```

## The Test Suite

We'll start with an existing test suite (in `__tests__/listy_test.re`).  Here's the suite:

```ocaml
open Jest;

open Listy;

let () =
  describe "map"
    ExpectJs.(fun () => {
      test "map []" (fun () => {
        let noop = fun () => {};
        expect(Listy.map noop []) |> toEqual []
      });
      test "map square" (fun () => {
        let square = fun x => x * x;
        expect(Listy.map square [1, 2, 3]) |> toEqual [1, 4, 9]
      });
      test "map String.toUpperCase" (fun () =>
        expect(Listy.map Js.String.toUpperCase ["hello", "reason"]) |> toEqual ["HELLO", "REASON"]
      );
      test "map String.length" (fun () =>
        expect(Listy.map Js.String.length ["hello", "reason"]) |> toEqual [5, 6]
      );
    });
```

To start, comment out or remove all but the first test.

To run the tests:

```bash
npm tests
```

## Test 1: Empty List

The first test defines what should be returned by map for an empty list.  This first test is currently failing.

This is the error we see in the console:

## Error: No Such Directory

```txt
Fatal error: exception Sys_error("reason-kata-map/src: No such file or directory")
```

Let's create that `src` dir:

```bash
mkdir src
```

Running the tests again, we get a new error:

## Error: Unbound Module

```txt
Error: Unbound module Listy
```

Let's create a new file: 

```bash
touch src/listy.re
```

Rerun tests, get a new error:

## Error: Unbound Value

Our `map` function doesn't exist:

```txt
Error: Unbound value Listy.map
```

Let's write the placeholder noop function by that name in `src/listy.re`:

```ocaml
module Listy = {
  let map () => {};
};
```

And test again.  Our new error:

## Error: Too Many Args

```txt
Error: This function has type unit -> <  >
       It is applied to too many arguments; maybe you forgot a `;'.
```

Our stub implementation takes no args, but the test is applying the function with two args: the transform function and the list to map.

Let's adjust the parameter list:

```ocaml
module Listy = {
  let map fn arr => {};
};
```

Rerun the tests for the next error:

## Error: Incompatible Return Type

```txt
Error: This expression has type
         'a list Jest.ExpectJs.partial -> 'a list Jest.assertion
       but an expression was expected of type
         <  > Jest.ExpectJs.partial -> 'b
       Type 'a list is not compatible with type <  >
```

There's a lot in this one.  I'm reading: "the test wants this function to return a generic list but you're returning nothing in your function".

Change the return value to be the correct type and value for the first test:

```ocaml
module Listy = {
  let map fn arr => [];
};
```

Rerun the tests, and the first one passes:

```txt
 PASS  lib/js/__tests__/list_test.js
  map
    ✓ map [] (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.799s, estimated 1s
Ran all test suites.
```

## Test 2: Real Transform Function

The next test uses a real transform function that squares all integer input.  Uncomment it, and run the tests again.

Tests are again red:

```txt
FAIL  lib/js/__tests__/list_test.js
  ● map › map square

    expect(received).toEqual(expected)

    Expected value to equal:
      [1, [4, [9, 0]]]
    Received:
      0

    Difference:

      Comparing two different types of values. Expected array but received number.

      at assert_ (node_modules/bs-jest/lib/js/src/jest.js:117:39)
      at Object.<anonymous> (node_modules/bs-jest/lib/js/src/jest.js:234:11)
      at Promise.resolve.then.el (node_modules/p-map/index.js:42:16)
      at process._tickCallback (internal/process/next_tick.js:109:7)

  map
    ✓ map [] (4ms)
    ✕ map square (10ms)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.864s, estimated 1s
Ran all test suites.
```

The odd printing of the expected list could be attributed to the implementation of the `list` type in Reason (or the in-progress nature of `bs-jest`).  `List` in ReasonML is implemented as a linked list, where the head element has the first value and a pointer to the rest (tail) of the list.  That type might be expressed like this:

```ocaml
type myListType 
  = Empty 
  | NonEmpty int myListType;
```

## Pattern Matching

Now that we understand the test output, we need to introduce some branching to make both tests pass.  We'll accomplish this with pattern matching.

```ocaml
module Listy = {
  let map fn arr => {
    switch arr {
      | [] => []
    }
  };
};
```

We've changed the implementation to use a `switch`, but only the first test is still passing.  We haven't introduced the pattern match for the 2nd test. 

This results in an interesting warning when we rerun the tests:

```txt
Warning 8: this pattern-matching is not exhaustive.
```

It's surprising this will even compile if this is not a total function.

`switch` is the keyword that will pattern match on `arr`.  The pipe `|` indicates a new pattern.  The expression that is run when the pattern match is after the `=>`.  Let's add a `_` pattern to indicate the default pattern:

```ocaml
module Listy = {
  let map = fun fn list => {
    switch list {
      | [] => []
      | _ => [1, 4, 9]
    }
  };
}
```

The value `[1, 4, 9]` will help our 2nd test pass.  Rerun the tests, and they are green.

## Test 3: Another Transform

Now uncomment the next test. We're red again, and we now have to support the general case for transformation.  I reach for my usual functional pattern for non-empty list:

```ocaml
module Listy = {
  let map fn arr => {
    switch arr {
      | [] => []
      | head :: tail => fn head :: map fn tail
    }
  };
};
```

Running the tests, we get our new error:

## Error: Cons is Not Supported

```txt
File "reason-kata-map/src/listy.re", line 5, characters 13-15:
Error: :: is not supported in Reason, please use [hd, ...tl] instead
```

This is surprisingly specific and seems to indicate that many developers reach for the same pattern.

Let's try the suggested, more ES6-like, syntax:

```ocaml
module Listy = {
  let map fn arr => {
    switch arr {
      | [] => []
      | [head, ...tail] => [fn head, ...map fn tail]
    }
  };
};
```

Rerun the tests, and we get the next error:

## Error: Unknown Recursive Function

```txt
File "reason-kata-map/src/listy.re", line 5, characters 40-43:
Error: Unbound value map
```

If we look for the reference to `map` on the specified line, it's our recursive call to our own function.  Look like, just as in F#, the compile requires us to give it a hint (`rec` keyword) when we use recursive functions:

```ocaml
let rec map fn arr => ...
```

Rerun the tests, and they pass.  For funsies there's one more test.  Uncomment it, and it also passes.  

```txt
 PASS  lib/js/__tests__/listy_test.js
  map
    ✓ map [] (4ms)
    ✓ map square (1ms)
    ✓ map String.toUpperCase (1ms)
    ✓ map String.length

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.902s, estimated 1s
Ran all test suites.
```

## All Green!

We did it!  We used a test suite to drive our development of some Reason code.  Now we have our own `map` function. The errors helped us learn some things about the Reason syntax and compiler along the way.

What else did you learn in this process?  What are you going to write next?
