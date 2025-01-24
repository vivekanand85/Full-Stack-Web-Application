import './App.css';

import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';

import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './components/ResetPassword';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';

import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="App">
     <h1>hello</h1>
     <nav>
      <Register/>
      <Login />
      <ForgotPassword />
      <TaskBoard />
      <ResetPassword />
      <CreatePost />
      <Feed />
     </nav>

     <Router>
      <Routes>
        <Route path="/register" element={<Register />}  />
        <Route path="/login" element={<Login />} />
          
      </Routes>
     </Router>
    </div>
  );
}

export default App;
