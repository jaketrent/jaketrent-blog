---
layout: post
title: "Execution Context in MarkLogic"
date: "2011-03-11"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "xquery"
description: Have you ever needed to know the location of the actual file that houses the code that's currently executing?  Well, if you have then you're not alone.  I h
metaKeywords: marklogic, xquery
draft: false
---

Have you ever needed to know the location of the actual file that houses the code that's currently executing?  Well, if you have then you're not alone.  I have been there myself.  The answer might not be as interesting as some of life's deeper mysteries unveiled, but I was excited about it nonetheless.

This information seems especially useful in cases where an absolute path to the code is required but you want to avoid hard-coding context information into your app.  Your app really shouldn't care where it is deployed to afterall.  My love for Django increased when I discovered os.path.dirname(__file__).  Here's an equivalent goody in MarkLogic.

<!--more-->

If I have the following directory structure:

```
code
  cutlass
   test
    unit.xqy
```

And I want to find the context of my unit.xqy from within the unit.xqy code as it's executing, I can call this:

```
fn:concat(xdmp:modules-root(), fn:substring(xdmp:get-request-path(), 2))
```

What's happening?

* xdmp:modules-root() points to the Modules DB (which happens to be where the code is running).  This also works if you're running modules on the filesystem.
* xdmp:get-request-path() is giving you path from your domain root
* The substring is to strip the / (slash) prepended to the request path, because the modules-root also ends with a slash

Finally, that line of code yields the full path to the context of execution, boom!:

```
/code/cutlass/test/
```
As a side note to the above solution, I was thinking from [this MarkMail thread](http://markmail.org/search/?q=marklogic:%20get%20uri%20of%20current%20file#query:marklogic%3A%20get%20uri%20of%20current%20file+page:1+mid:mdj6xdqyf3lajez6+state:results) that this would work:

```
 resolve-uri(".", xdmp:get-request-path())
```

But this is all I ever got:

```
/test/
```
Anyone know what I was doing wrong?

Well, it's good to know where you came from, why you are here, and where you are going -- in many contexts, I guess. :)

  
