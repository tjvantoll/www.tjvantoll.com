---
layout: post
title: "HTML 5 hidden Attribute Browser Support"
date: 2013-01-09 21:27
comments: true
categories: [HTML5, Browsers]
---

I had trouble finding this from a Google search, so I thought I'd list the browser support for the [HTML5 hidden attribute](http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#the-hidden-attribute) here.

* Chrome 6+
* Firefox 4+
* Safari 5.1+
* Opera 11+
* iOS 5+
* Android Browser 4+

IE still does not support the `hidden` attribute as of IE 10.  For any unsupported browser you can easily add support by just including the following CSS:

``` css Polyfiling the hidden attribute.
[hidden] { display: none; }
```

This will work back to IE6, which doesn't support the [attribute selector](https://developer.mozilla.org/en-US/docs/CSS/Attribute_selectors).
