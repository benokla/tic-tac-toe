const gameBoard = (() => {
    // Store the actual gameboard
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    // Displays the board array
    let display = () => {
        const gameBoardDivs = document.querySelectorAll(".gameBoardDiv");
        for(let i = 0; i<board.length; i++) {
            gameBoardDivs[i].textContent = board[i]
        }
    };

    let updateBoard = (index, player) => {
        console.log(index, player, "a")
        board[index] = player.mark;
    }
    
    return {display, board, updateBoard}
})();

const playerFactory = (name, mark) => {
    return {name, mark}
}

// Control game
const game = (() => {
    let pick = () => {
        const gameBoardDivs = document.querySelectorAll(".gameBoardDiv");
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (e) => {
                let currentPick = e.target.dataset.index;
                gameBoard.updateBoard(currentPick, game.currentPlayer(player1, player2))
                gameBoard.display()
            })
        })
    }

    let currentPlayer = (player1, player2) => {
        if(!(gameBoard.board.includes("X") || gameBoard.board.includes("O"))) {
            return player1;
        } else {
            let countX = gameBoard.board.filter(mark => mark == "X").length;
            let countO = gameBoard.board.filter(mark => mark == "O").length;

            if(countX == countO) {
                return player1;
            } else {
                return player2;
            }
        }
    }

    return {pick, currentPlayer}
})();

const player1 = playerFactory("Jakob", "X");
const player2 = playerFactory("Benni", "O");

gameBoard.display()
game.pick()

