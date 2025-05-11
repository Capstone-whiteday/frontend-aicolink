import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={
          <>
            <ChartTitle />
            <div style={{ display: 'flex' }}>
              <Sidebar isLoggedIn={isLoggedIn} />
              <Dashboard />
            </div>
          </>
        } />
        <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;