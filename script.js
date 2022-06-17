// gameboard module
var gameBoard =   (function() {

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
    
    // PUBLIC METHODS 

    const getBoard = function() {
        return _getBoard();
    }

    //update a square
    const update = function(square) {
        if (_isEmpty(square)) {
             gameboard[square] = gamePlay.activePlayer().getSymbol();
             displayController.update();
             gamePlay.changePlayer();
        }

    }




    return {
        getBoard: getBoard,
        update: update
    };

})();


//gameplay controller module
var gamePlay = (function() {
    
    var currentPlayer;

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
        changePlayer: changePlayer

    }

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
        console.log(squareNum);
    }

    return {
        update: update,
        changeSquare: changeSquare
    }



})();

document.addEventListener("click", function(e){
    if (e.target.classList.contains("square")) {
        console.log("clicked square")
        displayController.changeSquare(e);
        console.log()

    } 


});

displayController.update();

let player1 = Player("Yuri", "X");
console.log(player1);
let n = player1.getName();
console.log(n);
player1.changeName("Russ", "O");
console.log(player1.getName());
console.log(player1.playerName);

let player2 = Player("Arietty", "O");
console.log(player2.getName());
gamePlay.changePlayer();