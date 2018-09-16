---
layout: post
title: "Application Audio Control in Ubuntu"
date: "2008-11-18"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "ubuntu"
description: I love the volume control scheme for Vista that allows one to adjust the volume on a per-application basis.  It turns out that this functionality is also av
metaKeywords: linux, ubuntu
draft: false
---

I love the volume control scheme for Vista that allows one to adjust the volume on a per-application basis.  It turns out that this functionality is also available for Linux!

<!--more-->

I love the volume control scheme for Vista that allows one to adjust the volume on a per-application basis.  It turns out that this functionality is also available for Linux!

Apparently, the future of audio for Linux is found in Pulseaudio.  My Hardy Heron install came with it preloaded, but in case you don't have it,

```bash
sudo apt-get install pulseaudio
```

In order to get the individual program audio control, you also need this package:

```bash
sudo apt-get install pavucontrol
```

Once you've got it, just run it:

```bash
./pavucontrol &
```

The playback tab will show the playback streams available.  Nothing showed up here automagically for me.  Apparently the control has to catch another application "in the act" of producing sound in order to recognize the stream.  So, I booted up Kaffeine and played a bit of a DVD, and there it was -- bam! -- Kaffeine audio stream appeared!

  
