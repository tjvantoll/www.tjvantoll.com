---
layout: post
title: "HTML5 Form Validation - Showing All Error Messages"
comments: true
---

[Browsers that support HTML5 form validation](http://caniuse.com/#feat=form-validation) have one thing in common; if a `<form>` is submitted and has errors on multiple fields, the browser will only display the first error to the user.

Turns out [the spec](http://www.whatwg.org/specs/web-apps/current-work/#the-constraint-validation-api) leaves the specific means of handling multiple errors up to the browser itself:

> Report the problems with the constraints of at least one of the elements given in unhandled invalid controls to the user. User agents may focus one of those elements in the process, by running the focusing steps for that element, and may change the scrolling position of the document, or perform some other action that brings the element to the user's attention.
>
> User agents may report more than one constraint violation. User agents may coalesce related constraint violation reports if appropriate (e.g. if multiple radio buttons in a group are marked as required, only one error need be reported).

The key part here being that user agents (i.e. browsers) **MAY** report more than one constraint violation (i.e. error).  Turns out they all decided not to.

<!--more-->

You can see this in your browser below (assuming it [supports HTML5 form validation](http://caniuse.com/#feat=form-validation) and is not Safari, more on that later).  Both fields are `required`, but if you submit the form you will only see an error for the first field.

{% capture demo_height %}170{% endcapture %}
{% capture demo_path %}2012-08-05/initial{% endcapture %}
{% capture demo_title %}HTML5 required validation example{% endcapture %}
{% include post/demo.html %}

Here's what it looks like on supported browsers if you attempt to submit this empty `<form>`:

##### Chrome 21

![Chrome](/images/posts/2012-08-05/Chrome.png "Chrome")

##### Firefox 14

![Firefox](/images/posts/2012-08-05/Firefox.png "Firefox")

##### Opera 12

![Opera](/images/posts/2012-08-05/Opera.png "Opera")

As you can see, all three only give an error for the first field.  Firefox at least has the decency to put a red border around all fields with invalid data by default.

The one noticeable browser missing from the list above is Safari.  Even though Safari supports the constraint validation API, the validation itself is turned off.

## Usability

From a usability perspective showing the users only the first error message is bad.  Imagine how frustrating it would be to continually correct errors just to be presented with the next error in the sequence.  If you've ran into a form such as this before you know what I'm talking about.

Luckily, browsers provide a [constraint validation API](http://www.whatwg.org/specs/web-apps/current-work/#the-constraint-validation-api) that can be used to provide this functionality.

## Using the Validation API

All dom nodes now possess a [willValidate](http://www.whatwg.org/specs/web-apps/current-work/#dom-cva-willvalidate_) property that indicates whether the node is a candidate for form validation.

Nodes in which `willValidate` is `true` also have a `validity` property.  The `validity` property resolves to a [ValidityState object](https://developer.mozilla.org/en-US/docs/DOM/ValidityState) which contains information about whether the field has validation errors, as well as the error message the browser will display to the user.

To make things even easier browsers provide an [:invalid pseduoselector](https://developer.mozilla.org/en-US/docs/CSS/:invalid) that can be used to select all elements with validation errors.  Let's see how this can be leveraged to show all error messages.

## The Code

Here's how I accomplished this with a jQuery dependent script.

<pre class="language-markup line-numbers"><code class="language-markup">&lt;form&gt;
    &lt;ul class="errorMessages"&gt;&lt;/ul&gt;
    
    &lt;div&gt;
        &lt;label for="name"&gt;Name:&lt;/label&gt;
        &lt;input id="name" type="text" required&gt;
    &lt;/div&gt;

    &lt;div&gt;
        &lt;label for="comments"&gt;Comments:&lt;/label&gt;
        &lt;textarea id="comments" required&gt;&lt;/textarea&gt;
    &lt;/div&gt;
    
    &lt;div class="buttons"&gt;
        &lt;button&gt;Submit&lt;/button&gt;
    &lt;/div&gt;
&lt;/form&gt;​

&lt;script&gt;
    var createAllErrors = function() {
        var form = $( this ),
            errorList = $( "ul.errorMessages", form );

        var showAllErrorMessages = function() {
            errorList.empty();

            // Find all invalid fields within the form.
            var invalidFields = form.find( ":invalid" ).each( function( index, node ) {

                // Find the field's corresponding label
                var label = $( "label[for=" + node.id + "] "),
                    // Opera incorrectly does not fill the validationMessage property.
                    message = node.validationMessage || 'Invalid value.';

                errorList
                    .show()
                    .append( "&lt;li&gt;&lt;span&gt;" + label.html() + "&lt;/span&gt; " + message + "&lt;/li&gt;" );
            });
        };

        // Support Safari
        form.on( "submit", function( event ) {
            if ( this.checkValidity && !this.checkValidity() ) {
                $( this ).find( ":invalid" ).first().focus();
                event.preventDefault();
            }
        });

        $( "input[type=submit], button:not([type=button])", form )
            .on( "click", showAllErrorMessages);

        $( "input", form ).on( "keypress", function( event ) {
            var type = $( this ).attr( "type" );
            if ( /date|email|month|number|search|tel|text|time|url|week/.test ( type )
              && event.keyCode == 13 ) {
                showAllErrorMessages();
            }
        });
    };
    
    $( "form" ).each( createAllErrors );
&lt;/script&gt;</code></pre>

You can see the results in your browser below:

{% capture demo_height %}220{% endcapture %}
{% capture demo_path %}2012-08-05/all{% endcapture %}
{% capture demo_title %}Showing all error messages{% endcapture %}
{% include post/demo.html %}

Here's how it looks in Chrome 21:

![Chrome](/images/posts/2012-08-05/Chrome-full.png "Chrome")

A couple things to note:

1) If a user attempts to submit a form and gets validation errors, a `submit` event is never fired for the `<form>`.  Therefore, instead of listening for `submit` on the `<form>`, I instead listen for a `click` on the `<input type="submit">`.  Since the user is also able to submit the form pressing enter in text inputs, I attach a `keypress` listener to them to ensure the same logic runs.

2) In my example I start each error message with the contents of the field's `<label>`.  This is because the messages for each field are often identical.  An alternative approach would be to use another constraint validation API method, [setCustomValidity](http://www.whatwg.org/specs/web-apps/current-work/#dom-cva-setcustomvalidity) to set a completely custom message.

3) The `:invalid` selector will return nothing in all browsers that do not support the constraint validation API.  Therefore this code will simply do nothing in those browsers.

4) Opera incorrectly does not fill the `validationMessage` property.  Therefore the check `var message = node.validationMessage || 'Invalid value.'` is necessary so a message is displayed for Opera.

5) I do nothing to style the individual fields based on whether they have valid data.  The HTML5 spec provides a number of CSS hooks to do this and I would recommend reading [CSS Pseudo-Classes and HTML5 Forms](http://html5doctor.com/css3-pseudo-classes-and-html5-forms/) from [html5 Doctor](http://html5doctor.com) if you're interested in including such styling.

### That's a Lot of Code to Do Something Simple

Yep.  While browser support is getting to be quite good for HTML5 forms the implementations themselves are still a bit buggy.  Nevertheless, this approach will work for displaying all validation errors to the end user.

## Polyfill

If you are interested in making the code above work in all browsers one option you have is to polyfill the functionality for unsupported browsers.  One robust choice is the [webshims](https://github.com/aFarkas/webshim) library.  

To make webshims work with the code above all you need to do is add `$.webshims.polyfill('forms');`.  The maintainer, [@aFarkas](https://github.com/aFarkas) was even kind of enough to provide me with a live example showing this - [http://jsfiddle.net/trixta/HynHy/](http://jsfiddle.net/trixta/HynHy/).

### Update (September 5th, 2012)

Per some [critique on Github](https://github.com/html5rocks/www.html5rocks.com/issues/175#issuecomment-8301873) from [@aFarkas](https://github.com/aFarkas) I've made the following changes:

* Updated the example code.
  * Removed a hack I had in place for Safari.
  * Switched to use the `:invalid` pseudoselector to find all invalid fields within a form.
  * Make the script handle multiple `<form>` elements in one DOM.
* Added the above section on using webshim to polyfill this behavior for all browsers.
