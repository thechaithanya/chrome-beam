/*
 * All the UI related javascript function definitions are here
 */

var navHistoryStack = new Array();
function renderNavigatorHTML(scandir, nav)
{
	var beamid = nav.beamId;
	var title = nav.title;
	return "
	
}
function openNavigator(beamid, title)
{
	var scandir = getDirectoryListing(beamid);
	if(scandir.length > 0)
	{
		currentNavigator = { beamId : beamid, title  : title };  
		navHistoryStack.push(currentNavigator);
		var html = renderNavigatorHTML(scandir, currentNavigator);		 			
		$('#navigator-modal').html(html);
		$('#navigator-modal').modal('show');
	}
} 
