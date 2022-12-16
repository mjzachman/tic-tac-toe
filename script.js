const playerFac = () => {
    const sayHello = () => console.log('hello!');
    return { sayHello };
}

const gameboard = (() => {

    const playerOne = playerFac();
    const playerTwo = playerFac();

    const gameArr = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['X', 'O', 'X'],
    ]
    return { playerOne, playerTwo, gameArr };
})();

const display = (() => {

    const container = document.querySelector('#container');

    const addCell = (str) => {
        const cell = document.createElement('div');
        cell.textContent = str;
        cell.classList.add('cell');
        container.appendChild(cell);
    }

    const showGameState = (arr) => {
         for(let i = 0; i < arr.length; i+=1){
            for(let j = 0; j < arr.length; j+=1){
                addCell(arr[i][j]);
            }
         }
    }

    return { showGameState };
})();




gameboard.playerOne.sayHello();
gameboard.playerTwo.sayHello();
display.showGameState(gameboard.gameArr);