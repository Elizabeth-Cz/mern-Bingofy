import BoardForm from '../components/BoardForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateBoard = () => {
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user || isError) {
      navigate('/');
      console.log(message);
    }
  }, [user, navigate, isError, message]);

  return <BoardForm />;
};

export default CreateBoard;
