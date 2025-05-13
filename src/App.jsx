import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';

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
  // 로그인 여부, 현재 사용자 정보 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * 앱 시작 시 localStorage에 저장된 JWT 토큰으로
   * 로그인 상태를 복원하고 사용자 정보를 가져옴
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://your-backend-api.com/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setIsLoggedIn(true);
          setCurrentUser(data.user); // 백엔드에서 응답받은 사용자 정보
        })
        .catch(() => {
          // 토큰이 유효하지 않거나 만료된 경우
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  /**
   * 회원가입 API 연동 함수
   * @param {Object} param0 name, email, password
   */
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const response = await fetch('https://your-backend-api.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      return data; // { success: true, message: '...' }
    } catch (error) {
      console.error('회원가입 오류:', error);
      return { success: false, message: '서버 오류로 회원가입에 실패했습니다.' };
    }
  };

  /**
   * 로그아웃 처리 함수
   * - localStorage 토큰 제거
   * - 상태 초기화
   */
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

        {/* 메인 대시보드 (로그인 여부 상관없이 접근 가능) */}
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

        {/* 마이페이지 (로그인 필요 시 보호 라우팅으로 확장 가능) */}
        <Route
          path="/mypage"
          element={<MyPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Header from "./Components/Header";
// import ChartTitle from "./Components/ChartTitle";
// import Sidebar from './Components/Sidebar';
// import Dashboard from './Components/Dashboard';
// import Login from './Components/Login';
// import SignUp from './Components/SignUp';
// import MyPage from './Components/MyPage';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
//   const [users, setUsers] = useState([]); // 사용자 정보 관리
//   const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보 관리 추가****
//   const handleSignUp = ({ name, email, password }) => {
//     const existingUser = users.find((user) => user.email === email);
//     if (existingUser) {
//       return { success: false, message: '이미 사용 중인 이메일입니다.' };
//     }
  
//     setUsers((prevUsers) => [...prevUsers, { name, email, password }]);
//     return { success: true, message: '회원가입 성공!' };
//   };
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/login" element={
//             <Login 
//               setIsLoggedIn={setIsLoggedIn} 
//               setCurrentUser={setCurrentUser} // **setCurrentUser prop 추가**
//               users={users} // **users prop 추가**
//             />
//           } 
//         />
//         <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
//         <Route path="/" element={
//           <>
//             <ChartTitle />
//             <div style={{ display: 'flex' }}>
//               <Sidebar
//                isLoggedIn={isLoggedIn} 
//                setIsLoggedIn={setIsLoggedIn}
//                currentUser={currentUser} // **currentUser prop 추가**
//               />
//               <Dashboard />
//             </div>
//           </>
//         } />
//         <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;