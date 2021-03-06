//variables grabbed from html

document.getElementById("startButton").addEventListener("click", startQuiz)   //selects start button and also makes it run a function on click
var question = $('#questions')  //selects the div containing the question
var quiz = $('#quiz')    //selects the div containing all the questions and choices
var seconds = $('#seconds')  //selects the span in timer, this will be used to count down
var title = $('#title') //selects the h1 element that is the title
var instructions = $('#instructions') //selects the instructions and start button
var score = $('#score') //selects the span in scoreContainer that contains the score
var scoreContainer = $('#scoreContainer') //selects the sections that contains the score
document.getElementById("submitScore").addEventListener("click", saveScore) //selects start button and makes it run a function on click
document.getElementById("highscores").addEventListener("click", showHighscores) //selects highscores paragraph and makes it run a function on click
var scoreboard = $('#scoreboard') // grabs the container that contains 'scoreList'
var scoreList = $('#scoreList') //grabs the span inside scoreboard

var choiceA = $('#A')
var choiceB = $('#B') //These three variables link to the choices
var choiceC = $('#C')

//variables to help shape the quiz

var currentQuestionIndex = 0;  //sets current question the user is on
var tick; //will be used to start the timer
var time = 60; //sets how many seconds on the timer
var scoreCount = 0; //sets the score
var runningQuestionIndex = 0; //sets the questions to the start
var finalScore; //this needs to be declared here as I use it in multiple functions

//Creating the questions. We do this in an array so that we can cycle through them later

var questionArray = [
    { //question 1
        question: "What does HTML stand for?",
        choiceA: "Hyper Text Markup Language",
        choiceB: "High Tech Maker Language",
        choiceC: "Home Tool Markup Language",
        correct: 'A'
    },

    { //question 2
        question: "Inside which HTML element do we put JavaScript?",
        choiceA: "scripting",
        choiceB: "js",
        choiceC: "script",
        correct: 'C'
    },

    { //question 3
        question: "How do you call a function?",
        choiceA: "myFunction()",
        choiceB: "myFunction",
        choiceC: "myFunction = call",
        correct: 'A'
    },

    { //question 4 
        question: "How do you write a comment in Javascript?",
        choiceA: "~~",
        choiceB: "//",
        choiceC: "#",
        correct: 'B'
    }
];


//Had to put this down here as javascript complained that "questionArray" hadn't been made yet
var lastQuestionIndex = questionArray.length - 1;   //sets last question. The -1 is needed as the length is 4 yet the index is 5



//this function updates the questions and choices based on the index the question array is on
function renderQuestion() { 
    var q = questionArray[runningQuestionIndex];

    question.html("<p>" + q.question + "</p>")
    choiceA.html(q.choiceA);
    choiceB.html(q.choiceB);   //I have to use .html as the elements have been grabbed in jquery
    choiceC.html(q.choiceC);
}


//Function to start the quiz
function startQuiz() {

    //hides h1 element
    $(title).attr("class", "hidden");

    $(instructions).attr("class", "hidden");

    //shows questions
    $(quiz).attr("class", "show");

    //starts timer and runs countDown every second
    tick = setInterval(countDown, 1000);

    //sets the text content of 'seconds' to be 'time'.  We have to use .html as it has been selected by jquery
    seconds.html(time);

    renderQuestion(); //calls the questions
}


function countDown() {
    time--; //decreases the seconds left each time it's ran
   seconds.html(time);
    



    if (time <= 0) { //ends quiz if the time is less than or equal to zero
        scoreRender();
    }


} 

//This function hides most elements and displays the score
function scoreRender () {
    $(title).attr("class", "hidden");
    $(instructions).attr("class", "hidden")
    $(quiz).attr("class", "hidden")
    $(scoreContainer).attr('class', 'show')

    score.html(scoreCount) //the score is updated the show the current integer of scoreCount
}


function checkAnswer(answer) {
    if (answer == questionArray[runningQuestionIndex].correct){ //if the choice selected matches the one in correct it increments the score
        scoreCount++;
        alert("Correct Answer!")
    }
    else 
    {
        alert("Wrong Answer") //if it's wrong it should take away 10 seconds of time
        time -= 10

        if (time <= 0) {  //ends quiz when time hits 0
            scoreRender()
        }
    }
    if (runningQuestionIndex < lastQuestionIndex) { //if the current question is below the last one then it should increment the questions
        runningQuestionIndex++;
        renderQuestion();
    } 
    else
     {
        clearInterval(tick)  //if not then it clears the timer and shows the score
        scoreRender();
    }
}

//on clicking save score button, this function is ran
function saveScore() {
    finalScore = "Score " + scoreCount; //creates an string that shows your score

    localStorage.setItem('finalScore', finalScore); //store the string in local storage
}


function showHighscores () {
    $(scoreContainer).attr('class', 'hidden'); //hides most elements on screen
    $(title).attr("class", "hidden");
    $(instructions).attr("class", "hidden")
    $(quiz).attr("class", "hidden")
    var scoreButton = document.getElementById("submitScore"); //has to get this differently since it doesn't use jquery
    scoreButton.style.display = "none"; //hides the submit score button
    $(scoreboard).attr("class", "show") //Shows the container for the highscores

   
    var retrievedScore = localStorage.getItem("finalScore"); //Gets scores from local storage
  
    scoreList.html(retrievedScore) //changes the span inside scoreboard to show the stored score

}

