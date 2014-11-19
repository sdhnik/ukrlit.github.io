/* =========================================================
// jquery.multimedia-portfolio.js
// Author: OpenStudio (Arnault PACHOT)
// Mail: apachot@openstudio.fr
// Web: http://www.openstudio.fr
// Copyright (c) 2007-2010 OpenStudio
// licence : GPL
========================================================= */
(function($) {

$.fn.multimedia_portfolio = function(options) {
	this.each(function(){
	if($(window).width() > 980) {
		var uniqueID = new Date();
		var rel_id=uniqueID.getTime();
		var mousewheelposition = 0;
		var defaultwidth = 320, defaultheight = 210;
		var jsFolder = "/ukrlit.github.io/js/vendor/";
		$(this).wrap("<div class='portfolio-container'></div>");
		var portfolio = $(this);
		var settings = { width: 700, nbelem: 3};
		if(options) $.extend(settings, options);
		
		var def_element_width = parseInt(settings.width/settings.nbelem);
		var portfolio_height = parseInt(settings.width/(settings.nbelem+1)+50);

		var elements = $(this).children().not('.portfolio-loading-bar');
		var borderwidth = parseInt(((settings.width)/900)*7);
		var titlesize = (def_element_width/366);
		$('.portfolio-container').prepend("<div class='portfolio-bg-left'>&nbsp;</div><div class='portfolio-bg-right'>&nbsp;</div>").append("<div class='masque-left'>&nbsp;</div><div class='masque-right'>&nbsp;</div>");
		if (elements.length > settings.nbelem) $('.portfolio-container').append("<div class='portfolio-bg-bottom-left'>&nbsp;</div><div class='portfolio-bg-bottom-right'>&nbsp;</div>");
		var ratio_largeur = ((elements.length*def_element_width - settings.width) / (elements.length*def_element_width));
		var touchlength = (ratio_largeur*settings.nbelem*(def_element_width*2))/settings.width;
		$(".portfolio-container").css("width", settings.width+'px');
		$(".portfolio-container").css("height", portfolio_height+'px');
		$(".portfolio-container").css("margin-top", -(portfolio_height / 2) + 12);
		if (elements.length > settings.nbelem) $(".multimedia-portfolio").addClass("border-bottom-blue");
		for ( var i = 0; i < elements.length; i++ ) {
				$(elements[i]).css('width', def_element_width+'px');
				$(elements[i]).find('img').not('.portfolio-mp3, .portfolio-loading-bar').each(function(){
				    $(this).addClass('img-type');
				});
				var currenthref, elementclass;
				if ((currenthref= $(elements[i]).children().filter("a").attr('href'))!= null) {
					var currentwidth = $(elements[i]).find('img').attr('width'); if (currentwidth==null) currentwidth=defaultwidth;
					var currentheight = $(elements[i]).find('img').attr('height'); if (currentheight==null) currentheight=defaultheight;
					var ratio = currentheight/(portfolio_height-68);
					currentwidth = parseInt(currentwidth/ratio);
					if (currentwidth > def_element_width-(borderwidth*2+6)) currentwidth = def_element_width-(borderwidth*2+6);
					currentheight = parseInt(currentheight/ratio);
					var currentstartimage = $(elements[i]).find('img').attr('src'); if (currentstartimage==null) currentstartimage='';
					var currenttitle = $(elements[i]).find('a').attr('title'); if (currenttitle==null) currenttitle='';
					var currenttext = $(elements[i]).find('.static').html();
						
					
					if (currenthref.toLowerCase().indexOf('.html') > 0) {

						if (currentstartimage=='') {
							currenttitle = '#'+currenttitle;
							currentstartimage='background-color:'+convertHex(currenttitle,70)+';'
						} else {currentstartimage = 'background-image: url('+currentstartimage+');'};
						var currentpadding = (currentheight / 4);
		      			$(elements[i]).find('a').removeAttr('title').html('<div class="link-block" style="padding:'+currentpadding+'px 5%; height:'+currentheight+'px; '+currentstartimage+'">' + currenttext + '</div>');						
		      			elementclass = 'portfolio-link';

					} else if (currenthref.toLowerCase().indexOf('.htm') > 0) {
						if (currentstartimage=='') {
							currenttitle = '#'+currenttitle;
							currentstartimage='background-color:'+convertHex(currenttitle,70)+';'
						} else {currentstartimage = 'background-image: url('+currentstartimage+');'};
						var currentpadding = (currentheight / 4);
		      			$(elements[i]).find('a').removeAttr('title').html('<div class="link-block" style="padding:'+currentpadding+'px 5%; height:'+currentheight+'px; '+currentstartimage+'">' + currenttext + '</div>');						
		      			elementclass = 'portfolio-txt';

					} else if (currenthref.toLowerCase().indexOf('.mp3') > 0) {
						$(elements[i]).empty().append('<div id="audioplayer'+i+'" class="audioplayer"><ul class="amazingaudioplayer-audios" style="display:none;"><li><div class="amazingaudioplayer-source" data-src="'+currenthref+'" data-type="audio/mpeg" /></li></ul></div></div>');
						currentstartimage = 'background-image: url('+currentstartimage+');'
						var currentpadding = (currentheight / 4);

						$(elements[i]).find('#audioplayer'+i).amazingaudioplayer({ jsfolder:jsFolder, skinsfoldername:"", titleinbarwidthmode:"fixed", timeformatlive:"%CURRENT% / LIVE", volumeimagewidth:24, barbackgroundimage:"", showtime:false, titleinbarwidth:80, showprogress:true, random:false, titleformat:"%TITLE%", height:600, loadingformat:"Loading...", prevnextimage:"img/prevnext-24-24-0.png", showinfo:false, imageheight:100, skin:"Bar", loopimage:"img/loop-24-24-0.png", loopimagewidth:24, showstop:false, prevnextimageheight:24, infoformat:"By %ARTIST% %ALBUM%<br />%INFO%", stopotherplayers:true, showloading:false, forcefirefoxflash:false, showvolumebar:true,   imagefullwidth:false, width:300, showtitleinbar:false, showloop:false, volumeimage:"img/volume-24-24-0.png", playpauseimagewidth:24, loopimageheight:24, tracklistitem:10, tracklistitemformat:"%ID%. %TITLE% <span style='position:absolute;top:0;right:0;'>%DURATION%</span>", prevnextimagewidth:24, tracklistarrowimage:"img/tracklistarrow-48-16-0.png", playpauseimageheight:24, showbackgroundimage:false, imagewidth:100, stopimage:"img/stop-24-24-0.png", playpauseimage:"img/playpause-24-24-0.png", showprevnext:false, backgroundimage:"", autoplay:false, volumebarpadding:8, progressheight:8, showtracklistbackgroundimage:false, titleinbarscroll:true, showtitle:false, defaultvolume:-1, tracklistarrowimageheight:16, heightmode:"auto", titleinbarformat:"%TITLE%", showtracklist:false, stopimageheight:24, volumeimageheight:24, stopimagewidth:24, volumebarheight:80, noncontinous:false, tracklistbackgroundimage:"", showbarbackgroundimage:false, showimage:false, tracklistarrowimagewidth:48, timeformat:"%CURRENT% / %DURATION%", showvolume:true, fullwidth:false, loop:0, preloadaudio:false });
						$(elements[i]).find('.audioplayer').addClass('mp3-type').attr('title', currenttitle).wrap("<span class='portfolio-mp3-container' style='width: "+(currentwidth-10)+"px; top: "+(currentheight-20)+"px; margin-left: -"+parseInt((currentwidth-10)/2)+"px;'></span>");
						$(elements[i]).find('span').wrap("<div class='link-block' style='height:"+currentheight+"px; "+currentstartimage+"'></div>")
						$(elements[i]).find('.link-block').prepend("<span class='bigtitle bigtitle-mp3'>"+currenttitle+"</span>")

						elementclass = 'portfolio-mp3';
					} else {
						if ($(elements[i]).find('img').length == 0 || $(elements[i]).find('.static').length != 0){
							if (currentstartimage=='') {
								currenttitle = '#'+currenttitle;
								currentstartimage='background-color:'+convertHex(currenttitle,70)+';'
							} else {currentstartimage = 'background-image: url('+currentstartimage+');'};
							var currentpadding = (currentheight / 4);
						    $(elements[i]).find('a').remove();
						    $(elements[i]).html('<div class="link-block" style="padding:'+currentpadding+'px 5%; height:'+currentheight+'px; '+currentstartimage+'">' + currenttext + '</div>');
						    elementclass = 'portfolio-static';
						}else{
							var urlimg = currenthref;
							currentstartimage = 'background-image: url('+currentstartimage+');';
							var currentpadding = (currentheight / 4);
							var currenttext = $(elements[i]).find('p').html();
						    $(elements[i]).find('a').remove();
						    $(elements[i]).html('<a href="'+urlimg+'" class="link-block" style="display:block;padding:'+currentpadding+'px 5%; height:'+currentheight+'px; '+currentstartimage+'"><p class="bigtitle">' + currenttext + '</p></a>');
							elementclass = 'portfolio-img';
						}
						
					}
					$(elements[i]).addClass(elementclass).find('.img-type, .flv-type, iframe').attr("width", currentwidth).attr("height", currentheight).wrap("<div class='portfolio-object-border' style='height:"+currentheight+"px'></div>");
				}
		};
		
		if (elements.length > settings.nbelem) {
		      $(".portfolio-container").append("<div class='slider-container' style='left: 66px; width:"+parseInt(settings.width-137)+"px'></div>");
		      $(".slider-container").append("<div class='ui-slider-1'></div>");
		      $(".ui-slider-1").css('width', '100%').append("<div class='ui-slider-handle'></div>");
		      $(".ui-slider-1").slider({steps: elements.length*settings.nbelem, start: 0, slide: function(e,ui) {
				    mousewheelposition = (elements.length * ui.value /100);
				    caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, true);
		      }});
		      $(".portfolio-container").mousewheel(function(event, delta) {
						      if (delta < 0) { mousewheelposition+=.3; if(mousewheelposition>elements.length) mousewheelposition = elements.length;
						      } else if (delta > 0) { mousewheelposition-=.3; if(mousewheelposition<0) mousewheelposition = 0;
						      }
						      caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);
						      
						      return false;
		      }).keypress(function(event) {  
			      if (event.keyCode == '9') {
				      return false;
			      } else if (event.keyCode == '37') {
				      mousewheelposition-=.3; if(mousewheelposition<0) mousewheelposition = 0;
				      caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);
				      
						     
			      } else if (event.keyCode == '39') {
				      mousewheelposition+=.3; if(mousewheelposition>elements.length) mousewheelposition = elements.length;
				      caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);	     
			      } 
		      }).on("swr",function(){
				      mousewheelposition-=touchlength; if(mousewheelposition<0) mousewheelposition = 0;
				      caroussel_portfolio_vue_mobile(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);
		      }).on("swl",function(){
				      mousewheelposition+=touchlength; if(mousewheelposition>elements.length) mousewheelposition = elements.length;
				      caroussel_portfolio_vue_mobile(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);	
		      });
		}
		
		$(".portfolio-img a").fancybox({padding: 1, 'onStart' : function() {$('.flv-type').css('visibility','hidden');}, 'onClosed': function(){caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);}});
		$(".portfolio-txt a").addClass('fancybox.iframe').fancybox({padding: 1, 'onStart' : function() {$('.flv-type').css('visibility','hidden');}, 'onClosed': function(){caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);}});
	} else {
		$(".logo").removeClass("col-xs-5");
		$(".parts").remove();
		$(".content-block").html("<div class='error404'><p class='text-404-first'>Даний додаток не працює при таких параметрах екрану</p><p class='text-404-second'>Мінімальна ширина екрану повинна бути 1024px</p><p class='text-404-threth'>Вибачте за незручність</p><p class='alarm'>Перезавантажте додаток</p></div>")
	}
	});
};

