const Controller = (function(){
    const game = Game(); //I can send data here, and get data out
    const view = View(); //I can use this to do ONE thing: update the view, using the .update() method.
    //window event listener for submit
    //onsubmit send form.element[0].value and form.element[1].value to a game method that makes 2 players, and returns them in an array
    //window event listener for click
    if (event.target === board) {
        //call fillBoard(Board.spaces)
    } else {
        //call toggleVisibility
        //call resetForm
    };
    return {} //some Controller object
})();

const Board = (function() {
    const spaces = //new Array(9); 
        [
            'X', 'O', 'O', '', 'X', 'X', 'O', 'O', '',
        ];
    return {spaces}; //Board.spaces
})();

const Player = (function (a, b) {
    const name = a;
    const marker = b;
    return {name, marker}; //Player.name, Player.marker
});

const Game = (function() {
    function createPlayers() {

    }
    return {createPlayers, takeTurn}; //game.createPlayers(), Game.takeTurn()
});
const View = (function() {  
    const update = () => { //pass in the functions to execute when calling view.update()
        const fillBoard = (spaces) => {
            spaces.forEach((element, index) => {
                const space = document.querySelector(`#gameboard div[data-index='${index}']`);
                if (element != "") {
                    space.classList.add(`marker${element}`);
                    space.classList.add("selected");
                } else {
                    space.classList.add("available");
                };
            });
        }
        const form = document.querySelector("#formContainer form");
        const restart = document.querySelector("#restart");
        const toggleVisibility = () => {
            form.classList.toggle('hidden');
            restart.classList.toggle('hidden');
        }
        const resetForm = () => {
            form.reset();
        }
    }
    return {update}; //view object has one method: update
});