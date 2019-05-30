import Grid from "./grid";
import Cell from "./cell";

const rand = n => Math.floor(Math.random() * n);

class Sidewinder {
  constructor() {}
  static on(grid: Grid) {
    let g = grid.grid;
    for (let i = 0; i < g.length; i++) {
      let run: Cell[] = [];
      for (let j = 0; j < g[i].length; j++) {
        let cell: Cell = g[i][j];
        run.push(cell);
        if (cell.east === null || (cell.north !== null && rand(2) === 0)) {
          let member = run[rand(run.length)];
          if (member.north !== null) {
            member.link(member.north);
          }
          run = [];
        } else {
          cell.link(cell.east);
        }
      }
    }
  }
}

export default Sidewinder;
