import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard, updateBoard } from '../features/boards/boardSlice';
import CellAdder from './CellAdder';
import TagAdder from './TagAdder';

function BoardForm({ board, id }) {
  const { isError, message } = useSelector((state) => state.boards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [boardData, setBoardData] = useState(board || null);
  const [boardInfo, setBoardInfo] = useState(
    boardData
      ? {
          title: boardData.title,
          category: boardData.category,
          cells: boardData.cells,
          tags: boardData.tags,
          activeCells: boardData.activeCells,
        }
      : {
          title: '',
          category: '',
          cells: [],
          tags: [],
          activeCells: [],
        }
  );

  // console.log(id);

  const handleChange = (e) => {
    setBoardInfo({
      ...boardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTag = (e, i) => {
    e.preventDefault();
    boardInfo.tags.splice(i, 1);
    setBoardInfo({
      ...boardInfo,
    });
  };

  const deleteCell = (e, i) => {
    e.preventDefault();
    boardInfo.cells.splice(i, 1);
    setBoardInfo({
      ...boardInfo,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (board) {
      dispatch(updateBoard(id, { boardInfo }));
    } else {
      dispatch(createBoard({ boardInfo }));
      setBoardInfo({
        title: '',
        category: '',
        cells: [],
        tags: [],
        activeCells: [],
      });
      toast.success('New board created!');
      navigate('/');
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    setBoardData(board);
    setBoardInfo(
      boardData
        ? {
            activeCells: boardData.activeCells,
            category: boardData.category,
            cells: boardData.cells,
            tags: boardData.tags,
            title: boardData.title,
          }
        : {
            activeCells: [],
            category: '',
            cells: [],
            tags: [],
            title: '',
          }
    );
  }, [board, boardData, message, isError]);

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h3>{board ? 'Edit' : 'Add new'} Bingofy board</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={boardInfo.title}
            onChange={handleChange}
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={boardInfo.category}
            onChange={handleChange}
          />
          <CellAdder
            handleCells={handleChange}
            boardInfo={boardInfo}
            setBoardInfo={setBoardInfo}
          />
          <p>{boardInfo.cells.length}/25</p>
          <ul className="cells-list">
            {boardInfo.cells.map((cell, i) => (
              <li key={i} className="cell">
                {cell}
                <button className="close" onClick={(e) => deleteCell(e, i)}>
                  x
                </button>
              </li>
            ))}
          </ul>
          <TagAdder
            handleTags={handleChange}
            boardInfo={boardInfo}
            setBoardInfo={setBoardInfo}
          />
          <ul className="tags-list">
            {boardInfo.tags.map((tag, i) => (
              <li key={i} className="tag">
                {tag}
                <button className="close" onClick={(e) => deleteTag(e, i)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {board ? 'Save Changes' : 'Add Board'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BoardForm;
