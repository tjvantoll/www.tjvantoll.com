---
layout: post
title: "A reportValidity() Use Case and Polyfill"
comments: true
---

Last week Chrome 40 was released, and while the greater web community [was celebrating service workers landing](https://twitter.com/addyosmani/status/558051510840356864), a little known DOM method made its first appearance in a browser: `reportValidity()`.

Because I don't think many people know what `reportValidity()` does, I thought I'd write a quick article about it. Personally I think the best way to explain `reportValidity()` is with a real-world example, so let's start there.

<!--more-->

## `reportValidity()` use case: a registration form

Suppose that you're building a registration form and you require a username:

<pre class="language-markup line-numbers"><code class="language-markup">&lt;form&gt;
    &lt;label&gt;
        Username:
        &lt;input required&gt;
    &lt;/label&gt;
    ...
    &lt;button&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

The username is required so you use a `required` attribute. But there's another common username requirement that you can't handle with an HTML attribute: uniqueness. You can't have two “bieber_fan_2003”s in your system after all.

So typically you use some sort of server-side check to make sure the user-provided username is available. Straightfoward. But the next part is tricky, and where `reportValidity()` comes into play. If you determine that the username is not available, how do you display that error to the user using the HTML5 form validation mechanisms?

It *seems* like this task should be easy, and it is—at least it only requires two lines of code—but it can be unintuitive to say the least. The first thing you need to do is mark the `<input>` as invalid, which you can do by calling `setCustomValidity()` on it with the error message you want to use:

<pre class="language-javascript"><code class="language-javascript">document.querySelector( "input" )
    .setCustomValidity( "This username is not available" );</code></pre>

This tells the browser that the text in the `<input>` is invalid (`setCustomValidity()` considers an empty string valid, and non-empty strings invalid), but it does not *report* the error to the user—aka the user doesn't see any bubbles. That is what `reportValidity()` does:

<pre class="language-javascript"><code class="language-javascript">document.querySelector( "form" ).reportValidity();</code></pre>

`reportValidity()` displays the form's first error to the user using the browser's native validation bubbles. Here's what it looks like:

<img src="/images/posts/2015-01-28/error-message.png" alt="">

## Report errors without `reportValidity()`

You may be wondering, if this is such a common use case, how did you report errors before `reportValidity()`? The completely unintuitive way to do that is by...  wait for it.... clicking the `<form>`'s submit button in JavaScript:

<pre class="language-javascript"><code class="language-javascript">document.querySelector( "button" ).click();</code></pre>

OF COURSE, right? Here's a [live example](http://jsfiddle.net/tj_vantoll/fdofmt7o/) that proves this technique works, in case you don't believe me.

Basically, clicking the submit button mimics an actual user submission, which triggers the HTML form validation algorithm, which reports the first error to the user. The thing is, if you wanted to report errors to the user you'd never think to use JavaScript to click the submit button, you'd look for a method named something like, oh I don't know, `reportValidity()`.

## Polyfill

Because `reportValidity()` and “clicking” a submit button in JavaScript are essentially equivalent actions, you can write a polyfill that takes advantage of this similarity. The following code does just that. You can include it to gain the ability to use `reportValidity()` in Firefox and IE 10+ (the first version of IE with an HTML5 form validation implementation):

<pre class="language-javascript line-numbers"><code class="language-javascript">if ( !HTMLFormElement.prototype.reportValidity ) {
    HTMLFormElement.prototype.reportValidity = function() {
        var submitButtons = this.querySelectorAll( "button, input[type=submit]" );
        for ( var i = 0; i < submitButtons.length; i++ ) {
            // Filter out &lt;button type="button"&gt;, as querySelectorAll can't
            // handle :not filtering
            if ( submitButtons[ i ].type === "submit" ) {
                submitButtons[ i ].click();
                return;
            }
        }
    }
}</code></pre>

> This also adds support to Safari, but Safari does not have a native error reporting mechanism (i.e. bubbles), so you have to add your own. I went through some strategies to do so at a talk I gave last year. Here are [the slides](http://tjvantoll.com/speaking/slides/Constraint-Validation/Chicago/) and here's the [video](https://www.youtube.com/watch?v=8qvjhMr6UGM&list=PL-0yjdC10QYpmXI3l-PGK1od4kTWOjm_A&index=12) if you're interested.

This polyfill relies on all forms having a submit button because having one is a [best practice](http://www.smashingmagazine.com/2014/05/21/mobile-accessibility-why-care-what-can-you-do/), but you could easily alter the script to insert a hidden submit button into the DOM if you really wanted to.

## Who cares?

Ok, I'll admit that a single DOM method being shipped isn't life altering, but it's a small thing that makes HTML5 form validation a little easier to implement. I've been [advocating the usage of HTML form validation](http://tjvantoll.com/speaking/slides/Constraint-Validation/Atlanta/) for a long time now, but [very few people actually use it in production](https://www.youtube.com/watch?v=8qvjhMr6UGM&list=PL-0yjdC10QYpmXI3l-PGK1od4kTWOjm_A&index=12). I'm hoping that `reportValidity()` is a sign that browsers vendors care and are willing to put some effort into making HTML5 form validation easier to use.

Firefox [has a ticket for `reportValidity()`](https://bugzilla.mozilla.org/show_bug.cgi?id=1088761), but I have no clue if IE has this method on their roadmap. WebKit can't consider `reportValidity()` until they actually have a means of reporting errors—i.e. bubbles. WebKit has a [ticket to add bubbles](https://bugs.webkit.org/show_bug.cgi?id=28649), but it has been inactive since 2010.

Oh, and browser vendors, if you're listening, I have two other things on my form validation wish list that still have zero implementations:

* 1) There's a new `invalid` event on `<form>` elements (see [step 4 on this form submission algorithm](http://www.w3.org/html/wg/drafts/html/master/forms.html#form-submission-algorithm)) that makes [aggregating error messages](http://tjvantoll.com/speaking/slides/Constraint-Validation/Chicago/#/28) a lot easier.
* 2) There's a [`:user-error` pseudo-class](http://dev.w3.org/csswg/selectors-4/#user-pseudos) in the CSS Selectors 4 spec that's [far more useful than `:invalid`](http://tjvantoll.com/speaking/slides/Constraint-Validation/Chicago/#/33).

Let's make it happen!
