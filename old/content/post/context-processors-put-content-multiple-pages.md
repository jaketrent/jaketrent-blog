---
layout: post
title: "Context Processors Put Content On Multiple Pages"
date: "2009-02-28"
comments: true
categories:
  - "Code"
tags:
  - "django"
  - "python"
description: Make your django context processors dry.  
metaKeywords: django, python
draft: false
---

In software development, be <a href="http://en.wikipedia.org/wiki/Don%27t_repeat_yourself">dry</a>, and define data once.  But, what if that data needs to be used in many places?  This is the case with parts of a web page, for instance, that are common to many different pages.  Django has a great mechanism for this: it is context processors.

<!--more-->

You can define a context processor, containing within in the things that you would like to be present and available for use within the given context.  There are two ways that I've found to include context processors: Per request or for all requests.

#### Per Request

Pass the context processor into the request in your view.py:

```python
from aj2 import context_processors as cp

def content_collection(request, slug):
  return render_to_response('content/content_list.html', locals(),
    context_instance=RequestContext(request, processors=[cp.content_common]))
```


That means that when the content_list.html template is loaded, all content_common variables will be available in that template context.  Those variables are:

```python
from aj2 import util

def content_common(request):
  return {
    'default_theme' : util.get_default_theme(),
    'friends': util.get_friend_list(),
    'fp_highlight': util.get_random_fp_highlight(),
    'collections': util.get_collection_list(),
  }
```

#### For All Requests

Sometimes you don't have absolute control of all the views in your project (ie, plugins).  So, what if you want to apply the context processor to those views as well?  The best way that I've found is by including the context processor definition in the settings.py file:

```python
TEMPLATE_CONTEXT_PROCESSORS = (
  'aj2.context_processors.content_common',
)
```

Glory, glory, django.

Just make sure that you put the auth context processor in with the TEMPLATE_CONTEXT_PROCESSOR entries that you're adding, otherwise you'll get this message:

```bash
ImproperlyConfigured at /admin/

Put 'django.core.context_processors.auth' in your TEMPLATE_CONTEXT_PROCESSORS setting in order to use the admin application.
```

  
