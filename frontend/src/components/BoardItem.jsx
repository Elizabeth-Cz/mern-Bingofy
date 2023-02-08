import { useDispatch } from 'react-redux';
import { deleteBoard } from '../features/boards/boardSlice';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();

  return (
    <div className="board">
      {/* <div>{new Date(board.createdAt).toLocaleString('en-GB')}</div> */}
      <h2>{board.boardInfo.title}</h2>
      {/* <ul className="cells-list">
        {board.boardInfo.cells.map((cell, i) => (
          <li key={i}>
            {i + 1}. {cell}
          </li>
        ))}
      </ul> */}
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
        onClick={() => {
          console.log(board._id);
          dispatch(deleteBoard(board._id));
          localStorage.removeItem('board' + board._id);
        }}
        className="close"
      >
        x
      </button>
      <button className="edit">
        <Link to={`/edit/${board._id}`}>
          <AiFillEdit />
        </Link>
      </button>
      <Link to={`/play/${board._id}`} className="btn btn-block">
        Play
      </Link>
      {/* <button className="btn btn-block">Play</button> */}
    </div>
  );
};

export default BoardItem;
