(function(){
var questions = [
	{text: "Missä sijaitsee seuraava postinumero?",
	 detail: "50190",
	 answer: "mikkeli"},
 	{text: "Missä sijaitsee seuraava postinumero?",
	 detail: "50120",
	 answer: "mikkeli"}
];

function cap(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

var currQuestion, pisteet;
currQuestion = questions[0];

$(function(){
	pisteet = 0;


	function showQuestion() {
		var questionIndex = (Math.random() * questions.length) | 0;
		currQuestion = questions[questionIndex];
		$("#kysymys").html(currQuestion.text);
		$("#tiedot").html(currQuestion.detail);
		$("#pistemaara").html(pisteet + "");
	}

	function processAnswer(answer) {
		if (answer == currQuestion.answer) {
			$("#edellinen-vastaus").html("Vastaus " + cap(answer) + " oli oikein!");
			pisteet++;
		} else {
			$("#edellinen-vastaus").html("Vastaus " + cap(answer) + " oli väärin!");
		}
	}

	$(".vastausnappi").click(function(){
		var answer = $(this).attr("id").split("-")[1];
		var answerResult = processAnswer(answer);
		showQuestion();
	});

	showQuestion();

});
}());