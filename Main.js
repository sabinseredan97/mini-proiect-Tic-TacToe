const boxElements = document.querySelectorAll(".box");
let boardState = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let xClass = 'x';
let circleClass = "circle";
let circleTurn;
let restartBbutton = document.getElementById("resetBtn");

startGame();

restartBbutton.addEventListener('click', startGame);

function startGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    circleTurn = false;
    boxElements.forEach(box => {
        console.log(box);
        box.classList.remove(xClass);
        box.classList.remove(circleClass);
        box.removeEventListener('click', handleClick);
        box.addEventListener('click', handleClick, {once: true})
    });
    showPlayerTurn();
    document.getElementById("winningMessage").classList.remove("show");
}

function handleClick(event) {
    let box = event.target;
    let currentClass;
    if (circleTurn) {
        currentClass = circleClass;
    } else {
        currentClass = xClass;
    }
    placeMark(box, currentClass);
    if (checkIfGameWon(currentClass)) {
        endGame(false);
    } else if (checkIfDraw()) {
        endGame(true);
    } else {
        swapTurn();
        showPlayerTurn();
    }
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass);
    boardEkement = document.querySelector(".box x");
    
    for (let i = 0; i < boxElements.length; ++i) {
        if (boxElements[i].classList.contains(currentClass)) {
            boardState[i] = currentClass;
        }
    }
}

function swapTurn() {
    if (circleTurn) {
        circleTurn = false;
    } else {
        circleTurn = true;
    }
}

function showPlayerTurn() {
    let turnMessage;
    if (circleTurn) {
        turnMessage = "Circle's turn!";
    } else {
        turnMessage = "X's turn!";
    }
    document.getElementById("playersTurn").innerHTML = turnMessage;
}

function checkIfGameWon(currentClass) {
    let winningComboCheck = true;
    for (let i = 0; i < winningCombinations.length; ++i) {
        winningComboCheck = true;
        for (let j = 0; j < 3; ++j) {
            if (currentClass !== boardState[winningCombinations[i][j]]) {
                winningComboCheck = false;
            }
        }
        if (winningComboCheck) {
            break;
        }
    }
    return winningComboCheck;
}

function checkIfDraw() {
    let isDraw;
    for (let i = 0; i < boxElements.length; ++i) {
        if (boxElements[i].classList.contains(circleClass)
        || boxElements[i].classList.contains(xClass)) {
            isDraw = true;
        } else {
            isDraw = false;
            break;
        }
    }
    return isDraw;
}

function endGame(draw) {
    if (draw) {
        document.getElementById("display-winning-message").innerHTML = "It's a DRAW!";
    } else if (circleTurn) {
        document.getElementById("display-winning-message").innerHTML = "O player WINS!";
    } else {
        document.getElementById("display-winning-message").innerHTML = "X players WINS!";
    }
    document.getElementById("winningMessage").classList.add("show");
}