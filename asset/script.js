var startBtn = document.getElementById('start');
var quizContainer = document.getElementsByClassName('quiz-container');

var questionData = document.getElementById('question');
var answersData = document.querySelectorAll('.answer');
var a_text = document.getElementById('a_text')
var b_text = document.getElementById('b_text')
var c_text = document.getElementById('c_text')
var d_text = document.getElementById('d_text')
var submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
let timer = 60;


function startQuiz() {
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



startBtn.addEventListener('click', startQuiz);



var quizData = [
  {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "javascript",
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

function inputHighscore() {
    const getTimer = document.getElementById("timer");
    
    quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly. Time took: ${timer}</h2>
    <form>
    <label for="initial">Initial: </label>
  <input type="text" id="getInital" name="initial"><br><br>
  <input class="SubmitIn" type="submit" value="Submit">
  </form>
    <button onclick="location.reload()">Reload</button>
    `
    timer = clearTimeout(timer);
    getTimer.classList.toggle("hidden");
    
}

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
        //    quiz.innerHTML = `
        //    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        //    <button onclick="location.reload()">Reload</button>
        //    `;
        inputHighscore();
        

    }
    }
})

