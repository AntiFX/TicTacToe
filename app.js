const tictactoe = (() => {
    const gameBoard = (() => {
        const create = (() =>{
            //creates a gameboard from 0 to everything
            const boardContainer = document.querySelector("#gameBoard");
            for(let i = 0; i < 9; i++){
                const gameSquare = document.createElement("div");
                gameSquare.id = `${i}`;
                gameSquare.classList.add("square");
                boardContainer.appendChild(gameSquare);
                gameSquare.addEventListener("click", updateBoard);
            }
        })

        const updateBoard = ((e) => {
            chosenSquare = document.getElementById(e.currentTarget.id);
            chosenSquare.innerText = player.turnTaken();
        })
        return {
            create,
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
        
        return {
        };
    })();

    return {
        gameBoard,
        player,
        gameLogic,
    };
})();

tictactoe.gameBoard.create();