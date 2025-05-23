//initialization
function createEmptyBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push({ value: null, readOnly: false });
    }
    board.push(row);
  }

  return board;
}

// checking to see if number can be placed in the cell
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    const inRow = board[row][i].value;
    const inCol = board[i][col].value;
    if (inRow === num || inCol === num){
      return false;
    }
  }

  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = board[boxRowStart + i][boxColStart + j].value;
      if (cell === num){ 
        return false;
      }  
    }
  }

  return true;
}


// Main logic
// using recursion to fill the board
function fillBoard(board) {
  // Loop through each cell in the board
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = board[row][col];
      // Only try to fill empty cells
      if (cell.value === null) {
        // Try numbers 1 through 9 in random order
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let number of numbers) {
          if (isValid(board, row, col, number)) {
            // Temporarily place the number
            cell.value = number;
            // Recursively fill the rest of the board
            if (fillBoard(board)) {
              return true;
            }
            // Backtrack if it leads to a dead end
            cell.value = null;
          }
        }
        // No valid number fits in this cell then trigger backtrack
        return false;
      }
    }
  }
  // All cells are filled correctly
  return true;
}


// for different random generation of boards every time
// shufflung the numbers 1-9 to get differetnt combinations

//I googled the logic to generate random numbers each time
// and I found this code on stackoverflow -> Fischer Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the current element with the randomly selected one
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}


// Remove cells from the board to create the puzzle
function removeCells(board, holes) {
  let remaining = holes;

  while (remaining > 0) {
    // random cell
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const cell = board[row][col];

    // Only clear it if it hasn't been cleared already
    if (cell.value !== null) {
      cell.value = null;
      cell.readOnly = false;
      remaining--;
    }
  }
}

// create empty board and fill it with numbers and then add holes
export function generateSudokuPuzzle(holes = 40) {
  const board = createEmptyBoard();
  
  // board with valid solution
  fillBoard(board);
  
  
  for (let row of board) {
    for (let cell of row) {
      cell.readOnly = true;
    }
  }

  // holes = number of cells to be removed
  removeCells(board, holes);
  return board;
}

export function isBoardSolved(board) {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const val = board[row][col].value;
      if (!val || seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const val = board[row][col].value;
      if (!val || seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const val = board[boxRow * 3 + row][boxCol * 3 + col].value;
          if (!val || seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
  }

  return true;
}

export function solveSudoku(board) {
  // Check if a number can be placed at board[row][col]
  const isValidPlacement = (row, col, num) => {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (board[row][i].value === num || board[i][col].value === num) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j].value === num) return false;
      }
    }

    return true; //valid placement
  };

  // Recursive backtracking function
  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(row, col, num)) {
              board[row][col].value = num;

              if (solve()) return true; // keep going

              board[row][col].value = null; // backtrack
            }
          }
          return false; // no number fits here → backtrack
        }
      }
    }
    return true; // solved!
  };

  return solve();
}
