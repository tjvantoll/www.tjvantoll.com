---
layout: post
title: "DOM Element References as Global Variables"
date: 2012-07-19 22:33
comments: true
categories: [JavaScript, Browsers]
---

Quiz: What is logged when the following markup is rendered?

<pre class="language-markup"><code>
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;button id="bar"&gt;Button&lt;/button&gt;
        &lt;script&gt;
            console.log(bar);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

[ReferenceError](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/ReferenceError) obviously, right?  Wrong.  All major browser rendering engines will log a reference to the `<button>` node.  This includes Trident (IE), Gecko (Firefox), WebKit (Chrome, Safari, etc), and Presto (Opera).

### Wait.  What?

Ah, I get it, there's no doctype on that markup.  So this a quirks mode only thing then right?  Wrong.  [As of Firefox 14](https://bugzilla.mozilla.org/show_bug.cgi?id=622491) the latest version of all major browsers will produce the same result IN STANDARDS MODE.

<pre class="language-markup"><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;button id="bar"&gt;Button&lt;/button&gt;
        &lt;script&gt;
            console.log(bar); //Reference to &lt;button&gt;, even in standards mode
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

<!--more-->

### So What's Going On?

Believe it or not this is actually correct behavior per the HTML specification.

{% blockquote HTML Specification http://www.whatwg.org/specs/web-apps/current-work/#named-access-on-the-window-object %}
6.2.4 Named access on the Window object

The Window interface supports named properties. The supported property names at any moment consist of:

> the value of the name content attribute for all a, applet, area, embed, form, frame, frameset, iframe, img, and object elements in the active document that have a name content attribute, and
> the value of the id content attribute of any HTML element in the active document with an id content attribute.
{% endblockquote %}

What this is saying is that the value of the `name` attribute of certain elements and the value of the `id` attribute of ALL elements are accessible via the `window` object in the browser.  So, if you have a node `<button id="foo"></button>`, then `window.foo` will be resolved to a reference to the `<button>`.  From this point forward I will refer to this behavior as named access.

### How is This Standard Behavior?

This behavior is an old Internet Explorer *feature*.  I can only imagine that it was intended to be a convenience for web developers that got sick of typing `document.getElementById` over and over again.  (this is way before jQuery and other popular toolkits came to be).  Regardless of the reasoning, IE shipped with this functionality and a whole lot of people utilized it.

Other rendering engines were faced with the difficult decision of implementing non-standard behavior or remaining incompatible with a slew of websites written specifically for Internet Explorer.  

Gecko implemented this functionality but originally turned it on only in quirks mode.  They recently took the extra step and [turned named access on in standards mode with Firefox 14](https://bugzilla.mozilla.org/show_bug.cgi?id=622491).

Webkit and Presto have had named access in standards mode for some time now.  [Webkit recently considered relegating this behavior to quirks mode](https://www.w3.org/Bugs/Public/show_bug.cgi?id=11960), however, they decided on leaving it enabled in standards mode.  Apparently there is still just too much stuff out there relying on this behavior to remove it in standards mode.  Believe it or not Microsoft even [shipped a marketing demo](https://bugzilla.mozilla.org/show_bug.cgi?id=737760) that directly referenced named DOM elements, preventing it from functioning in Gecko.

One of the main aims of the HTML5 specification is to standardize browser behavior, however quirky it might be.  Therefore, this functionality made it into the specification.

### Why is This Behavior Bad?

I've alluded to the fact that this behavior is bad, but I've haven't gotten into details as to why.

#### There is a high potential for bugs to be introduced into the system

Let's say you have some code that looks something like this:

<pre class="language-markup"><code>
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;input type="text" id="choice"&gt;&lt;/button&gt;
        &lt;script&gt;
            var choice = 'foo';
            //Lots more JavaScript
            doSomethingVeryComplicated(choice);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

Since a global `choice` variable is being created, `window.choice` will resolve to the string `foo` and not a reference to the `<input>`.  This is because the `<input>` reference is being [shadowed](http://en.wikipedia.org/wiki/Variable_shadowing) by the variable declaration.  This works the same way as a variable with the same name being declared in a nested function.

<pre class="language-javascript"><code>
(function() {
    var x = 2;
    var y = function() {
        var x = 3;
        //Logs 3 instead of 2 because the value defined in the outer
        //function is shadowed by the x defined in the inner function.
        console.log(x);
    };
    y();
}());
</code></pre>

This is all well and good.  However, let's say that during a refactor of this code the `var choice = 'foo';` line is accidentally removed.  Under normal circumstances this would cause a ReferenceError because `window.choice` would now be undefined.  However, because there is a DOM node with an `id` of `choice`, that reference will now refer to the DOM node instead.  This can easily lead to unexpected behavior.

The flip side of this situation is also true.  If you have an element `<div id="bar"></div>` and use `window.bar` to refer to it, that code will break if you create JavaScript variable using `var` in the same scope (i.e. `var bar = 2;`).

#### Mistyping

Say you mistype the name of your variable and happen to type a named DOM element.  SURPRISE!

#### Non-trivial cost for the browser to implement

In order for these named elements to be available, the browser has to create a list of all named elements and maintain it as the page changes.  I can't offer any specific metrics as to how much time and memory this takes, but there is a cost, especially on pages with a large number of named elements.

#### Named elements will be shadowed by properties natively defined on `window`.

If you *were* to go the route of using named access you'd have to be careful to avoid using named elements with values that are predefined on the `window` already.

For example you cannot refer to a `<input id="location">` by `window.location` because that [already resolves to an object](https://developer.mozilla.org/en/DOM/window.location) with information about the URL of the current document.

There are a number of other property names on the `window` object that you could easily see being used to name a DOM element - `event`, `history`, `name`, `self`, `status`, and `toolbar` to name a few.

#### Browsers have inconsistent implementations.

Even though this is behavior is now standardized, there are still browser quirks in the way named access is implemented.  

##### IE and Form Elements

IE will (incorrectly) make the `name` attribute of form elements available on the `window` object.

<pre class="language-markup"><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;input name="foo" /&gt;
        &lt;script&gt;
            //Logs a reference to the &lt;input&gt; in IE.
            //ReferenceError in all other rendering engines.
            console.log(foo);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

> **Update**: Microsoft's Edge browser no longer exhibits this behavior. Also, this behavior is not present when the `<input>` resides within a `<form>` element.

##### Name Attribute on Anchor Tags

Per the spec, `<a>` tags should be accessible on the `window` object via the value of their `name` attribute.  However, this only works in IE and Opera.

<pre class="language-markup"><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;a name="foo"&gt;&lt;/a&gt;
        &lt;script&gt;
            //Logs a reference to the &lt;a&gt; in IE and Opera.
            //ReferenceError in Gecko and WebKit.
            console.log(foo);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

##### Multiple Named Attributes with the Same Value

Per this portion of the spec:

{% blockquote HTML Specification http://dev.w3.org/html5/spec/single-page.html#dom-window-nameditem %}
...if elements has only one element, return that element and abort these steps.

Otherwise return an HTMLCollection rooted at the Document node, whose filter matches only named elements with the name name.
{% endblockquote %}

What this is staying is that when there are multiple named properties with the same name, the browser should return an array when that property is referenced (instead of a reference to a specific DOM node).  As an example given this markup:

<pre class="language-markup"><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;&lt;/head&gt;
    &lt;body&gt;
        &lt;input id="one"&gt;
        &lt;input id="one"&gt;
        &lt;script&gt;
            console.log(one);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

...an array with references to the two `<input>` nodes should be logged per the spec.  And it will be in all browsers except Firefox.  Firefox 14 will simply log the first element.

Having two elements with the same `id` is invalid HTML, but the browser will still render it just fine.  Even with the best of intentions these sorts of things do happen, especially in larger, dynamic applications.

### More?

These are simply the bugs that I've ran into, I'm sure there are more.  If you know of any let me know in the comments and I can update this list.

### But won't strict mode prevent this?

[ECMAScript 5 strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode) prevents you assigning values to variables before they are declared.  Therefore this...

<pre class="language-javascript"><code>
(function() {
    foo = 2; 
}());
</code></pre>

will execute just fine whereas this...

<pre class="language-javascript"><code>
(function() {
    'use strict';
    foo = 2; 
}());
</code></pre>

...will produce a ReferenceError that `foo` is not defined.  This is great, but it will not stop you from accessing named properties on the `window` object.

<pre class="language-markup"><code>
&lt;div id="foo"&gt;&lt;/div&gt;
&lt;script&gt;
    (function() {
        'use strict';
        console.log(foo);
    });
&lt;/script&gt;
</code></pre>

This will log a reference to the `<div>` in standards mode in the latest version of all modern browsers.  Strict mode will only prevent you from assigning values to variables that have yet to be declared.  If you're simply using a variable then strict mode doesn't protect you.  Therefore, you're not prevented from accessing name properties on the global `window` object.

### What to do instead

Use `document.getElementById` to retrieve references to DOM nodes via their `id` attribute.

<pre class="language-markup"><code>
&lt;button id="foo"&gt;&lt;/button&gt;

&lt;script&gt;
    document.getElementById('foo');
&lt;/script&gt;
</code></pre>

To get a reference to a DOM node via its `name` attribute you can use `document.getElementsByName` or `document.querySelectorAll`.

<pre class="language-markup"><code>
&lt;a name="bar"&gt;&lt;/a&gt;

&lt;script&gt;
    document.getElementsByName('bar');
    document.querySelectorAll('[name=bar]');
&lt;/script&gt;
</code></pre>

`document.querySelectorAll` is not safe to use in IE <= 8, but `document.getElementsByName` is safe to use in all browsers.

### Conclusion

All major browsers now make named properties available on the global `window` object in standards mode.  It's important to know that browsers do this because you'll likely run into this at some point.  However, never purposely utilize this functionality.  If you see others use it tell them to stop, ridicule them, do whatever it takes.  Help [move the web forward](http://movethewebforward.org/).

### Update September 24th, 2012

Per comments from Rob W I've updated the following:

* I had incorrectly used "Syntax error" to describe the situation when an undeclared variable is referenced.  I updated those to correctly use "ReferenceError".
* I updated my last example to show that `document.getElementsByName` is a cross browser way of getting reference to DOM nodes by their name attribute.

### References

* [Spanish translation of this article by Maria Ramos](http://www.webhostinghub.com/support/es/misc/dom-element)