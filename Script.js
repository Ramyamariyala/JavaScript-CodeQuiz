var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ],
        answerIndex:"Booleans"

    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: [
            "Quotes", 
            "Curly brackets", 
            "Parentheses", 
            "Square brackets"
        ],
        answerIndex: "Parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: [
            "Numbers and strings", 
            "Other arrays", 
            "Booleans", 
            "All of the above"
        ],
        answerIndex: "All of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            "Commmas", 
            "Curly brackets", 
            "Quotes", 
            "Parentheses"
        ],
        answerIndex: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "Javascript", 
            "Terminal/bash", 
            "For loops", 
            "Console.log"
        ],
        answerIndex: "Console.log"
    }

]

// console.log(question);
var score = 0;
var questionIndex = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");


var currentTime = document.querySelector("#currentTime");
var startBtnEl = document.querySelector("#startBtn");
var questionsDiv = document.querySelector("#questionsDiv");
var Wrapper = document.querySelector("#wrapper");

startBtnEl.addEventListener("click",startQuiz);

function startQuiz(){
    if(holdInterval === 0){
        holdInterval = setInterval(function(){
            secondsLeft--;
            currentTime.textContent = "Time: "+ secondsLeft;

            if(secondsLeft <= 0){
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!"
            }
        },1000);
    }
    setQuestion();
   
};

function compare (){
    questionIndex++;
    setQuestion();
    
}

// Question on the page

function setQuestion(){
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {

    var userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].answers;
    questionsDiv.textContent = userQuestion;
}
userChoices.forEach(function(newItem){
    
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click",(compare));
})

}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answerIndex) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answerIndex;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answerIndex;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;
    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        setQuestion(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

  
    questionsDiv.appendChild(createH1);

    //Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id","CreateP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0){
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent= "Your final score is:" + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);


    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("highScores.html");
        }
    });

}

