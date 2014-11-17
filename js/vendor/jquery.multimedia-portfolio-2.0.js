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
		var uniqueID = new Date();
		var rel_id=uniqueID.getTime();
		var mousewheelposition = 0;
		var defaultwidth = 320, defaultheight = 210;
		$(this).wrap("<div class='portfolio-container'></div>");
		var portfolio = $(this);
		var settings = { width: 700, baseDir: '.', nbelem: 3
		};
		if(options) $.extend(settings, options);
		
		var def_element_width = parseInt(settings.width/settings.nbelem);
		var portfolio_height = parseInt(settings.width/(settings.nbelem+1)+50);

		var elements = $(this).children().not('.portfolio-loading-bar');
		var borderwidth = parseInt(((settings.width)/900)*7);
		var titlesize = (def_element_width/366);
		$('.portfolio-container').prepend("<div class='portfolio-bg-left'>&nbsp;</div><div class='portfolio-bg-right'>&nbsp;</div>").append("<div class='masque-left'>&nbsp;</div><div class='masque-right'>&nbsp;</div>");
		if (elements.length > settings.nbelem) $('.portfolio-container').append("<div class='portfolio-bg-bottom-left'>&nbsp;</div><div class='portfolio-bg-bottom-right'>&nbsp;</div>");
		var ratio_largeur = ((elements.length*def_element_width - settings.width) / (elements.length*def_element_width));
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
						$(elements[i]).empty().flash({swf: settings.baseDir+"/player_mp3_maxi.swf", flashvars: {mp3: currenthref, showslider: '1', width: (currentwidth-10), height: 20, bgcolor1: '1f96c3', bgcolor2: '1f96c3', buttoncolor: 'ffffff', buttonovercolor: '0d5e7c', slidercolor1: 'ffffff', slidercolor2: 'ffffff', sliderovercolor: '0d5e7c'}, wmode: 'transparent', width: (currentwidth-10), height: 20});
						currentstartimage = 'background-image: url('+currentstartimage+');'
						var currentpadding = (currentheight / 4);

						$(elements[i]).find('object').addClass('mp3-type').attr('title', currenttitle).wrap("<span class='portfolio-mp3-container' style='top: "+(currentheight-20)+"px; margin-left: -"+parseInt((currentwidth-10)/2)+"px;'></span>");
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
		      }).on("swipeleft",function(){
				      mousewheelposition-=.3; if(mousewheelposition<0) mousewheelposition = 0;
				      caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);
		      }).on("swiperight",function(){
				      mousewheelposition+=.3; if(mousewheelposition>elements.length) mousewheelposition = elements.length;
				      caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);	
		      });
		}
		
		$(".portfolio-img a").fancybox({padding: 1, 'onStart' : function() {$('.flv-type').css('visibility','hidden');}, 'onClosed': function(){caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);}});
		$(".portfolio-txt a").addClass('fancybox.iframe').fancybox({padding: 1, 'onStart' : function() {$('.flv-type').css('visibility','hidden');}, 'onClosed': function(){caroussel_portfolio_vue(mousewheelposition, portfolio, elements, settings, ratio_largeur, false);}});
		
	});
};

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


