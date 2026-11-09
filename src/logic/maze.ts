// src/logic/maze.ts
import { Grid, Cell, Position } from "../types";
import { bfs } from "./bfs"; // ensure connectivity check

/** Create a blank 20×20 grid (all 0 = empty). */
export const createEmptyGrid = (): Grid => {
  const rows = 20,
    cols = 20;
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0 as Cell));
};

/** Fill roughly 28 % of cells with walls, never touching start/end, and guarantee a path exists. */
export const generateRandomMaze = (grid: Grid, start: Position, end: Position): Grid => {
  const total = 20 * 20;
  const walls = Math.floor(total * 0.28);
  const maxAttempts = 10; // safety guard
  let attempt = 0;
  let newGrid: Grid;

  do {
    newGrid = grid.map(row => [...row]); // deep copy of the provided empty grid
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
    // Check that a path exists using BFS (fast enough for 20×20)
    const pathSteps = bfs(newGrid, start, end);
    const hasPath = pathSteps.some(s => s.type === "FOUND");
    if (hasPath) break; // good maze
    attempt++;
  } while (attempt < maxAttempts);

  // If after maxAttempts we still have no path, fall back to an empty grid (always solvable)
  if (attempt === maxAttempts) {
    console.warn("Failed to generate a solvable random maze after several attempts – using empty grid.");
    newGrid = createEmptyGrid();
  }

  return newGrid;
};


