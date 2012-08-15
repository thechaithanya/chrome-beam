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
		var filefolderclass = "desktop-file";
		switch(obj.type)
		{
			case 'video'   : icon='icon-film'; break;
			case 'audio'   : icon='icon-music'; break;					
				
			case 'image/png' :
			case 'image/gif' :
			case 'image/jpeg': 
			case 'image'     : icon='icon-picture'; break;
			
			case 'favorite': icon='icon-heart'; break;
			case 'bookmark': icon='icon-bookmark'; break;
			
			case 'folder'  : icon='icon-folder-open'; filefolderclass='desktop-folder'; break;
			case 'drive'   : filefolderclass='desktop-folder'; break;
			case 'link'    : icon='icon-globe'; break;
			case 'email'   : icon='icon-envelope'; break;
			case 'file'    : icon='icon-file'; break;
			case 'unknown' : icon='icon-question-sign'; break;
			
			case 'text'    : icon='icon-font'; break;
			case 'archive' : icon='icon-briefcase'; break;
			case 'app'     : icon='icon-th-large'; break;
			default        : icon='icon-question-sign'; break;
		}
		if(obj.type==="drive") {
			html += '<div class="draggable desktop-element" beam-id="'+obj.beamId+'" title="'+obj.title+'"><div class="drive-image drive-icon '+filefolderclass+'"></div><p>'+obj.title+'</p></div>';
		}else if(obj.type==="folder"){
			html += '<div class="draggable desktop-element" beam-id="'+obj.beamId+'" title="'+obj.title+'"><div class="folder-image drive-icon '+filefolderclass+'"></div><p>'+obj.title+'</p></div>';	
		}
		else {
			html += '<div class="draggable desktop-element" beam-id="'+obj.beamId+'" title="'+obj.title+'"><div class="desktop-icon roundborder '+filefolderclass+'"><i class="'+icon+' icon-white"></i></div><p style="margin-top:-1px">'+obj.title+'</p></div>';
		}
	}	
	return html;					 	
}
function renderDesktop()
{
	/* Creating Desktop Folder and Music Folder */
	if(BeamFileManager.currentFileCount()==0) {
		BeamFileManager.createFileEntry(0,"CloudDrive","drive",true,1,null,null);
		BeamFileManager.createFileEntry(1,"Desktop","folder",true,0,null,null);
		BeamFileManager.createFileEntry(2,"Images","folder",true,1,null,null);
		BeamFileManager.createFileEntry(3,"Videos","folder",true,1,null,null);
		BeamFileManager.createFileEntry(4,"Bookmarks","folder",true,1,null,null);
		BeamFileManager.createFileEntry(5,"Documents","folder",true,1,null,null);
		BeamFileManager.createFileEntry(6,"PDF","folder",true,5,null,null);
		BeamFileManager.createFileEntry(7,"Music","folder",true,1,null,null);
	}
	var desktopfilesentries = BeamFileManager.readDirectory(1);
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
		openNavigator(nav.beamId, nav.title);
	}
}
function openFile(beamid)
{
<<<<<<< HEAD
	$('#navigator-modal').modal('hide');
=======
>>>>>>> 87476805e3aef927189f7e4f5f67c72c9e046bd5
	var file = BeamStorageManager.getFilesCollection()[beamid];
	var url = file.fileurl;
	var name = file.name;
	$('#file-opener-iframe > iframe').attr('src',url);	
	$('#file-opener-iframe .iframe-header').html("<h6>"+name+"</h6>");
	$('#file-opener-iframe').fadeIn();		
	$('#file-opener-iframe').draggable();
}
function closeCurrentFile()
{
	$('#file-opener-iframe').fadeOut();
	$('#file-opener-iframe > iframe').attr('src','');	
	$('#file-opener-iframe .iframe-header').html("");
}
