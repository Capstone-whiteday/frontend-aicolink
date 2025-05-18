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
import ServiceIntro from './Components/ServiceIntro';
import SupportPage from './Components/SupportPage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    if (token) {
      fetch("http://52.79.124.254:8080/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setCurrentUser({ name: data.name, email: savedEmail || '' });
          setIsLoggedIn(true);
        });

      fetch("http://52.79.124.254:8080/station/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setStations(data));
    }
  }, []);


  //Mock data for testing
  useEffect(() => {
  if (isLoggedIn && currentUser && stations.length === 0) {
    setStations([
      {
        stationId: 101,
        name: 'Mock 충전소 A',
        location: '제주시 연동',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'ON',
        description: '테스트용 충전소입니다',
        regionId: 1,
        userId: currentUser.id,
      }
    ]);
  }
}, [isLoggedIn, currentUser]);



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ServiceIntro" element={<ServiceIntro />} />
        <Route path="/SupportPage" element={<SupportPage />} />
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
                    stations={stations}
                    onLogout={handleLogout}
                  />
                  <Dashboard 
                      selectedStationId={selectedStationId}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                  />
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
              stations={stations}
              setStations={setStations}
            />
          }
        />
        {/* <Route path="/add-station" element={<AddStation currentUser={currentUser} stations={stations} setStations={setStations} />} /> */}
        <Route path="/service-intro" element={<ServiceIntro isLoggedIn={isLoggedIn} currentUser={currentUser} stations={stations} />} />

      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Header from "./Components/Header";
// import ChartTitle from "./Components/ChartTitle";
// import Sidebar from './Components/Sidebar';
// import Dashboard from './Components/Dashboard';
// import Login from './Components/Login';
// import SignUp from './Components/SignUp';
// import MyPage from './Components/MyPage';
// import AddStation from './Components/AddStation';
// import ServiceIntro from './Components/ServiceIntro';
// import Sidebar_mp from './Components/Sidebar_mp';
// // import WeatherWidget from './Components/WeatherWidget';

// // ⚠️ 충전소/날짜별 데이터 연동을 위해 목업데이터 import (필요시)
// // import { batteryData, touData } from './mymockdata';

// function App() {
//   // =========================
//   // 사용자/충전소 상태 (HEAD 기준 유지)
//   // =========================
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: '홍길동',
//       email: 'test@test.com',
//       password: '1234',
//       joinedAt: '2024-05-01T10:00:00.000Z',
//       usageRate: 57
//     }
//   ]);

//   const [stations, setStations] = useState([
//     {
//       stationId: 1,
//       name: 'voltup 제주동부점',
//       location: '제주특별자치도 동부돌레길 80',
//       createdAt: '2025-05-14T08:04:06.330Z',
//       updatedAt: '2025-05-14T08:04:06.330Z',
//       status: 'ON',
//       description: '제주 동부의 대표 충전소',
//       regionName: '제주',
//       userId: 1 // 소유자 id 추가
//     }
//   ]);

//   // =========================
//   // 로그인/회원가입 상태 및 함수 (origin/master 기준 유지)
//   // =========================
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   // 회원가입 (origin/master 방식)
//   const handleSignUp = async ({ name, email, password }) => {
//     try {
//       const res = await fetch('http://52.79.124.254:8080/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       return res.ok
//         ? { success: true, message: '회원가입 성공!' }
//         : { success: false, message: data.message || '회원가입 실패' };
//     } catch (err) {
//       console.error('회원가입 오류:', err);
//       return { success: false, message: '서버 오류로 회원가입에 실패했습니다.' };
//     }
//   };

//   // 로그인 (origin/master 방식)
//   const handleLogin = async ({ email, password }) => {
//     try {
//       const res = await fetch('http://52.79.124.254:8080/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         setIsLoggedIn(true);
//         setCurrentUser({ email });
//         return { success: true };
//       } else {
//         return { success: false, message: data.message || '이메일 또는 비밀번호가 올바르지 않습니다.' };
//       }
//     } catch (err) {
//       return { success: false, message: '서버 오류' };
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//   };

//   // =========================
//   // 선택 충전소/날짜 상태 (추가 필요시)
//   // =========================
//   // const [selectedStationId, setSelectedStationId] = useState(stations[0]?.stationId || null);
//   // const [selectedDate, setSelectedDate] = useState('2025-05-16');

//   // =========================
//   // 라우팅
//   // =========================
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <Login
//               setIsLoggedIn={setIsLoggedIn}
//               setCurrentUser={setCurrentUser}
//               handleLogin={handleLogin}
//             />
//           }
//         />
//         <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <>
//                 <ChartTitle />
//                 <div style={{ display: 'flex' }}>
//                   <Sidebar
//                     isLoggedIn={isLoggedIn}
//                     setIsLoggedIn={setIsLoggedIn}
//                     currentUser={currentUser}
//                     stations={stations}
//                     // selectedStationId={selectedStationId}
//                     // setSelectedStationId={setSelectedStationId}
//                   />
//                   {/* <WeatherWidget city="Jeju" /> */}
//                   <Dashboard
//                     // stations={stations}
//                     // selectedStationId={selectedStationId}
//                     // selectedDate={selectedDate}
//                     // batteryData={batteryData}
//                     // touData={touData}
//                   />
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         <Route
//           path="/mypage"
//           element={
//             <>
//               <ChartTitle />
//               <MyPage
//                 isLoggedIn={isLoggedIn}
//                 currentUser={currentUser}
//                 setCurrentUser={setCurrentUser}
//                 stations={stations}
//                 setStations={setStations}
//               />
//             </>
//           }
//         />
//         <Route
//           path="/add-station"
//           element={
//             <AddStation
//               currentUser={currentUser}
//               stations={stations}
//               setStations={setStations}
//             />
//           }
//         />
//         <Route
//           path="/service-intro"
//           element={
//             <ServiceIntro
//               isLoggedIn={isLoggedIn}
//               currentUser={currentUser}
//               stations={stations}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// /*
// =========================
// [병합/변경 및 주석 설명]
// =========================
// 1. 사용자/충전소 상태는 HEAD(로컬) 기준 유지.
// 2. 로그인/회원가입 함수는 origin/master(원격) 기준 유지(실제 API 연동).
// 3. Sidebar, Dashboard, MyPage, AddStation 등에는 필요한 props를 모두 전달.
// 4. selectedStationId, selectedDate 등은 필요시 주석 해제하여 상태로 추가.
// 5. 불필요한 중복/충돌 주석/미완성 코드 모두 제거.
// 6. export default App;은 파일 맨 아래 한 번만!
// */