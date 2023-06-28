// Variables
let currentPlayer = "X";
let firstTurnPlayer = "X"; // Stores the player who starts the first turn
const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset");
const resetButton1 = document.querySelector(".reset1");
const playAgainButton = document.querySelector(".play-again");
const playAgainButton1 = document.querySelector(".play-again1");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
let count = 1;
const matches = document.getElementById("matches").innerText=`Game No: ${count}`;
let player1Name = "";
let player2Name = "";
let currentPlayerName = ""; // Initialize currentPlayerName with an empty string
let turnAudio = new Audio("turnchange.wav");
let winAudio = new Audio("winning.wav");
let drawAudio = new Audio("draw.wav");
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let winner = null;
let popup1 = document.querySelector(".popup1");


// Functions
function handleBoxClick(index) {
  if (gameActive && board[index] === "") {
    board[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;
    boxes[index].classList.add(currentPlayer);

    if (checkWin()) {
      endGame();
      showWinner();
      
    } else if (isBoardFull()) {
      draw();
      showDraw();
      
    } else {
      togglePlayer();
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      winner = currentPlayer;
      
      return true;
    }
  }
 
  return false;
}

function isBoardFull() {
  return board.every(cell => cell !== "");
}

function endGame() {
  gameActive = false;

  if (currentPlayer === "X") {
    player1Score.innerText = `${player1Name}: ${parseInt(player1Score.innerText.split(":")[1]) + 1}`;
    player2Score.innerText = `${player2Name}: ${player2Score.innerText.split(":")[1]}`;
  } else {
    player1Score.innerText = `${player1Name}: ${player1Score.innerText.split(":")[1]}`;
    player2Score.innerText = `${player2Name}: ${parseInt(player2Score.innerText.split(":")[1]) + 1}`;
  }
}

function draw() {
  gameActive = false;
}


function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = firstTurnPlayer; // Set current player to the first turn player
    currentPlayerName = currentPlayer === "X" ? player1Name : player2Name; // Assign currentPlayerName based on the current player
    gameActive = true;
    winner = null;
  
    boxes.forEach(box => {
      box.innerText = "";
      box.classList.remove("X", "O");
    });
  
    document.getElementById("current-player-name").innerText = currentPlayerName;
  }
  

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
  document.getElementById("current-player-name").innerText = currentPlayerName;
  turnAudio.play();
}

function showWinner(playerName) {
  const h2Element = document.querySelector('.popup1 h2');
  h2Element.textContent = `${currentPlayerName} won the game!`;
  winAudio.play();
  popup1.style.display = "block";
}

function showDraw(playerName) {
  const h2Element = document.querySelector('.popup1 h2');
  h2Element.textContent = `Game is Drawn`;
  drawAudio.play();
  popup1.style.display = "block";
}


// Event Listeners
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleBoxClick(index));
});

resetButton.addEventListener("click", ()=>{
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = firstTurnPlayer; // Set current player to the first turn player
    currentPlayerName = currentPlayer === "X" ? player1Name : player2Name; // Assign currentPlayerName based on the current player
    gameActive = true;
    winner = null;
    playerNamesPopup.style.display = "block";
    boxes.forEach(box => {
      box.innerText = "";
      box.classList.remove("X", "O");
    });
    count=1;
    document.getElementById("matches").innerText=`Game No: ${count}`;
    document.getElementById("current-player-name").innerText = currentPlayerName;
    player1Score.style.display="none";
    player2Score.style.display="none";
});

resetButton1.addEventListener("click", ()=>{
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = firstTurnPlayer; // Set current player to the first turn player
  currentPlayerName = currentPlayer === "X" ? player1Name : player2Name; // Assign currentPlayerName based on the current player
  gameActive = true;
  winner = null;
  playerNamesPopup.style.display = "block";
  winAudio.pause();
    popup1.style.display="none";
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("X", "O");
  });
  count=1;
  document.getElementById("matches").innerText=`Game No: ${count}`;
  document.getElementById("current-player-name").innerText = currentPlayerName;
  player1Score.style.display="none";
  player2Score.style.display="none";
});


playAgainButton.addEventListener("click", () => {
    resetGame();
    firstTurnPlayer = firstTurnPlayer === "X" ? "O" : "X"; // Toggle the first turn player
    currentPlayer = firstTurnPlayer; // Set current player to the first turn player
    currentPlayerName = currentPlayer === "X" ? player1Name : player2Name; // Assign currentPlayerName based on the current player
    document.getElementById("current-player-name").innerText = currentPlayerName;
    count++;
    document.getElementById("matches").innerText=`Game No: ${count}`;
  });
  playAgainButton1.addEventListener("click", () => {
    resetGame();
    firstTurnPlayer = firstTurnPlayer === "X" ? "O" : "X"; // Toggle the first turn player
    currentPlayer = firstTurnPlayer; // Set current player to the first turn player
    currentPlayerName = currentPlayer === "X" ? player1Name : player2Name; // Assign currentPlayerName based on the current player
    document.getElementById("current-player-name").innerText = currentPlayerName;
    winAudio.pause();
    popup1.style.display="none";
    count++;
    document.getElementById("matches").innerText=`Game No: ${count}`;
  });
  
  
// Player Names Form
const playerNamesForm = document.getElementById("player-names-form");
const playerNamesPopup = document.getElementById("player-names-popup");

playerNamesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  player1Name = document.getElementById("player1-name").value;
  player2Name = document.getElementById("player2-name").value;
  player1Score.innerText = `${player1Name}: 0`;
  player2Score.innerText = `${player2Name}: 0`;
  firstTurnPlayer = "X"; // Set first turn player to Player 1
  currentPlayer = firstTurnPlayer; // Set current player to the first turn player
  currentPlayerName = player1Name; // Assign currentPlayerName with player1Name
  document.getElementById("current-player-name").innerText = currentPlayerName;
  gameActive = true;
  playerNamesPopup.style.display = "none";
  player1Score.style.display="block";
    player2Score.style.display="block";
});


    