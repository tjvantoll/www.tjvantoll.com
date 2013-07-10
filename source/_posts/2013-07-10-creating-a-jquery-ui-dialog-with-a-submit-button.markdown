---
layout: post
title: "Creating a jQuery UI Dialog with a Submit Button"
date: 2013-07-10
comments: true
categories: [JavaScript, jQuery UI, HTML5]
---

Say you have the following submittable `<form>`:

``` html
<form id="myForm" action="http://google.com">
    <label for="search">Search For:</label>
    <input type="text" id="search" name="q">
    <button type="submit">Find</button>
</form>
```

And you want to show the form in a jQuery UI dialog. You can do that with the code below:

``` javascript Turning a form into a dialog
$( "form" ).dialog({
    open: function() {
        // On open, hide the original submit button
        $( this ).find( "[type=submit]" ).hide();
    },
    buttons: [
        {
            text: "Find",
            click: $.noop,
            type: "submit"
        },
        {
            text: "Close",
            click: function() {
                $( this ).dialog( "close" );
            }
        }
    ]
});
```

Which looks like this:

<img src="/images/posts/2013-07-10/form-dialog.png" alt="Display of the form within a jQuery UI dialog">

### The Problem

There's one problem with this - the "Find" button doesn't work. Because of the generated structure of a jQuery UI dialog, the buttons are not within the `<form>` itself. Therefore, the buttons are not associated with the `<form>`. You can see the structure below:

<!-- more -->

<img src="/images/posts/2013-07-10/markup.png" alt="Markup of a UI dialog showing the the buttons are not children of the content.">

Note that the `<button type="submit">` is not within the `<form>`.

### Solution

There are a few ways we can work around this. One is avoid the [buttons option](http://api.jqueryui.com/dialog/#option-buttons) and leave the original submit button in place. This works, but you lose the formatted display.

### Explicit Click Handler

Another solution is to add a `click` handler to the button that submits the form: 

``` js Using a Click Handler to Submit the Form
var form = $( "form" ).dialog({
    ...
    buttons: [
        {
            text: "Find",
            click: function() {
                form.submit();
            }
        }
        ...
    ]
});
```

This works, but you lose the browsers [browser's default enter key handling](/2013/01/01/enter-should-submit-forms-stop-messing-with-that/). Therefore it has to be replicated as well:

``` javascript Adding Enter Key Handling
var form = $( "form" ).dialog({ ... });
form.on( "keypress", "input[type=text]", function( event ) {
    if ( event.keyCode == 13 ) {
        form.submit();
    }
});
```

#### Form Attribute

An elegant solution to this problem is to use HTML5's new [form attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form). The attribute allows you to associate a `<form>` with a `<button>`, even if the `<button>` is not a descendant of the `<form>`. It's even smart enough to keep the [browser's default enter key handling](/2013/01/01/enter-should-submit-forms-stop-messing-with-that/) in place.

For example here's the example `<form>` with a sibling (rather than child) submit button:

``` html
<form id="myForm" action="http://google.com">
    <label for="search">Search For:</label>
    <input type="text" id="search" name="q">
</form>
<button type="submit" form="myForm">Find</button>
```

The `<button>` is outside of the `<form>`, but because its `form` attribute is equal to the `<form>`'s `id`, the `<button>` will submit the `<form>` regardless.

#### Using the Form Attribute on a Dialog

To add this attribute to the dialog version, we'll pass `form: "myForm"` into the `buttons` option for the Find button:

``` html Turning a form into a dialog
<form id="myForm" action="http://google.com">
    <label for="search">Search For:</label>
    <input type="text" id="search" name="q">
    <button type="submit">Find</button>
</form>
<script>
    $( "form" ).dialog({
        open: function() {
            // On open, hide the original submit button
            $( this ).find( "[type=submit]" ).hide();
        },
        buttons: [
            {
                text: "Find",
                click: $.noop,
                type: "submit",
                form: "myForm" // <-- Make the association
            },
            {
                text: "Close",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
</script>
```

[Live Example](/demos/2013-07-10/form.html)

### Support

The `form` attribute is implemented in Firefox, Chrome, Safari 5.1+, and Opera, HOWEVER, IE (as of version 10) still does not support the attribute.

Because the form attribute is so handy here, I wrote a polyfill that adds support in browsers that don't support it natively: [https://gist.github.com/tjvantoll/5911571](https://gist.github.com/tjvantoll/5911571). The source is below:

``` javascript
/**
 * The form attribute can be used to associate a submit button with a form, even
 * if the button is not a child of the <form> itself.
 * 
 * This polyfill uses a support check taken from Modernizr and polyfills the
 * functionality using jQuery.
 */
(function() {
    // Via Modernizr
    function formAttributeSupport() {
        var form = document.createElement( "form" ),
            input = document.createElement( "input" ),
            div = document.createElement( "div" ),
            id = "formtest"+ ( new Date().getTime() ),
            attr,
            bool = false;
        
            form.id = id;
        
        // IE6/7 confuses the form idl attribute and the form content attribute
        if ( document.createAttribute ) {
            attr = document.createAttribute("form");
            attr.nodeValue = id;
            input.setAttributeNode(attr);
            div.appendChild(form);
            div.appendChild(input);
        
            document.documentElement.appendChild(div);
        
            bool = form.elements.length === 1 && input.form == form;
        
            div.parentNode.removeChild(div);
        }
        
        return bool;
    };
    
    if ( !formAttributeSupport() ) {
        $( document )
            .on( "click", "[type=submit][form]", function( event ) {
                event.preventDefault();
                var formId = $( this ).attr( "form" ),
                $form = $( "#" + formId ).submit();
            })
            .on( "keypress", "form input", function( event ) {
                var $form;
                if ( event.keyCode == 13 ) {
                    $form = $( this ).parents( "form" );
                    if ( $form.find( "[type=submit]" ).length == 0 &&
                        $( "[type=submit][form=" + $( this ).attr( "form" ) + "]" ).length > 0 ) {
                        $form.submit();
                    }
                }
            });
    }
}());
```

This can be included anywhere on the page after jQuery is included.

Note that this polyfill only attempts to add support for the `form` attribute on submit buttons. The `form` attribute can also be applied to other form elements such as `<input>`s, `<select>`s, and `<textarea>`s, but that is beyond the scope of this script.

If you encounter any issues with this polyfill let me know in the comments.

### Conclusion

If you need a dialog with a submit button the easiest solution is to add a `click` handler that manually submits the form. While this is not ideal, it'll work everywhere with no extra effort. Just make sure that you add Enter key handling to text inputs within the `<form>`.

Long term the `form` attribute is the solution to this problem. You can try it today as long as you're aware that you need to polyfill for IE support.