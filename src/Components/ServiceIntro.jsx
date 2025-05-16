import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './ServiceIntro.css'; // 스타일은 별도 파일에 정의

const ServiceIntro = ({ isLoggedIn, currentUser, stations }) => {
  return (
    <div className="container">
      <Header />
      <div className="main-layout">
        <SidebarIntro  />

        <main className="service-main">
          <h1 className="main-title">서비스 소개</h1>

          <div className="card-grid">
            <div className="card green">AI기반 충전 최적화</div>
            <div className="card white">충전소 운영자 맞춤 서비스 제공</div>
            <div className="card white">AICOLINK는<br />2025년에 설립했어요</div>
            <div className="card white">누적 30명의<br />점주분들이<br />사용하고 계세요</div>
            <div className="card green">분산전원이란?<br /><small>*한전 발표기준 예상치</small></div>
            <div className="card yellow">1년간<br />평균 7000만원<br />절약</div>
            <div className="card green">더욱<br />자세한 정보를<br />원하시나요?<br /><small>*예상치</small></div>
            <div className="card white">이번달에 AICOLINK와<br />null</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceIntro;
