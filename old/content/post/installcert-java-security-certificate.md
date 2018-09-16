---
layout: post
title: "InstallCert for Java Security Certificate"
date: "2009-09-16"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "linux"
  - "security"
  - "ubuntu"
description: Sometimes you need to install a security certificate for authentication to work for certain services -- services that are accessed by your java application 
metaKeywords: java, linux, security, ubuntu
draft: false
---

Sometimes you need to install a security certificate for authentication to work for certain services -- services that are accessed by your java application that requirement a secure connection.  For instance, needing to authenticate against an LDAP server from one of our apps, we had to run a little InstallCert.java on all JDKs used to run the app.

<!--more-->

Interesting to me, the [InstallCert.java](http://blogs.sun.com/andreas/resource/InstallCert.java) code is found mostly on Sun blogs.  But, there you have it.  If you have much trouble with the manual process of installing these certificates, there's a good [blog post](http://stufftohelpyouout.blogspot.com/2008/10/unable-to-find-valid-certification-path.html) to help you figure it out.

After multiple updates to my JDK, my biggest problem was not so much that I couldn't figure out how to do it, but more that I had to do it again and again because the certs were being blown away.

So, here's a quick python script to help make the process a little more automatic:  

```python
#!/bin/python

import sys
import subprocess
import os

CURR_DIR = os.getcwd()
SECURITY_SUBDIR = os.path.join("jre", "lib", "security")
JAVA_ARGS = "your-cert-host" # host:port passphrase
JDK_HOMES = [] # path to desired JDKs

if __name__ == "__main__":

    if os.path.isfile(os.path.join(CURR_DIR, "InstallCert.java")) == 0:
        raise Exception("Must have InstallCert.java in current directory")

    if len(sys.argv) < 2:
        if len(JDK_HOMES) > 0:
            paths = JDK_HOMES
        else:
            raise Exception("Must specify JDK paths args or JDK_HOMES var")
    else:
        paths = sys.argv[1:]

    for javapath in paths:
        secpath = os.path.join(javapath, SECURITY_SUBDIR)
        cmds = [
            "cd %s" % CURR_DIR,
            "cp InstallCert.java %s" % (secpath),
            "javac %s" % (os.path.join(secpath, "InstallCert.java")),
            "cd %s && java %s %s" % (secpath, "InstallCert", JAVA_ARGS)
            ]

        for cmd in cmds:
            print cmd
            subprocess.call(cmd, shell=True)
```

I have only run/tested this in Linux.  Make sure that you run this script with the proper user/permissions to write all the needed files.  For instance, I have to sudo this because my JDKs are in /usr/lib/...  

  
