import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './modules/snake.mjs'
import { update as updateFood, draw as drawFood, outsideGrid } from './modules/food.mjs'

let snakeSpeed = 5
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('gameBoard')

//TIMER
let seconds = 0;
let minutes = 0;

function gameTimer() {
    document.getElementById('timer').innerHTML = minutes + ":" + seconds;
    if (seconds === 59) {
      minutes++;
      seconds = 0;
    } else {
      seconds++;
    }
}

//KEYDOWN START GAME
document.addEventListener('keydown', function() {
  setInterval(gameTimer, 1000);
  document.getElementById('startInfo').style.visibility = 'hidden';
}, { once: true });

//GAME LOOP
function main(currentTime) {
  if (gameOver) {
    document.getElementById('timerResult').innerHTML = minutes + ":" + seconds;
    document.getElementById('foodCountResult').innerHTML = document.getElementById('foodCount').innerHTML;
    gameBoard.style.visibility = 'hidden';
    document.getElementById('gameOver').style.visibility = "visible";

    document.getElementById('infoContainer').remove();
    document.getElementById('speedBarContainer').remove();
    return 
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return
  
  lastRenderTime = currentTime

  update()
  draw()

  //DIFFICULTY
  const foodCount = document.getElementById('foodCount').innerHTML / 5
  snakeSpeed = +foodCount + 5
  document.getElementsByTagName('progress')[0].value = +foodCount
}


window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}