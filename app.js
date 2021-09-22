const tictactoe = (() => {
    const gameBoard = (() => {
        let currentBoard;

        const updateResults = ((winText) => {
            const element = document.getElementById("results");
            element.innerHTML = winText;
        })

        const createBoard = (() => {
            let newBoard = {
            row1: [null, null, null],
            row2: [null, null, null],
            row3: [null, null, null],
            }
            currentBoard = newBoard;
        });
        const changePopUp = (() => {
            const element = document.getElementById("popUpBackground").style;
            const state = element.display;
            if(state === "" || state === "flex"){
                element.display = "none";
            } else if(state === "none"){
                element.display = "flex";
            }
        })

        const create = (() => {
            //creates a gameboard from 0 to everything
            const boardContainer = document.querySelector("#gameBoard");
            document.getElementById("namesButton").addEventListener("click", gameLogic.namesInputted);
            document.getElementById("resetButton").addEventListener("click", gameLogic.resetGame);
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
            const square = document.getElementById(e.currentTarget.id);
            if(isSqaureAvailable(square) == true){
                let value = player.turnTaken();
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
            changePopUp,
            updateResults,
        };
    })();


    const player = (() => {
        let turns = 1;

        const playerFactory = (name, symbol) => {
            let wins = 0;
            return { name, symbol, wins };
          };

        const turnTaken = (() => {
            turns++;
            return playersTurn();
        });
        const playersTurn =(() => {
            if(turns % 2 == 0){
                return firstPlayer.symbol;
            } else if (turns % 2 != 0){
                return secondPlayer.symbol;
            }
        });

        const reset = (() => {
            turns = 1;
            players = [];
        });
        
        
        return {
            turnTaken,
            reset,
            playerFactory,
        };
    })();


    const gameLogic = (() => {
        const checkWin = ((currentBoard) => {
            let allRows = Object.keys(currentBoard);
            let topLeft = currentBoard[allRows[0]][0];
            let topRight = currentBoard[allRows[0]][2];
            let middle = currentBoard[allRows[1]][1];
            let botRight = currentBoard[allRows[2]][2];
            let botLeft = currentBoard[allRows[2]][0];
            let nullValue = false;
            for(let i = 0; i < 3; i++){
                let thisRow = allRows[i];
                let thisRowEle = currentBoard[thisRow];
                //Check Win state in rows, columns and Diag
                if(winLogic(currentBoard[allRows[i]][0], currentBoard[allRows[i]][1], currentBoard[allRows[i]][2]) == true){
                    won(thisRowEle[0]);
                    return "game won";
                } else if (winLogic(currentBoard[allRows[0]][i], currentBoard[allRows[1]][i], currentBoard[allRows[2]][i]) == true){
                    won(currentBoard[allRows[0]][i]);
                    return "game won";
                } else if ((winLogic(topLeft, middle, botRight) == true) || (winLogic(topRight, middle, botLeft) == true)){
                    won(middle);
                    return "game won";
                } else {
                        for(let n=0; n < thisRowEle.length; n++){
                            if(thisRowEle[n] === null){
                                nullValue = true;
                                break;
                            }
                        }
                    }        
            }
            if(nullValue == false){
                won("tie");
            }
        });

        const winLogic = ((ele0, ele1, ele2) => {
            if(ele0 === ele1 && ele1 === ele2 && ele0 === ele2 && ele1 !== null){
                return true;
            } else {
                return false;
            }
        });
        const won = ((symbol) => {
            //send a message that someone won
            alertWin(symbol);
            // clear the game_board
            gameBoard.clearBoard();
            //reset the player turns
            player.reset();
            
        });

        const alertWin = ((symbol) => {
            let winText = "Error";
            if(symbol == "X" || symbol == "O"){
                if (symbol === firstPlayer.symbol){
                    firstPlayer.wins++;
                    winText =  `${firstPlayer.name} has won ${firstPlayer.wins} time(s)`;
                } else if (symbol === secondPlayer.symbol){
                    secondPlayer.wins++;
                    winText = `${secondPlayer.name} has won ${secondPlayer.wins} time(s)`;
                }
            } else {
                winText = "It was a tie!";
            }

            gameBoard.updateResults(winText);
        })

        const namesInputted = (() => {
            const temp1 = (document.getElementById("player1").value);
            const temp2 = (document.getElementById("player2").value);
            firstPlayer = player.playerFactory(temp1, "X");
            secondPlayer = player.playerFactory(temp2, "O");
            gameBoard.changePopUp();


        });

        const resetGame = (()=>{
            player.reset();
            firstPlayer = "";
            secondPlayer = "";
            gameBoard.clearBoard();
            gameBoard.changePopUp();
            gameBoard.updateResults("");
        })
        
        return {
            checkWin,
            namesInputted,
            resetGame,
        };
    })();

    return {
        gameBoard,
        player,
        gameLogic,
    };
})();

let firstPlayer = "";
let secondPlayer = "";
tictactoe.gameBoard.create();