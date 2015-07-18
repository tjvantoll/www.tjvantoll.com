---
layout: post
title: "Better Ways of Comparing a JavaScript String to Multiple Values"
comments: true
---

This is a seemingly simple programming task that we deal with everyday.  Here's the situation:

* 1) You have a string in JavaScript, like `var fruit = ''`.
* 2) You need to know if that string is equal to one of multiple values, say `"banana"` or `"lemon"` (because the yellow fruits need special yellow fruit processing or something).

Most people accomplish this by doing two string comparisons connected by a logical OR, which looks like this:

<pre class="language-javascript"><code class="language-javascript">if (fruit == 'banana' || fruit == 'lemon') {
    handleYellowFruit();
}
</code></pre>

Which works fine, but is a bit clunky.  I mean, you have to type `fruit ==` two whole times.  It also doesn't scale well.  Say your fruit processing product takes off and you need to support more fruit, now you have this:

<pre class="language-javascript"><code class="language-javascript">if (fruit == 'banana' || fruit == 'lemon' || fruit == 'mango' || fruit == 'pineapple') {
    handleYellowFruit();
}
</code></pre>

<!--more-->

This is getting a bit ugly.  Let's look at some other ways of accomplishing the same check.

## Switch

The switch statement can be used to achieve the same ends:

<pre class="language-javascript"><code class="language-javascript">switch (fruit) {
    case 'banana':
    case 'lemon':
    case 'mango':
    case 'pineapple':
        handleYellowFruit();
}
</code></pre>

This approach would be helpful if we have to handle for multiple classifications of fruits.  But for one check it's a lot of typing and takes up a lot of space.

## Array Based

ECMAScript 5 introduced an `indexOf` method on `Array.prototype` ([docs](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf)).  We can use this to create an array on the fly, then see whether the value matches one of the values in the array:

<pre class="language-javascript"><code class="language-javascript">if (['banana', 'lemon', 'mango', 'pineapple'].indexOf(fruit) >= 0) {
    handleYellowFruit();
}
</code></pre>

This is better, but still not ideal.  Understanding this code relies on the reader knowing that the `indexOf` method returns `-1`, which is not necessarily common knowledge.

Also, because `Array.prototype.indexOf` was added in ECMAScript 5, it's not present in IE <= 8.  Therefore, if you're supporting IE <= 8, you either need to add an `indexOf` method to the prototype yourself or use a library.

Speaking of libraries, most provide a cross browser means of finding values in an array.

### jQuery

[jQuery](http://jquery.com) provides an `inArray` method ([docs](http://api.jquery.com/jQuery.inArray/)):

<pre class="language-javascript"><code class="language-javascript">if ($.inArray(fruit, ['banana', 'lemon', 'mango', 'pineapple']) >= 0) {
    handleYellowFruit();
}
</code></pre>

### Underscore

[Underscore.js](http://underscorejs.org) provides a `contains` method ([docs](http://underscorejs.org/#contains)):

<pre class="language-javascript"><code class="language-javascript">if (_.contains(['banana', 'lemon', 'mango', 'pineapple'], fruit)) {
    handleYellowFruit();
}
</code></pre>

Other libraries provide similar methods.  Personally, I find Underscore's API to be the cleanest.  The contains API intuitively returns a boolean and there's not much to type.  You might however find yourself needing to remember the order of the parameters (does the array come first or the value?).

The check would be cleaner if the `contains` method were added to `Array.prototype` directly:

<pre class="language-javascript"><code class="language-javascript">Array.prototype.contains = function(obj) {
    return this.indexOf(obj) > -1;
};
</code></pre>

This allows the check to be:

<pre class="language-javascript"><code class="language-javascript">if (['banana', 'lemon', 'mango', 'pineapple'].contains(fruit)) {
    handleYellowFruit();
}
</code></pre>

## Regular Expressions

An often overlooked means of performing this check is to use regular expressions via `String.prototype.match` ([docs](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String)).

<pre class="language-javascript"><code class="language-javascript">if (fruit.match(/^(banana|lemon|mango|pineapple)$/)) {
    handleYellowFruit();
}
</code></pre>

This check clearly requires the least amount of typing.  It is also the most flexible as you can easily alter things like case sensitivity, special character handling, white space, etc.  This will work in all browsers and you don't have to worry about messing with the native prototypes.

While this is the most powerful option, it comes at a cost of being less readable.  I had to look up the `^` (match at the beginning of input) and `$` (match at the end of input) characters when writing this post.
