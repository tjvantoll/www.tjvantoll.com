---
layout: post
title: IE7 Attribute Selector Bugs
comments: true
categories: [Browsers, CSS]
---

The CSS attribute selector allows you to select HTML elements based on their attributes.  For example, take the following markup:

``` html Simple List
<ul>
	<li id="item1"></li>  <!-- #1 -->
	<li id="item2"></li>  <!-- #2 -->
	<li></li>             <!-- #3 -->
</ul>
```
<!--more-->

In a compliant browser, here are some selectors you can use to target these list items.

``` css Selectors to Target the List
li             /* Selects #1, #2, #3 */
li[id]         /* Selects #1, #2 */
li[id=item1]   /* Selects #1 */
li[id='item1'] /* Selects #1, single quotes are valid */
li[id="item2"] /* Selects #1, double quotes are valid too */
li[id^=item]   /* Selects #1, #2, ^ = starts with */
li[id$=1]      /* Selects #1, $ = ends with */
li[id*=item]   /* Selects #1, #2, * = contains */
```

### Enter IE7

This is all well and good in most all modern browsers.  Unfortunately IE7 is buggy when handling this selector.  For those of use that are still unlucky enough to be supporting it, I thought it would be nice to have some of these documented.

### DOM Attributes == HTML Attributes?

Some DOM attributes have different names than the HTML attributes to avoid conflicts with JavaScript reserved words.  Specifically in this case, DOM nodes have <code>htmlFor</code> and <code>className</code> attributes to avoid JavaScript reserved words <code>for</code> and <code>class</code>.

``` html htmlFor and className
<label class="foo" for="name" id="nameLabel">Name:</label>
<input type="text" name="name" id="name" />

<script>
	document.getElementById('nameLabel').for; //undefined
	document.getElementById('nameLabel').htmlFor //'name'
	document.getElementById('nameLabel').class //undefined
	document.getElementById('nameLabel').className //'foo'
</script>
```

In IE8+ (and everywhere else for that matter) the following attribute selector will select the label:

``` css Standard Attribute Selector
label[for='name']
```

In IE7 this won't work.  You'll need to use the incorrect <code>htmlFor</code> attribute:

``` css IE7 for Attribute Selector
label[htmlFor='name']
```

So if you're still supporting IE7 you'll almost certainly want to include them together:

``` css Combined Selector
label[for='name'], label[htmlFor='name']
```

Along the same lines, IE7 will incorrectly select attributes based on the className attribute:

``` css IE7 class Attribute Selector
label[className='name']
```

Fortunately IE7 also supports selecting using <code>class</code>.

``` css class Attribute Selector
label[class='name']
```

IE8 fixed both of these bugs and selecting for the attributes <code>htmlFor</code> and <code>className</code> no longer work.

### Empty Attributes

It's impossible to target empty attributes via CSS in IE7.  As an example, let's say you apply a [custom HTML5 data attribute](http://html5doctor.com/html5-custom-data-attributes/) to nodes at random throughout the DOM.  Let's say you want to select only the ones that have an empty value, for example the h3 below:

``` html Headings to Select
<h1 data-state="foo">Top Heading<h1>
<h2 data-state="bar">Sub Heading<h2>
<h3 data-state="">Another Heading<h3>
```

You would write this selector and call it a day:

``` css Empty Attribute Selector
[data-state='']
```

Except it won't work in IE7.  There is simply no way to target empty attributes via CSS in IE7.  So how can you replicate this functionality?  For better or worse JavaScript is the only client side option to handle this.

[querySelectorAll](http://caniuse.com/queryselector) isn't supported until IE8, so you need a selector engine to target these nodes.  Here's how you can do it in jQuery:

``` javascript Selecting Nodes with Empty Attribute - jQuery
$('[data-state=""]');
```

If you're using [Dojo](http://dojotoolkit.org) yet another step is necessary.  For whatever reason running…

``` javascript JavaScript Selecting Nodes with Empty Attribute - Dojo
dojo.query('[data-state=""]');
```

…returns not only the nodes with empty attributes, but also all the nodes that don't have the attribute declared at all!  Furthermore, <code>dojo.query('[data-state]')</code> incorrectly doesn't return nodes that have the attribute with an empty value.  So you need the following approach to select the nodes in IE7.

``` javascript Functioning IE7 Approach
dojo.query('*').forEach(function(element) {
    if (dojo.hasAttr(element, 'data-state') && 
      dojo.attr(element, 'data-state') == '') {
    	//Safe to finally apply your styling here.
    }
});
```

Note that when using any of the JavaScript based solutions it's recommended to leave the CSS in place.  Yes this is dual maintenance, but it avoids a potential [FOUC](http://en.wikipedia.org/wiki/FOUC).  Fortunately ALL of this nonsense is fixed in IE8.

### Descendant Selector Typos

Let's say you have the following markup.

``` html Sample HTML
<div data-state='active'>
	<p>Some text</p>
</div>
```

…and you want to apply some styling to the paragraph, maybe something like this:

``` css Descendant Selector
div[data-state='active']p {
	color: red;
}
```

Notice how there's no space between the "]" and the "p", that's a syntax error, right?  Correct… except in IE7!  IE7 will incorrectly parse this as if a space were there and change the color of the paragraph to red.

This was also fixed in IE8.

### Summary

We're actually really fortunate that the attribute selector is supported in IE7.  It's a very useful tool to have available and it can help solve a lot of real world issues.  And if you've dropped IE6 support they're finally safe to use.

While support is buggy, the attribute selector does work for the vast majority of use cases.  However, knowing to look out for these bugs can save hours of frustration.  Yet another reason for IE7 to fall off the face of the Earth.  Happy hacking.