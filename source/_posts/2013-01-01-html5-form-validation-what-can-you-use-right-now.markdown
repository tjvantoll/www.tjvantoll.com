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

As you can see currently there is no validation.  Therefore, if you submit the form, data will simply be sent to the server as is (in this case jsFiddle itself).

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

<iframe style="width: 100%; height: 510px;" src="http://jsfiddle.net/tj_vantoll/XTQU8/embedded/result,html,css,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

If your browser supports the new input types you can see some visual differences in the way the Age, Appointment Date, and Satisfaction fields are presented.  Unfortunately the actual behavior of these fields varies across browsers.

* Chrome - For `<input type="number">`, and `<input type="date">` fields Chrome will remove non-numeric data from the input when the input loses focus.
* Safari - Same behavior as Chrome for `<input type="number">` but no support for `<input type="date">`.
* Opera - For `<input type="number">` Opera will allow you to enter non numeric data.  If the field is also `required` then it Opera will not allow the field to be submitted until the user provides a valid numeric value, however, if the field is not `required`, Opera will allow the field to be submitted with non-numeric values (e.g. 'abc').  Opera does not allow free form keying into `<input type="date">` fields so the user has to select a valid value.

#### Mobile

The real advantage from using the new input types is on mobile devices.  For example on iOS instead of forcing the user to deal type out a full date they are presented with a control to make the input much easier to deal with.  For validation's sake it also completely prevents the user from entering an invalid date.

![iOS5](/images/posts/2012-08-09/iOS5-date.png "iOS5")

#### Fallback

For each input `type` a browser doesn't support it will simply use a `<input>` of `type=text`.  This behavior is consistent and therefore using the new input types is safe now.  If you need to know whether the user's browser supports a given `type` you can use [Modernizr](http://modernizr.com) to detect support and take action accordingly.

For example, on the previous form I detect support for `<input type="range">` so that I can dispaly the numeric value of the `range` only on supporting browsers.

``` javascript
if (Modernizr.inputtypes.range) {
    var updateRangeDisplay = function() {
        $(this).next('output').html(this.value);
    };
    $('input[type=range]')
        .on('change', updateRangeDisplay)
        .each(function(index, input) {
            $(this).after('<output>' + input.value + '</output>');   
        });
}​
```

### min, max, and step

`<input type="number">` and `<input type="range">` each support the `min`, `max`, and `step` attributes.  As you might expect `min` represents the minimum value to allow, `max` represents the maximum value to allow, and `step` represents the rate at which the value can be incremented.  For example if `min="2"`, `max="10"`, and `step="2"`, the valid values will be 2, 4, 6, 8, and 10.

At validation time the supporting browsers will enforce that these attributes are adhered to.  For example if our Age input is given a `min` of 16, and a value less than that is entered you will receive the following error message.

##### Chrome

![Chrome](/images/posts/2012-08-09/Chrome-min.png "Chrome")

##### Opera

![Opera](/images/posts/2012-08-09/Opera-min.png "Opera")

Browsers that do not support the attributes will simply ignore them and allow the form to be submitted regardless.

### Customizing Error Messages

While the default error messages the browser provides are not terrible, you definitely might want to customize them.  Browsers provide both a declarative and programmatic way of accomplishing this.

#### Declarative

Chrome allows you to set the error message to use on a form element in its `title` attribute.

``` html
<input required title="Dude, type something!">
```

Firefox provides the same functionality with the `x-moz-errormessage` attribute.

``` html
<input required x-moz-errormessage="Dude, type something!">
```

Opera provides no declarative means of customizing the error message.

There's one major problem with the current declarative approaches used by Chrome/Firefox - the message is shared for all types of validation errors.  Consider the following:

```
<input type="number" min="0" step="2" max="10" required>
```

There are 4 potentially different types of errors that you could get on this field (nothing was filled in, value too low, value too high, invalid step), however, no browsers provides a declarative means of providing different messages for these circumstances; they simply share the one message you provide.

If the field could only fail validation because it is `required`, the declarative approach works well.  But if you need more customization then you'll have to take the programmatic approach.

#### Programmatic

FULL - http://jsfiddle.net/tj_vantoll/dYzru/27/

### CSS Hooks

### Miscellaneous

### Server Side Validation

### Conclusion

Talk about novalidate attribute, autofocus attribute

### Server Side Validation

BUT WHAT ABOUT MY SERVER SIDE VALIDATION

Yes you still need to do that.  But you can assume that the user went through client side and only do the necessary shit.
