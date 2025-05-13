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
  const [isLoggedIn, setIsLoggedIn] = useState(false);       // 로그인 상태
  const [currentUser, setCurrentUser] = useState(null);      // 현재 로그인한 사용자 정보

  // 앱 시작 시 토큰으로 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰 유효성 검사 및 사용자 정보 복원
      fetch('https://your-backend-api.com/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
        })
        .catch(() => {
          localStorage.removeItem('token'); // 실패 시 토큰 삭제
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  // 회원가입 함수 (onSignUp으로 전달됨)
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const response = await fetch('https://your-backend-api.com/signup', {
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

  // 로그아웃 함수 (Sidebar 등에 전달 가능)
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
            />
          }
        />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route
          path="/"
          element={
            <>
              <ChartTitle />
              <div style={{ display: 'flex' }}>
                <Sidebar
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout} // 로그아웃 전달
                />
                <Dashboard />
              </div>
            </>
          }
        />
        <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} />
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