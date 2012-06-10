---
layout: post
title: "window.showModalDialog: What It is and Why You Should Never Use It"
date: 2012-05-02 22:37
comments: true
categories: JavaScript Browsers
---
Ah, 1997.  The first browser war was in full force, and Microsoft was busy adding proprietary new features to compete with Netscape Navigator.  One of those features was introducing a common OS UI element into the browser - modal dialogs.  Internet Explorer 4 launched with a ```showModalDialog``` method on the global ```window``` object.  When called it displays a dialog that the user has to deal with before interacting with the rest of the page.

Fast forward a few years and Internet Explorer had won the war, 95+ percent of us were using IE6.  Consequently a whole lot of web applications were designed around many of the proprietary features that IE had added.  Interestingly several of these have recently been added to the HTML5 specification including [innerHTML](http://www.w3.org/TR/html5/embedded-content-0.html#dom-innerhtml), [insertAdjacentHTML](http://html5.org/specs/dom-parsing.html#insertadjacenthtml%28%29), [outerHTML](http://html5.org/specs/dom-parsing.html#outerhtml), and… [window.showModalDialog](http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dialogs-implemented-using-separate-documents).

So now that ```window.showModalDialog``` has been standardized should you be using it?  

<strong>No.</strong>

In general the idea of putting a native dialog implementation into the browser was a really good idea, but  ```window.showModalDialog``` was a bad implementation that is riddled with issues and poor browser support.<!--more-->

### Modal Dialogs

So why did Microsoft add modal dialogs to begin with?  They're actually a heavily used UI element in most all computer interfaces.  Try to shut off your phone, tablet, laptop, etc.. and you're almost certainly going to be presented with a modal dialog asking you to confirm your decision before being allowed to shut it down.  What makes it modal is the fact that you are forced to make a selection before you do anything else.

It's oftentimes convenient from a usability stand point to get some form of feedback from a user before allowing them to continue.  ```showModalDialog``` was simply Microsoft's attempt to bring this UI element to the web.

### Implementation

To use the ```showModalDialog``` method you simply call it with a URL.

``` javascript window.showModalDialog Basic Usage
window.showModalDialog('http://google.com');
```

This will open up a modal dialog with Google loaded in it.  In and of itself this isn't all that useful.  Usually if you're showing a modal dialog you want to get some information back from it.  This is where the window.returnValue comes into play.

#### window.returnValue

``` html window.returnValue Example
<!-- page.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      var result = window.showModalDialog('modal.html');
      console.log(result); //'foo'
    </script>
  </head>
  <body>
  </body>
</html>

<!-- modal.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      window.returnValue = 'foo';
      window.close();
    </script>
  </head>
  <body>
  </body>
</html>
```

In this example when page.html is loaded it will immediately open up a modal dialog with modal.html loaded in it.  It will then block until the modal dialog returns control.  The JavaScript interpreter will literally pause execution as if you had a breakpoint set at that line of code and wait for the result of the modal dialog.

When modal.html loads it will assign a value of 'foo' to ```window.returnValue``` and close itself via ```window.close()```.  The opening window (page.html) will get control back, resume execution, and log the return value of 'foo'.

#### window.dialogArguments

If you want to pass information to the modal dialog you can do so via the second parameter of ```window.showModalDialog```.  Those values will be available in the modal dialog's ```window.dialogArguments``` property.

``` html window.returnValue Example
<!-- page.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      window.showModalDialog('modal.html', 'foo');
    </script>
  </head>
  <body>
  </body>
</html>

<!-- modal.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      alert(window.dialogArguments); //'foo'
      window.close();
    </script>
  </head>
  <body>
  </body>
</html>
```

#### Further Options

A third parameter to ```window.showModalDialog``` is available to customize the look and behavior of the modal dialog.  The [MDN article on showModalDialog](https://developer.mozilla.org/en/DOM/window.showModalDialog) has these well documented.

### Modal Dialog == A Brand New Window

Note that in all these examples modal.html is a full HTML document, not a snippet that is injected in.  This is a characterizing feature of ```window.showModalDialog```.  It's really just two completely separate windows communicating with each other.  The fact that you have two separate windows and DOMs means you don't have to worry about JS & DOM conflicts, which is appealing if you have a lot of bad JavaScript with a cluttered global scope.  But mostly this just adds unnecessary complexity, complicates the browser implementation, and contributes to a number of bugs (see below).

{% blockquote Ian Hickson (HTML 5 spec maintainer) http://www.mail-archive.com/public-webapi@w3.org/msg03345.html %}
"You should only use one browser window ever, as a Web app author."
{% endblockquote %}

### Browser Support

IE obviously supports this function and has since IE4, but what about the other browsers?  Firefox added support in version 3 and Safari added support in 5.1.  Opera doesn't support it at all.

Chrome has supported it since an early version but has some serious bugs with its implementation.  Most importantly the window Chrome displays isn't modal (see [Chromium bug #16045](http://code.google.com/p/chromium/issues/detail?id=16045)), meaning, the user is able to interact with the original window before dealing with the modal dialog, which kind of defeats the whole purpose.  Another big one is that ```window.returnValue``` will be lost if any sort of redirect or form submission is done in the modal dialog (see [Chromium bug #42939](http://code.google.com/p/chromium/issues/detail?id=42939)).

Despite these issues Chrome did do one thing right.  While it's important that modal dialogs prevent the user from interacting with the originating window, there's no reason the user shouldn't be allowed to interact with other tabs or native browser controls (back/forward, favorites, address bar, etc). Chrome is the only browser that allows this - IE, Firefox, and Safari do not.  This is actually a big annoyance to the end user.  IE, Firefox, and Safari don't even allow you to minimize or close the browser until you've dealt with the modal dialog.

### More Issues

#### Modal Dialog == Popup

The biggest issue with modal dialogs is that Firefox, Chrome, and Safari all treat them as popups by default and block them.  A user has to explictly allow the popup in order to see your modal dialog.  In my experience users usually get frustrated and leave at that point.

#### Debugging

The debugging experience for ```window.showModalDialog``` is horrible.  IE as recent as version 9 won't let you open their dev tools up in the modal dialog… at all.  Firefox, Chrome, and Safari will let you open FireBug / Web Inspector, but good luck debugging any script that happens when the dialog is opened.  You're basically forced to alert like it's 1999 to determine what's going on.  Also just a word of warning, IE <strong>LOVES</strong> to cache modal dialogs.

#### Mobile

Currently no major mobile browsers support ```window.showModalDialog```, so if you're looking for any sort of tablet / mobile support you need to stay away.

### Why was this added to HTML5?

So why have other browsers added support for this method and why was it added to the HTML5 spec?  It's mostly because in the IE6 days 1.2 bajillion applications were written to be extremely dependent on ```window.showModalDialog```.  I can say that I personally work at an enterprise that has its fair share of those applications, and you can see many comments demanding enterprise application support on the various Chrome bugs (see [#4202](http://code.google.com/p/chromium/issues/detail?id=4202), [#16045](http://code.google.com/p/chromium/issues/detail?id=16045), & [#42939](http://code.google.com/p/chromium/issues/detail?id=42939)).  

Refactoring these applications is no small task, and browsers that want to win market share are catering to them to gain support.

{% blockquote Ian Hickson http://www.mail-archive.com/public-webapi@w3.org/msg03363.html %}
"At this point, browsers have to support it, there's too much content out there that uses it."
{% endblockquote %}

### Better Alternatives

Given all the issues outlined above, it is not a good idea to use ```window.showModalDialog``` in new development (or any development for that matter).  So what should you use?  There's no shortage of choices, basically all JavaScript frameworks provide an alternative (see [Dojo](http://livedocs.dojotoolkit.org/dijit/Dialog), [MooTools](http://mootools.net/forge/p/ascribe_dialog), & [YUI](http://yuilibrary.com/yui/docs/overlay/)).

Personally I would highly recommend [jQuery UI's dialog](http://jqueryui.com/demos/dialog/).  It has a clean API, is highly customizable, extendable, and is themeable through [jQuery UI's theme roller](http://jqueryui.com/themeroller/).

### Moving Forward

When asked "What’s your fave feature that didn’t get into HTML 5 that you’d put into HTML 6?", Ian Hickson stated in a 2009 interview that:

{% blockquote Ian Hickson http://www.webstandards.org/2009/05/13/interview-with-ian-hickson-editor-of-the-html-5-specification/ %}
In-window modal dialogs or dialog box—the kind of prompt you get when the computer asks you a question and won’t let you do anything else until you answer the question. For instance, the window that comes up when you say "Save As…" is usually a modal dialog.

Right now people fake it with divs and complicated styles and script. It would be neat to just be able to say "make this section a modal dialog". Like showModalDialog(), but within the page instead of opening a new window with a new page.

I’d add it to HTML 5, but there are so many new features already that we need to wait for the browsers to catch up.
{% endblockquote %}

Good news, [the dialog element](http://dev.w3.org/html5/spec/commands.html#the-dialog-element) has recently been added to the HTML spec.  It includes a ```showModal``` method as well as a ```returnValue``` property that mimics ```window.returnValue```.  The bad news?  It will be a long time before this element is useable  in all browsers.  The good news?  This would be a relatively easy element to [polyfill](http://remysharp.com/2010/10/08/what-is-a-polyfill/), so once some implementations make their way into browsers, developers could make a functional version for older browsers with the same API.

### Conclusion

```window.showModalDialog``` is an old API that has been retroactively standardized; but that doesn't mean you should actually be using it.  If you're still maintaining code using this try to get off of it as soon as possible.  That being said the idea of having native dialog capabilities built into the browser wasn't a bad idea.  Hope may be on the way with the dialog element that was recently added to the HTML5 spec.