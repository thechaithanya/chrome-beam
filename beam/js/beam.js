chrome.experimental.app.onLaunched.addListener(function() {
	chrome.app.window.create('beaminit.html', {
		'width' : 400,
		'height' : 500
	});
	var dropboxUpload = function(path, contents, success, error) {
		var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
		dropBox.setDefaultError(error);
		// dropbox.logOutDropbox();
		var upload = function() {
			dropbox.putFileContents(path, contents, success, error);
		};
		dropbox.authorize(upload, error);

	};

	dropboxUpload('/test.txt', 'contents', function() {
		alert('done');
	}, function() {
		alert('error');
	});
}); 