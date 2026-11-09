// src/logic/bfs.ts
import { Grid, Position, Step } from "../types";

/** Breadth‑First Search (iterative) returning steps compatible with the UI */
export const bfs = (grid: Grid, start: Position, end: Position): Step[] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue: Position[] = [];
  const parent: Map<string, Position | null> = new Map();
  const steps: Step[] = [];

  const encode = (p: Position) => `${p.row},${p.col}`;

  queue.push(start);
  visited[start.row][start.col] = true;
  parent.set(encode(start), null);
  // Record the first enqueue as a PUSH (for UI consistency)
  steps.push({ type: "PUSH", row: start.row, col: start.col, stack: [start] });

  const dirs: [number, number][] = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    // If we reached the goal, reconstruct the path
    if (cur.row === end.row && cur.col === end.col) {
      const path: Position[] = [];
      let node: Position | null = cur;
      while (node) {
        path.unshift(node);
        node = parent.get(encode(node))!;
      }
      steps.push({ type: "FOUND", row: cur.row, col: cur.col, stack: path });
      return steps;
    }

    // Explore neighbours
    for (const [dr, dc] of dirs) {
      const r = cur.row + dr;
      const c = cur.col + dc;
      if (r < 0 || c < 0 || r >= rows || c >= cols) continue;
      if (grid[r][c] === 1) continue; // wall
      if (visited[r][c]) continue;
      visited[r][c] = true;
      const pos: Position = { row: r, col: c };
      queue.push(pos);
      parent.set(encode(pos), cur);
      // Enqueue is visualised as a PUSH step
      steps.push({ type: "PUSH", row: r, col: c, stack: [pos] });
    }
    // When we finish processing a node we emit a POP step (back‑track analogue)
    steps.push({ type: "POP", row: cur.row, col: cur.col, stack: [] });
  }

  // No path found
  steps.push({ type: "NO_PATH", row: -1, col: -1, stack: [] });
  return steps;
};

