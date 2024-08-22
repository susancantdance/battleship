import { clean } from "semver";
import { Ship, Gameboard, Player } from "./factories.js";

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
    let myGB = Gameboard();
    let shippy = Ship(2);
    myGB.board.set('[0,"A"]', ["ship", shippy]);
    myGB.board.set('[0,"B"]', ["ship", shippy]);
    shippy.addCoords('[0,"A"]');
    shippy.addCoords('[0,"B"]');
    myGB.receiveAttack('[0,"B"]');
    console.log(myGB.board.get('[0,"B"]')[1].getCoords());
    expect(myGB.board.get('[0,"B"]')[0]).toBe("hit");
  });
  test("received attack, correct ship records hit", () => {
    let shipsy = Ship(1);
    let coords = '[2,"C"]';
    myGameboard.board.set(coords, ["ship", shipsy]);
    myGameboard.receiveAttack(coords);
    expect(shipsy.getHits()).toBe(1);
  });
  test("all sunk - no", () => {
    let coords = '[0,"A"]';
    cleanBoard.forTesting();
    cleanBoard.receiveAttack(coords);
    expect(cleanBoard.allSunk()).toBe(false);
  });

  test("all sunk - yes", () => {
    let coords = '[0,"A"]';
    let coords2 = '[8,"G"]';
    let coords3 = '[9,"G"]';
    cleanBoard.forTesting();
    cleanBoard.receiveAttack(coords);
    cleanBoard.receiveAttack(coords2);
    cleanBoard.receiveAttack(coords3);
    expect(cleanBoard.allSunk()).toBe(true);
  });

  test("single ship sunk - yes", () => {
    let newBoard = Gameboard();
    let coords1 = '[0,"A"]';
    let coords2 = '[8,"G"]';
    let coords3 = '[9,"G"]';

    newBoard.forTesting();
    newBoard.receiveAttack(coords2);
    newBoard.receiveAttack(coords3);
    newBoard.receiveAttack(coords1);

    expect(newBoard.board.get(coords3)[0]).toBe("sunk");
  });
});

describe("players", () => {
  let jon = Player(true);
  let jane = Player(false);
  //   test("real players have empty boards", () => {
  //     expect(jon.gb.allEmpty()).toBe(true);
  //   });
  //   test("computer players have ships", () => {
  //     expect(jane.gb.allEmpty()).toBe(false);
  //   });
  test("array shouldn't be greater than 100", () => {
    expect(Array.from(jon.gb.board).length).toBe(100);
    expect(jane.gb.board.size).toBe(100);
  });
});
