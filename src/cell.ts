export class Cell {
  row: number;
  col: number;
  north: Cell | null;
  south: Cell | null;
  east: Cell | null;
  west: Cell | null;
  links: Map<Cell, boolean>;

  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.links = new Map();
  }

  link(cell: Cell, biDi = true) {
    this.links.set(cell, true);
    //biDi - biDirectional
    if (biDi) {
      cell.link(this, false);
    }
  }

  unLink(cell: Cell, biDi = true) {
    this.links.delete(cell);
    if (biDi) {
      cell.unLink(this, false);
    }
  }

  getLinks(): Map<Cell, boolean> {
    return this.links;
  }

  linked(cell: Cell): boolean {
    return this.links.has(cell);
  }

  neighbours(): Cell[] {
    let list = [];
    if (this.north) {
      list.push(this.north);
    }
    if (this.south) {
      list.push(this.south);
    }
    if (this.east) {
      list.push(this.east);
    }
    if (this.west) {
      list.push(this.west);
    }
    return list;
  }
}

export default Cell;
