
// gameboard module
var gameBoard = (function() {

    let n = 3;
    // PRIVATE VARIABLES 
    var gameboard = [
         "_", "_", "_",
         "_", "_", "_",
         "_", "_", "_"
    ];



    // PRIVATE METHODS

    const _getBoard = function() {
        return gameboard;
    }

    const _isEmpty = function(square) {
        //is it empty
        return (gameboard[square] === "_")
    }

    const _winCheck = function(square) {
        


        
        return

    }

    const _rowCheck = function(square){

        //find the column number
        let colNum = square % n;
        //go to the beginning of the row
        for (i = (square - colNum); i < ((square - colNum) + n); i++) {
            if (gameboard[i] !== gamePlay.activePlayer().getSymbol()){

                return false;
            }
        }
        return true;

    }

    const _colCheck = function(square){

        //find the row number
        let rowNum = Math.floor(square/n);
        //go to the beginning of the column
        let colNum = square - (n * rowNum);
        let i = colNum;
        //keep adding n unless already in last row
        while (i < (n*n)){
            //move down the column 
            if (gameboard[i] !== gamePlay.activePlayer().getSymbol()){

                return false;
            }

            i+=n;
        }
        return true;

    }

    const _diagCheck = function (square) {

        let i = 0;
        while (i < (n*n)) {
            if (gameboard[i] !== gamePlay.activePlayer().getSymbol()){
                return false;
            }


            //move down the diagonal
            i = i + n + 1;
        }
        return true;
    }

    const _revDiagCheck = function (square) {

        // start at top right corner
        let i = n-1;
        console.log(i);
        // stop at bottom left corner
        while (i < (n * n) - (n-1) ) {
            if (gameboard[i] !== gamePlay.activePlayer().getSymbol()){
                return false;
            }
            //move down the diagonal
            i = i + n - 1;
            console.log(i);
        }
        return true;
    }






    
    // PUBLIC METHODS 

    const getBoard = function() {
        return _getBoard();
    }

    //update a square
    const update = function(square) {
        if (_isEmpty(square)) {
             gameboard[square] = gamePlay.activePlayer().getSymbol();
             displayController.update();
             if (_rowCheck(square) || _colCheck(square) 
             || _diagCheck(square) || _revDiagCheck(square)) {
                console.log("win");
             }
             gamePlay.changePlayer();
        }

    }




    return {
        getBoard: getBoard,
        update: update
    };

})();

// player creation factory function
var Player = (name, symbol) => {

    var playerName = name;
    var symbol = symbol;

    let changeName = function(newname) {
        playerName = newname;
    }

    let getName = function() {
        return playerName;
    }

    const changeSymbol = function() {

        
    }

    const getSymbol = function () {
        return symbol;
    }

    const turn = function(){

    }

    return {
        getName: getName,
        changeName: changeName,
        turn: turn,
        getSymbol: getSymbol
    }

}

//gameplay controller module
var gamePlay = (function() {
    
    var player1 = Player("Yuri", "X");
    var player2 = Player("Arietty", "O");

    var currentPlayer = player1;

    const changePlayer = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }

    }

    const activePlayer = function() {
        return currentPlayer;

    }
    return {
        activePlayer: activePlayer,
        changePlayer: changePlayer,
        player1: player1,
        player2: player2

    }

})();

// display controller module 
var displayController = (function() {

    //nodelist for squares on DOM
    const squares = document.querySelectorAll(".square");
    var squareNum;
    // update the board display
    const update = function() {
        const board = gameBoard.getBoard();

        for (i = 0; i < board.length; i++) {
            squares[i].textContent = board[i];
        }
    }

    // mark a square
    const changeSquare = function(e){
        _whichSquare(e);
        gameBoard.update(squareNum);
    }

    // PRIVATE: find which square we clicked on
    const _whichSquare = function(e) {
        squareNum = Array.prototype.indexOf.call(squares, e.target);
    }

    return {
        update: update,
        changeSquare: changeSquare
    }



})();

document.addEventListener("click", function(e){
    if (e.target.classList.contains("square")) {
        displayController.changeSquare(e);
        console.log()

    } 


});

displayController.update();

