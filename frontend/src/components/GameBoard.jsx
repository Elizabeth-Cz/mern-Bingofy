import { useState, useEffect, useMemo } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const GameBoard = ({ board }) => {
  const { id } = useParams();
  const LS = JSON.parse(localStorage.getItem('board ' + id));

  const [boardInfo, setboardInfo] = useState(
    LS && LS.boardId === id ? LS.boardInfo : board.boardInfo
  );

  const shuffledCells = useMemo(
    () => boardInfo.cells.slice().sort(() => Math.random() - 0.5),
    [boardInfo.cells]
  );

  const handleCellClick = (index) => {
    if (boardInfo.activeCells.includes(index)) {
      setboardInfo({
        ...boardInfo,
        activeCells: boardInfo.activeCells.filter((cell) => cell !== index),
      });
    } else {
      setboardInfo({
        ...boardInfo,
        activeCells: [...boardInfo.activeCells, index],
      });
    }
  };

  const shuffleCells = () => {
    setboardInfo({ ...boardInfo, cells: shuffledCells });
  };

  const resetCells = () => {
    setboardInfo({ ...boardInfo, activeCells: [] });
  };

  function saveBoard() {
    const LS = { boardInfo, boardId: id };
    localStorage.setItem('board ' + id, JSON.stringify(LS));
  }

  useEffect(() => {
    if (LS && LS.boardId === id) {
      console.log('This board is saved to LS');
    }
  }, [LS, id]);

  if (!board) {
    return <Spinner />;
  }

  const { cells, title, activeCells } = boardInfo;

  return (
    <>
      <p>Bingofy {title}</p>
      <div className="game-page">
        <div className="cells-grid">
          {cells.map((cell, index) => (
            <div
              className={`grid-cell ${
                activeCells.includes(index) ? 'active' : ''
              }`}
              key={index}
              onClick={() => handleCellClick(index)}
            >
              <p>{cell}</p>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="btn" onClick={resetCells}>
            Reset
          </button>
          {activeCells.length === 0 && (
            <button className="btn" onClick={shuffleCells}>
              Shuffle Cells
            </button>
          )}
          <button
            className="btn btn-save btn-reverse"
            onClick={() => saveBoard()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
