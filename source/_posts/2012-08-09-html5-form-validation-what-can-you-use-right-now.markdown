---
layout: post
title: "HTML5 Form Validation - What Can You Use Right Now?"
date: 2012-08-10 20:52
comments: true
categories: [HTML5, Browsers, Forms]
published: false
---

HTML5 includes a built in client side form validation mechanism designed to make implementing client side validation powerful, seamless, and most importantly - easy to implement.

Despite this, HTML5 form validation is a topic relegated to presentations and demos; I personally have yet to fill out a web form in the wild that actually makes use of HTML5 form validation.

Nevertheless, more and more pieces or HTML5 form validation are being supported in browsers all the time.  It is now at least mostly supported in the following browsers ([full list](http://caniuse.com/#feat=form-validation)).

* IE 10
* Firefox 4+
* Chrome 10+
* Safari 5+ (although it's disabled by default)
* Opera 10+
* Opera Mobile
* Chrome for Android
* Firefox for Android

### Example!

To show what HTML form validation offers and discuss what's usable now, let's take a basic form and enhance it with client side validation.  Although I provide some screenshots of the results, I highly recommend using one of the supported browsers listed above for viewing and messing around with the examples.

Here's the starting form:

<iframe style="width: 100%; height: 510px;" src="http://jsfiddle.net/tj_vantoll/2Q3xY/12/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

As you can see currently there is no validation.  Therefore, if you submit the form the data will simply be sent to the server as is (in this case jsFiddle itself).

Normally what most applications do at this point is to insert some sort of complex JavaScript logic to listen for form submissions and manually validate that the data meets various criteria.  This works, however, HTML5 offers ways of doing this natively, without a JavaScript dependency.

Let's get started.

### Required Fields

Most forms contain some data that you absolutely need the user to supply.  For example on a typical login screen the user will need to provide both a username and password.

The HTML5 spec provides a `required` attribute that you can apply to form fields like so.

``` html
<input type="text" required />
```

The browser will not allow the form to be submitted until the user has provided a value for each required field.

Let's add this to our example.  We'll say that for the signup form the user must supply a name, gender, age, appointment date, email, and that they must agree the to terms.

<iframe style="width: 100%; height: 510px;" src="http://jsfiddle.net/tj_vantoll/Tt83E/2/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

As you can see nothing has visually changed on the form.  However, supporting browsers will not allow the form to be submitted unless you've made a selection for each required field.  In Chrome, Firefox, and Opera you will also be presented with an error message for the first empty required field.  Firefox even nicely places a red border around each required field that was not filled out.

##### Chrome

![Chrome](/images/posts/2012-08-09/Chrome-required.png "Chrome")

##### Firefox

![Firefox](/images/posts/2012-08-09/Firefox-required.png "Firefox")

##### Opera

![Opera](/images/posts/2012-08-09/Opera-required.png "Opera")

Safari, Internet Explorer, and older versions of Firefox/Chrome/Opera will simply allow the form to be submitted without required fields being filled in.  Therefore there is no harm in adding this attribute on your forms.

### New Input Types

The HTML specification provides a number of additional `type` options for `<input>` nodes.  What do different input types have to do with form validation?  When you use the different input types the browser will constrain the data to values that the type allows for.

For example, if you use an `<input>` of `type=number`, the browser will enforce that data inputted is numeric.  In the example form there are a number of fields that can benefit from the new types.

* Age --> `type=number` ([Support](http://caniuse.com/#feat=input-number))
* Appointment Date --> `type=date` ([Support](http://caniuse.com/#feat=input-datetime))
* Phone Number --> `type=tel`
* Email --> `type=email`
* Satisfaction --> `type=range` ([Support](http://caniuse.com/#feat=input-range))

Here's our form updated with the new input types.

<iframe style="width: 100%; height: 510px;" src="http://jsfiddle.net/tj_vantoll/XTQU8/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

type=number
Firefox = no support
Chrome + Safari = Remove on focus
Opera = leave text error on submit

Talk about novalidate attribute

### Server Side Validation

BUT WHAT ABOUT MY SERVER SIDE VALIDATION

Yes you still need to do that.  But you can assume that the user went through client side and only do the necessary shit.
