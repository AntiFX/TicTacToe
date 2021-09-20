const tictactoe = (() => {
    const gameBoard = (() => {
        const create = (() =>{
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
            document.getElementById(e.currentTarget.id).innerText = "X";
        })
        return {
            create,
        };
    })();

    const playerFactory = (name, age) => {
        
        return {name, age};
    };


    const gameLogic = (() => {
        
        return {
        };
    })();

    return {
        gameBoard,
        playerFactory,
        gameLogic,
    };
})();

tictactoe.gameBoard.create();