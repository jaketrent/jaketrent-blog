---
layout: post
title: "Calling Webservices in Java"
date: "2011-12-30"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "security"
  - "tomcat"
  - "webservice"
  - "ssl"
description: In Java Land, everything is tied up in multiple layers of multi-colored wrapping paper.  The abstraction often provides niceties and protections and conveni
metaKeywords: java, security, tomcat, webservice, ssl
draft: false
---

In Java Land, everything is tied up in multiple layers of multi-colored wrapping paper.  The abstraction often provides niceties and protections and convenience, etc.  But, sometimes it practically makes you forget where you are.  For instance, why would anyone write a little howto on requesting something over the web from the context of the web.  That should be easy, right?  Well, yes, I think so.  And it turns out it is in Java, as it is in many <a href="http://developer.marklogic.com/pubs/5.0/apidocs/Ext-2.html">other languages</a>.  It's just that there you're super close to the HTTP protocol all the time, and in many Java uber-frameworks, if you want to know how to break into the low-level operations, you have to know where the fire exit is.

<!--more-->

The Right Class
---------------

By 'fire exit', I mean you have to know what specific API to use.  Hehe, and since we're doing some I/O (a request across the network), be prepared for at least a multi-layered chain of wrapper classes to package the data into.

It turns out that [`java.net.URL`](http://docs.oracle.com/javase/6/docs/api/java/net/URL.html) and [`java.net.HttpUrlConnection`](http://docs.oracle.com/javase/1.5.0/docs/api/java/net/HttpURLConnection.html) are the classes that will give us the operations we need.  And the operation is [`connection.getInputStream()`](http://docs.oracle.com/javase/1.5.0/docs/api/java/net/URLConnection.html#getInputStream()).  So, we have the bits to make a simple helper class for requesting other web resources like REST webservices.

UrlReader.java
--------------

```java
// ...package and imports...
public class UrlReader {
  public String request(String req) {
    String response = null;
    HttpURLConnection conn = null;
    try {
      URL url = new URL(req);
      conn = (HttpURLConnection) url.openConnection();
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      StringBuilder sb = new StringBuilder();
      String line;
      while ((line = br.readLine()) != null) {
        sb.append(line);
      }
      br.close();
      response = sb.toString();
    } catch (Exception e) {
      // An I/O exception handling you care for
    } finally {
      if (conn != null) {
        conn.disconnect();
      }
    }
    return response;
  }

}
```

It doesn't consist of too much:  Specify your url, open an input stream to that url, read it back, and buffer it into a string response.

But as is often the case, let's try a little bonus twist...

Internal Https With Invalid Certificate
---------------------------------------

When I started requesting webservices from my Java app, I needed to connect to an interanl web service that was https only but had a self-signed (not valid) SSL certificate.  It turns out that `HttpUrlConnection` doesn't handle https requests.  If you request such a resource, you'll turn up a nice stack trace that includes:

```bash
javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

It turns out that Java has another class that's doing some validation for you.  Also in the stack trace, `com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.validate()` is called at `X509TrustManagerImpl.java:126`.  

In my case, I didn't care if the certificate was good because to me it's an internal, trusted source anyway.  So, I want to accept any certificates in my http request.

A TrustManager that Trusts all Certificates
-------------------------------------------

So, when it goes to validate, we need to give it an automatic pass.  Here's the modified `UrlReader.java`:

```java
// ...package and imports...    
public class UrlReader {

  private static SSLContext SSL_CONTEXT;

  static {
    try {
      TrustManager[] trustAllCerts = new TrustManager[]{
        new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {return null;}
            public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType){}
            public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType){}
        }
      };
      SSL_CONTEXT = SSLContext.getInstance("SSL");
      SSL_CONTEXT.init(null, trustAllCerts, new java.security.SecureRandom());
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("Unable to initialise SSL context", e);
    } catch (KeyManagementException e) {
      throw new RuntimeException("Unable to initialise SSL context", e);
    }
  }

  public String request(String req) {
    String response = null;
    HttpsURLConnection conn = null;
    try {
      URL url = new URL(req);
      conn = (HttpsURLConnection) url.openConnection();
      conn.setSSLSocketFactory(SSL_CONTEXT.getSocketFactory());
      
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      StringBuilder sb = new StringBuilder();
      String line;
      while ((line = br.readLine()) != null) {
        sb.append(line);
      }
      br.close();
      response = sb.toString();
    } catch (Exception e) {
      // I/O exception handling -- or NOT!
    } finally {
      if (conn != null) {
        conn.disconnect();
      }
    }
    return response;
  }
}
```

So, we pretty much doubled the size of the class, but most of it is on ceremony.  There's no much there.  In the static block, we are creating an `SSLContext` that has includes a `TrustManager` anonymous class in which the method implementations explictly leave out any checking for valid certification of the connection.  Plug er in and roll.  Or not.  Please at least *think* for a moment if you really know your app, what's going to use this `UrlReader` class and whether it's a good idea or not, because trusting all "https" connections regardless isn't a great general philosophy.

  
