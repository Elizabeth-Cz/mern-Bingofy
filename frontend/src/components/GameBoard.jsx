import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateBoard } from '../features/boards/boardSlice';
// import { useNavigate, useParams } from 'react-router-dom';

const GameBoard = ({ board }) => {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const { user } = useSelector((state) => state.auth);

  const [boardData, setBoardData] = useState(board);
  // const [cells, setCells] = useState(board.cells);
  // const [activeCells, setActiveCells] = useState(board.activeCells);

  useEffect(() => {
    setBoardData(JSON.parse(localStorage.getItem('board')) || boardData);
  }, []);

  const handleCellClick = (index) => {
    if (boardData.activeCells.includes(index)) {
      setBoardData({
        ...boardData,
        activeCells: boardData.activeCells.filter((cell) => cell !== index),
      });
      // setActiveCells(activeCells.filter((cell) => cell !== index));
    } else {
      setBoardData({
        ...boardData,
        activeCells: [...boardData.activeCells, index],
      });
      // setActiveCells([...activeCells, index]);
    }
  };

  const shuffleCells = () => {
    const shuffledCells = boardData.cells
      .slice()
      .sort(() => Math.random() - 0.5);
    setBoardData({ ...boardData, cells: shuffledCells });
  };

  const resetCells = () => {
    setBoardData({ ...boardData, activeCells: [] });
  };

  function saveBoard() {
    localStorage.setItem('board', JSON.stringify(boardData));
    console.log('cells: ', boardData.cells);
    console.log('active cells: ', boardData.activeCells);

    // dispatch(updateBoard(id, boardData));
  }

  return (
    <>
      <p>Bingofy {board.title}</p>
      <div className="game-page">
        <div className="cells-grid">
          {boardData.cells.map((cell, index) => (
            <div
              className={`grid-cell ${
                boardData.activeCells.includes(index) ? 'active' : ''
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
          {boardData.activeCells.length === 0 && (
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
