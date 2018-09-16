---
layout: post
title: "Xquery Imports on MarkLogic"
date: "2011-01-28"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "maven"
  - "xquery"
description: When a person looks at an Xquery module import, ... um, sorry... he usually gets distracted by something else before he can get to the semicolon at the end 
metaKeywords: marklogic, maven, xquery
draft: false
---

When a person looks at an Xquery module import, ... um, sorry... he usually gets distracted by something else before he can get to the semicolon at the end of the statement.  They're seriously long!  Few are the files in which one-line imports adhere to an 80 character width limit.  Read on for my other Martin Luther-spirited grievances.

<!--more-->

Length
------

Ridiculously long.  Example that speaks for itself:

```
import module namespace translate = "http://aprilandjake.com/audience/modules/content/translate" at "/modules/content/translate.xqy";
```

Ok, some of the blame here lies with me for picking a ridiculous namespace.  But it seems conventional to stick the domain on the front in proper URL fashion.  And then, I'm mirroring the path from app server root as the rest of the namespace, which takes me to repetition:

Repetition
----------

Doesn't it seem like we have the same data listed here twice.  From what I'm getting from the [W3C Xquery Spec](http://www.w3.org/TR/xquery/#id-module-import):

The URILiterals that follow the at keyword are optional location hints, and can be interpreted or disregarded in an implementation-defined way.

The implementation I'm operating in is MarkLogic.  As far as I can tell, then url after the "at" is required in this implementation.  Can anyone fulfill a boyish dream of mine and tell me otherwise?  Please!

So, I thought I was pretty cool creating a Live Template in IntelliJ to throw down this nasty import for my current project and save me a few keystrokes:

```
import module namespace $NAME$ = "http://aprilandjake.com/audience$PATH$" at "$PATH$.xqy";
```

So, then I could type the path from app server root to the library module file once and it would be duplicated, but now I get bitten by paths:

Paths
-----

It seems like most of the Xquery code that I see uses absolute paths after the "at" in the import, as in:

```
import module namespace myns = "http://super.long/namespace/of/modules/death" at "/modules/death.xqy";
```

Note the leading slash.  So, I have done this in most of my code.  Remember, it helps my live template work as well (less typing overall).  Well, it seems that I may need to change my standard here, because the leading slash limits me, as I see it, in my code reuse.  Paraphrasing from the [MarkLogic Documentation](http://docs.marklogic.com/4.2doc/docapp.xqy#display.xqy?fname=http://pubs/4.2doc/xml/dev_guide/import_modules.xml%2329407):

Paths in imports are resolved as follows:

1. Starts with "/", look under Modules subdir in MarkLogic install
2. Starts with "/", look under App Server root
3. Doesn't start with "/", look relative to location of referencing module
4. Contains scheme/network location (eg, "http://"), throw exception

So, everything's all well and good using leading "/" in the "at" expression until you want to reference the same code from multiple locations (really only a problem in local filesystem development thus far).  For Example:  

- App Server 1 - This app server's root is pointed to its own code.  Absolute paths work fine. Bam!
- App Server 2 - This app server's root is different.  It has its own code and also has a maven dependency declared on the code that's currently being run on App Server 1.  App Server 1 code is a module that I've packaged up and sent to the maven repo, but developing locally, I don't have a compile or package phase for running my app, so I create a symlink with the same name as the artifactId to where the code is that I want to reference.  To get my import statements that link App Server 2 to App Server 1 code to work, I have to add the artifactId at the front of the absolute path.  But, now the problem is the code within App Server 1, where it links to itself.  Because it uses the leading "/" (absolute), MarkLogic tries to resolve it under App Server root, which in this case is a different App Server entirely.  

So, am I stuck using relative paths at least inside of the App Server 1 code?

Dreams
------

All I want in an import statement is to declare to my language that I want to use code that is stored elsewhere.  Can't we do that in fewer than 80 chars?  And couldn't there be a really cool convention (over configuration), for developers like me whose fingers tire from writing ranting blog posts, that, for example, could derive a path to the .xqy file from the namespace that follows said convention?  Finally, I can't help but think that there has to be an easier way for me to find and run bits of code from places besides my App Server root, even in local filesystem dev mode.

Help me, Obi-wan Kenobi, you're my only hope.

  
