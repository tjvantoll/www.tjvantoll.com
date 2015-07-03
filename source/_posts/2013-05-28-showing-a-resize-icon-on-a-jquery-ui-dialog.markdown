---
layout: post
title: "Showing a Resize Icon on a jQuery UI Dialog"
date: 2013-05-28 21:09
comments: true
categories: [JavaScript, jQuery UI]
---

Upon [upgrading to jQuery UI 1.10](http://jqueryui.com/upgrade-guide/1.10/) you might notice a visual change to the dialog widget - the resize icon no longer displays by default:

Default dialog display in 1.9:

<img src="/images/posts/2013-05-28/dialog-1.9.png" alt="Default display of jQuery UI's dialog in version 1.9">

Default dialog display in 1.10:

<img src="/images/posts/2013-05-28/dialog-1.10.png" alt="Default display of jQuery UI's dialog in version 1.10">

<!-- more -->

The dialog is still resizable, the icon is just not displayed anymore. The change was made because when a dialog contains scrolling content, the scrollbar becomes very difficult to use when the resize icon is present, especially in Windows browsers (see [bug #4575](http://bugs.jqueryui.com/ticket/4575)).

The image below is of a version 1.9 dialog in IE9, note how the down arrow of the scrollbar and the resize icon are essentially on top of each other:

<img src="/images/posts/2013-05-28/ie9-dialog.png" alt="Display of a scrolling jQuery UI dialog in IE9.">

### Adding the Resize Icon Back

To get the icon back, you have to override the rules that position the icon:

<pre class="language-css"><code>.ui-dialog .ui-resizable-se {
    width: 14px;
    height: 14px;
    right: 3px;
    bottom: 3px;
    background-position: -80px -224px;
}
</code></pre>

This will display as follows:

{% demo /demos/2013-05-28/dialog.html Dialog_with_a_Resizable_Icon 300 %}

Remember that there is a reason the icon was removed from the default dialog. If you have scrolling dialogs, you should not add the icon.
