---
layout: post
title: "Shorthand for Preventing Default Event Actions with jQuery"
date: 2013-03-28 21:44
comments: true
categories: [jQuery]
---

The common way of preventing the default action of an event is to call [preventDefault](http://api.jquery.com/event.preventDefault/) on its [Event Object](http://api.jquery.com/category/event-object/):

``` html
<a href="http://google.com">Google</a>
<script>
    // Prevent the default action (navigating to google.com)
    $( "a" ).on( "click", function( event ) {
        event.preventDefault();
    });
</script>
```

...which works just fine.  But if all you need to do is prevent the default action, `jQuery.fn.on` provides a handy shorthand.  Per [its docs](http://api.jquery.com/on/#on-events-selector-data-handlereventObject):

*The value `false` is also allowed as a shorthand for a function that simply does `return false`.*

Therefore, the same example could be written as follows:

``` html
<a href="http://google.com">Google</a>
<script>
    $( "a" ).on( "click", false );
</script>
```

The same approach will also work using delegated events:

``` html
<nav>
    <a href="http://google.com">Google</a>
    <a href="http://twitter.com">Twitter</a>
    <a href="http://facebook.com">Facebook</a>
</nav>
<script>
    $( "nav" ).on( "click", "a", false );
</script>
```

### Update: April 1st, 2013

As noted in the comments, using the `false` shorthand is the equivalent of `event.preventDefault(); event.stopPropagation();`.  Therefore when using the shorthand, the event will not bubble to parent elements (which may or may not be what you want to happen).  The following example illustrates this:

``` html
<div id="container-1">
    <a id="a-1" href="http://google.com">Google</a>
</div>
<div id="container-2">
    <a id="a-2" href="http://google.com">Google</a>
</div>
<script>
    $( "#a-1" ).on( "click", function( event ) {
        event.preventDefault();
    });
    // When a#a-1 is clicked this will fire because the event's
    // propagation is not stopped.
    $( "#container-1" ).on( "click", function(){} );
    
    $( "#a-2" ).on( "click", false );
    // When a#a-2 is clicked this will not fire because the shorthand
    // stops propagation.
    $( "#container-2" ).on( "click", function(){} );
</script>
```
