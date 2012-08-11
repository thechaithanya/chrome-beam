var BeamFile = function(filename,filetype,isDirectory,folderid,filesize,cloudService){
	this.name = filename;
	this.type = filetype;
	this.isDirectory = isDirectory;
	this.folder=folderid;
	this.filesize = filesize;
	this.cloudService= cloudService;
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
	createFileEntry:function(name,type,isDirectory,folderid,filesize,content) {
		var id = (this.currentFileCount())+1;
		var files = BeamStorageManager.getFilesCollection();
		files.push(new BeamFile(name,type,isDirectory,folderid));
		BeamStorageManager.setFilesCollection(files);
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

