import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../features/boards/boardSlice';

function BoardForm() {
  const [boardInfo, setBoardInfo] = useState({
    title: '',
    category: '',
    cells: [],
    tags: [],
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setBoardInfo({
      ...boardInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createBoard({ boardInfo }));
    // setBoardInfo({});
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Board</label>
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
            placeholder="Board category"
            value={boardInfo.category}
            onChange={handleChange}
          />
          {/* Create array of cells input field! */}
          <input
            type="text"
            name="cells"
            id="cells"
            placeholder="Board Cells"
            value={boardInfo.cells}
            onChange={handleChange}
          />
          {/* Create array of tags input field! */}
          <input
            type="text"
            name="cells"
            id="cells"
            placeholder="Board Cells"
            value={boardInfo.cells}
            onChange={handleChange}
          />
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
