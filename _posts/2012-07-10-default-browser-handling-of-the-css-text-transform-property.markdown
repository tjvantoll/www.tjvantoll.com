---
layout: post
title: Default Browser Handling of the CSS text-transform Property
comments: true
---

The `text-transform` CSS property is most frequently used to uppercase and lowercase text.  According to the [CSS 2.1 specification](http://www.w3.org/TR/CSS21/text.html#caps-prop) it is also an inherited property, meaning, when no value is specified on a given element, it should inherit its parent's `text-transform` value.

If no parents have a `text-transform` property defined, the element will take on the default value of `none`.

Where it gets interesting is that all browsers define default `text-transform` properties for certain form elements.  What does this mean?  <!--more-->Let's say you have the following markup:

<pre class="language-markup"><code class="language-markup">&lt;style&gt;
    div { text-transform: uppercase; }
&lt;/style&gt;

&lt;div&gt;
    &lt;input type="text" value="foo" /&gt;
    &lt;input type="submit" value="bar" /&gt;
&lt;/div&gt;
</code></pre>

Both `foo` and `bar` will appear lowercased in all major browsers.  You can see this for yourself below:

{% capture demo_height %}100{% endcapture %}
{% capture demo_path %}2012-07-10/default{% endcapture %}
{% capture demo_title %}Default text-transform behavior{% endcapture %}
{% include post/demo.html %}

This happens because all browser vendors include `text-transform: none` in their user agent stylesheet for those elements.  Therefore the `text-transform: uppercase` rule declared on the parent node is not inherited.

Unfortunately, but not surprisingly, browsers are not consistent about their default values for all elements.

## What the Browsers Do

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

The rendering engines that have a **No** for a given element declare no default for `text-transform`.  Therefore, those elements will inherit the value from their parent.

## What Does This Mean?

The browser differences occur on the `button` and `select` elements.  Therefore, if you apply a `text-transform` value to a node, AND that node has children `button` / `select` nodes, AND you do not apply a `text-transform` value to the `button` or `select` nodes themselves... you'll get different behavior in different browsers.

For example:

<pre class="language-markup"><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;style&gt;
            form { text-transform: uppercase; }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form&gt;
            &lt;!-- "foo" will be uppercase in IE, Firefox, and Opera --&gt;
            &lt;!-- "foo" will be lowercase in WebKit based browsers --&gt;
            &lt;button&gt;foo&lt;/button&gt;

            &lt;!-- "bar" will be uppercase in Firefox and Opera --&gt;
            &lt;!-- "bar" will be lowercase in IE and WebKit based browsers --&gt;
            &lt;select&gt;
                &lt;option&gt;bar&lt;/option&gt;
            &lt;/select&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

## Consistency

You could make arguments as to whether the user agent stylesheets *should* be defaulting the `text-transform` of various form elements to `none`, but to most people all that matters is that the behavior is consistent.  It's easy enough to override the defaults if you don't like them.

Therefore to get consistent behavior you would *think* you would need to set the default value of `button` and `select` elements to either `none` or `inherit`.

<pre class="language-css"><code class="language-css">/* Option 1 - Don't inherit values in all browsers */
button, select { text-transform: none; }

/* Option 2 - Inherit values in all browsers */
button, select { text-transform: inherit; }
</code></pre>

But unfortunately for whatever reason Option 2 doesn't work on the `<select>` in IE <= 7, Safari, and most interestingly, doesn't take effect in Chrome until you click on `<select>`.  You can verify this behavior for yourself below:

{% capture demo_height %}120{% endcapture %}
{% capture demo_path %}2012-07-10/select-button{% endcapture %}
{% capture demo_title %}Inherited behavior discrepancies{% endcapture %}
{% include post/demo.html %}

Fortunately Option 1 does indeed produce the same behavior in IE6+, Firefox, Chrome, Safari, and Opera.  Therefore to normalize `text-transform` you need to include the following in your stylesheet.

<pre class="language-css"><code class="language-css">button, select { text-transform: none; }
</code></pre>

### Update (January 21st, 2013)

A [pull request](https://github.com/necolas/normalize.css/pull/104) I sent for this change was accepted into [normalize.css](http://necolas.github.com/normalize.css/).
