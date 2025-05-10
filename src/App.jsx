import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp'; // 경로 확인
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (

    <Router>
            <Header />
      <Routes>
        
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 메인 페이지 */}
        <Route path="/" element={
          <>
      
            <ChartTitle />
            <div style={{ display: 'flex' }}>
              {isLoggedIn ? (
                <Sidebar />
              ) : (
                <Sidebar isLoggedIn={false} />
              )}
              <Dashboard />
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;