var dropboxUpload = function(path, contents, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var upload = function() {
		dropbox.putFileContents(path, contents, success, error);
	};
	dropbox.authorize(upload, error);
};
var dropboxFileContents = function(path, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var contents = function() {
		dropbox.getFileContents(path, success, error);
	};
	dropbox.authorize(contents, error);

};
var dropboxDownloadLink = function(path, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var getLink = function() {
		dropbox.getDirectLink(path, success, error);
	};
	dropbox.authorize(getLink, error);

};