window.onload=function(){
(function(d){
 var
 ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
 nm=true,sp={x:0,y:0},ep={x:0,y:0},
 touch={
  touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
  touchcancel:function(e){nm=false}
 };
 for(var a in touch){d.addEventListener(a,touch[a],false);}
})(document);
}

function caroussel_portfolio_vue(current, portfolio, elements, settings, ratio_largeur, bslider) {
	 
	var decalage = parseInt(settings.width/settings.nbelem*current*ratio_largeur);
	for ( var i = 0; i < elements.length; i++ ) {
		$(elements[i]).find('.flv-type, .mp3-type, iframe').each(function() {
			if ( (((i*settings.width/settings.nbelem)-parseInt(decalage)) < 0) || (((i*settings.width/settings.nbelem)-parseInt(decalage)) > (settings.width-settings.width/settings.nbelem + 26)) ) {
				$(this).css('visibility','hidden');
			} else {
				$(this).css('visibility','visible');}
		});
	}
	portfolio.css('left',(-decalage)+'px');
	if (!bslider) $('.ui-slider-handle').css('left', parseInt((current/elements.length)*100)+'%');
};
function caroussel_portfolio_vue_mobile(current, portfolio, elements, settings, ratio_largeur, bslider) {
	 
	var decalage = parseInt(settings.width/settings.nbelem*current*ratio_largeur);
	for ( var i = 0; i < elements.length; i++ ) {
		$(elements[i]).find('.flv-type, .mp3-type, iframe').each(function() {
			if ( (((i*settings.width/settings.nbelem)-parseInt(decalage)) < 0) || (((i*settings.width/settings.nbelem)-parseInt(decalage)) > (settings.width-settings.width/settings.nbelem + 26)) ) {
				$(this).css('visibility','hidden');
			} else {
				$(this).css('visibility','visible');}
		});
	}
	portfolio.animate({'left':(-decalage)+'px'}, 800);
	if (!bslider) $('.ui-slider-handle').animate({'left': parseInt((current/elements.length)*100)+'%'}, 800);
};

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    if(hex.length == 3) {hex = hex+hex;}
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

})(jQuery);


