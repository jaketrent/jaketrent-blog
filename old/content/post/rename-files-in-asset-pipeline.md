---
layout: post
title: "Rename Files in Rails Asset Pipeline"
date: "2013-02-06"
comments: true
categories:
  - "Code"
tags:
  - "rails"
  - "ruby"
description: Rails' asset pipeline provides a powerful mechanism for preparing your static assets for the web.  There are defaults.  Learn how to change them.
metaKeywords: asset pipeline, precompile, rails, ruby, default name, application.js, application.css
draft: false
image: https://i.imgur.com/HPJDXPB.jpg
---

Rails provides a powerful mechanism for preparing your site's static assets for the web.  It's called the asset pipeline.  True to Rails, it has sensible defaults.  Also true to form, it's not immediately clear what's required to change from the defaults. 

<!--more-->

## Multiple Compilers

The asset pipeline has the ability to pass your static assets through multiple compilers.  Thus, they seem much less static than they might be.  The compilers used are determined by the file extension.  For instance, this file:

```
myscripts.js.coffee.erb
```

Will go through the Erb compiler first, then the Coffeescript compiler, then finally will output pure JavaScript.

Changing these files are no problem.  Want a new compiler?  Slap on a new file extension.  Don't need one?  Remove it.

## Manifest File

Manifest files are full of Sprocket directives.  Sprockets will use these files to combine and minify your css and js.  A manifest will look something like this:

```
//= require vendor/jquery
//= require vendor/angular.min
//= require vendor/angular-cookies
```

These directives identify what files will eventually be combined, replacing the contents of your manifest file in the final output.

If you change the name of scripts or stylesheets, you need to ensure that your manifest file is changed to match.  Otherwise, asset precompilation will fail.

By default the manifest filenames are these:

```
app/assets/javascripts/application.js
app/assets/stylesheets/application.css
```

## Changing Manifest Filenames

Changing the manifest default filenames will require some tweaking.

For instance, if I change application.js to be split into two separate manifest files, `scripts-foot.js` and `scripts-head.js`, the next time I run:

```
rake assets:precompile
```

It will succceed, and everything will look like it's just fine.  But when I go to run the app, it will give my an error like:

```
ActionView::Template::Error (scripts-head.js isn't precompiled):

2013-02-04T16:24:05+00:00 app[web.1]: app/views/layouts/application.html.erb:14:in `_app_views_layouts_application_html_erb__3761578772688930207_28706600'
```

When you switch from the default manifest files or when you reference a static asset like a js or css directly from your view, you'll need to mark it as explicitly requiring precompilation.  

This is done in an environment file, such as `config/environments/production.rb`:

```ruby
# Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
config.assets.precompile += %w( scripts-foot.js scripts-head.js )
```

It's that easy.  It's too bad you have to wait until the app runs to discover this is a problem.  But now you're ready.  

Now if we could only customize the directory structure under `app/assets`.  I would much rather use the path `js/` instead of `javascripts/`.  Does anyone know how?
