---
layout: post
title: "Creating Cross Browser Scrollable &lt;tbody&gt;s—A CSS-Only Approach"
date: 2012-11-10 15:44
comments: true
categories: [CSS, HTML, Browsers]
---

By default the `overflow` CSS property does not apply to table group elements (`<thead>`, `<tbody>`, or `<tfoot>`).  [As of Firefox 4](https://developer.mozilla.org/en-US/docs/Firefox_4_for_developers#Miscellaneous_CSS_changes) this behavior is consistent across all browser implementations.

Therefore, if you attempt to apply a CSS `height` and `overflow: scroll` to a `<tbody>` it will have no effect in modern browsers.  You can see this for yourself [here](http://jsfiddle.net/tj_vantoll/vU494/).

But having a scrolling table body with fixed headers is a useful UI element, so how do you work around this?

<!--more-->

### The Solution

Here is my solution:

{% codepen JEKIu tjvantoll result 400 %}

### How does it work?

The first step is to set the `<tbody>` to `display: block` so an `overflow` and `height` can be applied.  From there the rows in the `<thead>` need to be set to `position: relative` and `display: block` so that they'll sit on top of the now scrollable `<tbody>`.

That's really about it.

### Unfortunate Part #1: Old Internet Explorer

When you set a `height` on a `<tbody>` Internet Explorer < 10 applies that `height` to every table cell, which is of course wonderful.

My workaround for this is to conditionally create a wrapper `<div>`.  When it's present I give it the `height` and `overflow` and remove the `height` from the `<tbody>`.

<pre class="language-markup"><code>&lt;style&gt;
    .old_ie_wrapper { height: 300px; overflow: auto; }
    .old_ie_wrapper tbody { height: auto; }
&lt;/style&gt;
&lt;!--[if lte IE 9]&gt;
&lt;div class="old_ie_wrapper"&gt;
&lt;!--&lt;![endif]--&gt;
	&lt;table&gt;
		&lt;!-- Contents of the table --&gt;
	&lt;/table&gt;
&lt;!--[if lte IE 9]&gt;
&lt;/div&gt;
&lt;!--&lt;![endif]--&gt;
</code></pre>

The headers will scroll with the table body, but the table will at least be usable.  You could also create [conditional classes on the &lt;html&gt; tag](http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/) to handle this as well.

### Unfortunate Part #2: Widths

Because the `<thead>` is relatively positioned each table cell needs an explicit `width`.

<pre class="language-css"><code>td:nth-child(1), th:nth-child(1) { width: 100px; }
td:nth-child(2), th:nth-child(2) { width: 100px; }
td:nth-child(3), th:nth-child(3) { width: 100px; }
</code></pre>

But unfortunately that is not enough.  When a scrollbar is present browsers allocate space for it, therefore, the `<tbody>` ends up having less space available than the `<thead>`.  Notice the slight misalignment this creates:

![Alignment issue with scroll bar](/images/posts/2012-11-10/Alignment-Issue.png "Alignment issue with scroll bar")

The only workaround I could come up with was to set a `min-width` on all columns except the last one.

<pre class="language-css"><code>
td:nth-child(1), th:nth-child(1) { min-width: 100px; }
td:nth-child(2), th:nth-child(2) { min-width: 100px; }
td:nth-child(3), th:nth-child(3) { width: 100px; }
</code></pre>

### The Good

Despite these issues the solution does work in all browsers back to IE6 with no JavaScript dependency.

The markup to create the table is simple and semantic.  I've seen workarounds for this issue that use `<div>`s instead of `<table>`s or multiple aligned `<table>`s and those always felt dirty to me.

The code is free to use and do whatever you want with it.  If you have any suggestions for improvements or find any issues please let me know in the comments.
