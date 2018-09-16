---
layout: post
title: "Xdmp:Login Love"
date: "2011-02-03"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "security"
  - "xquery"
description: How do you log into a MarkLogic application to run as a user besides the default app server user?  Use xdmp:login(), baby!  User/role management can be awes
metaKeywords: marklogic, security, xquery
draft: false
---

How do you log into a MarkLogic application to run as a user besides the default app server user?  Use xdmp:login(), baby!  User/role management can be awesome -- when it's done and coded.  For now, let's sing out a few important things to remember about xdmp:login() and all its hidden secrets.

<!--more-->

My voice is my passport...
--------------------------

I was debugging some xdmp:login() goodness and realized that sometimes the SEC-PRIV exception wasn't thrown.  It seems that if the xdmp:login() doesn't recognize the username as a user known to the system, it won't login.  Thus, if I code this beauty:

```
xdmp:login("asdf")

```
It won't even try.  It just doesn't do anything, assuming "asdf" really isn't a known user in your app.

Session Masquerade
------------------

Make sure that you realize, as I failed to scrutinize in my quick glance at the [xdmp:login() API](http://developer.marklogic.com/pubs/4.2/apidocs/AppServerBuiltins.html#xdmp:login), that by default xdmp:login() logs in as the specified user for the entire session.  The last (optional) parameter, $set-session is true by default.  What will stop the masquerade?  Only session timeout or a call to xdmp:logout().  Don't want to have to rip the mask off your user every time?  Try:

```
xdmp:login($username, (), fn:false())
```

But, if session logins are what you're craving, you may run into the same issue I did... On a dark dreary night I crept to the monitor, brought up my code and began pressing the keys... typity, typity.  The branches of the tree outside scraped across the moonlit window.  Breathing more quickly now, I focused back at the flickering monitor.  I did an xdmp:login() to a user that didn't have the xdmp-login execute privilege.  It worked.  But then to my horror, the second time it failed.  But, why?  Thinking that I might have to beat back the horrors of the night at any time with a flashlight, I stumbled to my feet.  Then, I realized that I was now permanently (at least for the duration of the session) an unprivileged peon and could not enjoy the warmth that privilege had once bought me.  After this realization, my nocturnal hallucination suddenly seemed less harrowing, less threatening, and I committed my code and went to sleep.

Obviously not wanting to relive such an experience, just realize that you'll need more logic around when to xdmp:login() and, in this case more importantly, when to not login.

And now a word about amps
-------------------------

Another experience to not forget (and also, thankfully, not embellish to such great, un-useful lengths) is that amps on the filesystem act a little bit differently than everywhere else.  That is, when I was trying to define xdmp-login privileges for the function that performed the password-less xdmp:login(), I couldn't seem to get them to take on the filesystem.  That is because my deployment mechanism doesn't apply amps to the filesystem.  If you want that goodness, make sure you do something as sweet as this:

```
xdmp:amp($namespace, $localname, $module-uri, xs:unsignedLong(0))
```

Where the "0" represents the filesystem instead of a deployed Modules database.

... verify me.

  
