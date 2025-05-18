import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-container" onClick={() => navigate('/')}>
        <button className="logo-button">
          <img src="/logo_aclnk.svg" alt="AICOLINK Logo" className="logo-icon" />
        </button>
        <span className="logo-text">AICOLINK</span>
      </div>
      <nav className="nav">
        <a href="#">월말정산</a>
        <a href="#" onClick={() => navigate('/MyPage')}>마이 인포</a>
        <a href="#" onClick={()=>navigate('SupportPage')}>도움말</a>
        <a href="#" onClick={() => navigate('/ServiceIntro')}>서비스 소개</a>
        <div className="icons">
          <button className="icon-button">
            <img src="/logo_settings.svg" alt="setting icon" className="setting-icon" />
          </button>
          <button className="icon-button">
            <img src="/logo_alarm.svg" alt="alarm icon" className="alarm-icon" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;