import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { reset, update } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: user.name,
    newPassword: '',
    newPassword2: '',
  });

  const { name, newPassword } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(user.token);
  };

  const onChange = (e) => {
    e.preventDefault();

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {user && (
        <>
          <h2>My Account</h2>
          <p>Name: {user && user.name}</p>
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
      )}
    </div>
  );
};

export default MyAccount;
