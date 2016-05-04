var recording = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.action);
	if(request.action=="get_status"){
		sendResponse({'recording': recording});
	}
	if(request.action=="start"){
		recording = true;
		sendResponse({'recording': recording});
	}
	if(request.action=="stop"){
		recording = false;
		sendResponse({'recording': recording});
	}
});