function saveToBeamHandler(info, tab)
{
	console.log(info);
	if(info.selectionText)
	{
		var enteredname = prompt("Enter file name");

		var options = {
			name: enteredname,
			folderid:0,
			content:info.selectionText,
			isDirectory:false,
			fileurl:null
		}
		BeamBrowserActions.processBrowserSaveAs(options.name,options.folderid,options.isDirectory,options.content,options.fileurl);
		alert("Selected text: "+info.selectionText);
	}
	else if(info.linkUrl)
	{
		alert("Selected link: "+info.linkUrl);
	}
	else if(info.mediaType)
	{
		switch(info.mediaType)
		{
			case 'image' : alert("Selected image: "+info.srcUrl); break;
			case 'video' : alert("Selected image: "+info.srcUrl); break;
			case 'audio' : alert("Selected image: "+info.srcUrl); break;
		}
	}
	else
	{
		pageUrl = info.pageUrl;
		
		// Special handling for Youtube videos
		matches = pageUrl.match(/(?:http:\/\/)?(?:(?:www\.)?youtube\.com\/watch\?)(?:.*)v=([a-zA-Z0-9_-]*)/);
		if(matches != null && matches.length > 0)
		{
			alert("Youtube video:" + matches[1]);
		}
		
	}
}

chrome.contextMenus.create({"type": "normal", "title": "Save to Beam",
							"contexts": ["all"], "onclick": saveToBeamHandler
});
											