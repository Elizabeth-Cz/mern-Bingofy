import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BoardItem from '../components/BoardItem';
import Spinner from '../components/Spinner';
import { getBoards, reset } from '../features/boards/boardSlice';

const Dashboard = () => {
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

    if (!user) {
      navigate('/login');
    }

    dispatch(getBoards());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Welcome {user && user.name}</h1>
      {/* <BoardForm /> */}
      <section className="content">
        <h2>Your Bingofy boards</h2>
        {boards && boards.length > 0 ? (
          <div className="boards">
            {boards.map((board) => (
              <BoardItem key={board._id} board={board} />
            ))}
          </div>
        ) : (
          <h3>You have not set any boards</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
