//Create Trivia Game Object
var TriviaObj = {
    questions: [
        {
            question: "What character did Charlie's real father, Martin Sheen, play on the show?",
            correct: "Rose's father",
            answer1: "Charlie and Alan's step father",
            answer2: "Rose's father",
            answer3: "Jake's principal",
            answer4: "Judith's father"
        },
        {
            question: "Who guest stars in one episode as Charlie's new neighbor, whom Charlie tries to set up with Alan?",
            correct: "Brooke Shields",
            answer1: "Brooke Shields",
            answer2: "Cindy Crawford",
            answer3: "Paris Hilton",
            answer4: "Jessica Simpson"
        },
        {
            question: "What does Alan do for a living?",
            correct: "chiropractor",
            answer1: "surgeon",
            answer2: "writer",
            answer3: "lawyer",
            answer4: "chiropractor"
        },
        {
            question: "What is Charlie's doctor's name?",
            correct: "Stanley Schwartz",
            answer1: "Stanley Warwick",
            answer2: "Stanley Schwartz",
            answer3: "Irvin Schwartz",
            answer4: "Thomas Smith"
        },
        {
            question: "What does Jake get in trouble at school for doing?",
            correct: "drawing a picture of a classmate's breasts",
            answer1: "throwing things at the teacher",
            answer2: "cutting class",
            answer3: "hitting another student",
            answer4: "drawing a picture of a classmate's breasts"
        },
        {
            question: "Who is the young woman that Charlie dates first and then later Alan marries?",
            correct: "Kandi",
            answer1: "Katie",
            answer2: "Kayla",
            answer3: "Kelli",
            answer4: "Kandi"
        },
        {
            question: "What is the name of Berta's daughter, whom Alan dates?",
            correct: "Naomi",
            answer1: "Naomi",
            answer2: "Judith",
            answer3: "Natalie",
            answer4: "Rose"
        },

        {
            question: "What animal does Jake feed that eventually take over his room at Charlie's house?",
            correct: "seagulls",
            answer1: "cats",
            answer2: "dogs",
            answer3: "seagulls",
            answer4: "crows"
        },

        {
            question: "What is Charlie's occupation?",
            correct: "jingle writer",
            answer1: "he doesn't work",
            answer2: "jingle writer",
            answer3: "chiropractor",
            answer4: "accountant"
        },
        {
            question: "What is the name of the man whom Judith marries after she and Alan are divorced?",
            correct: "Herb Melnick",
            answer1: "Herb Melnick",
            answer2: "Charlie Melmack",
            answer3: "Harvey Melton",
            answer4: "Mel Hervey"
        }],
    gameQuestions: [],
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    remaining: 0,
    correctAnswer: "",
    secondsLeft: 15,
    timer: "",

    startGame: function () {
        //Initializes Game from start button
        $("#start").hide();

        //Makes a copy of questions array
        this.gameQuestions = this.questions.concat();
        //Gets first question
        this.getQuestion();
        $("#question").show();
        $("#time-container").show();
    },

    playAgain: function () {
        this.reset();
        this.startGame();
    },

    reset: function () {
        this.correct = 0;
        this.incorrect = 0;
        this.unanswered = 0;
        $("#results").hide();
        $("#play-again").hide();
    },

    checkAnswer: function (answer) {
        //when select answer display correct answer with image

        //When they answered correctly
        if (answer === this.correctAnswer) {
            this.correct++;
            $("#question").empty();
            $("#question-result").html("<p class='answered'>Correct! The answer was " + this.correctAnswer + "</p>");
        }

        //When they answered incorrectly
        else {
            this.incorrect++;
            $("#question").empty();
            $("#question-result").html("<p class='answered'>Wrong Answer! The answer was " + this.correctAnswer + "</p>");

        }

        //Goes to next question
        setTimeout(function () {
            TriviaObj.getQuestion();
        }, 3000)

        //Clears timer interval
        clearInterval(this.timer);


    },

    //All questions answered, shows scores
    gameResults: function () {
        clearInterval(this.timer);
        $("#question").hide();
        $("#time-container").hide();
        $("#correct").text(this.correct);
        $("#incorrect").text(this.incorrect);
        $("#unanswered").text(this.unanswered);
        //Reset Question Result Html
        $("#question-result").empty();
        $("#results").show();
        $("#play-again").show();
    },

    //Gets a random question
    getQuestion: function () {
        //Sets remaining questions variable to length of gameQuestions array
        this.remaining = this.gameQuestions.length;

        //If there are still questions left
        if (this.remaining > 0) {
            //Resets seconds left for question
            this.secondsLeft = 15;
            $("#time").text(this.secondsLeft);
            //Clears any previous timer interval
            clearInterval(this.timer);
            //Sets the timer interval
            this.timer = setInterval(function () {

                TriviaObj.secondsLeft--;
                //Updates time html
                $("#time").text(TriviaObj.secondsLeft);

                //Checks if player has run out of time
                if (TriviaObj.secondsLeft === 0) {
                    TriviaObj.unanswered++;

                    //Goes to next question
                    TriviaObj.checkAnswer();
                }

            }, 1000);

            //Gets random number for question index
            var random = Math.floor(Math.random() * this.gameQuestions.length);

            //sets variable as question object
            var currentQuestion = this.gameQuestions[random];

            //sets correct answer variable to the correct answer from the currentQuestion object
            this.correctAnswer = currentQuestion.correct;

            //Reset Question Result Html
            $("#question-result").empty();

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
    TriviaObj.playAgain();
})

$("#question").on("click", ".choice", function () {
    //check answer
    TriviaObj.checkAnswer($(this).attr("data-answer"));
})

