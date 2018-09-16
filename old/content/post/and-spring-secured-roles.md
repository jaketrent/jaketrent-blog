---
layout: post
title: "'And' Spring @Secured Roles"
date: "2012-01-06"
comments: true
categories:
  - "Code"
tags:
  - "security"
  - "spring"
  - "aop"
description: Spring Security (previously Acegi) gives you an awesome AOP way of locking down methods in your Java application.  And well-placed <a href="http://www.youtu
metaKeywords: security, spring, aop
draft: false
---

Spring Security (previously Acegi) gives you an awesome AOP way of locking down methods in your Java application.  And well-placed <a href="http://www.youtube.com/watch?v=ldFOHUaf2zg">lock down</a> is a special power indeed.  However, Spring disappoints a bit on this score because it turns out its default behavior is to 'or' the roles listed in @Secured annotation.  You'd think the default would be the stricter 'and', but alas.  But never fear, there is hope.
<!--more-->

*Updated (21 June 2012)*:

The easy way
------------

This article can be simplified into this line of code:

```java
@PreAuthorize("hasRole('ROLE_role1') and hasRole('ROLE_role2')")
```

There are other combo options [as documented by Spring](http://static.springsource.org/spring-security/site/docs/3.0.x/reference/el-access.html).

If you wish to go on, enjoy the custom code and xml config that follows:  :)

There is always hope.  

Note:  My experimentation with this and the line numbers in files mentioned here are from spring-security-core/3.0.7.RELEASE.

GrantedAuthority
----------------

Your authorities populator or however you're getting roles assigned to your user will eventually place them in the place that you can get to them programmatically: 

```java
SecurityContextHolder.getContext().getAuthentication().getAuthorities()
```

And here is where the @Secured annotation will eventually look for them (AbstractSecurityInterceptor.java:204):

```java
Collection<ConfigAttribute> attributes = this.obtainSecurityMetadataSource().getAttributes(object);
```

This collection of `GrantedAuthorities` is are the roles that have been assigned to the user associated with your request to a method.
    
@Secured
--------

When you want only users with certain authorities to access methods, you apply the `@Secured` annotation to the method needing protection.  Also note that you can specify multiple roles in this annotation:

```java
@Secured({"role1", "role2"})
public void makeSomethingAwesome() {
  // pure awesome
}
```

