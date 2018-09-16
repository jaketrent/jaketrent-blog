---
categories:
- "Code"
comments: true
date: 2017-03-30T06:45:48-06:00
description: "Get a first taste of Elm's syntax in this kata to implement your own map function"
draft: false
image: "https://i.imgur.com/VLYEPps.jpg"
layout: post
metaKeywords: "elm, kata, beginner, syntax, tdd, elm-test"
tags:
- "elm"
title: "Elm: First Taste of Syntax"
---

Get a first taste of Elm's syntax in this kata to implement your own map function.  We'll start with a failing test suite, work through first errors, make the tests pass, explain basic tidbits of syntax along the way.

<!--more-->

This exercise was adapted from the "Accumulate" [exercism](http://www.exercism.io/).  If you'd like to follow along, you can clone this [elm-kata-map](https://github.com/jaketrent/elm-kata-map) repo.

## The Test Suite

The test cases in `Test.elm` that we'll start with are these:

```
import Map exposing (map)
-- ...

square x =
    x * x

describe "Map"
    [ test "[] Map" <|
        \() -> Expect.equal [] (map square [])
    , test "square Map" <|
        \() -> Expect.equal [ 1, 4, 9 ] (map square [ 1, 2, 3 ])
    , test "toUpper Map" <|
        \() ->
            Expect.equal [ "HELLO", "WORLD" ]
                (map String.toUpper [ "hello", "world" ])
    , test "reverse Map" <|
        \() ->
            Expect.equal [ "olleh", "dlrow" ]
                (map String.reverse [ "hello", "world" ])
    ]
```

- `Expect.equal` is our assertion.  Its first arg is the expected output.  The second arg is the exercise of our subject under test with specific input.
- It looks like the tests are telling us we want to create a `map` function that takes a transform function and a `List`.  Calling `map` with these inputs will return a new, transformed `List`.

## Error #1 - File

To run the tests, we're using `elm-test`.  To install the test runner, `npm install -g elm-tests`.  To run the tests, run `elm-test` in the project directory.  The first test run will yield this error:

```
I cannot find module 'Map'.

Module 'Tests' is trying to import it.
```

We have not created our source file yet for `Map.elm`.  Once we create it in `src/Map.elm` and run the tests again, the error changes.

## Error #2 - Module

Now the error is:

```
The module name is messed up for ./../src/Map.elm

    According to the file's name it should be Map
    According to the source code it should be Main

Which is it?
```

In Elm, file names are significant and tied to the module name.  Since the file is named `Map.elm`, we'll call our module that as well, making the first line of `src/Map.elm` read:

```
module Map exposing (..)
```

- `Map` is the name of the module
- The `exposing` clause allows you to export a public interface from the file
- `(..)` indicates you want all declarations exported

## Error #3 - Declaration

Let's comment out all but the first test. That seems like a smart thing to do, right? :) `--` is a line comment in Elm.  Leaving just one test running will help us focus on implementing only what's needed for it to pass.  Re-run the tests.  The error is now different.

```
I ran into something unexpected when parsing your code!

I am looking for one of the following things:

    "{-|"
    a definition or type annotation
    ...
```

This means that we have yet to make our module do anything.  There are no declarations in the file.  Let's make our first.  Look at the first test case in `Test.elm` to decide the API that the test requires:

```
(map square [])
```

- `map` is the name of a function
- Functions are invoked by following the function name with space-separated arguments.
- The first arg is a function that takes input and maps to another output.
- The second arg is a `List`.  This is a core type -- ordered, homogenous, but not indexable.  We have to deal in sublists with `List`.  We'll deal with this later.

## Declare our Function

So we declare the `map` function in our `src/Map.elm` file to match this expected use:

```
map transform list =
    []
```

- The name of function is first.
- Space-separated parameters come before the equal sign.
- The equals sign will bind the following expression to the identifier.
- This function is hardcoded to always return an empty `List` (`[]`).

Now it should compile and *pass* the first test.

## Type Annotation

The compiler can infer types.  We can also make them explicit.  Sometimes this is to help the compiler.  It is always to help the reader.  Add this to the line directly before your function declaration:

```
map : (a -> b) -> List a -> List b
```

- First comes the name of the function.
- Separated by `:` colon
- Then comes the list of parameters, separated by `->` arrows.
- The final "parameter" is actually the return type; ie `List b`
- Parameters are listed as types only, no variable names.
- `a` and `b` are generic types. By convention, generics start with `a` and go in alpha order.
- The type `(a -> b)` is a function that takes one type (`a`) and returns another (`b`).
- `List a` is a `List` of generic type `a`

## Pattern Matching

Now uncomment the next test and re-run the tests.  It should fail.  Now we need to deal with the test case of an non-empty list:

```
Expect.equal [ 1, 4, 9 ] (map square [ 1, 2, 3 ])
```

We're going to setup the structure for solving this problem with pattern matching. Elm has great pattern matching capabilities.  Think of it as conditions, as in `if-else` expressions, but with more powerful matching.  A `case-of` expression is used to invoke pattern matching.  Add this to the body of your `map` function:

```
case list of
    [] ->
        []

    _ ->
        [ 1, 4, 9 ]
```

- Patterns are registered as `{expression} -> {expression}` after the `case`.
- The pattern can be a literal, eg `[]`.
- `_` is the default/catch-all case.

To get this to compile and pass the 2nd test, we'll need to temporarily adjust the type annotation to allow returning a `List number`. This step was just to push the TDD a little further, so this feels a bit artificial.  Never fear, we're about to finish up with the meat of the function. Now uncomment the other two tests, and let's finish the real pattern mathing.  Now we have to handle arbitrary lists and transforms:

```
Expect.equal [ "HELLO", "WORLD" ] (map String.toUpper [ "hello", "world" ])
Expect.equal [ "olleh", "dlrow" ] (map String.reverse [ "hello", "world" ])
```

## Finish the Solution

Replacing the 2nd pattern in the `case-of` expression, we can handle all inputs.  The final state of `src/Map.elm` is this:

```
module Map exposing (..)


map : (a -> b) -> List a -> List b
map transform list =
    case list of
        [] ->
            []

        head :: tail ->
            transform head :: map transform tail
```

- `head :: tail` matches a non-empty `list` variable.
- `::` is an operator for adding an element to the front of a list. So this pattern can be thought of as "Is there an element at the front of the list?"
- The pattern binds the `head` and `tail` variables to the actual head (first, single element) and the tail (`List` of remaining elements).  Those variables are available to use in the expression after the `->`. 
- `transform head` changes just the first element of the original `list`.
- The call to `map` is recursive.  We send the `transform` function straight through. `tail` becomes a new list (because the first element has already been transformed).
- As the stack returns, the new list will concat using the `::` operator.

We did it!  Re-running all the tests, they pass.  We had a good first taste of Elm syntax along the way, exercised in a short test-driven exercise.  How was the taste to you?  Did you like it?
