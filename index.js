let newGame = document.querySelector("#new-game");
let playerOneTitle = document.querySelector("#player-one .title");
let playerTwoTitle = document.querySelector("#player-two .title");
let playerOneTotalPoint = document.querySelector("#player-one .total-point");
let playerTwoTotalPoint = document.querySelector("#player-two .total-point");
let playerOneCurrentPoint = document.querySelector(
  "#player-one-current .current-point"
);
let playerTwoCurrentPoint = document.querySelector(
  "#player-two-current .current-point"
);
let diceOne = document.getElementById("dice-one");
let diceTwo = document.getElementById("dice-two");
let rollDice = document.getElementById("roll-dice");
let hold = document.getElementById("hold");
let finalScore = document.getElementById("final-score");
let totalScore = 100;
let currentPLayer = "one";
let gameState = "playing";
let currentPlayerBackground = document.querySelector(".current-player");
let body = document.querySelector("body");

function initialize() {
  gameState = "playing";
  rollDice.addEventListener("click", triggerDice);
  hold.addEventListener("click", setTotalPoint);
  finalScore.addEventListener("input", function() {
    totalScore = this.value;
  });
  newGame.addEventListener("click", function() {
    initialize();
  });
  totalScore = 100;
  let winner = setInterval(setWinner, 100);
  playerOneTotalPoint.innerHTML = 0;
  playerTwoTotalPoint.innerHTML = 0;
  playerOneCurrentPoint.innerHTML = 0;
  playerTwoCurrentPoint.innerHTML = 0;
  reverseTheState();
}

function setWinner() {
  if (Number(playerOneTotalPoint.innerHTML) >= totalScore) {
    playerOneTitle.innerHTML = "winner";
    playerOneTitle.style.color = "var(--primary-color)";
    gameState = "end";
  } else if (Number(playerTwoTotalPoint.innerHTML) >= totalScore) {
    playerTwoTitle.innerHTML = "winner";
    playerTwoTitle.style.color = "var(--primary-color)";
    gameState = "end";
  } else {
  }
}
function reverseTheState() {
  playerOneTitle.innerHTML = "player 1";
  playerTwoTitle.innerHTML = "player 2";
  playerOneTitle.style.color = "black";
  playerTwoTitle.style.color = "black";
}

function selectDice(num) {
  switch (num) {
    case 1:
      return "/img/dice-1.png";
    case 2:
      return "/img/dice-2.png";
    case 3:
      return "/img/dice-3.png";
    case 4:
      return "/img/dice-4.png";
    case 5:
      return "/img/dice-5.png";
    case 6:
      return "/img/dice-6.png";
    default:
      return null;
  }
}

function setTotalPoint() {
  if (gameState === "playing") {
    if (currentPLayer === "one") {
      playerOneTotalPoint.innerHTML =
        Number(playerOneTotalPoint.innerHTML) +
        Number(playerOneCurrentPoint.innerHTML);
      playerOneCurrentPoint.innerHTML = 0;
      currentPLayer = "two";
    } else {
      playerTwoTotalPoint.innerHTML =
        Number(playerTwoTotalPoint.innerHTML) +
        Number(playerTwoCurrentPoint.innerHTML);
      playerTwoCurrentPoint.innerHTML = 0;
      currentPLayer = "one";
    }
  }
}

function diceOneOccurence(first, second) {
  setDices(first, second);
  if (currentPLayer === "one") {
    playerOneCurrentPoint.innerHTML = 0;
    currentPLayer = "two";
  } else {
    playerTwoCurrentPoint.innerHTML = 0;
    currentPLayer = "one";
  }
}

function diceSixOccurence() {
  setDices(6, 6);
  if (currentPLayer === "one") {
    playerOneTotalPoint.innerHTML = 0;
    currentPLayer = "two";
  } else {
    playerTwoTotalPoint.innerHTML = 0;
    currentPLayer = "one";
  }
}

function setDices(first, second) {
  let dices = [diceOne, diceTwo];
  let places = [first, second];
  for (let i = 0; i < dices.length; i++) {
    dices[i].style.display = "block";
    dices[i].src = selectDice(places[i]);
  }
}

function triggerDice() {
  if (gameState === "playing") {
    let first = Math.floor(Math.random() * 6) + 1;
    let second = Math.floor(Math.random() * 6) + 1;

    if (currentPLayer === "one") {
      if (first == 1 || second == 1) {
        diceOneOccurence(first, second);
      } else if (first == 6 && second == 6) {
        diceSixOccurence();
      } else {
        setDices(first, second);
        playerOneCurrentPoint.innerHTML =
          Number(playerOneCurrentPoint.innerHTML) + (first + second);
      }
    } else {
      if (first == 1 || second == 1) {
        diceOneOccurence(first, second);
      } else if (first == 6 && second == 6) {
        diceSixOccurence();
      } else {
        setDices(first, second);
        playerTwoCurrentPoint.innerHTML =
          Number(playerTwoCurrentPoint.innerHTML) + (first + second);
      }
    }
  }
}

body.onload = initialize();
