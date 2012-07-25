---
layout: post
title: "DOM Element References as Global Variables"
date: 2012-07-19 22:33
comments: true
categories: [JavaScript, Browsers]
published: false
---

Quiz: What is going to be logged when the following markup is rendered?

``` html
<html>
    <head></head>
    <body>
        <button id="bar">Button</button>
        <script>
            console.log(bar);
        </script>
    </body>
</html>
```

Syntax error obviously, right?  Wrong.  All major browser rendering engines will log a reference to the `<button>` node.  This includes Trident (IE), Gecko (Firefox), WebKit (Chrome, Safari, etc), and Presto (Opera).

### Wait What?

Ah, I get it, there's no doctype on that markup.  So this a quirks mode only thing then right?  Wrong.  [As of Firefox 14](https://bugzilla.mozilla.org/show_bug.cgi?id=622491) the markup below will also log a reference to `<button>` node.

``` html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <button id="bar">Button</button>
        <script>
            console.log(bar);
        </script>
    </body>
</html>
```

### So What's Going On?

Believe it or not this is actually correct behavior per the HTML specification.

{% blockquote HTML Specification http://www.whatwg.org/specs/web-apps/current-work/#named-access-on-the-window-object %}
6.2.4 Named access on the Window object

The Window interface supports named properties. The supported property names at any moment consist of:

> the value of the name content attribute for all a, applet, area, embed, form, frame, frameset, iframe, img, and object elements in the active document that have a name content attribute, and
> the value of the id content attribute of any HTML element in the active document with an id content attribute.
{% endblockquote %}

What this is saying is that the value of the `name` attribute of certain elements and the value of the `id` attribute of ALL elements are accessible via the `window` object in the browser.  So, if you have a node `<button id="foo"></button>`, then `window.foo` will be a reference to the `<button>`.

### How is This Standard Behavior?

This behavior is an old Internet Explorer *feature*.  I can only imagine that it was intended to be a convenience for web developers that got sick of typing `document.getElementById` over and over again.  Regardless of the reasoning, IE shipped with this functionality and people used it in masses.

Other rendering engines were forced with the difficult decision of implementing non-standard behavior or remaining incompatible with a slew of websites written specifically for Internet Explorer.  

The reasonable decision seems to be to enable this only in quirks mode.  Gecko took this approach until Firefox 14 shipped.  [Webkit recently considered doing this](https://www.w3.org/Bugs/Public/show_bug.cgi?id=11960), however, they decided on leaving it enabled in standards mode.  There's just too much stuff still out there that still relies on this behavior to relegate it to quirks mode.  Microsoft even [shipped a marketing demo](https://bugzilla.mozilla.org/show_bug.cgi?id=737760) that did.

### Why is This Behavior Bad?

I've alluded to the fact that this behavior is bad, but I've haven't gotten into details as to why.  Here goes:

#### There is a high potential to introduce bugs into the system.

Let's say you have some code that looks something like this:

``` html
<html>
    <head></head>
    <body>
        <input type="text" id="choice"></button>
        <script>
            var choice = 'foo';
            //Lots more JavaScript
            doSomethingVeryComplicated(choice);
        </script>
    </body>
</html>
```

Since a `choice` variable is being created, in this case `window.choice` will resolve to `foo` and not a reference to the `<input>`.  However, let's say that during a major refactor the `var choice = 'foo';` line is accidentally removed.

#### Things natively on the `window` object will win.

`<input id="location">` vs. window.location

#### Non-trivial cost for the browser to implement

#### Browsers have inconsistent implementations.

### What Can I Do?

Don't use this functionality.  If you see others use it tell them to stop, ridicule them, do whatever it takes.
