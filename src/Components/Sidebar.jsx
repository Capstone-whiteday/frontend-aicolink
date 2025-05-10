import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn = false }) => {
  const [activeStore, setActiveStore] = useState('voltup 제주동부점'); // 초기 활성화된 버튼 설정
  const navigate = useNavigate();
  const handleButtonClick = (storeName) => {
    setActiveStore(storeName); // 클릭된 버튼을 활성화
  };

  if (!isLoggedIn) {
    return (
      <aside className="sidebar">
        <div className="profile-section">
          <p>로그인이 필요합니다.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>
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
          <strong>김세종</strong>
          <p>kimsejongg@gmail.com</p>
        </div>
      </div>

      <p className="section-title">내가 관리하는 가게</p>
      <div className="store-buttons">
        <button
          className={`store-btn ${activeStore === 'voltup 제주동부점' ? 'active' : ''}`}
          onClick={() => handleButtonClick('voltup 제주동부점')}
        >
          voltup 제주동부점
        </button>
        <button
          className={`store-btn ${activeStore === 'TeslaCh 서귀포점' ? 'active' : ''}`}
          onClick={() => handleButtonClick('TeslaCh 서귀포점')}
        >
          TeslaCh 서귀포점
        </button>
        <button
          className={`store-btn ${activeStore === 'ChargePlus 연신내점' ? 'active' : ''}`}
          onClick={() => handleButtonClick('ChargePlus 연신내점')}
        >
          ChargePlus 연신내점
        </button>
      </div>

      <button className="info-btn">→ 내 정보 변경하기</button>
      <button className="logout-btn">← Log out</button>
    </aside>
  );
};

export default Sidebar;