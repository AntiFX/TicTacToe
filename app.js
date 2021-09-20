const tictactoe = (() => {
    const gameBoard = (() => {
        let currentBoard;

        const createBoard = (() => {
            let newBoard = {
            row1: [null, null, null],
            row2: [null, null, null],
            row3: [null, null, null],
            }
            currentBoard = newBoard;
        });

        const create = (() => {
            //creates a gameboard from 0 to everything
            const boardContainer = document.querySelector("#gameBoard");
            for(let i = 0; i < 9; i++){
                const gameSquare = document.createElement("div");
                gameSquare.id = `${i}`;
                gameSquare.classList.add("square");
                boardContainer.appendChild(gameSquare);
                gameSquare.addEventListener("click", updateBoard);
                gameSquare.classList.add(`square${i}`);
            }
            createBoard();
        })

        const clearBoard = (() => {
            const allSquares = [...document.querySelectorAll(".square")];
            for(let i = 0; i < allSquares.length; i++){
                allSquares[i].innerHTML = "";
            }
            createBoard();

        });

        const updateBoard = ((e) => {
            square = document.getElementById(e.currentTarget.id);
            if(isSqaureAvailable(square) == true){
                value = player.turnTaken();
                square.innerText = value;
                gameBoardState(parseInt(square.id), value);
            }
        })
        const gameBoardState = ((square, value) => {
            if(square === 0 || square === 1 || square === 2){
                currentBoard.row1[square] = value;
            } else if(square === 3 || square === 4 || square === 5){
                square = square - 3;
                currentBoard.row2[square] = value;
            } else if(square === 6 || square === 7 || square === 8){
                square = square - 6;
                currentBoard.row3[square] = value;
            }

            gameLogic.checkWin(currentBoard);
        });

        const isSqaureAvailable = ((square) => {
            if(square.innerText == ""){
                return true;
            } else {
                return false;
            }
        });

        return {
            create,
            gameBoardState,
            clearBoard,
        };
    })();

    const player = (() => {
        let turns = 1;
        const symbols = ["X", "O"];

        const turnTaken = (() => {
            turns++;
            return playersTurn();
        });
        const playersTurn =(() => {
            if(turns % 2 == 0){
                return symbols[0];
            } else if (turns % 2 != 0){
                return symbols[1];
            }
        });

        const reset = (() => {
            turns = 1;
        });
        
        
        return {
            turnTaken,
            reset,
        };
    })();


    const gameLogic = (() => {

        const checkWin = ((currentBoard) => {
            const row1 = currentBoard.row1;
            const row2 = currentBoard.row2;
            const row3 = currentBoard.row3;
            let allRows = Object.keys(currentBoard);
            const topLeft = currentBoard[allRows[0]][0];
            const topRight = currentBoard[allRows[0]][2]
            const middle = currentBoard[allRows[1]][1]
            const botRight = currentBoard[allRows[2]][2]
            const botLeft = currentBoard[allRows[2]][0]
            if(middle != null){
                if(middle == topLeft && middle == botRight || middle==topRight && middle==botLeft){
                    won(middle);
                }
            }

            for(let i = 0; i < 3; i++){
                let thisRow = allRows[i];
                let thisRowEle = currentBoard[thisRow];
                let thisColumn = [currentBoard[allRows[0]][i], currentBoard[allRows[1]][i], currentBoard[allRows[2]][i]]
                //Check Win state in rows
                if(thisRowEle[0] == thisRowEle[1] && thisRowEle[1] == thisRowEle[2] && thisRowEle[0] != null){
                    won(thisRowEle[0]);
                //check win state in columns
                } else if(thisColumn[0] == thisColumn[1] && thisColumn[1] == thisColumn[2] && thisColumn[0] != null){
                    won(thisRowEle[0]);
                }
            }

            
                
        });
        const won = ((symbol) => {
            //send a message that someone won
            alert(`${symbol} won!`)
            // clear the game_board
            gameBoard.clearBoard();
            //reset the player turns
            player.reset();

            
        });
        
        return {
            checkWin,
        };
    })();

    return {
        gameBoard,
        player,
        gameLogic,
    };
})();

tictactoe.gameBoard.create();