import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';
import AddStation from './Components/AddStation';
import Sidebar_mp from './Components/Sidebar_mp';

// =========================
// 기존 Mock Data (주석 처리)
// =========================
/*
const [users, setUsers] = useState([
  {
    name: '홍길동',
    email: 'test@test.com',
    password: '1234',
    joinedAt: '2024-05-01T10:00:00.000Z',
    stations: [
      {
        stationId: 1,
        name: 'voltup 제주동부점',
        location: '제주특별자치도 동부돌레길 80',
        createdAt: '2025-05-14T08:04:06.330Z',
        updatedAt: '2025-05-14T08:04:06.330Z',
        status: 'ON',
        description: '제주 동부의 대표 충전소',
        regionName: '제주'
      }
    ],
    usageRate: 57
  }
]);
*/
// =========================

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보

  // 회원가입 (POST /user-auth/signup)
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const res = await fetch('http://52.79.124.254:8080/user-auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
         const data = await res.json();
        return data;
        //return { success: true, message: '회원가입 성공!' };
      } else {
       
        return { success: false, message: '회원가입 실패' };
      }
    } catch (err) {
        console.error('회원가입 오류:', error);
        return { success: false, message: '서버 오류로 회원가입에 실패했습니다.' };
    }
  };

  // 로그인 (POST /user-auth/login)
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch('http://52.79.124.254:8080/user-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const user = await res.json();
        setIsLoggedIn(true);
        setCurrentUser(user);
        return { success: true };
      } else {
        return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
      }
    } catch (err) {
      return { success: false, message: '서버 오류' };
    }
  };

  // 로그아웃
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
        <Route path="/login" element={
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
            handleLogin={handleLogin} // 백엔드 연동용 함수 전달
          />
        } />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/" element={
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
        } />
        <Route path="/mypage" element={
          <MyPage
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        } />
        <Route path="/add-station" element={<AddStation />} />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Navigate 추가
// import { useState } from 'react';
// import Header from "./Components/Header";
// import ChartTitle from "./Components/ChartTitle";
// import Sidebar from './Components/Sidebar';
// import Dashboard from './Components/Dashboard';
// import Login from './Components/Login';
// import SignUp from './Components/SignUp';
// import MyPage from './Components/MyPage';
// import AddStation from './Components/AddStation';
// import Sidebar_mp from './Components/Sidebar_mp'; // 마이페이지용 사이드바
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
//   // const [users, setUsers] = useState([]); // 사용자 정보 관리
//   // 예시: 사용자 객체에 stations 배열 추가
// const [users, setUsers] = useState([
//   {
//     name: '홍길동',
//     email: 'test@test.com',
//     password: '1234',
//     joinedAt: '2024-05-01T10:00:00.000Z',
//     stations: [
//       {
//         stationId: 1,
//         name: 'voltup 제주동부점',
//         location: '제주특별자치도 동부돌레길 80',
//         createdAt: '2025-05-14T08:04:06.330Z',
//         updatedAt: '2025-05-14T08:04:06.330Z',
//         status: 'ON',
//         description: '제주 동부의 대표 충전소',
//         regionName: '제주'
//       }
//     ],
//     usageRate: 57 // AICOLINK 활용률 예시
//   }
// ]);
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
//           isLoggedIn ? (
//             <>
//               <ChartTitle />
//               <div style={{ display: 'flex' }}>
//                 <Sidebar
//                  isLoggedIn={isLoggedIn} 
//                  setIsLoggedIn={setIsLoggedIn}
//                  currentUser={currentUser} // **currentUser prop 추가**
//                 />
//                 <Dashboard />
//               </div>
//             </>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         } />
//         <Route path="/mypage" element={
//            <>
//            <ChartTitle />
//            {/* <Sidebar_mp
//                isLoggedIn={isLoggedIn} 
//                setIsLoggedIn={setIsLoggedIn}
//                currentUser={currentUser} // **currentUser prop 추가**
//               /> */}
//           <MyPage
//     isLoggedIn={isLoggedIn}
//     currentUser={currentUser}
//     setCurrentUser={setCurrentUser}
//   />
            
//            </> 
//            } />
           
//         <Route path="/add-station" element={<AddStation />} />
//         {/* <Route path="/add-station" element={<AddStation />} /> */}
//         {/* <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} /> */}
//         {/* <Route path="/add-station" element={<AddStation />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { useState } from 'react';
// // import Header from "./Components/Header";
// // import ChartTitle from "./Components/ChartTitle";
// // import Sidebar from './Components/Sidebar';
// // import Dashboard from './Components/Dashboard';
// // import Login from './Components/Login';
// // import SignUp from './Components/SignUp';
// // import MyPage from './Components/MyPage';
// // import AddStation from './Components/AddStation';
// // import Sidebar_mp from './Components/Sidebar_mp'; // 마이페이지용 사이드바
// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
// //   const [users, setUsers] = useState([]); // 사용자 정보 관리
// //   const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보 관리 추가****
// //   const handleSignUp = ({ name, email, password }) => {
// //     const existingUser = users.find((user) => user.email === email);
// //     if (existingUser) {
// //       return { success: false, message: '이미 사용 중인 이메일입니다.' };
// //     }
  
// //     setUsers((prevUsers) => [...prevUsers, { name, email, password }]);
// //     return { success: true, message: '회원가입 성공!' };
// //   };
// //   return (
// //     <Router>
// //       <Header />
// //       <Routes>
// //         <Route path="/login" element={
// //             <Login 
// //               setIsLoggedIn={setIsLoggedIn} 
// //               setCurrentUser={setCurrentUser} // **setCurrentUser prop 추가**
// //               users={users} // **users prop 추가**
// //             />
// //           } 
// //         />
// //         <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
// //         <Route path="/" element={
// //           <>
// //             <ChartTitle />
// //             <div style={{ display: 'flex' }}>
// //               <Sidebar
// //                isLoggedIn={isLoggedIn} 
// //                setIsLoggedIn={setIsLoggedIn}
// //                currentUser={currentUser} // **currentUser prop 추가**
// //               />
// //               <Dashboard />
// //             </div>
// //           </>
// //         } />
// //         <Route path="/mypage" element={
// //            <>
// //            <ChartTitle />
// //            <Sidebar_mp
// //                isLoggedIn={isLoggedIn} 
// //                setIsLoggedIn={setIsLoggedIn}
// //                currentUser={currentUser} // **currentUser prop 추가**
// //               />
// //           <MyPage
// //            isLoggedIn={isLoggedIn} 
// //            />
            
// //            </> 
// //            } />
           
// //         <Route path="/add-station" element={<AddStation />} />
// //         {/* <Route path="/add-station" element={<AddStation />} /> */}
// //         {/* <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} /> */}
// //         {/* <Route path="/add-station" element={<AddStation />} /> */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;