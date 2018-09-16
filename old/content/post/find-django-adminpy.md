---
layout: post
title: "Find django-admin.py"
date: "2009-09-03"
comments: true
categories:
  - "Code"
tags:
  - "bash"
  - "django"
  - "python"
description: django-admin.py is a utility script that is used by django to start projects, etc.  Sometimes, it seems that it's available to me in the terminal.  At other
metaKeywords: bash, django, python
draft: false
---

django-admin.py is a utility script that is used by django to start projects, etc.  Sometimes, it seems that it's available to me in the terminal.  At other times, it melts away, unavailable.  So, where is it, and how do I make it findable?

<!--more-->

django-admin.py is in the your site-packages/django/bin/ directory.  And that brings up another good point.  Where is your site-packages directory specifically?  You can find it with this command:

```bash
python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"
```

Once you find the site-packages directory, go to the bin/ subdirectory to find the django-admin.py.  You just need to put this in your path so that it's findable from wherever you need to use it.  Here's a possibility:

```bash
cd /usr/local/bin/ &&
sudo ln -s [site-packages]/bin/django-admin.py django-admin.py
```
  
