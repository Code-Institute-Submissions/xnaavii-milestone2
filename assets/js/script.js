// Call the function to run the game when the page loads
document.addEventListener("DOMContentLoaded", runGame);
let username = document.getElementById("username").innerText = window.prompt("Enter Your Username!");
function runGame() {

    // Select all elements with the class "tile" and other necessary elements
    const tiles = document.querySelectorAll(".tile");
    const resetButton = document.getElementById("reset-btn");
    const scoreElement = document.getElementById("score");
    const livesElement = document.getElementById("lives");

    // Set the variable values
    let flippedTiles = [];
    let matchedPairs = 0;
    let score = 0;
    let lives = 0;

    // Function to shuffle the tiles randomly
    function shuffleTiles() {
        // Iterate through each tile element
        tiles.forEach(tile => {
            // Generate a random position for the tile and store it in a variable "randomPos"
            let randomPos = Math.floor(Math.random() * 12);
            // Apply the style order to shuffle the tile and place it randomly on the board
            tile.style.order = randomPos;
        });
    }

    // Function called to shuffle the tiles
    shuffleTiles();
}