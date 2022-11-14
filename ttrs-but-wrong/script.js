const Maths = Math;
window.addEventListener("DOMContentLoaded", start);
let main;
function start() {
  main = document.getElementById("main");
  main.innerHTML = `
  <button onclick="play()"> PLAY!</button>`;
}
function play() {
  countdown(5);
}

let correctCount, incorrectCount;

function countdown(second) {
  if (second <= 0) {
    correctCount = 0;
    incorrectCount = 0;
    setTimeout(endGame, 60_000);
    guu();
    return;
  }
  main.innerHTML = `
  <div>${second}</div>`;
  setTimeout(() => {
    countdown(second - 1);
  }, 1000);
}

let a, b, c, divide;

function guu() {
  divide = Maths.random() < 0.5;
  a = 1 + Maths.floor(Maths.random() * 10);
  b = 1 + Maths.floor(Maths.random() * 10);
  c = a * b;

  const question = divide ? `${c} &divide; ${b} = ?` : `${a} &times; ${b} = ?`;

  main.innerHTML = `
  <p>${correctCount} ${incorrectCount}</p>
${question}
<form onsubmit="checkAnswer(event)">
<input id="answer"/>
<button type="submit">check</button>
</form>
    `;
  const answer = document.getElementById("answer");
  answer.focus();
}

function checkAnswer(e) {
  e.preventDefault();
  const answer = document.getElementById("answer");
  const guess = parseInt(answer.value, 10);
  const correctAnswer = divide ? a : c;
  const isCorrect = guess === correctAnswer;
  if (isCorrect) {
    correctCount = correctCount + 1;
  } else {
    incorrectCount = incorrectCount + 1;
  }
  guu();
}
function endGame() {
  main.innerHTML = `
  <h1>here is your score</h1>
  <p>wrong:${correctCount} correct:${incorrectCount}</p>

    `;
}
