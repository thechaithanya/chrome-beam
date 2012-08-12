function saveToBeamHandler(info, tab)
{
	console.log(info);
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
		BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
		alert("Selected text: "+info.selectionText);
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
		BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
		alert("Selected link: "+info.linkUrl);
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
				BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				alert("Selected image: "+info.srcUrl); break;

			case 'video' :
				var enteredname = prompt("Enter file name");
				var options = {
					name: enteredname,
					folderid:3,
					content:null,
					isDirectory:false,
					fileurl:info.srcUrl
				}
				BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				alert("Selected image: "+info.srcUrl); break;

			case 'audio' : 
				var enteredname = prompt("Enter file name");
				var options = {
					name: enteredname,
					folderid:7,
					content:null,
					isDirectory:false,
					fileurl:info.srcUrl
				}
				BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
				alert("Selected image: "+info.srcUrl); break;	
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
			BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl,options.embedded);	
			alert("Youtube video:" + matches[1]);
		}
		
	}
}

chrome.contextMenus.create({"type": "normal", "title": "Save to Beam",
							"contexts": ["all"], "onclick": saveToBeamHandler
});
											