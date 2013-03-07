---
layout: post
title: "Using jQuery UI Tabs with the &lt;base&gt; Tag"
date: 2013-02-17 21:14
comments: true
categories: [jQuery UI, HTML]
---

As there have been [numerous bug submissions](http://bugs.jqueryui.com/ticket/7822) for this, I feel the need to explain how to properly use [jQuery UI's tab widget](http://jqueryui.com/tabs) with a `<base>` tag.  Let's start with what the `<base>` tag is intended for.

### The &lt;base&gt; Element

[Per MDN](https://developer.mozilla.org/en-US/docs/HTML/Element/base) the `<base>` element specifies the base URL to use for all relative URLs contained within a document.

<!--more-->

Consider the following example:

``` html
<base href="http://foo.com">
<a href="bar.html">Bar</a>
```

Let's assume this HTML appears on this domain (`http://tjvantoll.com`).  When the link is clicked on, the browser will navigate to `http://foo.com/bar.html` rather than `http://tjvantoll.com/bar.html`.

It's important to note that hash links are also relative to the specified base.  Therefore on the following:

``` html
<base href="http://foo.com">
<a href="#bar">Bar</a>
```

When the link is click on, the browser will navigate to `http://foo.com#bar` and NOT `http://tjvantoll.com#bar`.  This detail is important; it's the root cause of confusion when using a `<base>` tag with the tabs widget.

### jQuery UI Tabs

Here is the intended HTML structure to be used by the tabs widget:

``` html
<div id="tabs">
    <ul>
        <li><a href="#tab-1">One</a></li>
        <li><a href="#tab-2">Two</a></li>
    </ul>
    <div id="tab-1">Contents of tab one.</div>
    <div id="tab-2">Contents of tab two.</div>
</div>

<script>$( "#tabs" ).tabs();</script>
```

Which produces the following:

<img src="/images/posts/2013-02-17/tabs.png" alt="Default look of jQuery UI's tabs">

In this example both links begin with a hash (`#`), indicating that their content is located on the current page.  If that is not the case, the tabs widget will retrieve the tab's contents server side via an XHR call.  Consider the following:

``` html
<div id="tabs">
    <ul>
        <li><a href="#local">Local</a></li>
        <li><a href="external">External</a></li>
    </ul>
    <div id="local">Contents of the local tab.</div>
</div>

<script>$( "#tabs" ).tabs();</script>
```

Here the local link will work as in the previous example - when it is clicked on, the tabs widget will simply display the contents of the `#local` container.

However, when the external link is clicked, the tabs widget will perform an XHR request to retrieve the contents.  Assuming this HTML is located on `http://tjvantoll.com`, an XHR GET will be performed for `http://tjvantoll.com/external`.  The contents returned are dynamically added to the DOM and displayed.

The markup pattern used here is no accident.  Consider a user that views this HTML without JavaScript enabled.  The local link will move the user's focus to the `#local` container on `http://tjvantoll.com`.  The external link will do a full page navigation to `http://tjvantoll.com/external`.  The markup is designed to enhance the default browser behavior and to degrade gracefully when JavaScript isn't present.

### &lt;base&gt; + tabs

Given the descriptions above, the behavior of the `<base>` tag with the tabs widget shouldn't be surprising.  Here's the first example given for the tabs widget again.  This time, a `<base>` tag to `http://foo.com` has been added:

``` html
<base href="http://foo.com">

<div id="tabs">
    <ul>
        <li><a href="#tab-1">One</a></li>
        <li><a href="#tab-2">Two</a></li>
    </ul>
    <div id="tab-1">Contents of tab one.</div>
    <div id="tab-2">Contents of tab two.</div>
</div>

<script>$( "#tabs" ).tabs();</script>
```

Let's again assume this HTML is located on `http://tjvantoll.com`.  Because of the `<base>` tag, the links used in the tabs widget are actually external links to `http://foo.com`.  Therefore, upon instantiation, the tabs widget will attempt to load the contents of the first tab from `http://foo.com`.

If you are having trouble understanding, try the example above with JavaScript disabled.  When the first link is clicked on, the browser will navigate to `http://foo.com` regardless of the domain the page is viewed on.

### Fixes

From the numerous bug reports, it seems that a lot of people have applications with `<base>` tags and want hashed links to be relative to the current page.  How can you fix your application?

1) **Remove the `<base>` tag.**  It's that simple.  After the removal, the tabs widget will never attempt to load external content from any links with leading hashes.  Of course, this approach requires changing any other links on the page that are dependent on the `<base>` tag's leading path.

2) **Provide full URLs on links used to build the tabs widget.**  If approach #1 isn't feasible, you can also provide a fully qualified URL in the links used to build the tabs widget.  Here's the earlier example modified to show this approach:

``` html
<base href="http://foo.com">

<div id="tabs">
    <ul>
        <li><a href="http://tjvantoll.com#tab-1">One</a></li>
        <li><a href="http://tjvantoll.com#tab-2">Two</a></li>
    </ul>
    <div id="tab-1">Contents of tab one.</div>
    <div id="tab-2">Contents of tab two.</div>
</div>

<script>$( "#tabs" ).tabs();</script>
```

Since the links in the tabs are now fully qualified paths to the current page, the tabs widget will not perform a request to retrieve external content.

A more robust way of handling this would be to inject the current path server side.  For example the following PHP could be used to inject the link used in the first tab above:

`'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . '#tab-1'`

3) **Add the full URLs via JavaScript.**

<div class="warning" style="display: block;">
	This is not the right way to fix this problem.  I'm only providing this because I realize the realities of working on enormous projects or projects where you do not have full control over the HTML.
</div>

This is the same approach as #2, but the appropriate links are changed in JavaScript instead of forcing you to fix every link manually.

The hack is shown below, simply call the `makeTabs` function with the selector used to create the tabs widget:

``` javascript
var makeTabs = function(selector) {
    $( selector )
        .find( "ul a" ).each( function() {
            var href = $( this ).attr( "href" ),
                newHref = window.location.protocol + '//' + window.location.hostname + 
                    window.location.pathname + href;

            if ( href.indexOf( "#" ) == 0 ) {
                $( this ).attr( "href", newHref );
            }
        })
    $( selector ).tabs();
};

makeTabs( "#tabs" );
```

As noted by the warning box, you should really fix this the right way.  But desperate times call for desperate measures.  You've been warned.

### The End

Hopefully if you didn't understand how to use the `<base>` tag and jQuery UI's tab widget together you do now.  If you are still having issues after reading through this please let me know in the comments.

### Update (March 6th, 2013)

Per comments from rubensa, I've removed `window.location.origin` from my JavaScript workaround since it's a WebKit only property.  He also pointed out that if you might need to explicitly include a port number in the URL if you're using it in your local development.