Again, to note what is important and initially stunned me:  By default, you just need one of these roles (either role1 OR role2) to make it into the innards of this awesomeness.  This is because of the default configuration.  From the [Spring Security docs](http://static.springsource.org/spring-security/site/docs/3.0.x/reference/ns-config.html):

The default strategy is to use an AffirmativeBased AccessDecisionManager with a RoleVoter and an AuthenticatedVoter. 

Role Name Prefix
----------------

Another point worth making is about the prefix required for roles.  Roles that are counted by the `RoleVoter` are only seen as roles if they start with the specified prefix.  By default, `RoleVoter` sees this prefix as "ROLE_".  It is settable, but be warned that your roles will count for nothing and your `@Secured` method will be totally exposed unless it looks something like this:

```java
@Secured({"ROLE_role1", "ROLE_role2"})
public void makeSomethingAwesome() {
  // pure awesome that is now protected
}
```

From the `RoleVoter` docs:

> Votes if any ConfigAttribute#getAttribute() starts with a prefix indicating that it is a role. The default prefix string is <code>ROLE_</code>, but this may be overridden to any value. It may also be set to empty, which means that essentially any attribute will be voted on. As described further below, the effect of an empty prefix may not be quite desirable.

The 2 Keys
----------

There are two key interfaces that Spring Security is using to determine how you want your roles checked that you specify in the `@Secured` annotation:

- AccessDecisionManager implemented as AffirmativeBased, ConsensusBased or UnanimousBased
- AccessDecisionVoter, implemented as RoleVoter

The decision manager is the class that has a collection of voters.  The decision manager orchestrates the voters and asks each in turn whether the requesting user should be let through the `@Secured` annotation or denied.  By default, the `AffirmativeBased` manager is used.  

Each decision manager functions differently in how it counts the votes of its voters:

- AffirmativeBased - if any voter comes votes 'yes' or 'access granted', the manager allows access
- ConsensusBased - this manager is majority rules.  There can be votes 'yes' and 'no', and as long as 'yes' votes outnumber 'no' votes, access is allowed
- UnanimousBased - this manager requires every voter to vote 'yes' or else access is denied

Since this discussion is based around roles, we only care to use Spring's `RoleVoter`.  Here's part of its implementation, starting on line 98:

```java
public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
  int result = ACCESS_ABSTAIN;
  Collection<GrantedAuthority> authorities = extractAuthorities(authentication);

  for (ConfigAttribute attribute : attributes) {
    if (this.supports(attribute)) {
      result = ACCESS_DENIED;

      // Attempt to find a matching granted authority
      for (GrantedAuthority authority : authorities) {
        if (attribute.getAttribute().equals(authority.getAuthority())) {
          return ACCESS_GRANTED;
        }
      }
    }
  }

  return result;
} 
```

Verbalized, this `vote()` method goes through each role specified in the `@Secured` annotation and for each of those checks whether the user has that role.  If he does, the voter returns its vote as 'yes'.  Got that?  _At the first match, the vote is yes_.  This is a logical 'or'.

Making the role vote a logical 'and'
------------------------------------

I don't want my roles 'or'ed together.  I want the uesr to be required to have them all in combination or I will deny him access.  Since we've already shown that the default `RoleVoter` uses a logical 'or' operation, I guess we'll need to write our own role voter that uses a logical 'and'.  Potentially, that might be called 'HasAllRolesVoter', and  might look like this:

```java
public class HasAllRolesVoter extends RoleVoter {

  @Override
  public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
    Collection<GrantedAuthority> authorities = authentication.getAuthorities();
    int requiredMatches = attributes.size();
    int matches = 0;
    for (ConfigAttribute attribute : attributes) {
      if (this.supports(attribute)) {
        for (GrantedAuthority authority : authorities) {
          if (attribute.getAttribute().equals(authority.getAuthority())) {
            ++matches;
            break;
          }
        }
      }
    }

    int result = ACCESS_ABSTAIN;
    if (requiredMatches > 0 && matches < requiredMatches) {
      result = ACCESS_DENIED;
    } else if (matches > 0 && matches == requiredMatches) {
      result = ACCESS_GRANTED;
    }
    return result;
  }
}
```

It looks much like `RoleVoter`.  It extends `RoleVoter` and overrides `vote()`, which now goes through the roles on the `@Secured` annotation, checks each against the roles of the user, incrementing a count with each match.  If, in the end, there are as many matches as roles specified, we've found them all.  This is just a potential implementation.  There are probably many better was to get this done.

So now can we do a logical 'and'?  Yes.  There are 3 ways of accomplishing this (and probably more):

1. AffirmativeBased w/ HasAllRolesVoter
2. ConsensusBased w/ HasAllRolesVoter
3. UnanimousBased w/ RolesVoter

Note that in the last option `UnanimousBased` access manager can use just the plain jane `RolesVoter`.  This is because `UnanimousBased` calls the `RoleVoter` up for vote for each individual role (one by one via the `singleAttributeList`) as opposed to the roles as a collection.  Thus, that combination ignores the fact that `RoleVoter` normally 'or's matching roles together.

Configuration
-------------

So, there really hasn't been too much to this solution.  But as with most frameworks of this flexibility and complexity, the key is knowing how to actually specify that you want it to work this way.  To specify a `UnanimousBased` access manager using the plain `RoleVoter` (my eventual solution for my own problem) looks something like this:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:sec="http://www.springframework.org/schema/security">
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
         http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-3.0.xsd">

  <bean id="accessDecisionManager" class="org.springframework.security.access.vote.UnanimousBased">
    <property name="decisionVoters">
      <bean class="org.springframework.security.access.vote.RoleVoter" />
    </property>
    <property name="allowIfAllAbstainDecisions" value="false" />
    <property name="messageSource" ref="messageSource" />
  </bean>

  <sec:global-method-security secured-annotations="enabled" jsr250-annotations="enabled" pre-post-annotations="enabled"
    access-decision-manager-ref="accessDecisionManager" />

</beans>
```

Smooth as butter.  As with most Spring solutions, the answer was in an xml configuration.  Oh boy.

  
