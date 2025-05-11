import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn = true }) => {
  const [isExpanding, setIsExpanding] = useState(false); // 확장 애니메이션 상태
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsExpanding(true); // 확장 애니메이션 시작
    setTimeout(() => {
      navigate('/login'); // 애니메이션 후 로그인 페이지로 이동
    }, 1000); // 애니메이션 지속 시간 (1000ms)
  };

  if (!isLoggedIn) {
    return (
      <>
        {/* 화면 전체를 덮는 오버레이 */}
        {isExpanding && <div className="overlay"></div>}
        <aside className={`sidebar ${isExpanding ? 'expanding' : ''}`}>
          <div className="profile-section">
            <p>로그인이 필요합니다.</p>
            <button className="login-btn" onClick={handleLoginClick}>
              로그인
            </button>
          </div>
        </aside>
      </>
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
          <strong>김세종</strong>
          <p>kimsejongg@gmail.com</p>
        </div>
      </div>

      <p className="section-title">내가 관리하는 가게</p>
      <div className="store-buttons">
        <button className="store-btn active">voltup 제주동부점</button>
        <button className="store-btn">TeslaCh 서귀포점</button>
        <button className="store-btn">ChargePlus 연신내점</button>
      </div>

      <button className="info-btn">→ 내 정보 변경하기</button>
      <button className="logout-btn">← Log out</button>
    </aside>
  );
};

export default Sidebar;