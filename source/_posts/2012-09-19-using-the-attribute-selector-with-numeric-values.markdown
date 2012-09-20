---
layout: post
title: "Using the Attribute Selector with Numeric Values"
date: 2012-09-19 20:42
comments: true
categories: [CSS]
---

What color will the number 3 be in the example below?

``` html
<style>
    td { color: red; }
    td[colspan=2] { color: blue; }
</style>

<table>
    <tr>
        <td colspan="2">1</td>
    </tr>
    <td>
        <td>2</td>
        <td>3</td>
    </tr>
</table>
```

Turns out it will be red because the `td[colspan=2]` selector does not match it.  Why?

<!--more-->

### Attribute Selector

Per the [CSS 3 specification](http://www.w3.org/TR/css3-selectors/#attribute-selectors) values used in attribute selectors must be either identifiers or strings.

String values are those enclosed by single or double quotes (e.g. the `2` in the selector `value="2"`).  If a value is not a string the browser attempts to resolve it as an identifier, which the spec defines as such:

{% blockquote CSS 2.1 Specification http://www.w3.org/TR/CSS2/syndata.html#value-def-identifier %}
"In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit."
{% endblockquote %}

So why doesn't `colspan=2` work above?  The key part from the spec is that "*identifiers ... cannot start with a digit*".  Therefore, since `2` is not a string and does not qualify as an identifier, the browser ignores it.  This behavior is implemented consistently in all browsers.

The fix?  Simply wrap the value in quotes; both `td[colspan='2']` and `td[colspan="2"]` will match the cell in the example above.

### Numeric Attributes

Attributes that generally only have numeric values include `colspan`, `rowspan`, `cellpadding`, `cellspacing`, `min`, `max`, and `step`.  When using any of these attributes in an attribute selector ensure that you wrap the value in quotes.

### JavaScript

Most selector engines such as jQuery's sizzle will make the selector work regardless of whether the quotes are present.  `$('td[colspan=2]')` will return the cell in question in the example above.

However, if you are using native JavaScript though you will not be so lucky; `document.querySelectorAll('td[colspan=2]')` actually throws an error.

### Conclusion

Attributes with numeric values need to have quotes around them when using them in CSS or JavaScript.  When in doubt use quotes around attribute values; it never hurts, and there are some strange edge cases where omitting the quotes leads to unexpected behavior.  If you're looking for a more detailed writeup on when quotes are ok to omit checkout [Mathias Bynens' writeup on the topic](http://mathiasbynens.be/notes/unquoted-attribute-values).