import { useNavigate } from 'react-router-dom';
import './Sidebar.css';


const token = localStorage.getItem('token');
// ✅ 
const Sidebar = ({ isLoggedIn, setIsLoggedIn, currentUser, stations, onLogout, setSelectedStationId ,mockUsers}) => {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <aside className="sidebar">
        <div className="profile-section">
          <p>로그인이 필요합니다.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
        </div>
      </aside>
    );
  }

           // 1. mockUsers에서 먼저 찾기
    const user = mockUsers.find(u => u.email === email && u.password === password);
  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img className="profile-image" src="/profile_empty.svg" alt="프로필" />
        <div className="profile-name">
          <strong>{'user  :  ' + (currentUser.name || '사용자 이름')}</strong>
        </div>
        <div className="profile-email">
          <p>{currentUser?.email || '사용자 이메일'}</p>
        </div>
      </div>

      <p className="sidebar-section-title">내가 관리하는 가게</p>
      <div className="store-buttons">
        {stations.length > 0 ? (
          stations.map(station => (
            // <button className="store-btn" key={station.stationId}>
            //   {station.name}
            // </button>
            // <button
            //   className="store-btn"
            //   key={station.stationId}
            //   onClick={() => setSelectedStationId(Number(station.stationId))} // ✅ 이거 있어야 함
            // >
            <button
  className="store-btn"
  key={station.stationId}
  onClick={() => {
    console.log('클릭한 stationId:', station.stationId);
    setSelectedStationId(Number(station.stationId));
    console.log('setSelectedStationId 호출됨:', Number(station.stationId));
  }}
>
              
              {station.name}
            </button>
          ))
        ) : (
          <span style={{ color: '#aaa', fontSize: '13px' }}>등록된 충전소가 없습니다.</span>
        )}
      </div>
      <button className="sidebar-logout-btn" onClick={onLogout}>← Log out</button>
    </aside>
  );
};

export default Sidebar;



