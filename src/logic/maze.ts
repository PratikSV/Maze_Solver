// src/logic/maze.ts
import { Grid, Cell, Position } from "../types";

/** Create a blank 20×20 grid (all 0 = empty). */
export const createEmptyGrid = (): Grid => {
  const rows = 20,
    cols = 20;
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0 as Cell));
};

/** Fill roughly 28 % of cells with walls, never touching start/end. */
export const generateRandomMaze = (grid: Grid, start: Position, end: Position): Grid => {
  const newGrid = grid.map(row => [...row]); // deep copy
  const total = 20 * 20;
  const walls = Math.floor(total * 0.28);
  let placed = 0;
  while (placed < walls) {
    const r = Math.floor(Math.random() * 20);
    const c = Math.floor(Math.random() * 20);
    // keep start/end free
    if ((r === start.row && c === start.col) || (r === end.row && c === end.col)) continue;
    if (newGrid[r][c] === 0) {
      newGrid[r][c] = 1 as Cell;
      placed++;
    }
  }
  return newGrid;
};

