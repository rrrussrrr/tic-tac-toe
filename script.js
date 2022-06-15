// gameboard module
var gameBoard =   (function() {

    var gameboard = [
         "_", "_", "_",
         "_", "_", "_",
         "_", "_", "_"
    ];

    const getBoard = function() {
        return _getBoard();
    }

    const _getBoard = function() {
        return gameboard;
    }

    const update = function(square) {
        gameboard[square] = "X";
        displayController.update();

    }
    return {
        getBoard: getBoard,
        update: update
    };

})();

//gameplay controller module
var gamePlay = (function() {



    return {



    }

})();

// player creation factory function
var Player = (name) => {

    var playerName = name;

    let changeName = function(newname) {
        playerName = newname;
    }

    let getName = function() {
        return playerName;
    }

    const turn = function(){

    }

    return {
        getName: getName,
        changeName: changeName,
        turn: turn
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

let player1 = Player("Yuri");
console.log(player1);
let n = player1.getName();
console.log(n);
player1.changeName("Russ");
console.log(player1.getName());
console.log(player1.playerName);

let player2 = Player("Arietty");
console.log(player2.getName());