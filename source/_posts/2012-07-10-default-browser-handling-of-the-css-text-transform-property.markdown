---
layout: post
title: "Default Browser Handling of the CSS text-transform Property"
date: 2012-07-10 21:05
comments: true
categories: [Browsers, CSS]
---

The `text-transform` CSS property is most frequently used to uppercase and lowercase text.  According to the [CSS 2.1 specification](http://www.w3.org/TR/CSS21/text.html#caps-prop) it is also an inherited property, meaning, when no value is specified on a given element, it should inherit its parent's `text-transform` value.

If no parents have a `text-transform` property defined, the element will take on the default value of `none`.

Where it gets interesting is that all browsers define default `text-transform` properties for certain form elements.  What does this mean?  <!--more-->Let's say you have the following markup:

``` html
<style>
    form { text-transform: uppercase; }
</style>

<form>
    <input type="text" value="foo" />
    <input type="submit" value="bar" />
</form>
```

Both the value of the `input[type=text]` and `input[type=submit]` will appear lowercased in all major browsers.  This happens because they all include `text-transform: none` in their user agent stylesheet for those elements.  Therefore the `text-transform: uppercase` rule declared on the parent node is not inherited.

Unfortunately (but not surprisingly), browsers aren't consistent about their default values for all elements.

### What the Browsers Do

The following chart shows popular browser rendering engines and whether their user agent stylesheet includes `text-transform: none` for the listed elements.

<table>
    <thead>
        <tr>
        	<th>Rendering Engine</th>
        	<th>input[type=submit]</th>
        	<th>input[type=text]</th>
        	<th>select</th>
        	<th>textarea</th>
        	<th>button</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
    		<td>Trident (Internet Explorer)</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td><strong>No</strong></td>
    	</tr>
    	<tr>
    		<td>Gecko (Firefox)</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td><strong>No</strong></td>
    		<td>Yes</td>
    		<td><strong>No</strong></td>
    	</tr>
    	<tr>
    		<td>WebKit (Chrome, Safari, etc...)</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td>Yes</td>
    	</tr>
    	<tr>
    		<td>Presto (Opera)</td>
    		<td>Yes</td>
    		<td>Yes</td>
    		<td><strong>No</strong></td>
    		<td>Yes</td>
    		<td><strong>No</strong></td>
    	</tr>
    </tbody>
</table>

### What Does This Mean?

The browser differences occur on the `button` and `select` elements.  Therefore, if you apply a `text-transform` value to a node, AND that node has children `button` / `select` nodes, AND you do not apply a `text-transform` value to the `button` or `select` nodes themselves... you'll get different behavior in different browsers.

For example:

``` html
<!DOCTYPE html>
<html>
    <head>
        <style>
            form { text-transform: uppercase; }
        </style>
    </head>
    <body>
        <form>
            <!-- "foo" will be uppercase in IE, Firefox, and Opera -->
            <!-- "foo" will be lowercase in WebKit based browsers -->
            <button>foo</button>

            <!-- "bar" will be uppercase in Firefox and Opera -->
            <!-- "bar" will be lowercase in IE and WebKit based browsers -->
            <select>
                <option>bar</option>
            </select>
        </form>
    </body>
</html>
```

### Consistency

You could make arguments as to whether the user agent stylesheets *should* be defaulting the `text-transform` of various form elements to `none`, but to most people all that matters is that the behavior is consistent.  It's easy enough to override the defaults if you don't like them.

Therefore to get consistent rendering you need to define some `text-transform` value for both `button` and `select` elements.

``` css
/* Option 1 - Don't inherit values in all browsers */
button, select { text-transform: none; }

/* Option 2 - Inherit values in all browsers */
button, select { text-transform: inherit; }
```

### Is This a Big Deal?

No.  But, in my opinion it's something that's well suited for a reset or normalizing stylesheet.  I'll be sending a pull request to [normalize.css](https://github.com/necolas/normalize.css) shortly.
