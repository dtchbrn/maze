import Grid from "./grid";
import Cell from "./cell";

class BinaryTree {
  constructor() {}
  static on(grid: Grid) {
    let g = grid.grid;
    for (let i = 0; i < g.length; i++) {
      for (let j = 0; j < g[i].length; j++) {
        let cell: Cell = g[i][j];
        let neighbours = [];
        if (cell.north) {
          neighbours.push(cell.north);
        }
        if (cell.east) {
          neighbours.push(cell.east);
        }

        let index = Math.floor(Math.random() * neighbours.length);

        let neighbour: Cell = neighbours[index];
        if (neighbour) {
          cell.link(neighbour);
        }
      }
    }
  }
}

export default BinaryTree;
