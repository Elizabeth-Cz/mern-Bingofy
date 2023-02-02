import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BoardForm from '../components/BoardForm';
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
  // boards.forEach((element) => {
  //   console.log(element.boardInfo.title);
  // });

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Boards Dashboard</p>
      </section>
      <BoardForm />
      <section className="content">
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
