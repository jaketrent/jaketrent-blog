---
layout: post
title: "Will a Captcha Block Spam?"
date: "2008-08-26"
comments: true
categories:
  - "Code"
tags:
  - "captcha"
  - "django"
  - "pil"
  - "python"
  - "spam-filter"
description: I really need an answer to this question.  Why?  Because I was, until recently, on the verge of shutting down the comments on the site because of the load o
metaKeywords: captcha, django, pil, python, spam-filter
draft: false
---

I really need an answer to this question.  Why?  Because I was, until recently, on the verge of shutting down the comments on the site because of the load of blog spam that I was receiving.  It was insufferable.  But, luckily, Django came to my rescue again and made a potential solution very pain-free -- except for one problem.

<!--more-->

My friend Josh introduced me to a good little captcha for Django: <a href="http://django.agami.at/media/captcha/">Captcha for Django 1.1</a>.  There are several other captchas out there: <a href="http://code.google.com/p/django-captcha/">Djaptcha</a>, <a href="http://www.mysoftparade.com/blog/mathematical-captcha/">MathCaptchaForm</a> and some good <a href="http://www.rkblog.rk.edu.pl/w/p/django-and-captcha-images/">tutorials</a>.  But, I like this captcha solution for a couple reasons: 
- Josh suggested it, and let's face it, that carries a lot of weight. ;)
- This solution jives well with ModelForm, which I use for all of my comment forms.  Most of the other code that I found was for forms.Form.
- This solution favors composition over inheritance:  It is a form field instead of a subclass form type.

You can download the tarball <a href="http://django.agami.at/media/captcha/captcha.tar.gz">here</a>.  Also available <a href="http://code.google.com/p/django-captchas/source/browse/trunk/captchas/imagecaptcha.py">here</a>.

A short explanation of the file is available <a href="http://django.agami.at/media/captcha/">here</a>.

The explanation prompts you to unload the tar into the django.contrib directory.  I'm thinking this is probably how things used to jive in Django Land, but I didn't put it there and just put it in my project.  site-packages might have been a better place.  

You can attach the captcha field to any model form by just including it in the class:

```python
from django.newforms import ModelForm
from aprilandjake.captcha import CaptchaField

from aprilandjake.blog.models import EntryComment
	
class EntryCommentForm(ModelForm):
	class Meta:
		model = EntryComment
		exclude = ('active', 'entry')
	captcha = CaptchaField(label='Captcha', options={'fgcolor': '#0099ff', 'bgcolor': '#efefef' } )
```

Also seen are just a few of the many options for the CaptchaField.  You can apply these for every captcha field you write or globally in settings.py:

```python
CAPTCHA = {
        'fgcolor': '#000000', # default:  '#000000' (color for characters and lines)
        'bgcolor': '#ffffff', # default:  '#ffffff' (color for background)
        'captchas_dir': None, # default:  None (uses MEDIA_ROOT/captchas)
        'upload_url': None, # default:  None (uses MEDIA_URL/captchas)
        'captchaconf_dir': None, # default:  None  (uses the directory of the captcha module)
        'auto_cleanup': True, # default:  True (delete all captchas older than 20 minutes)
        'minmaxvpos': (8, 15), # default:  (8, 15) (vertical position of characters)
        'minmaxrotations': (-30,31), # default:  (-30,31) (rotate characters)
        'minmaxheight': (30,45), # default:  (30,45) (font size)
        'minmaxkerning': (-2,1), # default:  (-2,1) (space between characters)
        'alphabet': "abdeghkmnqrt2346789AEFGHKMNRT", # default:  "abdeghkmnqrt2346789AEFGHKMNRT"
        'num_lines': 1, # default: 1
        'line_weight': 3, # default: 3
        'imagesize': (190,55), # default: (200,60)
        'iterations': 1, # default 1 (change to a high value (200 is a good choice)
                         # for trying out new settings
                         # WARNING: changing this value will lead to as many images in your
                         # "captchas" directory!)
        }
```

When I implemented this for aprilandjake.com, Josh helped me out and showed me where the code needed to be tweaked:  On line 174:

```python
def value_from_datadict(self, data, name):
```

was changed to

```python
def value_from_datadict(self, data, files, name):
```

Voila!  It worked like a charm.

But then I uploaded it to my server and tried it out -- no dice.  I couldn't figure it out.  A couple days later, I was determined to find the problem...  After a frustrating while and some good 'ol debugging print statements, I determined that the problem was that because I put my project under version control and didn't bother to remove .svn folders from production, they were being pulled in by the captcha code, thinking it was an option for a font in the 'fonts' subdirectory of the module.  To get around the problem, I needed to change the code around line 110 from:

```python
fontdir = path.join(cs['captchaconf_dir'], 'fonts')
fontnames = [path.join(fontdir, x) for x in listdir(fontdir) ]
```

to

```python
import glob
/** ... */
fontdir = path.join(cs['captchaconf_dir'], 'fonts', '*.ttf')
fontnames = [path.join(fontdir, x) for x in glob.glob(fontdir) ]
```

Using the wildcard *.ttf protected against using non-fonts in PIL as ImageFont objects.  listdir() doesn't support wildcards, so glob.glob() was required.

Take that, spam!

  
