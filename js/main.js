$(document).ready(function(){
	var widthBlock = $('.content-block').width();
	$("ul.multimedia-portfolio").multimedia_portfolio({width: widthBlock + 15, baseDir: '.', nbelem: 4});
});