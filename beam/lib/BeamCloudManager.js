/*
 Parent Cloud Manager.
 Acts as the main cloud interface.
 All the implementation of various cloud APIs should extend this
 */
function BeamCloudInterface() {
}
BeamCloudInterface.prototype.uploadFile = function(){}
BeamCloudInterface.prototype.readFile = function(){}
BeamCloudInterface.prototype.downloadFileLink = function(){}
BeamCloudInterface.prototype.getRemainingSpace = function(){}

/**
 Dropbox API Integration
 **/
var BeamDropboxManager = function() {
}

BEAM.extend(BeamDropboxManager, BeamCloudInterface);
BeamDropboxManager.prototype.uploadFile = function(filename, contents, success, error) {
	var path = "/"+filename;
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);

	var upload = function() {
		dropbox.putFileContents(path, contents, success, error);
	};
	dropbox.authorize(upload, error);
}

BeamDropboxManager.prototype.readFile = function(filename, success, error) {
	var path = "/"+filename;
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);

	var contents = function() {
		dropbox.getFileContents(path, success, error);
	};
	dropbox.authorize(contents, error);
}

BeamDropboxManager.prototype.downloadFileLink = function(filename, success, error) {
	var path = "/"+filename;
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);

	var getLink = function() {
		dropbox.getDirectLink(path, success, error);
	};
	dropbox.authorize(getLink, error);
}

BeamDropboxManager.prototype.getSpaceRemaining = function(success,error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	var getSize = function() {
		var sizeSuc = function(quota){
			var remaining = (quota.quota_info.quota - quota.quota_info.normal - quota.quota_info.normal)/1024;
			success(remaining);
		}
		dropbox.getAccountInfo(sizeSuc,error);
	}
	dropbox.authorize(getSize, error);
}
/**
 Skydrive API Integration
 **/
var BeamSkydriveManager = function() {

}
BEAM.extend(BeamSkydriveManager, BeamCloudInterface);
BeamSkydriveManager.prototype.uploadFile = function() {

}

BeamSkydriveManager.prototype.downloadFile = function() {

}
/**
 Boxnet API Integration
 **/
var BeamBoxnetManager = function() {

}
BEAM.extend(BeamBoxnetManager, BeamCloudInterface);
BeamBoxnetManager.prototype.uploadFile = function() {

}

BeamBoxnetManager.prototype.downloadFile = function() {

}
/**
 Single access for all the cloud implementations.
 **/
var BeamCloudManager = (function() {
	return {
		dropbox : new BeamDropboxManager(),
		skydrive : new BeamSkydriveManager(),
		boxnet : new BeamBoxnetManager()
	}
})();
