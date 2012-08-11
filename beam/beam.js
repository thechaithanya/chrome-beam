chrome.experimental.app.onLaunched.addListener(function() {
	chrome.app.window.create('beaminit.html', {
		'width' : 400,
		'height' : 500
	});
	var dropboxUpload = function() {
		var dropBox = new Dropbox(btoa(DROPBOX_KEY+DROPBOX_SECRET));
	};
}); 