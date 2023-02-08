import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBoards, reset } from '../features/boards/boardSlice';
import Spinner from '../components/Spinner';
import BoardForm from '../components/BoardForm';

const EditBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );
  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getBoards());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user]);

  useEffect(() => {
    setBoard(boards.find((b) => b._id === id) || {});
  }, [boards, id, setBoard]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>{board && <BoardForm board={board.boardInfo} id={board._id} />}</div>
  );
};

export default EditBoard;
