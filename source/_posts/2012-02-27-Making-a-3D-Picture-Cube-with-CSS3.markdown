---
layout: post
title: Making a 3D Picture Cube with CSS3
comments: true
categories: CSS
---
<script src="{{ root_url }}/javascripts/prefixfree.min.js"></script>

Let's face it, the mere concept of doing something in 3D in the browser is pretty awesome.  For those of us that remember the good old days of font tags and spacer gifs… well, let's just say we've come a long way.

CSS3 3D transforms were recently added in Firefox 10 and [IE10's 3rd platform preview](http://blogs.msdn.com/b/ie/archive/2011/09/13/ie10pp3.aspx).  They've been in Safari since v4, in iOS since v3.2, and they're also supported in Android's recent Ice Cream Sandwich release.  So a decent chunk of web users now have the capability to run 3D transitions (at the time of this writing <a href="http://caniuse.com/#feat=transforms3d">caniuse.com</a> has it at ~32%).

So I decided I wanted to start messing around with this.
<!--more-->
<link href="/stylesheets/custom/posts/2012-02-27.css" rel="stylesheet" />
Note: Google Chrome supports 3D transforms, but [Modernizr will report a false positive](https://github.com/Modernizr/Modernizr/issues/240) if [Chrome has disabled GPU acceleration](http://blog.chromium.org/2011/03/gpu-acceleration-old-drivers.html).  So if you're using Chrome you may or may not see a warning at the top of the screen saying that the demos won't work (since I use Modernizr to detect whether to display that warning).  I've also found that if Chrome does disable hardware acceleration, some of the demos in this post are a bit choppy, and occasionally don't work.  That's one of the downsides with working something so new, all the kinks haven't been worked out quite yet.

### Getting Started

There are a few resources that I would recommend for getting started.

* [An Introduction to CSS 3D Transforms](http://24ways.org/2010/intro-to-css-3d-transforms) by David DeSandro.  This is an excellent starting point to learn the syntax and to see some [pretty](http://desandro.github.com/3dtransforms/examples/card-02-slide-flip.html) [sweet](http://desandro.github.com/3dtransforms/examples/cube-02-show-sides.html) [demos](http://desandro.github.com/3dtransforms/examples/carousel-02-dynamic.html).
* [CSS 3D cube with touch gestures, click and drag](http://www.paulrhayes.com/2010-09/3d-css-cube-ii-touch-gestures-click-and-drag/) by Paul Hayes.  Another excellent [demo](http://www.paulrhayes.com/experiments/cube-3d/touch.html) of a 3D cube that supports the keyboard, touch gestures, and dragging.
* [Mozilla Developer Network's entry on CSS Transforms](https://developer.mozilla.org/En/CSS/Using_CSS_transforms)

I decided that I wanted a way to show off pictures in the footer of this blog using 3D transforms.  The effect I decided on was having a cube with an image on all 6 sides that I could rotate through a JavaScript API.  More importantly, I wanted the solution to be something that other people could use and extend.

### Markup

The markup I ended up using was very similar to the cube in [David DeSandro's cube demo](http://desandro.github.com/3dtransforms/examples/cube-02-show-sides.html).

``` html Basic Markup
<div class="PictureCube-container">
	<div class="cube show-front">
		<figure class="front"><img src="1.jpg" /></figure>
		<figure class="back"><img src="2.jpg" /></figure>
		<figure class="right"><img src="3.jpg" /></figure>
		<figure class="left"><img src="4.jpg" /></figure>
		<figure class="top"><img src="5.jpg" /></figure>
		<figure class="bottom"><img src="6.jpg" /></figure>
	</div>
</div>
```

### Styling

I'm not going to go into the full details of how the styling to create the cubes works, those are best covered by the articles I linked to earlier, but I did want to give a high level overview of what's going on.  Here's a simplified version of the styles applied to each of the sides of the cube.

``` css Basic Styling
/* Vendor prefixes removed for readability */
.cube .front {
	/* No X/Y rotation needed since the front is */
	/* already facing forward. */
}
.cube .back {
	transform: rotateX( -180deg );
}
.cube .right {
	transform: rotateY( 90deg );
}
.cube .left {
	transform: rotateY( -90deg );
}
.cube .top {
	transform: rotateX( 90deg );
}
.cube .bottom {
	transform: rotateX( -90deg );
}
```

The front side doesn't need to be rotated since it's already facing the screen front and center, but all the other sides need to be rotated on either the X or Y axis to create the cube.  For example, the back side is rotated on the X axis -180 degrees so that it faces directly away from the screen.  

Since this is hard to visualize in your head, here's an example of a box rotating from 0deg to -180deg on the X axis in slow motion.

<div class="demo-container">
	<img id="demo-cube-1" class="demo-cube" src="/images/kids/2.jpg" />
</div>

And here's one going from 0deg to 90deg on the Y axis.

<div class="demo-container">
	<img id="demo-cube-2" class="demo-cube" src="/images/kids/1.jpg" />
</div>

Although I won't get into how the Z axis is used here, it's perhaps the hardest to visualize so I thought I'd include an example of it as well.  In 3D world it's the axis that's going straight between you and your monitor.   Here's an image going from -50px to 50px on the Z axis.

<div class="demo-container">
	<img id="demo-cube-3" class="demo-cube" src="/images/izzie/6.jpg" />
</div>

### Rotating the Cube

So the 6 sides themselves have now have been rotated to form the cube.  In order to show various sides of the cube to the user, the cube itself needs to be rotated to move the appropriate side to the front.  This will be done by applying classes to the cube, one for each side.

``` css Basic Classes for Rotation
/* Vendor prefixes removed for readability */
.cube.show-front {
	/* No X/Y translation is necessary */
}
.cube.show-back {
	transform: rotateX( -180deg );
}
.cube.show-right {
	transform: rotateY( -90deg );
}
.cube.show-left {
	transform: rotateY( 90deg );
}
.cube.show-top {
	transform: rotateX( -90deg );
}
.cube.show-bottom {
	transform: rotateX( 90deg );
}
```


### Designing an API

Now we have a cube but nothing to use to interact with it.  At the very least we need something to toggle the classes shown above to make the cube rotate.  Time to start designing a JavaScript API for the cube.

I started with a constructor function that takes the necessary information, a DOM node and an array of the URLs for the images to use on the cube.

``` javascript PictureCube Constructor
/**
 * @param node {DOMNode|string} The node to turn into the cube 
 *             or the id attribute of the node
 * @param images {Array} An Array of 6 Strings containing the URLs 
 *               of the images to place in the cube
 */
PictureCube = function( node, images ) { };
```

For convenience's sake I allow the user to pass in either a String id attribute of a DOM node or the node itself.  A quick conversion internally will make it so I only have to deal with the node.

``` javascript Getting the Node
typeof node == 'string' ? document.getElementById(node) : node
```

Next you need to be able to do things with the cube.  The things I wanted to do were the ability to go to a particular side, cycle through the sides at some interval, and the ability to clear that interval.

``` javascript Methods
/**
 * @param slide {number} The number of the side to change the 
 *              cube to.
 */
PictureCube.prototype.goto = function(side) {}

/**
 * @param interval {number} The number of milliseconds between each 
 *                 image transition
 */
PictureCube.prototype.cycle = function(interval) {};

PictureCube.prototype.clearCycle = function() {};
```

So to create the cube you call the constructor with the node you want the cube to be in and the images you want to be on the various sides of the cube.

``` javascript Instantiating a Cube
var myCube = new PictureCube(
	document.getElementById('cube-container'), 
	['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
]);
```

Then you can simply call the methods provided.

``` javascript Calling the Available Methods
myCube.goto(2);
myCube.cycle(2000);
myCube.clearCycle();
```

### What's with the prototype?

The methods are added to the function's prototype so PictureCube can be extended.  As an example here's an AwesomeCube extension that inherits functionality from PictureCube, and adds on an additional awesome method.

``` javascript Extending PictureCube
AwesomeCube = function(node, images) {
    PictureCube.apply(this, [node, images]);
};
AwesomeCube.prototype = new PictureCube();
AwesomeCube.prototype.awesome = function() {
    //this.cube, this.images, this.goto, this.cycle
    //and this.clearCycle are available to the new
    //function.
};
```

Line 1 defines AwesomeCube's constructor function with the same parameters as PictureCube.  It then invokes PictureCube's constructor using [function.apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply).  The apply function is defined in [Function.prototype](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function#Methods), and essentially allows you to control what the value of <code>this</code> will be in the function being invoked.  This technique is actually [a common way of implementing Java-like super calls to chain constructors](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply#Using_apply_to_chain_constructors).

If this syntax seems clunky to you, or you prefer a more classical inheritance model, there are plenty of "class" JS libraries available in various libraries, see [Dojo's](http://www.sitepen.com/blog/2010/07/01/creating-and-enhancing-dojo-classes/) and [MooTools'](http://mootools.net/docs/core/Class/Class) for examples.  In this case straight up JavaScript works just fine and I didn't want to add a dependency on a JS toolkit.

### Why isn't this a jQuery plugin?

jQuery is great for normalizing browser differences so you don't need to worry about them.  But in this case, the list of browsers that support CSS3 3D transformations have sufficient standards support that I had no need for jQuery.  Therefore, writing this as a jQuery plugin would add an unnecessary dependency on jQuery.  

Plus, jQuery plugins require some extra boilerplate to maintain state, which is necessary in this case.  [Using jQuery UI's widget factory](http://blog.nemikor.com/2010/05/15/building-stateful-jquery-plugins/) would work great, and might be something I consider if this implementation becomes more complex in the future.  But for now didn't want to add dependencies.

### Limitations

The current biggest limitation of the PictureCube implementation is that it has a hardcoded 100px height and 100px width.  Eventually I plan on moving these declarations from CSS to JS so that it can be adjusted on the fly.

### Putting it all Together

PictureCube.js is available to be forked or used on Github - [https://github.com/tjvantoll/PictureCube](https://github.com/tjvantoll/PictureCube).  I'm planning on adding the ability to alter the height and width of the cube in a future update.  Please give it a shot and let me know what you think.

Here's a final cube for you to play with.  Happy hacking.

<div id="playground">
	<div id="playground-cube"></div>
	
	<div class="form-row">
		<label for="goto">Go To:</label>
		<input type="text" size="2" maxlength="1" id="goto" />(1 - 6)
		<button onclick="playgroundCube.goto(parseInt(document.getElementById('goto').value, 10));">Go</button>
	</div>
	
	<div class="form-row">
		<label for="cycle">Cycle:</label>
		<input type="text" size="5" maxlength="5" id="cycle">(milliseconds)
		<button onclick="playgroundCube.cycle(parseInt(document.getElementById('cycle').value, 10));">Start Cycle</button>
		<button onclick="playgroundCube.clearCycle();">Stop Cycle</button>	
	</div>
</div>
