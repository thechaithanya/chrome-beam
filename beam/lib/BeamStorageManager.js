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
      getUICollection:function() {
      		return this.getCollection(beamUIKey);
      }
   };
})();