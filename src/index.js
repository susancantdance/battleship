//import { displayBoard } from "./dom.js";
import { Ship, Gameboard, Player } from "./factories.js";
import "./style.css";

const oppGrid = document.querySelector(".grid.opp");
const youGrid = document.querySelector(".grid.you");
const dialog = document.querySelector("dialog");

let you = Player(false);
let opp = Player(true);

let squareStatusYou = Array.from(you.gb.board.values());
let squareStatusOpp = Array.from(opp.gb.board.values());

console.log(Array.from(you.gb.board.entries()));
console.log(Array.from(opp.gb.board.entries()));

let coords = Array.from(you.gb.board.keys());

function computersTurn() {
  let attacked = false;
  do {
    let pick = Math.floor(Math.random() * 100);
    console.log(`pick is ${pick}`);
    let entry = Array.from(you.gb.board.entries())[pick];
    console.log(`entry is ${entry}`);
    let coords = entry[0];
    let status = entry[1];

    //if it's an Array & a ship OR if it's 'empty'

    if ((Array.isArray(status) && status[0] == "ship") || status == "empty") {
      you.gb.receiveAttack(coords);
      attacked = true;
    }
  } while (!attacked);
}

function displayYourBoard(arr) {
  //   let coords = Array.from(player.gb.board.keys());

  for (let i = 0; i < 100; i++) {
    const newDiv = document.createElement("div");
    if (!Array.isArray(arr[i]) && arr[i] == "empty") {
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
    } else if (Array.isArray(arr[i]) && arr[i][0] == "ship") {
      newDiv.setAttribute(
        "style",
        `background-color: orange;
                    border-style: solid;
                    border-width: 1px;
                    border-color: orange;
                    width: 25px;
                    height: 25px;
                    padding: 0px;
                    margin: 0px;`
      );
    } else if (Array.isArray(arr[i]) && arr[i][0] == "hit") {
      newDiv.setAttribute(
        "style",
        `background-color: red;
                    border-style: solid;
                    border-width: 1px;
                    border-color: orange;
                    width: 25px;
                    height: 25px;
                    padding: 0px;
                    margin: 0px;`
      );
    } else if (!Array.isArray(arr[i]) && arr[i] == "miss") {
      newDiv.setAttribute(
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
    } else if (Array.isArray(arr[i]) && arr[i][0] == "sunk") {
      newDiv.setAttribute(
        "style",
        `background-color: #ec832c;
        background-img: url('./kittysvg.svg');
                      border-style: solid;
                      border-width: 1px;
                      border-color: red;
                      width: 25px;
                      height: 25px;
                      padding: 0px;
                      margin: 0px;`
      );
    }
    //   newDiv.addEventListener("click", () => {
    //     updateBoard(newDiv, player, i);
    //     //   player.gb.receiveAttack(coords[i]);
    //   });

    youGrid.appendChild(newDiv);
  }
}

function displayOppBoard(arr) {
  for (let i = 0; i < 100; i++) {
    const newDiv = document.createElement("div");
    if (!Array.isArray(arr[i]) && arr[i] == "empty") {
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
    } else if (Array.isArray(arr[i]) && arr[i][0] == "ship") {
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
    } else if (Array.isArray(arr[i]) && arr[i][0] == "hit") {
      newDiv.setAttribute(
        "style",
        `background-image: url('./paw.svg');
                      border-style: solid;
                      border-width: 1px;
                      border-color: orange;
                      width: 25px;
                      height: 25px;
                      padding: 0px;
                      margin: 0px;`
      );
    } else if (!Array.isArray(arr[i]) && arr[i] == "miss") {
      newDiv.setAttribute(
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
    } else if (Array.isArray(arr[i]) && arr[i][0] == "sunk") {
      newDiv.setAttribute(
        "style",
        `background-color: #ec832c;
        background-image: url('./kittysvg.svg');
                        border-style: solid;
                        border-width: 1px;
                        border-color: orange;
                        width: 25px;
                        height: 25px;
                        padding: 0px;
                        margin: 0px;`
      );
    }

    newDiv.addEventListener("click", () => {
      //updateBoard(newDiv, player, i);
      opp.gb.receiveAttack(coords[i]);
      console.log(opp.gb.board);
      oppGrid.textContent = "";
      displayOppBoard(Array.from(opp.gb.board.values()));

      computersTurn();
      oppGrid.textContent = "";
      displayOppBoard(Array.from(opp.gb.board.values()));
      dialog.showModal();
      setTimeout(() => {
        dialog.close();
      }, 750);
      youGrid.textContent = "";
      displayYourBoard(Array.from(you.gb.board.values()));
    });

    oppGrid.appendChild(newDiv);
  }
}

displayYourBoard(squareStatusYou);
displayOppBoard(squareStatusOpp);

export { displayOppBoard, displayYourBoard };
