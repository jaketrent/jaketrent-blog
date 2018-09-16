---
layout: post
title: "Add Zerigo DNS to Heroku"
date: "2013-12-31"
comments: true
categories:
  - "Code"
tags:
  - "heroku"
  - "dns"
description: Heroku has a great addon to setup DNS routing for you called Zerigo.  Here's help where the docs fail.
metaKeywords: heroku, zerigo, dns, nameserver, bamboo, h70
draft: false
image: https://i.imgur.com/6DUwRKt.png
---

Once upon a time, I could setup DNS super easily on Heroku using their Zerigo DNS addon.  Lately, I tried again using the same pattern and failed.  Here's an updated step-by-step guide.

<!--more-->

## Back in the Day

It used to be that all you had to do was setup the nameservers on your domain registrar, add the Zerigo addon on Heroku's end with a few commands, and you were rocking in minutes.  The latest DNS setup on Heroku caused me a bit more grief.  Something has changed.  But there is hope.  The new steps are almost just as brief.  You'll just have to take care to get it just right.

## Cedar, not Bamboo

These days new deployments on Heroku are going to favor using the Cedar stack as the new option.  The Bamboo stack was the original and older Ruby stack.  And so it troubled me after setting up my DNS as I used to that I got an error message ([h70](https://devcenter.heroku.com/articles/error-codes#h70-access-to-bamboo-http-endpoint-denied)) similar to this in my logs:

```bash
2010-10-06T21:51:07-07:00 heroku[router]: at=error code=H70 desc="Access to bamboo HTTP endpoint denied" method=GET path=/ host=foo.myapp.com fwd=17.17.17.17 dyno= connect= service= status=503 bytes=
```

Lame, lame, lame, lame, lame.  Now, who did you contact?

Running `heroku info` reveals that I'm indeed using the Cedar stack on this project, so what gives?  It turns out my DNS was messed up.

## The New Zerigo/Heroku Setup

The [Heroku devcenter docs for Zerigo](https://devcenter.heroku.com/articles/zerigo_dns) are pretty good, but as of this writing, they're a little inaccurate.  Here is the step-by-step that worked for me:

#### 1. Nameservers

Setup your domain via your registrar's site to point to these nameservers:

```
a.ns.zerigo.net
b.ns.zerigo.net
c.ns.zerigo.net
d.ns.zerigo.net
e.ns.zerigo.net
```

#### 2. Zerigo Addon

Add the Zerigo addon via the Heroku cli:

```bash
heroku addons:add zerigo_dns
```

#### 3. Zerigo Config

Open Zerigo addon for configuration:

```bash
heroku addons:open zerigo_dns
```

Navigate to the Zerigo site for your app and press the "Add Snippet" button.  From the snippets available, select "Heroku".  This snippet contains a CNAME entry and a URL redirect entry.  Add the snippet.  Now, you'll need to adjust the CNAME entry.  The `data` field probably reads `proxy.heroku.com`.  This has been deprecated.  Instead, change the CNAME entry to point to `yourapp.herokuapp.com`.

Note also that the URL redirect entry is moving all traffic from yourapp.com to http://www.yourapp.com.  Apparently now the "www." subdomain is required and you can't setup a naked domain on Heroku.  If someone knows otherwise, I'd love to here about it, because I used to do this all the time.

#### 4. Add Domains on Heroku

Via the Heroku cli, type:

```bash
heroku domains:add www.yourapp.com
```

Note that we do *not* want to add `yourapp.com` (no "www") to in this manner.  If you do that, the tool adds multiple A records to Zerigo, which the Zerigo docs clearly state you don't want.  These A records are what will activate routing through the Bamboo stack, which you want to avoid.

This should be the point at which you can refresh your browser at "yourapp.com".  You should see the redirect happen, moving you to "www.yourapp.com".  The routing should be happy on Heroku's end.  It sometimes takes more time for this to propagate, so if you don't see results immediately, be a bit patient before your start changing your configuration, thinking it's not working.

Has anyone else run into this?  Is there a better way to set this up?
