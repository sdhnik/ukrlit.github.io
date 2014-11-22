$(document).ready(function(){
	var widthBlock = $('html').width();
	$("ul.multimedia-portfolio").multimedia_portfolio({width: widthBlock, nbelem: 4});
	$(".portfolio-container").niceScroll({cursorborder:"", cursorcolor:"#1f96c3", touchbehavior: true, autohidemode: false, cursordragontouch: true});
});