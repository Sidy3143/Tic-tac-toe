const board = document.querySelector(".board");

const winner = document.querySelector(".winner");
const cells = document.querySelectorAll(".cell");

const player = document.getElementById("current-player");

let currentPlayer = "X";


let score = {"X": 0, "O": 0};

displayScore();

function game(){
    DisplayPlayer();
    //generateBoard();
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer === "X" ? "x" : "o");
                cell.disabled = true;

                if (checkWinner(currentPlayer)) {
                    winner.textContent = `${currentPlayer} won !!`;
                    winner.style.color = "#22d422";

                    score[currentPlayer] += 1;
                    
                    displayScore();
                    
                };
                if (checkDraw()) {
                    winner.textContent = `Draw !!`;
                    winner.style.color = "#f39c12";
                };
                currentPlayer = currentPlayer === "X" ? "O": "X"; // switch player
                DisplayPlayer();
            };

    });
    });
}

function DisplayPlayer() {
    player.textContent = currentPlayer;
    player.style.color = currentPlayer === "X" ? "#e74c3c": "#22d422";
           
}

function generateBoard(){
    // Create 9 cells
    board.textContent = "";

    for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    //cell.dataset.index = i;
    board.appendChild(cell);
}
};

winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll(".cell");
    for (let pattern of winPatterns){
        let win = true;
        for (let index of pattern) {
            if (cells[index].textContent !== currentPlayer) {
                win = false;
                break;
            }
        }

        if (win === true) {
            return true
        }
    } 

    return false;
};

function checkDraw(){
    for (let cell of cells) {
        if (cell.textContent === "") {
            return false;
        }
    }
    return true;
};


function displayScore() {

    const Xscore = document.getElementById("score-X");
    const Yscore = document.getElementById("score-O");

    Xscore.textContent = `${score.X}`;
    Yscore.textContent = `${score.O}`;
};

function resetBoard(){
    winner.textContent = "";
    currentPlayer = "X";
    DisplayPlayer();

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });
    currentPlayer = "X";
};

game();