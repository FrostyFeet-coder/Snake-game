let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cellSize = 50;
let boardWidth = 1000;
let boardHeight = 800;

let gameOver = false;
let direction = "right";
let foodCell = generateFood();
let snakeCells = [[0, 0]];
let score = 0;

function draw() {
  if (gameOver === true) {
    clearInterval(id);
    ctx.font = "50px cursive";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER !!!", 320, 300);
    ctx.fillText(`YOUR SCORE IS ${score}`, 320, 500);

    const audio = new Audio();
    audio.src = "./media/song1.mp3";
    audio.play();
    return;
  }
  // draw snake
  ctx.clearRect(0, 0, 1000, 800);
  for (let cell of snakeCells) {
    ctx.fillStyle = "red";
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    ctx.strokeStyle = "white";
    ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
  }

  //   draw food
  ctx.fillStyle = "orange";
  ctx.fillRect(foodCell[0], foodCell[1], cellSize, cellSize);

  //   score
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "purple";
  ctx.fillText(`Score: ${score}`, 20, 40);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    direction = "down";
  } else if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowLeft") {
    direction = "left";
  } else {
    direction = "right";
  }
});

function update() {
  let headX = snakeCells[snakeCells.length - 1][0];
  let headY = snakeCells[snakeCells.length - 1][1];

  let newHeadX;
  let newHeadY;
  if (direction === "up") {
    newHeadX = headX;
    newHeadY = headY - cellSize;
    if (newHeadY < 0 || khudEat(newHeadX, newHeadY)) {
      gameOver = true;
    }
  } else if (direction === "down") {
    newHeadX = headX;
    newHeadY = headY + cellSize;
    if (newHeadY === boardHeight || khudEat(newHeadX, newHeadY)) {
      gameOver = true;
    }
  } else if (direction === "left") {
    newHeadX = headX - cellSize;
    newHeadY = headY;
    if (newHeadX < 0 || khudEat(newHeadX, newHeadY)) {
      gameOver = true;
    }
  } else {
    newHeadX = headX + cellSize;
    newHeadY = headY;
    if (newHeadX === boardWidth || khudEat(newHeadX, newHeadY)) {
      gameOver = true;
    }
  }

  snakeCells.push([newHeadX, newHeadY]);
  if (newHeadX === foodCell[0] && newHeadY === foodCell[1]) {
    foodCell = generateFood();
    score += 1;
  } else {
    snakeCells.shift();
  }
}

function generateFood() {
  return [
    Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
    Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) *
      cellSize,
  ];
}

function khudEat(newHeadX, newHeadY) {
  for (let item of snakeCells) {
    if (newHeadX === item[0] && newHeadY === item[1]) {
      return true;
    }
  }
  return false;
}

let id = setInterval(function () {
  draw();
  update();
}, 100);
