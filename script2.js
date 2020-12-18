const Game = (function() {
    const player1 = Player();
    const player2 = Player();
    player1.marker = "X";
    player2.marker = "O";
    let count = 0; //declared here so we can reset it when the game starts
    const start = function(event) {
        event.preventDefault();
        const element = event.target;
        player1.name = element[0].value;
        player2.name = element[1].value;
        count = 0;
        console.log("you called start.");
    };
    const getPlayer = function(number) {
        if (number == 1) {
            return player1;
        } return player2;
    };
    const countCreator = () => { //object prototype that can count up
        return () => {
            count++;
            console.log(`count is ${count}`);
            if (count % 2 == 0) {
                return "O";
            } return "X";
        };
    };
    const countTurn = countCreator(); //keep track of turns by calling countTurn()
    const play = function(element) {
        const whoseTurn = countTurn(); //returns X or O
        console.log(`board position is ${element.dataset.index}`);
        return [whoseTurn, element.dataset.index];
    }
    //threeInARow, isWinner(), and winner() all work together to determine if a move
    //has resulted in a win or not. threeInARow holds all the winning combinations.
    //isWinner() does an equality check to see if the board positions passed in are
    //all filled with the same game marker. based on which board positions are filled
    //winner() creates a secondary array of winning combinations to check, 
    //then calls isWinner() on each one to determine if there's a winner. Only checking
    //the secondary array prevents false positives from an empty row.
    const threeInARow = [
        ['0','1','2'], //top row
        ['3','4','5'], //mid row
        ['6','7','8'], //bottom row
        ['0','3','6'], //first column
        ['1','4','7'], //mid column
        ['2','5','8'], //last column
        ['0','4','8'], //diagonal L->R
        ['2','4','6'], //diagonal R->L
    ];
    const isWinner = function(element) { //'this' is 'currentBoard' which is Board.spaces
        const a = this[element[0]];
        const b = this[element[1]];
        const c = this[element[2]];
        console.log(`comparing ${a}, ${b}, ${c}`);
        if (a == "" || b == "" || c == "") {
            return false;
        } else if (a == b && a == c) {
            return true;
        } else {
            return false;
        }
    };
    const winner = function(position, currentBoard) {
        //only check items in threeInARow that contain 'position'
        let check;
        let itemsToCheck = [];
        threeInARow.forEach(element => {
            if (element.includes(position)) {
                itemsToCheck.push(element);
                return itemsToCheck;
            }
        });
        check = itemsToCheck.some((isWinner), currentBoard);
        return check; //true or false
    }; 
    return {start, getPlayer, play, winner};
});

const Player = (name, marker) => {
    return {name, marker};
};

const Board = (function() {
    const spaces = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ];
    const update = function(turn) {
        const marker = turn[0];
        const position = turn[1];
        if (spaces[position] == "") {
            spaces[position] = marker;
        } 
        console.log(spaces);
        return spaces;
    };
    const clear = function() {
        spaces.fill("");
        return spaces;
    }
    return {spaces, update, clear}; //Board.spaces, Board.update
})();

const View = (function() {
    const setPlayer = function(lastMarker, player1, player2) {
        console.log(`you called setPlayer. last marker is ${lastMarker}, player1 is ${player1}, player2 is ${player2}`);
        const element = document.querySelector("#currentPlayer");
        const spaces = document.querySelector("#gameboard");
        if (lastMarker === null) {
            spaces.classList.remove("cursorO");
            spaces.classList.add("cursorX");
            return element.textContent=`It's ${player1.name}'s turn`;
        } else if (lastMarker === "X") {
            spaces.classList.remove("cursorX");
            spaces.classList.add("cursorO");
            return element.textContent=`It's ${player2.name}'s turn`;
        } else {
            spaces.classList.remove("cursorO");
            spaces.classList.add("cursorX");
            return element.textContent=`It's ${player1.name}'s turn`;
        }
    };
    const gameOver = function(marker, player1, player2) {
        console.log(`you called gameOver. marker is ${marker}`);
        const element = document.querySelector("#currentPlayer");
        if (marker == "X") {
            return element.textContent=`Game over! ${player1.name} wins`;
        } else if (marker == "tie") {
            return element.textContent=`Game over! It was a tie.`;
        } else {
            return element.textContent=`Game over! ${player2.name} wins`
        };
    };
    const update = (action, spaces) => {
        spaces.forEach((element, index) => {
            const space = document.querySelector(`#gameboard div[data-index='${index}']`);
            if (action == 'fill') {
                if (element != "") {
                    space.classList.add(`marker${element}`);
                    space.classList.add('selected');
                };
            } else if (action == 'clear') {
                space.classList = "";
            } else { //action == 'disable'
                space.classList.add('selected');
            }
        }); 
        if (action == 'clear') {
            document.querySelector("#currentPlayer").textContent = "";
        };
    };
    const toggleVisibility = () => {
        form.classList.toggle('hidden');
        restart.classList.toggle('hidden');
        boardDom.classList.toggle('hidden');
    }
    const resetForm = () => {
        document.querySelector("#formContainer form").reset();
    }
    return {setPlayer, update, toggleVisibility, resetForm, gameOver};
});

const game = Game();
const view = View();
const form = document.querySelector("#formContainer");
const restart = document.querySelector("#restart");
const boardDom = document.querySelector("#gameboard");
function setupGame(event) {
    game.start(event);
    view.update('fill', Board.spaces);
    view.setPlayer(null, game.getPlayer(1), game.getPlayer(2));
    view.toggleVisibility();
};
function playTurn(event) {
    const element = event.target;
    if (element.classList.contains('selected')) {
        event.preventDefault();
        return false;
    } else {
        const turn = game.play(element); //turn will equal an array with a marker and a board position
        const update = Board.update(turn);
        console.log(update);
        view.setPlayer(turn[0], game.getPlayer(1), game.getPlayer(2))
        view.update('fill', Board.spaces);
        const won = game.winner(turn[1], Board.spaces);
        if (won) {
            view.gameOver(turn[0], game.getPlayer(1), game.getPlayer(2)); //passes the last marker played
            view.update('disable', Board.spaces);
        } else {
            if (!Board.spaces.includes('')) {
                view.gameOver('tie');
            }
        }
    }
};
function playNew(event) {
    Board.clear();
    view.resetForm();
    view.toggleVisibility();
    view.update('clear', Board.spaces);
}

form.addEventListener("submit", setupGame);
boardDom.addEventListener("click", playTurn);
restart.addEventListener("click", playNew);
