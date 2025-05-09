import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo_aclnk.svg" alt="AICOLINK Logo" className="logo-icon" />
        <span className="logo-text">AICOLINK</span>
      </div>
      <nav className="nav">
        <a href="#">월말정산</a>
        <a href="#">내 충전소</a>
        <a href="#">도움말</a>
        <a href="#">서비스 소개</a>
        <div className="icons">
          <button className="icon-button">🔔</button>
          <button className="icon-button">⚙️</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
