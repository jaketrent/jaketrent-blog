---
layout: post
title: "Django loaddata on Heroku"
date: "2011-11-20"
comments: true
categories:
  - "Code"
tags:
  - "django"
  - "python"
  - "heroku"
description: Django's manage.py script comes with some great utilitarian commands.  Two of my favorites are dumpdata and loaddata.  I've used these commands recently to 
metaKeywords: django, python, heroku
draft: false
---

Django's manage.py script comes with some great utilitarian commands.  Two of my favorites are dumpdata and loaddata.  I've used these commands recently to migrate a Django app's data to the same Django app now running on Heroku.  Here's a little taste of the glory.

<!--more-->

[Django](https://www.djangoproject.com/) is awesome.  [Heroku](http://www.heroku.com/) is awesome.  [Combined](http://devcenter.heroku.com/articles/django>) they are awesomeerest.

First, get your data out of your existing Django app with manage.py's [dumpdata](https://docs.djangoproject.com/en/dev/ref/django-admin/#dumpdata-appname-appname-appname-model):

```bash
python manage.py dumpddata --natural --indent 2 > data.json
```
  
By default it comes out as json, but you can [change that](https://docs.djangoproject.com/en/dev/ref/django-admin/#django-admin-option---format>).  The two options used above have now become common-place for me, providing:

- "--natural" - use this baby for when you dump contrib.contenttypes ContentType.  Since we're taking the whole db, odds are that you're using it, since most interesting django apps do.
- "--indent" - make it human-readable instead of a single-liner.

The "> data.json" is just some Unix'y redirect goodness to stash the output of your dumpdata command in the data.json file.

Now you want to get your data.json into the db of your Heroku-based Django app.  Heroku allows you the ability to run [one-off processes](http://devcenter.heroku.com/articles/oneoff-admin-ps) such as the loaddata command.  But the next hurdle will be getting your data.json onto the Heroku server.  This is always handled in a git push.  And to make it a little bit more interesting, let's say that the code you have isn't particularly sensitive, but the data is.  So, we're going to commit the data.json, push it, remove the latest git commit, be able to push our code to the origin server, and still run loaddata on Heroku.  Sheesh.

Ok, so commit your file:

```bash
git add data.json
git commit -m "Added data"
```
  
Push it to Heroku:

```bash
git push heroku master
```
  
[Remove commit](http://stackoverflow.com/questions/927358/git-undo-last-commit/927386#927386):

```bash
git reset --soft HEAD^
```

[Remove file](http://stackoverflow.com/questions/1505948/how-do-i-remove-a-single-file-from-the-staging-area-of-git-but-not-remove-it-fro/1505968#1505968) from staging area:

```bash
git reset HEAD data.json
```
  
Save your code w/o data included:

```bash
git push origin master
```
  
And now you should still have data.json on your Heroku server and be able to run loaddata:

```bash
heroku run python manage.py loaddata data.json
```
  
If it all works, your data fixtures should be found and you should see a confirmation message that they were loaded into the db.  Just like a dream.  The only thing that would make it better is if you never had to commit data.json at all.  Too bad Heroku couldn't pick up local file input like it can pick up STDIN in a 'heroku run' command!

Update: "Force"
-------------------------------

Also note that if you continue to commit to git locally on future enhancements to your app and then want to push again to Heroku, you'll likely get an error message:

```bash
git push heroku master
To git@heroku.com:myProject.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@heroku.com:myProject.git'
To prevent you from losing history, non-fast-forward updates were rejected
Merge the remote changes (e.g. 'git pull') before pushing again.  See the
'Note about fast-forwards' section of 'git push --help' for details.
```

To get around this, next time you push to Heroku, try:

```bash
git push heroku master -f
```

And force it to do your bidding.

  
