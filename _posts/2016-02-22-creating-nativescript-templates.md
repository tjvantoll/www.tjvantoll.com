---
layout: post
title: Starting NativeScript Apps From Templates
comments: true
---

[NativeScript](https://www.nativescript.org/) 1.6 shipped with a new `--template` option for the `create` command. Let’s look at how it works.

## Using existing templates

The easiest way to use the `--template` option is to point it at an existing NativeScript template up on GitHub or npm. For instance, the [“tns-template-blank package” on npm](https://www.npmjs.com/package/tns-template-blank) makes it possible to create a completely blank NativeScript app:

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-blank</code></pre>

> **Note**: tns stands for **T**elerik **N**ative**S**cript.

## Using official templates

The NativeScript team makes several other templates available in addition to “tns-template-blank”. Here’s the full list.

### tns-template-blank

This is the template we already looked it. The template creates a NativeScript app with a minimal starting point.

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-blank</code></pre>

### tns-template-hello-world

This template creates a NativeScript app with a small hello world example in place. This is the default app you get if you run `tns create` without the `--template` option.

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-hello-world</code></pre>

### tns-template-hello-world-ts

This template creates a NativeScript app with the same hello world example, however, in this template the example is built with TypeScript.

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-hello-world-ts</code></pre>

### tns-template-master-detail

This template creates a NativeScript app with a very basic master-detail UI in place.

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-master-detail</code></pre>

### tns-template-tab-navigation

This template creates a NativeScript app with tab navigation setup.

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template tns-template-tab-navigation</code></pre>

### tns-template-hello-world-ng

This template creates a NativeScript app with Angular 2 support baked in. At the time of this writing, [NativeScript’s Angular 2 support](http://angularjs.blogspot.com/2015/12/building-mobile-apps-with-angular-2-and.html) is still in an alpha state; therefore, the NativeScript Angular 2 template is not on npm quite yet. However, the [template is on GitHub](https://github.com/NativeScript/template-hello-world-ng), and because the `--template` option supports also supports GitHub-hosted templates, you can use the following command to start a new NativeScript Angular 2 app:

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template https://github.com/NativeScript/template-hello-world-ng</code></pre>

## Creating your own templates

The official NativeScript templates are great shortcuts for starting your apps, but sometimes you need something a little more custom.

NativeScript templates themselves are essentially nothing more than the `app` folder of a NativeScript app. For instance, here’s the folder structure of an existing NativeScript app:

<pre class="language-shell"><code class="language-shell">.
└── my-app-name
    ├── app
    │   └── ...
    ├── node_modules
    │   └── tns-core-modules
    ├── package.json
    └── platforms
        ├── android
        └── ios</code></pre>

To build a NativeScript template, take all the code out of `app`, as well as the root `package.json` file, and place them in a new folder. The template folder structure should look something like this:

<pre class="language-shell"><code class="language-shell">.
└── nativescript-template-foo
    ├── App_Resources
    │   └── ...
    ├── main-page.js
    ├── main-page.xml
    ├── ...
    ├── app.css
    ├── app.js
    └── package.json</code></pre>

> **Note**: There’s no official naming convention for NativeScript templates, but I kind of like prefixing my NativeScript templates with “nativescript-template-” for discoverability.

If you get stuck, the [NativeScript hello world template on GitHub](https://github.com/NativeScript/template-hello-world) is a good reference for how to structure a template.

Once you have your template, if you upload the files to GitHub you can immediately use the template with the `--template` option. For example, this weekend I threw together a small NativeScript drawer template and [tossed it up on GitHub](https://github.com/tjvantoll/nativescript-template-drawer). Now, anyone can start a new NativeScript app that uses drawer navigation with the following command:

<pre class="language-shell"><code class="language-shell">tns create foo --template https://github.com/tjvantoll/nativescript-template-drawer</code></pre>

Even better, because I then [published the template to npm](https://www.npmjs.com/package/nativescript-template-drawer), you can use the same template with significantly fewer characters to type:

<pre class="language-shell"><code class="language-shell">tns create my-app-name --template nativescript-template-drawer</code></pre>

Cool, huh? If you have any questions about templates feel free to ask in the comments. And if you’d like to chat with me and the rest of the NativeScript community about templates, or whatever, [join our new fancy Slack channel](http://developer.telerik.com/wp-login.php?action=slack-invitation).
