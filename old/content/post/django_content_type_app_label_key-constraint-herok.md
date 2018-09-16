---
layout: post
title: "django_content_type_app_label_key Constraint on Heroku"
date: "2011-12-30"
comments: true
categories:
  - "Code"
tags:
  - "django"
  - "python"
  - "heroku"
  - "postgres"
description: Django comes with some awesome CLI tools.  Manage.py is a beast of magic and lore.  And it loves the fantastical kingdom of Heroku, where is romps with merr
metaKeywords: django, python, heroku, postgres
draft: false
---

Django comes with some awesome CLI tools.  Manage.py is a beast of magic and lore.  And it loves the fantastical kingdom of Heroku, where is romps with merry measure twixt the ether.  But, when I've tried to go through a dumpdata of a previous site, syncdb on a migration to Heroku, and loaddata for moving the data, I've run into a snag on django_content_type_app_label_key more than once.  Here are some resolutions.

<!--more-->

The Error Stack
---------------

Specifically, when I do a sync of the database:

```bash
heroku run python manage.py syncdb
```

It works like a charm.  And then a loading of the data:

```bash
heroku run python manage.py loaddata data.json
```

It runs for a bit then spews this small hiccup:

```bash
Running python manage.py loaddata data.json attached to terminal... up, run.2
Problem installing fixture 'data.json': Traceback (most recent call last):
  File "/app/lib/python2.7/site-packages/django/core/management/commands/loaddata.py", line 174, in handle
    obj.save(using=using)
  # ...more stack trace...
  File "/app/lib/python2.7/site-packages/django/db/backends/postgresql_psycopg2/base.py", line 44, in execute
    return self.cursor.execute(query, args)
IntegrityError: duplicate key value violates unique constraint "django_content_type_app_label_key"
```
Lovely.

It turns out that `syncdb`, in addition to running the DDLs for your table creation also populates the `django_content_type` table.  And then when you loaddata it tries to repopulate the table, violating the unique constraint on the content type name.

Make the Magic Live Again
-------------------------

There are a couple ways around this:

### Dump Something Specific
When you dumpdata, only [dump specific apps](https://docs.djangoproject.com/en/dev/ref/django-admin/#dumpdata-appname-appname-appname-model) instead of the whole project.  For example:

```bash
python manage.py dumpdata myApp
```

### Django 1.3 Exclude
If you're on Django 1.3 or above, you get a nice new option with dumpdata to [exclude certain apps](https://docs.djangoproject.com/en/dev/ref/django-admin/#django-admin-option---exclude).  So you could run:

```bash
python manage.py dumpdata --exclude contenttypes
```

### Try in Vain to Reset
Another one I tried (but didn't work) was:

```bash
heroku run python aprilandjake/manage.py reset contenttypes 
```


### Sql Truncate
Or, if you're still trying to dumpdata on your whole project, you could `syncdb` on Heroku and then truncate the data out of `django_content_type` like this:

```bash
heroku run python aprilandjake/manage.py dbshell
```

And then [truncate](http://swik.net/django/Django+Community+Aggregator?page=2) (inside the dbshell):

```bash
truncate django_content_type cascade;    
```

Problem for me is that didn't work either.  I am on the super cheap in Heroku, so I get this lovely denial:

```bash
Running python manage.py dbshell attached to terminal... up, run.5
Error: You appear not to have the 'psql' program installed or on your path.
```

(It's not available in a [shared database](http://devcenter.heroku.com/articles/heroku-postgresql)):

```bash
heroku pg:psql
!  Cannot ingress to a shared database
```

### Delete via Admin UI
And finally, if you want to get rid of the data via the admin UI, set it up to appear as editable.  In an [`admin.py`](https://docs.djangoproject.com/en/dev/ref/contrib/admin/#modeladmin-objects) in your project, try something like this:

```python
from django.contrib.contenttypes.models import ContentType
    
class ContentTypeAdmin(admin.ModelAdmin):
  list_display = ['name', 'app_label']
  fieldsets = (
    ('', {
      'classes': ('',),
      'fields': ('name', 'app_label')
    }),
  )

  admin.site.register(ContentType, ContentTypeAdmin)
```

Now you should be able to loaddata and feel the Django wind in your hair and the Heroku grass beneath your feet again.

  
