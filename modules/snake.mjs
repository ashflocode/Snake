import { getInputDirection } from "./input.mjs"

const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function update() {
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  // BODY
  snakeBody.forEach(segment => {
    const snakeTail = document.createElement('div')
    snakeTail.style.gridRowStart = segment.y
    snakeTail.style.gridColumnStart = segment.x
    snakeTail.classList.add('snakeTail')
    gameBoard.appendChild(snakeTail)
  })
  // HEAD
  snakeBody.slice(0, 1).forEach(segment => {
    const snakeHead = document.createElement('div')
    snakeHead.style.gridRowStart = segment.y
    snakeHead.style.gridColumnStart = segment.x
    snakeHead.classList.add('snakeHead')
    gameBoard.appendChild(snakeHead)
  })
}
  
export function expandSnake(amount) {
  newSegments += amount
}
  
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() {
    return snakeBody[0]
}
  
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newSegments = 0
}