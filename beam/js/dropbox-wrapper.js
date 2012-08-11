var dropboxUpload = function(path, contents, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	// dropbox.logOutDropbox();
	var upload = function() {
		dropbox.putFileContents(path, contents, success, error);
	};
	dropbox.authorize(upload, error);

};
