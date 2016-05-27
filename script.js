var triviaArray = [{
		name: "Mark Bradford",
		description: "<strong>Mark Bradford</strong> created this piece in 2015.  He used torn pieces of paper, shellac, and oil on canvas.",
		title: "Let's Walk to the Middle of the Ocean",
		img: "mb.jpg",
		choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Mark Bradford"]
	},
	{
		name: "Vincent Van Gogh",
		description: "<strong>Vincent Van Gogh</strong> created this piece in 1889.  He used oil on canvas.",
		title: "Starry Night",
		img: "vg.jpg",
		choices: ["Jackson Pollack", "Georgia O'Keefe", "Pablo Picasso", "Vincent Van Gogh"]
	},
	{
		name: "Jackson Pollack",
		description: "<strong>Jackson Pollock</strong> created this piece in 1950.  He used oil, enamel, and aluminum on canvas.",
		title: "Number One",
		img: "jp.jpg",
		choices: ["Vincent Van Gogh", "Georgia O'Keefe", "Pablo Picasso", "Jackson Pollack"]
	}
]

var originalTriviaArrayLength = triviaArray.length

var targetArtist; //I declare targetArtist as a global variable because I use it in multiple functions

var artistIndex; //same here

var wins = 0;

var paintings = 1;

var number = 10; //for timer

var counter;

var unanswered = 0;

function questionTimer(){
	counter = setInterval(decrement, 1000);
}

function stop(){
	clearInterval(counter);
}

function decrement(){
	number--;
	$('#timer').html("<p><strong>" + number + " seconds left</strong></p>");
	if(number === 0){
		stop();
		triviaArray.splice(artistIndex, 1);
		unanswered++;
		$("#instructions").html("<p>You've run out of time!</p>");
		$("#timer").empty();
		$("#answerChoices").html("<p class='options'>" + targetArtist.description + "</p>");
		$("#eventButton").html("<button class='button'>Next piece</button>")
		if(triviaArray.length === 0){
			empty();
			$("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!")
		}
	}
}

function populateQuestion(){
	targetArtist = triviaArray[Math.floor(Math.random()*triviaArray.length)];
	artistIndex = triviaArray.indexOf(targetArtist); //the splice method called later needs two numbers, so i need to store the numerical index value of targetArtist
	//populate instructions/disply
	$("#paintingsLeft").html(paintings + "/" + originalTriviaArrayLength + " peices.")
	$("#instructions").html("<p id='title'>" + targetArtist.title + "</p>");
	$("#image").html("<p><img class=artImage src='" + targetArtist.img + "'></p>");
	//reset timer
	number = 10;
	//start timer
	questionTimer();
	//display timer
	for (var i = 0; i < targetArtist.choices.length; i++){
		$("#answerChoices").append("<p class='choices'>" + targetArtist.choices[i] + "</p>");
	}
	paintings++;
}

function empty(){
	$("#instructions").empty();
	$("#image").empty();
	$("#answerChoices").empty();
	$("#timer").empty();
	$("#eventButton").empty();
	$("#scoreButton").empty();
}

function checkAnswer(){
	$(".choices").on('click', function(){
		var guessedName = $(this).text();
		triviaArray.splice(artistIndex, 1); //removes artist so no duplicates
		stop();
		if(triviaArray.length > 0){
			if (guessedName === targetArtist.name){
				wins++;
				$("#instructions").html("<p>Correct!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetArtist.description + "</p>");
				$("#eventButton").html("<button class='button'>Next piece</button>");
			}
			else{
				$("#instructions").html("<p>Incorrect!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetArtist.description + "</p>");
				$("#eventButton").html("<button id='nextButton' class='button'>Next piece</button>");
			}
		}
		
		if(triviaArray.length === 0){
			if (guessedName === targetArtist.name){
				wins++;
				$("#instructions").html("<p>Correct!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetArtist.description + "</p>");
				$("#eventButton").html("<button class='button'>See your score</button>");
			}
			else{
				$("#instructions").html("<p>Incorrect!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetArtist.description + "</p>");
				$("#scoreButton").html("<button id='nextButton' class='button'>See your score</button>");
			}
		}
	});
}

$(document).ready(function(){
	$("#startButton").on('click', function(){
		populateQuestion();
		checkAnswer();
	});

	$("#eventButton").on('click', function(){
		empty();
		populateQuestion();
		checkAnswer();
	});
	
	$("#scoreButton").on('click', function(){
		empty();
		$("#paintingsLeft").empty();
		$("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!<br><p>You left " + unanswered + " unanswered.")
	});

});