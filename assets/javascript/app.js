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
        $("#start").hide();
        this.gameQuestions = Object.assign(this.questions);

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

        if (answer === this.correctAnswer) {
            alert("Correct");
            this.correct++;
            console.log(this.correct);
        } else {
            alert("Incorrect");
            this.incorrect++;
            console.log(this.incorrect);
        }

        this.getQuestion();
        clearInterval(this.timer);


    },

    gameResults: function () {
        clearInterval(this.timer);
        alert("Game Over");
    },

    getQuestion: function () {

        this.remaining = this.gameQuestions.length;

        if (this.remaining > 0) {
            this.secondsLeft = 30;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                $("#time").text(TriviaObj.secondsLeft);

                if (TriviaObj.secondsLeft === 0) {
                    TriviaObj.unanswered++;
                    console.log(TriviaObj.unanswered);
                    TriviaObj.getQuestion();
                }
                TriviaObj.secondsLeft--;
            }, 1000);

            var random = Math.floor(Math.random() * this.gameQuestions.length);

            var currentQuestion = this.gameQuestions[random];

            this.correctAnswer = currentQuestion.correct;

            $("#question").empty();
            $("#question").append("<h4>" + currentQuestion.question + "</h4>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer1 + "'>" + currentQuestion.answer1 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer2 + "'>" + currentQuestion.answer2 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer3 + "'>" + currentQuestion.answer3 + "</p>");
            $("#question").append("<p class='choice' data-answer='" + currentQuestion.answer4 + "'>" + currentQuestion.answer4 + "</p>");

            this.gameQuestions.splice(random, 1);
        } else {
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





