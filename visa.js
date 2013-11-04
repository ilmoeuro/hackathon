(function(){
var questions = [
];

function cap(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

var currQuestion, pisteet; // much var

var laskuri = 0;

$(function(){
	pisteet = 0;

	function loadQuestions() {
		for (var i = 0; i < postinumerot.length; i++) {
			var postinro = postinumerot[i];
			questions.push({
				text: "Minkä kunnan postinumero on:",
				detail: postinro.postcode,
				answer: postinro.region.toLowerCase()
			});
			
			if (postinro.name != postinro.region) {
				questions.push({
					text: "Minkä kunnan postitoimipaikka on:",
					detail: postinro.name,
					answer: postinro.region.toLowerCase()
				});
			}
		}
		
		//var 
		
		$.ajax({
			url: "uutiset.xml",
			dataType: "xml",
			success: function(data){
				$(data).find("entry").each(function() {
					var entry = $(this);
					$(this).children("category").each(function() {
						if ($(this).attr("term") == "etelä-savo") {
							questions.push({
								text: "Missä kunnassa seuraava uutinen tapahtui?",
								detail: entry.children('title').text(),
								answer: entry.children('kunta').text()
							});
						};
					});
				});
			}
		});
	}

	function showQuestion() {
		if (laskuri++ >= 20) {
			alert("Peli loppui! Pisteesi: " + pisteet);
			pisteet = 0;
			$("#edellinen-vastaus").html("");
			laskuri = 1;
		}
		var questionIndex = (Math.random() * questions.length) | 0;
		currQuestion = questions[questionIndex];
		$("#kysymys").html(currQuestion.text);
		$("#tiedot").html(currQuestion.detail);
		$("#pistemaara").html(pisteet + "");
		$("#laskuri").html(laskuri + "");
	}

	function processAnswer(answer) {
		var teksti = "Kysymykseen<br/>" + currQuestion.text
		teksti = teksti + "<br/>" + currQuestion.detail + "<br/>";
		teksti = teksti + "Vastaus " + cap(answer);
		if (answer == currQuestion.answer) {
			teksti = teksti + " oli oikein!";
			$("#edellinen-vastaus").html(teksti);
			$("#edellinen-vastaus").removeClass("vaara-vastaus");
			$("#edellinen-vastaus").addClass("oikea-vastaus");
			pisteet++;
		} else {
			teksti = teksti + " oli väärin!";
			teksti = teksti + "<br/> Oikea vastaus on: " + cap(currQuestion.answer);
			$("#edellinen-vastaus").html(teksti);
			$("#edellinen-vastaus").removeClass("oikea-vastaus");
			$("#edellinen-vastaus").addClass("vaara-vastaus");
		}
	}

	$(".vastausnappi").click(function(){
		var answer = $(this).attr("id").split("-")[1];
		var answerResult = processAnswer(answer);
		showQuestion();
	});

	loadQuestions();
	currQuestion = questions[0];
	showQuestion();

});
}());