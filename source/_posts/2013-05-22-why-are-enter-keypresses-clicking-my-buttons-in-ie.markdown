---
layout: post
title: "Why are Enter Keypresses Clicking My Buttons in IE?"
date: 2013-05-22 22:15
comments: true
categories: [Browsers, JavaScript]
---

When you press the Enter key in a textbox, the browser will automatically attempt to perform an [implicit submission](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#implicit-submission) of the textbox's `<form>`.

For example, if you press Enter in the textbox of the following `<form>` it will submit a search query to Google:

``` html
<form action="http://google.com">
    <input name="q" type="text">
    <input type="submit">
</form>
```

<!--more-->

The same will occur if you use a `<button>` element, which has a default `type` of `submit`:

``` html
<form action="http://google.com">
    <input name="q" type="text">
    <button>Submit</button>
</form>
```

In each of these examples a `click` event will be triggered on the form's `input[type="submit"]` / `button[type="submit"]`. This is all expected and speced behavior that is consistently implemented across browsers.

### Internet Explorer

Internet Explorer has an annoying quirk that still exists as of IE10: submit buttons can be clicked when Enter is pressed in a textbox, even when no `<form>` is present. Consider the example below:

``` html
<input type="text">
<!-- other stuff -->
<button>Some Unrelated Action</button>
```

Pressing Enter in this textbox in IE will click the completely unrelated `<button>`. No other browsers exhibit this behavior.

I have no idea what IE's algorithm for selecting a submit button is, but it will find buttons in completely unrelated portions of the DOM. For instance it is responsible for a [jQuery UI bug](http://bugs.jqueryui.com/ticket/9312) by causing a dialog's close button to be triggered on enter keypresses in unrelated textboxes.

### Solution

All `<input>`s should be within a `<form>`, and all forms should have a submit button. So if you're running into this bug, changing your markup to be semantic will avoid this issue altogether.

If for whatever reason that's not an option, you can add `type="button"` to the `<button>`:

``` html
<input type="text">
<!-- other stuff -->
<button type="button">Some Unrelated Action</button>
```

This will override the default `type="submit"` and prevent IE from clicking the `<button>` on Enter keypresses.

If anybody has knowledge of the algorithm IE uses to find submittable elements when no `<form>`s are present please let me know in the comments. I'm very curious.

#### Related Reading

* [The Enter Key should Submit Forms, Stop Suppressing it](/2013/01/01/enter-should-submit-forms-stop-messing-with-that/)