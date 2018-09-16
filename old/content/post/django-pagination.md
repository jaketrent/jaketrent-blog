
---
layout: post
title: "Django Pagination"
date: "2008-10-24"
comments: true
categories:
  - "Code"
tags:
  - "django"
  - "python"
description: The amount of content on the blog and its pages has become substantial (in length only) enough to make it a worthwhile idea to paginate it (spread the conte
metaKeywords: django, python
draft: false
---

The amount of content on the blog and its pages has become substantial (in length only) enough to make it a worthwhile idea to paginate it (spread the content over multiple pages).  Django makes it very easy!  There are some nice objects available for paginating.

<!--more-->

The amount of content on the blog and its pages has become substantial (in length only) enough to make it a worthwhile idea to paginate it (spread the content over multiple pages).  Django makes it very easy!  There are some nice objects available for paginating.

First, query your objects, and put them into a Paginator object that gives you some paginatory functions. (How many times do you think I can use a form of paginate on this page?).  I query mine, then use a util function to put them into a paginator:

```python
# in view.py
from aprilandjake.blog import util

def home(request):
	entries = util.paginate(request, Entry.objects.filter(active=True).order_by("-date_created"))
	# ...


# in util.py
def paginate(request, obj_list, num_per_page=10):
	paginator = Paginator(obj_list, num_per_page)
	try:
		page = int(request.GET.get('page', '1'))
	except ValueError:
		page = 1
	try:
		objects = paginator.page(page)
	except (EmptyPage, InvalidPage):
		objects = paginator.page(paginator.num_pages)
	return objects
```

<strong>Note:</strong>
<ul>
<li>You can pass your result set straight into the paginator.</li>
<li>I've defaulted the results per page to 10.</li>
<li>The first try/catch is to make sure that the page number is an integer.</li>
<li>The second try/catch makes sure that the page number doesn't go out of range</li>
</ul>

You'll have to change your iteration of your object in your template to look for the entry.object_list.  That is because your object is really a paginator object now.
```python
{% for e in entries.object_list %}
	{{ e.stuff_to_print }}	
{% endfor %}
```

Finally, we have to put the paginator UI on the page.  Again, we can use the paginator object's very nice functions to help us here.  Because I want to reuse this pagination control and use it on many different objects, I'm going to make an inclusion tag for it:
```python
# in my template tags file: blog/templatetags/aprilandjake_tags.py
from django import template
register = template.Library()

def paginator(object):
    return {'object': object}
register.inclusion_tag('includes/_paginator.html')(paginator)
```

To use it, load the custom tag for your template, place it where you want your pagination controls to appear, and pass in your object collection:
```python
{% load aprilandjake_tags %}
<!-- ... -->
{% paginator galleries %}
```

The included html (_paginator.html) is thus:
```html
{% if object.object_list %}

<div class="pagination">
	{% if object.has_previous %}
		<a href="?page={{ object.previous_page_number }}" class="prev">&laquo; Previous</a>
	{% endif %}

	<span class="current">
		Page {{ object.number }} of {{ object.paginator.num_pages }}
	</span>

	{% if object.has_next %}
		<a href="?page={{ object.next_page_number }}" class="next">Next &raquo;</a>
	{% endif %}

	<div class="clr"></div>
</div>

{% endif %}
```

<strong>Note:</strong>
<ul>
<li>The check for object.object_list is just precautionary for if you have this inclusion tag included on a page that isn't actually using a paginated object.</li>
</ul>

To me, it's amazing how awesome this pagination object is that is built into django.  With a few quick and easy changes, pagination is added with very little pain to us.  w00t!  Go, Django!

  
