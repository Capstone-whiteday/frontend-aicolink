import { useNavigate } from 'react-router-dom';
import './Sidebar.css';



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
            <button
              className="store-btn"
              key={station.stationId}
              onClick={() => setSelectedStationId(Number(station.stationId))} // ✅ 이거 있어야 함
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



// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css';



// const Sidebar = ({ isLoggedIn, setIsLoggedIn, currentUser, stations }) => { // stations prop 추가
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login'); // 로그인 페이지로 이동
//   };

//   const handleLogoutClick = () => {
//     setIsLoggedIn(false); // 로그인 상태 변경
//     navigate('/'); // 메인 페이지로 이동
//   };

//   if (!isLoggedIn) {
//     return (
//       <aside className="sidebar">
//         <div className="profile-section">
//           <p>로그인이 필요합니다.</p>
//           <button className="login-btn" onClick={handleLoginClick}>
//             로그인
//           </button>
//         </div>
//       </aside>
//     );
//   }

//   // =========================
//   // 백엔드 형식: stations에서 userId로 필터링
//   // =========================
//   const myStations = stations
//     ? stations.filter(station => station.userId === currentUser?.id)
//     : [];

//   return (
//     <aside className="sidebar">
//       <div className="profile-section">
//         <img
//           className="profile-image"
//           src="/profile_empty.svg"
//           alt="프로필"
//         />
//         <div className="profile-name">
//          <strong>{'name  :  ' + (currentUser?.name || '사용자 이름')}</strong>
//         </div>
//         <div className="profile-email">

//           <p>{currentUser?.email || '사용자 이메일'}</p> {/* **currentUser.email 표시** */}
//         </div>
//       </div>

//       <p className="section-title">내가 관리하는 가게</p>
//       {/* 기존 방식은 주석 처리, 아래는 userId로 필터링 */}
//       <div className="store-buttons">
//         {myStations.length > 0 ? (
//           myStations.map(station => (
//             <button
//               className="store-btn"
//               key={station.stationId}
//               // onClick={() => navigate(`/station/${station.stationId}`)}
//             >
//               {station.name}
//             </button>
//           ))
//         ) : (
//           <span style={{ color: '#aaa', fontSize: '13px' }}>등록된 충전소가 없습니다.</span>
//         )}
//       </div>
        
//       {/* <button className="info-btn">→ 내 정보 변경하기</button> */}
//       <button className="logout-btn" onClick={handleLogoutClick}>← Log out</button>
//     </aside>
//   );
// };

// export default Sidebar;

