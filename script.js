const playerFac = (str) => {
    const playerSymbol = str;
    return { playerSymbol };
}

const gameboard = (() => {

    const playerOne = playerFac('X');
    const playerTwo = playerFac('O');
    let numMoves = 0;
    const gameArr = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const click = (row, col) => {
        if(numMoves % 2 === 0){
            gameArr[row][col] = playerOne.playerSymbol;
        }else{
            gameArr[row][col] = playerTwo.playerSymbol;
        }
        numMoves += 1;
    }

    return { playerOne, playerTwo, gameArr, click };
})();

const display = (() => {

    const container = document.querySelector('#container');

    const addCell = (str, row, col) => {
        const cell = document.createElement('div');
        cell.textContent = str;
        cell.classList.add('cell');
        cell.setAttribute('row', row);
        cell.setAttribute('col', col);
        container.appendChild(cell);
    }

    const showGameState = (arr) => {
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
         for(let i = 0; i < arr.length; i+=1){
            for(let j = 0; j < arr.length; j+=1){
                addCell(arr[i][j], i, j);
            }
         }

         const cells = document.querySelectorAll('.cell');
         cells.forEach((div) => {
            div.addEventListener('click', () => {
                gameboard.click(div.getAttribute('row'),div.getAttribute('col'));
                showGameState(gameboard.gameArr);
            })
         })
    }

    return { showGameState };
})();



display.showGameState(gameboard.gameArr);