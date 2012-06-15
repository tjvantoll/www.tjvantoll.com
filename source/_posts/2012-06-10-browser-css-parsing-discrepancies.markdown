---
layout: post
title: "Browser CSS Parsing Discrepancies"
date: 2012-06-10 22:24
comments: true
categories: Browsers CSS
---
Possibly the most frustrating thing that can happen during web development is when things look or behave differently in different browsers for no apparent reason.

One of the major features of HTML5 is a [parsing algorithm](http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html) that specifies not only how to handle well formed markup, but also what to do with invalid HTML.

The [CSS specification](http://www.w3.org/TR/CSS2/syndata.html#parsing-errors) actually does the same.  In fact, it goes into explicit detail for how to handle a wide variety of nonsense syntax that it might encounter.  For example...

<!--more-->

**Declarations with unkown properties should be ignored.**

``` css
h1 { color: red; foo: bar; }

/* foo is an unkown property so the browser should interpret this as... */
h1 { color: red; }
```

**Illegal values should be ignored.**

``` css
h1 { float: 'foo'; }

/* foo is an invalid value for the float property and should be ignored */
```

These are just a sampling of what is specified.  The above rules are well documented and consistenly followed by all browsers.  Unfortunately that is not the case as we get into more complicated scenarios.

### Malformed Strings in CSS

Take a guess, what *should* happen with the following:

``` html
<div data-number="one">one</div>
<div data-number="two">two</div>​

<style>
	div { color: black; }
	/*Notice the missing double quote after the URL.*/
	[data-number='one'] { background: url("some-url); color: red; }
	[data-number='two'] { color: blue; }
	div { border: 2px solid black; }​
</style>
```
The relevant portion of the specification states that...

{% blockquote CSS Specification http://www.w3.org/TR/CSS2/syndata.html#parsing-errors %}
User agents must close strings upon reaching the end of a line (i.e., before an unescaped line feed, carriage return or form feed character), but then drop the construct (declaration or rule) in which the string was found.
{% endblockquote %}

Let's take this one rule at a time.

    background: url("some-url);

Per the spec you would expect the ```background``` to be ignored because of the malformed string, and it is in all browsers I tested.  

    color: red;

This is kind of in a gray area.  The spec says that the *construct in which the unclosed string was found* should be dropped, which makes it seem like this rule shouldn't be interpreted.   But what about subsequent rules that were encountered before a new line?  It seems like the browser could be smart enough to apply this rule.

    color: blue;

Per the spec you would expect this to be interpreted since a new line character occurred between the unclosed quote and this rule.

    border: 2px solid black;

Along the same lines you would also expect a border to be around both divs since by then normal parsing of the stylesheet should resume.

Here's what a sampling of browsers actually do.

<table>
    <thead>
        <tr>
        	<th>Browser</th>
        	<th>Div one color</th>
        	<th>Div two color</th>
        	<th>Border around the divs</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
    		<td>Chrome 19</td>
    		<td class="red">Red</td>
    		<td class="blue">Blue</td>
    		<td>Yes</td>
    	</tr>
        <tr>
            <td>Safari 5.1.7</td>
            <td class="red">Red</td>
            <td class="blue">Blue</td>
            <td>Yes</td>
        </tr>        
        <tr>
            <td>Firefox 12</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr>        
        <tr>
            <td>Opera 11.62</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Opera Mobile</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr> 
        <tr>
            <td>iOS 5</td>
            <td class="red">Red</td>
            <td class="blue">Blue</td>
            <td>Yes</td>
        </tr> 
        <tr>
            <td>Android 2+</td>
            <td class="red">Red</td>
            <td class="blue">Blue</td>
            <td>Yes</td>
        </tr> 
    	<tr>
    		<td>Internet Explorer 7</td>
    		<td>Black</td>
    		<td>Black</td>
    		<td>No</td>
    	</tr>
        <tr>
            <td>Internet Explorer 8</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Internet Explorer 9</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Internet Explorer 10</td>
            <td>Black</td>
            <td>Black</td>
            <td>No</td>
        </tr>        
    </tbody>
</table>

You can see what your browser does here.

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/tj_vantoll/PHKLz/3/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Results

WebKit based browsers are evaluating all rules after a semicolon is encountered and all other browsers stop in their tracks and don't evaluate any other rules.  The same results occur with some other common fat finger situations.

``` css
/* Notice the mix of single and double quote in the url property value. */
[data-number='one'] { background: url("some_url'); color: red; }
[data-number='two'] { color: blue; }
/* In WebKit browsers the color: blue; will be evaluated, in others it will not be. */

/* Same thing if there's an malfored selector (notice the missing single quote in the selector. */
[data-number=one'] { color: red; }
[data-number='two'] { color: blue; }
/* Again in Webkit color: blue; will be evaluated, in others it will not be. */
```

### What Could Possibly Go Wrong?

Frankly, since this is an error situtation I don't think many developers would care what the browser does with this.  If the rules aren't evaluated it becomes pretty clear there's an issue and it becomes pretty easy to find and clean up the issue.  What is important to developers is that the results are consistent.  The danger here is if you make a quick fix to a CSS file, fat finger some quotes, and only test in WebKit, you could catastrophically break your styling in non-WebKit browsers.

### Avoiding Issues

The obvious way to avoid running into issues is to test your code in all browsers.  However, with the number of browsers and devices there are to test on that's not always feasible, especially for trivial changes.

Modern editors with syntax highlighting can help you find malformed strings by creating an obvious syntax highlighting problem.  If yours doesn't you might want to consider switching to one that does.

Furthermore, tools like [CSS Lint](http://csslint.net/) can help detect issues [via your editor / IDE](https://github.com/stubbornella/csslint/wiki/IDE-integration) or at build time by [incorporating them into a Node.js or Ant build process](https://github.com/stubbornella/csslint/wiki/Command-line-interface).

### Conclusion

While the CSS specification tries to standarize what to do with invalid CSS browsers still handle some situations differently.  Make sure your editor or build process can help detect silly typos, and attempt to test your code in a variety of browsers, even for trivial changes.
