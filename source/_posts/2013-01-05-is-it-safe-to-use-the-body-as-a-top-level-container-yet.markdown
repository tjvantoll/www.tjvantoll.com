---
layout: post
title: "Using the body Element as a Top Level Container - Is it Safe Yet?"
date: 2013-01-05 14:21
comments: true
categories: [HTML, CSS, Browsers]
---

View source on almost any web page and you'll likely see the following:

``` html Common HTML Template
<html>
    <head></head>
    <body>
        <div id="wrapper">
            <!-- All the things -->
        </div>
    </body>
</html>
```

The use of a wrapper or container `div` around the page is fairly universal.  It is commonly used to perform tasks such as centering a page's content or providing a shadow or border to frame it.  But, since the `body` element is a necessity in the markup, why can't it be styled directly instead?  Why is a wrapper `div` used? 

Historically there have been a number of issues with using the `body` element as a top level container in old versions of Internet Explorers.  If you're supporting IE >= 8 you're good, but there are some things [you should be aware of](#now).

<!--more-->

### IE 5.5

To get to the origins of the wrapper `div` let's go way back.  A pretty common practice is to center the top level container using `margin: 0 auto`, and this works fine in all browsers... back to IE 5.5.  IE 5.5 did not support `auto` margins so this approach did not work.

To center the top level container in IE 5.5 you had to make use of `text-align: center` as such:

``` css Centering the top level container in IE 5.5
body {
    text-align: center;
}
#wrapper {
    width: 1000px;
    text-align: left; /* counteract the declaration on body */
}
```

`text-align: center` *should* only affect inline elements, but IE 5.5 incorrectly applied it to block elements as well.  (Note: The `text-align: center` bug was fixed in IE6 standards mode, but the behavior remained in Internet Explorer's quirks mode to this day.)

### IE6

IE6 implemented `auto` margins, so `margin: 0 auto` was now safe to use on the `body`.  Additionally, IE6 fully supports adding a `width`, `padding`, `margin`, and `border` to the body element.  Take the following CSS:

``` css
body{
    width: 90%;
    border: 2px solid red;
    background-color: black;
    color: white;
    padding: 10px;
    margin: 0 auto;
}
```

The layout renders the same in IE6 as it does in the latest version of Chrome (23 as of this writing).

<div style="overflow: hidden;">
	<div style="float: left; width: 49%;">
		<h4>IE6</h4>
		<img title="Styling the body element in IE6" src="/images/posts/2013-01-05/IE6.png">
	</div>
	<div style="float: right; width: 49%;">
		<h4>Chrome</h4>
		<img title="Styling the body element in Chrome" src="/images/posts/2013-01-05/Chrome.png">
	</div>
</div>

Believe it or not using the `body` element as a top level container is actually safe in IE6.

<a name="zoom"></a>
### IE7

If there are no issues with IE6 why am I still writing?  IE7 introduced a feature new to Internet Explorer, zoom, and with it came a new bug.

When a `margin` or `width` is applied to the `body` and the user zooms, IE7 incorrectly treats the left edge of the `body` as the edge of the viewport.  This shift bumps content on the right hand side of the page outside of the screen.  The image below shows the result of a zoomed in window and styled `body` in IE7.

<img src="/images/posts/2013-01-05/IE7Zoom.png" title="Zooming in IE7" style="max-height: 400px;">

This issue is not present using a wrapper `div`.

### Beyond IE7

In my testing beyond IE7 there are no major issues using the `body` element as a top level container.  There are however a few things to be aware of.

<a name="now"></a>
### Positioning

Any absolutely positioned elements will be positioned relative to the viewport rather than the newly placed `body`.  To fix this set `position: relative` on the `body` as such:

``` css Positioning elements relative to the body rather than the viewport
body {
    margin: 0 auto;
    width: 90%;
    position: relative;
}
```

### Backgrounds

Backgrounds applied to the `body` will take up whole page regardless of margins.  Consider the following:

``` css
body {
    background: black;
    margin: 0 auto;
    width: 200px;
}
```

The screenshot below shows this.  The background of the entire viewport is black rather than a centered 200px block.  

<img src="/images/posts/2013-01-05/background-before.png" title="background on a body element" style="max-height: 300px;">

This can be worked around by applying a `background` on the `html` element:

``` css
html {
    background: white;
    height: 100%;
}
body {
    background: black;
    margin: 0 auto;
    width: 200px;
    min-height: 100%;
}
```

Note the `height` that was added to the `html` element and the `min-height` added to the `body`.  This ensures that the `background` applied to the `body` element will take up the entire height of the screen.

The rules above will now render as expected:

<img src="/images/posts/2013-01-05/background-after.png" title="background on a body element with background on html element" style="max-height: 300px;">

### scrollHeight and scrollWidth

In WebKit based browsers the `body`'s [scrollHeight](https://developer.mozilla.org/en-US/docs/DOM/element.scrollHeight) and [scrollWidth](https://developer.mozilla.org/en-US/docs/DOM/element.scrollWidth) properties are unaffected by declared `height` and `width` styles.  For example:

``` html scrollHeight and scrollWidth on the body element
<html>
    <head></head>
    <body style="height: 200px; width: 200px;">
        <script>
        	console.log(document.body.scrollHeight);
        	console.log(document.body.scrollWidth);
        </script>
    </body>
</html>
```

This will log `200` for both in all modern browsers with the exception of WebKit based ones.  WebKit will return the height and width of the viewport.

While you are unlikely to run into this directly, you may use a library that does.  For example, this [causes an issue](http://bugs.jqueryui.com/ticket/8940) trying to constrain [jQuery UI draggables](http://jqueryui.com/draggable/) within the `body`.

### Is it Safe to Use Yet?

The [zoom issue in IE7](#zoom) is bad, but if you're no longer supporting IE7 it's safe to drop the wrapper `div` and style the `body` directly.

That being said, there's no harm in leaving a wrapper `div` in place.  So if you have any doubt stick with `<div id="wrapper"></div>`.

Know of any other bugs with styling the `body` element?  Let me know in the comments.
