import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

// =========================
// 기존: currentUser.stations 사용 (주석 처리)
// =========================
/*
      {isLoggedIn && currentUser && currentUser.stations && (
        <div className="store-buttons">
          {currentUser.stations.map(station => (
            <button
              className="store-btn"
              key={station.stationId}
              // 필요하다면 아래처럼 클릭 시 해당 충전소로 이동 등 추가
              // onClick={() => navigate(`/station/${station.stationId}`)}
            >
              {station.name}
            </button>
          ))}
        </div>
      )}
*/
// =========================

const Sidebar = ({ isLoggedIn, setIsLoggedIn, currentUser, stations }) => { // stations prop 추가
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false); // 로그인 상태 변경
    navigate('/'); // 메인 페이지로 이동
  };

  if (!isLoggedIn) {
    return (
      <aside className="sidebar">
        <div className="profile-section">
          <p>로그인이 필요합니다.</p>
          <button className="login-btn" onClick={handleLoginClick}>
            로그인
          </button>
        </div>
      </aside>
    );
  }

  // =========================
  // 백엔드 형식: stations에서 userId로 필터링
  // =========================
  const myStations = stations
    ? stations.filter(station => station.userId === currentUser?.id)
    : [];

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img
          className="profile-image"
          src="/profile_empty.svg"
          alt="프로필"
        />
        <div className="profile-info">
          <strong>{currentUser?.name || '사용자 이름'}</strong> {/* **currentUser.name 표시** */}
          <p>{currentUser?.email || '사용자 이메일'}</p> {/* **currentUser.email 표시** */}
        </div>
      </div>
{/* 
      <p className="section-title">내가 관리하는 가게</p>
      {/* 기존 방식은 주석 처리, 아래는 userId로 필터링 */}
      {/* <div className="store-buttons">
        {myStations.length > 0 ? (
          myStations.map(station => (
            <button
              className="store-btn"
              key={station.stationId}
              // onClick={() => navigate(`/station/${station.stationId}`)}
            >
              {station.name}
            </button>
          ))
        ) : (
          <span style={{ color: '#aaa', fontSize: '13px' }}>등록된 충전소가 없습니다.</span>
        )}
      </div>  */}

      {/* <button className="info-btn">→ 내 정보 변경하기</button> */}
      <button className="logout-btn" onClick={handleLogoutClick}>← Log out</button>
    </aside>
  );
};

export default Sidebar;


// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ isLoggedIn, setIsLoggedIn, currentUser }) => { // **currentUser prop 추가**
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

//   return (
//     <aside className="sidebar">
//       <div className="profile-section">
//         <img
//           className="profile-image"
//           src="/logo_aclnk.svg"
//           alt="프로필"
//         />
//         <div className="profile-info">
//         <strong>{currentUser?.name || '사용자 이름'}</strong> {/* **currentUser.name 표시** */}
//         <p>{currentUser?.email || '사용자 이메일'}</p> {/* **currentUser.email 표시** */}
//         </div>
//       </div>

//       <p className="section-title">내가 관리하는 가게</p>
//       {/* <div className="store-buttons">
//         <button className="store-btn active">voltup 제주동부점</button>
//         <button className="store-btn">TeslaCh 서귀포점</button>
//         <button className="store-btn">ChargePlus 연신내점</button>
//       </div> */}
//             {/* 충전소 목록 */}
//       {isLoggedIn && currentUser && currentUser.stations && (
//         <div className="store-buttons">
//           {currentUser.stations.map(station => (
//             <button
//               className="store-btn"
//               key={station.stationId}
//               // 필요하다면 아래처럼 클릭 시 해당 충전소로 이동 등 추가
//               // onClick={() => navigate(`/station/${station.stationId}`)}
//             >
//               {station.name}
//             </button>
//           ))}
//         </div>
//       )}
// {/* 
//       <button className="info-btn">→ 내 정보 변경하기</button> */}
//       <button className="logout-btn" onClick={handleLogoutClick}>← Log out</button>
//     </aside>
//   );
// };

// export default Sidebar;