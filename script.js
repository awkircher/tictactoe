//view

//game controller

//board -- module pattern wraps object and functions in IIFE
const Board = (function() {
    const spaces = new Array(9);
    const add = (marker, position) => {
        spaces[position] = marker;
        return spaces;
    }
    const clear = () => {
        spaces.fill("");
        return spaces;
    }
    return {spaces, add, clear}; //return an object
})();

//player -- factory function pattern
//player prototype with name, marker, and method getMarker
//form sends array of two names
//forEach array item, make a new player and call its getMarker method
//getMarker randomly chooses X or O
//assigns it to a marker variable on player
