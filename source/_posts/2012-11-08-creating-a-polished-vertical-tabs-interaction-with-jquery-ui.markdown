---
layout: post
title: "Creating a Polished Vertical Tabs Interaction with jQuery UI"
date: 2012-11-08
comments: true
categories: [jQuery UI, CSS]
---

The [jQuery UI tabs widget](http://jqueryui.com/tabs/) provides a clean way to implement a tabular UI.  Furthermore, the markup used gives you ample hooks to make the tabs visually into what you want them to be.  The docs provide a [simple demo](http://jqueryui.com/tabs/#vertical) of how you can give the tabs a vertical orientation, but I thought I'd show how you can use what the framework provides to create something a bit more polished.

<!--more-->

The following CSS will vertically arrange the tabs:

``` css
.ui-tabs.ui-tabs-vertical {
    padding: 0;
    width: 42em;
}
.ui-tabs.ui-tabs-vertical .ui-widget-header {
    border: none;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav {
    float: left;
    width: 10em;
    background: #CCC;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid gray;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav li {
    clear: left;
    width: 100%;
    margin: 0.2em 0;
    border: 1px solid gray;
    border-width: 1px 0 1px 1px;
    border-radius: 4px 0 0 4px;
    overflow: hidden;
    position: relative;
    right: -2px;
    z-index: 2;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav li a {
    display: block;
    width: 100%;
    padding: 0.6em 1em;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav li a:hover {
    cursor: pointer;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav li.ui-tabs-active {
    margin-bottom: 0.2em;
    padding-bottom: 0;
    border-right: 1px solid white;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-nav li:last-child {
    margin-bottom: 10px;
}
.ui-tabs.ui-tabs-vertical .ui-tabs-panel {
    float: left;
    width: 28em;
    border-left: 1px solid gray;
    border-radius: 0;
    position: relative;
    left: -1px;
}
```

It only relies on a class of `ui-tabs-vertical` being applied to the elements the `tabs` widget is created on.

``` javascript
$('tabs').tabs().addClass('ui-tabs-vertical');
```

And here's the result:

<div class="code_example">
	<h6>
		Demo - jQuery UI Vertical Tabs
		<a href="/demos/2012-11-08/verticalTabs.html" target="_blank">Open in New Window</a>
	</h6>
	<iframe style="width: 100%; height: 265px;" frameborder="0" src="/demos/2012-11-08/verticalTabs.html"></iframe>
</div>

Please poke around in the source to see how it was made.  Feel free to use this or modify it to your liking.