import * as React from "react";
import { render } from "react-dom";
import Grid from "./grid";
import Cell from "./cell";
import BinaryTree from "./binaryTree";
import Sidewinder from "./sidewinder";
import styled, { StyledComponent } from "styled-components";

import "./styles.css";

const GRID_SIZE = 30;

interface IStyledCell {
  north: boolean;
  south: boolean;
  west: boolean;
  east: boolean;
}
const StyledCell = styled.div`
  border-color: black;
  border-style: solid;
  border-width: 0;
  border-top-width: ${({ north }: IStyledCell) => (!north ? "1px" : 0)};
  border-right-width: ${({ east }) => (!east ? "1px" : 0)};
  border-bottom-width: ${({ south }) => (!south ? "1px" : 0)};
  border-left-width: ${({ west }) => (!west ? "1px" : 0)};
  box-sizing: border-box;
  width: calc(100% / ${GRID_SIZE});
  height: calc(100% / ${GRID_SIZE});
`;

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  width: 60vw;
  height: 60vw;
  max-width: 60vh;
  box-sizing: border-box;
  max-height: 60vh;
  position: relative;
`;

const Button = styled.button`
  background: black;
  color: white;
  padding: 1rem;
  user-select: none;
  cursor: pointer;
  width: 150px;
  border: 0;
  margin-top: 30px;
`;

function App() {
  let g = new Grid(GRID_SIZE, GRID_SIZE);
  BinaryTree.on(g);
  const [grid, setGrid] = React.useState(g);

  const newMaze = () => {
    let g = new Grid(GRID_SIZE, GRID_SIZE);
    BinaryTree.on(g);
    setGrid(g);
  };

  const newSidewinderMaze = () => {
    let g = new Grid(GRID_SIZE, GRID_SIZE);
    Sidewinder.on(g);
    setGrid(g);
  };

  return (
    <div className="App">
      <h1>Mazes</h1>
      <GridWrapper cols={grid.cols} rows={grid.rows}>
        {grid.grid.map(row => {
          return row.map((cell: Cell) => {
            return (
              <StyledCell
                north={cell.linked(cell.north)}
                south={cell.linked(cell.south)}
                east={cell.linked(cell.east)}
                west={cell.linked(cell.west)}
              />
            );
          });
        })}
      </GridWrapper>
      <Button onClick={newMaze}>new binary maze</Button>
      <Button onClick={newSidewinderMaze}>new sidewinder maze</Button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
