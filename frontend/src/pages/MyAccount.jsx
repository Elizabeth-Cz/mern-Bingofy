import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { reset } from '../features/auth/authSlice';

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const { name } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const onChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <>
        <h2>My Account</h2>
        <p>Name: {name}</p>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Change your name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="new-password"
                name="newPassword"
                placeholder="Enter your new password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="new-password2"
                name="newPassword2"
                placeholder="Enter your new password again"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
};

export default MyAccount;
