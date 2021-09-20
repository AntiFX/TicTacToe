const tictactoe = (() => {
    const gameBoard = (() => {

        const currentBoard = {
            row1: [null, null, null],
            row2: [null, null, null],
            row3: [null, null, null],
        };

        const create = (() =>{
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
        })

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
        
        
        return {turnTaken};
    })();


    const gameLogic = (() => {

        const checkWin = ((currentBoard) => {
            const row1 = currentBoard.row1;
            const row2 = currentBoard.row2;
            const row3 = currentBoard.row3;

            for(let i = 0; i < 3; i++){
                thisRow = Object.keys(currentBoard)[i];
                thisRowEle = currentBoard[thisRow];
                if(thisRowEle[0] == thisRowEle[1] && thisRowEle[1] == thisRowEle[2] && thisRowEle[0] != null){
                    console.log(`${thisRowEle[0]} won!`)
                    //TODO create an end game state if a player wins
                }
            }
        });
        const getBoardState = (() => {
            allSquares = document.querySelectorAll(".square");
            
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