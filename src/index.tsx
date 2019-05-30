import * as React from "react";
import { render } from "react-dom";
import Grid from "./grid";
import Cell from "./cell";
import BinaryTree from "./binaryTree";
import Sidewinder from "./sidewinder";
import styled, { StyledComponent } from "styled-components";
import _ from "lodash";

import "./styles.css";

const GRID_SIZE = 10;

interface IStyledCell {
  north: boolean;
  south: boolean;
  west: boolean;
  east: boolean;
  distance: number;
  longestDistance: number;
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  user-select: none;
  background-color: ${({ distance, longestDistance }: IStyledCell) =>
    "rgba(0,0,0," + (distance / longestDistance) * 0.6 + ")"};
`;

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  width: 60vw;
  height: 60vw;
  max-width: 60vh;
  max-height: 60vh;
  box-sizing: border-box;
  position: relative;
  @media (max-width: 500px) {
    width: 80vw;
    height: 80vw;
    max-width: 80vh;
    max-height: 80vh;
  }
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
  touch-action: manipulation;
`;

function App() {
  let g = new Grid(GRID_SIZE, GRID_SIZE);
  BinaryTree.on(g);
  let start: Cell = g.grid[0][0];
  let distances = start.distances();
  g.distances = distances;
  console.log("g with distances", g);
  const [grid, setGrid] = React.useState(g);

  const newMaze = () => {
    let g = new Grid(GRID_SIZE, GRID_SIZE);
    BinaryTree.on(g);
    let start: Cell = g.grid[0][0];
    let distances = start.distances();
    g.distances = distances;
    console.log("g with distances", g);
    setGrid(g);
  };

  const newSidewinderMaze = () => {
    let g = new Grid(GRID_SIZE, GRID_SIZE);
    Sidewinder.on(g);
    let start: Cell = g.grid[0][0];
    let distances = start.distances();
    g.distances = distances;
    console.log("g with distances", g);
    setGrid(g);
  };

  const updateDistances = (row, col) => {
    let g = new Grid(GRID_SIZE, GRID_SIZE);
    g.grid = grid.grid;
    let start: Cell = g.grid[row][col];
    let distances = start.distances();
    g.setDistances(distances);
    console.log("g with distances", g);
    setGrid(g);
  };

  return (
    <div className="App">
      <h1>Mazes</h1>
      <GridWrapper cols={grid.cols} rows={grid.rows}>
        {grid.grid.map(row => {
          let longestDistance = grid.distances.getLongestDistance();
          return row.map((cell: Cell) => {
            return (
              <StyledCell
                north={cell.linked(cell.north)}
                south={cell.linked(cell.south)}
                east={cell.linked(cell.east)}
                west={cell.linked(cell.west)}
                distance={grid.distances.getCellDistance(cell)}
                longestDistance={longestDistance}
                onClick={() => updateDistances(cell.row, cell.col)}
              >
                {grid.distances.getCellDistance(cell)}
              </StyledCell>
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
