---
layout: post
title: "Backbone and JAX-RS"
date: "2011-12-28"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "java"
  - "webservice"
  - "backbonejs"
  - "requirejs"
description: BackboneJS is setup to do some pretty sweet single-page app action.  And of course, a single page app will probably be wanting to talk to web services on th
metaKeywords: ajax, java, webservice, backbonejs, requirejs
draft: false
---

BackboneJS is setup to do some pretty sweet single-page app action.  And of course, a single page app will probably be wanting to talk to web services on the server.  And if your server code is doing the Java jive, then a great way to expose your REST services is via JAX-RS.  It's as easy as Mikey singin' ABC-123!

<!--more-->

Note:  These examples use AMD-style modules in Javascript.  I personally use [RequireJS](http://requirejs.org/) for my module loading fettish.

[BackboneJS](http://documentcloud.github.com/backbone/) Model Url
--------------------

To tell a client-side [`Backbone.Model`](http://documentcloud.github.com/backbone/#Model) object where it syncs to on the server, it needs a [`url`](http://documentcloud.github.com/backbone/#Model-url) field like so (in `Cat.js`):

```javascript
define(function () {
  return Backbone.Model.extend({
    url: '/ws/cat'
  });
});
```

The `url` field can be a string literal or a function that has more meat to it.  The point is that it be awesome and point correctly to your REST endpoint exposed on the server.

If you want to fetch a model from the server, you can call [`fetch()`](http://documentcloud.github.com/backbone/#Model-fetch) directly on the model a la `myModelInstance.fetch()`, but in practice you won't know which specific model you want initially, and instead your model will be part of a [collection](http://documentcloud.github.com/backbone/#Collection-fetch).  But let's say that your model had an id of, say, 1334, and you wanted to get it off the server, you'd call `fetch()` and that call will delegate to [`Backbone.sync`](http://documentcloud.github.com/backbone/#Sync), making an HTTP GET to:

```bash
GET /ws/cat/1334
```

When you save a model by calling `myModelInstance.save()`, it delegates to `Backbone.sync` in the same way.  If it's a new object (in Backbone, that means it doesn't yet have an `id` field) that was initially created on the client and thus doesn't appear on the server yet, it'll make an HTTP POST to:

```bash
POST /ws/cat
```

If it's already an object that was requested from the server (and has, say, and id of 1334) and is now being updated based on client action, it'll make an HTTP PUT to:

```bash
PUT /ws/cat/1334
```

(BTW, HTTP DELETE works the same way as PUT.)

JAX-RS Endpoints
----------------

[JAX-RS](http://en.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services) endpoints are exceedingly easy to setup.  It's all annotation-based, so you're free to rejoice.  Here's an example (It's also a [Spring `@Controller`](http://static.springsource.org/spring/docs/2.5.x/reference/beans.html)): 

```java

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller
@Scope("singleton")
@Path("/ws/cat")
public class CatRest {

  @GET
  @Produces("application/json")
  public List<CatDto> getCats() {
    return getCatsFromSomewhere();
  }

  @POST
  @Produces("application/json")
  @Consumes("application/json")
  public CatDto createCat(CatDto dto) {
    return saveCatAndReturnInstanceWithId();      
  }

  @PUT
  @Path("/{id}")
  @Produces("application/json")
  public CatDto updateCat(CatDto dto) {
    return updateCatReturnSameInstance();
  }

  @DELETE
  @Path("/{id}")
  @Produces("application/json")
  public void deleteCat(@PathParam("id") Long id) {
    removeTheBlastedCat();
  }

}
```

This should all be fairly self-descriptive.  It matches the HTTP actions that can be made from Backbone.sync.  So what is JAX-RS doing for you.  It's allowing your methods to be exposed as rest endpoints by the simple addition of the `@GET`, `@POST`, etc annotations.  

Note that the `@Path` matches the `url` field on your Backbone model.  And `@PUT` and `@DELETE` append an `{id}` variable to the end of the path.  In the case of `@PUT`, the id gets set on the `CatDto`.  For HTTP DELETE, a body is not send, just the HTTP request, so a `@PathParam` is all you get.  

If these operations are successful, they all [respond with](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) HTTP 200, except for DELETE which returns 204 NO CONTENT.

JAX-RS is also dealing with the marshalling and unmarshalling from, in this case, json into and out of `CatDto`.  The `CatDto`, but like most [DTOs](http://en.wikipedia.org/wiki/Data_Transfer_Object) just provides a wrapper around your actually domain object that exposes only what you desire in your web service (ie, possibly not everything in domain objects).

And what does the DTO look like?  I'm glad you asked.

DTOs -- The Backbone / JAX-RS Gophers
-------------------------------------

Here's `CatDto.java`:

```java
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@SuppressWarnings("serial")
@XmlRootElement
public class CatDto implements Serializable {

  private Long id;

  private String name;

  // getters and setters...

}
```

There's not much to it  -- just like a DTO should be.

By default, when JAX-RS gets some JSON in the body of an HTTP request, it's going to try and bind fields in the JSON to the DTO fields.  So, a nice piece of JSON from the client that could be unmarshalled into a `CatDto` instance would look something like:

```javascript
{
  id: 1334,
  name: 'Cotton-headed Ninnymuggins'
}
```

It's as magical as [maple syrup](http://www.youtube.com/watch?v=Fig956-MuVA)!

Binding form fields to a Backbone Model
---------------------------------------

By default, BackboneJS has no built-in ability to automatically bind the values that are entered in form fields in the UI to fields in the corresponding `Backbone.Model` object.  But, Derick Bailey has created a nice little Backbone plugin for this purpose called [Backbone.ModelBinding](https://github.com/derickbailey/backbone.modelbinding).  This is a [KnockoutJS](http://knockoutjs.com/)-inspired dom to model (and vice versa) data transfer lib.

If you don't have `Backbone.ModelBinding` on your project, you'll have to do your own setting of fields when you save with the "set and save" idiom from Backbone that will look something like:

```javascript
myModel.save({
  name: $("#name-form-field").val()
});
```

If you do want to use `Backbone.ModelBinding`, make sure you make it globally available (as a dependency [ordered](http://requirejs.org/docs/api.html#order) after Backbone itself) just put this snippet in your `Backbone.View` code:
  
```javascript
define(function () {
  return Backbone.View.extend({
    initialize: function () {
      // ...
      Backbone.ModelBinding.bind(this);
    },
    // more view goodness
  }
});
```

You should also be aware of some of the limitations of `Backbone.ModelBinding`.  For instance, it can only bind anything that a Backbone.Model can get() and set(), which doesn't include nested objects or arrays.  So, some stuff you'll have to set manually anyway if you have objects more interesting than cats.  

Also note that any inputs on the form, that are sometimes fields you don't care about or necessarily want attached to your `Backbone.Model`, show up there anyway.  So now when you call `myModelInstance.save()`, the json that gets sent to the server will be laden with extra coconuts, potentially like this:


```javascript
{
  id: 1334,
  name: 'Mittens',
  ladenWith: 'coconuts,
  africaan: true
}
```

And just between you and me, that won't work with our currently-defined `CatDto`.  It's time for a season reboot:

Backbone.ModelBinding and JAX-RS
--------------------------------

If we get these extra, albeit more exciting, fields in the json, when unmarshalling happens, we get a late Christmas present:

```text
[12/26/12 00:00:0:001] 0000000e Wr WebApplicationExceptionMapper: WebApplicationException has been caught :
Unrecognized field "laden_with" (Class CatDto), not marked as ignorable 
  at [Source: org.apache.cxf.transport.http.AbstractHTTPDestination$1@b98117; line: 1, column: 286] (through reference chain: CatDto["laden_with"])
```

"Not marked as ignorable", eh?  A couple ways to fix this.  The one requiring more typing and creating a brittle dto first.  Back to `CatDto.java`:

```java
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@SuppressWarnings("serial")
@XmlRootElement
public class CatDto implements Serializable {

  private Long id;

  private String name;

  @XmlTransient
  private String ladeWith;

  @XmlTransient
  private Boolean africaan;

  // getters and setters...

}
```

We can label each of the undesirable fields with `@XmlTransient`, but oh the pain.

It's maybe not all that bad that this blows big chunks.  Perhaps more secure.  You want to validate input at the REST endpoints.  Maybe this is the way you personally do it.  I do it elsewhere -- in the converstion from DTOs to domain objects and with Hibernate validators on those objects.

So, for me the better option that allows me to not have to go back and mess with `CatDto.java` as much is:

```java
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@SuppressWarnings("serial")
@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true)
public class CatDto implements Serializable {

  private Long id;

  private String name;

  // getters and setters...

}
```

This is whitelisting instead of blacklisting.  Lots less maintenance when more fields show up as unrecognizable.  Either way, I just use what I want on the server, so just ignore *everything* else with the [`@JsonIgnoreProperties`](http://wiki.fasterxml.com/JacksonAnnotations) annotation.

Lots of HTTP
------------

This kind of programming is really quite fun.  And it feels pretty clean.  There's lots of cool UI possibilities for single-page apps on the client.  BackboneJS and RequireJS makes handling the complexity there much more doable.  And data-handling REST endpoints on the backend are super simple.  The simplicity of the REST endpoints makes Java feel a little heavy-handed on ceremony (like it often seems these days), but JAX-RS is a great framework if Java is what you have on the backend.

  
