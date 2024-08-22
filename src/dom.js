import { Ship, Gameboard, Player } from "./factories.js";
import "./style.css";

// function displayBoard(grid, arr) {
//   //   let coords = Array.from(player.gb.board.keys());
//   const playerGrid = document.querySelector(grid);

//   for (let i = 0; i < 100; i++) {
//     const newDiv = document.createElement("div");
//     if (!Array.isArray(arr[i]) && arr[i] == "empty") {
//       newDiv.setAttribute(
//         "style",
//         `background-color: white;
//                     border-style: dotted;
//                     border-width: 1px;
//               border-color: black;
//                       width: 25px;
//                       height: 25px;
//                       padding: 0px;
//                       margin: 0px;`
//       );

//       newDiv.addEventListener("click", () => {
//         updateBoard(newDiv, player, i);
//         //   player.gb.receiveAttack(coords[i]);
//       });

//       playerGrid.appendChild(newDiv);
//     }
//   }
// }

function updateBoard(div, player, i) {
  let arr = Array.from(player.gb.board.values());
  let coords = Array.from(player.gb.board.keys());
  console.log(coords[i]);
  if (!Array.isArray(arr[i]) && arr[i] == "empty") {
    player.gb.receiveAttack(coords[i]);
    div.setAttribute(
      "style",
      `background-color: gray;
                          border-style: dotted;
                          border-width: 1px;
                    border-color: black;
                            width: 25px;
                            height: 25px;
                            padding: 0px;
                            margin: 0px;`
    );
  } else if (Array.isArray(arr[i]) && arr[i][0] == "ship") {
    player.gb.receiveAttack(coords[i]);
    div.setAttribute(
      "style",
      `background-image: url('./paw.svg');
      background-color: white;
                          border-style: dotted;
                          border-width: 1px;
                    border-color: black;
                            width: 25px;
                            height: 25px;
                            padding: 0px;
                            margin: 0px;`
    );
  }
}

export { displayBoard, updateBoard };
