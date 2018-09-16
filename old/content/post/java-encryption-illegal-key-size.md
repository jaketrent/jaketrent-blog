---
layout: post
title: "Java Encryption - Illegal Key Size"
date: "2011-04-04"
comments: true
categories:
  - "Code"
tags:
  - "encryption"
  - "java"
description: By default, Java has a limit on the length of your encryption key.  The limit, by default 128-bit, seems a little small and dated.  So, let's break through 
metaKeywords: encryption, java
draft: false
---

By default, Java has a limit on the length of your encryption key.  The limit, by default 128-bit, seems a little small and dated.  So, let's break through that glass ceiling!  With the hammer of Thor!

<!--more-->

I'm currently trying to do 192-bit AES encryption.  So, I need to do a few things to get around this nasty exception I keep getting:

```java
java.security.InvalidKeyException:Illegal Key Size
```

Go to the Empire's [download page](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and surf to the bottom and look for the "Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files 6" (since I'm on Java 6).  Download that .zip of power and unzip it.

Finally, copy two files:

* local_policy.jar
* US_export_policy.jar

Into JAVA_HOME/jre/lib/security/

For example:

```bash
sudo cp local_policy.jar US_export_policy.jar /usr/lib/jvm/java-6-sun/jre/lib/security/
```

And voila!  Run your code again to do encryption against larger than 128-bit keys, and your illegal key size message should have vanished like the icebergs.

  
