/*
 * All the UI related javascript event bindings are here
 */
 
$(document).ready(function() {
	
	renderDesktop();

	$('.draggable').draggable({containment: "parent"});
	
	$('body').on('mouseenter','.desktop-icon',function(){
		$('i',this).removeClass('icon-white');
	});
	$('body').on('mouseleave','.desktop-icon',function(){
		$('i',this).addClass('icon-white');
	});
		
	$('body').on('click','.desktop-folder',function(){		
		openNavigator($(this).parent().attr('beam-id'), $(this).parent().attr('title'));
	});
	
	$('body').on('click','#navigator-back-button',function(){
		backNavigator();
	});
});
