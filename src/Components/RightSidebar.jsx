import './RightSidebar.css';

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="right-sidebar-section">
        <h2>공지사항</h2>
        <ul>
          <li>서비스 점검 예정: 5월 20일</li>
          <li>신규 기능 업데이트 안내</li>
          <li>고객센터 운영 시간 변경</li>
        </ul>
      </div>
      <div className="right-sidebar-section">
        <h2>빠른 링크</h2>
        <ul>
          <li><a href="#settings">설정</a></li>
          <li><a href="#help">도움말</a></li>
          <li><a href="#feedback">피드백</a></li>
        </ul>
      </div>

    </aside>
  );
};

export default RightSidebar;

