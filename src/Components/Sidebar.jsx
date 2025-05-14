import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn, setIsLoggedIn, currentUser }) => { // **currentUser prop 추가**
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

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img
          className="profile-image"
          src="/logo_aclnk.svg"
          alt="프로필"
        />
        <div className="profile-info">
        <strong>{currentUser?.name || '사용자 이름'}</strong> {/* **currentUser.name 표시** */}
        <p>{currentUser?.email || '사용자 이메일'}</p> {/* **currentUser.email 표시** */}
        </div>
      </div>

      <p className="section-title">내가 관리하는 가게</p>
      <div className="store-buttons">
        <button className="store-btn active">voltup 제주동부점</button>
        <button className="store-btn">TeslaCh 서귀포점</button>
        <button className="store-btn">ChargePlus 연신내점</button>
      </div>
{/* 
      <button className="info-btn">→ 내 정보 변경하기</button> */}
      <button className="logout-btn" onClick={handleLogoutClick}>← Log out</button>
    </aside>
  );
};

export default Sidebar;