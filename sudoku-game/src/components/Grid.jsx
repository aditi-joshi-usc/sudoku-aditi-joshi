import { Cell } from './Cell';

export function Grid({ board, setBoard }) {
  // Update the value of a specific cell
  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedBoard = board.map(row =>
      row.map(cell => ({ ...cell }))
    );

    updatedBoard[rowIndex][colIndex].value = newValue;
    setBoard(updatedBoard);
  };

    // Render the grid -> copilot auto fill
  return (
    <div className="grid">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`} value={cell.value} readOnly={cell.readOnly} onChange={(newValue) => handleCellChange(rowIndex, colIndex, newValue)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
