---
layout: post
title: "Getting Started with Kendo UI Core"
date: 2014-12-26 13:49
comments: true
categories: [Kendo UI, JavaScript]
---

I've been using [Kendo UI Core](https://github.com/telerik/kendo-ui-core) in a number of side projects recently so I thought the process I use to get Kendo UI Core up and running. Note that this isn't the “right” way of doing things, just the workflow I like.

## Downloading

I download Kendo UI Core

`bower install kendo-ui-core`

Make sure to use kendo.ui.core.min.js and not kendo.ui.min.js

``` html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Getting Started with Kendo UI Core</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="bower_components/kendo-ui-core/styles/kendo.common.min.css">
	<link rel="stylesheet" href="bower_components/kendo-ui-core/styles/kendo.flat.min.css">
</head>
<body>

<label for="credit-card-number">Credit Card:</label>
<input id="credit-card-number">

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/kendo-ui-core/js/kendo.ui.core.min.js"></script>
<script>
	$( "input" ).kendoMaskedTextBox({
		mask: "0000 0000 0000 0000"
	});
</script>

</body>
</html>
```

`bower install requirejs`


`bower install almond`

