import './MyPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
// import Sidebar from './Sidebar';
import Sidebar_mp from './Sidebar_mp'; // Sidebar_mp로 
import Header from './Header';
import ChartTitle from './ChartTitle';

// 마이페이지 컴포넌트
const MyPage = ({ isLoggedIn }) => {
const navigate = useNavigate();

  // 로그인 안된 경우 바로 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 로그인된 경우 마이페이지 렌더링
  if (!isLoggedIn) return null;

  return (
    <div className="mypage-wrapper">
      <Header />
      <ChartTitle />
      {/* <Sidebar isLoggedIn=ㄹ{isLoggedIn} /> */}
      {/* <Sidebar_mp isLoggedIn={isLoggedIn} /> */}
      {/* <section className="mypage-profile">
        <img className="mypage-avatar" src="/logo_aclnk.svg" alt="프로필" />
        <div>
          <strong>김세종</strong>
          <p>kimsejongg@gmail.com</p>
        </div>
      </section>

      <section className="mypage-summary">
        <h2>내 충전소</h2>
        <div className="summary-item">관리중인 충전소 수: <strong>3</strong></div>
        <div className="summary-item">평균 매출 대비 순매출: <strong>33%</strong></div>
        <div className="summary-item">AICOLINK 활용률: <strong>57%</strong></div>
        <div className="summary-item">가입일자: <strong>2025년 3월 8일</strong></div>
      </section>

      <section className="mypage-station">
        <h3>voltup 제주동부점</h3>
        <div>위치: 제주특별자치도 동부돌레길 80</div>
        <div>등록일자: 2023년 8월 13일</div>
        <div>이번 달 순매출: 약 314만원</div>
        <div>총 매출 대비 순수익: 33%</div>
        <div>현재 상태: 정상 영업 중</div>
      </section>

      <section className="mypage-others">
        <button className="station-select">TeslaCharge 서귀포점 → 선택</button>
        <button className="station-select">ChargePlus 연신내점 → 선택</button>
      </section> */}

      {/* 충전소 추가하기 버튼 */}
      <section className="mypage-add-station">
        <button className="add-station-btn" onClick={() => navigate('/add-station')}>
          충전소 추가하기
        </button>
      </section>
    </div>
  );
};

export default MyPage;



// import './MyPage.css';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import ChartTitle from './ChartTitle';

// // 마이페이지 컴포넌트
// const MyPage = ({ isLoggedIn }) => {
//   const navigate = useNavigate();

//   if (!isLoggedIn) {
//     // 로그인되지 않은 경우 로그인 요구 화면 렌더링
//     return (
//       <div className="mypage-login-required">
//         <h2>로그인이 필요합니다</h2>
//         <p>마이페이지를 보려면 로그인이 필요합니다.</p>
//         <button className="login-btn" onClick={() => navigate('/login')}>
//           로그인 페이지로 이동
//         </button>
//       </div>
//     );
//   }
  
//   // 로그인된 경우 마이페이지 렌더링
//   return (
//     <div className="mypage-wrapper">
//         <Header />
//         <ChartTitle />
//         <Sidebar isLoggedIn={isLoggedIn} />
//       <section className="mypage-profile">
//         <img className="mypage-avatar" src="/logo_aclnk.svg" alt="프로필" />
//         <div>
//           <strong>김세종</strong>
//           <p>kimsejongg@gmail.com</p>
//         </div>
//       </section>

//       <section className="mypage-summary">
//         <h2>내 충전소</h2>
//         <div className="summary-item">관리중인 충전소 수: <strong>3</strong></div>
//         <div className="summary-item">평균 매출 대비 순매출: <strong>33%</strong></div>
//         <div className="summary-item">AICOLINK 활용률: <strong>57%</strong></div>
//         <div className="summary-item">가입일자: <strong>2025년 3월 8일</strong></div>
//       </section>

//       <section className="mypage-station">
//         <h3>voltup 제주동부점</h3>
//         <div>위치: 제주특별자치도 동부돌레길 80</div>
//         <div>등록일자: 2023년 8월 13일</div>
//         <div>이번 달 순매출: 약 314만원</div>
//         <div>총 매출 대비 순수익: 33%</div>
//         <div>현재 상태: 정상 영업 중</div>
//       </section>

//       <section className="mypage-others">
//         <button className="station-select">TeslaCharge 서귀포점 → 선택</button>
//         <button className="station-select">ChargePlus 연신내점 → 선택</button>
//       </section>


//       {/* 충전소 추가하기 버튼 */}
//       <section className="mypage-add-station">
//         <button className="add-station-btn" onClick={() => navigate('/add-station')}>
//           충전소 추가하기
//         </button>
//       </section>

//     </div>
//   );
// };
// export default MyPage;