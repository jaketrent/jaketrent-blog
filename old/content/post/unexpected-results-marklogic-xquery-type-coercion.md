---
layout: post
title: "Unexpected Results in MarkLogic Xquery Type Coercion"
date: "2010-12-17"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "typing"
  - "xquery"
description: Recently, we've been working on writing an API using xquery.  We have wanted to make the API as solid as possible, since we're putting the brunt of the comp
metaKeywords: marklogic, typing, xquery
draft: false
---

Recently, we've been working on writing an API using xquery.  We have wanted to make the API as solid as possible, since we're putting the brunt of the complexity of our system into this module of code.  What might typing our parameters and return types give us?  We are hoping for safety and readability.  

<!--more-->

Safety-wise, we're a little perplexed on how safe typing really is.  In the past, it's helped fail fast, providing feedback on data anomalies or bad conditions during test.  But, if you haven't tested a particular condition that would trigger an error, you're going to have to wait until runtime to then get the app to blow up in your face.  A compile-time check would be really nice here.

Readability, I think, is vastly improved by typing parameters and return types.  I'm very thankful that the built-in functions of MarkLogic, the Xquery implementation I use most often, are so annotated.  I also dig the occurrence indicators a la regex that provide terse, elegant meaning.

In trying to get to the point of increased safety and readability, I've also reached the point of increased confusion.  We setup an example of what we thought would error out, but instead it still didn't work, but gave us something unexpected.  Here's the example:

```
xquery version "1.0-ml";

declare namespace aw = "awesome";

declare function aw:foo($in as xs:string) as xs:string? {
  ()
};

declare function aw:foo2($in as xs:string) {
  "sweetness"
};

aw:foo2(aw:foo("something"))
```

The function foo2() is supposed to requires a string and return "sweetness".  We pass into foo2() the result of foo(), which is always an empty sequence, so we would have expected the call to foo2() to blow some serious xml chunks.  Instead, the return value of the whole expression is also empty sequence.  Will someone please explain why this is, because foo2() is hardcoded to return "sweetness".  Is it that foo2() is never called?  And if so, why does that seem to happen silently?  Doesn't that seem dangerous?  The mysteries mount.  

If I change the xquery version itself on this code to read:

```
xquery version "1.0";
```
	
Now we're back into vanilla Xquery land without the MarkLogic flavor.  Now, I get what seems to be a more expected response.  Calling this code now yields this lovely:

```
[1.0] XDMP-AS: (err:XPTY0004) $in as xs:string -- Invalid coercion: () as xs:string
Stack trace:

line 9:
7: };
8: 
9: declare function aw:foo2($in as xs:string) {
10: "sweetness"
11: };

aw:foo2(())


line 13:
11: };
12: 
13: aw:foo2(aw:foo("something"))
14: 
15:
```

So, is this a bug in the MarkLogic implementation of type checking, coercion or something else?  Beats me, but for now this is something that makes me a little more unsure of the code I write in Xquery/MarkLogic.  Help me Obi-wan, you're my only hope.
	

**Update - Mystery Solved**

Kelly Stirman of MarkLogic was kind enough to comment on my consternation (see his post below).  I took his advice, saw the coercion error that I was observing when running in vanilla 1.0 xquery, and the universe came back into alignment.

So, it turns out that my function foo2() was indeed never called.  From the [MarkLogic Docs](http://docs.marklogic.com/4.2doc/docapp.xqy#display.xqy?fname=http://pubs/4.2doc/xml/xquery/enhanced.xml%2355459) describing function mapping:

One consequence of function mapping, which can be **surprising** the first time you see it, is that if the value passed for a parameter is the empty sequence, it could result in the function being called 0 times (that is, in the function never runs and results in the empty sequence. For example, if you entered the empty sequence as the parameter to the above function call, it returns empty, as follows:

```
xquery version "1.0-ml";

declare function local:print-word ($word as xs:string) { $word };

local:print-word( () )
(: 
   evaluates the print-word function zero times, resulting 
   in the empty sequence
:)
```
The `local:print-word` function is never called in this case, because it is iterating over the empty sequence, which causes zero invocations of the function. If your function calls are fed by code that can return the empty sequence (an XPath expression, for example), then you might see this behavior.

And boy was I surprised. :)  

So, what was the fix?  It was to disable function mapping that MarkLogic-flavored Xquery adds as an extension to the language:

```
xquery version "1.0-ml";

declare namespace aw = "awesome";

declare namespace xdmp = "http://marklogic.com/xdmp";

declare option xdmp:mapping "false"; 

declare function aw:foo($in as xs:string) as xs:string? {
  ()
};

declare function aw:foo2($in as xs:string) {
  "else"
};

aw:foo2(aw:foo("something"))
```

This yielded:

```
[1.0-ml] XDMP-AS: (err:XPTY0004) $in as xs:string -- Invalid coercion: () as xs:string
```

And I felt much better knowing what was happening in the code.

The behavior of not calling a function when passed an empty sequence when function mapping is on does not seem very intuitive to me, but it does seem to fit in with the logic of function mapping if it treats for the sequence as the variable iterated on in the for a FLWOR.  Recently, I've created a hotkey for turning off function mapping for other reasons, and now here's another one.  I have obviously not leveled up sufficiently to handle this function mapping beast with any dexterity.  

Thanks, Kelly, for letting our souls rest easier over the holidays. :)

  
