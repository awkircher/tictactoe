<html>
    <head>
        <title>Tic Tac Toe</title>
        <link href="https://fonts.googleapis.com/css2?family=Karla&display=swap" rel="stylesheet">
        <link href="styles.css" rel="stylesheet">
    </head>
    <body>
        <header>
            <img id="logo" src="images/logo.svg">
            <button id="restart" class="hidden">Start a new game</button>
        </header>
        <div id="formContainer">
            <form>
                <h1>Enter your names</h1>
                <label for="player1">Player 1</label>
                <input type="text" placeholder="player1" required>
                <label for="player2">Player 2</label>
                <input type="text" placeholder="player2" required>
                <button type="submit">Start Playing</button>
            </form>
        </div>
        <div id="gameboard" class="hidden">
            <div data-index="0"></div>
            <div data-index="1"></div>
            <div data-index="2"></div>
            <div data-index="3"></div>
            <div data-index="4"></div>
            <div data-index="5"></div>
            <div data-index="6"></div>
            <div data-index="7"></div>
            <div data-index="8"></div>
        </div>
        <div id="currentPlayer"></div>
        <script src="script2.js"></script>
    </body>
</html>