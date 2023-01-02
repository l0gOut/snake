const field = document.querySelector(".field");

const snake = [
  { y: 5, x: 5 },
  { y: 5, x: 4 },
];

let apple = { y: Math.random() * 10, x: Math.random() * 10 };

let check = true;

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
  check = true;

  document
    .querySelector(`[data-y="${apple.y}"][data-x="${apple.x}"]`)
    .classList.add("apple");

  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    cell.classList.remove("snake");

    // if (cell.classList.includes("apple") && cell.classList.includes("snake")) {
    //   apple = { y: Math.random() * 10, x: Math.random() * 10 };
    //   document
    //     .querySelector(`[data-y="${apple.y}"][data-x="${apple.x}"]`)
    //     .classList.add("apple");
    // }
  });

  for (let coord of snake) {
    document
      .querySelector(`[data-y="${coord.y}"][data-x="${coord.x}"]`)
      .classList.add("snake");
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

  snake.pop();
}

document.addEventListener("keydown", e => {
  if (!check) return;
  else if (move === "ArrowUp" && e.key === "ArrowDown") return;
  else if (move === "ArrowRight" && e.key === "ArrowLeft") return;
  else if (move === "ArrowDown" && e.key === "ArrowUp") return;
  else if (move === "ArrowLeft" && e.key === "ArrowRight") return;
  else {
    check = false;
    move = e.key;
  }
});

game();

setInterval(game, 500);
