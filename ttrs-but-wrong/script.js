const Maths = Math;
window.addEventListener("DOMContentLoaded", start);
let main;
function start() {
  main = document.getElementById("main");
  main.innerHTML = `
  <button onclick="play()"> PLAY!</button>`;
}
function play() {
  countdown(2);
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
}

function checkAnswer(e) {
  e.preventDefault();
  const answer = document.getElementById("answer");
  const guess = parseInt(answer.value, 10);
  const correctAnswer = divide ? a : c;
  const isCorrect = guess === correctAnswer;
  if (isCorrect) {
    incorrectCount = incorrectCount + 1;
  } else {
    correctCount = correctCount + 1;
  }
  guu();
}
function endGame() {
  main.innerHTML = `
  <p>${correctCount} ${incorrectCount}</p>

    `;
}
