---
layout: post
title: "Change Maven JDK"
date: "2009-09-21"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "maven"
description: Sometimes you want Maven to compile your code with a different JDK than is the one assigned to your JAVA_HOME.  For instance, I have code in a project that 
metaKeywords: java, maven
draft: false
---

Sometimes you want Maven to compile your code with a different JDK than is the one assigned to your JAVA_HOME.  For instance, I have code in a project that I'm working on that only compiles on Java 1.5.  My JAVA_HOME, however, is 1.6.  So, how do we specify the JDK for Maven?

<!--more-->

Go to the pom.xml for the module or submodule that needs a specific JDK version for compilation, and insert such a goody:

```xml
<project>
   <build>
      <plugins>
         <plugin>
         <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
               <source>1.5</source>
               <target>1.5</target>
               <compilerVersion>1.5</compilerVersion>               
               <executable>/usr/lib/jvm/java-1.5.0-sun/bin/javac</executable>
            </configuration>
         </plugin>
      </plugins>
   </build>
</project>
```


_Note: My code parser/colorer is removing camelcase, which is important.  (ie, artifactId, compilerVersion)_

Notice that the executable for javac is hardcoded in the pom.xml.  That's not the most awesome thing to do, so you can use a property for the absolute path that can be specified on a per-user basis.  For more details, see the [Apache documentation](http://maven.apache.org/plugins/maven-compiler-plugin/examples/compile-using-different-jdk.html).

Now mvn compile, etc, and JDK 1.5 will be used where you have specified.

  
