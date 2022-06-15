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

let player1 = Player("Yuri");
console.log(player1);
let n = player1.getName();
console.log(n);
player1.changeName("Russ");
console.log(player1.getName());
console.log(player1.playerName);

let player2 = Player("Arietty");
console.log(player2.getName());



// display controller module 
var displayController = (function() {

    
    // update the board display
    const update = function() {
        const squares = document.querySelectorAll(".square");
        const board = gameBoard.getBoard();

        for (i = 0; i < board.length; i++) {
            squares[i].firstChild.textContent = board[i];
        }
    }



    return {
        update
    }



})();

//gameplay controller module
var gamePlay = (function() {




})();

displayController.update();