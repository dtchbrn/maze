import Distances from "./distances";

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

  getLinks(): Cell[] {
    return Array.from(this.links.keys());
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

  distances() {
    // instantiate Distances
    let distances = new Distances(this);
    // We initialize our frontier set to be an array of one element
    // this cell, our starting point
    let frontier = [this];
    // loop until there are no cells in frontier, meaning
    // we've easyred the distance of every cell to our root cell.
    while (frontier.length > 0) {
      // newFrontier will hold all the unvisited cells
      // that are linked to cells in the current frontier set.
      //
      let newFrontier = [];
      for (let i = 0; i < frontier.length; i++) {
        let cell = frontier[i];
        cell.getLinks().forEach(linked => {
          if (distances.getCellDistance(linked) === undefined) {
            distances.setCellDistance(
              linked,
              distances.getCellDistance(cell) + 1
            );
            newFrontier.push(linked);
          }
        });
      }
      frontier = newFrontier;
    }
    return distances;
  }
}

export default Cell;
