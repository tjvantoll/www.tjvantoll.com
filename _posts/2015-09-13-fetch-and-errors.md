---
layout: post
title: Handling Failed HTTP Responses With fetch()
comments: true
---

Quiz: What does this call to the [web's new `fetch()` API](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en) do?

<pre class="language-javascript"><code class="language-javascript">fetch("http://httpstat.us/500")
    .then(function() {
        console.log("ok");
    }).catch(function() {
        console.log("error");
    });</code></pre>

If you're like me, you might assume this code logs “error” when run—but it actually logs “ok”.

This expectation probably comes from years of jQuery development, as [jQuery's `ajax()` method](http://api.jquery.com/jquery.ajax/) invokes its `fail` handler when the response contains a failed HTTP status code. For example, the code below logs “error” when run:

<pre class="language-javascript"><code class="language-javascript">$.ajax("http://httpstat.us/500")
    .done(function() {
        console.log("ok");
    }).fail(function() {
        console.log("error");
    });</code></pre>

<!--more-->

## Why does `fetch()` work this way?

[Per MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful), the `fetch()` API only rejects a promise when a “*network error is encountered, although this usually means permissions issues or similar.*” Basically `fetch()` will only reject a promise if the user is offline, or some unlikely networking error occurs, such a DNS lookup failure.

The good is news is `fetch` provides a simple `ok` flag that indicates whether an HTTP response's status code is in the successful range or not. For instance the following code logs “Error: Internal Server Error(…)”:

<pre class="language-javascript"><code class="language-javascript">fetch("http://httpstat.us/500")
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        console.log("ok");
    }).catch(function(error) {
        console.log(error);
    });</code></pre>

To keep this code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and reusable, you probably want to create a generic error handling function you can use for all of your `fetch()` calls. The following code refactors the error handling into a `handleErrors()` function:

<pre class="language-javascript"><code class="language-javascript">function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch("http://httpstat.us/500")
    .then(handleErrors)
    .then(function(response) {
        console.log("ok");
    }).catch(function(error) {
        console.log(error);
    });</code></pre>

For added fun you can use [ES6 arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to make the callback formatting a little less verbose:

<pre class="language-javascript"><code class="language-javascript">function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
fetch("http://httpstat.us/500")
    .then(handleErrors)
    .then(response => console.log("ok") )
    .catch(error => console.log(error) );</code></pre>

## Parting thoughts

Although I still don't like `fetch()`'s lack of rejecting failed HTTP status codes, over time `fetch()`'s behavior has grown on me—mostly because it gives me more control over how I handle individual problems. Plus, the composable nature of `fetch()` makes it fairly trivial to manually handle errors without adding a bunch of verbose code.

Overall I think it's worth taking few minutes to play with `fetch()`, even if it's just to see what you think. It's certainly a far more readable alternative to XMLHttpRequest. If you happen to be building [NativeScript](https://www.nativescript.org/) apps, you might not know that you can [use `fetch()` today](https://docs.nativescript.org/ApiReference/fetch/HOW-TO.html) without any need for a polyfill or fallback. And something about using `fetch()` to perform HTTP requests in native Android and iOS apps is just plain cool :)

*This article was updated on September 15th, 2015 to use a simpler `handleErrors()` function based on a [comment from Jake Archibald](#comment-2254295840).*
