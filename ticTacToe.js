const winningMoves = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function GameBoard() {
  // User inputs 1-9 to select a space
  let board = {
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
  };

  const getSpace = (space) => {
    return board[space];
  };

  const printBoard = () => {
    console.log(
      "\n " +
        board[1] +
        " | " +
        board[2] +
        " | " +
        board[3] +
        "\n" +
        " --------- " +
        "\n" +
        " " +
        board[4] +
        " | " +
        board[5] +
        " | " +
        board[6] +
        "\n" +
        " --------- " +
        "\n" +
        " " +
        board[7] +
        " | " +
        board[8] +
        " | " +
        board[9] +
        "\n"
    );
  };

  const makeMove = (player, space) => {
    if (board[space] !== " ") return false;
    else {
      board[space] = player;
      return true;
    }
  };

  return { printBoard, makeMove, getSpace };
}

function Game() {
  const player1 = "X";
  const player2 = "O";
  let activePlayer = player1;
  let winner;
  let board = GameBoard();
  board.printBoard(); // Initially print board to terminal

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const takeTurn = (space) => {
    if (board.makeMove(activePlayer, space)) {
      if (checkForWinner(space)) winner = activePlayer;
      else switchPlayerTurn();
      board.printBoard();
      return true;
    } else return false;
  };

  const checkForWinner = (space) => {
    let sequence = 0;
    for (let i = 0; i < winningMoves.length; i++) {
      if (!winningMoves[i].includes(space)) continue;
      for (let j = 0; j < 3; j++) {
        if (board.getSpace(winningMoves[i][j]) === activePlayer) {
          sequence++;
        }
      }
      if (sequence === 3) {
        return true;
      }
      sequence = 0;
    }
    return false;
  };

  const getWinner = () => {
    return winner;
  };

  return {
    switchPlayerTurn,
    takeTurn,
    getActivePlayer,
    getWinner,
  };
}
let currentGame = Game();

const prompt = require("prompt-sync")({ sigint: true });

while (true) {
  let space = prompt(
    "" +
      currentGame.getActivePlayer() +
      "'s turn! Please enter an available space between 1-9:"
  );
  let isValid = currentGame.takeTurn(Number(space));
  while (!isValid) {
    space = prompt(
      "The space selected is invalid or already occupied.  Please select a valid open space: "
    );
    isValid = currentGame.takeTurn(space);
  }
  if (currentGame.getWinner()) {
    console.log(
      "Congratulations " + currentGame.getActivePlayer() + "! You Win!"
    );
    break;
  }
}
