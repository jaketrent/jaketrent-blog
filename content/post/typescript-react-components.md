---
categories:
  - "Code"
comments: true
description: "How to change colors for the UI in Vim"
image: "https://i.imgur.com/ZZvFs0E.jpg"
layout: post
metaKeywords: "vim, vim theming, vim color overrides, vim highlight colors"
draft: false
tags:
  - "vim"
title: "Typing React Components in TypeScript"
date: "2020-10-08"
---



<!--more-->

Cookbook

## Forward ref

```typescript
import { ForwardRefExoticComponent, RefAttributes } from 'react'
type RefForwardingComponent<
  P = Record<string, unknown>,
  E = Element,
  S = Record<string, unknown>
> = ForwardRefExoticComponent<P & RefAttributes<E>> & S

interface MineProps {}
interface MineStatics {}

interface MineComponent extends RefForwardingComponent<
  MineProps,
  HTMLDivElement,
  MineStatics,
> {}

const Mine = React.forwardRef((props, ref) => (
  <div ref={ref}>Mine</div>
)) as MineComponent
```

### Compound components

This is for sub components attached to the parent/original, often referenced in dot notation (eg, `<Mine.SubMine />`).

Adjust the "forward ref" recipe to include:

```typescript
interface MineStatics {
  SubMine: typeof SubMine
}

const SubMine: React.FC = () => <div>SubMine</div>
Mine.SubMine = SubMine
```

### Compose multiple interfaces

Method: Extend multiple interfaces

```typescript
interface One {}
interface Two {}
interface Three extends One, Two {}
```

Method: Combine interfaces into a type

`&` is only usable on `type`.

```typescript
interface One {}
interface Two {}
type Three = One & Two
```

### Accept a native prop and pass to another kind of HTMLElement

Approach: Omit the prop and then manually specify it for the other element type.  For example, div on the outside, button that receives onClick on the inside.

```typescript

interface MineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Mine: React.FC<MineProps> = () => <div><button onClick={props.onClick} /></div>
```

### Add statics to a React component

```typescript
interface MineStatics {
  staticThing: string
}
const Mine: React.FC<MineProps> & MineStatics = () => <div>Mine</div>
Mine.staticThing = 'Tis mine'
```

### forwardRef with useImperativeHandle

Have an internal ref that you want to link to parent ref if forwarded.

```typescript
// TODO: simplify component types (no statics)
import { ForwardRefExoticComponent, RefAttributes } from 'react'
type RefForwardingComponent<
  P = Record<string, unknown>,
  E = Element,
  S = Record<string, unknown>
> = ForwardRefExoticComponent<P & RefAttributes<E>> & S

interface MineProps {}
interface MineStatics {}

interface MineComponent extends RefForwardingComponent<
  MineProps,
  HTMLDivElement,
  MineStatics,
> {}

const Mine = React.forwardRef((props, forwardedRef) => { 
  const ref = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(forwardRef, () => (ref.current as unknown) as HTMLDivElement)
  return <div ref={ref}>Mine</div>
}) as MineComponent

```

### Override properties in an interface

Extend it, but by omitting in the first place the multiple properties in the super interface that you're "overriding".

(Also includes how to omit multiple properties.)

```typescript
interface SpreadsPropsOntoAnotherHTMLType extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'|'disabled'> {
  // specify everything omitted and used where the rest of the props aren't spread
  disabled: boolean
  onClick: (evt: React.MouseEvent(HTMLButtonElement, MouseEvent>) => void
}

const Mine: React.FC<SpreadsPropsOntoAnotherHTMLType> = props =>  {
  const { onClick, disabled, ...rest } = props
  return <div {...rest}><button onClick={onClick} disabled={disabled}>Mine</button></div>
}
```

### Type a prop as a specific custom component

This is more specific than React.Node or React.Element.

```typescript
interface MineProps {
  other: React.ReactElement<typeof OtherComp>
}
const Mine: React.FC<MineProps> = props => <div>{props.otherComp}</div>
const OtherComp: React.FC = props => <div>Other</div>
```

### Extend the props of a React component

Seen in testing situations where a mock might be made of 3rd-party component

```typescript
import OtherComponent from 'other-package'

interface MineProps extends React.ComponentProps<typeof OtherComponent> {
  // more props
}
const Mine: React.FC<MineProps> = props => <OtherComponent {...props} />
```

### Extend and indexed access type

Seen in testing situations where a mock might be made of 3rd-party component

Also note: `JSX.IntrinsicElements` seems a better supertype for type checking HTML attributes compared to React.HTMLAttributes.

```typescript
type ButtonEl = JSX.IntrinsicElements['button'] 
interface MineProps extends ButtonEl {}
const Mine: React.FC = props => <button {...props} />
```

### TODO: ForwardRef with statics

### Finish: return type guaranteed by param
Trying to make defined inputs return defined outputs to avoid null checking

```
function forceValidDay<B = Date | undefined>(date: B): B extends Date ? number : undefined {
function forceValidDay(date: Date): number | undefined {
```


### Omit
### Required
### typeof
### keyof
