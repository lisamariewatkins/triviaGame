var triviaArray = [{
		name: "Mark Bradford",
		title: "Let's Walk to the Middle of the Ocean",
		img: "mb.jpg",
		choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Mark Bradford"]
	},
	{
		name: "Vincent Van Gogh",
		title: "Starry Night",
		img: "vg.jpg",
		choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Vincent Van Gogh"]
	},
	{
		name: "Jackson Pollack",
		title: "Number One",
		img: "jp.jpg",
		choices: ["Vincent Van Gogh", "Georgia O'Keefe", "Pablo Picasso", "Jackson Pollack"]
	}

]

var originalTriviaArrayLength = triviaArray.length

var targetArtist; //I declare targetArtist as a global variable because I use it in multiple functions

var artistIndex; //same here

var wins = 0;

var number = 10;

var counter;

function questionTimer(){
	counter = setInterval(decrement, 1000);
}

function stop(){
	clearInterval(counter);
}

function decrement(){
	number--;
	$('#timer').html(number);
	if(number === 0){
		stop();
	}
}

function populateQuestion(){
	targetArtist = triviaArray[Math.floor(Math.random()*triviaArray.length)];
	artistIndex = triviaArray.indexOf(targetArtist); //the splice method called later needs two numbers, so i need to store the numerical index value of targetArtist
	//populate instructions/disply
	$("#instructions").html("<p id='title'>" + targetArtist.title + "</p>");
	$("#image").html("<img class=artImage src='" + targetArtist.img + "'>");
	//reset timer
	number = 10;
	//start timer
	questionTimer();
	//display timer
	for (var i = 0; i < targetArtist.choices.length; i++){
		$("#answerChoices").append("<p class='choices'>" + targetArtist.choices[i] + "</p>");
	}
}

function empty(){
	$("#instructions").empty();
	$("#image").empty();
	$("#answerChoices").empty();
	$("#timer").empty();
}

function checkAnswer(){
	$(".choices").on('click', function(){
		var guessedName = $(this).text();
		triviaArray.splice(artistIndex, 1); //removes artist so no duplicates
		stop();
		empty();
		if (guessedName === targetArtist.name){
			wins++;
			$("#instructions").html("<p>Correct! On to the next art piece!</p><br><button class='button'>Next piece</button>");
			}
		else{
			$("#instructions").html("<p>Incorrect!</p><br><button class='button'>Try again</button>");
		}
		if(triviaArray.length === 0){
		empty();
		$("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!")
	}
	});
}


$(document).ready(function(){
	$("#mainText").html("<h1>Museum of Modern Art Trivia Game</h1>");
	$("#instructions").html("<div id='initInstructions'>Test your framiliarity with 20th century modern artists.  A photo of the artwork and the name of the artwork will be provided, just match the name of the artist to his or her piece.  All pieces in this trivia game were selected from the permanent collection of the Museum of Modern Art (MoMA) in New York City.  Press the button below to get started.</div> <br><br><button class='button'>Begin</button>");

	$(".button").on('click', function(){
		populateQuestion();
		checkAnswer();
	});
});