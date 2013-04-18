---
layout: post
title: "List of Pseudo-Elements to Style Form Controls"
date: 2013-04-15
comments: true
categories: [Browsers, CSS]
---

Styling form elements is a pain point when developing web applications.  Historically, web developers have had to accept the form controls the browser provided with little hope of customization.  However, web rendering engines are increasingly adding hooks through pseudo-elements to give authors some control over the display.

While all of these pseudo-elements are rendering engine specific (and therefore behind vendor prefixes), they can still be handy for customizing the display for that engine.  The following is my best attempt at compiling a complete list of the pseudo-elements available in Trident, Gecko, and WebKit.  At the time of this writing Blink is a recent fork of WebKit, so the pseudo-elements provided are identical.  I am not aware of any form related pseudo-elements that Presto provides.

A couple of notes:

* All Trident pseudo-elements listed here were added in IE10 and will not work in earlier versions of Internet Explorer.
* In WebKit, to style some pseudo-elements you must set the basis element's `-webkit-appearance` pseudo-class to `none`.  For example, to style `::-webkit-progress-bar` you must apply `-webkit-appearance: none;` to the appropriate `<progress>` element.

<!-- more -->

### Table of Contents

* &lt;input&gt; Elements
    - <a href="#input_button">button</a>
    - <a href="#input_checkbox_radio">checkbox / radio</a>
    - <a href="#input_color">color</a>
    - <a href="#input_date">date</a>
    - <a href="#input_file">file</a>
    - <a href="#input_number">number</a>
    - <a href="#input_password">password</a>
    - <a href="#placeholder_attribute">placeholder attribute</a>
    - <a href="#input_range">range</a>
    - <a href="#input_reset">reset</a>
    - <a href="#input_search">search</a>
    - <a href="#input_submit">submit</a>
    - <a href="#input_text">text</a>
* Other Elements
    - <a href="#button_element">button</a>
    - <a href="#keygen_element">keygen</a>
    - <a href="#meter_element">meter</a>
    - <a href="#progress_element">progress</a>
    - <a href="#select_element">select</a>
* Miscellaneous
    - <a href="#form_validation_messages">Form Validation Messages</a>

<h3 id="input_button">input[type=button]</h3>

#### Gecko

See <a href="#button_element">&lt;button&gt;</a>

<h3 id="input_checkbox_radio">input[type=checkbox] / input[type=radio]</h3><!-- http://jsfiddle.net/tj_vantoll/8esYJ/ -->

#### Trident

Trident provides the `::-ms-check` pseudo-element for checkbox and radio button controls.  For example:

