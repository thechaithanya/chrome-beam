/*
Temoporary Storage Mangement 
*/

var beamStorageManager = (function () {
  
  var storageInstance;

  function init() {
    function privateMethod(){
        console.log( "I am private" );
    }
    var privateVariable = "Im also private";
    return {
      getUsedSpace: function () {
        webkitStorageInfo.queryUsageAndQuota(
			webkitStorageInfo.TEMPORARY,  
      		function(used,total){console.log(used/(1024*1024)+"MB");},
      		function(){console.log("Database Error")});
      },
      getTotalSpace: function () {
        webkitStorageInfo.queryUsageAndQuota(
			webkitStorageInfo.TEMPORARY,  
      		function(used,total){console.log(total/(1024*1024)+"MB");},
      		function(){console.log("Database Error")});
      },
      publicProperty: "I am also public"
    };
  };

  return {
    getInstance: function () {
      if ( !storageInstance ) {
        storageInstance = init();
      }
      return storageInstance;
    }
  };
})();

