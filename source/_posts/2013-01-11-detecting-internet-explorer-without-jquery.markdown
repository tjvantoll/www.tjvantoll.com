---
layout: post
title: "Detecting Internet Explorer without jQuery"
date: 2013-01-11 17:26
comments: true
categories: [jQuery, JavaScript]
---

One of the changes in jQuery's [upcoming 1.9 release](http://blog.jquery.com/2013/01/09/jquery-1-9-rc1-and-migrate-rc1-released/) is the removal of [$.browser](http://api.jquery.com/jQuery.browser/).  So if you're using it to test for Internet Explorer, what do you do?

<!--more-->

### Option 1: Use the migrate plugin

If you want to avoid upgrading existing code, use the [migrate plugin](https://github.com/jquery/jquery-migrate/) which will preserve `$.browser` as it was.  Of course this is simply putting off the inevitable, but if you need to upgrade a large code base it's a good temporary measure.  The development version of the plugin will produce a console warning message whenever `$.browser` is used, which can help you identify where you're using it and migrate accordingly.

### Option 2: Switch to feature detection

Testing for specific browsers is [a](http://www.sitepoint.com/why-browser-sniffing-stinks/) [bad](http://msdn.microsoft.com/en-us/magazine/hh475813.aspx) [practice](http://diveintohtml5.info/detect.html).  If you are not supporting IE because of features that it does not possess, test for those features instead of the browser.  The [Modernizr](http://modernizr.com) library includes a wide variety of feature tests and is a good place to get started.

### Option 3: Use conditional classes or conditional comments

IE versions <= 10 support <a href="http://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx">conditional comments</a> that can be used to detect Internet Explorer.  For example the [HTML5 boilerplate](http://html5boilerplate.com/) [uses the following](https://github.com/h5bp/html5-boilerplate/blob/master/index.html) to show a warning to users using IE < 7:

``` html
<!--[if lt IE 7]>
    <p class="chromeframe">
        You are using an <strong>outdated</strong> browser. Please
        <a href="http://browsehappy.com/">upgrade your browser</a>
        or <a href="http://www.google.com/chromeframe/?redirect=true">
        activate Google Chrome Frame</a> to improve your experience.
    </p>
<![endif]-->
```

This approach can be used to add conditional classes on the `html` element ([via Paul Irish](http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/)).

``` html Conditional classes on the html element
<!--[if lt IE 7]>      <html class="ie6"> <![endif]-->
<!--[if IE 7]>         <html class="ie7"> <![endif]-->
<!--[if IE 8]>         <html class="ie8"> <![endif]-->
<!--[if gt IE 8]><!--> <html>         <!--<![endif]-->
```

Now the presence of a class on the `html` element can be used to derive the version of Internet Explorer the user is using:

``` javascript
$('html').hasClass('ie6'); //True if the user is using IE6
```

### Option 4: Sniff the User Agent

If for whatever reason you cannot do any of the options above, you *can* determine IE usage the from `navigator` object.

<div class="warning" style="display: block;">
	User agent sniffing should be used as a last resort.  Make sure you at least consider the options above before using this.
</div>

``` javascript Sniffing the user agent string to test for Internet Explorer
//Test for Internet Explorer
if (/MSIE\s([\d.]+)/.test(navigator.userAgent)) {
    //Get the IE version.  This will be 6 for IE6, 7 for IE7, etc...
    version = new Number(RegExp.$1);
}
```
