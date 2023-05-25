import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { getBoolean, deepCopyMatrix } from "./helpers";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let row = 0; row < nrows; row++) {
      const newRow = [];

      for (let col = 0; col < ncols; col++) {
        const bool = getBoolean(chanceLightStartsOn);
        newRow.push(bool);
      }

      initialBoard.push(newRow);
    }
    console.log(initialBoard);
    return initialBoard;
  }
  /**
   * check the board in state to determine whether the player has won
   * @returns Boolean
   */
  function hasWon() {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const flipAround = (y, x, boardCopy) => {
        // flips cells around the target coordinate
        flipCell(y + 1, x, boardCopy);
        flipCell(y - 1, x, boardCopy);
        flipCell(y, x + 1, boardCopy);
        flipCell(y, x - 1, boardCopy);
      };

      const newBoard = deepCopyMatrix(oldBoard);

      flipCell(y, x, newBoard);
      flipAround(y, x, newBoard);

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  const checker = hasWon();
  return (
    <div>
      {!checker && <table>
        <tbody>
          {board.map((r, ridx) =>
            <tr key={`${ridx}`}>
              {board[ridx].map((c, cidx) =>
                <Cell
                  flipCellsAround={flipCellsAround}
                  isLit={board[ridx][cidx]}
                  key={`${ridx}-${cidx}`}
                  coord={`${ridx}-${cidx}`}
                />
              )}
            </tr>
          )}
        </tbody>
      </table>}
      {checker && <h1>You Won!</h1>}
    </div>

  );
}

export default Board;
