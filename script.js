const gameContainer = document.getElementById("game-container");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");

let timer = 0;
let interval;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function startGame() {
  gameContainer.innerHTML = "";
  message.innerText = "";
  timer = 0;
  matchedCount = 0;
  timerDisplay.textContent = "Time: 0s";
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);

  const images = [];
  for (let i = 1; i <= 12; i++) {
    images.push(`assets/fruit${i}.jpg`);
    images.push(`assets/fruit${i}.jpg`);
  }

  images.sort(() => Math.random() - 0.5);

  images.forEach(imgSrc => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imgSrc;

    card.appendChild(img);
    card.addEventListener("click", () => flipCard(card));
    gameContainer.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  const img1 = firstCard.querySelector("img").src;
  const img2 = secondCard.querySelector("img").src;

  if (img1 === img2) {
    matchedCount++;
    resetTurn();

    if (matchedCount === 12) {
      clearInterval(interval);
      message.innerText = "🎉 Congratulations! You finished the game!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

startBtn.addEventListener("click", startGame);
