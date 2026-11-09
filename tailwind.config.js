// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4ECDD",
        panel: "#EADFC8",
        ink: "#2A2622",
        wall: "#3B332B",
        cell: "#FBF6EA",
        gridline: "#D8CBB0",
        start: "#5B7F3A",
        goal: "#B8372B",
        visited: "#E6B85C",
        path: "#D2703A",
        found: "#2F7A6E",
        push: "#5B7F3A",
        pop: "#B8372B",
      },
    },
  },
  plugins: [],
};

