---
layout: post
title: "XQuery Dynamic Order By"
date: "2012-05-19"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "xquery"
description: When ordering a sequence of items in XQuery, sometimes it's desirable to be able to decide the order based on a parameter value (something dynamic).  XQuery
metaKeywords: marklogic, xquery
draft: false
---

When ordering a sequence of items in XQuery, sometimes it's desirable to be able to decide the order based on a parameter value (something dynamic).  XQuery doesn't look extremely elegant when it comes to this feature, but depending on exactly what you want, you should be able to get the job done.
<!--more-->

## Static sort

In XQuery, an a FLWOR statement can be ordered (the "O" in FLWOR).  Here are some taffy f

```
let $items := 
  <taffies>
    <taffy><quantity>13</quantity><flavor>Root Beer</flavor></taffy>
    <taffy><quantity>5</quantity><flavor>Black Licorice</flavor></taffy>
    <taffy><quantity>133</quantity><flavor>Cotton Candy</flavor></taffy>
  </taffies>
for $i in $items/taffy
order by xs:integer($i/quantity)
return $i
```

Note that if you want to sort by something besides the natural order of string values (in this case, an `xs:integer`), you need to cast the value.

## Dynamic ascending or descending

Ascending order means lowest values will be listed first, and the higher values will be listed later.  Descending means just the opposite.  By default, XQuery order by clauses are sorted in ascending order.

Let's say that you have just _one_ sort commparator (in this case, quantity) that you care to sort by.  But there's some toggle in your logic or UI or somewhere that determines whether things should be sorted in ascending or descending order.  A [nice markmail thread from Michael Blakely](http://markmail.org/thread/rpc3unlqlj72loah#query:+page:1+mid:k3zprjr4civlrkfg+state:results) reveals a nice solution.  For our example, it would look something like:


```
let $ascending := fn:false()
let $items := 
  <taffies>
    <taffy><quantity>13</quantity><flavor>Root Beer</flavor></taffy>
    <taffy><quantity>5</quantity><flavor>Black Licorice</flavor></taffy>
    <taffy><quantity>133</quantity><flavor>Cotton Candy</flavor></taffy>
  </taffies>
for $i in $items/taffy
order by
  if ($ascending) then xs:integer($i/quantity) else () ascending,
  if ($ascending) then () else xs:integer($i/quantity) descending
return $i
```

The syntax is a little odd in order for us to get the result we want.  There are two `if` expressions.  They are separated by commas, so it is pretty much just a primary, then secondary sort.  The conditional is the same on each ("if is ascending");  But then notice that was just a way to get the syntax to work, because it's really an if-else.  

## Multiple Sort Values

The next case is slightly more complicated, but I initially tried the Michael Blakely approach.  This case introduced another parameter:  Sometimes I wanted to sort by quantity, but other times I instead wanted to sort by the name of the flavor.  So, I came out with something like this:

```
let $ascending := fn:false()
let $sortby := "flavor"
let $items := 
  <taffies>
    <taffy><quantity>13</quantity><flavor>Root Beer</flavor></taffy>
    <taffy><quantity>5</quantity><flavor>Black Licorice</flavor></taffy>
    <taffy><quantity>133</quantity><flavor>Cotton Candy</flavor></taffy>
  </taffies>
for $i in $items/taffy
order by
  if ($ascending and $sortby eq "quantity") then xs:integer($i/quantity) else () ascending,
  if ($ascending and $sortby eq "quantity") then () else xs:integer($i/quantity) descending
  if ($ascending and $sortby eq "flavor") then $i/flavor else () ascending,
  if ($ascending and $sortby eq "flavor") then () else $i/flavor descending
return $i
```

El problemo is that because these are essentially just a list of secondary sorts and each `if` conditional has an `else` with an actual sort value, I'm not really sorting by just one thing.  This scenario has `$sortby` set to "flavor", but it's really still sorting by quantity descending primarily, then flavor descending secondarily.  Blast.

## Fully-dynamic order by clause -- and everything else

At this point, I was contemplating doing the full smash and just evaluating a dynamically-built string describing my desired query:

```
let $ascending := fn:false()
let $sortby := "flavor"
let $items := 
  <taffies>
    <taffy><quantity>13</quantity><flavor>Root Beer</flavor></taffy>
    <taffy><quantity>5</quantity><flavor>Black Licorice</flavor></taffy>
    <taffy><quantity>133</quantity><flavor>Cotton Candy</flavor></taffy>
  </taffies>
return xdmp:value(fn:concat("for $i in $items/taffy ",
"order by $i/", $sortby, 
if ($ascending) then
  " ascending "
else
  " descending ",
"return $i"))
```

I guess that's all right.  I try to avoid string->query conversions just for safety and code complexity, but perhaps I call `xdmp:value` safe enough here, since it's just executing XQuery within the context of the current expression, because I could call this _less_ complex than the previous (albeit not what we want) scenario.  

So, what did I end up with?

## Sort by dynamic value first

Again, all I wanted to was to sort by a single value based on a parameter, and have ascending/descending be another variable parameter.  If you don't care to get a descending sort, then dynamic order by is actually not too bad.  So, get that out of the way and then decide if you like the order or not.  If not, it must be backward, so reverse it:

```
let $ascending := fn:false()
let $sortby := "flavor"
let $items := 
  <taffies>
    <taffy><quantity>13</quantity><flavor>Root Beer</flavor></taffy>
    <taffy><quantity>5</quantity><flavor>Black Licorice</flavor></taffy>
    <taffy><quantity>133</quantity><flavor>Cotton Candy</flavor></taffy>
  </taffies>
let $sorted := 
  for $i in $items/taffy
  order by
    if ($sortby eq "quantity") then 
      xs:integer($i/quantity)
    else if ($sortby eq "flavor") then 
      $i/flavor
    else 
      ()
  return $i
return if ($ascending) then
  $sorted
else
  fn:reverse($sorted)
```

Thanks for the suggestion, Tommy.  It's simple.  Maybe not super-efficient for large datasets.  But, it gets the job done.  

Any other awesome ways you've found to get dynamic order by clauses in your XQuery statements?

  
