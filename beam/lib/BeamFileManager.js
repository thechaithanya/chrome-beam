var BeamFile = function(filename,filetype){
	this.name = filename;
	this.type = filetype;
}

var BeamFileManger = {
	currentFileCount : function() {
			return BeamStorageManager.getFilesCollection().length;
	},
	getFileName:function(fileid) {
		BeamStorageManager.getFilesCollection()[fileid]["name"];
	},
	getFileType:function(fileid) {
		BeamStorageManager.getFilesCollection()[fileid]["type"];
	},
	createFileEntry:function(name,type) {
		var id = (this.currentFileCount())+1;
		var files = BeamStorageManager.getFilesCollection();
		files.push(new BeamFile(name,type));
		BeamStorageManager.setFilesCollection(files);
	}
}

