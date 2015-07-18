---
layout: post
title: Styling Disabled Form Fields
comments: true
---

Form fields can be disabled by simply adding the <code>disabled</code> attribute.  

<pre class="language-markup"><code class="language-markup">&lt;input type="text" disabled /&gt;
&lt;textarea disabled&gt;&lt;/textarea&gt;
&lt;select disabled&gt;&lt;/select&gt;
</code></pre>

Disabled fields cannot be interacted with by the user; the browser will not allow the field to receive focus or be tabbed to.  For an intuitive UI it's important that disabled fields are clearly evident to the user.  Users are easily confused and frustrated when attempting to interact with fields that they are not able to.

To apply custom styling to disabled fields you can add CSS rules that target <code>input:disabled</code>, <code>select:disabled</code>, & <code>textarea:disabled</code>. (Note: IE doesn't support the [disabled pseduo class](https://developer.mozilla.org/En/CSS/%3Adisabled) until IE9, so you'll need to use <code>input[disabled]</code>, <code>select[disabled]</code>, & <code>textarea[disabled]</code> [attribute selectors](https://developer.mozilla.org/en/CSS/Attribute_selectors) if IE < 9 support is important for you.  It'll work just the same.)  

While you <i>can</i> provide custom disabled field styling, it's not generally a good idea.  All browsers come with default styling for these fields that attempt to mesh with native UI elements in the OS.  Also, users have a certain expectation for what disabled fields look like in their preferred web browser and it's best not to mess with that.

Unfortunately some browser's default styling is less than ideal.  <!--more-->To best show this I've created a [test case](http://jsfiddle.net/ygwnh/12/) with the most common form elements and recorded a rendering of the test case in a large number of browser / OS combinations.  Since some of the styles are more evident when a the element is selected and/or has a value, I included both a grouping with no <code>selected</code> or <code>value</code> attributes, and another with those set.

## Markup

Here's the markup I used for the test cases, some very basic form fields with the <code>disabled</code> attribute.

### No Value / Selected Attributes

<pre class="language-markup line-numbers"><code class="language-markup">&lt;table&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Enabled&lt;/th&gt;
            &lt;th&gt;Disabled&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="text" /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="text" disabled /&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="checkbox" /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="checkbox" disabled /&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="radio" /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="radio" disabled /&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;select&gt;&lt;/select&gt;&lt;/td&gt;
            &lt;td&gt;&lt;select disabled&gt;&lt;/select&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;textarea&gt;&lt;/textarea&gt;&lt;/td&gt;
            &lt;td&gt;&lt;textarea disabled&gt;&lt;/textarea&gt;&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

### With Value / Selected Attributes

<pre class="language-markup line-numbers"><code class="language-markup">&lt;table&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Enabled w/Value&lt;/th&gt;
            &lt;th&gt;Disabled w/Value&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="text" value="Value" /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="text" disabled value="Value"&gt;&lt;/td&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="checkbox" checked /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="checkbox" disabled checked /&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;input type="radio" checked /&gt;&lt;/td&gt;
            &lt;td&gt;&lt;input type="radio" disabled checked /&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;select&gt;&lt;option selected&gt;Value&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;
            &lt;td&gt;&lt;select disabled&gt;&lt;option selected&gt;Value&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;textarea&gt;Value&lt;/textarea&gt;&lt;/td&gt;
            &lt;td&gt;&lt;textarea disabled&gt;Value&lt;/textarea&gt;&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

## Results

You can view [all the results on one page](/images/posts/2012-03-17/All.html) or see individual ones listed below.

### Windows

- [IE6](/images/posts/2012-03-17/IE6.png "IE6")
- [IE7](/images/posts/2012-03-17/IE7.png "IE7")
- [IE8](/images/posts/2012-03-17/IE8.png "IE8")
- [IE9](/images/posts/2012-03-17/IE9.png "IE9")
- [IE10](/images/posts/2012-03-17/IE10.png "IE10")
- [Chrome 17](/images/posts/2012-03-17/Windows-Chrome-17.png "Windows - Chrome 17")
- [Safari 5.1](/images/posts/2012-03-17/Windows-Safari-5.1.png "Windows - Safari 5.1")
- [Firefox 10](/images/posts/2012-03-17/Windows-Firefox-10.png "Windows - Firefox 10")
- [Opera 11.61](/images/posts/2012-03-17/Windows-Opera-11.61.png "Windows - Opera 11.61")

### OS X

- [Chrome 17](/images/posts/2012-03-17/OSX-Chrome-17.png "OSX - Chrome 17")
- [Safari 5.1](/images/posts/2012-03-17/OSX-Safari-5.1.png "OSX - Safari 5.1")
- [Firefox 11](/images/posts/2012-03-17/OSX-Firefox-11.png "OSX - Firefox 11")
- [Opera 11.61](/images/posts/2012-03-17/OSX-Opera-11.61.png "OSX - Opera 11.61")

### Mobile

- [iOS 5](/images/posts/2012-03-17/iOS-5.png "iOS 5")
- [Android 2.3](/images/posts/2012-03-17/Android-2.3.png "Android 2.3")
- [Opera Mobile](/images/posts/2012-03-17/Opera-Mobile.png "Opera Mobile")

## Findings

In general browsers add some combination of <code>opacity</code>, a grayish <code>background-color</code>, and a grayish <code>color</code> to the element to create the disabled effect.  For the most part browsers do a pretty good job making it evident that the fields are disabled.

There are exceptions though.  One glaring issue is the display of disabled text inputs and textareas in IE < 10; when no text is present it's impossible to tell whether the field is disabled.  In Windows, all non-IE browsers simply apply a <code>background-color</code> of <code>#EBEBE4</code> to all disabled elements.  Unfortunately, IE < 10 doesn't do much of anything to designate text inputs and textareas as disabled other than change the color of the text, which, doesn't work out all that well when there's no text present.

## Normalizing IE

To normalize the display of disabled fields in IE we need to be able to target IE <= 9 with CSS.  Why?  We don't want to override the default styling whenever possible.  As mentioned earlier browsers apply different styling to attempt to match native UI elements.  If you blindly apply a background-color to all disabled elements, you'll do so in Windows, OS X, Linux, iOS, Android, etc… as well as any future devices where it might look horrible, or worse, confuse the user.

So back to selecting IE <= 9.  In my opinion the most elegant way to do this is use [IE's conditional comments](http://msdn.microsoft.com/en-us/library/ms537512.aspx) to apply classes to the HTML node.  This approach was [first proposed by Paul Irish in 2008](http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/) and is used in the [HTML5 boilerplate](http://html5boilerplate.com/).  There are many variations but in this case we only need to worry about IE <= 9.

<pre class="language-markup"><code class="language-markup">&lt;!--[if lte IE 9 ]&gt; &lt;html class="lte9"&gt; &lt;![endif]--&gt;
&lt;!--[if (gt IE 9)|!(IE)]&gt;&lt;!--&gt; &lt;html class=""&gt; &lt;!--&lt;![endif]--&gt;
</code></pre>

Then we can apply the <code>background-color</code> as such:

<pre class="language-css"><code class="language-css">.lte9 input[type='text'][disabled], .lte9 textarea[disabled] {
	background-color: #EBEBE4;
}
</code></pre>

Alternatively you could use IE's conditional comments to apply these rules directly:

<pre class="language-markup"><code class="language-markup">&lt;!--[if lte IE 9 ]&gt;
	&lt;style&gt;
		input[type='text'][disabled], textarea[disabled] {
			background-color: #EBEBE4;
		}
	&lt;/style&gt;
&lt;!--&lt;![endif]--&gt;
</code></pre>

Either of these approaches will normalize the display of disabled text inputs and textareas on Windows.

![IE Before and After](/images/posts/2012-03-17/IE-Before-and-After.png) <!-- http://jsfiddle.net/vCdcr/show/ -->

## Normalizing IE6

The above solution will not affect the display of these elements in IE6 because it does not support CSS attribute selectors.  Therefore, if you're still supporting IE6 and the display of disabled fields is important to your UI you'll need some other sort of hook on the node.  For example a class will work:

<pre class="language-markup"><code class="language-markup">&lt;!--[if IE 6 ]&gt; &lt;html class="ie6"&gt; &lt;![endif]--&gt;
&lt;!--[if (gt IE 6)|!(IE)]&gt;&lt;!--&gt; &lt;html class=""&gt; &lt;!--&lt;![endif]--&gt;

/* … */

&lt;input type="text" disabled class="disabled" /&gt;
&lt;textarea disabled class="disabled"&gt;
&lt;/textarea&gt;&lt;/html&gt;
</code></pre>

Then you can apply the following CSS:

<pre class="language-css"><code class="language-css">.ie6 input.disabled, .ie6 textarea.disabled {
	background-color: #EBEBE4;
}
</code></pre>

## Other Issues

A number of browsers including all OS X browsers except Opera, Android, and iOS do a poor job making textareas appear disabled, in some cases even when text is present.  If your UI contains disabled textareas it's probably worth adding a little bit of opacity to compensate for browsers that don't make it very apparent that you cannot interact with them.

<pre class="language-css"><code class="language-css">textarea:disabled {
	opacity: 0.5;
}
</code></pre>

The effect is subtle but can make a big difference in helping the user to recognize that the field is disabled, especially if multiple textareas are near each other.  Here's an example from Chrome 17 on OS X:

![OSX Before and After](/images/posts/2012-03-17/OSX-Before-and-After.png) <!-- http://jsfiddle.net/JpNav/1/show/ -->

## Summary

Browsers have default styling for disabled fields that is usually pretty good at visually indicating that the field cannot be interacted with.  In situations where the browser default isn't ideal, custom styling can be applied.
