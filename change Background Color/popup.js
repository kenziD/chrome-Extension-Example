document.addEventListener('DOMContentLoaded', function() {
	var button = document.querySelector('button');
	button.addEventListener("click",function(){
		console.log("click!");
		chrome.tabs.executeScript(null, {
		code: "document.body.style.backgroundColor=blue"
	});
	// window.close();
	});
});