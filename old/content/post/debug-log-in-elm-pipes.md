---
layout: post
title: "Debug.log in Elm Pipes"
date: "2016-12-15"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "elm"
  - "debugging"
description: How to print to the console when piping data in Elm
metaKeywords: js, elm, debug, debug.log, console.log
draft: false
image: https://i.imgur.com/1c6FH0f.png
---

There aren't many functions in the standard lib for elm that create side effects.  Elm's `Debug.log` is one of those exceptions.  It logs to the console.  Here's how it's setup to make console logging whilst piping easier that patting your head whilst rubbing your tummy.

<!--more-->

## The signature of Debug.log

The coolest thing about `Debug.log` is its type signature:

```
String -> a -> a
```

The first parameter is `String` and traditionally takes some label to identify what you're printing in the log.

The 2nd parameter is `a`, meaning it can be generically anything.   It's worth noticing that `a` as the 2nd parameter is required.  This means you'll have to print a value there whether you want to or not.  Otherwise, you won't be fully applying the `Debug.log` function.

The _coolest_ part is that `a` is also returned.  This helps with piping because you can just insert `Debug.log` in your pipe chain.

## Logging in Elm

Here's a little example.  In this `encode` function there are several pipes.  There are two helper functions, `keyIndex` and `keyValue` that return values that I'd like to investigate.  After each of those values are returned in the pipe chain, a `Debug.log` is inserted next in the chain with the associated "indexes" or "values" label for log clarity.

```haskell
encode : String -> String
encode phrase =
    phrase
        |> String.toLower
        |> String.split ""
        |> List.map (\l -> l |> keyIndex)
        |> Debug.log "indexes"
        |> List.map (\i -> -1 * i)
        |> List.map keyValue
        |> Debug.log "values"
        |> String.join ""
```

The resulting log for a test run of this code is:

```
indexes: [24,4,18]
values: ["b","v","h"]
```

This can be super nice when you're not in a live debug-ready environment.  What are some other ways to gain insight into your code for debugging that you use?



