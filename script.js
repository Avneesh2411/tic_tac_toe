let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentTurnMessage = () => `It's ${currentPlayer}'s turn`;

const statusDisplay = document.querySelector('#status-display');

function startGame() {
  statusDisplay.innerHTML = currentTurnMessage();
}

function handleClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

  checkWin();
}

function checkWin() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winMessage();
    gameActive = false;
    return;
  }

  checkDraw();
}

function checkDraw() {
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentTurnMessage();
}

function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentTurnMessage();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
document.querySelector('#restart-button').addEventListener('click', restartGame);

startGame();