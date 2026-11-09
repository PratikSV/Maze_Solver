# Interactive Maze Solver

A lightweight, beginner‑friendly React + TypeScript application that visualises a **Depth‑First Search (DFS)** and **Breadth‑First Search (BFS)** solving a maze on a 20 × 20 grid.  The UI shows the live stack, visited cells and an event log, making the concepts of a stack and graph traversal instantly understandable.

---

## ✨ Features
- **Algorithm picker** – switch between DFS (default) and BFS.
- **Random maze generator** – creates a solvable maze (walls fill ~28 % of cells) and guarantees a reachable end point.
- **Step‑by‑step playback** – start, pause, resume with adjustable speed (slow/normal/fast).
- **Interactive grid** – draw/erase walls, set start and end points with a simple tool selector.
- **Step Tracker panel** – live counters, stack view, event log (show/hide with a button).
- **Responsive UI** – styled with Tailwind CSS using a Brave‑inspired flat colour palette.
- No external state‑management libraries; uses only React hooks (`useState`, `useEffect`, `useRef`).

---

## 🛠️ Tech Stack
- **React 18** (functional components & hooks)
- **TypeScript 5** (strict mode)
- **Vite 5** (dev server & bundler)
- **Tailwind CSS v3** (utility‑first styling)

---

## 📦 Project Structure
```
src/
  App.tsx                # top‑level state, playback logic, layout
  components/
    Grid.tsx            # renders the 20×20 grid and handles mouse interactions
    Controls.tsx        # left panel – buttons, speed slider, tool picker, algorithm dropdown
    StepTracker.tsx     # right panel – status badge, counters, live stack & event log
  logic/
    dfs.ts              # iterative DFS, returns an array of Step objects
    bfs.ts              # iterative BFS, compatible Step shape
    maze.ts             # createEmptyGrid & generateRandomMaze (solvable guarantee)
  types.ts               # shared TypeScript types (Grid, Position, Step, Algorithm, …)
index.html                # entry HTML
main.tsx                  # renders <App /> and imports src/index.css
index.css                 # Tailwind directives
```

---

## 🚀 Getting Started
1. **Clone the repository** (if you haven’t already):
   ```bash
   git clone <repo‑url>
   cd Maze_Solver
   ```
2. **Install dependencies** (requires Node 20+):
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or the port Vite chooses).
4. **Build for production**:
   ```bash
   npm run build
   ```
   The static assets are emitted to the `dist/` folder.
5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🎮 Using the App
| Control | Action |
|---------|--------|
| **Start** | Begins playback using the selected algorithm (DFS by default). |
| **Pause** | Halts the interval; you can resume later. |
| **Resume** | Continues playback from the current step. |
| **Clear Board** | Resets the grid, steps and playback state. |
| **Random Maze** | Generates a new solvable maze (walls ~28 %). |
| **Speed slider** | Choose `Slow (300 ms)`, `Normal (100 ms)` or `Fast (20 ms)`. |
| **Tool picker** | Wall / Erase / Set Start / Set End – click or drag on the grid. |
| **Algorithm dropdown** | Switch between **Depth‑First Search** and **Breadth‑First Search** before starting. |
| **Show Details** (in Step Tracker) | Reveals the live stack and event log; click **Close** to hide. |

---

## 🧩 How the Random Maze Guarantees a Path
`generateRandomMaze` now:
1. Places walls randomly (≈28 %).
2. Runs a **BFS** from the start to the end.
3. If BFS finds a `FOUND` step, the maze is accepted.
4. It retries up to 10 times; if still unsolvable, it falls back to an empty grid and logs a warning.

---

## 🤝 Contributing
Feel free to open issues or submit pull requests.  When adding new functionality:
- Keep the UI simple and Tailwind‑only – no extra UI libraries.
- Preserve the existing DFS/BFS step shape (`Step` type) to keep the visualiser consistent.
- Add or update tests in `src/__tests__` if you introduce new logic.

---

## 📄 License
This project is provided under the **MIT License**. See `LICENSE` for details.
