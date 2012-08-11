/*
Parent Cloud Manager.
Acts as the main cloud interface.
All the implementation of various cloud APIs should extend this
*/
function BeamCloudInterface() {
}
BeamCloudInterface.prototype.uploadFile = function(){}
BeamCloudInterface.prototype.downloadFile = function(){}

/**
Dropbox API Integration
**/
var BeamDropboxManager = function(){

}
BEAM.extend(BeamDropboxManager,BeamCloudInterface);
BeamDropboxManager.prototype.uploadFile = function() {


}

BeamDropboxManager.prototype.downloadFile = function() {


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