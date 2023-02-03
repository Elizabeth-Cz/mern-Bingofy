import { useState, useEffect } from 'react';

const GameBoard = ({ board }) => {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    setCells(board.cells);
  }, [cells, setCells, board]);

  return (
    <>
      <p>Bingofy {board.title}</p>
      <div className="cells-grid">
        {cells.map((cell, index) => (
          <div className="grid-cell" key={index}>
            {cell}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
