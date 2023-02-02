import { useDispatch } from 'react-redux';
import { deleteBoard } from '../features/boards/boardSlice';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();

  return (
    <div className="board">
      <div>{new Date(board.createdAt).toLocaleString('en-GB')}</div>
      <h2>{board.boardInfo.title}</h2>
      <ul>
        {board.boardInfo.cells.map((cell, i) => (
          <li key={i}>
            {i + 1}. {cell}
          </li>
        ))}
      </ul>
      <p>category: {board.boardInfo.category}</p>
      <ul className="tags-list">
        {board.boardInfo.tags.length > 0 &&
          board.boardInfo.tags.map((tag, i) => (
            <li key={i} className="tag">
              {tag}
            </li>
          ))}
      </ul>
      <button
        onClick={() => dispatch(deleteBoard(board._id))}
        className="close"
      >
        x
      </button>
    </div>
  );
};

export default BoardItem;
