const playerFac = (str) => {
  const symbol = str;
  const score = 0;
  const win = false;
  return { symbol, score, win };
};

const game = (() => {
  const playerOne = playerFac("X");
  const playerTwo = playerFac("O");
  let numMoves = 0;
  const gameArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const click = (row, col) => {
    if (gameArr[row][col] !== "") {
      return;
    }

    if (numMoves % 2 === 0) {
      gameArr[row][col] = playerOne.symbol;
    } else {
      gameArr[row][col] = playerTwo.symbol;
    }
    numMoves += 1;

    if (numMoves === 9) {
      playerOne.win = true;
    }
  };

  return { playerOne, playerTwo, gameArr, click };
})();

const display = (() => {
  const container = document.querySelector("#container");

  const addCell = (str, row, col) => {
    const cell = document.createElement("div");
    cell.textContent = str;
    cell.classList.add("cell");
    cell.setAttribute("row", row);
    cell.setAttribute("col", col);
    container.appendChild(cell);
  };

  const checkWin = () => {
    if (game.playerOne.win) {
      console.log(`The winner is Player ${game.playerOne.symbol}`);
    } else if (game.playerTwo.win) {
      console.log(`The winner is Player ${game.playerTwo.symbol}`);
    }
  };

  const showGameState = () => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    for (let i = 0; i < game.gameArr.length; i += 1) {
      for (let j = 0; j < game.gameArr.length; j += 1) {
        addCell(game.gameArr[i][j], i, j);
      }
    }

    const cells = document.querySelectorAll(".cell");
    cells.forEach((div) => {
      div.addEventListener("click", () => {
        game.click(div.getAttribute("row"), div.getAttribute("col"));
        showGameState();
        checkWin();
      });
    });
  };

  return { showGameState };
})();

display.showGameState(game.gameArr);
