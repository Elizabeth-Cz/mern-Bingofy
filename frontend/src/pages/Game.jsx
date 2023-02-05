import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard';
import { useSelector, useDispatch } from 'react-redux';
import { getBoards, reset } from '../features/boards/boardSlice';
import Spinner from '../components/Spinner';

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  const [board, setBoard] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getBoards());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user]);

  useEffect(() => {
    setBoard(boards.find((b) => b._id === id) || {});
  }, [boards, id]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      {board && Object.keys(board).length > 0 && (
        <>
          <GameBoard board={board} />
        </>
      )}
    </div>
  );
};

export default Game;
