---
layout: post
title: "Replicating OS X's Failed Login Shake with CSS / jQuery UI"
date: 2013-06-16 23:01
comments: true
categories: [jQuery UI, CSS]
---

When you attempt log into an OS X account with incorrect information, the OS shakes the form itself to provide feedback that the credentials provided were invalid.

This is relatively easy to recreate with a CSS animation.

<!-- more -->

### CSS Approach

Say we have this basic login form:

``` html
<form>
    <div>
        <label for="username">Username:</label>
        <input id="username">
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password">
    </div>
    <input type="submit">
</form>
```

Next let's create a CSS animation to shake elements:

``` css
@-webkit-keyframes shake {
    0%, 100% { -webkit-transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { -webkit-transform: translateX(-10px); }
    20%, 40%, 60%, 80% { -webkit-transform: translateX(10px); }
}
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}
.shake {
    -webkit-animation: shake 0.5s;
    animation: shake 0.5s;
}
```

And add that class name in JavaScript when an invalid login attempt it detected:

``` javascript
(function() {
    function shakeForm() {
        // Remove the class so the animation can be run again.
        this.classList.remove( "shake" );

        // Browsers will not re-animate the form on subsequent calls unless this
        // is deferred so that it does not occur immediately after the class name
        // removal.
        setTimeout(function() {
            event.target.classList.add( "shake" );
        });
    };

    document.querySelector( "form" ).addEventListener( "submit", function( event ) {
        event.preventDefault();

        // Do whatever you need to determine whether the login credentials are
        // valid. This will likely involve a call to the server and the shaking will need
        // to be done in a callback of some variety.

        // if (!valid) { shakeForm(); }
    });
}());
```

The form below shows this technique:

{% demo /demos/2013-06-16/addClass.html CSS_Form_Shaking_Example 250 %}

This will work in [any browser that supports CSS animations](http://caniuse.com/#feat=css-animation).

### jQuery UI Approach

The main disadvantage of taking a CSS approach here is that the 

### Final Accessibility Notes


        // You should additionally apply some color changes and supply a textual message
        // to the user when an invalid submission occurs.
