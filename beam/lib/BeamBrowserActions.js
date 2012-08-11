function BeamBrowserActions = {
	processBrowserSaveAs:function(name,folderid,isDirectory,content,fileurl){
		//First Step: Dowloading the file to local storage
		//TODO:Ensure this id is not taken by next download
		var FILE_ID = BeamFileManager.currentFileCount()+1;
		var FILE_NAME = "BEAM_"+FILE_ID;

		if(!content){
			BeamDownloadManager.downloadFile(fileurl,FILE_NAME,onLocalSaveSuccess);
		} else {
			saveFileLocally(content,"text",FILE_NAME,onLocalSaveSuccess);
		}

		//Second_Step: Create an entery in the files collection
		function onLocalSaveSuccess(mimetype,filesize,data){
			var fileentry = BeamFileManager.createFileEntry(FILE_ID,FILE_NAME,mimetype,isDirectory,folderid,filesize,fileurl);
			if(fileentry.cloudService===DROPBOX_SERVICE_NAME){
				BeamCloudManager.dropbox.uploadFile(FILE_NAME, data, function(){
					console.log("Uploaded to Dropbox successfully;");
				}, function(e){
					console.log("Error in uploading to Dropbox "+e);
				});
			}		
		}
	}
}