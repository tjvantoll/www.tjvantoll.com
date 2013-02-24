---
layout: post
title: "maxlength Constraint Validation Oddities in Major Browsers"
date: 2012-10-17 12:48
comments: true
categories: [Browsers, JavaScript, Forms, HTML5]
---

The `maxlength` attribute has been around in browsers for a long time.  When provided, all browsers prevent the user entering a value that exceeds the `maxlength`.

For example you cannot type more than 2 characters in the textbox below:

<input type="text" maxlength="2">

### Constraint Validation

[Constraint validation](https://developer.mozilla.org/en-US/docs/HTML/HTML5/Constraint_validation_) is an HTML5 spec that provides native client side form validation in the browser.  As part of its [API](https://developer.mozilla.org/en-US/docs/HTML/Forms_in_HTML#Constraint_Validation_API), all `<input>` and `<textarea>` elements have a `validity.tooLong` property that is `true` when the length of the `value` exceeds the `maxlength`.

But if the browser prevents this, then why does the property exist?

<!--more-->

### Prefilled value Attribute

Assume that you're populating the `value` of form elements from a database and you end up with something like this:

`<input type="text" maxlength="1" value="ABC">`

How will the browser handle this?

All browsers will prevent entry of additional characters, but they do not trim excess characters already present.  Additionally, all browsers will allow a form containing the above input to submit.  *Note: Opera is the only browser to set the `validity.tooLong` property to `true` in this situation.  Despite this, it does not prevent form submission.*

Why is submission not prevented?  The key is in the [specification](http://www.whatwg.org/specs/web-apps/current-work/#concept-input-value-dirty-flag):

> Constraint validation: If an element has a maximum allowed value length, its dirty value flag is true, its value was last changed by a user edit (as opposed to a change made by a script), and the code-unit length of the element's value is greater than the element's maximum allowed value length, then the element is suffering from being too long.

The [dirty flag](http://www.whatwg.org/specs/web-apps/current-work/#concept-input-value-dirty-flag) essentially means that the user has changed the value of an element.  Therefore, in order to be `tooLong`, the element must have been edited.

### Actually Triggering tooLong

So let's take another approach.  What happens if you have the same input:

`<input type="text" maxlength="1" value="ABC">`

...remove one character, then submit?  You can try it for yourself below:

{% demo /demos/2012-10-17/tooLong.html Triggering_tooLong_Errors 130 %}

Upon edit IE10 and Chrome will set the `validity.tooLong` property to `true` and prevent form submission.  If the user attempts to submit a form after removing the "C" they will see the following in those browsers:

![Chrome](/images/posts/2012-10-17/Chrome.png "Chrome")
![IE10](/images/posts/2012-10-17/IE10.png "IE10")

Firefox, Safari, and Opera incorrectly handle this situation and allow the form to be submitted anyways.
