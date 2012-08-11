
/*
  Temporary Storage Mangement 
*/
var BeamStorageManager = (function () {
  //Currently using local storage
  var storageInstance = localStorage;
  var filesCollectionKey = "Beam_Files";
  var beamUIKey = "Beam_UI";

  function initializeStorage(){
  	storageInstance[filesCollectionKey]=JSON.stringify(new Array());
  	storageInstance[beamUIKey]=JSON.stringify({});
  	console.log("Storage Initialized");
  }

  return {
  	  init: initializeStorage,
      getUsedSpace: function(){

      },
      getTotalSpace: function(){

      },
      getCollection:function(collectionid){
      	try {
      			return JSON.parse(storageInstance[collectionid]);
      	} catch(e) {
      		console.log("Could not find the key in local storage");
      	} 
      },
      getFilesCollection:function() {
      		return this.getCollection(filesCollectionKey);
      },
      setFilesCollection:function(obj) {
      		storageInstance[filesCollectionKey] = JSON.stringify(obj);
      },      
      updateFilesCollection:function(key,value) {
          var data = this.getCollection(filesCollectionKey);
          data[key] = value;
          storageInstance[filesCollectionKey] = JSON.stringify(data);
      },
      getUICollection:function() {
      		return this.getCollection(beamUIKey);
      },
      updateUICollection:function(key,value) {
          var data = this.getCollection(beamUIKey);
          data[key] = value;
          storageInstance[beamUIKey] = JSON.stringify(data);
      },
      insertUICollection:function(key,value) {
          var data = this.getCollection(beamUIKey);
          data[key] = value;
          storageInstance[beamUIKey] = JSON.stringify(data);
      }
   };
})();

/*
Persistent Storage
*/
var BeamPersistentStorage;

function initPersistentStorage(){
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem( 
       PERSISTENT,       
       30 * 1024 * 1024,   
       function(fs){
        console.log('Opened file system: ' + fs.name);
        BeamPersistentStorage = fs;
       },            
       function(e) {
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
      }
    );
}

