import Cell from "./cell";

class Distances {
  cells: Map<Cell, number>;
  root: Cell;

  constructor(root: Cell) {
    this.root = root;
    this.cells = new Map();
    this.cells.set(this.root, 0);
  }

  getCellDistance(cell: Cell) {
    return this.cells.get(cell);
  }

  setCellDistance(cell: Cell, distance: number) {
    this.cells.set(cell, distance);
  }

  getCells() {
    return this.cells.keys();
  }
}

export default Distances;
