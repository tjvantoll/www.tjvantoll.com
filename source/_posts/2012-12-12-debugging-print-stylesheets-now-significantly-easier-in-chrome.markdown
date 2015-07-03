---
layout: post
title: "Debugging Print Stylesheets: Now Significantly Easier in Chrome"
date: 2012-12-12 21:55
comments: true
categories: [CSS]
---

Debugging print stylesheets has always been a bit of a pain.  The traditional way of doing so was to manually change the `media` attribute of all `link` tags from `print` to `screen` or `all` while testing.

<pre class="language-markup"><code>&lt;!-- Before --&gt;
&lt;link rel="stylesheet" href="print.css" media="print" /&gt;

&lt;!-- After --&gt;
&lt;link rel="stylesheet" href="print.css" media="screen" /&gt;
</code></pre>

The popular [Web Developer Add-on](https://addons.mozilla.org/en-US/firefox/addon/web-developer/) for Firefox even has an option to do this for you automatically.

<!--more-->

![Web Developer Add-on](/images/posts/2012-12-12/Web_Developer.png "Web Developer Add-on")

Then something changed.

We found out that [unnecessary HTTP requests are bad](https://developers.google.com/speed/docs/best-practices/rtt).  We also found out that there are some [serious performance issues with print stylesheets](http://www.phpied.com/5-years-later-print-css-still-sucks/).

Therefore, following the lead of projects like the [HTML5 Boilerplate](http://html5boilerplate.com/) we all switched to writing our print styles inline with the rest of our CSS.

<pre class="language-css"><code>@media print {
	body { font-size: larger; }
	#ads, #junk { display: none; }
}
</code></pre>

Inline print styles save HTTP requests and are easier to maintain, but they unfortunately make testing a bit harder.  They don't work with Firefox's Web Developer Add-on and a simple find and replace is now quite a bit harder.

### Good News!

A means to emulate the `print` media type has [just landed in Chrome Canary](https://plus.google.com/115133653231679625609/posts/MgpioU84JPe).

To use it, first open up the settings by clicking on the gear in the bottom right corner of the DevTools:

![How to open the DevTools settings](/images/posts/2012-12-12/DevTools_1.png "How to open the DevTools settings")

Next, select the Overrides menu, check the "Emulate CSS media" checkbox, and select "print".

![How to emulate CSS media in Chrome's DevTools](/images/posts/2012-12-12/DevTools_2.png "How to emulate CSS media in Chrome's DevTools")

That's it!  This will apply both rules defined in external `media="print"` stylesheets as well as rules within inline `@media print {}` blocks.  For bonus points, combine this with an application like [LiveReload](http://livereload.com/) that can apply CSS changes without refreshing the page and you have a robust means of developing and debugging print stylesheets.

This feature was added in version 25 of Chrome Canary so it hopefully will make it into Chrome stable around Chrome 27.  If you don't have Canary yet you should consider [installing it side by side](http://paulirish.com/2012/chrome-canary-for-developers/) with the stable release.

### WON'T SOMEONE THINK ABOUT THE TREES

Of course, the definitive way of testing print stylesheets is to physically print a web page on actual pieces of paper.  I've done this plenty of times.  And if you've read this far you likely have to.  Hopefully the next time you have to debug printing you can save a bit of paper.

![The less pages you print the more of my type get to live](/images/posts/2012-12-12/trees.jpg "The less pages you print the more of my type get to live")
<a href="http://www.flickr.com/photos/cransell/5119828609/" style="display: block; font-size: 0.8em;">Photo Credit</a>
