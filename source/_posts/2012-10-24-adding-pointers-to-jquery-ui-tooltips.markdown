---
layout: post
title: "Adding Pointers to jQuery UI Tooltips"
date: 2012-10-24 20:58
comments: true
categories: [jQuery UI, CSS]
---

The recent [jQuery UI 1.9 release](http://jqueryui.com/changelog/1.9.0/) included a new [tooltip plugin](http://jqueryui.com/tooltip/) that can be used to create tooltips much like the native tooltips the browser provides.  The difference is that jQuery UI's version are completely customizable.  As such I thought I'd show a quick example of how you can create a pointer from the tooltip to its associated field:

<iframe style="width: 100%; height: 350px;" src="http://jsfiddle.net/tj_vantoll/kyBwU/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

So how is this done?

* The [position](http://api.jqueryui.com/tooltip/#option-position) option is used to place the tooltip appropriately around the textbox.  Importantly the `collision` property is set to `none`, since, if the tooltip were to be repositioned the arrow would be placed incorrectly.
* The pointers themselves are created using using the `::after` and ``::before`` pseudo-elements.  For some more information on the technique and to see some other variations there's an excellent tutorial [here](http://nicolasgallagher.com/pure-css-speech-bubbles/).
* Since the `::after` and `::before` pseudo-elements are used to create the pointers, IE <= 8 users will not see them.  However, they'll simply see the default pointerless tooltip, no harm done.
