import { useState, useEffect, useMemo, useCallback } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const GameBoard = ({ board }) => {
  const { id } = useParams();
  const LS = JSON.parse(localStorage.getItem('board ' + id));

  const [boardInfo, setboardInfo] = useState(
    LS && LS.boardId === id ? LS.boardInfo : board.boardInfo
  );

  const [isBingo, setIsBingo] = useState(false);
  const shuffledCells = useMemo(
    () => boardInfo.cells.slice().sort(() => Math.random() - 0.5),
    [boardInfo.cells]
  );

  const checkBingo = useCallback((activeCells) => {
    let bingo = false;
    const winConditions = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    const activeSet = new Set(activeCells);

    winConditions.forEach((condition) => {
      if (condition.every((cell) => activeSet.has(cell))) {
        bingo = true;
      }
    });
    setIsBingo(bingo);
    // Doesn't save last cellClick
    // saveBoard();
    return bingo;
  }, []);

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
    // Doesn't save last cellClick
    // saveBoard();
  };

  const shuffleCells = () => {
    setboardInfo({ ...boardInfo, cells: shuffledCells });
  };

  const resetCells = () => {
    setboardInfo({ ...boardInfo, activeCells: [] });
  };

  //use callback

  function saveBoard() {
    const LS = { boardInfo, boardId: id };
    localStorage.setItem('board ' + id, JSON.stringify(LS));
  }

  const { cells, title, activeCells } = boardInfo;

  useEffect(() => {
    checkBingo(activeCells);
    // console.log(isBingo);
    saveBoard();
  }, [activeCells, checkBingo, isBingo, saveBoard]);

  if (!board) {
    return <Spinner />;
  }

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
              onClick={() => {
                handleCellClick(index);
                checkBingo(activeCells);
                // Doesn't save last cellClick
                // saveBoard();
              }}
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
          <h1 className={isBingo ? 'scale-up-center' : 'no-bingo'}>BINGO</h1>{' '}
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
