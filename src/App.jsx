import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';
import AddStation from './Components/AddStation';
import Sidebar_mp from './Components/Sidebar_mp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 회원가입
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const res = await fetch('http://52.79.124.254:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      return res.ok
        ? { success: true, message: '회원가입 성공!' }
        : { success: false, message: data.message || '회원가입 실패' };
    } catch (err) {
      console.error('회원가입 오류:', err);
      return { success: false, message: '서버 오류로 회원가입에 실패했습니다.' };
    }
  };

  // 로그인
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch('http://52.79.124.254:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ JWT 기반 인증에 필수
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // ✅ 저장
        setIsLoggedIn(true);
        setCurrentUser({ email }); // ✅ 사용자 정보 저장
        return { success: true };
      } else {
        return { success: false, message: data.message || '이메일 또는 비밀번호가 올바르지 않습니다.' };
      }
    } catch (err) {
      return { success: false, message: '서버 오류' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              handleLogin={handleLogin}
            />
          }
        />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <ChartTitle />
                <div style={{ display: 'flex' }}>
                  <Sidebar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    currentUser={currentUser}
                  />
                  <Dashboard />
                </div>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/add-station" element={<AddStation />} />
      </Routes>
    </Router>
  );
}

export default App;
