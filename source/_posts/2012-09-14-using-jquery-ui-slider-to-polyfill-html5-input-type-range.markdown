---
layout: post
title: "Using jQuery UI's Slider to Polyfill HTML5's input[type=range]"
date: 2012-09-14 21:25
comments: true
categories: [jQuery UI, HTML5, JavaScript]
---

[jQuery UI's slider plugin](http://jqueryui.com/demos/slider) looks and behaves much like the browser's native `input[type=range]` control; therefore it makes an excellent choice for [polyfilling](http://remysharp.com/2010/10/08/what-is-a-polyfill/) the native behavior.

### How to do it

The main issue is that the slider must be built on a block level node, not an `<input>`.  Therefore you must create another container node (in this case a `<div>`) to create the slider from then hide the original `<input>`.

Here's the script that I used.

<!--more-->

``` javascript Polyfill input[type=range] with jQuery UI's Slider
$(function() {
    //Determine whether the browser natively supports input[type=range].
    //If you're using Modernizr this is equivalent to Modernizr.inputtypes.range
    var input = document.createElement('input');
    input.setAttribute('type', 'range');
    var rangeSupport = input.type != 'text';
    
    if (!rangeSupport) {
        var $input, $slider;
        
        $('input[type=range]').each(function(index, input) {
            $input = $(input);
            
            //Create a new div, turn it into a slider, and set its attributes based on
            //the attributes of the input.  If the input doesn't possess those attributes
            //use jQuery UI's defaults.
            $slider = $('<div />').slider({
                min: parseInt($input.attr('min'), 10) || 0,
                max: parseInt($input.attr('max'), 10) || 100,
                value: parseInt($input.attr('value'), 10) || 0,
                step: parseInt($input.attr('step'), 10) || 1,
                slide: function(event, ui) {
                    //Keep the value of the input[type=range] in sync with the slider.
                    $(this).prev('input').val(ui.value);
                }
            });
        
            //Append the slider after the input and hide the input.  The user will only
            //interact with the slider.        
            $input.after($slider).hide();
        });
    }
});
```

### Future

This approach handles the most common use cases but it isn't perfect.  For example, if you want to disable the `<input type="range">` you'll have to disable the slider as well.

There is a [feature request to add support for this natively in the slider plugin](http://bugs.jqueryui.com/ticket/5800) itself, but it's been sitting inactive for quite some time now.  Hopefully over time `input[type=range]` support will become ubiquitous enough that we can drop these workarounds.
