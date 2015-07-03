---
layout: post
title: "Getting Started with Kendo UI Core"
date: 2015-01-18
comments: true
categories: [Kendo UI, JavaScript]
---

I've been using [Kendo UI Core](https://github.com/telerik/kendo-ui-core) in a bunch of projects lately, so I thought I'd document the process I use to get Kendo UI Core up and running. Note that the workflow I show isn't the “right” way of doing things, just the workflow I like.

<!-- more -->

## Step 1) Download

I start by downloading Kendo UI Core from Bower, as it's my preferred package manager for web apps:

<pre class="language-shell"><code>$ bower install kendo-ui-core</code></pre>

You can alternatively [download Kendo UI Core from GitHub](https://github.com/telerik/kendo-ui-core/archive/master.zip), but Bower is my jam. (Not to be confused with [Jam](http://jamjs.org/), which—believe it or not—is actually the name of a competing JavaScript package manager. Who knew?)

## Step 2) Scaffold HTML

Next I create an index.html and paste in the following boilerplate HTML:

<pre class="language-markup line-numbers"><code>&lt;!doctype html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;My Project&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

    &lt;link rel="stylesheet" href="bower_components/kendo-ui-core/src/styles/web/kendo.common.core.css"&gt;
    &lt;link rel="stylesheet" href="bower_components/kendo-ui-core/src/styles/web/kendo.flat.css"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script src="bower_components/jquery/dist/jquery.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/kendo-ui-core/src/js/kendo.ui.core.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>

A couple things to note here. First, my HTML follows the [jQuery HTML style guide](http://contribute.jquery.org/style-guide/html/), which yes, actually is a thing.

Second, and more relevantly, I use the Kendo UI flat theme. (The import of kendo.flat.min.css file controls which theme the library uses.) Kendo UI has like 15 themes or something, but I'm a fan of the flat one. If you want to try out different themes all you have to do is switch “flat” in “kendo.flat.css” to the name of another theme. For instance changing “kendo.flat.min.css“ to “kendo.material.min.css” switches your app to Kendo UI's new material design inspired theme.

<img src="/images/posts/2015-01-18/kendo-ui-themes.png" alt="">
<i>See how the Flat theme is highlighted? That's because it's the best one.</i>

Finally, note that I'm including the *source* files for jQuery and Kendo UI—not the minified ones. I do this because it makes debugging easier, and because I'm going to tackle minification later.

This markup makes for a decent starting point for demos and quick tests. I even keep this HTML stored as a [Sublime snippet](http://sublimetext.info/docs/en/extensibility/snippets.html) for when I need to get a quick test case up and running. And this workflow works great, but for bigger projects I want a little more structure, and a structure that's ready to scale for bigger projects. Here's how I do that.

## Step 3) Package Management

I like using AMD and [RequireJS](http://requirejs.org/) to manage my app's dependencies, and luckily Kendo UI Core is intelligently broken into AMD modules. To start with AMD I download RequireJS from Bower:

<pre class="language-shell"><code>$ bower install requirejs</code></pre>

Next I create an app.js file to serve as the main JavaScript file for my app. At this point my project's folder structure looks a little something like this:

<pre class="language-shell"><code>.
├── bower_components
│   ├── jquery
│   │   └── ...
│   ├── kendo-ui-core
│   │   └── ...
│   └── requirejs
│       └── ...
├── index.html
└── js
    └── app.js
</code></pre>

With this structure in place I switch my index.html to use a single `<script>` tag:

<pre class="language-markup"><code>&lt;script src="bower_components/requirejs/require.js" data-main="js/app"&gt;&lt;/script&gt;</code></pre>

Then I paste the following code in as a starting point for app.js:

<pre class="language-javascript line-numbers"><code>require.config({
    paths: {
        "jquery": "/bower_components/jquery/dist/jquery",
        "kendo-ui-core": "/bower_components/kendo-ui-core/src/js"
    }
});

require([ "jquery", "kendo-ui-core/kendo.ui.core" ], function( $ ) {

});
</code></pre>

This gives me an entry point for my app that loads jQuery and Kendo UI Core dynamically. If my app only needs one portion of Kendo UI Core I only specify the modules I need in the `require()` call. For instance if I only want a [MaskedTextBox](http://demos.telerik.com/kendo-ui/maskedtextbox/index) I only require `"jquery"` and `"kendo-ui-core/kendo.maskedtextbox"`—i.e. `require([ "jquery", "kendo-ui-core/kendo.maskedtextbox" ])`.

Eventually I'll add the [RequireJS Optimizer](http://requirejs.org/docs/optimization.html) to my app to optimize into a single `<script>` tag for production, but that won't happen until I'm ready to deploy my project, and I wanted to focus this article on getting started. If you're interested in the optimization workflow I use, check out my article on [Using UI Libraries Without the Bloat](http://developer.telerik.com/featured/using-ui-libraries-without-the-bloat/).

For now I hope what I have here was helpful. If you have any other questions about using Kendo UI let me know in the comments.
