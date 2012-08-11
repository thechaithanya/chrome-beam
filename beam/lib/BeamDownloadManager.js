window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem( 
   		 PERSISTENT,       
    	 30 * 1024 * 1024,   
    	 this.onInitFs,            
    	 this.errorHandler
);

var BeamDownloadManager = {
	downloadFile:function(source){
		 
  		var xhr = new XMLHttpRequest(); 
	  	xhr.open('GET', source, true); 
	  	xhr.onprogress = function(){ 
	  		console.log("Downloading...")	
	  	}; 
	  	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	  	xhr.responseType = "arraybuffer"; 
	  	xhr.onreadystatechange = function () { 
	   	 if (xhr.readyState == 4) { 
	   	 	  console.log("Completed");
	    	  console.log(xhr.response); 
	    	  console.log(xhr.getResponseHeader("Content-Type"));
	    	  saveFileLocally(xhr.response,xhr.getResponseHeader("Content-Type"));
	     } 
	  	}; 
	  	xhr.send(null); 
	},
	onInitFs:function(fs) {
  		console.log('Opened file system: ' + fs.name);
	},
	errorHandler: function(e) {
		  var msg = '';

		  switch (e.code) {
		    case FileError.QUOTA_EXCEEDED_ERR:
		      msg = 'QUOTA_EXCEEDED_ERR';
		      break;
		    case FileError.NOT_FOUND_ERR:
		      msg = 'NOT_FOUND_ERR';
		      break;
		    case FileError.SECURITY_ERR:
		      msg = 'SECURITY_ERR';
		      break;
		    case FileError.INVALID_MODIFICATION_ERR:
		      msg = 'INVALID_MODIFICATION_ERR';
		      break;
		    case FileError.INVALID_STATE_ERR:
		      msg = 'INVALID_STATE_ERR';
		      break;
		    default:
		      msg = 'Unknown Error';
		      break;
		  };
		  console.log('Error: ' + msg);
	},
	
}

function saveFileLocally(data,mimetype) {
		 window.requestFileSystem.root.getFile("filename1", {create: true}, 
			function(fileEntry) { 
			      fileEntry.createWriter(function(writer) {  // FileWriter 
			      writer.onprogress = function() { console.log("Writing to file...") };  
			      writer.onwrite = function(e) {console.log("Write completed.")};  
			      writer.onerror = function(e) { }; 
			      var bb = new BlobBuilder(); 
			      bb.append(data); 
			      writer.write(bb.getBlob(mimetype)); 
			    }, this.errorHandler); 
			}
		); 
}