---
categories:
- "Code"
comments: true
date: 2017-03-20T07:27:26-06:00
description: "Here's a way to run headless elm in the terminal via node."
draft: false
image: "https://i.imgur.com/VLYEPps.jpg"
layout: post
metaKeywords: "elm, run in node, run in terminal, run on commandline"
tags:
- "elm"
title: "Run Elm in the Terminal"
---

[Elm](http://elm-lang.org/) is usually run in a browser with output in HTML.  So how does one run Elm outside the browser, say, in the terminal?  Here's a quick setup.

<!--more-->

## Setup Headless Elm

A headless program is one without a UI.  If we run in a terminal or the commandline, we'll be bypassing any UI building and just using the console to log out program results.  The same kind of program could be run in node.  In fact, when we exercise this program, we'll use `node` to run it.

Let's walk through a quick code snippet.  Let's say that I wrote an elm program in `MyProgram.elm`.  In this case, it's simply logging a value: 

```
module MyProgram exposing (..)


print : Int -> Int
print num =
    Debug.log "num of destiny" num
```

Pretty interest, eh? How should we run this?  Let's write a program runner.  In `Main.elm`, let's work through the different bits:

First, import your program that you want to run.

```
module Main exposing (..)

import MyProgram exposing (print)
```

Then import the `program` function from platform.  This is the function that Elm provides to create a headless program:

```
import Platform exposing (program)
```

Now let's write the function that calls the `program` function and initializes it with sufficient setup data.  First, the function signature:

```
nodeProgram : a -> Program Never () ()
```

Let's break it down:

- `nodeProgram` is the name of our function
- `a` indicates that this function can take any generic function
- The return value is a `Program` type.
- `Program`'s first arg is [`Never`](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Basics#Never), which means it is a program that will never receive flags.  If you want flags, use the sister `programWithFlags` function.
- `Program`'s next two args are `()`, or unit. The first `()` is the model.  This program runner has no state, so it has no model.  The last `()` indicates there are no `Cmd`s or effects that are handled by this program.  

The actual body of the function and the call to `program` is like this:

```
nodeProgram _ =
    program
        { init = ( (), Cmd.none )
        , update = \() -> \() -> ( (), Cmd.none )
        , subscriptions = \() -> Sub.none
        }
```

Another quick breakdown:

- The program takes one function parameter.  This is to handle our `MyProgram#print` output.  The `_` naming convention indicates it's unused.
- `init` and `update` keep the model at `()` and `Cmd.none`.  These are required values in the `program` invocation, but we're not going to use them.
- Sames goes for `subscriptions`

Finally, we get to run the module with a `main` function:

```
main : Program Never () ()
main =
    nodeProgram (print 9)
```

This is the entry point for our runner.  It is also the place where we call our `print` function from our module and pass it to the headless `nodeProgram`.

## Running Elm on Node

Now all we have to do is compile and run.  To compile:

```bash
elm make --output main.js *.elm
```

And then to run:

```bash
node main.js
```

And as we'd expect from our setup, the output is:

```bash
num of destiny: 9
```

For the code all together, see [this gist](https://gist.github.com/jaketrent/df13653b7471bc63bdb5f1f32ad04c81).

## elm-run

Not too bad, right?  Well it can get even easier.  If you'd like to have this `Main.elm` setup wrapped up in a package that already exists, try out [elm-run](https://github.com/jfairbank/run-elm).

To install:

```bash
npm install -g elm-run
```

And then to run against your program:

```bash
elm-run MyProgram.elm
```

The output will be the same.

What are some other ways that you've found to run a headless Elm program?
