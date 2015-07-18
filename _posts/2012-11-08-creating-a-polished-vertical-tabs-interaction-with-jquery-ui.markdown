---
layout: post
title: "Creating a Polished Vertical Tabs Interaction with jQuery UI"
comments: true
---

<div class="warning">I recently published an official extension that uses the technique explained below. <a href="/2014/07/04/a-jquery-ui-vertical-tabs-extension/">Learn more</a>.</div>

The [jQuery UI tabs widget](http://jqueryui.com/tabs/) provides a clean way to implement a tabular UI.  Furthermore, the markup used gives you ample hooks to make the tabs visually into what you want them to be.  The docs provide a [simple demo](http://jqueryui.com/tabs/#vertical) of how you can give the tabs a vertical orientation, but I thought I'd show how you can use what the framework provides to create something a bit more polished.

<!--more-->

The following CSS will vertically arrange the tabs:

<pre class="language-css line-numbers"><code class="language-css">.ui-tabs.ui-tabs-vertical {
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
}</code></pre>

It only relies on a class of `ui-tabs-vertical` being applied to the elements the `tabs` widget is created on.

<pre class="language-javascript"><code class="language-javascript">$('#tabs').tabs().addClass('ui-tabs-vertical');
</code></pre>

And here's the result:

{% capture demo_height %}275{% endcapture %}
{% capture demo_path %}2012-11-08/verticalTabs{% endcapture %}
{% capture demo_title %}jQuery UI vertical tabs{% endcapture %}
{% include post/demo.html %}

Feel free to use this or modify it to your liking.
