const Game = (function() {
    const player1 = Player();
    const player2 = Player();
    player1.marker = "X";
    player2.marker = "O";
    const start = function(event) {
        event.preventDefault();
        const element = event.target;
        player1.name = element[0].value;
        player2.name = element[1].value;
        console.log("you called start.");
    };
    const getPlayer = function(number) {
        if (number == 1) {
            return player1;
        } return player2;
    };
    const countCreator = () => { //object prototype that can count up
        let count = 0;
        return () => {
            count++;
            console.log(`count is ${count}`);
            if (count % 2 == 0) {
                return "O";
            } return "X";
        };
    };

    const countTurn = countCreator(); //keep track of turns by calling countTurn()

    const play = function(event) {
        const element = event.target;
        const whoseTurn = countTurn(); //returns X or O
        console.log(`board position is ${element.dataset.index}`);
        return [whoseTurn, element.dataset.index];
    }

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
    const isWinner = function(element) { //this is 'currentBoard' which is Board.spaces
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
    const showPlayer = function(player) {
        console.log("you called showPlayer. player is " + player);
        const element = document.querySelector("#currentPlayer");
        return element.textContent=`It's ${player.name}'s turn`;
    };
    const gameOver = function(marker, player1, player2) {
        console.log(`you called gameOver. marker is ${marker}`);
        const element = document.querySelector("#gameOver");
        if (marker == "X") {
            return element.textContent=`Game over! ${player1.name} wins`;
        } else {
            return element.textContent=`Game over! ${player2.name} wins`
        };
    };
    const fillBoard = (spaces) => {
        spaces.forEach((element, index) => {
            const space = document.querySelector(`#gameboard div[data-index='${index}']`);
            if (element != "") {
                space.classList.add(`marker${element}`);
                space.classList.add("selected");
                space.classList.remove("available");
            } else {
                space.classList.add("available");
            };
        });
    }
    const toggleVisibility = () => {
        form.classList.toggle('hidden');
        restart.classList.toggle('hidden');
    }
    const resetForm = () => {
        form.reset();
    }
    return {showPlayer, fillBoard, toggleVisibility, resetForm, gameOver};
});

const game = Game();
const view = View();
const form = document.querySelector("#formContainer form");
const restart = document.querySelector("#restart");
const boardDom = document.querySelector("#gameboard");
function setupGame(event) {
    game.start(event);
    view.fillBoard(Board.spaces);
    view.showPlayer(game.getPlayer(1));
    view.toggleVisibility();
};
function playTurn(event) {
    const element = event.target;
    if (element.classList.contains('selected')) {
        event.preventDefault();
        return false;
    } else {
        const turn = game.play(event); //turn will equal an array with a marker and a board position
        const update = Board.update(turn);
        console.log(update);
        view.fillBoard(Board.spaces);
        const won = game.winner(turn[1], Board.spaces);
        if (won) {
            view.gameOver(turn[0], game.getPlayer(1), game.getPlayer(2)); //pass the last marker played
        }
    }
};
function playNew(event) {
    Board.clear();
    view.resetForm();
    view.toggleVisibility();
    view.fillBoard(Board.spaces); //this needs to remove old marker classes if being called after .clear()
}

form.addEventListener("submit", setupGame);
boardDom.addEventListener("click", playTurn);
restart.addEventListener("click", playNew);
