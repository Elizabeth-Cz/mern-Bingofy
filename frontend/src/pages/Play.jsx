import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getBoards, reset } from '../features/boards/boardSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getBoards());

    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3>Your Bingofy boards</h3>
      <ul className="boards-list">
        {boards &&
          boards.map((board) => (
            <li key={board._id} id={board._id}>
              {board.boardInfo.title}
              <Link to={`/play/${board._id}`} className="btn-reverse">
                Play
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Play;
