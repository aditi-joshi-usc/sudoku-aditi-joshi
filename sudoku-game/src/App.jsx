import { useState } from 'react';
import { generateSudokuPuzzle, isBoardSolved, solveSudoku } from './utils/helper';
import { Grid } from './components/Grid';
import './App.css';

function App() {
  // Initialization
  const [board, setBoard] = useState(generateSudokuPuzzle());

  // refresh 
  const handleNewGame = () => {
    setBoard(generateSudokuPuzzle());
  };

  // Check if the current board is correctly solved
  // copilot auto fill
  const handleCheckSolution = () => {
    if (isBoardSolved(board)) {
      alert('Congratulations! You solved the Sudoku.');
    } else {
      alert('Incorrect. Please try again.');
    }
  };

  // Auto-solve the current board using backtracking
  const handleSolvePuzzle = () => {
    const copiedBoard = board.map(row =>
    row.map(cell => ({ ...cell }))
    );
     const solved = solveSudoku(copiedBoard);

    if (solved) {
      setBoard(copiedBoard); // Update the board with the solved version
    } else {
      alert('No valid solution exists.');
    }
  };

return (
  <div className="app">
    <div className="content">
      <h1>Sudoku</h1>
      <Grid board={board} setBoard={setBoard} />
      <div className="buttons">
        <button onClick={handleNewGame}>New Game</button>


        <button onClick={handleCheckSolution}>Check Solution</button>


        <button onClick={handleSolvePuzzle}>Solve Puzzle</button>
      </div>
    </div>
  </div>
);
}

export default App;
