import { Ship, Gameboard, Player } from "./index.js";

describe("ship tests", () => {
  // test("length", () => {
  //   expect(myShip.length).toBe(3);
  // });
  test("hits fx", () => {
    let myShip = Ship(3);
    myShip.hit();
    myShip.hit();
    expect(myShip.getHits()).toBe(2);
  });
  test("isSunk no", () => {
    let myShip = Ship(2);
    myShip.hit();
    expect(myShip.isSunk()).toBe(false);
  });
  test("isSunk yes", () => {
    let myShip = Ship(2);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
});

describe("gameboard", () => {
  let myGameboard = Gameboard();
  let cleanBoard = Gameboard();
  test("is a board", () => {
    expect(typeof myGameboard).toBe("object");
  });
  test("board built", () => {
    let coords = '[0,"A"]';
    expect(myGameboard.board.get(coords)).toBe("empty");
  });
  test("received attack, missed", () => {
    let coords = '[5,"B"]';
    myGameboard.receiveAttack(coords);
    expect(myGameboard.board.get(coords)).toBe("miss");
  });
  test("received attack, board records hit", () => {
    let coords = '[1,"B"]';
    myGameboard.addShips();
    myGameboard.receiveAttack(coords);
    expect(myGameboard.board.get(coords)[0]).toBe("hit");
  });
  test("received attack, correct ship records hit", () => {
    let shipsy = Ship(1, 11);
    let coords = '[2,"C"]';
    myGameboard.board.set(coords, ["ship", shipsy]);
    myGameboard.receiveAttack(coords);
    expect(shipsy.getHits()).toBe(1);
  });
  test("all sunk - no", () => {
    let coords = '[1,"B"]';
    cleanBoard.addShips();
    cleanBoard.receiveAttack(coords);
    expect(cleanBoard.allSunk()).toBe(false);
  });

  test("all sunk - yes", () => {
    let coords = '[1,"B"]';
    let coords2 = '[2,"C"]';
    let coords3 = '[3,"C"]';
    cleanBoard.receiveAttack(coords);
    cleanBoard.receiveAttack(coords2);
    cleanBoard.receiveAttack(coords3);
    expect(cleanBoard.allSunk()).toBe(true);
  });
});

describe("players", () => {
  let jon = Player(true);
  let jane = Player(false);
  test("real players have empty boards", () => {
    expect(jon.gb.allEmpty()).toBe(true);
  });
  test("computer players have ships", () => {
    expect(jane.gb.allEmpty()).toBe(false);
  });
});
