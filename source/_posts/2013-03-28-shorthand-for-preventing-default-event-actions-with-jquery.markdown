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
