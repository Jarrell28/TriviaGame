//Create Trivia Game Object
var TriviaObj = {
    questions: [
        {
            question: "1 + 1",
            correct: "2",
            answer1: "3",
            answer2: "4",
            answer3: "2",
            answer4: "1"
        },
        {
            question: "2 + 1",
            correct: "3",
            answer1: "3",
            answer2: "4",
            answer3: "2",
            answer4: "1"
        },
        {
            question: "4 + 1",
            correct: "5",
            answer1: "3",
            answer2: "4",
            answer3: "2",
            answer4: "5"
        },
        {
            question: "2 + 2",
            correct: "4",
            answer1: "3",
            answer2: "4",
            answer3: "2",
            answer4: "1"
        },
        {
            question: "7 + 7",
            correct: "14",
            answer1: "3",
            answer2: "14",
            answer3: "2",
            answer4: "1"
        },
        {
            question: "1 + 5",
            correct: "6",
            answer1: "3",
            answer2: "4",
            answer3: "2",
            answer4: "6"
        }],
    gameQuestions: [],
    playing: false,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    remaining: 0,
    correctAnswer: "",
    secondsLeft: 30,
    timer: "",

    startGame: function () {
        //Initializes Game from start button
        $("#start").hide();

        //Makes a copy of questions array
        this.gameQuestions = Object.assign(this.questions);
        //Gets first question
        this.getQuestion();
        $("#question").show();
        $("#time-container").show();
    },

    playAgain: function () {

    },

    reset: function () {
        $("#results").hide();

    },

    checkAnswer: function (answer) {
        //when select answer display correct answer with image

        //When they answered correctly
        if (answer === this.correctAnswer) {
            alert("Correct");
            this.correct++;
            console.log(this.correct);
        }

        //When they answered incorrectly
        else {
            alert("Incorrect");
            this.incorrect++;
            console.log(this.incorrect);
        }

        //Goes to next question
        this.getQuestion();
        //Clears timer interval
        clearInterval(this.timer);


    },

    //All questions answered, shows scores
    gameResults: function () {
        clearInterval(this.timer);
        alert("Game Over");
    },

    //Gets a random question
    getQuestion: function () {
        //Sets remaining questions variable to length of gameQuestions array
        this.remaining = this.gameQuestions.length;

        //If there are still questions left
        if (this.remaining > 0) {
            //Resets seconds left for question
            this.secondsLeft = 30;
            //Clears any previous timer interval
            clearInterval(this.timer);
            //Sets the timer interval
            this.timer = setInterval(function () {
                //Updates time html
                $("#time").text(TriviaObj.secondsLeft);

                //Checks if player has run out of time
                if (TriviaObj.secondsLeft === 0) {
                    TriviaObj.unanswered++;
                    console.log(TriviaObj.unanswered);
                    //Goes to next question
                    TriviaObj.getQuestion();
                } else {
                    //Decrements seconds left each second
                    TriviaObj.secondsLeft--;
                }
            }, 1000);

            //Gets random number for question index
            var random = Math.floor(Math.random() * this.gameQuestions.length);

            //sets variable as question object
            var currentQuestion = this.gameQuestions[random];

            //sets correct answer variable to the correct answer from the currentQuestion object
            this.correctAnswer = currentQuestion.correct;

            //Sets html to display question and choices
            $("#question").empty();
            $("#question").append("<h4>" + currentQuestion.question + "</h4>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer1 + "'>" + currentQuestion.answer1 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer2 + "'>" + currentQuestion.answer2 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer3 + "'>" + currentQuestion.answer3 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer4 + "'>" + currentQuestion.answer4 + "</p>");

            //Removes current question from gameQuestions array
            this.gameQuestions.splice(random, 1);
        } else {
            //if no more questions then shows game results
            this.gameResults();
        }
    }
}

//Event Listeners
$("#start").on("click", function () {
    //start game
    TriviaObj.startGame();
});

$("#play-again").on("click", function () {
    //start game
})

$("#question").on("click", ".choice", function () {
    //check answer
    TriviaObj.checkAnswer($(this).attr("data-answer"));
})





