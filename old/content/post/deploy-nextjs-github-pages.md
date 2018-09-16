---
categories:
- "Code"
comments: true
date: 2017-08-16T07:15:43-06:00
description: "How to deploy a Next.js static site to Github Pages."
draft: false
image: "https://i.imgur.com/6ARf56M.jpg"
layout: post
metaKeywords: "deploy static nextjs, next on github, custom nextjs site on github"
tags:
- "nextjs"
- "static-site"
- "github"
title: "Deploy Next.js to Github Pages"
---

How to deploy a Next.js static site to Github Pages.

<!--more-->

[Github Pages](https://pages.github.com/) is a great place to deploy static [Next.js](/post/what-is-nextjs/) sites.

## Setup Next.js

As of `next@3`, a static export of your Next.js site is possible.

This is accomplished with:

```bash
next build && next export
```

When you export, you can specify the output directory with `-o`.  Github pages has an option of serving the `docs/` directory of your `master` branch, so we'll setup for that.  Adjust the command to be:

```bash
next build && next export -o docs
```

## Setup Custom Domain

To prep your Github Pages site to be served by a custom domain, you'll need to first buy the domain, [setup the DNS](https://help.github.com/articles/quick-start-setting-up-a-custom-domain/).

For an [example project](https://github.com/jaketrent/electron-course), my DNS setup has two entries:

```txt
CNAME electroncourse.com jaketrent.github.io
CNAME www                electroncourse.com
```

Connect your custom domain to your Github Pages site by adding a file to `docs/CNAME` with the contents of your custom domain:

```txt
electroncourse.com
```

You'll notice that this `CNAME` file is in the `docs/` directory, which is the target of the Next.js `export` command.  `export` will blow the directory away, removing your `CNAME` file.  We want to make sure we don't lose it after an export.

## NoJekyll Support

Github pages are processed by [Jekyll](https://jekyllrb.com/) by default.  In our case, the directories Next.js builds by default include a `_next` directory with all the built JavaScript assets.  In order to make those findable in our deployed site, we need to [add a special file](https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/) called `.nojekyll` inside the `docs/` directory.  

We'll also need to take care not to remove this file when running a `next export` command.

## All-in-one Deploy Script

So here is an all-in-one deploy script for building, exporting, preserving the `CNAME` and `.nojekyll` files, committing, and pushing your content to the server.  If we put this in `package.json`:

```json
"scripts": {
  "deploy": "next build && next export -o docs && git checkout -- docs/CNAME && git checkout -- docs/.nojekyll && git add docs && git commit -m \"chore: regen site\" && git push origin master"
}
```

Epic!  Then we can run it with: `npm run deploy`.

## Setup Repo for Github Pages

Now go to your [repo](https://github.com/jaketrent/electron-course) on Github and go to the "Settings" tab.  Under that tab, find the section labeled "Github Pages".  Choose the "Source" option of: `master branch /docs folder`.

![github docs directory](https://i.imgur.com/6c8yWY6.jpg)

This will serve your page from that `docs/` directory.

To see if your page is working, visit your Github Pages URL, eg [`jaketrent.github.io/electron-course`](http://jaketrent.github.io/electron-course).  If the DNS is working, you'll get a redirect to your custom domain, [`electroncourse.com`](http://electroncourse.com).

You've now deployed your Next.js site to Github Pages!

What else have you done to make this process better?
