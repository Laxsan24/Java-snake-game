// script.js
const gameBoard = document.getElementById('game-board'); //This assigns to the variable.
const boardSize = 15; //15 units for the board size (which is given by the variable).
let snake = [{ x: 7, y: 7 }]; //Coordinate of the snake which represents the starting position.
let fruit = { x: 5, y: 5 };//Coordinates of the fruit which represents the starting position.
let direction = { x: 0, y: 0 }; //Direction of the snake which represents by the coordinate.
let gameInterval; //This loops the game to store how the game starts.
let gameSpeed = 300; //Speed of the game.



// Start the game
function startGame() {
    document.addEventListener('keydown', changeDirection); //
    placeFruit();
    gameInterval = setInterval(updateGame, gameSpeed);
}
//This function is starting the game and gives a direction which makes the game start.
//The fruit will be placed in any direction and the game will be updated and the speed will increase.

function updateGame() { //Creates the function which moves the snake.
    moveSnake(); 
    if (checkCollision()) {
        alert('Game Over!');
        resetGame();
        //It does an if statement to check if it has a collision. If it has a collision it prints an alert
        //game over and resets the game.
    } else {
        if (isFruitEaten()) { 
            growSnake();
            placeFruit();
        }
        //It does an else statement and then if statement to check if the snake eats a piece of fruit. 
        //The snake contains true if the fruit is eaten and this makes the snake grow and places another fruit 
        //in a another position.
        drawGame();
        //The game draws (stops the game) or updates the game(this changes the snake size and fruit position).

    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}
//Direction of the head of when it moves. The position of the snake is 0 but adds a direction which is the values of
//x and y.
//Unshift is representing the movement for the direction of the snake.
//pop() is used as it makes it look like the snake is moving without changing the length. It removes the previous position
//of where it came from and adds the new one position without changing the length.



function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}
//Direction of the snake and the grid is not like the maths grid it starts from top to bottom and moves. This depends on the direction.

function isFruitEaten() {
    return snake[0].x === fruit.x && snake[0].y === fruit.y;
}
//What does this code 
function growSnake() {
    const newSegment = { ...snake[snake.length - 1] };
    snake.push(newSegment);
}
//All of the part of the snake

function placeFruit() {
    fruit = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
    //This places the fruit. The math.floor converts the number but doesn't involve the decimal points.
    //So if it was 0.9878238 it'll be 0 not 1. Math.random() gives a number between 0 and 1.
    //The board size is multiplied by 15 which gives the number.
}

function checkCollision() {
    const [head, ...body] = snake;
    const hitWall = head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize;
    const hitSelf = body.some(segment => segment.x === head.x && segment.y === head.y);
    return hitWall || hitSelf;
    //Checks the collision of the head and body of the snake and checks the wall.
}

function drawGame() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
    // The snake creates a new div which has coordinates x and y and tells the position of the grid
    // and how the snake is styled.
    
    const fruitElement = document.createElement('div');
    fruitElement.style.gridRowStart = fruit.y + 1;
    fruitElement.style.gridColumnStart = fruit.x + 1;
    fruitElement.classList.add('fruit');
    gameBoard.appendChild(fruitElement);
    //The div creates a fruit from its coordinates and the frui
    //The snake gets bigger every time it eats the fruit.
    
}

function resetGame() {
    snake = [{ x: 7, y: 7 }];
    direction = { x: 0, y: 0 };
    startGame();
}
//Resets the game for the snake and the direction starts from the beginning of when the snakes begins.
startGame();
