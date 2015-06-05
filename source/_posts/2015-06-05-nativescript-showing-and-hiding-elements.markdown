---
layout: post
title: "NativeScript Quick Tip: Showing and Hiding Elements"
date: 2015-06-05
comments: true
categories: [NativeScript]
---

NativeScript supports the `"collapsed"` and `"visible"` states of the CSS `visibility` property. This means you can hide an element by setting its `"visibility"` property to `"collapsed"` in CSS. For example you can use the following CSS to hide all buttons.

<pre class="language-css"><code>button {
    visibility: collapsed;
}</code></pre>

> **Warning**: Currently NativeScript is inconsistent with the CSS spec, as the CSS spec defines `visibility: collapse`, and NativeScript uses `visiblity: collapsed`. I have [an issue open](https://github.com/NativeScript/NativeScript/issues/285) to resolve this discrepancy.

<!-- more -->

Hiding an element in CSS works, but if you need to hide an element you almost certainly need to show it at some point. For this, NativeScript exposes a `visibility` *attribute*, which is just a light wrapper around the CSS property. For instance you could also use the following syntax to hide a button:

<pre class="language-markup line-numbers"><code>&lt;Button text="I'm hidden" visibility="collapsed" /&gt;</code></pre>

This is handy because having an attribute lets you to use [data-binding expressions](http://docs.nativescript.org/bindings#using-expressions-for-bindings) to control the value of the attribute, which is the technique I almost always use to control visibility. To give a concrete example, in the code below I use a flag in my data model, `"showDetails"`, to determine the visibility of a `<Label>`.

<pre class="language-markup"><code>&lt;Page loaded="loaded"&gt;
	&lt;StackLayout&gt;
		&lt;Button text="{% raw %}{{ showDetails ? 'Hide' : 'Show' }}{% endraw %}" tap="toggle" /&gt;
		&lt;Label text="Lorem ipsum..." visibility="{% raw %}{{ showDetails ? 'visible' : 'collapsed' }}{% endraw %}" /&gt;
	&lt;/StackLayout&gt;
&lt;/Page&gt;</code></pre>

<pre class="language-javascript"><code>var observable = require("data/observable");
var pageData = new observable.Observable();

exports.loaded = function(args) {
	pageData.set("showDetails", true);
	args.object.bindingContext = pageData;
}

exports.toggle = function() {
	pageData.set("showDetails", !pageData.get("showDetails"));
}</code></pre>

The key here is the ternary used as part of the `<Label>`'s `visibility` attribute: `{% raw %}{{ showDetails ? 'visible' : 'collapsed' }}{% endraw %}`. When the data model's `"showDetails"` property is true NativeScript shows the label, and when the property is false NativeScript hides the label.

That's all there is to it. If you have any other techniques you use to show/hide elements let me know in the comments. If you have suggestions for a cleaner API feel free to [suggest it on GitHub](https://github.com/NativeScript/NativeScript/issues/new), or better yet, [send a PR](https://www.nativescript.org/contribute) :)