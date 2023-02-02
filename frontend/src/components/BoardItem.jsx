const BoardItem = ({ board }) => {
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
    </div>
  );
};

export default BoardItem;
