// src/components/StepTracker.tsx
import { useState } from "react";
import { Step, Position } from "../types";




type Props = {
  steps: Step[];
  currentIndex: number;
};

export const StepTracker = ({ steps, currentIndex }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const currentStep = steps[currentIndex] ?? null;

  const statusBadge = () => {
    if (!currentStep) return <span className="bg-paper text-ink px-2 py-0.5 rounded">Ready</span>;
    if (currentStep.type === "PUSH")
      return <span className="bg-start text-white px-2 py-0.5 rounded">Exploring…</span>;
    if (currentStep.type === "POP")
      return <span className="bg-pop text-white px-2 py-0.5 rounded">Backtracking…</span>;
    if (currentStep.type === "FOUND")
      return <span className="bg-found text-white px-2 py-0.5 rounded">Target Reached!</span>;
    return <span className="bg-pop text-white px-2 py-0.5 rounded">No Path Found.</span>;
  };

  // log only PUSH and POP events
  const logLines = steps
    .slice(0, currentIndex + 1)
    .filter(s => s.type === "PUSH" || s.type === "POP");

  return (
    <div className="p-4 bg-panel h-full flex flex-col gap-3 overflow-hidden">
      <h2 className="font-serif text-xl text-ink">Step Tracker</h2>

      {/* Status */}
      <div>{statusBadge()}</div>

      {/* Counters */}
      <div className="text-ink">
        <div>Steps taken: {currentIndex + 1}</div>
        <div>Stack size: {currentStep?.stack.length ?? 0}</div>
      </div>

      {/* Toggle button */}
      {!showDetails && (
        <button
          className="mt-2 w-full bg-start text-white py-1 rounded hover:bg-brave-dark"
          onClick={() => setShowDetails(true)}
        >
          Show Details
        </button>
      )}

      {/* Details (stack + log) */}
      {showDetails && (
        <>
          <button
            className="self-end text-sm text-ink underline mb-1"
            onClick={() => setShowDetails(false)}
          >
            Close
          </button>
          {/* Live Stack */}
          <div className="flex-1 overflow-y-auto border border-ink p-2 rounded text-sm font-mono text-ink">
            <div className="font-serif mb-1">Current Stack (top ↓)</div>
            {currentStep?.stack
              .slice()
              .reverse()
              .map((p: Position, i) => (
                <div key={i}>[{p.row}, {p.col}]</div>
              ))}
          </div>

          {/* Event Log */}
          <div className="flex-1 overflow-y-auto border border-ink p-2 rounded text-sm font-mono text-ink">
            <div className="font-serif mb-1">Event Log</div>
            {logLines.map((s, i) => (
              <div key={i} className={s.type === "PUSH" ? "text-push" : "text-pop"}>
                {`${s.type} [${s.row}, ${s.col}]`}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

