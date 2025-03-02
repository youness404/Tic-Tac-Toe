const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let xTurn = true;
let gameActive = true;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(e){
    const cell = e.target;
    //console.log(cell);
    const currentClass = xTurn ? 'x' : 'o';

    if(!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    cell.classList.add(currentClass);
    cell.style.transfrom = 'scale(0)';

    setTimeout(()=>{
        cell.style.transfrom = 'scale(1)';
    },10);

    // check game status
    if(checkWin(currentClass)){
        gameActive = false;
        status.innerHTML = `Player ${currentClass.toUpperCase()} wins! 🎉`;
        status.classList.add('win');
        return;
    }

    if(checkDraw()){
        gameActive = false;
        status.innerHTML = "Game is a draw! 🤝";
        return;
    }

    //switch turns
    xTurn = !xTurn;
    status.innerHTML = `Player ${xTurn ? 'X' : 'O'}'s turn`;
}

// Check for the win
function checkWin(currentClass){
    return winCombos.some(combo => {
        return combo.every(idx => {
            return cells[idx].classList.contains(currentClass);
        });
    });
}

// Check for Draw
function checkDraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains('x') || cell.classList.contains('o')
    });
}

// Reset the game
function resetGame(){
    xTurn = true;
    gameActive = true;
    status.innerHTML = "Player X's turn";
    status.classList.remove('win');
    cells.forEach(cell =>{
        cell.classList.remove('x','o');
        cell.style.transfrom = '';
    });
}

cells.forEach(cell=>
    cell.addEventListener('click',handleClick)
);
resetBtn.addEventListener('click',resetGame);