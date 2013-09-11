---
layout: post
title: "Bugs with document.activeElement in Internet Explorer"
date: 2013-08-30 14:46
comments: true
categories: [Browsers, JavaScript]
---

There are two *fun* bugs related to `document.activeElement` in IE that have come up recently in jQuery UI. To help save others some pain, I felt these needed to be documented.

### Accessing `document.activeElement` from an `<iframe>` in IE9

Let's say you have an `<iframe>`.

``` html
<iframe src="other.html"></iframe>
```

And in that `<iframe>`, you want to know what element has focus.

``` html
/* other.html */
<script>
    console.log( parent.document.activeElement );
</script>
```

In all browsers except IE9, this will log the element that has focus in the parent document (the `<body>` by default). In IE9 this will inexplicably throw an `"Unspecified Error"`.

Yes, you read right; ACCESSING the `activeElement` property of a parent `document` throws an error in IE9.

<!--more-->

What can you to about it? Since the access causes the error, the only recourse is a try / catch.

``` javascript
var activeElement;
try {
    activeElement = parent.document.activeElement;
} catch( error ) {
    activeElement = parent.document.body;
}
```

Luckily this is a problem unique to IE9; the same behavior is not present in IE 7, 8, or 10.

### Blurring the `<body>` Switches Windows in IE9 and IE10

If you call `document.body.blur()` in IE9 or IE10, you will switch application windows. Yes you again read right; if you have IE and Notepad open, calling `document.body.blur()` will switch focus to Notepad. If you don't believe me, open IE9 or IE10 and try for yourself - run `document.body.blur()` in the console.

Why is this problematic?

Recall from the earlier section that the default `activeElement` is the `<body>`. Therefore, if you generically call `document.activeElement.blur()`, you will likely end up switching application windows for your users.

The workaround for this is to ensure the `activeElement` is not the `<body>` before calling `blur()`.

``` javascript
if ( document.activeElement.nodeName.toLowerCase() !== "body" ) {
    document.activeElement.blur();
}
```

Luckily this problem has been fixed in IE11; `document.body.blur()` no longer switches windows.

### Putting it all Together

This is [the commit](https://github.com/jquery/jquery-ui/commit/eae2c4b358af3ebfae258abfe77eeace48fcefcb) I ended up using for the jQuery UI bugs.

From:
``` javascript
$( document.activeElement ).blur();
```

To:
``` javascript
// support: IE9
// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
try {
    // Support: IE9+
    // If the <body> is blurred, IE will switch windows, see #9520
    if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {
        // Blur any element that currently has focus, see #4261
        $( document.activeElement ).blur();
    }
} catch ( error ) {}
```

Sigh.
