import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 앱 시작 시 localStorage에 저장된 JWT로 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8080/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setIsLoggedIn(true);
          setCurrentUser(data.user); // 백엔드에서 사용자 정보 제공 시
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  // 회원가입 처리 함수
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('회원가입 오류:', error);
      return { success: false, message: '서버 오류로 회원가입에 실패했습니다.' };
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* 로그인 페이지 */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        {/* 회원가입 페이지 */}
        <Route
          path="/signup"
          element={<SignUp onSignUp={handleSignUp} />}
        />

        {/* 메인 대시보드 */}
        <Route
          path="/"
          element={
            <>
              <ChartTitle />
              <div style={{ display: 'flex' }}>
                <Sidebar
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
                <Dashboard />
              </div>
            </>
          }
        />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={<MyPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
