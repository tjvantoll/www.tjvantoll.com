---
layout: post
title: "Why Is Styling Form Elements So Damn Hard?"
date: 2013-12-06 12:54
comments: true
categories: [HTML, CSS]
---

The web has come a long way. We can now build powerful 3D animations, design sites that work on a vast array of screen sizes, and even [play high end games](https://brendaneich.com/2013/03/the-web-is-the-game-platform/) - all without leaving our browser.

Despite this, developers still cannot change the background color of an `<option>` or the size of a checkbox. Why is this?

Basically, it comes down to the fact that the HTML specification dictates how form controls should *function*, and not how they should look. Therefore UAs (User Agents, aka browsers) are free to come up with a UI they feel best performs the functionality. And as such, there are vast differences in the UIs used.

Giving browsers control over the display of form controls has had an enormous impact on the development of the web - good and bad. Let's discuss the good first.

<!--more-->

### Why Letting Browser Control Form Elements is Awesome

To start our discussion, consider this simple `<select>` element.

<pre class="language-markup"><code>&lt;select&gt;
    &lt;option&gt;One&lt;/option&gt;
    &lt;option&gt;Two&lt;/option&gt;
    &lt;option&gt;Three&lt;/option&gt;
&lt;/select&gt;
</code></pre>

Here's a sampling of a few different renderings. The two on the left are Chrome and Firefox for OS X, the two on the right are IE and Chrome for Windows.

<img src="/images/posts/2013-12-06/selects.png" alt="View of selects on multiple platforms">

While there are slightly different approaches here, these controls look relatively the same. However, the story is completely different when you consider mobile devices. The image below shows the `<select>` rendering on some common mobile OSs (Android on the left, iOS on the right).

<img src="/images/posts/2013-12-06/selects-mobile.png" alt="View of selects on multiple platforms">

Because mobile browsers are not locked down to specific displays, they are free to present `<select>` menus in a way that best fits the device they're running on. This is the single greatest advantage of giving browsers complete control over the look of form controls. Just think of how horrible an experience working with desktop sized `<select>` menus would be on a mobile device.

Furthermore, browsers can present users with familiar OS controls. As an example, iOS uses the same datepicker for `<input type="date">` as it does for its calendar app. This familiarity helps users complete forms quicker.

While these truly custom UIs are great for mobile users, they present a major issue for developers.

### Why Letting Browser Control Form Elements is Horrible

Because we now have a multitude of ways form controls are displayed, it is literally impossible to control the look, feel, and positioning of these controls across platforms. If you consider all the `<select>` renderings shown above, what would applying a `padding` or `margin` to an `<option>` element even mean?

This is a problem, because making slight alterations to form controls is a common request web developers have. As such, the question of how to address this has been going around the [WHATWG mailing list](http://www.whatwg.org/mailing-list#specs) and [W3C mailing list](http://lists.w3.org/) recently.

There are a number of ideas being thrown out there, so I thought I'd summarize a few of them.

### Pseudo Elements

A number of browsers now offer styling hooks through vendor prefixed pseudo elements. (I created a [full list](/2013/12/06/why-is-styling-form-elements-so-damn-hard/) if you'd like to peruse them). For instance `::-ms-check` lets you play with the look of checkboxes and radio buttons in IE.

<pre class="language-markup"><code>&lt;style&gt;
    ::-ms-check {
        color: red;
        background: black;
        padding: 1em;
    }
&lt;/style&gt;
&lt;input type="checkbox"&gt;
&lt;input type="radio"&gt;
</code></pre>

Which renders as follows.

<img src="/images/posts/2013-04-15/trident-radio-checkbox.png" alt="Display of altered checkboxes in IE">

For the specification, the idea is that we could standardize all of the common styling points. So `::check` would be able to style checkboxes and radio buttons on all platforms, not just IE. And since the shadow DOM spec includes a [mechanism for exposing custom pseudo-elements](http://www.w3.org/TR/shadow-dom/#custom-pseudo-elements), this seems like a perfect solution.

While this sounds great, there are two fundamental problems.

**1)** Because of mobile, there is almost nothing in common with the look of *any* form control across all platforms. For instance, a common request of developers is the ability to customize the calendar presented by `<input type="date">`, however consider the display of the calendar on just the three platforms shown below.

<img src="/images/posts/2013-12-06/calendars.png" alt="Display of date input on Chrome, iOS, and Chrome for Android">

Even if you wanted to standardize something, what would it be?

**2)** By standardizing pseudo elements you limit the flexibility currently afforded to browsers to innovate. IE's `::-ms-check` pseudo-element is actually a perfect example of this. If `::check` were indeed standardized, it would prevent browsers from using a completely different representation of a checkbox, such as an iOS style switch (unless they violated the spec).

Therefore while this solution seems appealing, it doesn't appear to be a complete solution to styling form controls on the web.

### Using Shadow DOM

The [shadow DOM](http://www.w3.org/TR/shadow-dom/) specification has made another - more drastic - solution possible. Since browsers internally implement form elements through shadow DOM, you have the ability to inject your own shadow root to use instead of the browser's.

And as of Chrome 31, this is now something you can actually do. The following example creates a native `<input type="date">`, gives it a new shadow root to use, and implements the calendar using [jQuery UI's datepicker](http://jqueryui.com/datepicker/).

<pre class="language-markup line-numbers"><code>&lt;style&gt;
    input {
        height: 2em;
        width: 15em;
    }
&lt;/style&gt;

&lt;input type="date"&gt;

&lt;script&gt;
    var dateRoot = document.querySelector( "input" )
        .webkitCreateShadowRoot();

    $( "input" ).datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function( dateText ) {
            dateRoot.innerHTML = dateText;
        }
    });
&lt;/script&gt;</code></pre>

And here's the example live, although you need Chrome 31+ for it to actually work.

<iframe width="100%" height="300" src="http://jsfiddle.net/tj_vantoll/9v44L201/embedded/result,html,js,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

You may notice that there is one big issue with this example. While we do get a custom datepicker, we lose the `<input>` behavior, including the ability to type in a value.

Another downside is this uses the JavaScript based calendar on all platforms - even mobile ones. Therefore if you try run this example on Chrome for Android you get the jQuery UI's calendar rather than the more mobile friendly calendar most developers want.

### Moving Forward

How do we move forward and make form controls on the web styleable?

Standardizing pseudo elements seems attractive because they're easy to use. Who wants to create a new shadow root for an element just to change a few colors? The large number of platform differences makes challenging, but it may be possible for simple elements.

Using shadow roots has potential. While it's a bit of work, the really hard stuff could be abstracted into libraries. The problem is currently we have no good way of inheriting the basic functionality of an `<input>`, and reinventing the wheel in an accessible way is challenging.

As developers we want some magical solution where we can make style the desktop based controls and somehow leave mobile ones alone. And unfortunately this is a very hard problem to solve.
