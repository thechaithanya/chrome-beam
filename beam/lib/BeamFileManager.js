var BeamFile = function(filename,filetype,isDirectory,folderid,filesize,cloudService,fileurl){
	this.name = filename;
	this.type = filetype;
	this.isDirectory = isDirectory;
	this.folderid=folderid;
	this.filesize = filesize;
	this.cloudService= cloudService;
	this.fileurl = fileurl;
}

var BeamFileManager = {
	currentFileCount : function() {
			return BeamStorageManager.getFilesCollection().length;
	},
	getFileName:function(fileid) {
		BeamStorageManager.getFilesCollection()[fileid]["name"];
	},
	getFileType:function(fileid) {
		BeamStorageManager.getFilesCollection()[fileid]["type"];
	},
	createFileEntry:function(fileid,name,type,isDirectory,folderid,filesize,fileurl) {
		var files = BeamStorageManager.getFilesCollection();
		var cloudService = BeamCloudStorageAllocator.getAvailableCloudService();
		var newFileEntry = new BeamFile(name,type,isDirectory,folderid,filesize,cloudService,fileurl);
		files.push(newFileEntry);
		BeamStorageManager.setFilesCollection(files);
		return newFileEntry;
	},
	readDirectory:function(id){
		id = parseInt(id,10);
		var files = BeamStorageManager.getFilesCollection();
		var containingFiles = new Array();
		if(files[id].isDirectory) {
			for( key in files ) {
				if(files[key].folderid!=null && files[key].folderid===id){
					containingFiles[key]=files[key];
				}
			}
			return containingFiles;
		} else {
			console.log("Not a directory");
		}
	}
}