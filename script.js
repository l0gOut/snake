const field = document.querySelector(".field");
const textScore = document.querySelector(".score");

const snake = [
  { y: 5, x: 5 },
  { y: 5, x: 4 },
];

let lastSnakePoint = null;

let score = 0;

let apple = {
  y: Math.floor(Math.random() * (11 - 1) + 1),
  x: Math.floor(Math.random() * (11 - 1) + 1),
};

let move = "ArrowRight";

for (let i = 1; i <= 10; i++) {
  const divY = document.createElement("div");

  for (let j = 1; j <= 10; j++) {
    const divX = document.createElement("div");

    divX.className = "cell";

    divX.setAttribute("data-y", i);

    divX.setAttribute("data-x", j);

    divY.appendChild(divX);
  }

  divY.className = "line";

  field.appendChild(divY);
}

function game() {
  document
    .querySelector(`[data-y="${apple.y}"][data-x="${apple.x}"]`)
    .classList.add("apple");

  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    if (cell.classList.contains("apple") && cell.classList.contains("snake")) {
      cell.classList.remove("apple");

      snake.push(lastSnakePoint);

      score++;
      textScore.textContent = score;
      apple = {
        y: Math.floor(Math.random() * (11 - 1) + 1),
        x: Math.floor(Math.random() * (11 - 1) + 1),
      };

      document
        .querySelector(`[data-y="${apple.y}"][data-x="${apple.x}"]`)
        .classList.add("apple");
    }

    cell.classList.remove("snake");
  });

  for (let coord of snake) {
    const snakeCoord = document.querySelector(
      `[data-y="${coord.y}"][data-x="${coord.x}"]`
    );

    if (snakeCoord.classList.contains("snake")) {
      clearInterval(startGame);
      textScore.textContent = "Вы проиграли!";
    }

    snakeCoord.classList.add("snake");
  }

  switch (move) {
    case "ArrowUp":
      snake.unshift({
        y: snake[0].y - 1 === 0 ? 10 : snake[0].y - 1,
        x: snake[0].x,
      });
      break;
    case "ArrowRight":
      snake.unshift({
        y: snake[0].y,
        x: snake[0].x + 1 === 11 ? 1 : snake[0].x + 1,
      });
      break;
    case "ArrowDown":
      snake.unshift({
        y: snake[0].y + 1 === 11 ? 1 : snake[0].y + 1,
        x: snake[0].x,
      });
      break;
    case "ArrowLeft":
      snake.unshift({
        y: snake[0].y,
        x: snake[0].x - 1 === 0 ? 10 : snake[0].x - 1,
      });
      break;
    default:
      break;
  }

  lastSnakePoint = snake.pop();
}

document.addEventListener("keydown", e => {
  if (move === "ArrowUp" && e.key === "ArrowDown") return;
  else if (move === "ArrowRight" && e.key === "ArrowLeft") return;
  else if (move === "ArrowDown" && e.key === "ArrowUp") return;
  else if (move === "ArrowLeft" && e.key === "ArrowRight") return;
  else move = e.key;
});

game();

const startGame = setInterval(game, 500);
