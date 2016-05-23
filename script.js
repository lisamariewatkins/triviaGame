var triviaArray = [{
	name: "Mark Bradford",
	title: "Let's Walk to the Middle of the Ocean",
	img: "mb.jpg",
	choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Mark Bradford"]
	}
]

var targetArtist = triviaArray[Math.floor(Math.random()*triviaArray.length)];

//Fischer-Yates Shuffle
function shuffleAnswers(array){
	var i = 0
	var j = 0
	var temp = null

	for (i = targetArtist.choices.length - 1; i > 0; i-=1){
    j = Math.floor(Math.random() * (i + 1))
    temp = targetArtist.choices[i]
    targetArtist.choices[i] = targetArtist.choices[j]
    targetArtist.choices[j] = temp
  	}

  	return temp
}

function populateQuestion(){
	$("#instructions").html(targetArtist.title);
	$("#image").html("<img class=artImage src='" + targetArtist.img + "'>");
	var list = shuffleAnswers(targetArtist.choices);
	$("#answerChoices").html(list);
}

$(document).ready(function(){
	$("#mainText").html("<h1>Museum of Modern Art Trivia Game</h1>");
	$("#instructions").html("Test your framiliarity with 20th century modern artists.  A photo of the artwork and the name of the artwork will be provided, just match the name of the artist to his or her piece.  All pieces in this trivia game were selected from the permanent collection of the Museum of Modern Art (MoMA) in New York City.  Press the button below to get started. <br><br><button class='button'>Begin</button>");

	$("button").on('click', function(){
		populateQuestion();
	});

});