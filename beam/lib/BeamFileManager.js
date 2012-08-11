var BeamFile = function(filename,filetype,isDirectory,folderid,filesize,cloudService,fileurl){
	this.name = filename;
	this.type = filetype;
	this.isDirectory = isDirectory;
	this.folder=folderid;
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
		var newFileEntry = new BeamFile(name,type,isDirectory,folderid,fileurl);
		files.push();
		BeamStorageManager.setFilesCollection(files);
		return newFileEntry;
	},
	readDirectory:function(id){
		var files = BeamStorageManager.getFilesCollection();
		var containingFiles = new Array();
		if(files[id].isDirectory()) {
			for( key in files ) {
				if(files[key].folderid===id){
					containingFiles[key]=files[key];
				}
			}
			return containingFiles;
		} else {
			console.log("Not a directory");
		}
	}
}

