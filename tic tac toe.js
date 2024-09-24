let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let msgC0ntainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameButton = document.querySelector("#new-btn");

let turnO = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
 turnO = true;
  count = 0;
  enabledBoxes();
  msgC0ntainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count == 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw`;
  msgC0ntainer.classList.remove("hide");
  disabledBoxes();
};

const disabledBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congrats! Winner is ${winner}`;
  msgC0ntainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("WINNER", pos1Val);
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

reset.addEventListener("click", resetGame);
gameButton.addEventListener("click", resetGame);
