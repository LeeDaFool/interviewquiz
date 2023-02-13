// Btn for start quiz
var startBtn = document.getElementById('start');
// Quiz info
var quizContainer = document.getElementsByClassName('quiz-container');
var questionData = document.getElementById('question');
var answersData = document.querySelectorAll('.answer');
var a_text = document.getElementById('a_text')
var b_text = document.getElementById('b_text')
var c_text = document.getElementById('c_text')
var d_text = document.getElementById('d_text')
let currentQuiz = 0
let score = 0
let timer = 60;
// Submit btn
var submitBtn = document.getElementById('submit')

// Start quiz
function startQuiz() {
    highscoreBTN.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
    startBtn.classList.remove("start");
    var quizBegin = document.getElementById('quiz');
    quizBegin.classList.remove("hidden");

    

    window.setInterval(function(){
    if (timer > 0) {
     timer--;
       document.getElementById("timer").innerHTML = "Timer : " + timer + " seconds";
    }
    if (timer <= 0) {
        quiz.innerHTML = `
           <h2>Times Up! You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>
           `
    }
    }, 1000);
}


// Eventlisten for the startQuiz function
startBtn.addEventListener('click', startQuiz);


// Quiz data
var quizData = [
  {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "Javascript",
      correct: "d",
  },
  {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b",
  },
  {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
      correct: "a",
  },
  {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
      correct: "b",
  },
];


// Gathering and displaying the quiz data
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    question.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
    answersData.forEach(answersData => answersData.checked = false)
}
function getSelected() {
    let answer
    answersData.forEach(answersData => {
        if(answersData.checked) {
            answer = answersData.id
        }
    })
    return answer
}

function viewHighscore() {

}
let recentHighscore = JSON.parse(localStorage.getItem("recentHighscore")) || [];
recentHighscore.sort((a, b) => b.scores - a.scores);
recentHighscore.splice(5);
let highscoreBTN = document.createElement('button');
highscoreBTN.innerHTML = "Highscore";
document.body.appendChild(highscoreBTN);


highscoreBTN.addEventListener("click", () => {
    
    startBtn.classList.toggle("hidden");
    startBtn.classList.remove("start");
    document.getElementById("timer").classList.add("hidden");
    highscoreBTN.classList.add("hidden");
    quiz.classList.remove("hidden");

    quiz.innerHTML = recentHighscore
    .map(scores => {
        return `<h2> ${scores.initials.toUpperCase()} with a highscore of ${scores.scores} <h2>`
    }).join("");

    let backDiv = document.createElement('button');
    backDiv.innerHTML = "Back";
    backDiv.addEventListener("click", () => {
        window.location.reload();
    });
    document.body.append(backDiv);
    }
)


//Quiz ending and the User input initial for highscore
function inputHighscore() {
    const getTimer = document.getElementById("timer");
    var trackScore = timer;
    // The score of the user after the quiz
    quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly. Time took: ${timer}</h2>
    <form>
    <label for="initial">Initial: </label>
  <input type="text" id="getInitial" name="initial">
  <input id="submitIn" type="submit" value="OK">
  </form>
    <button onclick="window.location.reload()">Reload</button>
    `
    
    const submitIn = document.getElementById("submitIn");
    submitIn.addEventListener("click", (e) => {
        e.preventDefault();
        var initial = document.getElementById("getInitial").value;
        
        let quizHighscore = {
            initials: initial,
            scores: trackScore
        };
        recentHighscore.push(quizHighscore);
        localStorage.setItem("recentHighscore",JSON.stringify(recentHighscore));
        alert("Score inputed");
})
    timer = clearTimeout(timer);
    getTimer.classList.toggle("hidden"); 
};

// Penalize user by 5 sec for wrong answer
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++;
       } else {
        timer -= 5;
       }
       currentQuiz++;
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
        inputHighscore();
        

    }
    }
});

console.log(recentHighscore);

// highscore = () => {
//     let initial = localStorage.getItem("initial");
//     let score = localStorage.getItem("score");
//     console.log(score);
// }