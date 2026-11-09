// src/components/Controls.tsx
import { Tool } from "../types";

type Props = {
  playing: boolean;
  paused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
  onRandom: () => void;
  speed: number;
  setSpeed: (ms: number) => void;
  tool: Tool;
  setTool: (t: Tool) => void;
  disabled: boolean;
};

export const Controls = ({
  playing,
  paused,
  onStart,
  onPause,
  onResume,
  onClear,
  onRandom,
  speed,
  setSpeed,
  tool,
  setTool,
  disabled,
}: Props) => {
  const speedLabel = (ms: number) => {
    if (ms === 300) return "Slow";
    if (ms === 100) return "Normal";
    return "Fast";
  };

  return (
    <div className="p-4 bg-panel h-full flex flex-col gap-4">
      <h2 className="font-serif text-xl text-ink mb-2">Controls</h2>

      <div className="flex flex-col gap-2">
        {!playing && (
          <button
            className="bg-start text-white py-1 rounded"
            onClick={onStart}
            disabled={disabled}
          >
            Start
          </button>
        )}
        {playing && !paused && (
          <button
            className="bg-ink text-white py-1 rounded"
            onClick={onPause}
            disabled={disabled}
          >
            Pause
          </button>
        )}
        {paused && (
          <button
            className="bg-start text-white py-1 rounded"
            onClick={onResume}
            disabled={disabled}
          >
            Resume
          </button>
        )}
        <button
          className="bg-ink text-white py-1 rounded"
          onClick={onClear}
          disabled={playing}
        >
          Clear Board
        </button>
        <button
          className="bg-ink text-white py-1 rounded"
          onClick={onRandom}
          disabled={playing}
        >
          Random Maze
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-ink mb-1">Speed</label>
        <input
          type="range"
          min={20}
          max={300}
          step={20}
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          disabled={playing}
          className="w-full"
        />
        <div className="text-sm text-ink text-center mt-1">{speedLabel(speed)}</div>
      </div>

      <div className="mt-4">
        <label className="block text-ink mb-1">Tool</label>
        <select
          value={tool}
          onChange={e => setTool(e.target.value as Tool)}
          disabled={playing}
          className="w-full p-1 rounded border border-ink bg-paper"
        >
          <option value="wall">Wall</option>
          <option value="erase">Erase</option>
          <option value="start">Set Start</option>
          <option value="end">Set End</option>
        </select>
      </div>
    </div>
  );
};
