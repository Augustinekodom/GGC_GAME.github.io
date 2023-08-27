const basket = document.getElementById("basket");
const gameContainer = document.getElementById("game-container");
const gameOver = document.getElementById("game-over");
const score = document.getElementById("score");
const scoreDisplay = document.getElementById("score-display");
const livesDisplay = document.getElementById("lives-display");
const restartButton = document.getElementById("restart-button");
const productButton = document.getElementById("shop-button");




let lives = 3;
let currentScore = 0;
let hatInterval;


let basketX = basket.offsetLeft;
let startX;

basket.addEventListener("touchstart", function(e) {
  startX = e.touches[0].pageX;
});

 basket.addEventListener("touchmove", function(e) {
  let currentX = e.touches[0].pageX;
  let diffX = startX - currentX;
  basketX -= diffX;
  basket.style.left = basketX + "px";
  startX = currentX;
}); 

// Prevent default touch events to disable vertical scrolling
document.body.addEventListener("touchstart", function(e) {
  e.preventDefault();
});

document.body.addEventListener("touchmove", function(e) {
  e.preventDefault();
});



basket.addEventListener("touchend", function(e) {
  // do nothing
});



// move the basket to the left or right on user input
gameContainer.addEventListener("mousemove", function(event) {
  basket.style.left = event.clientX - basket.offsetWidth / 2 + "px";
});

// start the game
startGame();


// Listen for button click to redirect to the product page
productButton.addEventListener("click", function() {
  window.location.href = "https://geniusgoneclueless.com/search?q=beani&options%5Bprefix%5D=last";
});

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
    //hat.speed = Math.random() * 5 + 1; // random speed between 1 and 6
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
