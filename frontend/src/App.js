import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import CreateBoard from './pages/CreateBoard';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Login from './pages/Login';
import Play from './pages/Play';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import EditBoard from './pages/EditBoard';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateBoard />} />
            <Route path="/play" element={<Play />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/play/:id" element={<Game />} />
            <Route path="/edit/:id" element={<EditBoard />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
