function handleInstructionsModal() {
	// when users click on the element with
	// `.js-what` class, we'll fade in
	// the instructions modal
	$('.js-what').click(function () {
		$('.overlay').fadeIn(1000);
	});

	// when users click on the element with the
	// `.js-close` class, we'll fade out
	// the instructions modal
	$('.js-close').click(function () {
		$(".overlay").fadeOut(1000);
	});
}

function Game() {
	
	var guessed = Math.floor(Math.random() * 101)
	var guesses = 0
	var prevguess = 0
	var diapasones = 
	{
		"Very Hot": 5,
		"Hot": 10,
		"Cold": 25,
		"Very cold": 50,
		"Too cold": 100
	}

	

	$('form').submit(function (event) {
		event.preventDefault()

		var guess = parseInt($('#js-user-guess').val())
		console.log("The guess is " + guess)
		add_guess()

// TODO assign previous value

		if (guess != guessed) {
			feedback(check_diapasone(guess), compare_with_previous(guess))
			prevguess = guess
			console.log("Previous guess is " + prevguess)
			$("#guessList").append('<p>' + guess + '</p>')
		}
		else {
			$('#feedback').text('Congrats, you won')
			$('#js-guess-submit').prop( "disabled", true);
		}

	});

	console.log("The guessed number is " + guessed)
	console.log("Current number of guesses is " + guesses)

	function add_guess () {
		guesses += 1
		$('.count').text(guesses)
	}

	function check_diapasone (guess) {
		for (var key in diapasones) {
			// check if the property/key is defined in the object itself, not in parent
			if (diapasones.hasOwnProperty(key)) {           
				if (Math.abs(guess - guessed) < diapasones[key]) {
					// console.log(key)
					return key
					break;
				}
			}
		}
	}

	function compare_with_previous (guess) {
		if (Math.abs(guess - guessed) < Math.abs(prevguess - guessed)) {
			return "Warmer"
		}
		else if (Math.abs(guess - guessed) == Math.abs(prevguess - guessed)) {
			return "Why would you make the same guess?"
		}
		else {
			return "Colder"
		}
	}

	function feedback (absolute, relative) {
		$('#feedback').text(absolute + ". " + relative)

	}

	$('.js-new-game').click(function () {
		$('#feedback').text('Make your Guess!')
		$('.count').text('0')
		$('#guessList').empty()
		$('#js-guess-submit').prop( "disabled", false)
		
		guessed = Math.floor(Math.random() * 101)
		guesses = 0
		prevguess = 0
	});

}


// `$(document).ready` lets you specify a
// function that should execute when all the
// resources required by your web page have loaded.
// This code says, when the document is ready, run the
// `handleInstructionsModal` function.
$(document).ready(function () {
	handleInstructionsModal();
	Game()

});




