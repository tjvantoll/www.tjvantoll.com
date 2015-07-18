---
layout: post
title: "Using the Attribute Selector with Numeric Values"
comments: true
---

What color will the number 3 be in the example below?

<pre class="language-markup"><code class="language-markup">&lt;style&gt;
    td { color: red; }
    td[colspan=2] { color: blue; }
&lt;/style&gt;

&lt;table&gt;
    &lt;tr&gt;
        &lt;td colspan="2"&gt;1&lt;/td&gt;
    &lt;/tr&gt;
    &lt;td&gt;
        &lt;td&gt;2&lt;/td&gt;
        &lt;td&gt;3&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
</code></pre>

Turns out it will be red because the `td[colspan=2]` selector does not match it.  Why?

<!--more-->

## Attribute Selector

Per the [CSS 3 specification](http://www.w3.org/TR/css3-selectors/#attribute-selectors) values used in attribute selectors must be either identifiers or strings.

String values are those enclosed by single or double quotes (e.g. the `2` in the selector `value="2"`).  If a value is not a string the browser attempts to resolve it as an identifier, which [the spec defines](http://www.w3.org/TR/CSS2/syndata.html#value-def-identifier) as such:

> “In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit.”

So why doesn't `colspan=2` work above?  The key part from the spec is that "*identifiers ... cannot start with a digit*".  Therefore, since `2` is not a string and does not qualify as an identifier, the browser ignores it.  This behavior is implemented consistently in all browsers.

The fix?  Simply wrap the value in quotes; both `td[colspan='2']` and `td[colspan="2"]` will match the cell in the example above.

## Numeric Attributes

Attributes that generally only have numeric values include `colspan`, `rowspan`, `cellpadding`, `cellspacing`, `min`, `max`, and `step`.  When using any of these attributes in an attribute selector ensure that you wrap the value in quotes.

## JavaScript

Most selector engines such as jQuery's sizzle will make the selector work regardless of whether the quotes are present.  `$('td[colspan=2]')` will return the cell in question in the example above.

However, if you are using native JavaScript though you will not be so lucky; `document.querySelectorAll('td[colspan=2]')` actually throws an error.

## Conclusion

Attributes with numeric values need to have quotes around them when using them in CSS or JavaScript.  When in doubt use quotes around attribute values; it never hurts, and there are some strange edge cases where omitting the quotes leads to unexpected behavior.  If you're looking for a more detailed writeup on when quotes are ok to omit checkout [Mathias Bynens' writeup on the topic](http://mathiasbynens.be/notes/unquoted-attribute-values).
