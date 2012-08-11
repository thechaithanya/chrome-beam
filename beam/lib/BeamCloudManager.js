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

/**
Dropbox API Integration
**/
var BeamDropboxManager = function(){
}

BEAM.extend(BeamDropboxManager,BeamCloudInterface);
BeamDropboxManager.prototype.uploadFile = function(path, contents, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var upload = function() {
		dropbox.putFileContents(path, contents, success, error);
	};
	dropbox.authorize(upload, error);
}

BeamDropboxManager.prototype.readFile = function(path, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var contents = function() {
		dropbox.getFileContents(path, success, error);
	};
	dropbox.authorize(contents, error);
}

BeamDropboxManager.prototype.downloadFileLink = function(path, success, error) {
	var dropbox = new Dropbox(DROPBOX_KEY, DROPBOX_SECRET);
	dropbox.setDefaultError(error);
	
	var getLink = function() {
		dropbox.getDirectLink(path, success, error);
	};
	dropbox.authorize(getLink, error);
}

/**
Skydrive API Integration
**/
var BeamSkydriveManager = function(){

}
BEAM.extend(BeamSkydriveManager,BeamCloudInterface);
BeamSkydriveManager.prototype.uploadFile = function() {


}

BeamSkydriveManager.prototype.downloadFile = function() {


}

/**
Boxnet API Integration
**/
var BeamBoxnetManager = function(){

}
BEAM.extend(BeamBoxnetManager,BeamCloudInterface);
BeamBoxnetManager.prototype.uploadFile = function() {


}

BeamBoxnetManager.prototype.downloadFile = function() {


}

/**
  Single access for all the cloud implementations.
**/
var BeamCloudManager = (function() {
	return {
		dropbox:new BeamDropboxManager(),
		skydrive:new BeamSkydriveManager(),
		boxnet:new BeamBoxnetManager()
	}
})();