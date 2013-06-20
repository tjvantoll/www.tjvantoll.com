---
layout: post
title: "Using Semantic Class Names to Show and Hide Elements"
date: 2013-06-19 21:29
comments: true
categories: [JavaScript, CSS]
---

Showing and hiding elements has the potential to get complicated in large applications.

As a small example, say you have the following form that both displays a user's data as well as allows them to edit it:

``` html
<form>
    <fieldset>
        <legend>Account Information</legend>
        
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" value="TJ" required>
            <span class="display">TJ</span>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" value="tj@somedomain.com" required>
            <span class="display">tj@somedomain.com</span>
        </div>
        <div class="actions">
            <button type="button" class="edit">Edit</button>
            <button type="submit" class="save">Save</button>
            <button type="button" class="cancel">Cancel</button>
        </div>
    </fieldset>
</form>
```

<!-- more -->

Without any logic both states of the form display:

{% demo /demos/2013-06-19/initialForm.html Initial_Form_Display 300 %}

### Adding the Logic

Here's the goal. The Edit button should:

* Show the `<input>`s.
* Show the Save button.
* Show the Cancel button.
* Hide the Edit button.
* Hide the text in the `<span>`s.

The Cancel button should then undo these changes.

The traditional approach to this problem is to show and hide elements explicitly in JavaScript:

``` javascript
$( ".edit" ).on( "click", function() {
    $( ".display, .edit" ).hide();
    $( ".cancel, .save, input" ).show();
});
$( ".cancel" ).on( "click", function() {
    $( ".display, .edit" ).show();
    $( ".cancel, .save, input" ).hide();
});
```

To get the initial state of the form correct you also need some CSS:

``` css
.cancel, .save, input {
    display: none;
}
```

Because the list of elements has to be specified in JavaScript and CSS, this logic will be difficult to maintain. And this is for a trivial example; usually requirements are much more complex.

How can we make this better?

### Semantic Class Names

Instead of targeting individual elements in JavaScript, let's add a class name to the parent element that makes the most sense, in this case, the `<form>`:

``` javascript
$( ".edit" ).on( "click", function() {
    $( this ).parents( "form" ).addClass( "editing" );
});
$( ".cancel" ).on( "click", function() {
    $( this ).parents( "form" ).removeClass( "editing" );
});
```

Since the logic is simple, this can be written library-free as well (*note `classList` is not available in IE < 10*):

``` javascript
(function() {
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
```

### Advantages of Using Semantic Classes

There are 2 major advantages to this approach.

1) All display logic is now handled in CSS:

``` css
.cancel, .save, input {
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
```

2) You have a styling hook that can be used to make further changes to the display. For example, you might want to bold the labels when editing:

``` css
.editing label {
    font-weight: bold;
}
```

The final display of the form looks like this:

{% demo /demos/2013-06-19/finalForm.html Semantic_Class_Approach 300 %}

### Conclusion

This is not a technique that I came up with but I've used it successfully in several large applications and have found that it scales well over time.

Do you have any other tricks you use to show & hide elements? If so, let me know in the comments.
