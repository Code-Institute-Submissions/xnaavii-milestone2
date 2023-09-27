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

    // Function to flip a tile 
    function flipTile(tile) {
        // Check if the tile is not already flipped and there are fewer than 2 flipped tiles
        if (!tile.classList.contains("flipped") && flippedTiles.length < 2) {
            // Add the flipped class to the tile
            tile.classList.add("fliped");
            // Find the inner tile element
            const tileInner = document.querySelector(".tile-inner");
            // Find the image within the tile
            const image = tile.querySelector("img");
            // Show the tile background and add the class "visible"
            tileInner.classList.add("visible");
            // Show the image and remove the class "hidden"
            image.classList.remove("hidden");
            // Add a CSS transform style to rotate the tile
            tile.style.transform = "rotateY(-180deg)";
            // Add the flipped tile to the array
            flippedTiles.push(tile);
        }

    }

    // Event listener for each tile to flip and reveal the image
    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            flipTile(tile);
        })
    })

    // Function called to shuffle the tiles
    shuffleTiles();
}