---
layout: post
title: "A reportValidity() Use Case and Polyfill"
date: 2015-01-28
comments: true
categories: [HTML5, Forms, JavaScript]
---

Last week Chrome 40 was released, and while the greater web community [was celebrating service workers landing](https://twitter.com/addyosmani/status/558051510840356864), a little known DOM method made its first appearance in a major browser: `reportValidity()`.

Because I don't think many people know what `reportValidity()` does, I thought I'd write a quick article about it. Personally I think the best way to explain `reportValidity()` is with a real-world example, so let's start there.

## `reportValidity()` use case: a registration form

Suppose that you're building a registration form and you require a username:

``` html
<form>
    <label>
        Username:
        <input required>
    </label>
    ...
    <button>Submit</button>
</form>
```

The username is required so you use a `required` attribute. But there's another common username requirement that you can't handle with an HTML attribute: uniqueness. You can't have two “bieber_fan_2003”s in your system after all.

So typically you use some sort of server-side check to make sure the user-provided username is available. Straightfoward. But the next part is tricky, and where `reportValidity()` comes into play. If you determine that the username is not available, how do you display that error to the user using the HTML5 form validation mechanisms?

It *seems* like this task should be easy, and it is—at least it only requires two lines of code—but it can be unintuitive to say the least. The first thing you need to do is mark the `<input>` as invalid, which you can do my calling `setCustomValidity()` on it with the error message you want to use:

``` javascript
document.querySelector( "input" )
    .setCustomValidity( "This username is not available" );
```

This tells the browser that the text in the `<input>` is invalid (`setCustomValidity()` considers an empty string valid, and non-empty strings invalid), but it does not *report* the error to the user—aka the user doesn't see any bubbles. That is what `reportValidity()` does:

``` javascript
document.querySelector( "form" ).reportValidity();
```

`reportValidity()` displays the form's first error to the user using the browser's native validation bubbles. Here's what it looks like:

<img src="/images/posts/2015-01-28/error-message.png" alt="">

## Report errors without `reportValidity()`

You may be wondering, if this is such a common use case, how did you report errors before `reportValidity()`? The completely unintuitive way to do that is by...  wait for it.... clicking the `<form>`'s submit button in JavaScript:

``` javascript
document.querySelector( "button" ).submit();
```

OF COURSE, right? Here's a [live example](http://jsfiddle.net/tj_vantoll/fdofmt7o/) that proves this technique works, in case you don't believe me.

Basically, clicking the submit button mimics an actual user submission, which triggers the HTML form validation algorithm, which reports the first error to the user. The thing is, if you wanted to report errors to the user you'd never think to use JavaScript to click the submit button, you'd look for a method named something like, oh I don't know, `reportValidity()`.

## Polyfill

Because `reportValidity()` and “clicking” a submit button in JavaScript are essentially equivalent actions, you can write a polyfill that takes advantage of this similarity. The following code does just that. You can include it to gain the ability to use `reportValidity()` in Firefox and IE 10+ (the first version of IE with an HTML5 form validation implementation):

``` javascript
if ( !HTMLFormElement.prototype.reportValidity ) {
    HTMLFormElement.prototype.reportValidity = function() {
        var submitButtons = this.querySelectorAll( "button, input[type=submit]" );
        for ( var i = 0; i < submitButtons.length; i++ ) {
            // Filter out <button type="button">, as querySelectorAll can't
            // handle :not filtering
            if ( submitButtons[ i ].type === "submit" ) {
                submitButtons[ i ].click();
                return;
            }
        }
    }
}
```

> This also adds support to Safari, but Safari does not have a native error reporting mechanism (i.e. bubbles), so you have to add your own. I went through some strategies to do so at a talk I gave last year. Here are [the slides](http://tjvantoll.com/speaking/slides/Constraint-Validation/Chicago/) and here's the [video](https://www.youtube.com/watch?v=8qvjhMr6UGM&list=PL-0yjdC10QYpmXI3l-PGK1od4kTWOjm_A&index=12) if you're interested.

This polyfill relies on all forms having a submit button because having one is a [best pratice](http://www.smashingmagazine.com/2014/05/21/mobile-accessibility-why-care-what-can-you-do/), but you could easily alter the script to insert a hidden submit button into the DOM if you really wanted to.

## Who cares?

Ok, I'll admit that a single DOM method being shipped isn't life altering, but it's a small thing that makes HTML5 form validation a little easier to implement. I've been [advocating the usage of HTML form validation](http://tjvantoll.com/speaking/slides/Constraint-Validation/Atlanta/) for a long time now, but [very few people actually use it in production](https://www.youtube.com/watch?v=8qvjhMr6UGM&list=PL-0yjdC10QYpmXI3l-PGK1od4kTWOjm_A&index=12). I'm hoping that `reportValidity()` is a sign that browsers vendors care and are willing to put some effort into making HTML5 form validation easier to use.

So with that in mind, browser vendors, if you're listening, I'm also waiting for an `invalid` event on `<form>` elements (see [step 4 on this form submission algorithm](http://www.w3.org/html/wg/drafts/html/master/forms.html#form-submission-algorithm), and the [`:user-error` pseudo-class](http://dev.w3.org/csswg/selectors-4/#user-pseudos).

And to WebKit engineers specifically, if you're reading this, please, please implement an error reporting mechanism for your constraint validation APIs. Not having a basic implementation in one of the web's major browsers is keeping a lot of people from using HTML5 form validation, and the web's forms are a lot worse because of it.
