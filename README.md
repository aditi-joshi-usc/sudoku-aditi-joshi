# Sudoku Game (React)

A clean, fully functional Sudoku game built using **React**. It generates solvable Sudoku puzzles, allows user input, solution checking, and auto-solving.

---
## Author's Note

This project prioritizes a logically correct and functional Sudoku engine, implemented using backtracking and custom validation. The UI is intentionally kept clean and minimal to highlight functionality over styling, making it easy to extend or customize.

## Features

- Dynamic puzzle generation with randomized valid boards
- Solve puzzle with backtracking algorithm
- Validate solution (check if user's answer is correct)
- Styled 9×9 grid with clear 3×3 box borders
- Fully responsive layout centered on screen
- Styled buttons with hover interaction

---


## Tech Stack

- React (Vite)
- JavaScript
- HTML/CSS (flexbox + grid)

---

## Project Structure

```
src/
├── components/
│   └── Grid.jsx
│   └── Cell.jsx
├── utils/
│   └── helper.js     # includes generator, solver, validator
├── App.jsx
├── App.css
└── main.jsx
```

---

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/sudoku-game.git
   cd sudoku-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

**Referred a few README files to create this one**

