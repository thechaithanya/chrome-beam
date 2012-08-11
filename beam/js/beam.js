chrome.experimental.app.onLaunched.addListener(function() {
	chrome.app.window.create('beaminit.html', {
		'width' : 400,
		'height' : 500
	});

});

