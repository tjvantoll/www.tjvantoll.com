---
layout: post
title: What the Hell Does console.error.bind(console) Do?
comments: true
---

Have you seen this line of code before?

<pre class="language-javascript"><code class="language-javascript">console.error.bind(console);
</code></pre>

I have, most recently in the [Angular 2 quick start guide](https://angular.io/docs/ts/latest/quickstart.html), but I never really took the time to figure out how this code works. I mean, I kind of knew the snippet logged errors to the console, but why would you use `console.error.bind(console)` instead of `console.error`?

I decided to take a bit of time to get to the bottom of this.

## Context

Let’s setup a small example to show how this all works. Normally you see the `console.error.bind(console)` shorthand used with asynchronous code. For example suppose you have the `someAsyncTask()` function below:

<pre class="language-javascript"><code class="language-javascript">function someAsyncTask() {
    var promise = new Promise(function(resolve, reject) {
        // Some asynchronous thing that either resolves
        // or rejects the returned Promise
    });
    return promise;
}</code></pre>

The `someAsyncTask()` function returns an [ES2015 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that may either succeed or fail, and as such, when calling the function you would use a `then()` handler to handle both scenarios.

<pre class="language-javascript"><code class="language-javascript">someAsyncTask()
    .then(
        function() { /* Handle success */ },
        function() { /* Handle failure */ }
    );</code></pre>

Now suppose when `someAsyncTask()` fails all you want to do is log the error. Maybe it’s a function you only use during development and you have no need to inform the user that something went wrong. You could achieve that with the following code:

<pre class="language-javascript"><code class="language-javascript">someAsyncTask()
    .then(
        function() { /* Handle success */ },
        function(error) {
            console.error(error);
        }
    );</code></pre>

This works, but it’s a bit verbose. Therefore, you may be tempted to pass `console.error` in directly. After all, `typeof console.error == "function"`.

<pre class="language-javascript"><code class="language-javascript">someAsyncTask()
    .then(
        function() { /* Handle success */ },
        console.error
    );</code></pre>

However, if you try this approach you’ll get an error about an illegal invocation:

![](/images/posts/2015-12-29/devtools.png)

## Changing `this`

The error occurs because the browser’s `console.error()` implementation expects its `this` value to be set to `window.console`, and in this case, because of [the way JavaScript functions work](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions), its `this` is instead set to `window`.

> Side note: Internally browsers totally _could_ make the various `console` functions work regardless of their context, but currently none of them do. There’s an [open Chromium ticket](https://code.google.com/p/chromium/issues/detail?id=167911) and a [closed WebKit one](https://bugs.webkit.org/show_bug.cgi?id=20141) requesting that feature.

So to get the behavior you want, you need to pass a reference to `console.error` with its `this` value set to `window.console`. And luckily, ES5 introduced a convenient method that solves this exact problem: [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

I’ll let [other articles give a more thorough explanation of how `bind()` works](http://codetunnel.io/javascript-partial-application-with-bind/), but succinctly, `bind()` lets you create a new function with its `this` value set to a provided value. For instance, the code below shows how to change the `this` value of a simple function from the `window` object to an object created on the fly:

<pre class="language-javascript"><code class="language-javascript">var logger = function() { console.log(this.name); }

// Logs "", as the window object has no name property
logger();

var tj = logger.bind({ name: "TJ" });

// Logs "TJ"
tj();</code></pre>

And that’s exactly how the `console.error.bind(console)` trick works. Because browser implementations require that `console.error()`’s `this` value be set to the `console` object, the call to `bind()` generates a new function that does just that.

So to return to our original example, if you use `console.error.bind(console)` instead of `console.error`, your errors get logged as expected:

<pre class="language-javascript"><code class="language-javascript">someAsyncTask()
    .then(
        function() { /* Handle success */ },
        console.error.bind(console)
    );</code></pre>

![](/images/posts/2015-12-29/devtools2.png)
