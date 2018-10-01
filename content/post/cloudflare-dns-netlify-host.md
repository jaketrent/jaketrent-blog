---
layout: post
title: "Setup Cloudflare DNS to Point to Netlify Host"
date: "2018-10-01"
comments: true
categories:
  - "Code"
tags:
  - "cloudflare"
  - "netlify"
  - "ops"
description: How to get a site hosted on Netlify to use the DNS record on Cloudflare.
metaKeywords: cloudflare, dns, cname, netlify, cdn, static site
draft: false
? image
---

Deploying a static site to [Netlify](https://www.netlify.com/) is slick and easy. But if you don't want to transfer your DNS there too, you can keep it on [Cloudflare](https://www.cloudflare.com/), which does DNS and a whole bunch more.

<!--more-->

## Choose Netlify Site Name

Once you deploy to Netlify, you'll want to edit your Site Name to be something short, memorable, and descriptive. For this blog, I chose `jaketrent-blog.netlify.com`.

![Change site name](https://i.imgur.com/5DASMah.png)

Once that's set, we're ready to rock and roll with some DNS.

## Cloudflare DNS Record

Cloudflare can provide your DNS record and so much more. Open up the DNS settings for your site on Cloudflare, and look for or setup afresh your root (apex) record:

![DNS settings section](https://i.imgur.com/BzOq85o.png)

Set it up as a `CNAME` that points directly to the absolute URL of the Netlify site that you just setup, in my case `jaketrent-blog.netlify.com`:

![Root record](https://i.imgur.com/tvDGNOc.png)

Also note that we've clicked the orange cloud to be gray on the right-hand side so that we're using Cloudflare for DNS only and not a CDN. Netlify will provide all the CDN support for this domain that we need.

Whenever I start making new site changes like this, I go to the site Overview in Cloudflare and switch to "Development Mode" so that I'm sure to get all my site content cache busted. This may be optional depending on your previous setup.

![Set to Development Mode](https://i.imgur.com/4i7JfSB.png)

In doing this for myself, I saw a bit of chatter that
[SSL was not working with the Cloudflare/Netlify combo](https://stackoverflow.com/questions/51292068/cloudflare-dns-netlify-cdn-https-not-working). I did not run into this, but just in case, I set the SSL settings to flexible as was suggested (probably by some hooded hacker!):

![Flexible SSL setting](https://i.imgur.com/HaokOgo.png)

## Setup Custom Domain in Netlify

Now your DNS record is setup on Cloudflare, and you need to make your Netlify site compatible with it. The key is the add a "Custom Domain" on the netlify side. This does not mean that you are purchasing a domain or even setting up DNS on Netlify (though you can if you'd rather). It simply means that we're going to tell netlify to look respond to that DNS record (setup elsewhere on Cloudflare) when the site is requested that way.

When I setup my custom domain, I simply set it as `jaketrent.com`.

![Setup custom domain](https://i.imgur.com/SzMZLFN.png)

DNS does require some time to propagate (up to 24 hrs), but in my case I got lucky and this started working immediately.

And that should be enough. As in, enough opsy configs for one day!
