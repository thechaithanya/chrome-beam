/*
 * All the UI related javascript event bindings are here
 */
 
$(document).ready(function() {
	$('.draggable').draggable({containment: "parent"});
	
	$('.desktop-icon').hover(function(){
		$('i',this).removeClass('icon-white');
	}, function(){
		$('i',this).addClass('icon-white');
	});
	
	$('.desktop-folder').click(function(){
		openNavigator($(this));
	});
});
