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

  const checkRows = () => {
    for(let i = 0; i < gameArr.length; i += 1){
        if(gameArr[i].every(element => element === playerOne.symbol)){
            playerOne.win = true;
        } else if(gameArr[i].every(element => element === playerTwo.symbol)){
            playerTwo.win = true;
        }
    }
  }

  const checkCols = () => {
    for ( let i = 0; i < gameArr[0].length; i += 1){
        const currentCol = [];

        for (let j = 0; j < gameArr.length; j += 1){
            currentCol.push(gameArr[j][i]);
        }

        if(currentCol.every(element => element === playerOne.symbol)){
            playerOne.win = true;
        } else if(currentCol.every(element => element === playerTwo.symbol)){
            playerTwo.win = true;
        }
    }
  }

  const checkDiags = () => {
    const diag1 = [gameArr[0][0], gameArr[1][1], gameArr[2][2]];
    const diag2 = [gameArr[0][2], gameArr[1][1], gameArr[2][0]];

    if(diag1.every(element => element === playerOne.symbol)){
        playerOne.win = true;
    } else if (diag1.every(element => element === playerTwo.symbol)){
        playerTwo.win = true;
    }

    if(diag2.every(element => element === playerOne.symbol)){
        playerOne.win = true;
    } else if (diag2.every(element => element === playerTwo.symbol)) {
        playerTwo.win = true;
    }


  }

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

    checkRows();
    checkCols();
    checkDiags();
  };

  return { playerOne, playerTwo, gameArr, click };
})();

const display = (() => {
  const container = document.querySelector("#container");

  const addCell = (row, col) => {
    const cell = document.createElement("div");
    cell.textContent = game.gameArr[row][col];
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
        addCell(i, j);
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
