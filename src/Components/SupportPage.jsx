import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage = () => {
  // 상태 관리: 활성화된 FAQ 항목 관리
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // FAQ 질문 클릭 핸들러
  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div>
      

      {/* 도움말 헤더 */}
      <section className="help-header">
        <div className="container">
          <h1>AICOLINK 도움말 센터</h1>
          <p>전기차 충전소 관리의 모든 질문에 대한 답변을 찾아보세요</p>
        </div>
      </section>

      {/* 도움말 레이아웃 */}
      <div className="help-layout">
        {/* 사이드바 */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <div className="sidebar-nav-title">도움말 카테고리</div>
            <ul className="sidebar-nav-list">
              <li className="sidebar-nav-item">
                <a href="#getting-started" className="sidebar-nav-link active">시작하기</a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#ai-prediction" className="sidebar-nav-link">AI 예측 시스템</a>
                <ul className="sidebar-nav-sublist">
                  <li className="sidebar-nav-subitem">
                    <a href="#prediction-overview" className="sidebar-nav-sublink">예측 시스템 개요</a>
                  </li>
                  <li className="sidebar-nav-subitem">
                    <a href="#accuracy" className="sidebar-nav-sublink">정확도 및 신뢰성</a>
                  </li>
                </ul>
              </li>
              <li className="sidebar-nav-item">
                <a href="#battery-management" className="sidebar-nav-link">배터리 관리</a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#charging-discharging" className="sidebar-nav-link">충전 및 방전</a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#dashboard" className="sidebar-nav-link">대시보드 사용법</a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#account" className="sidebar-nav-link">계정 관리</a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#faq" className="sidebar-nav-link">자주 묻는 질문</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 도움말 컨텐츠 */}
        <main className="help-content">
          <section className="help-section" id="getting-started">
            <h2>시작하기</h2>
            <p>AICOLINK를 처음 사용하시나요? 아래 가이드를 통해 쉽게 시작하실 수 있습니다.</p>
            
            <div className="help-card">
              <h4>🚀 AICOLINK란?</h4>
              <p>AICOLINK는 AI를 활용하여 분산전원의 발전량과 배터리 잔류량을 예측하고, 최적의 충전-방전 일정을 수립하여 전기차 충전소 운영을 최적화하는 서비스입니다.</p>
            </div>
            
            <h3>AICOLINK 시작하기</h3>
            <div className="step-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>계정 등록하기</h4>
                  <p>AICOLINK 웹사이트에서 '회원가입' 버튼을 클릭하고 필요한 정보를 입력하여 계정을 생성합니다.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>충전소 정보 등록하기</h4>
                  <p>로그인 후 '내 충전소' 메뉴에서 '충전소 추가' 버튼을 클릭하여 충전소 정보를 등록합니다. 위치, 설비 정보 등 필요한 데이터를 정확히 입력해주세요.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>시스템 설정 완료</h4>
                  <p>충전소를 등록하고 위치와 지역 정보를 입력하면, AICOLINK가 자동으로 다음날의 충전-방전 일정을 예측합니다. '설정' 메뉴에서 배터리 모니터링 설정을 완료하여 실시간 데이터 수집을 시작합니다.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>대시보드 확인하기</h4>
                  <p>모든 설정이 완료되면 메인 대시보드에서 AI 예측 데이터와 충전-방전 일정을 확인할 수 있습니다.</p>
                </div>
              </div>
            </div>
            
            <h3>필요한 기술 요구사항</h3>
            <ul>
              <li><strong>지원 브라우저:</strong> Chrome, Firefox, Safari, Edge 최신 버전</li>
              <li><strong>인터넷 연결:</strong> 안정적인 인터넷 연결 필요 (최소 5Mbps)</li>
              <li><strong>충전소 설비:</strong> API 연동 가능한 충전 설비 필요</li>
              <li><strong>분산전원:</strong> 데이터 수집이 가능한 센서 설치 필요</li>
            </ul>
          </section>

          <section className="help-section" id="faq">
            <h2>자주 묻는 질문</h2>
            <p>AICOLINK 사용 중 자주 발생하는 질문들에 대한 답변입니다.</p>
            
            <div className="faq-container">
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(0)}>
                  AI 예측의 정확도는 어느 정도인가요? <span>{activeFaqIndex === 0 ? '▲' : '▼'}</span>
                </div>
                {activeFaqIndex === 0 && (
                  <div className="faq-answer">
                    AICOLINK의 AI 예측 시스템은 평균 85~95%의 정확도를 보입니다. 데이터가 축적될수록 정확도는 더욱 향상됩니다. 예측 정확도는 대시보드의 '분석' 탭에서 확인하실 수 있습니다.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(1)}>
                  다양한 종류의 배터리를 사용할 수 있나요? <span>{activeFaqIndex === 1 ? '▲' : '▼'}</span>
                </div>
                {activeFaqIndex === 1 && (
                  <div className="faq-answer">
                    네, AICOLINK는 대부분의 상용 ESS 배터리와 호환됩니다. 리튬이온, LFP, 납축전지 등 다양한 종류의 배터리를 지원합니다. '설정 > 배터리 관리'에서 배터리 타입을 선택하실 수 있습니다.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(2)}>
                  여러 충전소를 한 번에 관리할 수 있나요? <span>{activeFaqIndex === 2 ? '▲' : '▼'}</span>
                </div>
                {activeFaqIndex === 2 && (
                  <div className="faq-answer">
                    네, AICOLINK는 다중 충전소 관리를 지원합니다. 비즈니스 계정으로 업그레이드하면 무제한 충전소를 등록하고 통합 대시보드에서 모든 충전소를 한눈에 모니터링할 수 있습니다.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(3)}>
                  서비스 이용 중 오류가 발생했을 때 어떻게 해야 하나요? <span>{activeFaqIndex === 3 ? '▲' : '▼'}</span>
                </div>
                {activeFaqIndex === 3 && (
                  <div className="faq-answer">
                    서비스 이용 중 오류가 발생하면 고객센터(1544-0000)로 전화하시거나 tmpmailname@gmail.com으로 메일을 보내주세요. 문제 상황과 발생 시점을 함께 알려주시면 기술 지원팀에서 신속하게 답변 드리겠습니다.
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="contact-support">
            <h3>더 궁금한 점이 있으신가요?</h3>
            <p>찾으시는 정보가 없거나 추가 지원이 필요하시면 저희 기술 지원팀에 문의해주세요.</p>
            <a href="#contact" className="contact-btn">기술 지원팀 문의하기</a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportPage;