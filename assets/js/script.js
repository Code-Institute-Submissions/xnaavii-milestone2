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
        // Check if all tiles are matched
        if (matchedPairs === tiles.length / 2) {
          setTimeout(() => {
            // Alert the player that game is won!
            alert("Congratulations! You've won the game");

          }, 500) // Delay the message
        }
      } else {
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
            setTimeout(() => {
              alert("Game Over! Try Again!");
            }, 500)
          }
        }, 1000)
      }
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