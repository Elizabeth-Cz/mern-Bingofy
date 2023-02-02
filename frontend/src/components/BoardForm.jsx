import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../features/boards/boardSlice';
import CellAdder from './CellAdder';
import TagAdder from './TagAdder';

function BoardForm() {
  const dispatch = useDispatch();

  const [boardInfo, setBoardInfo] = useState({
    title: '',
    category: '',
    cells: [],
    tags: [],
  });

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

    dispatch(createBoard({ boardInfo }));
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h3>Add new Bingofy board</h3>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Board Title"
            value={boardInfo.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Board Category"
            value={boardInfo.category}
            onChange={handleChange}
          />
          {/* Create array of cells input field! */}
          <CellAdder
            handleCells={handleChange}
            boardInfo={boardInfo}
            setBoardInfo={setBoardInfo}
          />
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
          {/* Create array of tags input field! */}
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
            Add Board
          </button>
        </div>
      </form>
    </section>
  );
}

export default BoardForm;
