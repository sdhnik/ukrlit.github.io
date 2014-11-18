$(document).ready(function(){
		var i = 0;
		$('#prop').hide();

		var mydata = JSON.parse(data);
		var len = $.map(mydata, function(n, j) { return j; }).length;
		var correctAnswer;

		if(mydata[i].answer4 == '') {$('.quest4').hide()}else{$('.quest4').css('display', 'inline-block')}

		if (mydata[i].img == 'y') {
			$('.questcheckblock').addClass('img');
			$('.questlabel1').html('<img src="' + mydata[i].answer1 + '">');
			$('.questlabel2').html('<img src="' + mydata[i].answer2 + '">');
			$('.questlabel3').html('<img src="' + mydata[i].answer3 + '">');
			$('.questlabel4').html('<img src="' + mydata[i].answer4 + '">');
		}

		function loaddate() {
			$('input[type=checkbox]').prop('checked', false);
			$('.questcheckblock').removeClass('open').removeClass('img');
			$('.questchecktext').removeClass('correct').removeClass('no-correct');
			$('.questtext').html(mydata[i].text);
			if(mydata[i].answer4 == '') {$('.quest4').hide()}else{$('.quest4').css('display', 'inline-block')}
			if (mydata[i].img == 'y') {
				$('.questcheckblock').addClass('img');
				$('.questlabel1').html('<img src="' + mydata[i].answer1 + '">');
				$('.questlabel2').html('<img src="' + mydata[i].answer2 + '">');
				$('.questlabel3').html('<img src="' + mydata[i].answer3 + '">');
				$('.questlabel4').html('<img src="' + mydata[i].answer4 + '">');
			}else{
				$('.questlabel1').html(mydata[i].answer1);
				$('.questlabel2').html(mydata[i].answer2);
				$('.questlabel3').html(mydata[i].answer3);
				$('.questlabel4').html(mydata[i].answer4);				
			}
			$('.questnumber').html(i + 1);
			correctAnswer = parseInt(mydata[i].correctAnswer) + 1;

		}

		loaddate();

		$('input[type=checkbox]').click(function(){
			var id = $(this).attr('id');
			var number = id.substr(-1);
			$('.questcheckblock'  + number).addClass('open');

				if (number == correctAnswer) {
					$('.alert' + number).addClass('correct');
				} else {
					$('.alert' + number).addClass('no-correct');
				}
		});

		$("#next").click(function(){
			i++;
			if (i < len) {
				loaddate();
				$('#prop').css('display', 'inline-block');
				$(this).css('margin-left', '20px');
			} else {
				i = len - 1;
			}
			if (i == len - 1) {$(this).hide();$('#prop').css('display', 'inline-block');}
			return false;
		});

		$("#prop").click(function(){
			i--;
			if (i >= 0) {
				loaddate();
				$('#next').css('display', 'inline-block');
			} else {
				i = 0;
			}
			if (i == 0) {$(this).hide();$('#next').css({'display': 'inline-block', 'margin-left' : 0});}
			return false;
		});
});