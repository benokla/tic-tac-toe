const gameBoard = (() => {
    const restartBtn = document.querySelector("#restartBtn");

    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    const display = () => {
        const gameBoardDivs = document.querySelectorAll(".gameBoardDiv");
        for(let i = 0; i<board.length; i++) {
            gameBoardDivs[i].textContent = board[i]
        }
    };

    const updateBoard = (index, player) => {
        console.log(index, player)
        if(board[index] != "") return;
        board[index] = player.mark;
    }
    
    const clearBoard = () => {
        for(let i = 0; i<board.length; i++) {
            board[i] = "";
        }
        display(board)
        game.pick()
    }

    restartBtn.addEventListener("click", clearBoard);

    return {display, board, updateBoard}
})();

const game = (() => {
    const restartBtn = document.querySelector("#restartBtn");
    restartBtn.addEventListener("click", () => {
        active = true;
        player1.name = inputPlayer1.value
        player2.name = inputPlayer2.value
    })

    //If active is false, gameboard is locked
    let active = true;

    const display = document.querySelector("#display");
    display.textContent = "Click to begin!"

    const pick = () => {
        player1.name = inputPlayer1.value;
        player2.name = inputPlayer2.value;
        const gameBoardDivs = document.querySelectorAll(".gameBoardDiv");
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (e) => {
                console.log(active)
                if(active == false) return
                let currentPick = e.target.dataset.index;
                gameBoard.updateBoard(currentPick, game.currentPlayer(player1, player2))
                gameBoard.display()
                display.textContent = displayWinner(checkForWinner(gameBoard.board, player1, player2));
            })
        })
    }

    const currentPlayer = (player1, player2) => {
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

    const checkForWinner = (gameboard, player1, player2) => {
        //Check for 3 in a line horizontally
        if(gameboard[0] == player1.mark && gameboard[1] == player1.mark && gameboard[2] == player1.mark) {
            return player1;
        }else if(gameboard[0] == player2.mark && gameboard[1] == player2.mark && gameboard[2] == player2.mark) {
            return player2;
        }else if(gameboard[3] == player1.mark && gameboard[4] == player1.mark && gameboard[5] == player1.mark) {
            return player1;
        }else if(gameboard[3] == player2.mark && gameboard[4] == player2.mark && gameboard[5] == player2.mark) {
            return player2;
        }else if(gameboard[6] == player1.mark && gameboard[8] == player1.mark && gameboard[7] == player1.mark) {
            return player1;
        }else if(gameboard[6] == player2.mark && gameboard[8] == player2.mark && gameboard[7] == player2.mark) {
            return player2;
        //Check for 3 in a line vertically
        }else if(gameboard[0] == player1.mark && gameboard[3] == player1.mark && gameboard[6] == player1.mark) {
            return player1;
        }else if(gameboard[0] == player2.mark && gameboard[3] == player2.mark && gameboard[6] == player2.mark) {
            return player2;
        }else if(gameboard[1] == player1.mark && gameboard[4] == player1.mark && gameboard[7] == player1.mark) {
            return player1;
        }else if(gameboard[1] == player2.mark && gameboard[4] == player2.mark && gameboard[7] == player2.mark) {
            return player2;
        }else if(gameboard[2] == player1.mark && gameboard[8] == player1.mark && gameboard[5] == player1.mark) {
            return player1;
        }else if(gameboard[2] == player2.mark && gameboard[8] == player2.mark && gameboard[5] == player2.mark) {
            return player2;
        }
        //Check for 3 diagonally
        else if(gameboard[0] == player1.mark && gameboard[8] == player1.mark && gameboard[4] == player1.mark) {
            return player1;
        }else if(gameboard[0] == player2.mark && gameboard[8] == player2.mark && gameboard[4] == player2.mark) {
            return player2;
        }else if(gameboard[2] == player1.mark && gameboard[4] == player1.mark && gameboard[6] == player1.mark) {
            return player1;
        }else if(gameboard[2] == player2.mark && gameboard[4] == player2.mark && gameboard[6] == player2.mark) {
            return player2;
        }else {
            if(gameboard.includes("")) {
                return ""
            } else {
                return "Tie"
            }
        }
    }

    const displayWinner = (player) => {
        if(player == "") {
            return;
        } else if(player == "Tie") {
            return "It's a tie."
        } else {
            active = false;
            return `And the winner is ${player.name} with ${player.mark}`
        }
    }

    const inputPlayer1 = document.querySelector("#inputPlayer1");
    const inputPlayer2 = document.querySelector("#inputPlayer2");
   
    const playerFactory = (name, mark) => {
        return {name, mark}
    }

    const player1 = playerFactory(inputPlayer1.value, "X");
    const player2 = playerFactory(inputPlayer2.value, "O");

    return {pick, currentPlayer, active}
})();



// init
gameBoard.display()
game.pick()

