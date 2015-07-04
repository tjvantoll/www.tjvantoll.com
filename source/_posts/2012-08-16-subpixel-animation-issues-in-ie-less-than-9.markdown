---
layout: post
title: "Subpixel Animation Issues in IE < 9"
date: 2012-08-16 21:56
comments: true
categories: [Browsers, JavaScript]
---

While there are definitely [cross browser discrepancies handling subpixels](http://ejohn.org/blog/sub-pixel-problems-in-css/), this one caught me by surprise.  Take the following:

<pre class="language-markup"><code>
&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
    var box = document.getElementById('box');
    box.style.left = '10.25px';
    console.log(box.style.left);
&lt;/script&gt;
</code></pre>

This simply sets a value for the `left` CSS property then immediately retrieves it.  In Chrome 22, Firefox 14, Safari 6, Opera 12, IE >= 9, iOS 5, and Android `10.25px` will be logged.

In IE < 9 `10px` is logged.  While not all browsers can accurately render the subpixel values, I had assumed all of them would've at least allowed the assignment.  I was wrong.  Internet Explorer will simply round the value to the nearest integer.

Why is this a problem?  <!--more-->Take the following code.

<pre class="language-markup"><code>
&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
    var box = document.getElementById('box');
    box.style.left = '0px';
    setInterval(function() {
        var currentLeft = box.style.left.replace('px', '');
        currentLeft = parseFloat(currentLeft);
        box.style.left = currentLeft + 0.25 + 'px';
    }, 20);
&lt;/script&gt;
</code></pre>

This sets an interval that will increase the `left` property of a box by `0.25` pixels every 20 milliseconds.  Doing so will move the box left across the screen as seen below:

{% demo /demos/2012-08-16/box_move.html Moving_a_box_with_sub_pixels 135 %}

Great.  Unfortunately in IE < 9 the box will not move.  Within the interval function the value to increment is being retrieved from the element itself, which, in IE < 9 will continuously return the rounded value.

The way around this is simply to use store off the value of the property outside of the animation loop itself.

<pre class="language-markup"><code>
&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
    var left = 0;
    var box = document.getElementById('box');
    setInterval(function() {
        box.style.left = left + 'px';
        left += 0.25;
    }, 20);
&lt;/script&gt;
</code></pre>

This has the added benefit of being more efficient since you save a property retrieval on every invocation of the loop.
