function saveToBeamHandler(info, tab)
{
	console.log(info);
	var viewTabURL = chrome.extension.getURL('beaminit.html');
	var views = chrome.extension.getViews();
	var currentView = null;
	for(var i=0; i<views.length; i++) {
		var view = views[i];
		if(view.location.href == viewTabURL)
		{
			currentView = view;
			break;
		}
	}
	
	if(info.selectionText)
	{
		var enteredname = prompt("Enter file name");

		var options = {
			name: enteredname,
			folderid:1,
			content:info.selectionText,
			isDirectory:false,
			fileurl:null
		}
		console.log(options);
		currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);		
	}
	else if(info.linkUrl)
	{
		var enteredname = prompt("Enter file name");

		var options = {
			name: enteredname,
			folderid:4,
			content:null,
			isDirectory:false,
			fileurl:info.linkUrl
		}
		currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);		
	}
	else if(info.mediaType)
	{
		switch(info.mediaType)
		{
			case 'image' : 
				var enteredname = prompt("Enter file name");
				var options = {
					name: enteredname,
					folderid:2,
					content:null,
					isDirectory:false,
					fileurl:info.srcUrl
				}
				currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				break;	

			case 'video' :
				var enteredname = prompt("Enter file name");
				var options = {
					name: enteredname,
					folderid:3,
					content:null,
					isDirectory:false,
					fileurl:info.srcUrl
				}
				currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				break;				

			case 'audio' : 
				var enteredname = prompt("Enter file name");
				var options = {
					name: enteredname,
					folderid:7,
					content:null,
					isDirectory:false,
					fileurl:info.srcUrl
				}
				currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				break;	
		}
	}
	else
	{
		pageUrl = info.pageUrl;
		// Special handling for Youtube videos
		matches = pageUrl.match(/(?:http:\/\/)?(?:(?:www\.)?youtube\.com\/watch\?)(?:.*)v=([a-zA-Z0-9_-]*)/);
		if(matches != null && matches.length > 0)
		{
			var enteredname = prompt("Enter file name");
			var options = {
					name: enteredname,
					folderid:7,
					content:null,
					isDirectory:false,
					fileurl:matches[1],
					embedded:true
			}
			currentView.BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl,options.embedded);	
			alert("Youtube video:" + matches[1]);
		}
		
	}
}

chrome.contextMenus.create({"type": "normal", "title": "Save to Beam",
							"contexts": ["all"], "onclick": saveToBeamHandler
});
											