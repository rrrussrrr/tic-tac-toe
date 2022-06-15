// gameboard module
var gameBoard =   (function() {

    var gameboard = [
         "X", "X", "O",
         "O", "O", "X",
         "X", "O", "X"
    ];

    const getBoard = function() {
        return _getBoard();
    }

    const _getBoard = function() {
        return gameboard;
    }
    return {
        getBoard
    };

})();



// player creation factory function
var Player = (name) => {

    const playerName = name;

    function _changeName (name) {
        playerName = name;
    }





    return {

    }

}

// display controller module 
var displayController = (function() {

    
    // update the board display
    const update = function() {
        const squares = document.querySelectorAll(".square");
        const board = gameBoard.getBoard();

        for (i = 0; i < board.length; i++) {
            squares[i].textContent = board[i];
        }
    }


    return {
        update
    }



})();

//gameplay controller module
var gamePlay = (function() {




})();

