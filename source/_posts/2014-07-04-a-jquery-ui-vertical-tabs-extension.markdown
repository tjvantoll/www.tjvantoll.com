---
layout: post
title: "A jQuery UI Vertical Tabs Extension"
date: 2014-07-04 10:13
comments: true
categories: [JavaScript, jQuery, jQuery UI]
---

The single coolest thing in jQuery UI is the [extension mechanism](http://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/) built into the [widget factory](http://api.jqueryui.com/jquery.widget/). In my [upcoming book](http://tjvantoll.com/jquery-ui-in-action.html) on jQuery UI I devote an entire chapter to building extensions, and now that the book is *mostly* done, I want to publish some of the extensions I built for the world to use.

The first of these is an extension to display a [jQuery UI tabs widget](http://jqueryui.com/tabs/) vertically. The extension is simple: it adds a single `orientation` option that you can set to `"horizontal"` or `"vertical"`. Here it is in action:

<iframe width="100%" height="325" src="http://jsfiddle.net/tj_vantoll/dbYHL/embedded/result,html,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The extension [supports AMD usage](https://github.com/tjvantoll/jquery-ui-vertical-tabs#amd-usage), including [the new AMD modules introduced in jQuery UI 1.11](http://learn.jquery.com/jquery-ui/environments/amd/). If you're a Bower user, you can install the extension with `bower install jquery-ui-vertical-tabs`.

Please [check out the extension on GitHub](https://github.com/tjvantoll/jquery-ui-vertical-tabs). Try it; report issues; and star it if you like it. The extension is released under the MIT license, so it use it in any project you'd like. I'll have more of these coming in the near future.
