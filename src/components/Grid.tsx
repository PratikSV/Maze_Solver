// src/components/Grid.tsx
import { Grid, Position, Tool, Step } from "../types";
import { useState, useEffect } from "react";

type Props = {
  grid: Grid;
  start: Position;
  end: Position;
  tool: Tool;
  onUpdate: (row: number, col: number, newCell: number) => void;
  onSetStart: (pos: Position) => void;
  onSetEnd: (pos: Position) => void;
  disabled: boolean;
  steps: Step[];
  stepIdx: number;
};

export const GridComponent = ({
  grid,
  start,
  end,
  tool,
  onUpdate,
  onSetStart,
  onSetEnd,
  disabled,
  steps,
  stepIdx,
}: Props) => {
  const [mouseDown, setMouseDown] = useState(false);

  // keep mouse button state even when leaving grid
  useEffect(() => {
    const up = () => setMouseDown(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  const handleCell = (r: number, c: number) => {
    if (disabled) return;
    if (tool === "start") {
      if (grid[r][c] === 0 && !(r === end.row && c === end.col)) onSetStart({ row: r, col: c });
    } else if (tool === "end") {
      if (grid[r][c] === 0 && !(r === start.row && c === start.col)) onSetEnd({ row: r, col: c });
    } else {
      if ((r === start.row && c === start.col) || (r === end.row && c === end.col)) return;
      const newVal = tool === "wall" ? 1 : 0;
      if (grid[r][c] !== newVal) onUpdate(r, c, newVal);
    }
  };

  // Derive visited and on‑stack sets up to the current step index
  const visited = new Set<string>();
  const onStack = new Set<string>();
  for (let i = 0; i <= stepIdx && i >= 0 && i < steps.length; i++) {
    const s = steps[i];
    if (s.type === "PUSH" || s.type === "FOUND") visited.add(`${s.row},${s.col}`);
    // the current stack is always on‑stack; add it for visualisation
    s.stack.forEach(p => onStack.add(`${p.row},${p.col}`));
  }

  const cellClass = (value: number, r: number, c: number) => {
    const key = `${r},${c}`;
    if (r === start.row && c === start.col) return "bg-start";
    if (r === end.row && c === end.col) return "bg-goal";
    if (onStack.has(key)) return "bg-path";
    if (visited.has(key)) return "bg-visited";
    if (value === 1) return "bg-wall";
    return "bg-cell";
  };

  return (
    <div
      className="grid select-none"
      style={{ gridTemplateColumns: "repeat(20, 28px)", gap: "1px" }}
      onMouseDown={() => setMouseDown(true)}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`w-7 h-7 border border-gridline ${cellClass(cell, r, c)} ${
              disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
            onMouseEnter={() => mouseDown && handleCell(r, c)}
            onMouseDown={() => handleCell(r, c)}
          />
        ))
      )}
    </div>
  );
};
