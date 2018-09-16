---
layout: post
title: "Debugging Remote Tomcat from IntelliJ with Style"
date: "2011-04-13"
comments: true
categories:
  - "Code"
tags:
  - "debugging"
  - "intellij"
  - "tomcat"
description: One of the worst things to debug can be something that works just fine in your local development environment but does not work in a deployed environment.  I
metaKeywords: debugging, intellij, tomcat
draft: false
---

One of the worst things to debug can be something that works just fine in your local development environment but does not work in a deployed environment.  If you deploy to Tomcat, you can debug it remotely.  If you use IntelliJ IDEA, you can do it with style.

<!--more-->

IntelliJ makes it easy.  First, you want to click the runnable configurations dropdown and select "Edit Configurations":

![image](https://lh3.googleusercontent.com/_mA-9kCcx0bs/TaXdzFFhpxI/AAAAAAAAABM/6FoV9E3FpII/s800/ConfigDropdown.png)

Once in the "Edit Configurations" dialog, click the "+" Plus icon to create a new configuration.  Select "Remote":

![image](https://lh4.googleusercontent.com/_mA-9kCcx0bs/TaXdzLv6GAI/AAAAAAAAABQ/3giI8x9pZc0/s640/SelectRemote.png)

This dialog is the last, and you will need to configure your connection:

* Transport: Socket
* Debugger: Attach
* Host: Either IP or hostname of remote server
* Port: Must match debug port opened on remote Tomcat (address arg below)

![image](https://lh3.googleusercontent.com/_mA-9kCcx0bs/TaXdzPI1ovI/AAAAAAAAABU/EU-fflxWQ1g/s800/RemoteDebug.png)

As is explained to you on the window, you need to be able to add JVM arguments to the remote JVM.  By now, let us hope that we're all using a JDK more recent than JDK 1.3. :)  In that case, you'll need:

```java
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=7007
```

To get those args on the server might require different mechanisms by default.  My environment's deploy is automated to put the args on the JAVA_OPTS variable in:

```bash
$CATALINA_HOME/conf/Catalina/localhost/tcat-env.conf
```

But if your deployment doesn't apply JVM properties for your app, you can put them in:

```bash
$CATALINA_HOME/bin/setenv.sh
```

Like so:

```bash
export JAVA_OPTS="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=7007"
```

Finally, restart the remote server, and your debugging port will be open.  Start your remote connection in IntelliJ and set a break point.  Exercise your deployed app so your code will be executed, and let the good times roll!

  
