// Snake Game
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
let score = 0;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function update() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

    // Check for collisions
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`Game Over! Your score: ${score}`);
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        score = 0;
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));

    // Draw food
    drawRect(food.x, food.y, 'red');

    // Draw score
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
    if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
    if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
    if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

gameLoop();