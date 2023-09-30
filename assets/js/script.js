// Call the function to run the game when the page loads
document.addEventListener("DOMContentLoaded", function () {

  const howToPlayOverlay = document.getElementById("howToPlayOverlay");
  howToPlayOverlay.style.display = "flex";
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", function () {
    howToPlayOverlay.style.display = "none";
    runGame();
  })

  function runGame() {

    document.getElementById("username").innerText = window.prompt("Enter Your Username!");
    // Select all elements with the class "tile" and other necessary elements
    const tiles = document.querySelectorAll(".tile");
    const resetButton = document.getElementById("reset-btn");
    const scoreElement = document.getElementById("score");
    const livesElement = document.getElementById("lives");
    const startButton = document.getElementById("start-button");

    // Set the variable values
    let flippedTiles = [];
    let matchedPairs = 0;
    let score = 0;
    let lives = 6;

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
        tile.classList.add("flipped");
        // Find the inner tile element
        const tileInner = tile.querySelector(".tile-inner");
        // Find the image within the tile
        const image = tile.querySelector("img");
        // Show the tile background and add the class "visible"
        tileInner.classList.add("visible");
        // Show the image and remove the class "hidden"
        image.classList.remove("hidden");
        // Add the flipped tile to the array
        flippedTiles.push(tile);

        checkForMatch();
      }
    }

    // Check if two flipped tiles match
    function checkForMatch() {
      // Check if two tiles are flipped
      if (flippedTiles.length === 2) {
        // Seperate the array so I get individual tiles
        const [tile1, tile2] = flippedTiles;
        // Find the tiles and get "data-value" attribute of both tiles
        const value1 = tile1.getAttribute("data-value");
        const value2 = tile2.getAttribute("data-value");
        // Check if two tiles are the same (data-values)
        if (value1 === value2) {
          // Increment the score by 10 and clear the flippedTiles array
          matchedPairs++;
          score += 10;
          // Update the score text
          scoreElement.textContent = score;
          flippedTiles = [];
          // Play sound when tiles match
          const matchSound = document.getElementById("matchSound");
          matchSound.currentTime = 0;
          matchSound.play();
          // Check if all tiles are matched
          if (matchedPairs === tiles.length / 2) {
            const tilesCleared = document.getElementById("tiles-cleared");
            tilesCleared.play();
              setTimeout(() => {
                // Alert the player that game is won!
                alert("Congratulations! You've won the game");
                resetGame();
              }, 500) // Delay the message
          }
        } else {
          const misMatchSound = document.getElementById("mismatch-sound");
          misMatchSound.currentTime = 0;
          misMatchSound.play();
          // If the tiles don't match, flip them back after a delay
          setTimeout(() => {
            // Remove the flipped class from both tiles
            tile1.classList.remove("flipped");
            tile2.classList.remove("flipped");
            // Find the tile inner elements
            const tileInner1 = tile1.querySelector(".tile-inner");
            const tileInner2 = tile2.querySelector(".tile-inner");
            // Reset the transform to flip them back
            tileInner1.style.transform = "rotateY(0deg)";
            tileInner2.style.transform = "rotateY(0deg)";
            // Find the images element and hide them again the "hidden" class
            const image1 = tile1.querySelector("img");
            const image2 = tile2.querySelector("img");
            image1.classList.add("hidden");
            image2.classList.add("hidden");
            // Clear the flippedTiles array and decrease lives by 1
            flippedTiles = [];
            lives--;
            // Update the lives text
            livesElement.textContent = lives;
            // If player has no lives left, alert with the message
            if (lives === 0) {
              // Play sound when game is lost
              const gameOverSound = document.getElementById("gameOverSound");
              gameOverSound.play();
              setTimeout(() => {
                alert("Game Over! Try Again!");
                resetGame();
              }, 500)
            }
          }, 1000)
        }
      }
    }
    // Reset the game
    function resetGame() {
      const shuffleTileSound = document.getElementById("shuffle-sound");
      shuffleTileSound.play();
      // Clear the flipped tiles array, reset score and lives
      flippedTiles = [];
      score = 0;
      lives = 6;
      matchedPairs = 0;
      scoreElement.textContent = score;
      livesElement.textContent = lives;
      // Shuffle the tiles
      shuffleTiles();
      // Reset all tiles to their initial state
      tiles.forEach(tile => {
        tile.classList.remove("flipped");
        const tileInner = tile.querySelector(".tile-inner");
        tileInner.style.transform = "rotateY(0deg)";
        const image = tile.querySelector("img");
        image.classList.add("hidden");
      })
    }

    // Event listener for the reset button
    resetButton.addEventListener("click", resetGame);
    


    // Event listener for each tile to flip and reveal the image
    tiles.forEach(tile => {
      tile.addEventListener("click", () => {
        flipTile(tile);
      })
    })

    // Function called to shuffle the tiles
    shuffleTiles();
  }
})