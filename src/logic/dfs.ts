// src/logic/dfs.ts
import { Grid, Position, Step } from "../types";

/**
 * Iterative depth‑first search that records every push / pop.
 * Returns a chronological array of Step objects.
 */
export const dfs = (grid: Grid, start: Position, end: Position): Step[] => {
  const rows = grid.length;
  const cols = grid[0].length;

  // visited matrix
  const visited: boolean[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));

  const steps: Step[] = [];
  const stack: Position[] = [];

  const push = (pos: Position) => {
    stack.push(pos);
    visited[pos.row][pos.col] = true;
    steps.push({ type: "PUSH", row: pos.row, col: pos.col, stack: [...stack] });
  };

  const pop = () => {
    const pos = stack.pop()!;
    steps.push({ type: "POP", row: pos.row, col: pos.col, stack: [...stack] });
  };

  // start node
  push(start);

  while (stack.length > 0) {
    const cur = stack[stack.length - 1]; // peek

    // reached the goal?
    if (cur.row === end.row && cur.col === end.col) {
      steps.push({ type: "FOUND", row: cur.row, col: cur.col, stack: [...stack] });
      return steps;
    }

    // neighbor order: Up, Right, Down, Left
    const dirs = [
      { dr: -1, dc: 0 },
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 0, dc: -1 },
    ];

    let moved = false;
    for (const { dr, dc } of dirs) {
      const nr = cur.row + dr;
      const nc = cur.col + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue; // out of bounds
      if (grid[nr][nc] === 1) continue; // wall
      if (visited[nr][nc]) continue; // already visited
      push({ row: nr, col: nc });
      moved = true;
      break; // only first valid neighbour
    }

    if (!moved) pop(); // dead‑end ⇒ backtrack
  }

  // no path found
  steps.push({ type: "NO_PATH", row: -1, col: -1, stack: [] });
  return steps;
};

