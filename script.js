var triviaArray = [{
	name: "Mark Bradford",
	title: "Let's Walk to the Middle of the Ocean",
	img: "mb.jpg",
	choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Mark Bradford"]
	}
]

var guessedName;

var targetArtist = triviaArray[Math.floor(Math.random()*triviaArray.length)];

//Fischer-Yates Shuffle

function populateQuestion(){
	$("#instructions").html("<p id='title'>" + targetArtist.title + "</p>");
	$("#image").html("<img class=artImage src='" + targetArtist.img + "'>");
	for (var i = 0; i < targetArtist.choices.length; i++){
		$("#answerChoices").append("<p class='choices'>" + targetArtist.choices[i] + "</p>")
	}
	
}

function checkAnswer(){
	$(".choices").on('click', function(){
		var guessedName = $(this).valueOf();
		if (guessedName === targetArtist.name){
			alert("Correct! On to the next art piece!")
		}
		else{
			alert("Incorrect! Try again.")
		}
	});
}

$(document).ready(function(){
	$("#mainText").html("<h1>Museum of Modern Art Trivia Game</h1>");
	$("#instructions").html("Test your framiliarity with 20th century modern artists.  A photo of the artwork and the name of the artwork will be provided, just match the name of the artist to his or her piece.  All pieces in this trivia game were selected from the permanent collection of the Museum of Modern Art (MoMA) in New York City.  Press the button below to get started. <br><br><button class='button'>Begin</button>");

	$("button").on('click', function(){
		populateQuestion();
		checkAnswer();
	});

	

});