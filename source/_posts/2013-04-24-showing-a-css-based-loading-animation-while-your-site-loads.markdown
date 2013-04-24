---
layout: post
title: "Showing a CSS Based Loading Animation While Your Site Loads"
date: 2013-04-24
comments: true
categories: [CSS]
---

Showing a loading indicator on startup is a common pattern in native applications that is becoming more common on the web.  If you need to load a lot of resources when your web application is first loaded, you should give the user a clear indication that this is occurring.

<!-- more -->

Here's an approach I've used a few times to accomplish this.  I start by giving the `<html>` element itself a class of `"loading"`:

``` html
<html class="loading">
    <!-- All the things -->
</html>
```

I then setup two transitions that take effect when the loading class is removed.  I transition the color on the `<html>` element from a predefined color to its default, `transparent`.  To avoid seeing content during loading, I make the `<body>` opaque with `opacity: 0`.  When loading is complete, that is transitioned to `opacity: 1` to fade the content in.  The full source is below:

``` css
html {
    -webkit-transition: background-color 1s;
    transition: background-color 1s;
}
html, body {
    /* For the loading indicator to be vertically centered ensure */
    /* the html and body elements take up the full viewport */
    min-height: 100%;
}
html.loading {
    /* Replace #333 with the background-color of your choice */
    /* Replace loading.gif with the loading image of your choice */
    background: #333 url('loading.gif') no-repeat 50% 50%;

    /* Ensures that the transition only runs in one direction */
    -webkit-transition: background-color 0;
    transition: background-color 0;
}
body {
    -webkit-transition: opacity 1s ease-in;
    transition: opacity 1s ease-in;
}
html.loading body {
    /* Make the contents of the body opaque during loading */
    opacity: 0;

    /* Ensures that the transition only runs in one direction */
    -webkit-transition: opacity 0;
    transition: opacity 0;
}
```

The only JavaScript required is to remove the `"loading"` class from the `<html>` element.  Do this when your application is initialized and ready to go.

``` javascript
// IE10+
document.getElementsByTagName( "html" )[0].classList.remove( "loading" );

// All browsers
document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );

// Or with jQuery
$( "html" ).removeClass( "loading" );
```

The demo below shows this animation in action.  To simulate a real load it waits 3 seconds before the `"loading"` class is removed.

{% demo /demos/2013-04-24/loading.html Loading_Example 275 %}

This will work in [any browser that supports CSS transitions](http://caniuse.com/#feat=css-transitions), which nowadays is really everything other than IE <= 9.  It also degrades gracefully for older browsers.  Unsupported browsers will still see the loading animation, they will simply lose the fade in transition when loading is complete.