``` html
<input type="checkbox">
<input type="radio">
```
``` css
::-ms-check {
    color: red;
    background: black;
    padding: 1em;
}
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-radio-checkbox.png">

<h3 id="input_color">input[type=color]</h3><!-- http://jsfiddle.net/tj_vantoll/fQFwc/ -->

#### WebKit

Webkit provides 2 pseudo elements for its color picker, `::-webkit-color-swatch-wrapper` and `::-webkit-color-swatch`.  You can apply a variety of rules to these elements but I haven't come up with anything useful.  Here's an example just to show it's possible:

``` html
<input type="color">
```
``` css
::-webkit-color-swatch-wrapper { border: 2px solid red; }
::-webkit-color-swatch { opacity: 0.5; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-color.png">

<h3 id="input_date">input[type=date]</h3><!-- http://jsfiddle.net/tj_vantoll/Qx46G/ -->

#### WebKit

The following 8 pseudo-elements are made available by WebKit for customizing a date input's textbox:

* `::-webkit-datetime-edit`
* `::-webkit-datetime-edit-fields-wrapper`
* `::-webkit-datetime-edit-text`
* `::-webkit-datetime-edit-month-field`
* `::-webkit-datetime-edit-day-field`
* `::-webkit-datetime-edit-year-field`
* `::-webkit-inner-spin-button`
* `::-webkit-calendar-picker-indicator`

Here is the internal structure of these elements:

<img src="/images/posts/2013-04-15/webkit-input-date-shadow.png">

So if you thought the date input could use more spacing and a ridiculous color scheme you could add the following:

``` html
<input type="date">
```
``` css
::-webkit-datetime-edit { padding: 1em; }
::-webkit-datetime-edit-fields-wrapper { background: silver; }
::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
::-webkit-datetime-edit-month-field { color: blue; }
::-webkit-datetime-edit-day-field { color: green; }
::-webkit-datetime-edit-year-field { color: purple; }
::-webkit-inner-spin-button { display: none; }
::-webkit-calendar-picker-indicator { background: orange; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-date.png">

<h3 id="input_file">input[type=file]</h3><!-- http://jsfiddle.net/tj_vantoll/nmmGU/ -->

All rendering engines automatically generate a button when an `<input type="file">` is created.  Historically, that button has been completely un-styleable.  However, recently Trident and WebKit have added hooks through pseudo-elements.

#### Trident

As of IE10 the file input button can be styled using the `::-ms-browse` pseudo-element.  Basically any CSS rules that you apply a regular button can be applied to the pseudo-element.  For example:

``` html
<input type="file">
```
``` css
::-ms-browse {
    background: black;
    color: red;
    padding: 1em;
}
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-input-file.png">

#### WebKit

WebKit provides a hook for its file input button with the `::-webkit-file-upload-button` pseudo-element.  Again pretty much any CSS rule can be applied, therefore the Trident example will work here as well:

``` html
<input type="file">
```
``` css
::-webkit-file-upload-button {
    background: black;
    color: red;
    padding: 1em;
}
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-file.png">

<h3 id="input_number">input[type=number]</h3><!-- http://jsfiddle.net/tj_vantoll/KwzPm/ -->

#### WebKit

WebKit provides a spinner control by default for number picker inputs.  Pseudo-elements `::-webkit-textfield-decoration-container`, `::-webkit-inner-spin-button` and `::-webkit-outer-spin-button` are provided for customization.  While you cannot do a whole lot with these elements, it can be useful to hide the spinner.

``` html
<input type="number">
```
``` css
::-webkit-textfield-decoration-container { }
::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-number.png">

<h3 id="input_password">input[type=password]</h3><!-- http://jsfiddle.net/tj_vantoll/Xaw9B/ -->

#### Trident

Trident provides a control on password inputs that can be pressed to display the password in plain text.  This control is made customizable via the `::-ms-reveal` pseudo-element.  You can change a number of properties of the control including its `color`, `background`, or `display` to hide it.  The following will hide the control:

``` html
<input type="password">
```
``` css
::-ms-reveal { display: none; }
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-input-password.png">

<h3 id="placeholder_attribute">placeholder Attribute</h3><!-- http://jsfiddle.net/tj_vantoll/TAqWZ/ -->

#### Gecko

Gecko provides the pseduo-element `::-moz-placeholder` to style placeholder text.  You can use this to change the placeholder's color or font properties.  For example:

``` html
<input placeholder="placeholder">
```
``` css
::-moz-placeholder {
    color: blue;
    font-family: 'Comic Sans MS';
}
```

This displays as follows in Firefox 20 on OS X:

<img src="/images/posts/2013-04-15/gecko-placeholder.png">

<i>Note: Gecko switched from the pseudo-class `:-moz-placeholder` to the pseudo-element `::-moz-placeholder` in Firefox 19.</i>

#### Trident

Trident offers the ability to style the placeholder text with a pseudo-class rather than a pseudo-element.  However the pseudo-class, `:-ms-input-placeholder`, can be used the same as the pseudo-elements from the other rendering engines:

``` html
<input placeholder="placeholder">
```
``` css
:-ms-input-placeholder {
    color: blue;
    font-family: 'Comic Sans MS';
}
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-placeholder.png">

#### WebKit

WebKit provides the `::-webkit-input-placeholder` pseudo-element.  It can also be used to change the color and font of the placeholder text:

``` html
<input placeholder="placeholder">
```
``` css
::-webkit-input-placeholder {
    color: blue;
    font-family: 'Comic Sans MS';
}
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-placeholder.png">

<h3 id="input_range">input[type=range]</h3><!-- http://jsfiddle.net/tj_vantoll/MHrzT/ -->

#### Gecko

As of Firefox 22, Gecko provides pseudo-elements `::-moz-range-track` and `::-moz-range-thumb` for styling range inputs.  It's possible to apply most CSS rules to these elements, for example:

``` html
<input type="range">
```
``` css
::-moz-range-track {
    border: 2px solid red;
    height: 20px;
    background: orange;
}
::-moz-range-thumb {
    background: blue;
    height: 30px;
}
```

This displays as follows in Firefox 22 on OS X:

<img src="/images/posts/2013-04-15/gecko-input-range.png">

#### Trident

Trident provides an impressive number of pseudo-elements to customize its range selector.

* `::-ms-fill-lower`: The track portion underneath / before the handle.
* `::ms-fill-upper`: The track portion above / after the handle.
* `::-ms-ticks-before`: An area above / before the range track with tick marks.
* `::-ms-ticks-after`: An area below / after the range track with tick marks.
* `::-ms-thumb`: The handle.
* `::-ms-track`: The range track itself.
* `::ms-tooltip`: The tooltip that appears when the user is selecting a value with the range selector.  Note that this element cannot be styled, only hidden using `display: none`.

This is easier to visualize with an example.  Take the following:

``` html
<input type="range">
```
``` css
::-ms-fill-lower { background: orange; }
::-ms-fill-upper { background: green; }
::-ms-thumb { background: red; }
::-ms-ticks-after { display: block; color: blue; }
::-ms-ticks-before { display: block; color: black; }
::-ms-track { padding: 20px 0; }
::-ms-tooltip { display: none; /* display and visibility only */ }
```

This will display as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-input-range.png">

#### WebKit

WebKit provides the `::-webkit-slider-runnable-track` pseudo-element for the track and `::-webkit-slider-thumb` for the range handle itself.  While you cannot do much with these elements, you can add some colors and padding.

``` html
<input type="range">
```
``` css
::-webkit-slider-runnable-track {
    border: 2px solid red;
    background: green;
    padding: 2em 0;
}
::-webkit-slider-thumb {
    outline: 2px solid blue;
}
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-range.png">

One final note about range inputs.  Trident and Webkit allow you to apply hover states to the thumb pseudo-element (`::-webkit-slider-thumb:hover` and `::-ms-thumb:hover` respectively), whereas Gecko currently does not.

<h3 id="input_reset">input[type=reset]</h3>

#### Gecko

See <a href="#button_element">&lt;button&gt;</a>

<h3 id="input_search">input[type=search]</h3><!-- http://jsfiddle.net/tj_vantoll/9jL5U/ -->

#### WebKit

By default WebKit provides a custom UI for search inputs with cancel and search buttons.  Two pseudo-elements, `::-webkit-search-cancel-button` and `::-webkit-search-results-button` are provided for customization, although you can't much of anything with them other than hide them as shown below:

``` html
<input type="search">
```
``` css
/* Remove the rounded corners */
input[type=search] { -webkit-appearance: none; }

/* Hide the cancel button */
::-webkit-search-cancel-button { -webkit-appearance: none; }

/* Hide the magnifying glass */
::-webkit-search-results-button { -webkit-appearance: none; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-input-search.png">

<h3 id="input_submit">input[type=submit]</h3>

#### Gecko

See <a href="#button_element">&lt;button&gt;</a>

<h3 id="input_text">input[type=text]</h3><!-- http://jsfiddle.net/tj_vantoll/r4mwz/, http://jsfiddle.net/tj_vantoll/ADEvK/ -->

#### Trident

As of IE10 Trident provides the pseudo-element `::-ms-value` to style the value portion of text inputs (`input[type=text]`, `input[type=password]`, etc) and `<select>`s.  For example:

``` html
<input type="text" value="value">
<input type="password" value="value">
<select><option selected>option</option></select>
```
``` css
::-ms-value { 
    color: red;
    background: black;
    padding: 1em;
}
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-value.png">

##### Clear Control

In IE10 when a text input has focus and is not empty, a small X control appears in the right hand side of the input.  When clicked, the control will clear the contents of the text input.  The X is styleable with the `::-ms-clear` pseudo-element.  Therefore you can hide it:

``` html
<input type="text">
```
``` css
::-ms-clear { display: none; }
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-input-clear.png">

There are a variety of rules that `::-ms-clear` will accept, so you can theme it as well:

``` html
<input type="text" value="Lorem Ipsum">
```
``` css
::-ms-clear {
    color: red;
    background: black;
    padding: 1em;
}
```

Which displays as follows:

<img src="/images/posts/2013-04-15/trident-input-clear-fancy.png">

<h3 id="button_element">&lt;button&gt; Element</h3><!-- http://jsfiddle.net/tVqyR/3/ -->

#### Gecko

Gecko applies pseudo-elements `::-moz-focus-outer` and `::-moz-focus-inner` to inputs of type `button`, `reset`, and `submit`, as well as `<button>` elements.

There's not much you can do with these pseudo-elements, but there is one important thing to be aware of.  Gecko applies `padding` and `border` to `::-moz-focus-inner` by default:

``` css
button::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner {
    border: 1px dotted transparent;
    padding: 0 2px;
}
```

These rules can easily create appearance differences between button displays in Gecko and other rendering engines.  This is confusing and there's actually [a ticket to remove it](https://bugzilla.mozilla.org/show_bug.cgi?id=140562).  The ticket has been open since 2002 so don't hold your breath.

The default `padding` and `border` can be reset by just setting them to 0:

``` css
button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}
```

The before and after of this can be seen in the screenshot (below) of Firefox 19 on OS X:

<img src="/images/posts/2013-04-15/gecko-buttons.png">

<h3 id="keygen_element">&lt;keygen&gt; Element</h3><!-- http://jsfiddle.net/tj_vantoll/nMRHU/ -->

#### WebKit

WebKit provides the `::-webkit-keygen-select` that can be used to customize the dropdown that a keygen element uses.  For example:

``` html
<keygen>
```
``` css
::-webkit-keygen-select {
    background: black;
    color: red;
}
```

This displays as follows on Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-keygen.png">

<h3 id="meter_element">&lt;meter&gt; Element</h3><!-- http://jsfiddle.net/tj_vantoll/Wjzwn -->

#### WebKit

WebKit provides pseudo-elements `::-webkit-meter-bar`, `::-webkit-meter-even-less-good-value`, `::-webkit-meter-optimum-value`, and `::-webkit-meter-suboptimal-value` to customize the display of meter elements.

In order for the pseudo-elements to be styled, you must set `-webkit-appearance` to `none` on the meter element itself.

Only one of the `::-webkit-meter-even-less-good-value`, `::-webkit-meter-optimum-value`, and `::-webkit-meter-suboptimal-value` elements will be active at a given time depending on the value of the meter.

See the following for an example:

``` html
<meter low="69" high="80" max="100" optimum="100" value="92">A</meter>
<meter low="69" high="80" max="100" optimum="100" value="72">C</meter>
<meter low="69" high="80" max="100" optimum="100" value="52">E</meter>
```
``` css
meter { -webkit-appearance: none; }
::-webkit-meter-bar {
    height: 50px;
    background: white;
    border: 2px solid black;
}
::-webkit-meter-optimum-value { background: green; }
::-webkit-meter-suboptimum-value { background: orange; }
::-webkit-meter-even-less-good-value { background: blue; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-meter.png">

<h3 id="progress_element">&lt;progress&gt; Element</h3><!-- http://jsfiddle.net/tj_vantoll/hhTPA/ -->

#### WebKit

WebKit provides pseudo-elements `::-webkit-progress-inner-element`, `::-webkit-progress-bar`, & `::-webkit-progress-value` to style progress elements in the following hierarchy:

<img src="/images/posts/2013-04-15/webkit-progress-shadow.png">

Like meter, in order to apply any rules to these elements you must set `-webkit-appearance: none;` on the progress element.  Here's an example:

``` html
<progress max="100" value="50"></progress>
```
``` css
progress { -webkit-appearance: none; }
::-webkit-progress-inner-element { }
::-webkit-progress-bar { border: 2px solid black; }
::-webkit-progress-value { background: red; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-progress.png">

#### Gecko

Gecko provides a `::-moz-progress-bar` pseudo-element to style the progress bar itself.  For example:

``` html
<progress max="100" value="50"></progress>
```
``` css
::-moz-progress-bar { background: red; }
```

This displays as follows in Firefox 19 on OS X:

<img src="/images/posts/2013-04-15/gecko-progress.png">

#### Trident

Like Gecko, Trident provides a single pseudo-element to style the progress bar, `::-ms-fill`.  For example:

``` html
<progress max="100" value="50"></progress>
```
``` css
::-ms-fill { background: red; }
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-progress.png">

<h3 id="select_element">&lt;select&gt; Element</h3><!-- http://jsfiddle.net/tj_vantoll/f5qTH/ -->

#### Trident

As of IE10 Trident gives you a hook to style the arrow within select dropdowns, `::-ms-expand`.  For example:

``` html
<select>
    <option selected>One</option>
</select>
```
``` css
::-ms-expand {
    padding: 2em;
    color: red;
    background: black;
}
```

This displays as follows in IE10 on Windows 8:

<img src="/images/posts/2013-04-15/trident-select.png">

<h3 id="form_validation_messages">Form Validation Messages</h3><!-- http://jsfiddle.net/tj_vantoll/Eb2zN/ -->

#### WebKit

WebKit is the only rendering engine to support styling the validation bubbles created from the [constraint validation API](http://www.html5rocks.com/en/tutorials/forms/constraintvalidation).  The following pseudo-elements are provided:

* `::-webkit-validation-bubble`
* `::-webkit-validation-bubble-arrow`
* `::-webkit-validation-bubble-arrow-clipper`
* `::-webkit-validation-bubble-heading`
* `::-webkit-validation-bubble-message`
* `::-webkit-validation-bubble-text-block`

It's easier to see what each element does visually.  Here's an example:

``` css
::-webkit-validation-bubble { padding: 1em; background: orange; }
::-webkit-validation-bubble-arrow { background: blue; }
::-webkit-validation-bubble-arrow-clipper { border: 2px solid black; }
::-webkit-validation-bubble-heading { background: green; }
::-webkit-validation-bubble-message { color: white; background: purple; }
::-webkit-validation-bubble-text-block { border: 1px solid red; padding: 1em; }
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-validation-bubble.png">

Here's a slightly more practical example showing how the bubble can be themed:

``` css
::-webkit-validation-bubble-message {
    color: #eee;
    background: black;
}
::-webkit-validation-bubble-arrow {
    background: black;
    border-color: #444;
    box-shadow: none;
}
```

This displays as follows in Chrome 26 on OS X:

<img src="/images/posts/2013-04-15/webkit-validation-bubble-pretty.png">

### That's It!

Hopefully you will find this list helpful.  If I'm missing elements or some of this information gets out of date let me know in the comments.

### Resources

* [https://gist.github.com/afabbro/3759334](https://gist.github.com/afabbro/3759334): A gist from [@angelinamagnum](https://twitter.com/angelinamagnum) with a nice list of ALL WebKit pseudo-elements. ([@paul_irish](https://twitter.com/paul_irish) actually `ack`'d the WebKit code base.)
* [http://www.wufoo.com/html5/](http://www.wufoo.com/html5/): Wufoo's Current State of HTML Forms
* [https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference/Mozilla_Extensions](https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference/Mozilla_Extensions): MDN article on Mozilla's CSS Extensions
* [http://dev.bowdenweb.com/css/pseudo/ms-trident-vendor-prefixed-pseudo-elements.html](http://dev.bowdenweb.com/css/pseudo/ms-trident-vendor-prefixed-pseudo-elements.html): List of Trident Vendor-Prefixed Pseudo-Elements
* [http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css): WebKit's current user agent stylesheet
* [http://trac.webkit.org/wiki/Styling%20Form%20Controls](http://trac.webkit.org/wiki/Styling%20Form%20Controls): Slightly dated guide from WebKit on styling form controls

### Updates

* April 17th, 2013: Added sections on `::-moz-focus-outer` and `::-moz-focus-inner` per comments from Matthew Brundage.
