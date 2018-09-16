---
layout: post
title: "AES Encryption Odyssey in Java with Bouncy Castle"
date: "2011-04-12"
comments: true
categories:
  - "Code"
tags:
  - "aes"
  - "encryption"
  - "java"
  - "tomcat"
  - "wireshark"
description: Recently, I've been working on a project where I've tried to use AES encryption for the first time.  I didn't have to implement it myself, thank goodness, b
metaKeywords: aes, bouncy castle, encryption, java, tomcat, wireshark
draft: false
---

Recently, I've been working on a project where I've tried to use AES encryption for the first time.  I didn't have to implement it myself, thank goodness, but I still ran into a few snags.  Perhaps you can avoid my pitfalls and rise to new greatness on the peaks of glory and fortitude!  This article title sounds like a laundry detergent.

<!--more-->

Why Java
-----------

We do a fair amount of our development on MarkLogic lately.  Our app right now happens to be heaped in XQuery.  When we learned that we had to interface with an external system passing AES-encrypted payloads, I did a quick looksy into what was needed for AES encryption.  Turns out that AES is rather complicated to implement.  So easy, even a [stick figure <http://www.moserware.com/2009/09/stick-figure-guide-to-advanced.html>`_ can do it.  :)  If you want a nice (but dry) higher level overview of AES, `Patrick Townsend <http://www.youtube.com/watch?v=Xna-qBWgn90>`_ can provide.  But the bottom line was that it couldn't be implemented in MarkLogic because the only hash function we had available was `xdmp:md5 <http://developer.marklogic.com/pubs/4.2/apidocs/Ext-1.html#xdmp:md5>`_.  And Java already had a nice AES encryption provider, `Bouncy Castle](http://www.bouncycastle.org/).  So, it was Java Webservice time...

Illegal Key Size Jar Fix
---------------------------

The first issue I ran into was this exception:

```java
java.security.InvalidKeyException:Illegal Key Size
```

That is solved in an earlier [article about JCE jars](http://rockycode.com/blog/java-encryption-illegal-key-size/).

Finally, I was able to encrypt my payload using AES-192 but then when I sentthe data to the receiver, they weren't able to decrypt it.  Something was wrong again.

Classpath Resource or Not?  Not!
---------------------------------------

First, I found out that when I put my key in as a classpath resource, the key was changed at build time.  When it got deployed to target it went from 40 bytes to 69 bytes:

```bash
-rw-r--r-- 1 me me 69 2011-04-12 08:05 after.key
-rw-r--r-- 1 me me 40 2011-04-12 08:05 before.key
```

So, leave the key outside the classpath.  And put it in WEB-INF if you don't want it accessible over the network.  Then use the servlet context to load the file.  I happen to be in Spring3 land:

```java
import javax.servlet.ServletContext;

// ..

@Autowired
ServletContext servletContext;

private File getKeyFile() {
  String path = servletContext.getRealPath("/WEB-INF/key");
  return new File(path);
}
```

Encrypted Payload on the Wire(shark)
--------------------------------------------

But, it turned out that the receiver still couldn't decrypt what I encrypted, even though we were fairly certain that our keys were either the same or generated in the same fashion (same passphrase, etc).  So, I ran some code provided by another app that encrypts data to send to the same receiver.  I set the debugger so I could grab their generated cipher text and then send it myself.  When I did this, it still didn't work!  Then I busted out Wireshark:

```bash
sudo apt-get install wireshark
```

(I love package managers!)  And I found that the cipher text going over the wire was different than what I had grabbed in the debugger.  When comparing the two, I found the length of the payload over the wire was longer than in the debugger.  For instance, the char "+2" was changed to "%2B2".  Different encoding!  So, then I made sure that I was using the proper encoding:

```java
import java.net.URLEncoder;

public String encrypt() {
  // .. encryption impl
  return URLEncoder.encode(cipherText, "UTF-8");
}
```

ServletContext in a WAR deployment
-------------------------------------------

Finally!  I was able to pass an encrypted payload to the receiver in my local environment.  But when I deployed to Tomcat as a war file, suddently my key was unable to be found in WEB-INF.  I discovered that:

```java
servletContext.getRealPath("/WEB-INF/key")
```

Doesn't work in a war deploy.  From the Javadoc:

>  The real path returned will be in a form appropriate to the computer and operating system on which the servlet container is running, including the proper path separators. This method returns <code>null</code> if the servlet container cannot translate the virtual path to a real path for any reason (such as when the content is being made available from a <code>.war</code> archive

So, the Tomcat deploy had to be adjusted via the server.xml:

```xml
<Host name="localhost" appBase="webapps" unpackWARs="true" 
```

Once the WAR was exploded in the webapps directory, the key file was findable again.  But now I begin to learn that it's best to put such secret keys in a [KeyStore](http://download.oracle.com/javase/6/docs/api/java/security/KeyStore.html).  

Validate the BouncyCastle Provider
-----------------------------------------

Still the battle rages.  Now there was a new champion of evil to vanquish... Now that I could actually find the key and start encrypting in the deployed environment, this beast reared its ugly head:

```java
java.security.NoSuchAlgorithmException: PBEWithSHAAndTwofish-CBC SecretKeyFactory not available
```

Lame!  Googling this exception landed us on some sweet [BouncyCastle setup tutorials](http://sce.uhcl.edu/yang/teaching/JDK_JCE_environment_Configuration.htm).  Apparently your BouncyCastle version needs to match your JDK version.  So, we made the necessary adjustments in our pom:

```xml
<dependency>
  <groupId>bouncycastle</groupId>
  <artifactId>bcprov-jdk16</artifactId>
  <version>140</version>
</dependency>
```

(There are more recent versions that might be in your [Maven repo](http://repo2.maven.org/maven2/org/bouncycastle/).)

Still it wasn't enough.  The exception persisted and so did we.  Hours later our energy wained, but Spencer came to reinforce us and we were able to hook up a remote debugger to our deployed app.  We were obviously adding the BouncyCastle provider in our code, so that looked good:

```java
Security.addProvider(new BouncyCastleProvider());
```

But when we went to use it:

```java
factory = SecretKeyFactory.getInstance("PBEWithSHAAndTwofish-CBC");
```

It blew some serious chunks.  On our remote debugger, when we tried to retrieve the BouncyCastle provider ourself:

```java
SecretKeyFactory.getInstance("PBEWithSHAAndTwofish-CBC", new BouncyCastleProvider())
```

We got a new clue:

```java
java.lang.SecurityException: JCE cannot authenticate the provider BC

  .. caused by ..

  java.util.jar.JarException: Cannot parse file
```

The jar was the one deployed in WEB-INF/lib.  Well, somehow that clicked in our good friend, Spencer's, mind because he immediately changed our deployment to Tomcat so that instead of the bcprov-jdk16-140.jar being deployed to WEB-INF/lib, he deployed it to <TOMCAT_HOME>/applib.  The apparent difference is that when the jar is in applib, it's loaded by Tomcat's class loader.  When it's in WEB-INF/lib, it's loaded by the app's class loader, which apparently wasn't cutting it.  
To get our BouncyCastle jar not to deploy to WEB-INF/lib, we had to change our dependency:

```xml
<dependency>
  <groupId>bouncycastle</groupId>
  <artifactId>bcprov-jdk16</artifactId>
  <version>140</version>
  <scope>provided</scope>
</dependency>
```

From the [Maven Docs](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html):

  This is much like compile, but indicates you expect the JDK or a container to provide the dependency at runtime. For example, when building a web application for the Java Enterprise Edition, you would set the dependency on the Servlet API and related Java EE APIs to scope provided because the web container provides those classes. This scope is only available on the compilation and test classpath, and is not transitive.

Since we are deploying bcprov-jdk16-140.jar to applib by another means, this scope is perfect for us.  It also seems that there are other ways around this particular problem, such as defining BouncyCastle as a provider on your JVM via editing the [security.provider](http://www.randombugs.com/java/javalangsecurityexception-jce-authenticate-provider-bc.html) file.

Well, now it works.  It was a serious adventure -- even an odyssey.  I need a nap.

  
