---
layout: post
title: "HTML 5 Validation API - What It Is And How You Can Use It To Enhance Your Forms"
date: 2012-08-04
comments: true
categories: [HTML5, Browsers, JavaScript]
published: false
---

HTML5 includes a built in client side form validation mechanism designed to make implementing client side validation powerful, seamless, and most importantly - easy to implement.

Despite this, HTML5 form validation is a topic relegated to presentations and demos; I personally have yet to fill out a web form in the wild that actually makes use of HTML5 form validation.

One of the reasons for this is a lack of browser support and a lack of customization in the validation itself.  However, the [list of browsers that support form validation](http://caniuse.com/#feat=form-validation) is now fairly comprehensive:

* IE 10
* Firefox 4+
* Chrome 10+
* Safari 5+
* Opera 10+
* Opera Mobile
* Chrome for Android
* Firefox for Android

Additionally all of the browsers listed above provide a [full validation API](https://developer.mozilla.org/en-US/docs/HTML/Forms_in_HTML?redirectlocale=en-US&redirectslug=HTML%2FHTML5%2FForms_in_HTML5#Constraint_Validation_API) for client side scripts.  Therefore now is a great time to start using HTML5 form validation in real applications.

<!--more-->

### Form Validation

When you submit a form in a supported browser the form will be validate that the data meets the criteria specified in attributes such as `min`, `max`, `required`, `type`, `step`, and `pattern`.  As an example if you submit the following `<form>`:

``` html
<form>
    <label for="name">Name:</label>
    <input id="name" type="text" required value="" />
    <input type="submit" />
</form>
```

The browser will prevent the form from being submitted since the `<input>` has the `required` attribute and an empty `value`.  It will also present the user with an error message:

##### Chrome

![Chrome](/images/posts/2012-08-05/Chrome-required.png "Chrome")

##### Firefox

![Firefox](/images/posts/2012-08-05/Firefox-required.png "Firefox")

##### Opera

![Opera](/images/posts/2012-08-05/Opera-required.png "Opera")

You can see what your browser does below:

<iframe style="width: 100%; height: 100px;" src="http://jsfiddle.net/tj_vantoll/8gJnv/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This is great but what if you want do something like customize the error message or show it in an additional location?  The [constraint validation API](http://www.whatwg.org/specs/web-apps/current-work/#the-constraint-validation-api) will allow you to do this.

### The API

1) Form elements have a [willValidate](http://www.whatwg.org/specs/web-apps/current-work/#dom-cva-willvalidate) property, which will return whether the element is [a candidate for constraint validation](http://www.whatwg.org/specs/web-apps/current-work/#candidate-for-constraint-validation).

``` html
<input id="input" type="text" />
<div id="div"></div>
<script>
	//true, because input elements are validated by default
    document.getElementById('input').willValidate;

    //false, because div elements are not validated
    document.getElementById('div').willValidate; //false
</script>
```

This is useful to know what

2) Form elements have a `validity` property which is a [ValidityState object](http://www.whatwg.org/specs/web-apps/current-work/#dom-cva-validity) with the following boolean properties per the [spec](http://www.whatwg.org/specs/web-apps/current-work/#validitystate):

* `customError` - `true` if custom validity message has been set per a call to `setCustomValidity()`.
* `patternMismatch` - `true` if the value does not match its `pattern` attribute.
* `rangeOverflow` - `true`, if the value is greater than its `max` attribute.
* `rangeUnderflow` -  `true, if the value is less than its `min` attribute.
* `stepMismatch` - `true` if the value is invalid per its `step` attribute.
* `tooLong` - `true` if the value exceeds its `maxlength` attribute.
* `typeMismatch` - `true` if the value is invalid per its `type` attribute.
* `valid` - `true` if non of the other validation conditions are `true.
* `valueMissing` - `true` if the element has a `required` attribute but has no value.

Here's a few examples of how this can be used.

``` html
<input id="one" type="text" />
<input id="two" type="text" required />
<input id="three" type="number" value="3" max="2" />
<input id="four" type="email" value="abc" />
<input id="five" type="number" value="3" step="2" />

<script>
    document.getElementById('one').validity.valid; //false

    document.getElementById('two').validity.valueMissing; //true
    document.getElementById('two').validity.valid; //false

    document.getElementById('three').validity.rangeOverflow; //true
    document.getElementById('three').validity.valid; //false

    document.getElementById('four').validity.typeMismatch; //true
    document.getElementById('four').validity.valid; //false

    document.getElementById('five').validity.stepMismatch; //true
    document.getElementById('five').validity.valid; //false
</script>
```

3) Form elements will have a `validationMessage` property will [return string that the browser would show the user if this were the only form control with a validity constraint problem](http://www.whatwg.org/specs/web-apps/current-work/#dom-cva-validationmessage).

``` 
