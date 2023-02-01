const BoardItem = ({ board }) => {
  return (
    <div className="board">
      <div>{new Date(board.createdAt).toLocaleString('en-GB')}</div>
      <h2>{board.text}</h2>
    </div>
  );
};

export default BoardItem;
