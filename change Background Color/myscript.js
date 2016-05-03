document.addEventListener("mouseover",function(e){
	console.log(e.target);
	// if("highlight" in e.target.getAttribute('class')){
	// 	return
	// }
	e.target.classList.add('highlight');

});
document.addEventListener("mouseout",function(e){
	console.log(e.target);
	// if("highlight" in e.target.getAttribute('class')){
		e.target.classList.remove('highlight');
	// }

	
});
