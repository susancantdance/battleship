"use strict";

function Ship(len, id) {
  const length = len;
  let timesHit = 0;
  const hit = () => {
    timesHit++;
  };
  const getHits = () => {
    return timesHit;
  };
  const isSunk = () => {
    if (length == timesHit) {
      return true;
    } else return false;
  };

  return { id, hit, isSunk, getHits };
}

function Gameboard() {
  let board = new Map();
  let letters = "ABCDEFGHIJ".split("");

  //populate board
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      board.set(JSON.stringify([i, letters[k]]), "empty");
    }
  }

  //make a ship, assign coordinates
  const addShips = () => {
    let ship1 = Ship(1, 0);
    let ship2 = Ship(2, 1);
    board.set('[1,"B"]', ["ship", ship1]);
    board.set('[2,"C"]', ["ship", ship2]);
    board.set('[3,"C"]', ["ship", ship2]);
  };

  const receiveAttack = (coords) => {
    let status = board.get(coords);
    if (status == "empty") {
      board.set(coords, "miss");
    } else if (Array.isArray(status) && status[0] == "ship") {
      board.set(coords, ["hit", status[1]]);
      status[1].hit();
    }
  };

  const allEmpty = () => {
    let isEmpty = true;
    let arr = Array.from(board.values());
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != "empty") {
        isEmpty = false;
      }
    }
    return isEmpty;
  };

  const allSunk = () => {
    let arr = Array.from(board.values());
    let shipsArray = arr.filter((val) => Array.isArray(val));
    let sunk = true;
    for (let i = 0; i < shipsArray.length; i++) {
      if (shipsArray[i][0] == "ship") {
        sunk = false;
      }
    }
    return sunk;
  };

  console.log(board);
  return { board, receiveAttack, allSunk, addShips, allEmpty };
}

function Player(real) {
  let gb = Gameboard();
  if (real == true) {
    //let them place their own ships
  } else {
    //add ships at random
    gb.addShips();
  }
  return { gb };
}

export { Ship, Gameboard, Player };
