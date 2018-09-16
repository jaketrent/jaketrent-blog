---
layout: post
title: "EasyMock Cause-Effect Exception Mapping"
date: "2009-07-06"
comments: true
categories:
  - "Code"
tags:
  - "easymock"
  - "java"
  - "unit-testing"
description: EasyMock is a great tool for separating external dependencies from unit tests.  There is a learning curve to learning the mock method of testing, and unfort
metaKeywords: easymock, java, unit-testing
draft: false
---

EasyMock is a great tool for separating external dependencies from unit tests.  There is a learning curve to learning the mock method of testing, and unfortunately, EasyMock does not give very good prompts when you do something wrong.  The exception messages are actually quite cryptic.  This article is meant to be a crude mapping of exception output and the behavior that might have caused it.  At least, this is a log of many of my experiences with EasyMock and how I usually get into the messes I do.  It is quite possible that the same exception output could be had via different behavior.  It's also important to note that I'm not trying to show how to create meaningful tests here (I don't even show full tests half the time), only help figure out how mysterious EasyMock exceptions were thrown.  These experiences were documented on EasyMock 2.2 and 2.4.

<!--more-->

### Argument Matcher

#### Exception

```java
java.lang.IllegalStateException: 2 matchers expected, 1 recorded.
  at org.easymock.internal.ExpectedInvocation.createMissingMatchers(ExpectedInvocation.java:41)
  at org.easymock.internal.ExpectedInvocation.(ExpectedInvocation.java:33)
  at org.easymock.internal.ExpectedInvocation.(ExpectedInvocation.java:26)
  at org.easymock.internal.RecordState.invoke(RecordState.java:64)
  at org.easymock.internal.MockInvocationHandler.invoke(MockInvocationHandler.java:24)
  at org.easymock.internal.ObjectMethodsFilter.invoke(ObjectMethodsFilter.java:45)
  at $Proxy0.findFoos(Unknown Source)
  at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    ...
```
#### Behavior

Sometimes you don't know the exact instance of the objects that will be passed as arguments into methods on external dependencies.  Thus, the mocked call on that method will be different than normal.  EasyMock provides a method, EasyMock.isA().  From the JavaDoc, this method "Expects an object implementing the given class."  Essentially, it looks for type (class) instead of instance (object) when setting up the EasyMock.expect().  This is useful when you don't have the actual instance of a method parameter from the context of your test, like a local variable.

So, if I was testing a method like this:

```java
public class BeingTested {
   void doSomething(Integer code) {
      StringBuilder sb = new StringBuilder()
      externalService.serviceCall(sb, code);
   }
}

interface ExternalService {
   void serviceCall(StringBuilder sb, Integer code);
}
```

And tried to test it like this:

```java
@Test
public void testDoSomething() {
   /* ... */
   externalService.serviceCall(isA(StringBuilder.class), 123);
   expectLastCall();
   /* ... */
   tested.doSomething(123);
   /* ... */
}
```

I will inevitably get the above exception.

#### Explanation

So, now to get rid of this nasty exception.  Use of isA() either implies that you really don't care what the exact instance of the method parameter is or you use it to get around another constraint on your code.  Either way, EasyMock, through this wonderful exception, is trying to tell you that <strong>if you're going to use isA() for one of the method parameters, it must be used on all!</strong>  Thus, to keep your StringBuilder isA() call, you must add one for Integer in this example.

```java
externalService.serviceCall(isA(StringBuilder.class), isA(Integer.class));
```

### Behavior Definition

#### Exception

```java
java.lang.IllegalStateException: missing behavior definition for the preceeding method call getIsInitialized()
  at org.easymock.internal.MockInvocationHandler.invoke(MockInvocationHandler.java:30)
  at org.easymock.internal.ObjectMethodsFilter.invoke(ObjectMethodsFilter.java:61)
...
```

#### Behavior

If I was testing a method like this:

```java
public class SomethingElse {
   void doSomething() {
      externalService.checkSomething();
   }
}

interface ExternalService {
   int checkSomething();
}
```

And tried to test it like this:

```java
@Test
public void testDoSomething() {
   /* ... */
   expect(externalService.checkSomething());
   /* ... */
   tested.doSomething();
   /* ... */
}
```

I just may get the above exception.

#### Explanation

The issue is that you've only half-told EasyMock what you expect to happen.  Because the checkSomething() method has a return type other than void, when need to explicitly tell EasyMock what to expect as the return value.  That is done by using the andReturn() method.

```java
expect(externalService.checkSomething()).andReturn(0);
```

### Mock methods use Mocks

#### Exception

Here's an exception that may very well be thrown in many instances by EasyMock.  It might not be very helpful there; it certainly wasn't here.

```java
org.easymock.internal.RuntimeExceptionWrapper
  at org.easymock.classextension.internal.ClassExtensionHelper.getControl(ClassExtensionHelper.java:52)
  at org.easymock.classextension.EasyMock.replay(EasyMock.java:117)
...
```

### Behavior

When you're using EasyMock, there are several steps that you need to take in setting up your mock scenario.  And we all know that the more steps a process takes, the more prone it is to error.  Well, as the user of the EasyMock API, I make errors all the time.  For instance, as I'm evolving my test, deciding that some objects will be mocked one moment and not mocked the next, the test changes but sometimes I forget to adjust the multi-step EasyMock setup process at every step.  For instance, I had a test:

```java
@Test
public void testSomething() {
   Something something = createMock(Something.class);
   Else else = createMock(Else.class);
   /* ... expects ... */
   replay(something, else);
   /* ... */
   verify(something, else);   
}
```

And I refactor it to be:

```java
@Test
public void testSomething() {
   Something something = createMock(Something.class);
   Else else = new Else();
   /* ... expects ... */
   replay(something, else);
   /* ... */
   verify(something, else);   
}
```

#### Explanation

I changed the Else class to not be a mock object for the test.  But, I forgot to remove the reference to else from the replay() and verify() methods  (statically imported EasyMock methods).  So, this RuntimeExceptionWrapper exception makes no sense, but I have had it thrown many times for this reason.  To fix it, remove the non-mocks from the mock-related methods.

```java
@Test
public void testSomething() {
   Something something = createMock(Something.class);
   Else else = new Else();
   /* ... expects ... */
   replay(something);
   /* ... */
   verify(something);   
}
```

### Last Call for Mocks

#### Exception

Again, I believe I may have seen this exception in more than one type of situation.  This is just one.

```java
java.lang.IllegalStateException: no last call on a mock available
  at org.easymock.EasyMock.getControlForLastCall(EasyMock.java:174)
  at org.easymock.EasyMock.expectLastCall(EasyMock.java:167)
  ...
```

#### Behavior

I use IntelliJ IDEA, which I love for many reasons.  One of them is it's robust refactoring toolset.  For instance, Ctrl-Alt-V, by default, is the introduce variable shortcut.  So, you select the expression that returns some value, introduce variable, and voila, that return value is stored in a nice local variable for you (or there are other options to refactor into fields, constants, parameters, and such.  End shameless plug.  Anywho, EasyMock scenarios value ordering of method calls.  This can become problematic if you're not careful to maintain its delicate order needs (which a refactoring tool, for instance, knows nothing about).

If I start with this as a part of a test:

```java
someObj.doSomething();
expectLastCall().andThrow(new Exception());
```

And then somehow came to this, let's assume for the sake of a refactor:

```java
someObj.doSomething();
Exception e = new Exception();
expectLastCall().andThrow(e);
```

You will get the above exception.

#### Explanation

Simply, the problem is that something has been interjected in between the method call and the expect.  Because these things are syntatically separate with the void return type methods, this becomes a possible pitfall.  To fix, put the two together, keep the ordering correct.

```java
Exception e = new Exception();
someObj.doSomething();
expectLastCall().andThrow(e);
```

### Throws like a girl

#### Exception

```java
java.lang.IllegalArgumentException: last method called on mock cannot throw com.lowagie.text.DocumentException
  at org.easymock.internal.MocksControl.andThrow(MocksControl.java:137)
   ...
```

#### Behavior

When I'm trying to test the catch blocks in my code, often times I will simulate an exception being thrown with the mock andThrow() method.  If I start with a class like this:

```java
public class Something {
   void doSomething() {
      try {
         externalService.callService();
      } catch (Exception e) { 
         // log 
      }
   }
}

interface ExternalService {
   void callService();
}
```

And do a test like this:

```java
@Test
public void testDoSomething() {
   /* ... */
   externalService.callService();
   expectLastCall().andThrow(new Exception());
   /* ... */
}
```

You are likely to get the above problematic exception.

#### Explanation

Sure you catch the exception; sure you want to check your catch block logic (lame here); but andThrow() needs to know that it's doing the right thing.  Expectations in mocks are really quite flexible and allow us to make the code do things it might not otherwise do through simulated conditions in a test.  But, EasyMock will not do the impossible.  And in this case, it knows that if you're expecting a checked exception to be thrown, it must be declared as thrown, which it is not.  So, to fix this, your code must actually declare that it throws Exception.  Of course, only do this if it makes sense.  And, if it doesn't, why are you testing it anyway?

For interface and implementing class:

```java
void callService() throws Exception;
```

### Half-Mocked Expectations

#### Exception

This exception is very similar to that mentioned in the "<a href="#mocksusemocks">Mock methods use Mocks</a>" section above.

```java
java.lang.IllegalStateException: void method cannot return a value
  at org.easymock.internal.MocksControl.andReturn(MocksControl.java:128)
   ...
```

#### Behavior

It is convenient and more unit-like to test one method in a class that calls other methods in that class but not test the other method at that point.  Thus, we half-mock the class, mocking the "external" methods, the ones not being tested in this particular test, but not mocking the method being tested.  Did I mention how useful this is?  Let's try it.

Start with this code:

```java
public class TestMe {
   void doTestNow() {
      /* ... */
      doTestLater();
   }
}
```

And this test:

```java
@Test
public void testDoTestNow() throws NoSuchMethodException {
   Method doTestLater = TestMe.class.getDeclaredMethod("doTestLater");
   TestMe me = createMock(TestMe.class, doTestLater);
   /* ... */ 
   me.doTestLater();
   expectLastCall();
   replay(me);
   me.doTestNow();
   verify(me);
}
```

When we instantiate TestMe, it looks like a mock, but when we pass in var-arg java.lang.reflect.Method parameters, only those specified methods are mocked.  This works, is cool, and allows the doTestNow() method to be tested independent of the doTestLater() method and its test.  Now, let us pretend that we change our test to not want to mock calls to methods on TestMe, and instead of doing this:

```java
TestMe me = createMock(TestMe.class, doTestLater);
```

We do this:

```java
TestMe me = new TestMe();
```

We will get the icky exception shown above.

#### Explanation

The first thing we tried to do worked, but the reason we got the exception that we're decrypting is because we made the refactor to the test, making the TestMe instance totally non-mocked, but we left the expectLastCall() on the me.doTestLater() call.  Simply remove that expectation and you're good to go again.  Just remember, now you're actually calling into the body of doTestLater().

Well, that's it for this current round into the EasyMock foray.  But, I'm sure to continue to make mistakes using this helpful, yet often-problematic tool that is EasyMock.  If you have any cause-effect mappings related EasyMock that might help, let us know.

  
