const basket = document.getElementById("basket");
const gameContainer = document.getElementById("game-container");
const gameOver = document.getElementById("game-over");
const score = document.getElementById("score");
const scoreDisplay = document.getElementById("score-display");
const livesDisplay = document.getElementById("lives-display");
const restartButton = document.getElementById("restart-button");

let lives = 3;
let currentScore = 0;
let hatInterval;

// move the basket to the left or right on user input
gameContainer.addEventListener("mousemove", function(event) {
  basket.style.left = event.clientX - basket.offsetWidth / 2 + "px";
});

// start the game
startGame();

// handle the hat catching logic
gameContainer.addEventListener("click", function(event) {
  for (let i = 0; i < gameContainer.children.length; i++) {
    const child = gameContainer.children[i];
    if (child.classList.contains("hat")) {
      if (
        child.offsetTop + child.offsetHeight >= basket.offsetTop &&
        child.offsetLeft + child.offsetWidth >= basket.offsetLeft &&
        child.offsetLeft <= basket.offsetLeft + basket.offsetWidth
      ) {
        child.remove();
        currentScore++;
      }
    }
  }
});

// restart the game on button click
restartButton.addEventListener("click", function() {
  gameOver.style.display = "none";
  startGame();
});

// start the game
function startGame() {
  currentScore = 0;
  lives = 3;
  hatInterval = setInterval(function() {
    const hatUrls = [
        "black.png",
        "blahk.png",
        "brown.png",
        "green.png",
        "grey.png"
      ];
      
    const randomHatUrl = hatUrls[Math.floor(Math.random() * hatUrls.length)];      
    const hat = document.createElement("div");
    hat.classList.add("hat");
    hat.style.backgroundImage = `url("${randomHatUrl}")`;
    hat.style.left = Math.random() * (gameContainer.offsetWidth - 50) + "px";
    //hat.style.background = none;
    hat.style.top = "-50px";
    gameContainer.appendChild(hat);
    
    let hatDropInterval = setInterval(function() {
      hat.style.top = hat.offsetTop + 10 + "px";
      
      // check for overlap between the hat and the basket
      if (
        hat.offsetTop + hat.offsetHeight >= basket.offsetTop &&
        hat.offsetLeft + hat.offsetWidth >= basket.offsetLeft &&
        hat.offsetLeft <= basket.offsetLeft + basket.offsetWidth
      ) {
        hat.remove();
        currentScore++;
        clearInterval(hatDropInterval);
      }
      
      if (hat.offsetTop >= gameContainer.offsetHeight) {
        lives--;
        hat.remove();
        clearInterval(hatDropInterval);
        if (lives === 0) {
          clearInterval(hatInterval);
          gameOver.style.display = "flex";
          score.innerText = currentScore;
        }
      }
      
      scoreDisplay.innerText = "Hats: " + currentScore;
      livesDisplay.innerText = "Lives: " + lives;
}, 50);
}, 1000);
}
