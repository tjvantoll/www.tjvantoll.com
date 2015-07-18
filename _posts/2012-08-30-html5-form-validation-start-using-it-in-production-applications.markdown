---
layout: post
title: "HTML5 Form Validation - Start Using it in Production Applications"
comments: true
---

Forms suck, yet, they make or break the most crucial online transactions.  Building web forms sucks as well; the APIs and lack of customizability has confused and frustrated people for years.  As a byproduct an abundance of horribly unusable forms have been created for everyone to suffer through.

Therefore *anything* that makes this process easier should be greeted with joy and enthusiasm.

HTML5 does just this by including a built in [client side form validation mechanism](https://developer.mozilla.org/en-US/docs/HTML/Forms_in_HTML#Constraint_Validation_API) designed to make implementing client side validation powerful, seamless, and most importantly - easy to implement.

Great!  Despite this, HTML5 form validation is a topic relegated to presentations and demos; I personally have yet to fill out a web form in the wild that actually makes use of it.

Why?

<!--more-->

## Browser Support

One reason people avoid HTML5 form validation is lack (or perceived lack) of browser support for the new APIs.  However the [list of supported browsers](http://caniuse.com/#feat=form-validation) now includes the latest version of every major browser, including:

* IE 10
* Firefox 4+
* Chrome 10+
* Safari 5+
* Opera 10+
* Opera Mobile
* Chrome for Android
* Firefox for Android

## What to do in unsupported browsers?

This is *the* problem.  Despite browser support being relatively good, for most sites there are still going to be a substantial amount of users with browsers that simply do not support the new APIs.  Therefore, if you are intending to support these users you have to start forking your code to support both browsers with native support and browsers without it.

While this can absolutely be done, it's time consuming and a bit of a nuisance.  It's faster and easier to simply ditch the native validation and use your own.  In this case you don't have to worry about multiple code paths; every user in every browser will hit the same codepath and get the same experience.

## What if we did nothing?

But what if we took a new approach to this problem - simply don't do client side validation in unsupported browsers, at all.  This is advantageous for a number of reasons.

1) **No dual maintenance**.  One thing that has always bothered me about doing validation on both the client and server side is that you're validating the #1 principle of software development - [**D**on't **R**epeat **Y**ourself](http://en.wikipedia.org/wiki/Don't_repeat_yourself).

2) **No dependencies**.  If you only use native browser APIs to provide client side validation you don't have to worry about maintaining plugin or library dependencies that might not be maintained.

3) **Faster and easier**.  The browser APIs are simple and easy to use.  Want to make a field required?  [Add the `required` attribute](http://wufoo.com/html5/attributes/09-required.html).  Want to make a field only accept email address?  [Add `type=email` to your `<input>` field](http://wufoo.com/html5/types/1-email.html).

4) **Future Friendly**.  Although currently a number of older browsers (namely IE <= 9) do not support the new APIs, eventually they all will.  Therefore, eventually all users will hit the client side validation as intended.

## But, you can't just not validate data... right?

Of course you have to validate client submitted data, but you already need to be doing that on the server side anyways.  What this approach requires you to do is simply return formatted error messages from your server side processing and [display them in a usability friendly way](http://uxdesign.smashingmagazine.com/2011/11/08/extensive-guide-web-form-usability/).  You're likely doing that already.

## What About Polyfills?

[Polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/) are great and a number of [HTML5 form validation polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) exist.  My problem with polyfills in this case is that they add a dependency that I believe is unnecessary.

## Conclusion

HTML5 provides native solutions to validating client side data and most all modern browsers support it.  Yet, most people are still relying on the JavaScript hacks we've been using for well over a decade now.

It's time.  Come to the dark side.
