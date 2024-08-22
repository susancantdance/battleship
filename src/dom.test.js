import { updateBoard, displayBoard } from "./dom.js";
import { Ship, Gameboard, Player } from "./factories.js";
import "./style.css";

test("updateboard updates gameboard", () => {
  let player = Player(true);

  const newDiv = document.createElement("div");
  newDiv.setAttribute(
    "style",
    `background-color: white;
                    border-style: dotted;
                    border-width: 1px;
              border-color: black;
                      width: 25px;
                      height: 25px;
                      padding: 0px;
                      margin: 0px;`
  );

  updateBoard(newDiv, player, i);
});
