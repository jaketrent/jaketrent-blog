---
layout: post
title: "Running Php in Apache on Linux"
date: "2008-10-15"
comments: true
categories:
  - "Code"
tags:
  - "apache"
  - "linux"
  - "php"
  - "ubuntu"
description: I haven't done php for a while, but at work our prototypes are in html/php.  So, I needed to get Apache webserver downloaded and working on my Linux box wit
metaKeywords: apache, linux, php, ubuntu
draft: false
---

I haven't done php for a while, but at work our prototypes are in html/php.  So, I needed to get Apache webserver downloaded and working on my Linux box with php.  Here's how it all went down.

<!--more-->

I haven't done php for a while, but at work our prototypes are in html/php.  So, I needed to get Apache webserver downloaded and working on my Linux box with php.  Here's how it all went down:

Install apache2 and the php handler:

```bash
sudo apt-get install apache2 libapache2-mod-php5
```

Find the DocumentRoot:

```bash
sudo emacs /etc/apache2/sites-available/default
```

Mine defaulted to /var/www/.  I have a limited number of my projects on this box right now, so I decided to setup sym links to the project directories:

```bash
cd /var/www/;  ln -s ~/dev/records-proto/ proto
```

Now I need to tell apache that I want my .html files treated as php files too (because that's how our designer did it).  I did a grep on 'AddType':

```bash
cd /etc/apache2/; grep AddType * -r
```

That turned up the file that you need to edit:
```bash
sudo emacs mods-enabled/php.conf &
```

I made the php handler line look like this (added the .html on the end):
```xml
AddType application/x-httpd-php .php .phtml .php3 .html
```

Now the server's going to need a restart:
```bash
sudo /etc/init.d/apache2 restart
```

Now, I point my favorite web browser to this address (using the sym-link), and I'm good to go:
```bash
firefox http://localhost/proto &
```


  
