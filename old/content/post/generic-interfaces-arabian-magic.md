---
layout: post
title: "Generic Interfaces Arabian Magic"
date: "2010-08-06"
comments: true
categories:
  - "Code"
tags:
  - "generics"
  - "java"
description: Say words like generics, enums, or interfaces, and you've immediately transported to the realm of conjured whirlwind sandstorms and curved-sw
metaKeywords: generics, java
draft: false
---

[flash bang!]  Say words like generics, enums, or interfaces, and you've immediately transported to the realm of conjured whirlwind sandstorms and curved-sword-weilding assasins.  Well, I guess we're going there, because I think this is pretty cool.  Plus, undocumented, or at least un-reiterated to myself, and later I'll look at it and think it's just pretty complicated.  Prepare for angle brackets in the amount of parens in lisp. 

<!--more-->

Interfaces allow you to immediately apply a new adjective to an object.  In this case, we're dealing with enums specifically.  We've got a pile of enums in a codebase that I worked on recently that correspond with a lookup table of values in the database.  The lookup values are essentially static, but still in the database so we can make the appropriate associations between data bits.  Take this contrived example:  Here's our enum with an associated PK on the database side specified for each:

```java
public enum MagicalItem {
  LAMP(1L),
  SWORD(2L),
  SMOKE_BOMB(3L);
  
  private final Long id;
  
  MagicalItem(Long id) { this.id = id; }  
  
  public Long getId() { return id; }
}
```

In business logic, we're generally wanting to use the enum value for its safety, ease of reading, etc.  But in going back and forth from DB data to data in the app layer, we're going to have to be able to translate between the two.  We could simply add a method to the enum to allow a translation to MagicItems from their associated ids:

```java
  public enum MagicalItem {
    LAMP(1L),
    SWORD(2L),
    SMOKE_BOMB(3L);
    
    private final Long id;
    
    MagicalItem(Long id) { this.id = id; }  
    
    public Long getId() { return id; }
    
    public MagicalItem getItemById(Long itemId) {
      MagicalItem retval = null;
      for (MagicalItem item : MagicalItems.values() {
        if (item.getId().equals(itemId)) {
          retval = item;
          break;
        }
      }
      return retval;
    }
  }
```

But, then if we ever had an enum of WishesToMakeOfAGenie (as if that could ever be enumerated), then we'd be writing (or cut and pasting) essentially the same code.  "I wish to be able to use interfaces correctly every time!"  Let's try an interface.  It's something simple that merely translates from an input to an output.  We know at least the output type will change, and we have no confidence that the outputs will ever be related datatypes.  Well, now we're wishing that we know how to use generics.  Here's a pass at an interface:

```java
  public interface MatchableEnum<E, T extends Enum<T>> {
      public E getMatchElement();
  }
```

This interface's only method will simply identify for us what element of data in the enum will be the field we try to match/translate on.  To explain (or, as it is, sum up):

* E and T - the names for the generic types that I chose.  That was arbitrary.  
* T extends Enum&lt;T&gt; - this interface can only be used on enums

For MagicalItem, the implementation might look like this:

```java
  public enum MagicalItem implements MatchableEnum<Long, MagicalItem> {
    LAMP(1L),
    SWORD(2L),
    SMOKE_BOMB(3L);
    
    private final Long id;
    
    MagicalItem(Long id) { this.id = id; }  
    
    public Long getId() { return id; }
    
    public Long getMatchElement() {
      return id;
    }
  }
```

And what about the code to consume this?  The code that we didn't want to write over and over for the specific case.  Well, this type of functional code is going to go in some sort of util class as a static method, like so:

```java
  public static <E, T extends Enum<T>> T matchEnumByElement(Class<? extends MatchableEnum> clzz, E element) {
    T retval = null;
    for (MatchableEnum elem : clzz.getEnumConstants()) {
      if (elem.getMatchElement().equals(element)) {
        retval = (T) elem;
        break;
      }
    }
    return retval;
  }
```
  
Again, to sum up:

* The method is genericized (&lt;, T extends Enum&lt;T&gt;&gt;) -- you'd think the JVM would be able to infer and not require that given the input
* T is the return type (our enum)
* It consumes MatchableEnums and subtypes (see param1)
* And also needs the element you're trying to match on -- in this case, our Long (see param2)
* Within the method we can use special methods on the class, because we know it's an enum (clzz.getEnumConstants()), and the getMatchElement() method from the interface is the only other thing we need.

Then, when you want to use it, you can do something like this:

```java
  Long id = 3L;
  MagicalItem item = EnumUtil.<Long,MagicalItem>matchEnumByElement(MagicalItem.class, id);
  // item should be MagicalItem.SMOKE_BOMB from our example above
```
It's a beautiful thing.  It's bought this codebase a lot of mileage, and it's a handy tool to have around.  

For the longest time, the 2nd param was simply a Long, because, as you see in this example, that was the common case.  Making that parameter also a generic allowed for more varied uses -- for instance, when you get an enum like this:

```java
  public enum FileType implements MatchableEnum<String, FileType> {
    JPG("image/jpeg"),
    PNG("image/png"),
    /* ... */

    private final String mime;

    FileType(String m) { mime = m; }

    public String getMime() { return mime; }

    public String getMatchElement() { return mime; }
  }
```

So, enjoy the magic: generics, enums, and interfaces.  See through the cloud of smoke to the ninja in front of you.  Attack with sure confidence and cunning.  The drawback is that you might get stuck with a stray Chinese throwing angle bracket when using generics like this.  I guess know your first aid as well. :)


  
