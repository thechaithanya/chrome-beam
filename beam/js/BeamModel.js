/*
 * All the UI related javascript function definitions are here
 */
var navHistoryStack = new Array();
var currentNavigator = null;
function renderFilesHTML(files)
{
	var html = "";
	var count = files.length;
	for(var i=0; i<count; i++) {
		var obj = files[i];
		var icon = null;
		var folderclass = "";
		switch(obj.type)
		{
			case 'video'   : icon='icon-film'; break; 
			case 'image'   : icon='icon-music'; break;
			case 'favorite': icon='icon-heart'; break;
			case 'bookmark': icon='icon-bookmark'; break;
			case 'folder'  : icon='icon-folder-open'; folderclass='desktop-folder'; break;
			case 'link'    : icon='icon-globe'; break;
			case 'email'   : icon='icon-envelope'; break;
			case 'file'    : icon='icon-file'; break;
			case 'unknown' : icon='icon-question-sign'; break;
			case 'text'    : icon='icon-font'; break;
			case 'archive' : icon='icon-briefcase'; break;
			case 'app'     : icon='icon-th-large'; break;
			default        : icon='icon-question-sign'; break;
		}
		html += '<div class="draggable desktop-element" beam-id="'+obj.beamId+'" title="'+obj.title+'"><div class="desktop-icon roundborder '+folderclass+'"><i class="'+icon+' icon-white"></i></div><p>'+obj.title+'</p></div>';
	}	
	return html;					 	
}
function renderDesktop()
{
	/* Creating Desktop Folder amd Music Folder */
	if(BeamFileManager.currentFileCount()==0) {
		BeamFileManager.createFileEntry(0,"Desktop","folder",true,null,null,null);
		BeamFileManager.createFileEntry(1,"Images","folder",true,0,null,null);
		BeamFileManager.createFileEntry(2,"Videos","folder",true,0,null,null);
		BeamFileManager.createFileEntry(3,"Bookmarks","folder",true,0,null,null);
		BeamFileManager.createFileEntry(4,"Documents","folder",true,0,null,null);
		BeamFileManager.createFileEntry(5,"PDF","folder",true,4,null,null);
	}
	var desktopfilesentries = BeamFileManager.readDirectory(0);
	var desktopfiles = new Array();
	for(key in desktopfilesentries) {
		if(key!=undefined){
			desktopfiles.push({beamId:key,title:desktopfilesentries[key].name,type:desktopfilesentries[key].type});
		}
	}
	/*
	var desktopfiles = [ {beamId: '12345',
						  title : 'Hello World',
						  type  : 'image'},
						 {beamId: '13455',
						  title : 'Hello World 234234',
						  type  : 'folder'},
						 {beamId: '13256',
						  title : 'Hello World 3',
						  type  : 'link'} ];
	*/	 
	$('.desktop-container').html(renderFilesHTML(desktopfiles));
}
function renderNavigator(scandir, nav)
{
	/*
	var dirfiles = [ {beamId: '12345',
						  title : 'World',
						  type  : 'image'},
						 {beamId: '13455',
						  title : 'World 234234',
						  type  : 'folder'},
						 {beamId: '13256',
						  title : 'World 3',
						  type  : 'link'} ];
	*/
	$('#navigator-modal .modal-header .modal-title').html(nav.title);
	$('#navigator-modal .modal-body').html(renderFilesHTML(scandir));
	if(navHistoryStack.length > 0)
		$('#navigator-modal #navigator-back-button').removeAttr("disabled");
	else									  
		$('#navigator-modal #navigator-back-button').attr("disabled","disabled");
}
function getDirectoryListing(beamid)
{
	var desktopfilesentries = BeamFileManager.readDirectory(beamid);
	var desktopfiles = new Array();
	for(key in desktopfilesentries) {
		if(key!=undefined){
			desktopfiles.push({beamId:key,title:desktopfilesentries[key].name,type:desktopfilesentries[key].type});
		}
	}
	return desktopfiles;
}
function openNavigator(beamid, title)
{
	if(currentNavigator)
		navHistoryStack.push(currentNavigator);
		
	var scandir = getDirectoryListing(beamid);
	if(scandir.length > 0)
	{
		currentNavigator = { beamId: beamid, title: title };  							
		renderNavigator(scandir, currentNavigator);	 					
		$('#navigator-modal').modal('show');
	}
} 
function backNavigator()
{
	if(navHistoryStack.length > 0)
	{
		nav = navHistoryStack.pop();	
		currentNavigator = null;	
		console.log(nav);
		console.log(navHistoryStack);
		openNavigator(nav.beamId, nav.title);
	}
}
