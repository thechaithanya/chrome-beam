var BeamCloudStorageAllocator = {
	getAvailableCloudService : function(contentsize) {
		return DROPBOX_SERVICE_NAME;
	 	try {
	 		var dropboxspace = BeamCloudManager.dropbox.getSpaceRemaining();
	 		if(contentsize<=dropboxspace) {
	 			return DROPBOX_SERVICE_NAME;
	 		}
	 		var skydrivespace = BeamCloudManager.skydrive.getSpaceRemaining();
	 		if(contentsize<=skydrivespace) {
	 			return SKYDRIVE_SERVICE_NAME;
	 		}
	 		var boxnetspace = BeamCloudManager.boxnet.getSpaceRemaining();
	 		if(contentsize<=boxnetspace) {
	 			return BOXNET_SERVICE_NAME;
	 		}
	 	} catch(e) {
	 		console.log("Error allocating space in cloud "+e.toString());
	 	}
	}
}