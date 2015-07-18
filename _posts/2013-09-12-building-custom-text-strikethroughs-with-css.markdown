---
layout: post
title: "Building Custom Text Strikethroughs with CSS"
comments: true
---
<link href="/css/posts/2013-09-12.css" rel="stylesheet">
Adding a strikethrough to a line of text in CSS is easy.

<pre class="language-markup"><code class="language-markup">&lt;style&gt;
    p { text-decoration: line-through; }
&lt;/style&gt;
&lt;p&gt;Hello World&lt;/p&gt;
</code></pre>

Which displays as follows:

<p class="example example-one">Hello World</p>

But what if you want the strikethrough line to be a different height, color, or whatever?

<!--more-->

## The Spec

The [CSS text-decoration spec](http://dev.w3.org/csswg/css-text-decor-3) defines two new properties for customizing strikethroughs - [`text-decoration-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color) and [`text-decoration-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style).

`text-decoration-style` can have values of `solid`, `double`, `dotted`, `dashed`, and my favorite - `wavy`.

Unfortunately these two properties are only implemented in Firefox and are behind a `-moz-` prefix. Here's how you can use the various `text-decoration-style` values in Firefox:

<pre class="language-markup line-numbers"><code class="language-markup">&lt;style&gt;
    p {
        text-decoration: line-through;
    }
    #solid {
        -moz-text-decoration-color: red;
        -moz-text-decoration-style: solid;
    }
    #double {
        -moz-text-decoration-color: blue;
        -moz-text-decoration-style: double;
    }
    #dotted {
        -moz-text-decoration-color: green;
        -moz-text-decoration-style: dotted;
    }
    #dashed {
        -moz-text-decoration-color: purple;
        -moz-text-decoration-style: dashed;
    }
    #wavy {
        -moz-text-decoration-color: orange;
        -moz-text-decoration-style: wavy;
    }
&lt;/style&gt;
&lt;p id="solid"&gt;solid&lt;/p&gt;
&lt;p id="double"&gt;double&lt;/p&gt;
&lt;p id="dotted"&gt;dotted&lt;/p&gt;
&lt;p id="dashed"&gt;dashed&lt;/p&gt;
&lt;p id="wavy"&gt;wavy&lt;/p&gt;
</code></pre>

Which looks like this (note the *sweet* `wavy` display):

<img src="/images/posts/2013-09-12/firefox-text.png">

## How to Do it Today... and Better

While the spec changes are certainly interesting, you can accomplish much more today with some basic CSS.

The easiest approach is to draw a line with the [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) or [`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) pseudo-elements and position them on top of the element itself. Here, this is implemented with a CSS class name:

<pre class="language-css"><code class="language-css">.strike {
    position: relative;
    display: inline-block;
}
.strike::before {
    content: '';
    border-bottom: 2px solid red;
    width: 100%;
    position: absolute;
    right: 0;
    top: 50%;
}
</code></pre>

This displays as follows:

<p class="example strike">Hello World</p>

From here you can play with the `border-color` and `border-height` properties to achieve the effect you'd like.

The one major caveat to this approach is it does not work on text that spans multiple lines. If you need multi-line strikeouts, you're stuck with plain old `text-decoration`.

But as long as your text is on one line, you can use this technique and be as crazy as you'd like. Here's an example that utilizes `::before` and `::after` and [CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) to create a cross out effect on the text.

<pre class="language-css"><code class="language-css">.cross {
    position: relative;
    display: inline-block;
}
.cross::before, .cross::after {
    content: '';
    width: 100%;
    position: absolute;
    right: 0;
    top: 50%;
}
.cross::before {
    border-bottom: 2px solid green;
    -webkit-transform: skewY(-10deg);
    transform: skewY(-10deg);
}
.cross::after {
    border-bottom: 2px solid blue;
    -webkit-transform: skewY(10deg);
    transform: skewY(10deg);
}
</code></pre>

Which displays as such.

<p class="example cross">Hello World</p>

So yeah, go crazy.
