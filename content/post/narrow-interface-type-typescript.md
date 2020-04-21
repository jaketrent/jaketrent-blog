---
categories:
  - "Code"
comments: true
description: "If you narrow an interface in Typescript, you can operate on it more specifically."
image: "https://i.imgur.com/zfAnVZg.jpg"
layout: post
metaKeywords: "narrow type, specific type, type predicate, in keyword, typeof, union type, typescript, property in interface"
draft: false
tags:
  - "typescript"
title: "Narrow Interface Type in TypeScript"
date: "2020-04-21"
---

If you narrow an interface in Typescript, you can operate on it more specifically.  And you can keep your type safety.

<!--more-->

## Multiple Types

Narrowing types requires first the challenge of having two or more types.  Let's say you have two interfaces:

```typescript
interface Legacy {
  render(): void
}

interface Current {
  update(): void
}
```

In this scenario, these two types represent the same kind of thing.  It's a program -- either a legacy version or the current version.  They have different APIs.  One's an object with a `render` function, the other with an `update`.  So, let's define them as related:


```typescript
type Program = 
  | Legacy
  | Current
```

Now we have a challenge to deal with.

## Distinguishing Types

In our code, we want to use the programs similarly, whether it's the legacy or current version.  So, let's say we have a function:

```typescript
function run(program: Program) {
  if (isLegacy(program)) 
    program.render()
  else 
    program.update()
}
```

Either version of the program will run, but they're kicked off with a different API.  

So, the magic question is: What's inside the `isLegacy` function that allows TypeScript to keep us type safe?

## Narrowing Types with a Type Predicate

`isLegacy` must know how to narrow the types.  We *narrow* in on which version of type `Program` it really is.  It's not enough to know that it's a `Program`; that's too broad.  We need to know if it's specifically `Legacy` or `Current`.

Here's an example implementation of `isLegacy` and how this might be done:

```typescript
function isLegacy(program: Program): program is Legacy { 
  return (program as Legacy).render !== undefined 
}
```

There's a lot of typing happening here.  Here are the important points:

- The input is the union type, `Program`.  Coming in, `program` could be either version.
- The return type is a *type predicate* (`program is Legacy`). The name `program` matches the function parameter name, followed by the `is` keyword.
- Internally, program is cast `as Legacy` so the TypeScript typechecker can be happy with `.render` being called on it.

And remember how this was used:

```typescript
  if (isLegacy(program))
    program.render()
```

Inside that conditional, after the true evaluation of `isLegacy`, calling functions that are only available on the `Legacy` version of the program is safe.

## Narrowing Types with the `in` Keyword

There's another way that type narrowing is possible.  Instead of using the type predicate, we could use the `in` keyword, testing for the existence of the distinguishing property.  

Only the `Legacy` version of `Program` has a `render` function, so we'll test for it:

```typescript
  if ("render" in program)
    program.render()
```

The nice thing about this method is that it's a little terser and not so much typing in the syntax.

What other ways have you used to narrow types in your TypeScript programs?

