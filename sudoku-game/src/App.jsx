import { useState } from 'react';
import { generateSudokuPuzzle, isBoardSolved, solveSudoku } from './utils/helper';
import { Grid } from './components/Grid';
import './App.css';

function App() {
  const [board, setBoard] = useState(generateSudokuPuzzle());

  // Start a new puzzle
  const handleNewGame = () => {
    setBoard(generateSudokuPuzzle());
  };

  // Check if the current board is correctly solved
  const handleCheckSolution = () => {
    if (isBoardSolved(board)) {
      alert('Congratulations! You solved the Sudoku.');
    } else {
      alert('Incorrect. Please try again.');
    }
  };

  // Auto-solve the current board using backtracking
  const handleSolvePuzzle = () => {
    const boardCopy = board.map(row => row.map(cell => ({ ...cell })));
    if (solveSudoku(boardCopy)) {
      setBoard(boardCopy);
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
