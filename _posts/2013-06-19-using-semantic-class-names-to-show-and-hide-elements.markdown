---
layout: post
title: "Using Semantic Class Names to Show and Hide Elements"
comments: true
---

Showing and hiding elements has the potential to get complicated in large applications.

As a small example, say you have the following form that both displays a user's data as well as allows them to edit it:

<pre class="language-markup"><code class="language-markup">&lt;form&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;Account Information&lt;/legend&gt;
        
        &lt;div&gt;
            &lt;label for="name"&gt;Name:&lt;/label&gt;
            &lt;input type="text" id="name" value="TJ" required&gt;
            &lt;span class="display"&gt;TJ&lt;/span&gt;
        &lt;/div&gt;
        &lt;div&gt;
            &lt;label for="email"&gt;Email:&lt;/label&gt;
            &lt;input type="email" id="email" value="tj@somedomain.com" required&gt;
            &lt;span class="display"&gt;tj@somedomain.com&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="actions"&gt;
            &lt;button type="button" class="edit"&gt;Edit&lt;/button&gt;
            &lt;button type="submit" class="save"&gt;Save&lt;/button&gt;
            &lt;button type="button" class="cancel"&gt;Cancel&lt;/button&gt;
        &lt;/div&gt;
    &lt;/fieldset&gt;
&lt;/form&gt;
</code></pre>

<!-- more -->

Without any logic both states of the form display:

{% capture demo_height %}300{% endcapture %}
{% capture demo_path %}2013-06-19/initialForm{% endcapture %}
{% capture demo_title %}Initial form display{% endcapture %}
{% include post/demo.html %}

## Adding the Logic

Here's the goal. The Edit button should:

* Show the `<input>`s.
* Show the Save button.
* Show the Cancel button.
* Hide the Edit button.
* Hide the text in the `<span>`s.

The Cancel button should then undo these changes.

The traditional approach to this problem is to show and hide elements explicitly in JavaScript:

<pre class="language-javascript"><code class="language-javascript">$( ".edit" ).on( "click", function() {
    $( ".display, .edit" ).hide();
    $( ".cancel, .save, input" ).show();
});
$( ".cancel" ).on( "click", function() {
    $( ".display, .edit" ).show();
    $( ".cancel, .save, input" ).hide();
});
</code></pre>

To get the initial state of the form correct you also need some CSS:

<pre class="language-css"><code class="language-css">.cancel, .save, input {
    display: none;
}
</code></pre>

Because the list of elements has to be specified in JavaScript and CSS, this logic will be difficult to maintain. And this is for a trivial example; usually requirements are much more complex.

How can we make this better?

## Semantic Class Names

Instead of targeting individual elements in JavaScript, let's add a class name to the parent element that makes the most sense, in this case, the `<form>`:

<pre class="language-javascript"><code class="language-javascript">$( ".edit" ).on( "click", function() {
    $( this ).parents( "form" ).addClass( "editing" );
});
$( ".cancel" ).on( "click", function() {
    $( this ).parents( "form" ).removeClass( "editing" );
});
</code></pre>

Since the logic is simple, this can be written library-free as well (*note `classList` is not available in IE < 10*):

<pre class="language-javascript"><code class="language-javascript">(function() {
    var form = document.querySelector( "form" ),
        editButton = document.querySelector( ".edit" ),
        cancelButton = document.querySelector( ".cancel" );

    editButton.addEventListener( "click", function() {
        form.classList.add( "editing" ); 
    });
    cancelButton.addEventListener( "click", function() {
        form.classList.remove( "editing" ); 
    });
}());
</code></pre>

## Advantages of Using Semantic Classes

There are 2 major advantages to this approach.

1) All display logic is now handled in CSS:

<pre class="language-css"><code class="language-css">.cancel, .save, input {
    display: none;
}
.editing .save,
.editing .cancel,
.editing input {
    display: inline-block;
}
.editing .edit,
.editing .display {
    display: none;
}
</code></pre>

2) You have a styling hook that can be used to make further changes to the display. For example, you might want to bold the labels when editing:

<pre class="language-css"><code class="language-css">.editing label {
    font-weight: bold;
}
</code></pre>

The final display of the form looks like this:

{% capture demo_height %}300{% endcapture %}
{% capture demo_path %}2013-06-19/finalForm{% endcapture %}
{% capture demo_title %}Semantic class approach{% endcapture %}
{% include post/demo.html %}

## Conclusion

This is not a technique that I came up with but I've used it successfully in several large applications and have found that it scales well over time.

Do you have any other tricks you use to show & hide elements? If so, let me know in the comments.
