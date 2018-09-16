---
layout: post
title: "Run a Pow Server on a VM"
date: "2013-01-31"
comments: true
categories:
  - "Code"
tags:
  - "rails"
  - "ruby"
description: Pow creates an easy way to run Rails server locally.  Running them on a Windows VM is just as easy.
metaKeywords: pow, vm, rails, windows, virtualbox, powder, ruby
draft: false
image: https://i.imgur.com/XdExdtS.jpg
---

It's really pretty cool how easy [Pow](http://pow.cx/) makes running a Rails server.  [Powder](https://github.com/rodreegez/powder) makes it even easier.  Here's how to run your Rails server via Pow on a VM in order to test IE.

<!--more-->

## Install Pow

Get your Ruby environment otherwise setup for Rails dev. Then install [Pow](http://pow.cx/).  It's a nice little utility created by the folks at 37 Signals.  They have a short little install script you can run, as [referenced on the Pow site](http://pow.cx/).  Or, you can use a utility created to make it *even easier* -- [powder](https://github.com/rodreegez/powder).

To install, you'll need [Rubygems](http://rubygems.org) installed, and run:

```
$ gem install powder
```

Then link your project to Pow via the command:

```
$ cd <my_proj_dir>
$ powder link
```

Make sure Pow is running:

```
$ powder up
```

And access your Pow-powered site by going to your project's address in your browser:

```
http://<my_project_dir>.dev
```

There are other options in the `powder link` step.  For instance, if you want to access your site through an http address different than `<my_proj_dir>` you can specify that.

## Install your VM

There are a few different VM options.  My favorite is [VirtualBox](http://virtualbox.org).  It does hurt a bit seeing the "Oracle" moniker on it, but I've found it to be as responsive as a VM can be and generally stable.

## Install Internet Explorer

There really wasn't another reason that you wanted a Windows VM was there?

I've had good success with 	the project [xdissent/ievms](https://github.com/xdissent/ievms).  To download the IE-ready images, the README invites us to run this script in our shell:

```
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | bash
```

It will download multiple parts of several Windows/IE VM images into `~/.ievms` and install them so they're ready to roll with VirtualBox.  Run this way, images for Internet Explorer 6, 7, 8, and 9 are all downloaded.  If you wanted to just download IE 9, you could run:

```
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | IEVMS_VERSIONS="9" bash
```

Either way, this download takes quite a while to complete, but the shell script that's running it takes pretty good care of you, restarting on the last incomplete download part.

## Access Pow via VirtualBox

Accessing Pow in the VM isn't bad at all.  Pow makes use of [xip.io](http://xip.io), which provides a wildcard DNS entry used by Pow and thus your app.

For the [next step](http://pow.cx/manual.html#section_2.1.5), take note of your IP by running `ifconfig`.  Then from IE inside of VirtualBox, point your browser at:

```
http://<my_proj_dir>.<my_ip>.xip.io
```

And you should see your project running in the VM just as you do from your better, native OS.  Pow!
