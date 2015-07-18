---
layout: post
title: "Shorthand for Preventing Default Event Actions with jQuery"
comments: true
---

The common way of preventing the default action of an event is to call [preventDefault](http://api.jquery.com/event.preventDefault/) on its [Event Object](http://api.jquery.com/category/event-object/):

<pre class="language-markup"><code class="language-markup">&lt;a href="http://google.com">Google&lt;/a&gt;
&lt;script&gt;
    // Prevent the default action (navigating to google.com)
    $( "a" ).on( "click", function( event ) {
        event.preventDefault();
    });
&lt;/script&gt;
</code></pre>

...which works just fine.  But if all you need to do is prevent the default action, `jQuery.fn.on` provides a handy shorthand.  Per [its docs](http://api.jquery.com/on/#on-events-selector-data-handlereventObject):

> “The value `false` is also allowed as a shorthand for a function that simply does `return false`.”

<!--more-->

Therefore, the same example could be written as follows:

<pre class="language-markup"><code class="language-markup">&lt;a href="http://google.com">Google&lt;/a&gt;
&lt;script&gt;
    $( "a" ).on( "click", false );
&lt;/script&gt;
</code></pre>

The same approach will also work using delegated events:

<pre class="language-markup"><code class="language-markup">&lt;nav&gt;
    &lt;a href="http://google.com"&gt;Google&lt;/a&gt;
    &lt;a href="http://twitter.com"&gt;Twitter&lt;/a&gt;
    &lt;a href="http://facebook.com"&gt;Facebook&lt;/a&gt;
&lt;/nav&gt;
&lt;script&gt;
    $( "nav" ).on( "click", "a", false );
&lt;/script&gt;
</code></pre>


As noted in the comments, using the `false` shorthand is the equivalent of `event.preventDefault(); event.stopPropagation();`.  Therefore when using the shorthand, the event will not bubble to parent elements (which may or may not be what you want to happen).  The following example illustrates this:

<pre class="language-markup"><code class="language-markup">&lt;div id="container-1"&gt;
    &lt;a id="a-1" href="http://google.com"&gt;Google&lt;/a&gt;
&lt;/div&gt;
&lt;div id="container-2"&gt;
    &lt;a id="a-2" href="http://google.com"&gt;Google&lt;/a&gt;
&lt;/div&gt;
&lt;script&gt;
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
&lt;/script&gt;
</code></pre>
