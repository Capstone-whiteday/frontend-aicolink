import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img
          className="profile-image"
        //   src="https://i.pravatar.cc/100" // 예시 이미지
            src="/logo_aclnk.svg" // 예시 이미지
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

      <div className="weather-widget">
        <div className="weather-icon">☀️</div>
        <div className="weather-info">
          <p className="weather-location">제주특별시 서문로 18 - 2</p>
          <p className="weather-temp">21° / 9°</p>
        </div>
        <button className="weather-btn">기상청 바로가기</button>
      </div>
    </aside>
  );
};

export default Sidebar;
