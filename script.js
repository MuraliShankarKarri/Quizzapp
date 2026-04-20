let questions = [
  {
    q: "Capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: 0
  },
  {
    q: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    q: "HTML stands for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "None"],
    answer: 1
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  document.getElementById("question").innerText = questions[current].q;
  for (let i = 0; i < 4; i++) {
    document.getElementById("opt" + i).innerText = questions[current].options[i];
  }
}

function checkAnswer(i) {
  if (i === questions[current].answer) {
    score++;
  }
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    document.body.innerHTML = "<h2>Your Score: " + score + "</h2>";
  }
}

loadQuestion();