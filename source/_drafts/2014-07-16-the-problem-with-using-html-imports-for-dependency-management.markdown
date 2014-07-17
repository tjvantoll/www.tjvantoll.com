---
layout: post
title: "The Problem With Using HTML Imports For Dependency Management"
date: 2014-07-16 08:22
comments: true
categories: [Web Components]
---

HTML imports are cool. If you haven't heard of them before, you should read [Eric Bidelman's excellent introduction to them](http://www.html5rocks.com/en/tutorials/webcomponents/imports/), but they're pretty self explanatory with a bit of code. For example the following is how a jQuery UI dialog works in [my proof-of-concept web components port](https://github.com/tjvantoll/ui-web-components):

``` html
<link rel="import" href="ui-dialog.html">

<ui-dialog title="Hello World"></ui-dialog>
```

The cool thing here is not what you see—a `<link>` tag that imports a custom element—but rather, what you don't. Normally when using jQuery UI widgets, you have to worry about a number of JavaScript and CSS dependencies, such as jQuery Core, the widget factory, a CSS theme, and more. With HTML imports you don't, as the import takes care of bundling everything you need.

### OMG Awesome! What's the problem?

HTML imports transfer the dependency management burden from component consumers to component authors. This sounds good, until you think about *how* to actually reconcile those dependencies.

Suppose you want to write a component that depends on jQuery. How might you do that? Well the easiest way is to package jquery.js within your web component, and to reference it in your HTML import with a simple `<script>` tag:

``` html
<script src="jquery.js"></script>
```

This works, but it has a serious repercussion: jquery.js is bundled with your component. That means, with this approach, if a user imports five jQuery-dependent components, the browser will download jQuery five times. And because reducing HTTP requests is a vital web performance optimization, this is [kind of a big deal](https://www.youtube.com/watch?v=H8OxKx6zKkQ).

### What about de-duping?

De-duping, besides being an awesome word to say, is a mechanism built into HTML imports to prevent multiple requests for the same resource. That is, if multiple imports reference the same URL, the browser is smart enough to only retrieve the resource once.

The problem is that the de-duping mechanism only works on *exact* URL matches. Different domains, different protocols, different versions, and so forth are each enough to subvert the de-duping process.

The crux of the issue is, dependencies in HTML imports aren't strings like "jquery" and "bootstrap", they're URLs like "http://code.jquery.com/jquery-2.1.1.min.js" and "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"—and there's no way of knowing what the consumer of the component expects.

What's an HTML import with external dependencies to do? [Polymer's documentation](http://www.polymer-project.org/resources/faq.html) gives the following recommendation in its FAQ:

> "If multiple libraries want to share a dependency, they will have to agree on a system. Feature detection, or an agreed upon common location for a ‘jquery.html’ file in a CDN, etc."

At first glance this is laughable, as getting libraries to agree on *anything* in the web world has been painfully difficult, but I guess it's at least worth a discussion. What are our options for managing external dependencies in HTML imports?

### Options for managing external dependencies

To discuss our options, let's suppose that you want to build a `<formatted-time>` custom element as an HTML import, and you want to use [Moment.js](http://momentjs.com/) as part of your implementation.

Assuming that you don't package Moment.js as part of your component, and we've already seen why that's a bad idea, here are your options.

#### Option 1: Use a CDN

You could refer to Moment.js on some CDN, for instance the following `<script>` tag imports Moment.js from [cdnjs](http://cdnjs.com/):

```
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>
```

This approach works, but it has some major disadvantages. For one, the CDN approach only prevents multiple downloads of Moment.js if everyone magically chooses to retrieve Moment.js from the exact same URL—same CDN provider, same protocol, same version, and so forth. Second, the CDN reference also prevents the usage of script concatenation tooling, which is an essential performance optimization, especially for mobile. Because of this, I don't see CDNs as a viable option for managing external dependencies.

#### Option 2: Enforce a folder structure

The next option you have is enforcing a specific directory structure on the consumer of your component. For instance, you could enforce that users have a folder structure that looks like this:

```
.
├── momentjs
│   └── moment.js
└── formatted-time
    └── formatted-time.html
```

With this structure in place, your formatted-time.html file can reference moment.js using `<link rel="import" href="../momentjs/moment.js">`. This is exactly the strategy Polymer itself uses, as all Polymer core elements include an import of `<link rel="import" href="../polymer/polymer.html">` to get the dependencies they need.

This approach works well if your users manage their dependencies through a package manager such as Bower, as the package manager provides a defined structure you can rely on. But the reality is only a small fraction of the web uses Bower, and the developers that do often have build scripts in place to move files to locations that their servers and development environments require.

Enforcing a directory structure for dependencies can theoretically work, but it requires the community to agree on and standardize a directory structure to use, which is a tall task.

Worse, even agreeing on a directory structure isn't enough, as the exact file paths must match to prevent multiple downloads. If component A references `"../momentjs/moment.js"`, and component B references `"../momentjs/min/moment.min.js"`, the browser sees two different resources that need to be individually downloaded.

#### Option 3: Don't use HTML imports for external dependencies

The final option you have is to avoid using HTML imports to manage external dependencies. For the `<formatted-time>` example, this means not referencing moment.js in your component at all; you just assume that it's there and note that it's a requirement in your documentation—exactly like you do today.

Of course, this subverts the main purpose of building an HTML import—building a self-contained module—but at the moment I don't see a better option.

### Where to go from here?

I don't have the solution, but I think we need to be having this discussion if we want to see high quality HTML imports that don't have negative performance consequences. I'd love to hear your thoughts on this in the comments.
