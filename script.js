
// gameboard module
var gameBoard = (function() {

    let n = 3;
    // PRIVATE VARIABLES 
    var gameboard = [
         "", "", "",
         "", "", "",
         "", "", ""
    ];

    // PRIVATE METHODS

    const _rowCheck = function(square){

        //find the column number
        let colNum = square % n;
        //go to the beginning of the row
        for (i = (square - colNum); i < ((square - colNum) + n); i++) {
            if (gameboard[i] !== gamePlay.currentPlayer().getSymbol()){

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
            if (gameboard[i] !== gamePlay.currentPlayer().getSymbol()){
                return false;
            }

            i+=n;
        }
        return true;
    }
    const _diagCheck = function (square) {

        let i = 0;
        while (i < (n*n)) {
            if (gameboard[i] !== gamePlay.currentPlayer().getSymbol()){
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
        // stop at bottom left corner
        while (i < (n * n) - (n-1) ) {
            if (gameboard[i] !== gamePlay.currentPlayer().getSymbol()){
                return false;
            }
            //move down the diagonal
            i = i + n - 1;
        }
        return true;
    }


    // PUBLIC METHODS 

    const getBoard = function() {
        return gameboard;
    }

    // checks if a square is empty
    const isEmpty = function(square) {
        //is it empty
        return (gameboard[square] === "")
    }

    // empty board for new game
    const clearBoard = function() {
        for (i = 0; i < gameboard.length; i++) {
            gameboard[i]="";
        }
    }

    // check for a winning condition
    const winCheck = function(square) {
        if (_rowCheck(square) || _colCheck(square) || _diagCheck(square) || _revDiagCheck(square)) {
            return true;
        } else {
            return false;
        }
    }

    // check for a tie
    const tieCheck = function(){

        for (i=0; i < gameboard.length; i++) {
            if (gameboard[i] === "") {
                return false;
            }
        }
        return true;
    }

    //update a square
    const update = function(square) {
        if (isEmpty(square)) {
             gameboard[square] = gamePlay.currentPlayer().getSymbol();
        }

    }




    return {
        getBoard: getBoard,
        update: update,
        clearBoard: clearBoard,
        tieCheck: tieCheck,
        winCheck: winCheck,
        isEmpty: isEmpty
    };

})();

// player creation factory function
var Player = (name, symbol, ai) => {

    var playerName = name;
    var symbol = symbol;
    var ai = ai;

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

// AI
    // turn function does nothing if human player
    const turn = function(){
        // AI Stuff
        if (ai) {
            // first pick wait a second
            setTimeout(function () {pick()}, 500);
        }
    }

    // call this one instantly after first pick
    const pick = function() {
        if (ai) {
            //random number gen
            let square = Math.floor(Math.random() * 9);
            gamePlay.squareClicked(square);
        }
    }

    // check if AI
    const isAI = function(){
        return ai;
    }

    const setAI = function(bool){
        ai = bool;
    }

    return {
        getName: getName,
        changeName: changeName,
        turn: turn,
        pick:pick,
        getSymbol: getSymbol,
        isAI: isAI,
        setAI: setAI
    }

}

//gameplay controller module
var gamePlay = (function() {
    
    var player1 = Player("Yuri", "X", false);
    var player2 = Player("Russ", "O", true);
    var win = false;
    var tie = false;

    var activePlayer = player1;

    // PRIVATE

    const _gameWon = function () {
        win = true;
    }
    const _gameTie = function () {
        tie = true;
    }

    // PUBLIC 


    // change active player because it's their turn
    const changePlayer = function() {
        if (activePlayer === player1) {
            activePlayer = player2;
            player2.turn();
            displayController.currentPlayer();
        } else {
            activePlayer = player1;
            player1.turn();
            displayController.currentPlayer();
        }
    }

    // return the active player
    const currentPlayer = function() {
        return activePlayer;
    }

    //restart game
    const reset = function () {
        // clear the board
        gameBoard.clearBoard();
        displayController.updateBoard();
        win = false;
        tie = false;
        activePlayer = player1;
    }

    // a square was clicked, check stuff
    const squareClicked = function(square) {
        //check if already game over
        if (win === false && tie === false) {
            // check if valid square
            if (gameBoard.isEmpty(square)) {
                //update board
                gameBoard.update(square);
                //update display
                displayController.updateBoard();

                //check win
                if (gameBoard.winCheck(square)) {
                    console.log("win");
                    _gameWon();
                } 
                // check tie
                else if (gameBoard.tieCheck(square)) {
                    console.log("tie");
                    _gameTie();
                } 
                // if no win/tie, next player's turn
                else {
                    changePlayer();
                }
            }
            // not valid square so still current player's turn
            else {
                // does nothing for human but gives AI another pick (instant so not excessive wait time
                // for multiple wrong picks)
                currentPlayer().pick();
            } 
        }

    }

    return {
        currentPlayer: currentPlayer,
        changePlayer: changePlayer,
        squareClicked: squareClicked,
        reset:reset,
        player1: player1,
        player2: player2

    }

})();

// display controller module 
var displayController = (function() {

    //DOM element pointers
    const squares = document.querySelectorAll(".square");
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const whoseturn = document.getElementById("whoseturn");
    const loadscreen = document.getElementById("loadscreen");
    const gametype = document.getElementById("gametype");
    const nameform = document.getElementById("nameform");
    var squareNum;

    // PRIVATE
    //find which square we clicked on
    const _whichSquare = function(e) {
        squareNum = Array.prototype.indexOf.call(squares, e.target);
    }

    // PUBLIC
    // update the board display
    const updateBoard = function() {
        const board = gameBoard.getBoard();

        for (i = 0; i < board.length; i++) {
            squares[i].textContent = board[i];
        }
    }
    // show current player
    const currentPlayer = function() {
        whoseturn.textContent = gamePlay.currentPlayer().getName() + `'s turn`;
    };

    // initial board display
    updateBoard();
    currentPlayer();

    // monitoring square clicks, it all starts here
    document.addEventListener("click", function(e){
        // we clicking a square?
         if (e.target.classList.contains("square")) {
            _whichSquare(e);
            // is the current player AI?
            if (!gamePlay.currentPlayer().isAI()) {
                gamePlay.squareClicked(squareNum);
            }
         } else if (e.target.classList.contains("reset")) {
            gamePlay.reset();
         } 
         // loading screen
         else if (e.target.classList.contains("gametypebutton")){
            if (e.target.id === "pvc") {
                // Player vs Computer stuff
                gamePlay.player1.changeName("Player");
                gamePlay.player2.changeName("Computer");
                gamePlay.player2.setAI(true);
                loadscreen.style.display = "none";
            } 

            else if (e.target.id === "pvp"){
                // player vs player stuff
                gametype.style.display = "none";
                nameform.style.display = "block";
            }
         }

    });

    document.addEventListener("submit", function(e){
        e.preventDefault();
        const name1 = e.target.elements.name1.value;
        const name2 = e.target.elements.name2.value;
        gamePlay.player1.changeName(name1);
        gamePlay.player2.changeName(name2);
        nameform.reset();
        currentPlayer();
        loadscreen.style.display = "none";
    });


    //loading screen stuff



    return {
        updateBoard: updateBoard,
        currentPlayer: currentPlayer
    }



})();







