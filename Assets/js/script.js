//variables grabbed from html

document.getElementById("startButton").addEventListener("click", startQuiz)   //selects start button and also makes it run a function on click
var question = $('#questions')  //selects the div containing the question
var quiz = $('#quiz')    //selects the div containing all the questions and choices
var seconds = $('#seconds')  //selects the span in timer, this will be used to count down
var title = $('#title') //selects the h1 element that is the title
var instructions = $('#instructions') //selects the instructions and start button


var choiceA = $('#A')
var choiceB = $('#B') //These three variables link to the choices
var choiceC = $('#C')

//variables to help shape the quiz

var currentQuestionIndex = 0;  //sets current question the user is on
var tick; //will be used to start the timer
var time = 60; //sets how many seconds on the timer

//Creating the questions. We do this in an array so that we can cycle through them later

var questionArray = [
    { //question 1
        question: "What does HTML stand for?",
        choiceA: "Hyper Text Markup Language",
        choiceB: "High Tech Maker Language",
        choiceC: "Home Tool Markup Language",
        correct: "A"
    },

    { //question 2
        question: "This is question 2",
        choiceA: "answer 1",
        choiceB: "answer 2",
        choiceC: "answer 3",
        correct: "C"
    },

    { //question 3
        question: "This is question 3",
        choiceA: "answer 1",
        choiceB: "answer 2",
        choiceC: "answer3",
        correct: "A"
    },

    { //question 4 
        question: "This is question 4",
        choiceA: "answer 1",
        choiceB: "answer 2",
        choiceC: "answer 3",
        correct: "B"
    }
];


//Had to put this down here as javascript complained that "questionArray" hadn't been made yet
var lastQuestionIndex = questionArray.length - 1;   //sets last question. The -1 is needed as the length is 4 yet the index is 5

//Function to start the quiz
function startQuiz() {

    //hides h1 element
    $(title).attr("class", "hidden");

    $(instructions).attr("class", "hidden");

    //shows questions
    $(quiz).attr("class", "show");

    //starts timer and runs countDown every second
    tick = setInterval(countDown, 1000);

    //sets the text content of 'seconds' to be 'time'
    seconds.innerHTML = time;

    renderQuestion();
}


function countDown() {
    time--; //decreases the seconds left each time it's ran
    seconds.innerHTML = time; //updates the timer with the seconds left


/*
    if (time <= 0) { //ends quiz if the time is less than or equal to zero
        endQuiz();
    }
*/

} 



//this function updates the questions and choices based on the index the question array is on
function renderQuestion() { 
    var q = questionArray[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

runningQuestionIndex = 0;
renderQuestion();

runningQuestionIndex++;
renderQuestion();