import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">My Boards</Link>
        </li>
        <li>
          <Link to="/create">Create new board</Link>
        </li>
        <li>
          <Link to="/play">Play</Link>
        </li>
      </ul>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/myaccount">My account</Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
