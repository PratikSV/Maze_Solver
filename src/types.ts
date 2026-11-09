export type Algorithm = "DFS" | "BFS";

export type Position = { row: number; col: number };

export type Cell = 0 | 1; // 0 = empty, 1 = wall

export type Grid = Cell[][]; // 20 × 20 grid

export type Tool = "wall" | "erase" | "start" | "end";

export type Step =
  | {
      type: "PUSH";
      row: number;
      col: number;
      stack: Position[]; // copy after push
    }
  | {
      type: "POP";
      row: number;
      col: number;
      stack: Position[]; // copy after pop
    }
  | {
      type: "FOUND";
      row: number;
      col: number;
      stack: Position[]; // final stack
    }
  | {
      type: "NO_PATH";
      row: -1;
      col: -1;
      stack: Position[]; // empty
    };
