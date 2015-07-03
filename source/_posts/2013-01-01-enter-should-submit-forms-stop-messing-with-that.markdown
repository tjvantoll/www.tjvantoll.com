---
layout: post
title: "The Enter Key should Submit Forms, Stop Suppressing it"
date: 2013-01-01 15:54
comments: true
categories: [HTML, Accessibility]
---
I try to do most of my work and play on the internet with the keyboard.  In the course of my internet-ing there's one unfortunate trend that I've noticed; an increasing number of sites are not allowing the enter key to submit a form.  Before I tell you why you care, let's look at how this should work.

<!--more-->

### Enter = Submit

Take the following basic form:

<pre class="language-markup"><code>&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" name="name" id="name"&gt;
    &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;
</code></pre>

If you have focus in the textbox and hit enter, the form will be submitted automatically.  This behavior is consistent across all browsers and is known as implicit submission.  So why is this important?

### Accessibility

Implicit submission is vital to assistive technologies and impaired users that cannot use a mouse at all.  From the HTML5 specification:

{% blockquote HTML 5 specification http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#implicit-submission %}
There are pages on the Web that are only usable if there is a way to implicitly submit forms, so user agents [browsers] are strongly encouraged to support this.
{% endblockquote %}

The spec strongly encourages browsers to allow implicit submission; they all do.

### User Expectations

Many users have an expectation that implicit submission will just work.  Interfering with this leads to a negative user experience for these users.

### How to Prevent Implicit Submission

What are sites doing to keep this from happening?  Here's a few things I've seen.

#### No Submit Buttons

Many sites do not have a submit button within the form.  From the spec here's how browsers determine what to do when enter is clicked.

{% blockquote HTML 5 specification http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#implicit-submission %}
If the user agent supports letting the user submit a form implicitly (for example, on some platforms hitting the "enter" key while a text field is focused implicitly submits the form), then doing so for a form whose default button has a defined activation behavior must cause the user agent to run synthetic click activation steps on that default button.
{% endblockquote %}

Basically, if the user hits enter when a text field is focused, the browser should find the first submit button in the form and click it.

{% blockquote HTML 5 specification http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#implicit-submission %}
If the form has no submit button, then the implicit submission mechanism must do nothing if the form has more than one field that blocks implicit submission, and must submit the form element from the form element itself otherwise.

For the purpose of the previous paragraph, an element is a field that blocks implicit submission of a form element if it is an input element whose form owner is that form element and whose type attribute is in one of the following states: Text, Search, URL, Telephone, E-mail, Password, Date and Time, Date, Month, Week, Time, Local Date and Time, Number
{% endblockquote %}

So, in a form with no submit buttons, implicit submission will be done if only one input is present.  Therefore, pressing enter in this textbox will submit the form:

<pre class="language-markup"><code>&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" name="name" id="name"&gt;
&lt;/form&gt;
</code></pre>

But in this form it will not because there are multiple fields:

<pre class="language-markup"><code>&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" name="name" id="name"&gt;
    &lt;label for="address"&gt;Address:&lt;/label&gt;
    &lt;input type="text" name="address" id="address"&gt;
&lt;/form&gt;
</code></pre>

Therefore, if you have a form with more than one input field, always include a submit button.  Specifically an `<input>` with the `type="submit"` attribute, or a `<button>` element should be present.  (Note: IE7 has a bug where the `type` attribute of a `<button>` defaults to `button` instead of `submit`.  Therefore for IE7 compatibility you'll need `<button type="submit">`.)

If you need to run some JavaScript before the form is submitted (validation, data manipulation, etc), do it in a `submit` event handler on the form, not a `click` handler on a button.

#### No &lt;form&gt;

I've seen a few forms that do not use the `<form>` HTML tag.  Why would they do that?

With modern day browsers and JavaScript libraries it's easy to send data to the server via AJAX.  Because an AJAX request does not require a true `<form>` tag, it is often omitted.  However, much like implicit submission, surrounding form data with a true `<form>` tag is vital for accessibility.  Most screen readers have a [mode specifically for filling out forms](http://www.htctu.fhda.edu/trainings/manuals/tutorials/readweb/forms.htm), and by omitting a true `<form>` tag you risk this mode not being activated.

#### Explicit Prevention

Finally, it's also quite easy to prevent implicit submission in JavaScript.  Take the following example:

<pre class="language-markup"><code>&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" name="name" id="name"&gt;
    &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;
&lt;script&gt;
    document.getElementById('name').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });
&lt;/script&gt;
</code></pre>

This sets up a `keypress` event handler that prevents the default action (implicit submission) from occurring when the enter key is pressed.

This technique can be handy.  For example, say you have a form with multiple submit buttons.  As we saw earlier, the implicit submission algorithm will click the first submit button that it finds.  Therefore, if you need control over which submit button is clicked, you can use the above technique to listen an for enter keypress, prevent the default action, then explicitly click the appropriate button.

Take the following example:

<pre class="language-markup"><code>&lt;form&gt;
    &lt;label for="age"&gt;Age:&lt;/label&gt;
    &lt;input type="number" min="0" max="120" name="age" id="age"&gt;
    &lt;button id="child"&gt;Child&lt;/button&gt;
    &lt;button id="adult"&gt;Adult&lt;/button&gt;
&lt;/form&gt;
&lt;script&gt;
    (function() {
        var age = document.getElementById('age');
        age.addEventListener('keypress', function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                if (age.value &gt; 20) {
                    document.getElementById('adult').click();
                } else {
                    document.getElementById('child').click();
                }
            }
        });
    }());
&lt;/script&gt;
</code></pre>

When enter is clicked in the number input, the `keypress` event handler determines which submit button is appropriate and clicks it.

While this technique can be handy, I've seen it used plenty of times to completely prevent implicit submission from working.  Don't do that.

### Conclusion

When filling out a form, pressing enter in a textbox should submit the form.  This is known as an implicit form submission.  Despite being vital for assistive technologies and an important user convenience, many web forms prevent it for one reason or another.  If you write web forms, please take a minute to ensure that the enter key can indeed be used to submit them; it'll help make the web a better place for everyone.
