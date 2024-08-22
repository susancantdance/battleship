"use strict";

function Ship(len) {
  let length = len;
  let coords = [];
  let timesHit = 0;

  const addCoords = (str) => {
    coords.push(str);
  };

  const getCoords = () => {
    return coords;
  };
  const hit = () => {
    timesHit++;
  };
  const getHits = () => {
    return timesHit;
  };
  const isSunk = () => {
    return length == timesHit;
  };

  return { length, hit, isSunk, getHits, addCoords, getCoords };
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

  //make a ship, assign coordinates for computer
  const addShips = () => {
    let letters = "ABCDEFGHIJ";

    for (let i = 0; i < 6; i++) {
      let num = Math.floor(Math.random() * 100) % 10;
      let index = Math.floor(Math.random() * 100) % 10;
      let lett = letters.charAt(index);

      let size = 1 + (Math.floor(Math.random() * 100) % 4);
      let direction = Math.round(Math.random());
      //0 is across, 1 is down

      if (size == 1) {
        let shp = Ship(1);
        let coord = `[${num},"${lett}"]`;
        board.set(coord, ["ship", shp]);
        shp.addCoords(coord);
      } else {
        let shp = Ship(size);
        //down
        if (direction == 1 && num > 10 - size) {
          num = 10 - size;
        }
        //across
        else if (direction == 0 && index > 10 - size) {
          index = 10 - size;
          lett = letters.charAt(index);
        }

        // console.log(`DIRECTION`);
        // console.log(direction);
        // console.log("NUM");
        // console.log(num);
        // console.log("LETT");
        // console.log(lett);
        console.log(`[${num},"${lett}"] dir: ${direction} length: ${size}`);
        for (let j = 0; j < size; j++) {
          let coord = `[${num},"${lett}"]`;
          board.set(coord, ["ship", shp]);
          shp.addCoords(coord);
          if (direction == 0) {
            lett = letters.charAt(++index);
          } else {
            ++num;
          }
        }
      }
    }

    // board.set('[1,"B"]', ["ship", ship1]);
    // board.set('[2,"C"]', ["ship", ship2]);
    // board.set('[3,"C"]', ["ship", ship2]);
    // board.set('[3,"G"]', ["ship", ship3]);
    // board.set('[3,"H"]', ["ship", ship3]);
    // board.set('[3,"I"]', ["ship", ship3]);
  };

  const forTesting = () => {
    let ship1 = Ship(2);
    let shipoo = Ship(1);

    board.set('[0,"A"]', ["ship", shipoo]);
    shipoo.addCoords('[0,"A"]');
    board.set('[8,"G"]', ["ship", ship1]);
    ship1.addCoords('[8,"G"]');
    board.set('[9,"G"]', ["ship", ship1]);
    ship1.addCoords('[9,"G"]');
    board.set('[4,"J"]', "miss");
    board.set('[5,"D"]', "miss");
  };

  const receiveAttack = (coords) => {
    let status = board.get(coords);
    if (status == "empty") {
      board.set(coords, "miss");
    } else if (Array.isArray(status) && status[0] == "ship") {
      board.set(coords, ["hit", status[1]]);
      status[1].hit();
    }

    if (Array.isArray(status) && status[1].isSunk()) {
      let coords = status[1].getCoords();
      for (let i = 0; i < status[1].length; i++) {
        console.log(`coords i is ${coords[i]}`);
        board.set(coords[i], ["sunk", status[1]]);
      }
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

  //console.log(board);
  return { board, receiveAttack, allSunk, addShips, allEmpty, forTesting };
}

function Player(real) {
  let gb = Gameboard();
  if (real == true) {
    //let them place their own ships
    gb.addShips();
  } else {
    //add ships at random
    gb.addShips();
    //gb.forTesting();
  }
  return { gb };
}

export { Ship, Gameboard, Player };
