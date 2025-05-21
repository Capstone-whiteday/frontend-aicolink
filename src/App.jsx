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
 const handleSignUp = async ({ name, email, password, createdAt }) => {
  try {
    const res = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, createdAt }),
    });

    const data = await res.json();
    return {
      success: res.ok,
      message: data.message || '회원가입 완료',
    };
  } catch (error) {
    console.error('회원가입 실패:', error);
    return {
      success: false,
      message: '서버 요청 중 오류가 발생했습니다.',
    };
  }
};


useEffect(() => {
  const token = localStorage.getItem('token');
  const savedEmail = localStorage.getItem('email');

  if (token) {
    // 사용자 프로필 요청
    // fetch("http://52.79.124.254:8080/profile", {
    fetch("http://localhost:8080/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("인증 실패");
        return res.json();
      })
      .then(data => {
        setCurrentUser({ name: data.name, email: savedEmail || '' });
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.error("프로필 요청 실패:", err);
        setIsLoggedIn(false);
      });

    // 충전소 목록 요청
    fetch("http://localhost:8080/station/list", {
    // fetch('http://52.79.124.254:8080/station/list', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("충전소 요청 실패");
        return res.json();
      })
      .then(data => setStations(data))
      .catch(err => {
        console.error("충전소 목록 로드 실패:", err);
        setStations([]);
      });
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

        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/ServiceIntro" element={<ServiceIntro />} />
        <Route path="/SupportPage" element={<SupportPage />} />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                {/* <ChartTitle /> */}
                <div style={{ display: 'flex' }}>
                  <Sidebar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    currentUser={currentUser}
                    stations={stations}
                    onLogout={handleLogout}
                    setSelectedStationId={setSelectedStationId} // 🟡 반드시 전달!
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
        <Route path="/add-station" element={<AddStation currentUser={currentUser} stations={stations} setStations={setStations} />} />
        <Route path="/service-intro" element={<ServiceIntro isLoggedIn={isLoggedIn} currentUser={currentUser} stations={stations} />} />

      </Routes>
    </Router>
  );
}

export default App;


