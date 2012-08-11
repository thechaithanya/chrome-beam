$(document).ready(function() {
	$('.draggable').draggable({containment: "parent"});
	$('.desktop-icon').hover(function(){
		$('i',this).removeClass('icon-white');
	}, function(){
		$('i',this).addClass('icon-white');
	});
});
