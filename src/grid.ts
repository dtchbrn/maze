import Cell from "./cell";
import Distances from "./distances";

export class Grid {
  rows: number;
  cols: number;
  grid: Cell[][];
  distances: Distances;

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.prepareGrid();
    this.configureCells();
  }

  prepareGrid() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j));
      }
      grid.push(row);
    }
    this.grid = grid;
  }

  configureCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.grid[i][j];
        // North
        if (this.grid[i - 1]) {
          cell.north = this.grid[i - 1][j];
        } else {
          cell.north = null;
        }
        // South
        if (this.grid[i + 1]) {
          cell.south = this.grid[i + 1][j];
        } else {
          cell.south = null;
        }
        //West
        if (this.grid[i][j - 1]) {
          cell.west = this.grid[i][j - 1];
        } else {
          cell.west = null;
        }
        //East
        if (this.grid[i][j + 1]) {
          cell.east = this.grid[i][j + 1];
        } else {
          cell.east = null;
        }
      }
    }
  }

  randomCell() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.cols);
    return this.grid[row][col];
  }

  size() {
    return this.rows * this.cols;
  }

  contentsOfCell(cell: Cell) {
    if (this.distances && this.distances.getCellDistance(cell)) {
      return this.distances.getCellDistance(cell);
    } else {
      return null;
    }
  }
}

export default Grid;
